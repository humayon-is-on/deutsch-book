import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Platform, StyleSheet, TextInput, View } from 'react-native';

import { AppText, Button, Notice, Screen } from '@/components/ui';
import { Radius, Spacing, TouchTarget } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { confirm } from '@/lib/confirm';
import { backendEnabled } from '@/lib/supabase';
import { useAuth, type OAuthProvider } from '@/state/auth';
import { hasActivity, useProgress } from '@/state/progress';
import { tr, useT, type Translate } from '@/i18n';

/** Google's full-colour "G", as its sign-in button guidelines ask. */
const GOOGLE_G = require('../../../assets/images/google-g.png');

/** Facebook's brand blue, for its "f" logo. */
const FACEBOOK_BLUE = '#0866FF';

const PROVIDER_NAME: Record<OAuthProvider, string> = { google: 'Google', facebook: 'Facebook' };

const providerWarning = (name: string, t: Translate = tr) =>
  t(
    `এই ${name} অ্যাকাউন্টে আগে থেকে Deutsch Book অ্যাকাউন্ট থাকলে সেই অ্যাকাউন্টের অগ্রগতি থেকে শুরু হবে, আর এখনকার অগ্রগতি মুছে যাবে। নতুন হলে এখন পর্যন্ত করা অগ্রগতি সংরক্ষিত হবে।`,
    `If this ${name} account already has a Deutsch Book account, you continue from that account's progress and your current progress is deleted. If it is new, the progress you made so far is kept.`,
  );

const signInWarning = (t: Translate = tr) =>
  t(
    'নতুন হলে বরং অ্যাকাউন্ট খুলুন। পুরনো অ্যাকাউন্টে সাইন ইন করলে সেই অ্যাকাউন্টের আগের অগ্রগতি থেকে শুরু হবে, আর এখন পর্যন্ত করা নতুন অগ্রগতি মুছে যাবে।',
    'If you are new, create an account instead. Signing in to an existing account continues from that account’s progress, and the new progress you made so far is deleted.',
  );

