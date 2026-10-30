import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

import { CodeInput, ResendButton } from '@/components/code-input';
import { AppText, Button, Notice, Screen } from '@/components/ui';
import { Radius, Spacing, TouchTarget } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/state/auth';
import { useProgress } from '@/state/progress';

/**
 * Forgot password: a code goes to the learner's email; typing it in signs
 * them in, and then they choose a new password.
 */
export default function ResetPasswordScreen() {
  const { email = '' } = useLocalSearchParams<{ email?: string }>();
  const { resetPassword, verifyResetCode, setPassword } = useAuth();
  const { prepareAuth } = useProgress();
  const { colors } = useTheme();
  const [sentAt, setSentAt] = useState<number | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [verified, setVerified] = useState(false);
  const [password, setPasswordText] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const send = async () => {
    setSendError(null);
    setCodeError(null);
    setCode('');
    const err = await resetPassword(email);
    if (err) return setSendError(err);
    setSentAt(Date.now());
  };
  // The first code goes out as the screen opens.
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    send();
  });

  const check = async (value: string) => {
    setChecking(true);
    setCodeError(null);
    // Signing in this way uses the account's own progress, like a normal sign-in.
    prepareAuth('use-account');
    const err = await verifyResetCode(email, value);
    setChecking(false);
    if (err) return setCodeError(err);
    setVerified(true);
  };

  const save = async () => {
    if (password.length < 8) return setPasswordError('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে');
    setPasswordError(null);
    setSaving(true);
    const err = await setPassword(password);
    setSaving(false);
    if (err) return setPasswordError(err);
    setDone(true);
  };

  if (done) {
    return (
      <Screen edges={['bottom']}>
        <AppText variant="heading">পাসওয়ার্ড বদলানো হয়েছে</AppText>
        <Notice>নতুন পাসওয়ার্ড সংরক্ষণ হয়েছে, আর আপনি এখন সাইন ইন করা আছেন।</Notice>
        <Button
          title="অ্যাপে ফিরে যান"
          icon="arrow-forward"
          onPress={() => {
            if (router.canDismiss()) router.dismissAll();
            router.replace('/');
          }}
        />
      </Screen>
    );
  }

  if (verified) {
    return (
      <Screen edges={['bottom']}>
        <AppText variant="heading">নতুন পাসওয়ার্ড দিন</AppText>
        <View style={{ gap: 8 }}>
          <TextInput
            style={{
              minHeight: TouchTarget + 4,
              borderWidth: 1.5,
              borderColor: passwordError ? colors.wrong : colors.border,
              backgroundColor: colors.surface,
              color: colors.text,
              borderRadius: Radius.md,
              paddingHorizontal: Spacing.lg,
              fontSize: 16,
            }}
            value={password}
            onChangeText={setPasswordText}
            placeholder="নতুন পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর)"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
            autoComplete="new-password"
            textContentType="newPassword"
            autoFocus
          />
          {passwordError && (
            <AppText variant="caption" color={colors.wrong}>
              {passwordError}
            </AppText>
          )}
        </View>
        <Button title="পাসওয়ার্ড সংরক্ষণ করুন" icon="checkmark" loading={saving} onPress={save} />
      </Screen>
    );
  }

  return (
    <Screen edges={['bottom']}>
      <AppText variant="bn" muted>
        আমরা {email} ঠিকানায় একটি ৬ সংখ্যার কোড পাঠিয়েছি। কোডটি নিচে লিখুন।
      </AppText>
      {sendError && <Notice tone="warning">{sendError}</Notice>}
      <CodeInput value={code} onChange={setCode} onComplete={check} error={codeError} disabled={checking} />
      {checking && (
        <AppText variant="caption" muted style={{ textAlign: 'center' }}>
          কোড যাচাই হচ্ছে…
        </AppText>
      )}
      <ResendButton sentAt={sentAt} onResend={send} />
      <AppText variant="caption" muted style={{ textAlign: 'center' }}>
        ইমেইল না পেলে স্প্যাম ফোল্ডারও দেখুন।
      </AppText>
    </Screen>
  );
}
