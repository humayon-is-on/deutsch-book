import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Platform, StyleSheet, TextInput, View } from 'react-native';

import { AppText, Button, Notice, Screen } from '@/components/ui';
import { Radius, Spacing, TouchTarget } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { confirm } from '@/lib/confirm';
import { backendEnabled } from '@/lib/supabase';
import { useAuth } from '@/state/auth';
import { hasActivity, useProgress } from '@/state/progress';

/** Google's full-colour "G", as its sign-in button guidelines ask. */
const GOOGLE_G = require('../../../assets/images/google-g.png');

const GOOGLE_WARNING =
  'এই Google অ্যাকাউন্টে আগে থেকে Deutsch Book অ্যাকাউন্ট থাকলে সেই অ্যাকাউন্টের অগ্রগতি থেকে শুরু হবে, আর এখনকার অগ্রগতি মুছে যাবে। নতুন হলে এখন পর্যন্ত করা অগ্রগতি সংরক্ষিত হবে।';

const SIGN_IN_WARNING =
  'নতুন হলে বরং অ্যাকাউন্ট খুলুন। পুরনো অ্যাকাউন্টে সাইন ইন করলে সেই অ্যাকাউন্টের আগের অগ্রগতি থেকে শুরু হবে, আর এখন পর্যন্ত করা নতুন অগ্রগতি মুছে যাবে।';

export default function SignInScreen() {
  const params = useLocalSearchParams<{ mode?: string }>();
  const { signIn, signUp, signInWithProvider, resetPassword } = useAuth();
  const { progress, prepareAuth } = useProgress();
  const { colors, scheme } = useTheme();
  const [mode, setMode] = useState<'signin' | 'signup'>(params.mode === 'signup' ? 'signup' : 'signin');
  const guestWork = hasActivity(progress);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: 'info' | 'warning'; text: string } | null>(null);

  const inputStyle = {
    minHeight: TouchTarget + 4,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.text,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    fontSize: 16,
  };

  const continueWithGoogle = async () => {
    if (guestWork && !(await confirm('Google দিয়ে চালিয়ে যাবেন?', GOOGLE_WARNING, 'চালিয়ে যান'))) return;
    setMessage(null);
    // A new Google account keeps the guest's progress; an existing one uses its own.
    prepareAuth('use-account');
    setBusy(true);
    const err = await signInWithProvider('google');
    setBusy(false);
    if (err) return setMessage({ tone: 'warning', text: err });
    // On web the page has already left for Google; on a phone we're signed in now.
    if (Platform.OS !== 'web') router.back();
  };

  const submit = async () => {
    if (mode === 'signin' && guestWork && !(await confirm('সাইন ইন করবেন?', SIGN_IN_WARNING, 'সাইন ইন'))) return;
    setBusy(true);
    setMessage(null);
    // Sign-up carries the guest's progress into the new account; sign-in uses the account's own.
    prepareAuth(mode === 'signup' ? 'keep-guest' : 'use-account');
    if (mode === 'signin') {
      const err = await signIn(email.trim(), password);
      setBusy(false);
      if (err) return setMessage({ tone: 'warning', text: err });
      return router.back();
    }
    const { error, confirmEmail } = await signUp(email.trim(), password);
    setBusy(false);
    if (error) return setMessage({ tone: 'warning', text: error });
    if (confirmEmail) {
      return setMessage({ tone: 'info', text: 'অ্যাকাউন্ট তৈরি হয়েছে। আপনার ইমেইলে পাঠানো লিংকে চাপ দিয়ে নিশ্চিত করুন, তারপর সাইন ইন করুন।' });
    }
    router.back();
  };

  return (
    <Screen edges={['bottom']}>
      <AppText variant="heading">{mode === 'signin' ? 'সাইন ইন' : 'নতুন অ্যাকাউন্ট'}</AppText>
      {mode === 'signin' && guestWork && <Notice tone="warning">{SIGN_IN_WARNING}</Notice>}
      {!backendEnabled && (
        <Notice tone="warning">সার্ভার এখনো যুক্ত হয়নি, তাই এই মুহূর্তে সাইন ইন বা অ্যাকাউন্ট খোলা যাবে না।</Notice>
      )}
      <View style={{ gap: 8 }}>
        <TextInput
          style={inputStyle}
          value={email}
          onChangeText={setEmail}
          placeholder="ইমেইল"
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <TextInput
          style={inputStyle}
          value={password}
          onChangeText={setPassword}
          placeholder="পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর)"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
          autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
          textContentType={mode === 'signin' ? 'password' : 'newPassword'}
        />
      </View>
      {message && <Notice tone={message.tone}>{message.text}</Notice>}
      {/* Links sit 8px under the button they belong to, on the right. */}
      <View style={styles.links}>
        <Button
          title={mode === 'signin' ? 'সাইন ইন' : 'অ্যাকাউন্ট খুলুন'}
          onPress={submit}
          loading={busy}
          disabled={!backendEnabled || !email.includes('@') || password.length < 8}
        />
        {mode === 'signin' && (
          <Button
            title="পাসওয়ার্ড ভুলে গেছেন?"
            variant="ghost"
            style={styles.link}
            disabled={!backendEnabled || !email.includes('@')}
            onPress={async () => {
              const err = await resetPassword(email.trim());
              setMessage(err ? { tone: 'warning', text: err } : { tone: 'info', text: 'পাসওয়ার্ড রিসেট লিংক আপনার ইমেইলে পাঠানো হয়েছে।' });
            }}
          />
        )}
      </View>
      <AppText variant="caption" muted style={{ textAlign: 'center' }}>
        অথবা
      </AppText>
      <Button
        title="Google দিয়ে চালিয়ে যান"
        leading={<Image source={GOOGLE_G} style={{ width: 20, height: 20 }} accessibilityIgnoresInvertColors />}
        variant="secondary"
        onPress={continueWithGoogle}
        disabled={!backendEnabled || busy}
      />
      <View style={styles.links}>
        <Button
          title="Apple দিয়ে চালিয়ে যান (শীঘ্রই আসছে)"
          leading={<Ionicons name="logo-apple" size={22} color={scheme === 'dark' ? '#FFFFFF' : '#000000'} />}
          variant="secondary"
          disabled
          onPress={() => {}}
        />
        <Button
          title={mode === 'signin' ? 'নতুন অ্যাকাউন্ট খুলুন' : 'আগে থেকেই অ্যাকাউন্ট আছে'}
          variant="ghost"
          style={styles.link}
          onPress={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  // 4px of padding plus the 4px gap puts the words 8px under the button above.
  links: { gap: 4 },
  link: { alignSelf: 'flex-end', paddingHorizontal: 0, paddingVertical: 4, minHeight: 0 },
});
