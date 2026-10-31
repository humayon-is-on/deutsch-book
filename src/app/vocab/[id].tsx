import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, useWindowDimensions, View } from 'react-native';

import { TopicTestCard, WithTopic } from '@/components/topic';
import { CountBar, Button, levelHeader, Row, Screen } from '@/components/ui';
import { VocabCard } from '@/components/vocab-card';
import { Spacing } from '@/constants/theme';
import type { VocabTopic } from '@/content/types';
import { useLevelColor, useTheme } from '@/hooks/use-theme';
import { useProgress } from '@/state/progress';

export default function VocabTopicScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <WithTopic id={id} modules={['vocabulary']}>
      {(file) => <Words topic={file.item} />}
    </WithTopic>
  );
}

function Words({ topic }: { topic: VocabTopic }) {
  const { progress, visit, setVocabPosition } = useProgress();
  const [index, setIndex] = useState(() => progress.vocabPosition[topic.id] ?? 0);
  const [showAll, setShowAll] = useState(false);
  const { fg } = useLevelColor(topic.level);
  const { colors } = useTheme();

  useEffect(() => {
    visit({ href: `/vocab/${topic.id}`, title: topic.title.bn, level: topic.level, module: 'vocabulary' });
  }, [topic.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const total = topic.entries.length;
  const safeIndex = Math.min(index, total - 1);
  const go = (i: number) => {
    setIndex(i);
    setVocabPosition(topic.id, i);
  };

  return (
    <Screen edges={[]}>
      <Stack.Screen
        options={{
          title: topic.title.bn,
          // Long topic names ("Angaben zur Person · Word combination (…)") wrap to a second line instead of being cut.
          headerTitle: ({ children }) => (
            <Text numberOfLines={2} style={{ fontSize: 17, fontWeight: '600', color: colors.text }}>
              {children}
            </Text>
          ),
          ...levelHeader(topic.level),
        }}
      />
      <CountBar value={(safeIndex + 1) / total} count={`${safeIndex + 1}/${total}`} color={fg} />

      {showAll ? (
        <View style={{ gap: Spacing.md }}>
          {topic.entries.map((e) => (
            <VocabCard key={e.id} entry={e} />
          ))}
        </View>
      ) : (
        <>
          <SteadyCard topic={topic} index={safeIndex} />
          <Row style={{ gap: Spacing.md }}>
            <Button
              title="আগের"
              icon="arrow-back"
              variant="secondary"
              style={{ flex: 1 }}
              disabled={safeIndex === 0}
              onPress={() => go(safeIndex - 1)}
            />
            <Button
              title="পরের"
              icon="arrow-forward"
              style={{ flex: 1 }}
              disabled={safeIndex === total - 1}
              onPress={() => go(safeIndex + 1)}
            />
          </Row>
        </>
      )}

      <Button
        title={showAll ? 'একটি একটি করে দেখুন' : 'সব শব্দের তালিকা দেখুন'}
        variant="ghost"
        onPress={() => setShowAll(!showAll)}
      />
      <TopicTestCard id={topic.id} />
    </Screen>
  );
}

/** Below this width the screen counts as a phone. */
const PHONE_MAX_WIDTH = 600;

/**
 * The one large word card. On phones it keeps the height of the topic's
 * tallest card, so the buttons under it don't jump from word to word. Every
 * card is laid out once out of sight to find that height. Wider screens let
 * the card size itself.
 */
function SteadyCard({ topic, index }: { topic: VocabTopic; index: number }) {
  const phone = useWindowDimensions().width < PHONE_MAX_WIDTH;
  const [heights, setHeights] = useState<Record<string, number>>({});
  const tallest = Math.max(0, ...Object.values(heights));
  const card = <VocabCard entry={topic.entries[index]} large style={phone && tallest ? { minHeight: tallest } : undefined} />;
  if (!phone) return card;
  return (
    <View>
      {card}
      <View pointerEvents="none" aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 0, overflow: 'hidden', opacity: 0 }}>
        {topic.entries.map((e) => (
          <View
            key={e.id}
            style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
            onLayout={(ev) => {
              const h = Math.ceil(ev.nativeEvent.layout.height);
              setHeights((all) => (all[e.id] === h ? all : { ...all, [e.id]: h }));
            }}>
            <VocabCard entry={e} large />
          </View>
        ))}
      </View>
    </View>
  );
}
