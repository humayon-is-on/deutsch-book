import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Missing } from '@/components/missing';
import { LevelBadge, AppText, Button, ProgressBar, Row, Screen } from '@/components/ui';
import { VocabCard } from '@/components/vocab-card';
import { Spacing } from '@/constants/theme';
import { getVocabTopic } from '@/content';
import { useLevelColor } from '@/hooks/use-theme';
import { useProgress } from '@/state/progress';

export default function VocabTopicScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const topic = getVocabTopic(id);
  const { progress, visit, setVocabPosition } = useProgress();
  const [index, setIndex] = useState(() => progress.vocabPosition[id] ?? 0);
  const [showAll, setShowAll] = useState(false);
  const { fg } = useLevelColor(topic?.level ?? 'A1');

  useEffect(() => {
    if (!topic) return;
    visit({ href: `/vocab/${topic.id}`, title: topic.title.bn, level: topic.level, module: 'vocabulary' });
  }, [topic?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!topic) return <Missing />;
  const total = topic.entries.length;
  const safeIndex = Math.min(index, total - 1);
  const go = (i: number) => {
    setIndex(i);
    setVocabPosition(topic.id, i);
  };
  const learned = topic.entries.filter((e) => progress.learned[e.id]).length;

  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: topic.title.bn }} />
      <Row style={{ justifyContent: 'space-between' }}>
        <LevelBadge level={topic.level} />
        <AppText variant="caption" muted>
          {learned}/{total} শেখা হয়েছে
        </AppText>
      </Row>
      <ProgressBar value={(safeIndex + 1) / total} color={fg} />

      {showAll ? (
        <View style={{ gap: Spacing.md }}>
          {topic.entries.map((e) => (
            <VocabCard key={e.id} entry={e} />
          ))}
        </View>
      ) : (
        <>
          <AppText variant="caption" muted style={{ textAlign: 'center' }}>
            {safeIndex + 1} / {total}
          </AppText>
          <VocabCard entry={topic.entries[safeIndex]} large />
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
    </Screen>
  );
}
