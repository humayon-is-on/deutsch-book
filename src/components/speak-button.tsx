import { Pressable, type StyleProp, type ViewStyle } from 'react-native';

import { Icon } from '@/components/ui';
import { TouchTarget } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { canSpeak, speakGerman } from '@/services/speech';

/** A speaker button, placed before German text, that reads it aloud; hidden where speech isn't available. */
export function SpeakButton({ text, size = 22, style }: { text: string; size?: number; style?: StyleProp<ViewStyle> }) {
  const { colors } = useTheme();
  if (!canSpeak) return null;
  return (
    <Pressable
      onPress={() => speakGerman(text)}
      accessibilityRole="button"
      accessibilityLabel="উচ্চারণ শুনুন"
      hitSlop={8}
      style={({ pressed }) => [
        { minWidth: TouchTarget - 8, minHeight: TouchTarget - 8, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.5 : 1 },
        style,
      ]}>
      <Icon name="volume-high" color={colors.primary} size={size} />
    </Pressable>
  );
}
