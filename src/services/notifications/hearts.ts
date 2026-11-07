import { requireOptionalNativeModule } from 'expo';
import { Platform } from 'react-native';

import { tr } from '@/i18n';
import { LIVES_MAX, currentLives, heartsFullAt, type Lives } from '@/state/lives';

/**
 * "All your hearts are full" phone notification: while some practice hearts
 * are missing, one notification waits for the moment the last one comes back.
 * Phone only (not the web site), and only in app builds that include the
 * notifications module, so older APKs simply skip it.
 */
type NotificationsModule = typeof import('expo-notifications');

/* eslint-disable @typescript-eslint/no-require-imports */
const Notifications: NotificationsModule | null =
  Platform.OS !== 'web' && requireOptionalNativeModule('ExpoNotificationScheduler') ? require('expo-notifications') : null;
/* eslint-enable @typescript-eslint/no-require-imports */

/** The one hearts notification, replaced each time the hearts change. */
const ID = 'hearts-full';
const CHANNEL = 'hearts';

let prepared = false;
function prepare(N: NotificationsModule) {
  if (prepared) return;
  prepared = true;
  N.setNotificationHandler({
    handleNotification: async () => ({ shouldShowBanner: true, shouldShowList: true, shouldPlaySound: true, shouldSetBadge: false }),
  });
  if (Platform.OS === 'android') {
    void N.setNotificationChannelAsync(CHANNEL, { name: tr('হার্ট', 'Hearts'), importance: N.AndroidImportance.DEFAULT });
  }
}

/**
 * Keeps the notification in step with the hearts: schedules it for the moment
 * they are full, or cancels it when they already are. Asks for permission the
 * first time the hearts run out.
 */
export async function syncHeartsNotification(lives: Lives | undefined) {
  const N = Notifications;
  if (!N) return;
  try {
    prepare(N);
    await N.cancelScheduledNotificationAsync(ID).catch(() => {});
    const now = Date.now();
    const fullAt = heartsFullAt(lives, now);
    if (fullAt === null || fullAt <= now) return;

    let { status, canAskAgain } = await N.getPermissionsAsync();
    if (status !== 'granted' && canAskAgain && currentLives(lives, now).count === 0) {
      ({ status } = await N.requestPermissionsAsync());
    }
    if (status !== 'granted') return;

    await N.scheduleNotificationAsync({
      identifier: ID,
      content: {
        title: tr('আপনার সব হার্ট ভরে গেছে ❤️', 'Your hearts are full ❤️'),
        body: tr(`${LIVES_MAX}টি হার্টই ফিরে এসেছে। চলুন, আবার অনুশীলন করি!`, `All ${LIVES_MAX} hearts are back. Come back and practise!`),
        data: { url: '/practice' },
      },
      trigger: { type: N.SchedulableTriggerInputTypes.DATE, date: new Date(fullAt), channelId: CHANNEL },
    });
  } catch {
    // A notification is a nice extra; never let it break the app.
  }
}

/** Opens the Practice tab when the learner taps the notification. Returns a cleanup. */
export function onHeartsNotificationTap(open: (url: string) => void): () => void {
  const N = Notifications;
  if (!N) return () => {};
  const sub = N.addNotificationResponseReceivedListener((r) => {
    const url = r.notification.request.content.data?.url;
    if (typeof url === 'string') open(url);
  });
  return () => sub.remove();
}
