import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { AppText, Card, Icon, Row } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/state/auth';
import { useIdentity } from '@/state/identity';
import type { SyncStatus } from '@/state/progress';
import { useT } from '@/i18n';

const syncText: Record<SyncStatus, { label: string; en: string; icon: string }> = {
  guest: { label: 'অতিথি মোড', en: 'Guest mode', icon: 'person-outline' },
  local: { label: 'ডিভাইসে সংরক্ষিত', en: 'Saved on this device', icon: 'phone-portrait-outline' },
  saving: { label: 'সংরক্ষণ হচ্ছে…', en: 'Saving…', icon: 'sync-outline' },
  synced: { label: 'ক্লাউডে সংরক্ষিত', en: 'Saved to the cloud', icon: 'cloud-done-outline' },
  offline: { label: 'অফলাইন, ডিভাইসে সংরক্ষিত', en: 'Offline, saved on this device', icon: 'cloud-offline-outline' },
};

/** Where the learner's progress is saved right now. */
export function SyncLine({ status }: { status: SyncStatus }) {
  const { colors } = useTheme();
  const s = syncText[status];
  const t = useT();
  return (
    <Row style={{ gap: Spacing.xs }}>
      <Icon name={s.icon} size={16} color={status === 'synced' ? colors.correct : colors.textSecondary} />
      <AppText variant="caption" muted>
        {t(s.label, s.en)}
      </AppText>
    </Row>
  );
}

/**
 * The signed-in learner's card on Profile. Tapping it opens the Account
 * screen, where the avatar, name and username are changed.
 */
export function AccountCard() {
  const { session } = useAuth();
  const { avatar, name } = useIdentity();
  const t = useT();

  return (
    <Card>
      <Pressable onPress={() => router.push('/profile/account')} accessibilityRole="button" accessibilityLabel={t('অ্যাকাউন্ট খুলুন', 'Open account')}>
        <Row style={{ gap: Spacing.md }}>
          <Avatar id={avatar} size={56} />
          <View style={{ flex: 1, gap: 2 }}>
            <AppText variant="subheading">{name}</AppText>
            <AppText variant="caption" muted>
              {session?.user.email}
            </AppText>
          </View>
          <Icon name="chevron-forward" size={24} />
        </Row>
      </Pressable>
    </Card>
  );
}
