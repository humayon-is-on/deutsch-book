import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, TextInput, View } from 'react-native';

import { AppText, Button } from '@/components/ui';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

// Web draws a focus ring round the hidden field; the boxes show focus instead.
const NO_OUTLINE = Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : null;

/** Digits in an emailed code (Supabase's default length). */
export const CODE_LENGTH = 6;
/** Seconds before a new code can be asked for. */
const RESEND_SECONDS = 120;

/**
 * One box per digit of an emailed code. When the last digit is typed,
 * `onComplete` runs with the whole code. `error` turns the boxes red and
 * shows the message under them.
 */
export function CodeInput({
  value,
  onChange,
  onComplete,
  error,
  disabled,
}: {
  value: string;
  onChange: (code: string) => void;
  onComplete: (code: string) => void;
  error?: string | null;
  disabled?: boolean;
}) {
  const { colors } = useTheme();
  const input = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);

  const change = (text: string) => {
    const code = text.replace(/\D/g, '').slice(0, CODE_LENGTH);
    onChange(code);
    if (code.length === CODE_LENGTH) onComplete(code);
  };

  return (
    <View style={{ gap: Spacing.sm }}>
      <Pressable onPress={() => input.current?.focus()} accessibilityLabel="যাচাই কোড" style={{ flexDirection: 'row', gap: 6, justifyContent: 'center' }}>
        {Array.from({ length: CODE_LENGTH }, (_, i) => {
          const active = focused && i === Math.min(value.length, CODE_LENGTH - 1);
          return (
            <View
              key={i}
              style={{
                // Shrinks on narrow screens and inside popups, up to 44 wide.
                flex: 1,
                maxWidth: 44,
                height: 52,
                borderRadius: Radius.md,
                borderWidth: active ? 2 : 1.5,
                borderColor: error ? colors.wrong : active ? colors.primary : colors.border,
                backgroundColor: colors.surface,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AppText variant="heading">{value[i] ?? ''}</AppText>
            </View>
          );
        })}
        {/* One real field under the boxes takes the typing and pasting. */}
        <TextInput
          ref={input}
          value={value}
          onChangeText={change}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          editable={!disabled}
          keyboardType="number-pad"
          inputMode="numeric"
          autoComplete="one-time-code"
          textContentType="oneTimeCode"
          maxLength={CODE_LENGTH}
          autoFocus
          caretHidden
          style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.01, color: 'transparent', borderWidth: 0 }, NO_OUTLINE]}
        />
      </Pressable>
      {error ? (
        <AppText variant="caption" color={colors.wrong} style={{ textAlign: 'center' }}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

/**
 * "Send the code again", usable once every two minutes. `sentAt` is when
 * the last code went out; the button counts down until it may be pressed.
 * Each press locks it for another two minutes straight away, even while the
 * send is still on its way or if it fails, so it can't be tapped twice.
 */
export function ResendButton({ sentAt, onResend }: { sentAt: number | null; onResend: () => void }) {
  const [now, setNow] = useState(() => Date.now());
  const [pressedAt, setPressedAt] = useState<number | null>(null);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const since = Math.max(sentAt ?? 0, pressedAt ?? 0);
  const left = since ? Math.max(0, Math.ceil((since + RESEND_SECONDS * 1000 - now) / 1000)) : 0;
  const press = () => {
    if (left > 0) return;
    const at = Date.now();
    setPressedAt(at);
    setNow(at);
    onResend();
  };
  const clock = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`;
  return (
    <Button
      title={left > 0 ? `আবার কোড পাঠান (${toBangla(clock)})` : 'আবার কোড পাঠান'}
      icon="mail-outline"
      variant="ghost"
      disabled={left > 0}
      onPress={press}
    />
  );
}

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
const toBangla = (s: string) => s.replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
