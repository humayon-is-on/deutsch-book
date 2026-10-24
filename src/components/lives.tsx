import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';

import { AppText, Button, Card, Icon, Row } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useNow } from '@/hooks/use-now';
import { useTheme } from '@/hooks/use-theme';
import { currentLives, LIVES_MAX } from '@/state/lives';
import { useProgress } from '@/state/progress';

/** The learner's practice stars right now, kept up to date as stars refill. */
export function useLives() {
  const { progress } = useProgress();
  // Stars come back in whole minutes, so a slow tick is enough.
  const now = useNow(15000);
  return { ...currentLives(progress.lives, now), now };
}

/** A row of five stars, filled for the stars left. */
export function LivesBar({ size = 18 }: { size?: number }) {
  const { colors } = useTheme();
  const { count } = useLives();
  return (
    <View style={{ flexDirection: 'row', gap: 2 }} accessible accessibilityLabel={`${count}/${LIVES_MAX} তারা বাকি`}>
      {Array.from({ length: LIVES_MAX }, (_, i) => (
        <Icon key={i} name={i < count ? 'star' : 'star-outline'} size={size} color={i < count ? colors.gold : colors.textSecondary} />
      ))}
    </View>
  );
}

/** "Next star in 12 min", while the row isn't full. */
export function NextLifeNote() {
  const { nextAt, now } = useLives();
  if (nextAt === null) return null;
  const minutes = Math.max(1, Math.ceil((nextAt - now) / 60000));
  return (
    <AppText variant="caption" muted>
      পরের তারা {minutes} মিনিটে
    </AppText>
  );
}

/**
 * Shown when a practice card runs out of stars: the card stays frozen behind
 * it until the learner leaves or watches an ad for one star.
 */
export function OutOfLives({ onBack, onReward }: { onBack: () => void; onReward: () => void }) {
  const [watching, setWatching] = useState(false);
  return (
    <Modal transparent animationType="fade" onRequestClose={onBack}>
      <View style={{ flex: 1, justifyContent: 'center', padding: Spacing.xl, backgroundColor: 'rgba(0,0,0,0.55)' }}>
        {watching ? (
          <RewardedAd
            onDone={() => {
              setWatching(false);
              onReward();
            }}
          />
        ) : (
          <Card style={{ alignItems: 'center', gap: Spacing.md }}>
            <LivesBar size={30} />
            <AppText variant="heading">আপনার কোনো তারা নেই</AppText>
            <AppText variant="bn" muted style={{ textAlign: 'center' }}>
              একটি বিজ্ঞাপন দেখলে ১টি তারা পাবেন এবং যেখানে থেমেছিলেন সেখান থেকে অনুশীলন চালিয়ে যেতে পারবেন। <NextLifeNote />
            </AppText>
            <Button title="বিজ্ঞাপন দেখে ১টি তারা নিন" icon="play-circle-outline" onPress={() => setWatching(true)} style={{ alignSelf: 'stretch' }} />
            <Button title="ফিরে যান" icon="arrow-back" variant="secondary" onPress={onBack} style={{ alignSelf: 'stretch' }} />
          </Card>
        )}
      </View>
    </Modal>
  );
}

/** Seconds the stand-in ad runs. */
const AD_SECONDS = 5;

/**
 * Stand-in for a rewarded ad until the app has an AdMob account: a short
 * countdown, then the reward. Real ads (react-native-google-mobile-ads) only
 * run in a store build, not in Expo Go or on the web.
 */
function RewardedAd({ onDone }: { onDone: () => void }) {
  const { colors } = useTheme();
  const [left, setLeft] = useState(AD_SECONDS);
  const rewarded = useRef(false);
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (left > 0 || rewarded.current) return;
    rewarded.current = true;
    onDone();
  }, [left, onDone]);
  return (
    <Card style={{ alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.xl }}>
      <AppText variant="caption" muted>
        বিজ্ঞাপন
      </AppText>
      <ActivityIndicator color={colors.primary} />
      <AppText variant="heading">{Math.max(0, left)}</AppText>
      <Row style={{ gap: Spacing.xs }}>
        <Icon name="star" color={colors.gold} />
        <AppText variant="bn">বিজ্ঞাপন শেষে ১টি তারা পাবেন</AppText>
      </Row>
    </Card>
  );
}
