import { router, Stack } from 'expo-router';
import { useMemo, useState } from 'react';

import { QuestionView } from '@/components/learning';
import { Loading } from '@/components/topic';
import { AppText, Button, Card, Icon, LevelBadge, Notice, Row, Screen } from '@/components/ui';
import { isAnswerCorrect, type Answer, type Exercise, type Question } from '@/content';
import { exerciseOfQuestion, useLevelIndex } from '@/services/content/store';
import { useTopicFiles } from '@/services/content/use-topic';
import { useTheme } from '@/hooks/use-theme';
import { useProgress } from '@/state/progress';

/** Revision: replays every question the learner has answered wrong. */
export default function RevisionScreen() {
  const { progress, recordRevision } = useProgress();
  const { colors } = useTheme();
  const index = useLevelIndex();
  // Freeze the list when the session starts so it doesn't shrink while answering.
  const ids = useMemo(
    () => Object.entries(progress.mistakes).sort((a, b) => b[1] - a[1]).map(([id]) => id).filter((id) => exerciseOfQuestion(index, id)),
    [index], // eslint-disable-line react-hooks/exhaustive-deps
  );
  // The exercises holding those questions, downloaded if they aren't on the device.
  const exerciseIds = [...new Set(ids.map((id) => exerciseOfQuestion(index, id)!))];
  const { loading, files } = useTopicFiles(exerciseIds);
  const questions = new Map<string, { question: Question; exercise: Exercise }>();
  for (const f of files) {
    if (f.module === 'mcq') for (const question of f.item.questions) questions.set(question.id, { question, exercise: f.item });
  }
  const [pos, setPos] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [fixed, setFixed] = useState(0);

  if (ids.length === 0) {
    return (
      <Screen edges={[]}>
        <Stack.Screen options={{ title: 'রিভিশন' }} />
        <Notice>দারুণ! রিভিশনের জন্য কোনো ভুল প্রশ্ন বাকি নেই। মডেলের প্রশ্ন করলে ভুলগুলো এখানে জমা হবে।</Notice>
        <Button title="ফিরে যান" variant="secondary" onPress={() => router.back()} />
      </Screen>
    );
  }

  if (loading) return <Loading title="রিভিশন" />;
  // Questions whose exercise couldn't be downloaded (offline) are skipped.
  const available = ids.filter((id) => questions.has(id));

  if (pos >= available.length) {
    return (
      <Screen edges={[]}>
        <Stack.Screen options={{ title: 'রিভিশন' }} />
        <Card style={{ alignItems: 'center' }}>
          <Icon name="sparkles" size={40} color={colors.primary} />
          <AppText variant="heading">রিভিশন শেষ</AppText>
          <AppText variant="bn" muted>
            {available.length}টির মধ্যে {fixed}টি এবার সঠিক হয়েছে।
          </AppText>
        </Card>
        <Button title="ফিরে যান" onPress={() => router.back()} />
      </Screen>
    );
  }

  const { question, exercise } = questions.get(available[pos])!;
  const answer = answers[question.id];

  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: 'রিভিশন' }} />
      <Row style={{ justifyContent: 'space-between' }}>
        <LevelBadge level={exercise.level} />
        <AppText variant="caption" muted>
          {pos + 1} / {available.length} · {exercise.title.bn}
        </AppText>
      </Row>
      <QuestionView
        key={question.id}
        question={question}
        answer={answer}
        onAnswer={(a) => {
          const ok = isAnswerCorrect(question, a);
          setAnswers({ ...answers, [question.id]: a });
          if (ok) setFixed(fixed + 1);
          recordRevision(question.id, ok);
        }}
      />
      {answer !== undefined && <Button title="পরের প্রশ্ন" icon="arrow-forward" onPress={() => setPos(pos + 1)} />}
    </Screen>
  );
}
