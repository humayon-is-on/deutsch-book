import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';

import { AppText, Button, Card, Icon, Row } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useNow } from '@/hooks/use-now';
import { useTheme } from '@/hooks/use-theme';
import { currentLives, LIVES_MAX } from '@/state/lives';
import { useProgress } from '@/state/progress';

/** Deep red, the same in light and dark themes. */
const HEART = '#B3001B';

/** The learner's practice hearts right now, kept up to date as hearts come back. */
export function useLives() {
  const { progress } = useProgress();
  // No countdown is shown, so a slow tick is enough to notice a heart coming back.
  const now = useNow(5000);
  return { ...currentLives(progress.lives, now), now };
}

/** One filled red heart with the hearts left inside it; faded at zero. */
export function LivesHeart({ size = 32 }: { size?: number }) {
  const { count } = useLives();
  return (
    <View
      accessible
      accessibilityLabel={`${count}/${LIVES_MAX} হার্ট বাকি`}
      style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center', opacity: count ? 1 : 0.35 }}>
      <Icon name="heart" size={size} color={HEART} />
      <AppText
        variant="caption"
        color="#FFFFFF"
        style={{ position: 'absolute', fontWeight: '800', fontSize: size * 0.36, lineHeight: size * 0.42, marginTop: size * 0.02 }}>
        {count}
      </AppText>
    </View>
  );
}

/** Five small filled hearts, the lost ones faded. */
export function LivesRow({ size = 20 }: { size?: number }) {
  const { count } = useLives();
  return (
    <View style={{ flexDirection: 'row', gap: 2 }} accessible accessibilityLabel={`${count}/${LIVES_MAX} হার্ট বাকি`}>
      {Array.from({ length: LIVES_MAX }, (_, i) => (
        <View key={i} style={{ opacity: i < count ? 1 : 0.2 }}>
          <Icon name="heart" size={size} color={HEART} />
        </View>
      ))}
    </View>
  );
}

/**
 * Shown when a practice card runs out of hearts: the card stays frozen behind
 * it until the learner leaves, waits for a heart, or watches an ad for one.
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
            <LivesHeart size={52} />
            <AppText variant="heading">আপনার কোনো হার্ট নেই</AppText>
            <AppText variant="bn" muted style={{ textAlign: 'center' }}>
              একটি বিজ্ঞাপন দেখলে ১টি হার্ট পাবেন এবং যেখানে থেমেছিলেন সেখান থেকে অনুশীলন চালিয়ে যেতে পারবেন।
            </AppText>
            <Button title="বিজ্ঞাপন দেখে ১টি হার্ট নিন" icon="play-circle-outline" onPress={() => setWatching(true)} style={{ alignSelf: 'stretch' }} />
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
        <Icon name="heart" color={HEART} />
        <AppText variant="bn">বিজ্ঞাপন শেষে ১টি হার্ট পাবেন</AppText>
      </Row>
    </Card>
  );
}
