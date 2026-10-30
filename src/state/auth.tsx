import type { Session } from '@supabase/supabase-js';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';

import { providerEnabled, supabase } from '@/lib/supabase';

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
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<string | null>;
};

export type OAuthProvider = 'google' | 'facebook';

const AuthContext = createContext<AuthValue | null>(null);

WebBrowser.maybeCompleteAuthSession();

/** The server's English messages for emailed codes, in plain Bangla. */
function codeError(message: string) {
  if (/expired|invalid|token/i.test(message)) return 'কোডটি ভুল বা মেয়াদ শেষ হয়ে গেছে। আবার দেখে লিখুন, অথবা নতুন কোড নিন।';
  if (/rate|seconds|too many/i.test(message)) return 'অনেকবার চেষ্টা হয়েছে। একটু পরে আবার চেষ্টা করুন।';
  if (/should be different/i.test(message)) return 'নতুন পাসওয়ার্ডটি আগেরটি থেকে আলাদা হতে হবে।';
  if (/password/i.test(message)) return 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।';
  if (/fetch|network/i.test(message)) return 'ইন্টারনেট সংযোগ নেই। সংযোগ ঠিক করে আবার চেষ্টা করুন।';
  return 'কিছু একটা ভুল হয়েছে। একটু পরে আবার চেষ্টা করুন।';
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
  if (/not enabled|unsupported provider/i.test(message)) return `${name} দিয়ে সাইন ইন এখনো চালু করা হয়নি।`;
  return message;
}

const NO_BACKEND = 'অ্যাকাউন্ট সার্ভার এখনো সেট আপ করা হয়নি।';

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
    return () => data.subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      session,
      ready,
      async signIn(email, password) {
        if (!supabase) return NO_BACKEND;
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return error ? error.message : null;
      },
      async signUp(email, password) {
        if (!supabase) return { error: NO_BACKEND, confirmEmail: false };
        const { data, error } = await supabase.auth.signUp({ email, password });
        return { error: error ? error.message : null, confirmEmail: !error && !data.session };
      },
      async signInWithProvider(provider) {
        if (!supabase) return NO_BACKEND;
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
        if (result.type !== 'success') return null; // closed by the learner
        const { accessToken, refreshToken, error: authError } = readAuthResult(result.url);
        if (authError) return friendlyOAuthError(authError, provider);
        if (!accessToken || !refreshToken) return 'Sign-in failed';
        const { error: sessionError } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
        return sessionError ? sessionError.message : null;
      },
      async resetPassword(email) {
        if (!supabase) return NO_BACKEND;
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        return error ? codeError(error.message) : null;
      },
      async verifyResetCode(email, code) {
        if (!supabase) return NO_BACKEND;
        const { error } = await supabase.auth.verifyOtp({ email, token: code, type: 'recovery' });
        return error ? codeError(error.message) : null;
      },
      async setPassword(password) {
        if (!supabase) return NO_BACKEND;
        const { error } = await supabase.auth.updateUser({ password });
        return error ? codeError(error.message) : null;
      },
      async sendVerifyCode() {
        const email = session?.user.email;
        if (!supabase || !email) return NO_BACKEND;
        const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } });
        return error ? codeError(error.message) : null;
      },
      async verifyCode(code) {
        const email = session?.user.email;
        if (!supabase || !email) return NO_BACKEND;
        const { error } = await supabase.auth.verifyOtp({ email, token: code, type: 'email' });
        return error ? codeError(error.message) : null;
      },
      async signOut() {
        await supabase?.auth.signOut();
      },
      async deleteAccount() {
        if (!supabase) return NO_BACKEND;
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
