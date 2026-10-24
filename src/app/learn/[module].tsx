import { router, Stack, useLocalSearchParams, type Href } from 'expo-router';

import { AppText, Icon, LevelBadge, ListItem, Notice, Screen } from '@/components/ui';
import { LEVELS, moduleInfo, MODULES, type ModuleKey } from '@/content';
import { topicsFor, type Topic } from '@/content/topics';
import { useLevelColor, useTheme } from '@/hooks/use-theme';
import { useLevelIndex } from '@/services/content/store';
import { topicDone, topicUnlocked, useProgress } from '@/state/progress';

export default function ModuleScreen() {
  const params = useLocalSearchParams<{ module: string }>();
  const module = (MODULES.includes(params.module as ModuleKey) ? params.module : 'grammar') as ModuleKey;
  const { progress } = useProgress();
  // The whole app works on the learner's one current level.
  const level = progress.level ?? 'A1';
  const { fg } = useLevelColor(level);
  const { colors } = useTheme();
  const index = useLevelIndex(level);
  const topics = topicsFor(index, module);
  // Grammar builds on the level before: A2 grammar expects the A1 topics done.
  const earlier = module === 'grammar' ? LEVELS[LEVELS.indexOf(level) - 1] : undefined;
  // Parts of a split topic share its number: 3.1, 3.2.
  const topicNumbers = topics.reduce<{ n: number; out: string[] }>(
    (acc, t) => {
      const part = t.summary.part;
      const n = part && part > 1 ? acc.n : acc.n + 1;
      return { n, out: [...acc.out, part ? `${n}.${part}` : `${n}.`] };
    },
    { n: 0, out: [] },
  ).out;

  /** Extra line under a topic's title, saying where the learner is in it. */
  const detail = (t: Topic): string => {
    switch (module) {
      case 'vocabulary': {
        return `${t.summary.wordIds?.length ?? 0}টি শব্দ`;
      }
      case 'mcq': {
        const n = t.summary.questionIds?.length ?? 0;
        const q = progress.quizzes[t.id];
        if (q?.completed) return `সেরা স্কোর ${q.bestScore}/${n}`;
        if (q && Object.keys(q.answers).length) return 'অসম্পূর্ণ, চালিয়ে যান';
        return `${n}টি প্রশ্ন`;
      }
      default:
        return t.subtitle ?? '';
    }
  };

  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: moduleInfo[module].bn }} />
      <LevelBadge level={level} />
      <AppText variant="caption" muted>
        {moduleInfo[module].de} · টপিকগুলো ক্রমানুসারে খোলে। প্রতিটি টপিকের শেষে ছোট টেস্টে পাস করলে পরেরটি খুলে যায়।
      </AppText>
      {earlier && <Notice>এই টপিকগুলো শুরু করার আগে {earlier} লেভেলের গ্রামার টপিকগুলো শেষ করা জরুরি।</Notice>}
      {topics.map((t, i) => {
        const number = topicNumbers[i];
        const open = topicUnlocked(progress, index, t.id);
        const done = topicDone(progress, index, t.id);
        const right = done ? (
          <Icon name="checkmark-circle" color={colors.correct} />
        ) : open ? undefined : (
          <Icon name="lock-closed" color={colors.textSecondary} />
        );
        return (
          <ListItem
            key={t.id}
            icon={open ? moduleInfo[module].icon : 'lock-closed-outline'}
            iconColor={open ? fg : colors.textSecondary}
            title={`${number} ${t.title.bn}`}
            subtitle={
              open
                ? // The German title is left out when the title already shows it.
                  [t.title.bn.includes(t.title.de) ? '' : t.title.de, detail(t)].filter(Boolean).join(' · ')
                : 'আগের টপিক শেষ করলে খুলবে'
            }
            right={right}
            onPress={open ? () => router.push(t.href as Href) : undefined}
          />
        );
      })}
      {topics.length === 0 && <Notice>এই অংশে শীঘ্রই নতুন বিষয় যোগ করা হবে।</Notice>}
    </Screen>
  );
}
