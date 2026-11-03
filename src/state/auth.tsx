import type { Session } from '@supabase/supabase-js';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';

import { providerEnabled, supabase } from '@/lib/supabase';
import { tr } from '@/i18n';

type AuthValue = {
  session: Session | null;
  ready: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  /** `confirmEmail` is true when the project requires clicking an email link before signing in. */
  signUp: (email: string, password: string) => Promise<{ error: string | null; confirmEmail: boolean }>;
  /** Google or Facebook: signs in, creating the account the first time. */
  signInWithProvider: (provider: OAuthProvider) => Promise<string | null>;
  /** Emails a code for setting a new password. */
  resetPassword: (email: string) => Promise<string | null>;
  /** Checks that code; a right one signs the learner in. */
  verifyResetCode: (email: string, code: string) => Promise<string | null>;
  /** Sets a new password for the signed-in learner. */
  setPassword: (password: string) => Promise<string | null>;
  /** Emails the signed-in learner a code that proves the address is theirs (used before a level change). */
  sendVerifyCode: () => Promise<string | null>;
  verifyCode: (code: string) => Promise<string | null>;
  /** Asks the provider to confirm it is still the signed-in learner (Facebook users, before a level change). */
  confirmWithProvider: (provider: OAuthProvider) => Promise<string | null>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<string | null>;
};

export type OAuthProvider = 'google' | 'facebook';

const AuthContext = createContext<AuthValue | null>(null);

WebBrowser.maybeCompleteAuthSession();

/** The server's messages for emailed codes, in plain words in the interface language. */
function codeError(message: string) {
  if (/expired|invalid|token/i.test(message)) return tr('কোডটি ভুল বা মেয়াদ শেষ হয়ে গেছে। আবার দেখে লিখুন, অথবা নতুন কোড নিন।', 'The code is wrong or has expired. Check it and type again, or get a new code.');
  if (/rate|seconds|too many/i.test(message)) return tr('অনেকবার চেষ্টা হয়েছে। একটু পরে আবার চেষ্টা করুন।', 'Too many tries. Please try again a little later.');
  if (/should be different/i.test(message)) return tr('নতুন পাসওয়ার্ডটি আগেরটি থেকে আলাদা হতে হবে।', 'The new password must be different from the old one.');
  if (/password/i.test(message)) return tr('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।', 'The password must be at least 8 characters.');
  if (/fetch|network/i.test(message)) return tr('ইন্টারনেট সংযোগ নেই। সংযোগ ঠিক করে আবার চেষ্টা করুন।', 'No internet connection. Fix the connection and try again.');
  return tr('কিছু একটা ভুল হয়েছে। একটু পরে আবার চেষ্টা করুন।', 'Something went wrong. Please try again a little later.');
}

/** Where the provider sends the learner back to after they approve. */
function oauthRedirect() {
  if (Platform.OS === 'web') return window.location.origin + window.location.pathname.replace(/auth\/sign-in\/?$/, '');
  return Linking.createURL('auth/callback');
}

/** Reads tokens or an error from the URL the provider redirected to. */
function readAuthResult(url: string) {
  const params = new URLSearchParams(url.split('#')[1] ?? url.split('?')[1] ?? '');
  return {
    accessToken: params.get('access_token'),
    refreshToken: params.get('refresh_token'),
    error: params.get('error_description') ?? params.get('error'),
  };
}

function friendlyOAuthError(message: string, provider: OAuthProvider) {
  const name = provider === 'google' ? 'Google' : 'Facebook';
  if (/not enabled|unsupported provider/i.test(message)) return tr(`${name} দিয়ে সাইন ইন এখনো চালু করা হয়নি।`, `Sign-in with ${name} is not turned on yet.`);
  return message;
}

/** How long the web confirm window may stay open before the app gives up. */
const REAUTH_TIMEOUT_MS = 3 * 60 * 1000;
/** Storage key the confirm page also writes its result to (removed straight away). */
const REAUTH_KEY = 'deutschbook-reauth';

/**
 * Web: the provider returns to a small page (public/facebook-confirm.html) in a popup,
 * which hands the URL back here over a BroadcastChannel. The popup can't use
 * `window.opener`: Facebook's pages cut that link, and they also make the
 * popup look closed to us, so only a timeout ends an unanswered wait. The
 * page does not run the app, so the current session is never replaced.
 */
