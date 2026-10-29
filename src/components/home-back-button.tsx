import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** The header's back arrow on a page with no page behind it: it goes home instead. */
export function HomeBackButton() {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={() => router.replace('/')}
      accessibilityRole="button"
      accessibilityLabel="ফিরে যান"
      hitSlop={8}
      style={{ marginLeft: Spacing.md, marginRight: Spacing.lg }}>
      <Ionicons name="arrow-back" size={24} color={colors.primary} />
    </Pressable>
  );
}
