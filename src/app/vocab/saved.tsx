import { Stack } from 'expo-router';

import { Loading } from '@/components/topic';
import { levelHeader, Notice, Screen } from '@/components/ui';
import { VocabCard } from '@/components/vocab-card';
import { topicOfWord, useLevelIndex } from '@/services/content/store';
import { useTopicFiles } from '@/services/content/use-topic';
import { useProgress } from '@/state/progress';

/** The bookmarked words: the ones the learner still wants to practise. */
export default function SavedWordsScreen() {
  const { progress } = useProgress();
  const set = progress.bookmarks;

  const level = progress.level ?? 'A1';
  const index = useLevelIndex(level);
  // Only the word topics that hold saved words are loaded.
  const topicIds = [...new Set(Object.keys(set).map((w) => topicOfWord(index, w)).filter((t): t is string => !!t))];
  const { loading, files } = useTopicFiles(topicIds);
  // Saved words come from word topics and from the key words of texts (models, dialogues, emails).
  const entries = files
    .flatMap((f) =>
      f.module === 'vocabulary' ? f.item.entries : f.module === 'models' || f.module === 'dialogues' || f.module === 'emails' ? (f.item.words ?? []) : [],
    )
    .filter((e) => set[e.id]);

  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: 'বুকমার্ক শব্দ', ...levelHeader(level) }} />
      {loading && topicIds.length > 0 && <Loading />}
      {!loading && entries.length === 0 && (
        <Notice>এখনো কোনো শব্দ বুকমার্ক করা হয়নি। শব্দভান্ডারে 🔖 চিহ্নে চাপ দিন।</Notice>
      )}
      {entries.map((e) => (
        <VocabCard key={e.id} entry={e} />
      ))}
    </Screen>
  );
}
