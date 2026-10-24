import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { Loading } from '@/components/topic';
import { Button, LevelBadge, Notice, Row, Screen } from '@/components/ui';
import { VocabCard } from '@/components/vocab-card';
import { Spacing } from '@/constants/theme';
import { topicOfWord, useLevelIndex } from '@/services/content/store';
import { useTopicFiles } from '@/services/content/use-topic';
import { useProgress } from '@/state/progress';

export default function SavedWordsScreen() {
  const { progress } = useProgress();
  const params = useLocalSearchParams<{ tab?: string }>();
  const [tab, setTab] = useState<'bookmarks' | 'learned'>(params.tab === 'learned' ? 'learned' : 'bookmarks');
  const set = tab === 'bookmarks' ? progress.bookmarks : progress.learned;

  const level = progress.level ?? 'A1';
  const index = useLevelIndex(level);
  // Only the word topics that hold saved words are loaded.
  const topicIds = [...new Set(Object.keys(set).map((w) => topicOfWord(index, w)).filter((t): t is string => !!t))];
  const { loading, files } = useTopicFiles(topicIds);
  const entries = files.flatMap((f) => (f.module === 'vocabulary' ? f.item.entries : [])).filter((e) => set[e.id]);

  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: 'সংরক্ষিত শব্দ' }} />
      <Row style={{ gap: Spacing.sm }}>
        <Button
          title="বুকমার্ক"
          icon="bookmark-outline"
          variant={tab === 'bookmarks' ? 'primary' : 'secondary'}
          style={{ flex: 1 }}
          onPress={() => setTab('bookmarks')}
        />
        <Button
          title="শেখা শব্দ"
          icon="checkmark-circle-outline"
          variant={tab === 'learned' ? 'primary' : 'secondary'}
          style={{ flex: 1 }}
          onPress={() => setTab('learned')}
        />
      </Row>
      <LevelBadge level={level} />
      {loading && topicIds.length > 0 && <Loading />}
      {!loading && entries.length === 0 && (
        <Notice>
          {tab === 'bookmarks'
            ? 'এখনো কোনো শব্দ বুকমার্ক করা হয়নি। শব্দভান্ডারে 🔖 চিহ্নে চাপ দিন।'
            : 'এখনো কোনো শব্দ শেখা হিসেবে চিহ্নিত করা হয়নি।'}
        </Notice>
      )}
      {entries.map((e) => (
        <VocabCard key={e.id} entry={e} />
      ))}
    </Screen>
  );
}
