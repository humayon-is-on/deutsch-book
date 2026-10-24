import { router, useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LivesHeart, NextLifeNote } from '@/components/lives';
import { PracticeLadder, type LadderCard } from '@/components/practice-ladder';
import { AppText, Card, Icon, LevelBadge, Notice, Row } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { practiceCards } from '@/content/topics';
import { useTheme } from '@/hooks/use-theme';
import { useLevelIndex } from '@/services/content/store';
import { nextLevel, practiceUnlocked, useProgress } from '@/state/progress';

/** A count that opens its list: the bookmarked words still to practise. */
function Stat({ icon, value, label, onPress }: { icon: string; value: number; label: string; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Card onPress={onPress} style={{ flex: 1 }} accessibilityLabel={`${label}: ${value}`}>
      <Row style={{ gap: Spacing.md }}>
        <Icon name={icon} size={30} color={colors.primary} />
        <View style={{ flex: 1 }}>
          <AppText variant="title">{value}</AppText>
          <AppText variant="caption" muted>
            {label}
          </AppText>
        </View>
        <Icon name="chevron-forward" size={18} color={colors.textSecondary} />
      </Row>
    </Card>
  );
}

/** Below this scroll offset the screen counts as being at the top. */
const TOP = 40;

/**
 * Practice: bookmarked words on top, then the practice ladder,
 * which ends with the level test and the next level, locked.
 * The screen opens with the newest open card in the middle; a floating arrow
 * jumps to the top, and from the top back down to that card.
 */
export default function PracticeScreen() {
  const { progress } = useProgress();
  const { colors } = useTheme();
  const level = progress.level ?? 'A1';
  const index = useLevelIndex(level);
  const cards: LadderCard[] = practiceCards(index).map((c) => ({
    ...c,
    open: practiceUnlocked(progress, index, c.id),
    stars: progress.practice[c.id]?.stars ?? 0,
  }));
  const bookmarkCount = Object.keys(progress.bookmarks).length;

  const scroll = useRef<ScrollView>(null);
  const place = useRef({ current: -1, viewport: 0 });
  const centre = useCallback((animated: boolean) => {
    const { current, viewport } = place.current;
    if (current >= 0 && viewport > 0) scroll.current?.scrollTo({ y: Math.max(0, current - viewport / 2), animated });
  }, []);
  useFocusEffect(useCallback(() => centre(true), [centre]));
  const [atTop, setAtTop] = useState(true);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        ref={scroll}
        scrollEventThrottle={16}
        onScroll={(e) => setAtTop(e.nativeEvent.contentOffset.y < TOP)}
        onLayout={(e) => {
          place.current.viewport = e.nativeEvent.layout.height;
          centre(false);
        }}
        contentContainerStyle={{ padding: Spacing.lg, paddingBottom: Spacing.xl * 2, gap: Spacing.md, maxWidth: 720, width: '100%', alignSelf: 'center' }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <AppText variant="title">অনুশীলন</AppText>
          <LevelBadge level={level} />
        </Row>
        <Row style={{ gap: Spacing.md }}>
          <Stat icon="bookmark-outline" value={bookmarkCount} label="বুকমার্ক শব্দ · অনুশীলন বাকি" onPress={() => router.push('/vocab/saved')} />
        </Row>
        <View style={{ gap: Spacing.xs, marginTop: Spacing.sm }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <AppText variant="heading">অনুশীলনের সিঁড়ি</AppText>
            <View style={{ alignItems: 'center', gap: 2 }}>
              <LivesHeart />
              <NextLifeNote />
            </View>
          </Row>
          <AppText variant="caption" muted>
            মডিউল থেকে শিখুন, আর অবসর সময়ে এখানে অনুশীলন করুন।
          </AppText>
        </View>
        {cards.length ? (
          <PracticeLadder
            cards={cards}
            nextLevel={nextLevel(level)}
            onCurrentLayout={(y) => {
              place.current.current = y;
              centre(false);
            }}
          />
        ) : (
          <Notice>এই লেভেলের অনুশীলন কার্ড শীঘ্রই আসছে।</Notice>
        )}
      </ScrollView>
      {cards.length > 0 && (
        <Pressable
          onPress={() => (atTop ? centre(true) : scroll.current?.scrollTo({ y: 0, animated: true }))}
          accessibilityRole="button"
          accessibilityLabel={atTop ? 'আপনার কার্ডে যান' : 'উপরে যান'}
          style={({ pressed }) => ({
            position: 'absolute',
            right: Spacing.lg,
            bottom: Spacing.lg,
            width: 52,
            height: 52,
            borderRadius: 26,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.8 : 0.95,
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
            elevation: 6,
          })}>
          <Icon name={atTop ? 'arrow-down' : 'arrow-up'} size={26} color={colors.primaryText} />
        </Pressable>
      )}
    </SafeAreaView>
  );
}
