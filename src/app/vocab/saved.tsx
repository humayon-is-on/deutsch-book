import { Stack } from 'expo-router';
import { useState } from 'react';

import { Button, LevelBadge, Notice, Row, Screen } from '@/components/ui';
import { VocabCard } from '@/components/vocab-card';
import { Spacing } from '@/constants/theme';
import { content, LEVELS } from '@/content';
import { useProgress } from '@/state/progress';

export default function SavedWordsScreen() {
  const { progress } = useProgress();
  const [tab, setTab] = useState<'bookmarks' | 'learned'>('bookmarks');
  const set = tab === 'bookmarks' ? progress.bookmarks : progress.learned;

  const groups = LEVELS.map((level) => ({
    level,
    entries: content[level].vocabulary.flatMap((t) => t.entries).filter((e) => set[e.id]),
  })).filter((g) => g.entries.length);

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
      {groups.length === 0 && (
        <Notice>
          {tab === 'bookmarks'
            ? 'এখনো কোনো শব্দ বুকমার্ক করা হয়নি। শব্দভান্ডারে 🔖 চিহ্নে চাপ দিন।'
            : 'এখনো কোনো শব্দ শেখা হিসেবে চিহ্নিত করা হয়নি।'}
        </Notice>
      )}
      {groups.map((g) => [
        <LevelBadge key={g.level} level={g.level} />,
        ...g.entries.map((e) => <VocabCard key={e.id} entry={e} />),
      ])}
    </Screen>
  );
}
