import { router, useFocusEffect, usePathname } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, BackHandler, Modal, Platform, Pressable } from 'react-native';

import { Avatar } from '@/components/avatar';
import { AppText, Button, Card, Icon, Row, PopupBackdrop } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { backendEnabled } from '@/lib/supabase';
import { useIdentity } from '@/state/identity';
import { hasActivity, useProgress } from '@/state/progress';
import { useTestRunning } from '@/state/test-running';
import { tr, useT, type Translate } from '@/i18n';

/** Minutes of guest use between "create an account" reminders. */
const NUDGE_MINUTES = 5;

/** Pass the component's `t` when rendering, so the text follows a language change. */
export const guestWarning = (t: Translate = tr) =>
  t('দ্রুত সাইন ইন করুন, অন্যথায় অ্যাপ বন্ধ করলে আপনার সব অগ্রগতি মুছে যাবে।', 'Sign in soon, or all your progress will be deleted when you close the app.');

export function openSignUp() {
  router.push({ pathname: '/auth/sign-in', params: { mode: 'signup' } });
}

export function openSignIn() {
  router.push({ pathname: '/auth/sign-in', params: { mode: 'signin' } });
}

/** Reminder on Home that guest progress disappears when the app closes. */
export function GuestBanner() {
  const { isGuest } = useProgress();
  const { colors } = useTheme();
  const t = useT();
  if (!isGuest) return null;
  return (
    <Card style={{ borderColor: colors.warning, backgroundColor: colors.warningBg }}>
      <Row style={{ gap: Spacing.md }}>
        <Icon name="alert-circle-outline" color={colors.warning} />
        <AppText variant="bn" style={{ flex: 1 }}>
          {guestWarning(t)}
        </AppText>
      </Row>
      {backendEnabled && <Button title={t('অ্যাকাউন্ট খুলুন', 'Create account')} icon="person-add-outline" onPress={openSignUp} />}
      {backendEnabled && <Button title={t('সাইন ইন', 'Sign in')} icon="log-in-outline" variant="secondary" onPress={openSignIn} />}
    </Card>
  );
}

/**
 * Asks guests to create an account every few minutes while they use the app.
 * A reminder that falls due during a test or practice card waits until it is
 * finished; the next countdown starts when the reminder is closed.
 */
export function SignUpNudge() {
  const { isGuest, progress } = useProgress();
  const pathname = usePathname();
  const testRunning = useTestRunning();
  const [due, setDue] = useState(false);
  const t = useT();
  const active = isGuest && backendEnabled && progress.onboarded;
  const blocked = testRunning || pathname.startsWith('/auth');

  useEffect(() => {
    if (!active || due) return;
    const timer = setTimeout(() => setDue(true), NUDGE_MINUTES * 60 * 1000);
    return () => clearTimeout(timer);
  }, [active, due]);

  if (!due || !active || blocked) return null;
  const close = () => setDue(false);
  return (
    <Modal transparent animationType="fade" onRequestClose={close}>
      <PopupBackdrop padding={Spacing.xxl} dim={0.45}>
        <Card style={{ padding: Spacing.xl, gap: Spacing.md, width: '100%', maxWidth: 420, alignSelf: 'center' }}>
          <AppText variant="heading" style={{ textAlign: 'center' }}>
            {t('অগ্রগতি সংরক্ষণ করুন', 'Save your progress')}
          </AppText>
          <AppText variant="bn" style={{ textAlign: 'center' }}>
            {t(
              'আপনি এখন অতিথি মোডে আছেন। সাইন ইন বা সাইন আপ না করে অ্যাপ বন্ধ করলে আপনার অগ্রগতি সঙ্গে সঙ্গে মুছে যাবে।',
              'You are in guest mode. If you close the app without signing in or signing up, your progress is deleted right away.',
            )}
          </AppText>
          <Button
            title={t('অ্যাকাউন্ট খুলুন', 'Create account')}
            icon="person-add-outline"
            onPress={() => {
              close();
              openSignUp();
            }}
          />
          <Button title={t('পরে', 'Later')} variant="ghost" onPress={close} />
        </Card>
      </PopupBackdrop>
    </Modal>
  );
}

/** Web: the browser's own "Leave site?" prompt when a guest closes the tab. */
export function GuestExitGuard() {
  const { isGuest, progress } = useProgress();
  const atRisk = isGuest && hasActivity(progress);
  useEffect(() => {
    if (Platform.OS !== 'web' || !atRisk) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [atRisk]);
  return null;
}

/**
 * Android: pressing Back on Home closes the app, so warn guests first.
 * Phones give apps no chance to warn when they're swiped away.
 */
export function useGuestBackWarning() {
  const { isGuest, progress } = useProgress();
  const atRisk = isGuest && hasActivity(progress);
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== 'android' || !atRisk) return;
      const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        Alert.alert(tr('অ্যাপ বন্ধ করবেন?', 'Close the app?'), guestWarning(), [
          { text: tr('থাকুন', 'Stay'), style: 'cancel' },
          { text: tr('বন্ধ করুন', 'Close'), style: 'destructive', onPress: () => BackHandler.exitApp() },
          ...(backendEnabled ? [{ text: tr('অ্যাকাউন্ট খুলুন', 'Create account'), onPress: openSignUp }] : []),
        ]);
        return true;
      });
      return () => sub.remove();
    }, [atRisk]),
  );
}

/**
 * Get started's header button for a signed-in learner: their avatar, or the
 * plain account icon until they pick one. It opens Profile without the tab bar.
 */
export function StartAccountButton() {
  const { isGuest } = useProgress();
  const { avatar, name } = useIdentity();
  const t = useT();
  if (isGuest) return null;
  return (
    <Pressable
      onPress={() => router.push('/account')}
      accessibilityRole="button"
      accessibilityLabel={`${t('প্রোফাইল', 'Profile')}: ${name}`}
      hitSlop={8}
      // Native headers already keep the page margin; the web header needs it added to line up with the content.
      style={{ marginRight: Platform.OS === 'web' ? Spacing.md : 0 }}>
      <Avatar id={avatar} size={32} />
    </Pressable>
  );
}
