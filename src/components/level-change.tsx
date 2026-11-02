import { useSyncExternalStore } from 'react';
import { Modal, View } from 'react-native';

import { AppText, Button, Card, Icon, Notice, PopupBackdrop } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { levelChange, type LevelChangeRequest } from '@/lib/level';
import { useLevelIndex } from '@/services/content/store';
import { levelProgress, useProgress } from '@/state/progress';
import { useT } from '@/i18n';

/** Shows the level-change popup whenever `confirmLevelChange` asks. */
export function LevelChangeHost() {
  const request = useSyncExternalStore(levelChange.subscribe, levelChange.current, levelChange.current);
  const { progress } = useProgress();
  const index = useLevelIndex();
  if (!request) return null;
  // The tip about finishing a level first makes no sense once it is finished.
  const finished = levelProgress(progress, index).complete;
  return <LevelChangePopup key={request.to} request={request} showTip={!finished} />;
}

function LevelChangePopup({ request, showTip }: { request: LevelChangeRequest; showTip: boolean }) {
  const { colors } = useTheme();
  const t = useT();
  const { from, to } = request;

  return (
    <Modal transparent animationType="fade" onRequestClose={() => levelChange.answer(false)}>
      <PopupBackdrop>
        <Card style={{ alignItems: 'stretch', gap: Spacing.md, width: '100%', maxWidth: 440, alignSelf: 'center' }}>
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
          {showTip && (
            <Notice>
              {t(
                'একটি লেভেল ভালোভাবে শেষ করে পরেরটিতে গেলে আপনি আরও সাবলীল হবেন।',
                'Finishing one level well before moving to the next makes you more fluent.',
              )}
            </Notice>
          )}
          <Button title={t('লেভেল বদলান', 'Change level')} icon="swap-vertical-outline" onPress={() => levelChange.answer(true)} />
          <Button title={t('বাতিল', 'Cancel')} variant="ghost" onPress={() => levelChange.answer(false)} />
        </Card>
      </PopupBackdrop>
    </Modal>
  );
}
