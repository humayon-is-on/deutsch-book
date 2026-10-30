import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, AppState, BackHandler, Modal, Platform, View } from 'react-native';

import { INTRO_DONE_AT } from '@/components/intro-splash';
import { AppText, Button, Card, Icon } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { CONTENT_URL } from '@/services/content/remote';

/** How often the app checks that it is still online while it is open. */
const CHECK_EVERY_MS = 15 * 1000;
/** A check that takes longer than this counts as no connection. */
const CHECK_TIMEOUT_MS = 8 * 1000;

/** True when the course server answers: the app needs it to work. */
async function isOnline() {
  if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.onLine === false) return false;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), CHECK_TIMEOUT_MS);
  try {
    const res = await fetch(`${CONTENT_URL}manifest.json?t=${Date.now()}`, { cache: 'no-store', signal: ctrl.signal });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/** Leaves the app: closes it on Android, leaves the page on the web. */
function quitApp() {
  if (Platform.OS === 'android') return BackHandler.exitApp();
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.close();
    // A browser only lets a page close a tab it opened itself; otherwise leave the page.
    window.location.replace('about:blank');
  }
}

/**
 * The app works only with internet. With none when it opens, or when the
 * connection drops while it is in use, a popup covers the app until the
 * connection is back (Try again) or the learner quits.
 */
export function NetworkGate() {
  const { colors } = useTheme();
  // 'start': no internet when the app opened; 'lost': it dropped while in use.
  const [problem, setProblem] = useState<'start' | 'lost' | null>(null);
  const [checking, setChecking] = useState(false);
  const started = useRef(false);
  const running = useRef(false);

  const check = useCallback(async () => {
    if (running.current) return;
    running.current = true;
    const online = await isOnline();
    running.current = false;
    if (online) {
      started.current = true;
      setProblem(null);
    } else {
      setProblem((p) => p ?? (started.current ? 'lost' : 'start'));
    }
  }, []);

  useEffect(() => {
    // The first check waits for the opening screen to finish.
    const first = setTimeout(check, INTRO_DONE_AT);
    const every = setInterval(check, CHECK_EVERY_MS);
    const app = AppState.addEventListener('change', (s) => s === 'active' && check());
    const goneOff = () => setProblem((p) => p ?? (started.current ? 'lost' : 'start'));
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.addEventListener('offline', goneOff);
      window.addEventListener('online', check);
    }
    return () => {
      clearTimeout(first);
      clearInterval(every);
      app.remove();
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.removeEventListener('offline', goneOff);
        window.removeEventListener('online', check);
      }
    };
  }, [check]);

  if (!problem) return null;

  const retry = async () => {
    setChecking(true);
    await check();
    setChecking(false);
  };
  const atStart = problem === 'start';

  return (
    <Modal transparent animationType="fade" onRequestClose={() => {}}>
      <View style={{ flex: 1, justifyContent: 'center', padding: Spacing.xl, backgroundColor: 'rgba(0,0,0,0.55)' }}>
        <Card style={{ alignItems: 'center', gap: Spacing.md, width: '100%', maxWidth: 420, alignSelf: 'center' }}>
          <Icon name="cloud-offline-outline" size={44} color={colors.wrong} />
          <AppText variant="heading" style={{ textAlign: 'center' }}>
            {atStart ? 'ইন্টারনেট সংযোগ নেই' : 'সংযোগ বিচ্ছিন্ন হয়েছে'}
          </AppText>
          <AppText variant="bn" muted style={{ textAlign: 'center' }}>
            {atStart
              ? 'অ্যাপটি চালাতে ইন্টারনেট লাগবে। ইন্টারনেট সংযোগ চালু করে আবার চেষ্টা করুন।'
              : 'ইন্টারনেট সংযোগ চলে গেছে। নেটওয়ার্কের সমস্যা ঠিক করে আবার চেষ্টা করুন।'}
          </AppText>
          {checking ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            <Button
              title={atStart ? 'ঠিক আছে' : 'আবার চেষ্টা করুন'}
              icon={atStart ? 'checkmark' : 'refresh'}
              onPress={retry}
              style={{ alignSelf: 'stretch' }}
            />
          )}
          <Button title="বন্ধ করুন" icon="close" variant="secondary" onPress={quitApp} style={{ alignSelf: 'stretch' }} />
        </Card>
      </View>
    </Modal>
  );
}
