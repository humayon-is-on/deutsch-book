import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

import { DataTable, ExampleCard } from '@/components/learning';
import { Missing } from '@/components/missing';
import { AppText, Button, Card, LevelBadge, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { getGrammar } from '@/content';
import { useProgress } from '@/state/progress';

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = getGrammar(id);
  const { progress, visit, openGrammar, completeGrammar } = useProgress();

  useEffect(() => {
    if (!lesson) return;
    openGrammar(lesson.id);
    visit({ href: `/lesson/${lesson.id}`, title: lesson.title.bn, level: lesson.level, module: 'grammar' });
  }, [lesson?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!lesson) return <Missing />;
  const completed = progress.grammar[lesson.id]?.completed;

  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: 'ব্যাকরণ' }} />
      <LevelBadge level={lesson.level} />
      <View>
        <AppText variant="title">{lesson.title.bn}</AppText>
        <AppText variant="subheading" muted>
          {lesson.title.de}
        </AppText>
      </View>

      {lesson.sections.map((s, i) => (
        <Card key={i}>
          <AppText variant="heading">{s.heading}</AppText>
          <AppText variant="bn">{s.body}</AppText>
          {s.table && <DataTable rows={s.table} />}
          {s.examples?.length ? (
            <View style={{ gap: Spacing.sm, marginTop: Spacing.xs }}>
              <AppText variant="label" muted>
                উদাহরণ
              </AppText>
              {s.examples.map((e, j) => (
                <ExampleCard key={j} example={e} />
              ))}
            </View>
          ) : null}
        </Card>
      ))}

      <View style={{ gap: Spacing.sm }}>
        {lesson.exerciseId && (
          <Button
            title="এই পাঠ অনুশীলন করুন"
            icon="create-outline"
            variant="secondary"
            onPress={() => router.push({ pathname: '/quiz/[id]', params: { id: lesson.exerciseId! } })}
          />
        )}
        <Button
          title={completed ? 'পাঠ সম্পন্ন ✓' : 'পাঠ সম্পন্ন হিসেবে চিহ্নিত করুন'}
          icon={completed ? undefined : 'checkmark'}
          disabled={completed}
          onPress={() => completeGrammar(lesson.id)}
        />
      </View>
    </Screen>
  );
}
