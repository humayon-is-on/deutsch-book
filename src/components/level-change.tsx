import { useSyncExternalStore } from 'react';
import { Modal, View } from 'react-native';

import { IdentityCheck, identityProof, type IdentityProof } from '@/components/identity-check';
import { AppText, Button, Card, Icon, Notice } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { levelChange, type LevelChangeRequest } from '@/lib/level';
import { useLevelIndex } from '@/services/content/store';
import { useAuth } from '@/state/auth';
import { levelProgress, useProgress } from '@/state/progress';

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
  const warning = `লেভেল বদলালে ${request.from ?? ''} লেভেলের সব অগ্রগতি মুছে যাবে এবং ${request.to} একদম শুরু থেকে শুরু হবে।`;

  return (
    <Modal transparent animationType="fade" onRequestClose={() => levelChange.answer(false)}>
      <View style={{ flex: 1, justifyContent: 'center', padding: Spacing.lg, backgroundColor: 'rgba(0,0,0,0.55)' }}>
        <Card style={{ alignItems: 'stretch', gap: Spacing.md, width: '100%', maxWidth: 440, alignSelf: 'center' }}>
          <View style={{ alignSelf: 'center' }}>
            <Icon name="swap-vertical-outline" size={40} color={colors.primary} />
          </View>
          <AppText variant="heading" style={{ textAlign: 'center' }}>
            {request.to} লেভেলে যাবেন?
          </AppText>
          {request.hasProgress ? (
            <Notice tone="warning">{warning}</Notice>
          ) : (
            request.from && (
              <AppText variant="bn" muted style={{ textAlign: 'center' }}>
                আপনি এখন {request.from} লেভেলে আছেন।
              </AppText>
            )
          )}
          {proof ? (
            <>
              <AppText variant="bn" style={{ textAlign: 'center' }}>
                আপনি এখনো এই লেভেল শেষ করেননি।
              </AppText>
              <IdentityCheck proof={proof} reason="লেভেল বদলাতে" onConfirmed={() => levelChange.answer(true)} />
            </>
          ) : (
            <Button
              title="লেভেল বদলান"
              icon="swap-vertical-outline"
              variant={request.hasProgress ? 'danger' : 'primary'}
              onPress={() => levelChange.answer(true)} />
          )}
          <Button title="বাতিল" variant="secondary" onPress={() => levelChange.answer(false)} />
        </Card>
      </View>
    </Modal>
  );
}
