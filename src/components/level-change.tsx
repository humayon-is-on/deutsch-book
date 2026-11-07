import { useSyncExternalStore } from 'react';
import { Modal, View } from 'react-native';

import { AppText, Button, Card, Icon, PopupBackdrop } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { openSignIn, openSignUp } from '@/components/account';
import { levelChange, type LevelChangeRequest } from '@/lib/level';
import { useProgress } from '@/state/progress';
import { useT } from '@/i18n';

/** Shows the level-change popup whenever `confirmLevelChange` asks. */
export function LevelChangeHost() {
  const request = useSyncExternalStore(levelChange.subscribe, levelChange.current, levelChange.current);
  if (!request) return null;
  return <LevelChangePopup key={request.to} request={request} />;
}

function LevelChangePopup({ request }: { request: LevelChangeRequest }) {
  const { colors } = useTheme();
  const t = useT();
  const { from, to } = request;
  const { isGuest } = useProgress();
  const goTo = (open: () => void) => () => {
    levelChange.answer(false);
    open();
  };

  if (isGuest) {
    // A guest's progress is never saved, in any level: ask for an account first.
    return (
      <Modal transparent animationType="fade" onRequestClose={() => levelChange.answer(false)}>
        <PopupBackdrop onBackdropPress={() => levelChange.answer(false)}>
          <Card style={{ alignItems: 'stretch', gap: Spacing.lg, padding: Spacing.xl, paddingTop: Spacing.xxl, width: '100%', maxWidth: 440, alignSelf: 'center' }}>
            <View style={{ alignSelf: 'center' }}>
              <Icon name="alert-circle-outline" size={40} color={colors.warning} />
            </View>
            <AppText variant="heading" style={{ textAlign: 'center' }}>
              {t(`${to} লেভেলে যাবেন?`, `Go to level ${to}?`)}
            </AppText>
            <AppText variant="bn" muted style={{ textAlign: 'center' }}>
              {t(
                'আপনি অতিথি হিসেবে আছেন, তাই লেভেল বদলালেও আপনার অগ্রগতি সংরক্ষিত হবে না। অগ্রগতি রাখতে আগে অ্যাকাউন্ট খুলুন বা সাইন ইন করুন।',
                'You are using the app as a guest, so your progress will not be saved, even if you change level. To keep your progress, create an account or sign in first.',
              )}
            </AppText>
            <Button title={t('অ্যাকাউন্ট খুলুন', 'Create account')} icon="person-add-outline" onPress={goTo(openSignUp)} />
            <Button title={t('সাইন ইন', 'Sign in')} icon="log-in-outline" variant="secondary" onPress={goTo(openSignIn)} />
            <Button title={t('তবুও লেভেল বদলান', 'Change level anyway')} variant="ghost" onPress={() => levelChange.answer(true)} />
            <Button title={t('বাতিল', 'Cancel')} variant="ghost" onPress={() => levelChange.answer(false)} />
          </Card>
        </PopupBackdrop>
      </Modal>
    );
  }

  return (
    <Modal transparent animationType="fade" onRequestClose={() => levelChange.answer(false)}>
      <PopupBackdrop onBackdropPress={() => levelChange.answer(false)}>
        <Card style={{ alignItems: 'stretch', gap: Spacing.lg, padding: Spacing.xl, paddingTop: Spacing.xxl, width: '100%', maxWidth: 440, alignSelf: 'center' }}>
          <View style={{ alignSelf: 'center' }}>
            <Icon name="swap-vertical-outline" size={40} color={colors.primary} />
          </View>
          <AppText variant="heading" style={{ textAlign: 'center' }}>
            {t(`${to} লেভেলে যাবেন?`, `Go to level ${to}?`)}
          </AppText>
          <AppText variant="bn" muted style={{ textAlign: 'center' }}>
            {from &&
              t(
                `আপনার ${from} লেভেলের অগ্রগতি সংরক্ষিত থাকবে, যেকোনো সময় ফিরে আসতে পারবেন।`,
                `Your ${from} progress stays saved. You can come back any time.`,
              )}
            {request.resumes &&
              t(` ${to} লেভেলে যেখানে থেমেছিলেন, সেখান থেকেই চালিয়ে যাবেন।`, ` In ${to} you continue where you left off.`)}
          </AppText>
          <Button title={t('লেভেল বদলান', 'Change level')} icon="swap-vertical-outline" onPress={() => levelChange.answer(true)} />
          <Button title={t('বাতিল', 'Cancel')} variant="ghost" onPress={() => levelChange.answer(false)} />
        </Card>
      </PopupBackdrop>
    </Modal>
  );
}
