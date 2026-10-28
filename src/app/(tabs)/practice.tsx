import { router, useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LivesHeart } from '@/components/lives';
import { PracticeLadder, type LadderCard } from '@/components/practice-ladder';
import { AppText, Button, Card, Icon, LevelBadge, Notice, Row } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { practiceCards } from '@/content/topics';
import { useTheme } from '@/hooks/use-theme';
import { useLevelIndex } from '@/services/content/store';
import { EXAM_LEARN_SHARE, levelProgress, nextLevel, practiceTopicsLeft, practiceUnlocked, useProgress } from '@/state/progress';

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
  // The level test also waits until the Learn modules are 60% done; tapping it then explains why.
  const learned = levelProgress(progress, index).overall;
  const [learnNotice, setLearnNotice] = useState(false);
  const cards: LadderCard[] = practiceCards(index).map((c) => {
    const starsOpen = practiceUnlocked(progress, index, c.id);
    const waitsForLearning = c.kind === 'exam' && learned < EXAM_LEARN_SHARE;
    const left = c.requires && practiceTopicsLeft(progress, index, c.requires);
    return {
      ...c,
      open: starsOpen && !waitsForLearning,
      stars: progress.practice[c.id]?.stars ?? 0,
      learned: !!left && left.grammar + left.vocabulary === 0,
      practised: !!progress.practice[c.id],
      onLockedPress: starsOpen && waitsForLearning ? () => setLearnNotice(true) : undefined,
    };
  });
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
            <LivesHeart />
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
      {learnNotice && <LearnFirst share={learned} onClose={() => setLearnNotice(false)} />}
    </SafeAreaView>
  );
}

/** Why the level test is still closed: the Learn modules need 60% first. */
function LearnFirst({ share, onClose }: { share: number; onClose: () => void }) {
  const { colors } = useTheme();
  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'center', padding: Spacing.xl, backgroundColor: 'rgba(0,0,0,0.55)' }}>
        <Card style={{ alignItems: 'center', gap: Spacing.md }}>
          <Icon name="school-outline" size={44} color={colors.primary} />
          <AppText variant="heading" style={{ textAlign: 'center' }}>
            লেভেল টেস্ট এখনো বন্ধ
          </AppText>
          <AppText variant="bn" style={{ textAlign: 'center' }}>
            টেস্ট কার্ডটি খুলতে শেখার মডিউলগুলোতে মোট কমপক্ষে {Math.round(EXAM_LEARN_SHARE * 100)}% অগ্রগতি সম্পন্ন করতে হবে।
          </AppText>
          <AppText variant="caption" muted>
            আপনার এখনকার অগ্রগতি: {Math.floor(share * 100)}%
          </AppText>
          <Button
            title="শেখা চালিয়ে যান"
            icon="book-outline"
            onPress={() => {
              onClose();
              router.navigate('/');
            }}
            style={{ alignSelf: 'stretch' }}
          />
          <Button title="ঠিক আছে" variant="secondary" onPress={onClose} style={{ alignSelf: 'stretch' }} />
        </Card>
      </View>
    </Modal>
  );
}
