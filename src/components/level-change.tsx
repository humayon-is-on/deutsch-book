import { useSyncExternalStore } from 'react';
import { Modal, View } from 'react-native';

import { IdentityCheck, identityProof, type IdentityProof } from '@/components/identity-check';
import { AppText, Button, Card, Icon, Notice, PopupBackdrop } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { levelChange, type LevelChangeRequest } from '@/lib/level';
import { useLevelIndex } from '@/services/content/store';
import { useAuth } from '@/state/auth';
import { levelProgress, useProgress } from '@/state/progress';
import { useT } from '@/i18n';

/** Shows the level-change popup whenever `confirmLevelChange` asks. */
export function LevelChangeHost() {
  const request = useSyncExternalStore(levelChange.subscribe, levelChange.current, levelChange.current);
  const { progress } = useProgress();
  const { session } = useAuth();
  const index = useLevelIndex();
  if (!request) return null;
  const complete = levelProgress(progress, index).complete;
  // No progress to lose: a plain yes/no. Guests can't be checked, and a
  // finished level needs no proof: those get the warning only.
  const needsProof = request.hasProgress && !request.earned && !complete;
  return <LevelChangePopup key={request.to} request={request} proof={needsProof ? identityProof(session) : null} />;
}

function LevelChangePopup({ request, proof }: { request: LevelChangeRequest; proof: IdentityProof | null }) {
  const { colors } = useTheme();
  const t = useT();
  const warning = t(
    `লেভেল বদলালে ${request.from ?? ''} লেভেলের সব অগ্রগতি মুছে যাবে এবং ${request.to} একদম শুরু থেকে শুরু হবে।`,
    `Changing level deletes all your ${request.from ?? ''} progress, and ${request.to} starts from the very beginning.`,
  );

  return (
    <Modal transparent animationType="fade" onRequestClose={() => levelChange.answer(false)}>
      <PopupBackdrop>
        <Card style={{ alignItems: 'stretch', gap: Spacing.md, width: '100%', maxWidth: 440, alignSelf: 'center' }}>
          <View style={{ alignSelf: 'center' }}>
            <Icon name="swap-vertical-outline" size={40} color={colors.primary} />
          </View>
          <AppText variant="heading" style={{ textAlign: 'center' }}>
            {t(`${request.to} লেভেলে যাবেন?`, `Go to level ${request.to}?`)}
          </AppText>
          {request.hasProgress ? (
            <Notice tone="warning">{warning}</Notice>
          ) : (
            request.from && (
              <AppText variant="bn" muted style={{ textAlign: 'center' }}>
                {t(`আপনি এখন ${request.from} লেভেলে আছেন।`, `You are now at level ${request.from}.`)}
              </AppText>
            )
          )}
          {proof ? (
            <IdentityCheck proof={proof} reason={t('লেভেল বদলাতে', 'to change your level')} onConfirmed={() => levelChange.answer(true)} />
          ) : (
            <Button
              title={t('লেভেল বদলান', 'Change level')}
              icon="swap-vertical-outline"
              variant={request.hasProgress ? 'danger' : 'primary'}
              onPress={() => levelChange.answer(true)} />
          )}
          <Button title={t('বাতিল', 'Cancel')} variant="ghost" onPress={() => levelChange.answer(false)} />
        </Card>
      </PopupBackdrop>
    </Modal>
  );
}