export default function SignInScreen() {
  const params = useLocalSearchParams<{ mode?: string }>();
  const { signIn, signUp, signInWithProvider } = useAuth();
  const { progress, prepareAuth } = useProgress();
  const { colors } = useTheme();
  const t = useT();
  const [mode, setMode] = useState<'signin' | 'signup'>(params.mode === 'signup' ? 'signup' : 'signin');
  const guestWork = hasActivity(progress);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: 'info' | 'warning'; text: string } | null>(null);
  // A field's mistake shows once the learner has left it or pressed the button.
  const [shown, setShown] = useState({ email: false, password: false, password2: false });
  const emailError = !isEmail(email.trim())
    ? email.trim()
      ? t('সঠিক ইমেইল ঠিকানা লিখুন, যেমন name@gmail.com', 'Enter a valid email address, e.g. name@gmail.com')
      : t('ইমেইল ঠিকানা লিখুন', 'Enter your email address')
    : null;
  const passwordError = password.length < 8 ? t('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে', 'The password must be at least 8 characters') : null;
  // Only a new account asks for the password twice.
  const password2Error =
    mode !== 'signup'
      ? null
      : !password2
        ? t('পাসওয়ার্ডটি আবার লিখুন', 'Type the password again')
        : password2 !== password
          ? t('দুটি পাসওয়ার্ড মিলছে না', 'The two passwords don’t match')
          : null;

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

  const continueWith = async (provider: OAuthProvider) => {
    const name = PROVIDER_NAME[provider];
    if (guestWork && !(await confirm(t(`${name} দিয়ে চালিয়ে যাবেন?`, `Continue with ${name}?`), providerWarning(name, t), t('চালিয়ে যান', 'Continue')))) return;
    setMessage(null);
    // A new Google/Facebook account keeps the guest's progress; an existing one uses its own.
    prepareAuth('use-account');
    setBusy(true);
    const err = await signInWithProvider(provider);
    setBusy(false);
    if (err) return setMessage({ tone: 'warning', text: err });
    // On web the page has already left for the provider; on a phone we're signed in now.
    if (Platform.OS !== 'web') router.back();
  };

  const submit = async () => {
    setShown({ email: true, password: true, password2: true });
    if (emailError || passwordError || password2Error) return;
    if (mode === 'signin' && guestWork && !(await confirm(t('সাইন ইন করবেন?', 'Sign in?'), signInWarning(t), t('সাইন ইন', 'Sign in')))) return;
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
      return setMessage({ tone: 'info', text: t(
          'অ্যাকাউন্ট তৈরি হয়েছে। আপনার ইমেইলে পাঠানো লিংকে চাপ দিয়ে নিশ্চিত করুন, তারপর সাইন ইন করুন।',
          'Account created. Tap the link sent to your email to confirm, then sign in.',
        ),
      });
    }
    router.back();
  };

  return (
    <Screen edges={['bottom']}>
      <AppText variant="heading">{mode === 'signin' ? t('সাইন ইন', 'Sign in') : t('নতুন অ্যাকাউন্ট', 'New account')}</AppText>
      {mode === 'signin' && guestWork && <Notice tone="warning">{signInWarning(t)}</Notice>}
      {!backendEnabled && (
        <Notice tone="warning">
          {t('সার্ভার এখনো যুক্ত হয়নি, তাই এই মুহূর্তে সাইন ইন বা অ্যাকাউন্ট খোলা যাবে না।', 'The server is not connected yet, so you cannot sign in or create an account right now.')}
        </Notice>
      )}
      <View style={{ gap: 8 }}>
        <TextInput
          style={[inputStyle, shown.email && emailError ? { borderColor: colors.wrong } : null]}
          value={email}
          onChangeText={setEmail}
          onBlur={() => email && setShown((s) => ({ ...s, email: true }))}
          placeholder={t('ইমেইল', 'Email')}
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        {shown.email && emailError && <FieldError text={emailError} />}
        <TextInput
          style={[inputStyle, shown.password && passwordError ? { borderColor: colors.wrong } : null]}
          value={password}
          onChangeText={setPassword}
          onBlur={() => password && setShown((s) => ({ ...s, password: true }))}
          placeholder={t('পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর)', 'Password (at least 8 characters)')}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
          autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
          textContentType={mode === 'signin' ? 'password' : 'newPassword'}
        />
        {shown.password && passwordError && <FieldError text={passwordError} />}
        {mode === 'signup' && (
          <>
            <TextInput
              style={[inputStyle, shown.password2 && password2Error ? { borderColor: colors.wrong } : null]}
              value={password2}
              onChangeText={setPassword2}
              onBlur={() => password2 && setShown((s) => ({ ...s, password2: true }))}
              placeholder={t('পাসওয়ার্ড আবার লিখুন', 'Type the password again')}
              placeholderTextColor={colors.textSecondary}
              secureTextEntry
              autoComplete="new-password"
              textContentType="newPassword"
            />
            {shown.password2 && password2Error && <FieldError text={password2Error} />}
          </>
        )}
      </View>
      {message && <Notice tone={message.tone}>{message.text}</Notice>}
      {/* Links sit 8px under the button they belong to, on the right. */}
      <View style={styles.links}>
        <Button
          title={mode === 'signin' ? t('সাইন ইন', 'Sign in') : t('অ্যাকাউন্ট খুলুন', 'Create account')}
          onPress={submit}
          loading={busy}
          disabled={!backendEnabled}
        />
        {mode === 'signin' && (
          <Button
            title={t('পাসওয়ার্ড ভুলে গেছেন?', 'Forgot password?')}
            variant="ghost"
            style={styles.link}
            disabled={!backendEnabled}
            onPress={() => {
              setShown((s) => ({ ...s, email: true }));
              if (emailError) return;
              router.push({ pathname: '/auth/reset', params: { email: email.trim() } });
            }}
          />
        )}
      </View>
      <AppText variant="caption" muted style={{ textAlign: 'center' }}>
        {t('অথবা', 'or')}
      </AppText>
      <Button
        title={mode === 'signin' ? t('Google দিয়ে চালিয়ে যান', 'Continue with Google') : t('Google দিয়ে অ্যাকাউন্ট খুলুন', 'Sign up with Google')}
        leading={<Image source={GOOGLE_G} style={{ width: 20, height: 20 }} accessibilityIgnoresInvertColors />}
        variant="secondary"
        onPress={() => continueWith('google')}
        disabled={!backendEnabled || busy}
      />
      <View style={styles.links}>
        <Button
          title={mode === 'signin' ? t('Facebook দিয়ে চালিয়ে যান', 'Continue with Facebook') : t('Facebook দিয়ে অ্যাকাউন্ট খুলুন', 'Sign up with Facebook')}
          leading={<Ionicons name="logo-facebook" size={22} color={FACEBOOK_BLUE} />}
          variant="secondary"
          onPress={() => continueWith('facebook')}
          disabled={!backendEnabled || busy}
        />
        <Button
          title={mode === 'signin' ? t('নতুন অ্যাকাউন্ট খুলুন', 'Create a new account') : t('আগে থেকেই অ্যাকাউন্ট আছে', 'I already have an account')}
          variant="ghost"
          style={styles.link}
          onPress={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
        />
      </View>
    </Screen>
  );
}

/** A plain email check: something@something.domain, with no spaces. */
function isEmail(value: string) {
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[^\s@.]{2,}$/.test(value);
}

/** Red text under a field that has a mistake. */
function FieldError({ text }: { text: string }) {
  const { colors } = useTheme();
  return (
    <AppText variant="caption" color={colors.wrong} style={{ marginTop: -4 }}>
      {text}
    </AppText>
  );
}

const styles = StyleSheet.create({
  // 4px of padding plus the 4px gap puts the words 8px under the button above.
  links: { gap: 4 },
  link: { alignSelf: 'flex-end', paddingHorizontal: 0, paddingVertical: 4, minHeight: 0 },
});
