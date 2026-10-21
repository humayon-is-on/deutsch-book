import type { Session } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { supabase } from '@/lib/supabase';

type AuthValue = {
  session: Session | null;
  ready: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string) => Promise<string | null>;
  resetPassword: (email: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<string | null>;
};

const AuthContext = createContext<AuthValue | null>(null);

const NO_BACKEND = 'অ্যাকাউন্ট সার্ভার এখনো সেট আপ করা হয়নি। আপনার অগ্রগতি এই ডিভাইসে সংরক্ষিত হচ্ছে।';

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
        if (!supabase) return NO_BACKEND;
        const { error } = await supabase.auth.signUp({ email, password });
        return error ? error.message : null;
      },
      async resetPassword(email) {
        if (!supabase) return NO_BACKEND;
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        return error ? error.message : null;
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
