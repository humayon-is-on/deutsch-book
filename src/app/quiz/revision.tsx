import { router, Stack } from 'expo-router';
import { useMemo, useState } from 'react';

import { QuestionView } from '@/components/learning';
import { AppText, Button, Card, Icon, LevelBadge, Notice, Row, Screen } from '@/components/ui';
import { getQuestion, isAnswerCorrect, type Answer } from '@/content';
import { useTheme } from '@/hooks/use-theme';
import { useProgress } from '@/state/progress';

/** Revision: replays every question the learner has answered wrong. */
export default function RevisionScreen() {
  const { progress, recordRevision } = useProgress();
  const { colors } = useTheme();
  // Freeze the list when the session starts so it doesn't shrink while answering.
  const ids = useMemo(
    () => Object.entries(progress.mistakes).sort((a, b) => b[1] - a[1]).map(([id]) => id).filter((id) => getQuestion(id)),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );
  const [pos, setPos] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [fixed, setFixed] = useState(0);

  if (ids.length === 0) {
    return (
      <Screen edges={[]}>
        <Stack.Screen options={{ title: 'রিভিশন' }} />
        <Notice>দারুণ! রিভিশনের জন্য কোনো ভুল প্রশ্ন বাকি নেই। অনুশীলনী করলে ভুল প্রশ্নগুলো এখানে জমা হবে।</Notice>
        <Button title="ফিরে যান" variant="secondary" onPress={() => router.back()} />
      </Screen>
    );
  }

  if (pos >= ids.length) {
    return (
      <Screen edges={[]}>
        <Stack.Screen options={{ title: 'রিভিশন' }} />
        <Card style={{ alignItems: 'center' }}>
          <Icon name="sparkles" size={40} color={colors.primary} />
          <AppText variant="heading">রিভিশন শেষ</AppText>
          <AppText variant="bn" muted>
            {ids.length}টির মধ্যে {fixed}টি এবার সঠিক হয়েছে।
          </AppText>
        </Card>
        <Button title="ফিরে যান" onPress={() => router.back()} />
      </Screen>
    );
  }

  const { question, exercise } = getQuestion(ids[pos])!;
  const answer = answers[question.id];

  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: 'রিভিশন' }} />
      <Row style={{ justifyContent: 'space-between' }}>
        <LevelBadge level={exercise.level} />
        <AppText variant="caption" muted>
          {pos + 1} / {ids.length} · {exercise.title.bn}
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
