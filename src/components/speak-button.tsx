import { Pressable, type StyleProp, type ViewStyle } from 'react-native';

import { AppText, Icon } from '@/components/ui';
import { Radius, Spacing, TouchTarget } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { canSpeak, speakGerman } from '@/services/speech';

/**
 * Where speaker buttons sit: before the German text, or in a row under it.
 * Set per build while the two layouts are compared.
 */
export const SPEAKER_AT: 'start' | 'bottom' = process.env.EXPO_PUBLIC_SPEAKER_AT === 'bottom' ? 'bottom' : 'start';

/**
 * A button that reads `text` aloud in German; hidden where speech isn't
 * available. `label` turns the plain icon into a small pill with that text.
 */
export function SpeakButton({
  text,
  size = 22,
  label,
  style,
}: {
  text: string;
  size?: number;
  label?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();
  if (!canSpeak) return null;
  return (
    <Pressable
      onPress={() => speakGerman(text)}
      accessibilityRole="button"
      accessibilityLabel={label ?? 'উচ্চারণ শুনুন'}
      hitSlop={8}
      style={({ pressed }) => [
        label
          ? {
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
              gap: Spacing.xs,
              paddingHorizontal: Spacing.md,
              paddingVertical: 6,
              borderRadius: Radius.pill,
              backgroundColor: colors.surfaceMuted,
            }
          : { minWidth: TouchTarget - 8, minHeight: TouchTarget - 8, alignItems: 'center', justifyContent: 'center' },
        { opacity: pressed ? 0.5 : 1 },
        style,
      ]}>
      <Icon name="volume-high" color={colors.primary} size={label ? 16 : size} />
      {label ? (
        <AppText variant="caption" color={colors.primary} style={{ fontWeight: '700' }}>
          {label}
        </AppText>
      ) : null}
    </Pressable>
  );
}
