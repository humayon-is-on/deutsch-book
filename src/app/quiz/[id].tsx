import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { QuestionView, Translation } from '@/components/learning';
import { ResultCard, TestResultActions, WithTopic } from '@/components/topic';
import { AppText, Button, Card, LevelBadge, ProgressBar, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { correctAnswerText, isAnswerCorrect, type Exercise } from '@/content';
import { nextTopic, passesTopicTest, TOPIC_PASS } from '@/content/topics';
import { useLevelIndex } from '@/services/content/store';
import { useLevelColor, useTheme } from '@/hooks/use-theme';
import { useProgress, type QuizState } from '@/state/progress';

export default function QuizScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <WithTopic id={id} modules={['mcq']}>
      {(file) => <Quiz exercise={file.item} />}
    </WithTopic>
  );
}

function Quiz({ exercise }: { exercise: Exercise }) {
  const { progress, visit } = useProgress();

  useEffect(() => {
    visit({ href: `/quiz/${exercise.id}`, title: exercise.title.bn, level: exercise.level, module: 'mcq' });
  }, [exercise.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const state = progress.quizzes[exercise.id];

  return (
    <>
      <Stack.Screen options={{ title: exercise.title.bn }} />
      {state?.completed ? <Results exercise={exercise} state={state} /> : <Runner exercise={exercise} state={state} />}
    </>
  );
}

function Runner({ exercise, state }: { exercise: Exercise; state?: QuizState }) {
  const { answerQuestion, setQuizPosition, finishQuiz } = useProgress();
  const total = exercise.questions.length;
  const [pos, setPos] = useState(() => Math.min(state?.position ?? 0, total - 1));
  const [passageOpen, setPassageOpen] = useState(true);
  const { fg } = useLevelColor(exercise.level);
  const q = exercise.questions[pos];
  const answer = state?.answers[q.id];
  const isLast = pos === total - 1;

  const next = () => {
    if (isLast) return finishQuiz(exercise);
    setPos(pos + 1);
    setQuizPosition(exercise.id, pos + 1);
  };

  return (
    <Screen edges={[]}>
      <Row style={{ justifyContent: 'space-between' }}>
        <LevelBadge level={exercise.level} />
        <AppText variant="caption" muted>
          প্রশ্ন {pos + 1} / {total}
        </AppText>
      </Row>
      <ProgressBar value={(pos + (answer !== undefined ? 1 : 0)) / total} color={fg} />

      {exercise.passage && (
        <Card>
          <Row style={{ justifyContent: 'space-between' }}>
            <AppText variant="label" muted>
              পাঠ্যাংশ
            </AppText>
            <Button title={passageOpen ? 'লুকান' : 'দেখুন'} variant="ghost" onPress={() => setPassageOpen(!passageOpen)} />
          </Row>
          {passageOpen && <Translation item={exercise.passage} compact />}
        </Card>
      )}

      <QuestionView key={q.id} question={q} answer={answer} onAnswer={(a) => answerQuestion(exercise.id, q, a, pos)} />

      {answer !== undefined && (
        <Button title={isLast ? 'ফলাফল দেখুন' : 'পরের প্রশ্ন'} icon={isLast ? 'flag' : 'arrow-forward'} onPress={next} />
      )}
    </Screen>
  );
}

function Results({ exercise, state }: { exercise: Exercise; state: QuizState }) {
  const index = useLevelIndex();
  const { restartQuiz } = useProgress();
  const { colors } = useTheme();
  const total = exercise.questions.length;
  const ratio = state.score / total;
  const wrong = exercise.questions.filter((q) => !isAnswerCorrect(q, state.answers[q.id]));
  // The exercise is its own topic test: the best score decides whether the next topic opens.
  const passed = passesTopicTest(state.bestScore, total);
  const next = nextTopic(index, exercise.id);

  return (
    <Screen edges={[]}>
      <ResultCard passed={passesTopicTest(state.score, total)}>
        <AppText variant="title">
          {state.score} / {total}
        </AppText>
        <AppText variant="bn" muted style={{ textAlign: 'center' }}>
          {ratio >= 0.8 ? 'চমৎকার! আপনি বিষয়টি ভালোভাবে বুঝেছেন।' : ratio >= 0.5 ? 'ভালো হয়েছে! ভুলগুলো দেখে আবার চেষ্টা করুন।' : 'চিন্তা নেই, অনুশীলনেই উন্নতি। আবার চেষ্টা করুন।'}
        </AppText>
        <AppText variant="caption" muted>
          সেরা স্কোর: {state.bestScore}/{total} · চেষ্টা: {state.attempts}
        </AppText>
        <AppText variant="bn" color={passed ? colors.correct : colors.textSecondary} style={{ textAlign: 'center' }}>
          {passed
            ? next
              ? 'টপিক সম্পন্ন, পরের টপিক খুলে গেছে।'
              : 'টপিক সম্পন্ন। এই অংশের সব টপিক শেষ।'
            : `টপিক শেষ করতে কমপক্ষে ${Math.round(TOPIC_PASS * 100)}% সঠিক লাগবে।`}
        </AppText>
      </ResultCard>

      {wrong.length > 0 && (
        <View style={{ gap: Spacing.sm }}>
          <AppText variant="subheading">ভুলগুলো দেখুন</AppText>
          {wrong.map((q) => (
            <Card key={q.id}>
              <AppText variant="body" style={{ fontWeight: '600' }}>
                {q.prompt}
              </AppText>
              <AppText variant="caption" color={colors.wrong}>
                আপনার উত্তর:{' '}
                {state.answers[q.id] === undefined
                  ? '—'
                  : q.type === 'mcq'
                    ? q.options[state.answers[q.id] as number]
                    : String(state.answers[q.id])}
              </AppText>
              <AppText variant="caption" color={colors.correct}>
                সঠিক উত্তর: {correctAnswerText(q)}
              </AppText>
              {q.explanation ? <AppText variant="bn" muted>{q.explanation}</AppText> : null}
            </Card>
          ))}
        </View>
      )}

      <TestResultActions id={exercise.id} passed={passed} onRetest={() => restartQuiz(exercise.id)} />
    </Screen>
  );
}
