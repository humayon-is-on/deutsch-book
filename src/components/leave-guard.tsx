import { router, useNavigation } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Modal, Platform } from 'react-native';

import { AppText, Button, Card, Icon, PopupBackdrop } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useT } from '@/i18n';

/**
 * While `active` (a practice card or topic test is half done), every way out
 * asks first, since the answers so far are not kept: the header arrow, the
 * phone's Back button, and on the web the browser's Back button and reload.
 * Returns the popup to render and `leave`, for leaving without asking (e.g.
 * out of hearts).
 */
export function useLeaveGuard(active: boolean) {
  const navigation = useNavigation();
  const allowLeave = useRef(false);
  const [pending, setPending] = useState<(() => void) | null>(null);
  useEffect(() => {
    if (!active) return;
    return navigation.addListener('beforeRemove', (e) => {
      if (allowLeave.current) return;
      e.preventDefault();
      setPending(() => () => navigation.dispatch(e.data.action));
    });
  }, [navigation, active]);

  // Web: the browser's Back button skips `beforeRemove`, so an extra history
  // entry catches it, and a reload gets the browser's "Leave site?" prompt.
  useEffect(() => {
    if (!active || Platform.OS !== 'web' || typeof window === 'undefined') return;
    window.history.pushState({ ...window.history.state, [GUARD_KEY]: true }, '', window.location.href);
    const onPop = () => {
      if (allowLeave.current) return;
      window.history.pushState({ ...window.history.state, [GUARD_KEY]: true }, '', window.location.href);
      setPending(() => () => router.back());
    };
    const onUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('popstate', onPop);
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('beforeunload', onUnload);
      // Finished: take the extra entry away again, unless leaving already did.
      if (!allowLeave.current) dropGuardEntry(() => {});
    };
  }, [active]);

  const leave = () => {
    allowLeave.current = true;
    dropGuardEntry(() => router.back());
  };
  const confirm = pending ? (
    <LeaveConfirm
      onStay={() => setPending(null)}
      onLeave={() => {
        allowLeave.current = true;
        const go = pending;
        setPending(null);
        dropGuardEntry(go);
      }}
    />
  ) : null;
  return { leave, confirm };
}

const GUARD_KEY = '__leaveGuard';

/** Web: removes the extra history entry (if it is on top), then calls `then`. */
function dropGuardEntry(then: () => void) {
  if (Platform.OS !== 'web' || typeof window === 'undefined' || !window.history.state?.[GUARD_KEY]) return then();
  const done = () => {
    window.removeEventListener('popstate', done);
    then();
  };
  window.addEventListener('popstate', done);
  window.history.back();
}

function LeaveConfirm({ onStay, onLeave }: { onStay: () => void; onLeave: () => void }) {
  const t = useT();
  return (
    <Modal transparent animationType="fade" onRequestClose={onStay}>
      <PopupBackdrop padding={Spacing.xl}>
        <Card style={{ alignItems: 'center', gap: Spacing.md }}>
          <Icon name="exit-outline" size={44} />
          <AppText variant="heading" style={{ textAlign: 'center' }}>
            {t('মাঝপথে ছেড়ে যাবেন?', 'Leave halfway?')}
          </AppText>
          <AppText variant="bn" muted style={{ textAlign: 'center' }}>
            {t(
              'এখন বের হলে আপনার উত্তরগুলো সংরক্ষণ হবে না, পরের বার একদম শুরু থেকে শুরু করতে হবে।',
              'If you leave now, your answers will not be saved and you will have to start from the beginning next time.',
            )}
          </AppText>
          <Button title={t('চালিয়ে যান', 'Continue')} icon="play" onPress={onStay} style={{ alignSelf: 'stretch' }} />
          <Button title={t('বের হয়ে যান', 'Leave')} variant="secondary" onPress={onLeave} style={{ alignSelf: 'stretch' }} />
        </Card>
      </PopupBackdrop>
    </Modal>
  );
}
