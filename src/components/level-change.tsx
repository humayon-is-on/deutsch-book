import { useSyncExternalStore } from 'react';
import { Modal, View } from 'react-native';

import { AppText, Button, Card, Icon, PopupBackdrop } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { levelChange, type LevelChangeRequest } from '@/lib/level';
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

  return (
    <Modal transparent animationType="fade" onRequestClose={() => levelChange.answer(false)}>
      <PopupBackdrop>
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