function reauthInPopup(popup: Window, url: string) {
  popup.location.href = url;
  return new Promise<string | null>((resolve) => {
    const channel = new BroadcastChannel('deutschbook-reauth');
    const done = (result: string | null) => {
      channel.close();
      window.removeEventListener('storage', onStorage);
      clearTimeout(timer);
      resolve(result);
    };
    channel.onmessage = (e: MessageEvent) => {
      if (typeof e.data?.url === 'string') done(e.data.url);
    };
    // Backup for browsers that keep the popup out of the channel: a storage event.
    const onStorage = (e: StorageEvent) => {
      if (e.key !== REAUTH_KEY || !e.newValue) return;
      localStorage.removeItem(REAUTH_KEY);
      done(e.newValue);
    };
    window.addEventListener('storage', onStorage);
    const timer = setTimeout(() => done(null), REAUTH_TIMEOUT_MS);
  });
}

/**
 * Phones: the provider sends the learner back with a deutschbook://auth/callback
 * link carrying the tokens. On Android that link can reach the app after the
 * browser has already reported "closed" (expo-web-browser races the two), and
 * the router also opens the callback page for it. So every such link, from any
 * of those paths, comes through here, and each one is used only once.
 */
let confirming = false;
let confirmWaiter: ((url: string) => void) | null = null;
const usedTokens = new Set<string>();

/** Signs in with the tokens in a returned link (or hands it to a running Facebook confirm). Returns an error or null. */
export async function handleAuthUrl(url: string | null | undefined): Promise<string | null> {
  if (!url || !supabase) return null;
  const { accessToken, refreshToken, error } = readAuthResult(url);
  if (!accessToken && !error) return null; // not a sign-in link
  if (confirming) {
    // A confirm only checks who it is; it must never replace the session.
    confirmWaiter?.(url);
    return null;
  }
  if (error) return error;
  if (!refreshToken || usedTokens.has(accessToken!)) return null;
  usedTokens.add(accessToken!);
  const { error: sessionError } = await supabase.auth.setSession({ access_token: accessToken!, refresh_token: refreshToken });
  return sessionError ? sessionError.message : null;
}

/** Waits up to `ms` for a session to exist (set by a link that arrived a moment late). */
async function waitForSession(ms: number) {
  if (!supabase) return false;
  const client = supabase;
  const has = async () => !!(await client.auth.getSession()).data.session;
  if (await has()) return true;
  return new Promise<boolean>((resolve) => {
    const { data } = client.auth.onAuthStateChange((_e, s) => {
      if (!s) return;
      clearTimeout(timer);
      data.subscription.unsubscribe();
      resolve(true);
    });
    const timer = setTimeout(() => {
      data.subscription.unsubscribe();
      resolve(false);
    }, ms);
  });
}

/** How long to wait for a late link after the sign-in browser closes. */
const LATE_LINK_MS = 6000;

