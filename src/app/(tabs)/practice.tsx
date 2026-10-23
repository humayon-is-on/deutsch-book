import { router, useFocusEffect } from 'expo-router';
import { useCallback, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PracticeLadder, type LadderCard } from '@/components/practice-ladder';
import { AppText, LevelBadge, ListItem, Notice, Row } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { practiceCards } from '@/content/topics';
import { useTheme } from '@/hooks/use-theme';
import { useLevelIndex } from '@/services/content/store';
import { practiceUnlocked, useProgress } from '@/state/progress';

/**
 * Practice: revision and the level test on top, then the practice ladder.
 * The screen opens with the newest open card in the middle.
 */
export default function PracticeScreen() {
  const { progress } = useProgress();
  const { colors } = useTheme();
  const level = progress.level ?? 'A1';
  const mistakes = Object.keys(progress.mistakes).length;
  const index = useLevelIndex(level);
  const cards: LadderCard[] = practiceCards(index).map((c) => ({
    ...c,
    open: practiceUnlocked(progress, index, c.id),
    stars: progress.practice[c.id]?.stars ?? 0,
  }));

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
        <ListItem
          icon="refresh-circle-outline"
          title="রিভিশন"
          subtitle={mistakes ? `${mistakes}টি ভুল প্রশ্ন আবার অনুশীলন করুন` : 'কোনো ভুল প্রশ্ন বাকি নেই'}
          onPress={() => router.push('/quiz/revision')}
        />
        <ListItem
          icon="speedometer-outline"
          title="লেভেল যাচাই পরীক্ষা"
          subtitle={
            progress.placement
              ? `শেষ ফলাফল: ${progress.placement.correct}/${progress.placement.total}, প্রস্তাবিত ${progress.placement.recommended}`
              : 'আপনার জন্য কোন লেভেল উপযুক্ত, জেনে নিন'
          }
          onPress={() => router.push('/onboarding/placement')}
        />
        <View style={{ gap: Spacing.xs, marginTop: Spacing.sm }}>
          <AppText variant="heading">অনুশীলনের সিঁড়ি</AppText>
          <AppText variant="caption" muted>
            প্রতিটি কার্ডে ১০টি প্রশ্ন। কমপক্ষে ১টি তারা পেলে পরের কার্ড খুলবে।
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
