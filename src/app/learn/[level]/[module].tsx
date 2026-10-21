import { router, Stack, useLocalSearchParams } from 'expo-router';

import { AppText, Icon, LevelBadge, ListItem, Notice, Screen } from '@/components/ui';
import { content, LEVELS, moduleInfo, MODULES, textsFor, type Level, type ModuleKey } from '@/content';
import { useLevelColor, useTheme } from '@/hooks/use-theme';
import { useProgress } from '@/state/progress';

export default function ModuleScreen() {
  const params = useLocalSearchParams<{ level: string; module: string }>();
  const level = (LEVELS.includes(params.level as Level) ? params.level : 'A1') as Level;
  const module = (MODULES.includes(params.module as ModuleKey) ? params.module : 'grammar') as ModuleKey;
  const { progress } = useProgress();
  const { fg } = useLevelColor(level);
  const { colors } = useTheme();
  const c = content[level];
  const done = <Icon name="checkmark-circle" color={colors.correct} />;

  let items: React.ReactNode;
  switch (module) {
    case 'grammar':
      items = c.grammar.map((g) => (
        <ListItem
          key={g.id}
          icon="school-outline"
          iconColor={fg}
          title={g.title.bn}
          subtitle={`${g.title.de} · ${g.summary}`}
          right={progress.grammar[g.id]?.completed ? done : undefined}
          onPress={() => router.push({ pathname: '/lesson/[id]', params: { id: g.id } })}
        />
      ));
      break;
    case 'vocabulary':
      items = c.vocabulary.map((t) => {
        const learned = t.entries.filter((e) => progress.learned[e.id]).length;
        return (
          <ListItem
            key={t.id}
            icon={t.icon}
            iconColor={fg}
            title={t.title.bn}
            subtitle={`${t.title.de} · ${learned}/${t.entries.length} শেখা হয়েছে`}
            right={learned === t.entries.length ? done : undefined}
            onPress={() => router.push({ pathname: '/vocab/[id]', params: { id: t.id } })}
          />
        );
      });
      break;
    case 'mcq':
      items = c.exercises.map((e) => {
        const q = progress.quizzes[e.id];
        const status = q?.completed
          ? `সেরা স্কোর ${q.bestScore}/${e.questions.length}`
          : q && Object.keys(q.answers).length
            ? 'অসম্পূর্ণ, চালিয়ে যান'
            : `${e.questions.length}টি প্রশ্ন`;
        return (
          <ListItem
            key={e.id}
            icon={e.questions[0]?.type === 'fill' ? 'create-outline' : 'checkbox-outline'}
            iconColor={fg}
            title={e.title.bn}
            subtitle={`${e.title.de} · ${status}`}
            right={q?.completed ? done : undefined}
            onPress={() => router.push({ pathname: '/quiz/[id]', params: { id: e.id } })}
          />
        );
      });
      break;
    default:
      items = textsFor(level, module).map((t) => (
        <ListItem
          key={t.id}
          icon={moduleInfo[module].icon}
          iconColor={fg}
          title={t.title.bn}
          subtitle={[t.title.de, t.tag].filter(Boolean).join(' · ')}
          right={progress.textsRead[t.id] ? done : undefined}
          onPress={() => router.push({ pathname: '/read/[id]', params: { id: t.id } })}
        />
      ));
  }

  const empty = Array.isArray(items) && items.length === 0;

  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: moduleInfo[module].bn }} />
      <LevelBadge level={level} />
      <AppText variant="caption" muted>
        {moduleInfo[module].de}
      </AppText>
      {items}
      {empty && <Notice>এই অংশে শীঘ্রই নতুন বিষয় যোগ করা হবে।</Notice>}
    </Screen>
  );
}
