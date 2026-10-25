import { router, useNavigation } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Modal, View } from 'react-native';

import { AppText, Button, Card, Icon } from '@/components/ui';
import { Spacing } from '@/constants/theme';

/**
 * While `active` (a practice card or topic test is half done), going back
 * asks first, since the answers so far are not kept. Returns the popup to
 * render and `leave`, for leaving without asking (e.g. out of hearts).
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

  const leave = () => {
    allowLeave.current = true;
    router.back();
  };
  const confirm = pending ? (
    <LeaveConfirm
      onStay={() => setPending(null)}
      onLeave={() => {
        allowLeave.current = true;
        pending();
      }}
    />
  ) : null;
  return { leave, confirm };
}

function LeaveConfirm({ onStay, onLeave }: { onStay: () => void; onLeave: () => void }) {
  return (
    <Modal transparent animationType="fade" onRequestClose={onStay}>
      <View style={{ flex: 1, justifyContent: 'center', padding: Spacing.xl, backgroundColor: 'rgba(0,0,0,0.55)' }}>
        <Card style={{ alignItems: 'center', gap: Spacing.md }}>
          <Icon name="exit-outline" size={44} />
          <AppText variant="heading" style={{ textAlign: 'center' }}>
            মাঝপথে ছেড়ে যাবেন?
          </AppText>
          <AppText variant="bn" muted style={{ textAlign: 'center' }}>
            এখন বের হলে এখানে আপনার উত্তরগুলো সংরক্ষণ হবে না।
          </AppText>
          <Button title="চালিয়ে যান" icon="play" onPress={onStay} style={{ alignSelf: 'stretch' }} />
          <Button title="বের হয়ে যান" variant="secondary" onPress={onLeave} style={{ alignSelf: 'stretch' }} />
        </Card>
      </View>
    </Modal>
  );
}
