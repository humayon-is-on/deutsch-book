import { Stack } from 'expo-router';

import { Loading } from '@/components/topic';
import { levelHeader, Notice, Screen } from '@/components/ui';
import { VocabCard } from '@/components/vocab-card';
import { topicOfWord, useLevelIndex } from '@/services/content/store';
import { useTopicFiles } from '@/services/content/use-topic';
import { useProgress } from '@/state/progress';
import { useT } from '@/i18n';

/** The bookmarked words: the ones the learner still wants to practise. */
export default function SavedWordsScreen() {
  const { progress } = useProgress();
  const set = progress.bookmarks;

  const level = progress.level ?? 'A1';
  const index = useLevelIndex(level);
  const t = useT();
  // Only the word topics that hold saved words are loaded.
  const topicIds = [...new Set(Object.keys(set).map((w) => topicOfWord(index, w)).filter((id): id is string => !!id))];
  const { loading, files } = useTopicFiles(topicIds);
  // Saved words come from word topics and from the key words of texts (models, dialogues, emails).
  const entries = files
    .flatMap((f) =>
      f.module === 'vocabulary' ? f.item.entries : f.module === 'models' || f.module === 'dialogues' || f.module === 'emails' ? (f.item.words ?? []) : [],
    )
    .filter((e) => set[e.id]);

  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: t('বুকমার্ক শব্দ', 'Bookmarked words'), ...levelHeader(level) }} />
      <Notice>
        {t(
          'শুধু যে শব্দগুলো মনে রাখতে কষ্ট হয়, সেগুলোই বুকমার্ক করুন। বুকমার্ক সরালে শব্দটি শেখা হয়েছে বলে ধরা হবে।',
          'Bookmark only the words that are hard to remember. Removing a bookmark counts the word as learned.',
        )}
      </Notice>
      {loading && topicIds.length > 0 && <Loading />}
      {!loading && entries.length === 0 && (
        <Notice>{t('এখনো কোনো শব্দ বুকমার্ক করা হয়নি। শব্দভান্ডারে 🔖 চিহ্নে চাপ দিন।', 'No words bookmarked yet. Tap the 🔖 sign in Vocabulary.')}</Notice>
      )}
      {entries.map((e) => (
        <VocabCard key={e.id} entry={e} />
      ))}
    </Screen>
  );
}
