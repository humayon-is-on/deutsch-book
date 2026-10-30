import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';

import { AppText, Icon } from '@/components/ui';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** How long a toast stays up. */
const TOAST_MS = 3000;

/** A short message for `show()`, gone after three seconds or on its cross. */
export function useToast() {
  const [text, setText] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hide = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setText(null);
  }, []);
  const show = useCallback((message: string) => {
    if (timer.current) clearTimeout(timer.current);
    setText(message);
    timer.current = setTimeout(() => setText(null), TOAST_MS);
  }, []);
  useEffect(() => hide, [hide]);
  return { show, toast: text ? <Toast text={text} onClose={hide} /> : null };
}

/** Bottom middle of the screen, above the floating button. */
function Toast({ text, onClose }: { text: string; onClose: () => void }) {
  const { colors } = useTheme();
  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, right: 0, bottom: Spacing.lg + 64, alignItems: 'center', paddingHorizontal: Spacing.lg }}>
      <View
        accessibilityLiveRegion="polite"
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.sm,
          maxWidth: 420,
          paddingVertical: Spacing.sm,
          paddingLeft: Spacing.lg,
          paddingRight: Spacing.sm,
          borderRadius: Radius.pill,
          backgroundColor: colors.text,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: 6,
        }}>
        <Icon name="lock-closed" size={16} color={colors.background} />
        <AppText variant="bn" color={colors.background} style={{ flexShrink: 1 }}>
          {text}
        </AppText>
        <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="বন্ধ করুন" hitSlop={10} style={{ padding: 4 }}>
          <Icon name="close" size={18} color={colors.background} />
        </Pressable>
      </View>
    </View>
  );
}
