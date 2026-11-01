import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useT } from '@/i18n';

/** The header's back arrow on a page with no page behind it: it goes home instead. */
export function HomeBackButton() {
  const t = useT();
  return <HeaderButton icon="arrow-back" label={t('ফিরে যান', 'Go back')} />;
}

/**
 * The header's cross on a test or practice card: tests only move forward,
 * so the way out is a cross, not a back arrow. Leaving half-way asks first
 * (see leave-guard), and the card starts again from the beginning next time.
 */
export function ExitButton() {
  const t = useT();
  return <HeaderButton icon="close" label={t('বের হয়ে যান', 'Leave')} />;
}

function HeaderButton({ icon, label }: { icon: 'arrow-back' | 'close'; label: string }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      style={{ marginLeft: Spacing.md, marginRight: Spacing.lg }}>
      <Ionicons name={icon} size={icon === 'close' ? 28 : 24} color={colors.primary} />
    </Pressable>
  );
}