const noBackend = () => tr('অ্যাকাউন্ট সার্ভার এখনো সেট আপ করা হয়নি।', 'The account server is not set up yet.');

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(!supabase);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    // Phones: a sign-in link may arrive on its own, outside the browser session's promise.
    const link = Platform.OS === 'web' ? null : Linking.addEventListener('url', (e) => void handleAuthUrl(e.url));
    if (Platform.OS !== 'web') Linking.getInitialURL().then((url) => handleAuthUrl(url));
    return () => {
      data.subscription.unsubscribe();
      link?.remove();
    };
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      session,
      ready,
      async signIn(email, password) {
        if (!supabase) return noBackend();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return error ? error.message : null;
      },
      async signUp(email, password) {
        if (!supabase) return { error: noBackend(), confirmEmail: false };
        const { data, error } = await supabase.auth.signUp({ email, password });
        return { error: error ? error.message : null, confirmEmail: !error && !data.session };
      },
      async signInWithProvider(provider) {
        if (!supabase) return noBackend();
        // Check first: an unconfigured provider would otherwise leave the app for a raw error page.
        if (!(await providerEnabled(provider))) return friendlyOAuthError('provider is not enabled', provider);
        const redirectTo = oauthRedirect();
        if (Platform.OS === 'web') {
          // Leaves the page for the provider and comes back signed in.
          const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo } });
          return error ? friendlyOAuthError(error.message, provider) : null;
        }
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider,
          options: { redirectTo, skipBrowserRedirect: true },
        });
        if (error || !data.url) return friendlyOAuthError(error?.message ?? 'Sign-in failed', provider);
        const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
        if (result.type === 'success') {
          const authError = await handleAuthUrl(result.url);
          if (authError) return friendlyOAuthError(authError, provider);
          return null;
        }
        // Android often reports "closed" just before the link with the tokens
        // arrives: give it a moment. No session after that = the learner closed it.
        await waitForSession(LATE_LINK_MS);
        return null;
      },
      async resetPassword(email) {
        if (!supabase) return noBackend();
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        return error ? codeError(error.message) : null;
      },
      async verifyResetCode(email, code) {
        if (!supabase) return noBackend();
        const { error } = await supabase.auth.verifyOtp({ email, token: code, type: 'recovery' });
        return error ? codeError(error.message) : null;
      },
      async setPassword(password) {
        if (!supabase) return noBackend();
        const { error } = await supabase.auth.updateUser({ password });
        return error ? codeError(error.message) : null;
      },
      async sendVerifyCode() {
        const email = session?.user.email;
        if (!supabase || !email) return noBackend();
        const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } });
        return error ? codeError(error.message) : null;
      },
      async verifyCode(code) {
        const email = session?.user.email;
        if (!supabase || !email) return noBackend();
        const { error } = await supabase.auth.verifyOtp({ email, token: code, type: 'email' });
        return error ? codeError(error.message) : null;
      },
      async confirmWithProvider(provider) {
        const userId = session?.user.id;
        if (!supabase || !userId) return noBackend();
        const web = Platform.OS === 'web';
        // Opened before any wait, while the tap still counts, so browsers don't block it.
        const popup = web ? window.open('', 'deutschbook-reauth', 'width=520,height=680') : null;
        if (web && !popup) return tr('পপআপ খুলতে পারেনি। ব্রাউজারে এই সাইটের পপআপ চালু করে আবার চেষ্টা করুন।', 'Could not open the popup. Allow popups for this site in your browser and try again.');
        const fail = (message: string) => {
          popup?.close();
          return message;
        };
        if (!(await providerEnabled(provider))) return fail(friendlyOAuthError('provider is not enabled', provider));
        const redirectTo = web
          ? `${window.location.origin}${process.env.EXPO_BASE_URL ?? ''}/facebook-confirm.html`
          : Linking.createURL('auth/callback');
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider,
          // Facebook asks for the password again even when already logged in there.
          options: { redirectTo, skipBrowserRedirect: true, queryParams: { auth_type: 'reauthenticate' } },
        });
        if (error || !data.url) return fail(friendlyOAuthError(error?.message ?? 'Sign-in failed', provider));
        let returned: string | null;
        if (popup) {
          returned = await reauthInPopup(popup, data.url);
          popup.close();
        }
        else {
          // The returned link may come late (see handleAuthUrl): catch it here too.
          confirming = true;
          const late = new Promise<string | null>((resolve) => {
            confirmWaiter = resolve;
          });
          try {
            const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
            returned =
              result.type === 'success'
                ? result.url
                : await Promise.race([late, new Promise<null>((r) => setTimeout(() => r(null), LATE_LINK_MS))]);
          } finally {
            // Let a link already on its way be caught (and ignored) before sign-ins resume.
            setTimeout(() => {
              confirming = false;
              confirmWaiter = null;
            }, 1500);
          }
        }
        if (!returned) return tr('নিশ্চিত করা হয়নি। আবার চেষ্টা করুন।', 'Not confirmed. Please try again.');
        const { accessToken, error: authError } = readAuthResult(returned);
        if (authError) return friendlyOAuthError(authError, provider);
        if (!accessToken) return tr('নিশ্চিত করা হয়নি। আবার চেষ্টা করুন।', 'Not confirmed. Please try again.');
        // The new sign-in is only proof: check it is this same account, and keep the current session.
        const { data: who } = await supabase.auth.getUser(accessToken);
        if (who.user?.id !== userId) {
          const name = provider === 'google' ? 'Google' : 'Facebook';
          return tr(
            `এটি অন্য একটি ${name} অ্যাকাউন্ট। যে অ্যাকাউন্ট দিয়ে সাইন ইন করেছেন সেটি দিয়ে নিশ্চিত করুন।`,
            `This is a different ${name} account. Confirm with the account you signed in with.`,
          );
        }
        return null;
      },
      async signOut() {
        await supabase?.auth.signOut();
      },
      async deleteAccount() {
        if (!supabase) return noBackend();
        // Server-side function removes the user's progress and auth record.
        const { error } = await supabase.rpc('delete_my_account');
        if (error) return error.message;
        await supabase.auth.signOut();
        return null;
      },
    }),
    [session, ready],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
