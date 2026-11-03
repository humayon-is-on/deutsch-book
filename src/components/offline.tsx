import { useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';
import { ActivityIndicator, Modal, Pressable, StyleSheet, View } from 'react-native';

import { AppText, Button, Card, Icon, Notice, PopupBackdrop } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useT } from '@/i18n';
import { openOffline, useOfflineWindow } from '@/services/content/offline';
import { checkConnection, useOnline } from '@/services/network';

/**
 * Offline mode on screen: things that need internet are dimmed, and tapping
 * them opens a popup asking for the connection.
 */

/** How faded the parts that need internet look while offline. */
const DIM = 0.4;

let asking = false;
const listeners = new Set<() => void>();
function setAsking(v: boolean) {
  asking = v;
  listeners.forEach((l) => l());
}
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};
const getAsking = () => asking;

/** Opens the "this needs internet" popup. */
export const askForInternet = () => setAsking(true);

/**
 * While offline: whether a topic or practice card is closed (`locked(id)`),
 * and `offline` itself. Online, nothing is closed.
 */
export function useOfflineLock() {
  const online = useOnline();
  const window = useOfflineWindow();
  return { offline: !online, locked: (id: string) => !online && !openOffline(window, id) };
}

/** Runs `action`, or asks for internet instead while offline. */
export function useNeedsInternet() {
  const online = useOnline();
  return (action: () => void) => () => (online ? action() : askForInternet());
}

/**
 * Wraps a part that needs internet: while `locked`, it is dimmed and a tap
 * anywhere on it asks for internet. Scrolling still works through it.
 */
export function OfflineCover({ locked, children }: { locked: boolean; children: ReactNode }) {
  const t = useT();
  if (!locked) return <>{children}</>;
  return (
    <View>
      <View style={{ opacity: DIM }} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
        {children}
      </View>
      <Pressable
        onPress={askForInternet}
        accessibilityRole="button"
        accessibilityLabel={t('ইন্টারনেট লাগবে', 'Needs internet')}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

/** A note at the top of a tab while offline, saying what still works. */
export function OfflineNotice({ children }: { children: string }) {
  const online = useOnline();
  if (online) return null;
  return <Notice tone="warning">{children}</Notice>;
}

/** The "this needs internet" popup. It closes by itself once the connection is back. */
export function OfflinePopup() {
  const open = useSyncExternalStore(subscribe, getAsking, getAsking);
  const online = useOnline();
  const { colors } = useTheme();
  const t = useT();
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (online && open) setAsking(false);
  }, [online, open]);

  if (!open || online) return null;
  const close = () => setAsking(false);
  const retry = async () => {
    setChecking(true);
    await checkConnection();
    setChecking(false);
  };

  return (
    <Modal transparent animationType="fade" onRequestClose={close}>
      <PopupBackdrop padding={Spacing.xl}>
        <Card style={{ alignItems: 'center', gap: Spacing.md, width: '100%', maxWidth: 420, alignSelf: 'center' }}>
          <Icon name="cloud-offline-outline" size={44} color={colors.wrong} />
          <AppText variant="heading" style={{ textAlign: 'center' }}>
            {t('ইন্টারনেট সংযোগ নেই', 'No internet connection')}
          </AppText>
          <AppText variant="bn" muted style={{ textAlign: 'center' }}>
            {t('পরের টপিকগুলো খুলতে ইন্টারনেট লাগবে।', 'The next topics need internet to open.')}
          </AppText>
          {checking ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            <Button title={t('আবার চেষ্টা করুন', 'Try again')} icon="refresh" onPress={retry} style={{ alignSelf: 'stretch' }} />
          )}
          <Button title={t('ঠিক আছে', 'OK')} variant="ghost" onPress={close} style={{ alignSelf: 'stretch' }} />
        </Card>
      </PopupBackdrop>
    </Modal>
  );
}
