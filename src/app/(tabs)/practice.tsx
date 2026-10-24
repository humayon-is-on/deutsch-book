import { router, useFocusEffect } from 'expo-router';
import { useCallback, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PracticeLadder, type LadderCard } from '@/components/practice-ladder';
import { AppText, Card, Icon, LevelBadge, Notice, Row } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { practiceCards } from '@/content/topics';
import { useTheme } from '@/hooks/use-theme';
import { useLevelIndex } from '@/services/content/store';
import { practiceUnlocked, useProgress } from '@/state/progress';

/** A count that opens its list: learned words, questions left to revise. */
function Stat({ icon, value, label, onPress }: { icon: string; value: number; label: string; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Card onPress={onPress} style={{ flex: 1 }} accessibilityLabel={`${label}: ${value}`}>
      <Icon name={icon} color={colors.primary} />
      <AppText variant="title">{value}</AppText>
      <AppText variant="caption" muted>
        {label}
      </AppText>
    </Card>
  );
}

/**
 * Practice: learned words and revision on top, then the practice ladder,
 * which ends with the level test.
 * The screen opens with the newest open card in the middle.
 */
export default function PracticeScreen() {
  const { progress } = useProgress();
  const { colors } = useTheme();
  const level = progress.level ?? 'A1';
  const mistakes = Object.keys(progress.mistakes).length;
  const index = useLevelIndex(level);
  const practice: LadderCard[] = practiceCards(index).map((c) => ({
    ...c,
    open: practiceUnlocked(progress, index, c.id),
    stars: progress.practice[c.id]?.stars ?? 0,
  }));
  // The level test waits at the end of the ladder until every card has a star.
  const levelTest: LadderCard = {
    id: 'level-test',
    kind: 'level',
    title: { de: 'Einstufungstest', bn: 'লেভেল যাচাই পরীক্ষা' },
    href: '/onboarding/placement',
    questions: 0,
    open: practice.every((c) => c.stars > 0),
    stars: 0,
  };
  const cards = practice.length ? [...practice, levelTest] : [];
  const learnedCount = Object.keys(progress.learned).length;

  const scroll = useRef<ScrollView>(null);
  const place = useRef({ current: -1, viewport: 0 });
  const centre = useCallback((animated: boolean) => {
    const { current, viewport } = place.current;
    if (current >= 0 && viewport > 0) scroll.current?.scrollTo({ y: Math.max(0, current - viewport / 2), animated });
  }, []);
  useFocusEffect(useCallback(() => centre(true), [centre]));

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        ref={scroll}
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
          <Stat icon="book-outline" value={learnedCount} label="শেখা শব্দ" onPress={() => router.push('/vocab/saved')} />
          <Stat icon="refresh-outline" value={mistakes} label="রিভিশন বাকি" onPress={() => router.push('/quiz/revision')} />
        </Row>
        <View style={{ gap: Spacing.xs, marginTop: Spacing.sm }}>
          <AppText variant="heading">অনুশীলনের সিঁড়ি</AppText>
          <AppText variant="caption" muted>
            প্রতিটি কার্ডে ১০টি প্রশ্ন। কমপক্ষে ১টি তারা পেলে পরের কার্ড খুলবে। সব কার্ড শেষে খুলবে লেভেল টেস্ট।
          </AppText>
        </View>
        {cards.length ? (
          <PracticeLadder
            cards={cards}
            onCurrentLayout={(y) => {
              place.current.current = y;
              centre(false);
            }}
          />
        ) : (
          <Notice>এই লেভেলের অনুশীলন কার্ড শীঘ্রই আসছে।</Notice>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
