import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { Avatar, AVATARS } from '@/components/avatar';
import { AppText, Card, Icon, Row } from '@/components/ui';
import { Radius, Spacing, TouchTarget } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/state/auth';
import { useIdentity } from '@/state/identity';
import { useProgress, type SyncStatus } from '@/state/progress';

const syncText: Record<SyncStatus, { label: string; icon: string }> = {
  guest: { label: 'অতিথি মোড', icon: 'person-outline' },
  local: { label: 'ডিভাইসে সংরক্ষিত', icon: 'phone-portrait-outline' },
  saving: { label: 'সংরক্ষণ হচ্ছে…', icon: 'sync-outline' },
  synced: { label: 'ক্লাউডে সংরক্ষিত', icon: 'cloud-done-outline' },
  offline: { label: 'অফলাইন, ডিভাইসে সংরক্ষিত', icon: 'cloud-offline-outline' },
};

/** Where the learner's progress is saved right now. */
function SyncLine({ status }: { status: SyncStatus }) {
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

/** Longest name a learner can type. */
const NAME_MAX = 30;

/**
 * The signed-in learner's card on Profile. The arrow opens the avatar
 * picker and the name field; both are saved with the account.
 */
export function AccountCard() {
  const { session } = useAuth();
  const { progress, setProfile, syncStatus } = useProgress();
  const { avatar, name, accountName } = useIdentity();
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  // Fold the card back up when the user leaves the screen.
  useFocusEffect(useCallback(() => () => setOpen(false), []));

  return (
    <Card>
      <Pressable
        onPress={() => setOpen((o) => !o)}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel="অ্যাভাটার ও নাম পরিবর্তন করুন">
        <Row style={{ gap: Spacing.md }}>
          <Avatar id={avatar} size={56} />
          <View style={{ flex: 1, gap: 2 }}>
            <AppText variant="subheading">{name}</AppText>
            <AppText variant="caption" muted>
              {session?.user.email}
            </AppText>
          </View>
          <Icon name={open ? 'chevron-up' : 'chevron-down'} size={24} />
        </Row>
      </Pressable>
      <SyncLine status={syncStatus} />

      {open && (
        <View style={{ gap: Spacing.md, marginTop: Spacing.sm }}>
          <AppText variant="label">অ্যাভাটার বেছে নিন</AppText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, justifyContent: 'center' }}>
            {AVATARS.map((_, id) => {
              const isSelected = id === avatar;
              return (
                <Pressable
                  key={id}
                  onPress={() => setProfile({ avatar: id })}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  accessibilityLabel={`অ্যাভাটার ${id + 1}`}
                  style={{
                    padding: 3,
                    borderRadius: 40,
                    borderWidth: 3,
                    borderColor: isSelected ? colors.primary : 'transparent',
                  }}>
                  <Avatar id={id} size={48} />
                  {isSelected && (
                    <View
                      style={{
                        position: 'absolute',
                        right: -2,
                        bottom: -2,
                        backgroundColor: colors.surface,
                        borderRadius: 12,
                      }}>
                      <Icon name="checkmark-circle" size={20} color={colors.primary} />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>

          <AppText variant="label">নাম</AppText>
          <TextInput
            value={progress.settings.displayName ?? ''}
            onChangeText={(t) => setProfile({ displayName: t.slice(0, NAME_MAX) })}
            placeholder={accountName}
            placeholderTextColor={colors.textSecondary}
            maxLength={NAME_MAX}
            autoCapitalize="words"
            accessibilityLabel="নাম"
            style={{
              minHeight: TouchTarget + 4,
              borderWidth: 1.5,
              borderColor: colors.border,
              backgroundColor: colors.surface,
              color: colors.text,
              borderRadius: Radius.md,
              paddingHorizontal: Spacing.lg,
              fontSize: 16,
            }}
          />
          <AppText variant="caption" muted>
            ঘর খালি রাখলে অ্যাকাউন্টের নাম দেখানো হবে।
          </AppText>
        </View>
      )}
    </Card>
  );
}
