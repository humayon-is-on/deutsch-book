import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { useLeaveGuard } from '@/components/leave-guard';
import { QuestionView } from '@/components/learning';
import { Missing } from '@/components/missing';
import { ResultCard, TestResultActions, WithTopic } from '@/components/topic';
import { AppText, CountBar, Button, Card, levelHeader, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { correctAnswerText, isAnswerCorrect, type Answer, type Question } from '@/content';
import { getTopic, nextTopic, passesTopicTest, TOPIC_PASS } from '@/content/topics';
import { useLevelIndex } from '@/services/content/store';
import { useLevelColor, useTheme } from '@/hooks/use-theme';
import { useProgress } from '@/state/progress';
import { useMarkTestRunning } from '@/state/test-running';

/** The short test at the end of a topic. Passing it finishes the topic and opens the next one. */
export default function TopicTestScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <WithTopic id={id} modules={['grammar', 'vocabulary', 'models', 'emails', 'dialogues']}>
      {(file) => <TopicTest id={id} questions={file.test} />}
    </WithTopic>
  );
}

function TopicTest({ id, questions }: { id: string; questions: Question[] }) {
  const index = useLevelIndex();
  const topic = getTopic(index, id);
  const { recordTopicTest } = useProgress();
  const { fg } = useLevelColor(topic?.level ?? 'A1');
  const [pos, setPos] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [finished, setFinished] = useState(false);
  // Leaving half-way loses the answers, so the back button asks first.
  // Reminders wait until the questions are done.
  useMarkTestRunning(!finished);
  const guard = useLeaveGuard(!finished && Object.keys(answers).length > 0);

  if (!topic || questions.length === 0) return <Missing />;

  const total = questions.length;
  const score = questions.filter((q) => isAnswerCorrect(q, answers[q.id])).length;
  const restart = () => {
    setAnswers({});
    setPos(0);
    setFinished(false);
  };

  if (finished) return <Result topicId={id} questions={questions} score={score} answers={answers} onRetry={restart} />;

  const q = questions[pos];
  const answer = answers[q.id];
  const isLast = pos === total - 1;
  const next = () => {
    if (!isLast) return setPos(pos + 1);
    recordTopicTest(id, score, total);
    setFinished(true);
  };

  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: 'টপিক টেস্ট', ...levelHeader(topic.level) }} />
      <AppText variant="subheading">{topic.title.bn}</AppText>
      <CountBar value={(pos + (answer !== undefined ? 1 : 0)) / total} count={`${pos + 1}/${total}`} color={fg} />
      {/* Right or wrong shows at once; explanations wait for the result screen. */}
      <QuestionView
        key={q.id}
        question={q}
        answer={answer}
        showExplanation={false}
        onAnswer={(a) => setAnswers({ ...answers, [q.id]: a })}
      />
      {answer !== undefined && (
        <Button title={isLast ? 'ফলাফল দেখুন' : 'পরের প্রশ্ন'} icon={isLast ? 'flag' : 'arrow-forward'} onPress={next} />
      )}
      {guard.confirm}
    </Screen>
  );
}

function Result({
  topicId,
  questions,
  score,
  answers,
  onRetry,
}: {
  topicId: string;
  questions: Question[];
  score: number;
  answers: Record<string, Answer>;
  onRetry: () => void;
}) {
  const { colors } = useTheme();
  const index = useLevelIndex();
  const total = questions.length;
  const passed = passesTopicTest(score, total);
  const next = nextTopic(index, topicId);
  const wrong = questions.filter((q) => !isAnswerCorrect(q, answers[q.id]));

  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: 'টপিক টেস্ট' }} />
      <ResultCard passed={passed}>
        <AppText variant="title">
          {score} / {total}
        </AppText>
        <AppText variant="bn" muted style={{ textAlign: 'center' }}>
          {passed
            ? next
              ? 'অভিনন্দন! টপিক সম্পন্ন হয়েছে, পরের টপিক খুলে গেছে।'
              : 'অভিনন্দন! টপিক সম্পন্ন হয়েছে। এই অংশের সব টপিক শেষ।'
            : `পাস করতে কমপক্ষে ${Math.round(TOPIC_PASS * 100)}% সঠিক লাগবে। টপিকটি আবার দেখে চেষ্টা করুন।`}
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
              <AppText variant="caption" color={colors.correct}>
                সঠিক উত্তর: {correctAnswerText(q)}
              </AppText>
              {q.explanation ? <AppText variant="bn" muted>{q.explanation}</AppText> : null}
            </Card>
          ))}
        </View>
      )}

      <TestResultActions id={topicId} passed={passed} onRetest={onRetry} />
    </Screen>
  );
}
