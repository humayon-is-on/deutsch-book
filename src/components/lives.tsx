import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';

import { AppText, Button, Card, Icon, Row, PopupBackdrop } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useNow } from '@/hooks/use-now';
import { useTheme } from '@/hooks/use-theme';
import { currentLives, LIVES_MAX } from '@/state/lives';
import { useProgress } from '@/state/progress';
import { useT } from '@/i18n';

/** Heart red and its darker rim, the same in light and dark themes. */
const HEART = '#D62839';
const HEART_RIM = '#8E1424';

/** The learner's practice hearts right now, kept up to date as hearts come back. */
export function useLives() {
  const { progress } = useProgress();
  // No countdown is shown, so a slow tick is enough to notice a heart coming back.
  const now = useNow(5000);
  return { ...currentLives(progress.lives, now), now };
}

/** A chunky heart: a darker rim, a bright fill and a small shine. */
function CartoonHeart({ size, children }: { size: number; children?: ReactNode }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ position: 'absolute' }}>
        <FontAwesome6 name="heart" solid size={size * 0.94} color={HEART_RIM} />
      </View>
      <View style={{ position: 'absolute' }}>
        <FontAwesome6 name="heart" solid size={size * 0.7} color={HEART} />
      </View>
      <View
        style={{
          position: 'absolute',
          top: size * 0.24,
          left: size * 0.26,
          width: size * 0.16,
          height: size * 0.1,
          borderRadius: size,
          backgroundColor: '#FFFFFF',
          opacity: 0.75,
          transform: [{ rotate: '-35deg' }],
        }}
      />
      {children}
    </View>
  );
}

/** One heart with the hearts left inside it; faded at zero. */
export function LivesHeart({ size = 34 }: { size?: number }) {
  const { count } = useLives();
  const t = useT();
  return (
    <View accessible accessibilityLabel={t(`${count}/${LIVES_MAX} হার্ট বাকি`, `${count}/${LIVES_MAX} hearts left`)} style={{ opacity: count ? 1 : 0.35 }}>
      <CartoonHeart size={size}>
        <AppText
          variant="caption"
          color="#FFFFFF"
          style={{
            position: 'absolute',
            fontWeight: '900',
            fontSize: size * 0.34,
            lineHeight: size * 0.4,
            marginTop: size * 0.02,
            textShadowColor: HEART_RIM,
            textShadowRadius: 2,
          }}>
          {count}
        </AppText>
      </CartoonHeart>
    </View>
  );
}

/** Five small hearts, the lost ones faded. */
export function LivesRow({ size = 22 }: { size?: number }) {
  const { count } = useLives();
  const t = useT();
  return (
    <View style={{ flexDirection: 'row', gap: 1 }} accessible accessibilityLabel={t(`${count}/${LIVES_MAX} হার্ট বাকি`, `${count}/${LIVES_MAX} hearts left`)}>
      {Array.from({ length: LIVES_MAX }, (_, i) => (
        <View key={i} style={{ opacity: i < count ? 1 : 0.2 }}>
          <CartoonHeart size={size} />
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
  const t = useT();
  return (
    <Modal transparent animationType="fade" onRequestClose={onBack}>
      <PopupBackdrop padding={Spacing.xl}>
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
            <AppText variant="heading">{t('আপনার কোনো হার্ট নেই', 'You have no hearts left')}</AppText>
            <AppText variant="bn" muted style={{ textAlign: 'center' }}>
              {t(
                'একটি বিজ্ঞাপন দেখলে ১টি হার্ট পাবেন এবং যেখানে থেমেছিলেন সেখান থেকে অনুশীলন চালিয়ে যেতে পারবেন।',
                'Watch an ad to get 1 heart and continue practising from where you stopped.',
              )}
            </AppText>
            <Button title={t('বিজ্ঞাপন দেখে ১টি হার্ট নিন', 'Watch an ad for 1 heart')} icon="play-circle-outline" onPress={() => setWatching(true)} style={{ alignSelf: 'stretch' }} />
            <Button title={t('ফিরে যান', 'Go back')} icon="arrow-back" variant="secondary" onPress={onBack} style={{ alignSelf: 'stretch' }} />
          </Card>
        )}
      </PopupBackdrop>
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
  const t = useT();
  useEffect(() => {
    const timer = setInterval(() => setLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (left > 0 || rewarded.current) return;
    rewarded.current = true;
    onDone();
  }, [left, onDone]);
  return (
    <Card style={{ alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.xl }}>
      <AppText variant="caption" muted>
        {t('বিজ্ঞাপন', 'Ad')}
      </AppText>
      <ActivityIndicator color={colors.primary} />
      <AppText variant="heading">{Math.max(0, left)}</AppText>
      <Row style={{ gap: Spacing.xs }}>
        <Icon name="heart" color={HEART} />
        <AppText variant="bn">{t('বিজ্ঞাপন শেষে ১টি হার্ট পাবেন', 'You get 1 heart when the ad ends')}</AppText>
      </Row>
    </Card>
  );
}
