import { Stack, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { View } from 'react-native';

import { QuestionView } from '@/components/learning';
import { Missing } from '@/components/missing';
import { LockedTopic, TestResultActions, useTopicLocked } from '@/components/topic';
import { AppText, Button, Card, Icon, LevelBadge, ProgressBar, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { correctAnswerText, isAnswerCorrect, type Answer } from '@/content';
import { getTopic, nextTopic, passesTopicTest, TOPIC_PASS, topicTest } from '@/content/topics';
import { useLevelColor, useTheme } from '@/hooks/use-theme';
import { useProgress } from '@/state/progress';

/** The short test at the end of a topic. Passing it finishes the topic and opens the next one. */
export default function TopicTestScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const topic = getTopic(id);
  const questions = useMemo(() => topicTest(id), [id]);
  const locked = useTopicLocked(id);
  const { recordTopicTest } = useProgress();
  const { fg } = useLevelColor(topic?.level ?? 'A1');
  const [pos, setPos] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [finished, setFinished] = useState(false);

  if (!topic || questions.length === 0) return <Missing />;
  if (locked) return <LockedTopic id={id} />;

  const total = questions.length;
  const score = questions.filter((q) => isAnswerCorrect(q, answers[q.id])).length;
  const restart = () => {
    setAnswers({});
    setPos(0);
    setFinished(false);
  };

  if (finished) return <Result topicId={id} score={score} answers={answers} onRetry={restart} />;

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
      <Stack.Screen options={{ title: 'টপিক টেস্ট' }} />
      <Row style={{ justifyContent: 'space-between' }}>
        <LevelBadge level={topic.level} />
        <AppText variant="caption" muted>
          প্রশ্ন {pos + 1} / {total}
        </AppText>
      </Row>
      <AppText variant="subheading">{topic.title.bn}</AppText>
      <ProgressBar value={(pos + (answer !== undefined ? 1 : 0)) / total} color={fg} />
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
    </Screen>
  );
}

function Result({
  topicId,
  score,
  answers,
  onRetry,
}: {
  topicId: string;
  score: number;
  answers: Record<string, Answer>;
  onRetry: () => void;
}) {
  const { colors } = useTheme();
  const questions = topicTest(topicId);
  const total = questions.length;
  const passed = passesTopicTest(score, total);
  const next = nextTopic(topicId);
  const wrong = questions.filter((q) => !isAnswerCorrect(q, answers[q.id]));

  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: 'টপিক টেস্ট' }} />
      <Card style={{ alignItems: 'center', paddingVertical: Spacing.xl, borderColor: passed ? colors.correct : colors.border }}>
        <Icon name={passed ? 'trophy' : 'refresh'} size={44} color={passed ? colors.correct : colors.primary} />
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
      </Card>

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
