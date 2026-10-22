import { router, Stack, useLocalSearchParams, type Href } from 'expo-router';

import { AppText, Icon, LevelBadge, ListItem, Notice, Screen } from '@/components/ui';
import { content, moduleInfo, MODULES, type ModuleKey } from '@/content';
import { topicsFor, type Topic } from '@/content/topics';
import { useLevelColor, useTheme } from '@/hooks/use-theme';
import { topicDone, topicUnlocked, useProgress } from '@/state/progress';

export default function ModuleScreen() {
  const params = useLocalSearchParams<{ module: string }>();
  const module = (MODULES.includes(params.module as ModuleKey) ? params.module : 'grammar') as ModuleKey;
  const { progress } = useProgress();
  // The whole app works on the learner's one current level.
  const level = progress.level ?? 'A1';
  const { fg } = useLevelColor(level);
  const { colors } = useTheme();
  const c = content[level];
  const topics = topicsFor(level, module);

  /** Extra line under a topic's title, saying where the learner is in it. */
  const detail = (t: Topic): string => {
    switch (module) {
      case 'grammar':
        return c.grammar.find((g) => g.id === t.id)?.summary ?? '';
      case 'vocabulary': {
        const words = c.vocabulary.find((v) => v.id === t.id)?.entries ?? [];
        return `${words.filter((e) => progress.learned[e.id]).length}/${words.length} শব্দ শেখা`;
      }
      case 'mcq': {
        const n = c.exercises.find((e) => e.id === t.id)?.questions.length ?? 0;
        const q = progress.quizzes[t.id];
        if (q?.completed) return `সেরা স্কোর ${q.bestScore}/${n}`;
        if (q && Object.keys(q.answers).length) return 'অসম্পূর্ণ, চালিয়ে যান';
        return `${n}টি প্রশ্ন`;
      }
      default:
        return c.texts.find((x) => x.id === t.id)?.tag ?? '';
    }
  };

  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: moduleInfo[module].bn }} />
      <LevelBadge level={level} />
      <AppText variant="caption" muted>
        {moduleInfo[module].de} · টপিকগুলো ক্রমানুসারে খোলে। প্রতিটি টপিকের শেষে ছোট টেস্টে পাস করলে পরেরটি খুলে যায়।
      </AppText>
      {topics.map((t, i) => {
        const open = topicUnlocked(progress, t.id);
        const done = topicDone(progress, t.id);
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
            title={`${i + 1}. ${t.title.bn}`}
            subtitle={
              open ? [t.title.de, detail(t)].filter(Boolean).join(' · ') : 'আগের টপিক শেষ করলে খুলবে'
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
