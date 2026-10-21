import { router } from 'expo-router';
import { useState } from 'react';
import { TextInput } from 'react-native';

import { AppText, Button, Notice, Row, Screen } from '@/components/ui';
import { Radius, Spacing, TouchTarget } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { backendEnabled } from '@/lib/supabase';
import { useAuth } from '@/state/auth';

export default function SignInScreen() {
  const { signIn, signUp, resetPassword } = useAuth();
  const { colors } = useTheme();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
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

  const submit = async () => {
    setBusy(true);
    setMessage(null);
    const err = mode === 'signin' ? await signIn(email.trim(), password) : await signUp(email.trim(), password);
    setBusy(false);
    if (err) return setMessage({ tone: 'warning', text: err });
    if (mode === 'signup') {
      setMessage({ tone: 'info', text: 'অ্যাকাউন্ট তৈরি হয়েছে। প্রয়োজনে আপনার ইমেইলে পাঠানো লিংক দিয়ে নিশ্চিত করুন।' });
    } else {
      router.back();
    }
  };

  return (
    <Screen edges={['bottom']}>
      <AppText variant="heading">{mode === 'signin' ? 'সাইন ইন' : 'নতুন অ্যাকাউন্ট'}</AppText>
      <AppText variant="bn" muted>
        অ্যাকাউন্ট থাকলে আপনার অগ্রগতি সার্ভারে নিরাপদে থাকবে, ফোন বদলালেও হারাবে না।
      </AppText>
      {!backendEnabled && (
        <Notice tone="warning">সার্ভার এখনো যুক্ত হয়নি, তাই এই মুহূর্তে সাইন ইন করা যাবে না। অগ্রগতি এই ডিভাইসে সংরক্ষিত হচ্ছে।</Notice>
      )}
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
      {message && <Notice tone={message.tone}>{message.text}</Notice>}
      <Button
        title={mode === 'signin' ? 'সাইন ইন' : 'অ্যাকাউন্ট খুলুন'}
        onPress={submit}
        loading={busy}
        disabled={!backendEnabled || !email.includes('@') || password.length < 8}
      />
      <Row style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Button
          title={mode === 'signin' ? 'নতুন অ্যাকাউন্ট খুলুন' : 'আগে থেকেই অ্যাকাউন্ট আছে'}
          variant="ghost"
          onPress={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
        />
        {mode === 'signin' && (
          <Button
            title="পাসওয়ার্ড ভুলে গেছেন?"
            variant="ghost"
            disabled={!backendEnabled || !email.includes('@')}
            onPress={async () => {
              const err = await resetPassword(email.trim());
              setMessage(err ? { tone: 'warning', text: err } : { tone: 'info', text: 'পাসওয়ার্ড রিসেট লিংক আপনার ইমেইলে পাঠানো হয়েছে।' });
            }}
          />
        )}
      </Row>
    </Screen>
  );
}
