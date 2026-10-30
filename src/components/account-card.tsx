import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { AppText, Card, Icon, Row } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/state/auth';
import { useIdentity } from '@/state/identity';
import type { SyncStatus } from '@/state/progress';

const syncText: Record<SyncStatus, { label: string; icon: string }> = {
  guest: { label: 'অতিথি মোড', icon: 'person-outline' },
  local: { label: 'ডিভাইসে সংরক্ষিত', icon: 'phone-portrait-outline' },
  saving: { label: 'সংরক্ষণ হচ্ছে…', icon: 'sync-outline' },
  synced: { label: 'ক্লাউডে সংরক্ষিত', icon: 'cloud-done-outline' },
  offline: { label: 'অফলাইন, ডিভাইসে সংরক্ষিত', icon: 'cloud-offline-outline' },
};

/** Where the learner's progress is saved right now. */
export function SyncLine({ status }: { status: SyncStatus }) {
  const { colors } = useTheme();
  const s = syncText[status];
  return (
    <Row style={{ gap: Spacing.xs }}>
      <Icon name={s.icon} size={16} color={status === 'synced' ? colors.correct : colors.textSecondary} />
      <AppText variant="caption" muted>
        {s.label}
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

  return (
    <Card>
      <Pressable onPress={() => router.push('/profile/account')} accessibilityRole="button" accessibilityLabel="অ্যাকাউন্ট খুলুন">
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
