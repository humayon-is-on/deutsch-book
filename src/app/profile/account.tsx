import { useState } from 'react';
import { Pressable, TextInput, View, type TextInputProps } from 'react-native';

import { GUEST_WARNING, openSignIn, openSignUp } from '@/components/account';
import { SyncLine } from '@/components/account-card';
import { Avatar, AVATARS } from '@/components/avatar';
import { DeleteAccountPopup } from '@/components/delete-account';
import { AppText, Button, Card, Icon, Screen } from '@/components/ui';
import { Radius, Spacing, TouchTarget } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { backendEnabled } from '@/lib/supabase';
import { useAuth } from '@/state/auth';
import { useIdentity } from '@/state/identity';
import { useProgress } from '@/state/progress';

/** Longest name a learner can type. */
const NAME_MAX = 30;
/** Longest username a learner can type. */
const USERNAME_MAX = 20;

/** Usernames keep to small English letters, digits, `_` and `.`. */
function cleanUsername(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9_.]/g, '')
    .slice(0, USERNAME_MAX);
}

/** A labelled text box; `locked` shows a value that can't be changed. */
function Field({ label, locked, ...input }: TextInputProps & { label: string; locked?: boolean }) {
  const { colors } = useTheme();
  return (
    <View style={{ gap: Spacing.xs }}>
      <AppText variant="label">{label}</AppText>
      <View>
        <TextInput
          {...input}
          editable={!locked}
          placeholderTextColor={colors.textSecondary}
          accessibilityLabel={label}
          style={{
            minHeight: TouchTarget + 4,
            borderWidth: 1.5,
            borderColor: colors.border,
            backgroundColor: locked ? colors.surfaceMuted : colors.surface,
            color: locked ? colors.textSecondary : colors.text,
            borderRadius: Radius.md,
            paddingHorizontal: Spacing.lg,
            paddingRight: locked ? Spacing.xxl + Spacing.lg : Spacing.lg,
            fontSize: 16,
          }}
        />
        {locked && (
          <View style={{ position: 'absolute', right: Spacing.lg, top: 0, bottom: 0, justifyContent: 'center' }}>
            <Icon name="lock-closed-outline" size={18} color={colors.textSecondary} />
          </View>
        )}
      </View>
    </View>
  );
}

/** Opened from Profile's account card: avatar, name, email, username and account deletion. */
export default function AccountDetailsScreen() {
  const { session } = useAuth();
  const { progress, setProfile, syncStatus } = useProgress();
  const { avatar, accountName } = useIdentity();
  const { colors } = useTheme();
  const [picking, setPicking] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (!session) {
    return (
      <Screen edges={['bottom']}>
        <Card>
          <AppText variant="bn">{GUEST_WARNING}</AppText>
          <Button title="অ্যাকাউন্ট খুলুন" icon="person-add-outline" disabled={!backendEnabled} onPress={openSignUp} />
          <Button title="সাইন ইন" variant="secondary" disabled={!backendEnabled} onPress={openSignIn} />
        </Card>
      </Screen>
    );
  }

  return (
    <Screen edges={['bottom']}>
      <View style={{ alignItems: 'center', gap: Spacing.sm }}>
        <Pressable
          onPress={() => setPicking((p) => !p)}
          accessibilityRole="button"
          accessibilityState={{ expanded: picking }}
          accessibilityLabel="অ্যাভাটার পরিবর্তন করুন"
          hitSlop={8}>
          <Avatar id={avatar} size={104} />
          <View
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: 34,
              height: 34,
              borderRadius: 17,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.primary,
              borderWidth: 3,
              borderColor: colors.background,
            }}>
            <Icon name="pencil" size={16} color={colors.primaryText} />
          </View>
        </Pressable>
        <AppText variant="caption" muted>
          {avatar === undefined ? 'অ্যাভাটার বেছে নিতে ছবিতে চাপ দিন' : 'অ্যাভাটার বদলাতে ছবিতে চাপ দিন'}
        </AppText>
        <SyncLine status={syncStatus} />
      </View>

      {picking && (
        <Card>
          <AppText variant="label">অ্যাভাটার বেছে নিন</AppText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, justifyContent: 'center' }}>
            {AVATARS.map((_, id) => {
              const isSelected = id === avatar;
              return (
                <Pressable
                  key={id}
                  onPress={() => {
                    setProfile({ avatar: id });
                    setPicking(false);
                  }}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  accessibilityLabel={`অ্যাভাটার ${id + 1}`}
                  style={{ padding: 3, borderRadius: 40, borderWidth: 3, borderColor: isSelected ? colors.primary : 'transparent' }}>
                  <Avatar id={id} size={48} />
                  {isSelected && (
                    <View style={{ position: 'absolute', right: -2, bottom: -2, backgroundColor: colors.surface, borderRadius: 12 }}>
                      <Icon name="checkmark-circle" size={20} color={colors.primary} />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        </Card>
      )}

      <Field
        label="নাম"
        value={progress.settings.displayName ?? ''}
        onChangeText={(t) => setProfile({ displayName: t.slice(0, NAME_MAX) })}
        placeholder={accountName}
        maxLength={NAME_MAX}
        autoCapitalize="words"
      />

      <Field label="ইমেইল" value={session.user.email ?? ''} locked />

      <Field
        label="ইউজারনেম"
        value={progress.settings.username ?? ''}
        onChangeText={(t) => setProfile({ username: cleanUsername(t) })}
        placeholder="যেমন: rahim_23"
        maxLength={USERNAME_MAX}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <View style={{ marginTop: Spacing.lg }}>
        <Button
            title="অ্যাকাউন্ট স্থায়ীভাবে মুছুন"
            icon="trash-outline"
            variant="danger"
            onPress={() => setDeleting(true)}
        />
      </View>
      {deleting && <DeleteAccountPopup onClose={() => setDeleting(false)} />}
    </Screen>
  );
}
