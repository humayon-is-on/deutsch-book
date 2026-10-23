import { router, Stack, useLocalSearchParams, type Href } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { QuestionView } from '@/components/learning';
import { Missing } from '@/components/missing';
import { PRACTICE_KIND, Stars } from '@/components/practice-ladder';
import { Loading, Offline, ResultCard } from '@/components/topic';
import { AppText, Button, Card, Icon, LevelBadge, ProgressBar, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { correctAnswerText, isAnswerCorrect, type Answer, type PracticeSet } from '@/content';
import { getPracticeCard, practiceCards, practiceStars, STAR_STEPS, type PracticeCard } from '@/content/topics';
import { useLevelColor, useTheme } from '@/hooks/use-theme';
import { useLevelIndex } from '@/services/content/store';
import { useTopicFile } from '@/services/content/use-topic';
import { practiceUnlocked, useProgress } from '@/state/progress';

/** One card of the practice ladder: ten questions, then stars. */
export default function PracticeCardScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { progress } = useProgress();
  const index = useLevelIndex();
  const card = getPracticeCard(index, id);
  const open = !!card && practiceUnlocked(progress, index, id);
  const load = useTopicFile(open ? id : undefined);

  if (!index) return <Loading />;
  if (!card) return <Missing />;
  if (!open) {
    return (
      <Screen edges={[]}>
        <Card style={{ alignItems: 'center', paddingVertical: Spacing.xl, gap: Spacing.sm }}>
          <Icon name="lock-closed" size={40} />
          <AppText variant="heading">এই কার্ড এখনো বন্ধ</AppText>
          <AppText variant="bn" muted style={{ textAlign: 'center' }}>
            আগের কার্ডে কমপক্ষে ১টি তারা পেলে এটি খুলবে।
          </AppText>
        </Card>
        <Button title="ফিরে যান" variant="secondary" onPress={() => router.back()} />
      </Screen>
    );
  }
  if (load.status === 'loading') return <Loading />;
  if (load.status === 'offline') return <Offline onRetry={load.retry} />;
  if (load.status === 'missing' || load.file.module !== 'practice') return <Missing />;
  return <Practice key={id} card={card} set={load.file.item} />;
}

function Practice({ card, set }: { card: PracticeCard; set: PracticeSet }) {
  const { recordPractice } = useProgress();
  const { fg } = useLevelColor(set.level);
  const [pos, setPos] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [finished, setFinished] = useState(false);
  const questions = set.questions;
  const total = questions.length;
  const score = questions.filter((q) => isAnswerCorrect(q, answers[q.id])).length;
  const kind = PRACTICE_KIND[set.kind];

  if (finished) {
    return (
      <Result
        card={card}
        set={set}
        score={score}
        answers={answers}
        onRetry={() => {
          setAnswers({});
          setPos(0);
          setFinished(false);
        }}
      />
    );
  }

  const q = questions[pos];
  const answer = answers[q.id];
  const isLast = pos === total - 1;
  const next = () => {
    if (!isLast) return setPos(pos + 1);
    recordPractice(set.id, score, total);
    setFinished(true);
  };

  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: `${kind.bn} অনুশীলন` }} />
      <Row style={{ justifyContent: 'space-between' }}>
        <LevelBadge level={set.level} />
        <AppText variant="caption" muted>
          প্রশ্ন {pos + 1} / {total}
        </AppText>
      </Row>
      <AppText variant="subheading">{set.title.bn}</AppText>
      <ProgressBar value={(pos + (answer !== undefined ? 1 : 0)) / total} color={fg} />
      <QuestionView key={q.id} question={q} answer={answer} onAnswer={(a) => setAnswers({ ...answers, [q.id]: a })} />
      {answer !== undefined && (
        <Button title={isLast ? 'ফলাফল দেখুন' : 'পরের প্রশ্ন'} icon={isLast ? 'flag' : 'arrow-forward'} onPress={next} />
      )}
    </Screen>
  );
}

function Result({
  card,
  set,
  score,
  answers,
  onRetry,
}: {
  card: PracticeCard;
  set: PracticeSet;
  score: number;
  answers: Record<string, Answer>;
  onRetry: () => void;
}) {
  const { colors } = useTheme();
  const index = useLevelIndex();
  const cards = practiceCards(index);
  const next = cards[cards.findIndex((c) => c.id === card.id) + 1];
  const total = set.questions.length;
  const stars = practiceStars(score, total);
  const wrong = set.questions.filter((q) => !isAnswerCorrect(q, answers[q.id]));
  const need = (step: number) => Math.ceil(step * total);

  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: 'ফলাফল' }} />
      <ResultCard passed={stars > 0}>
        <Stars count={stars} size={32} />
        <AppText variant="title">
          {score} / {total}
        </AppText>
        <AppText variant="bn" muted style={{ textAlign: 'center' }}>
          {stars === 3
            ? 'অসাধারণ! পুরো তিন তারা।'
            : stars > 0
              ? `ভালো হয়েছে! ${need(STAR_STEPS[stars])}টি সঠিক হলে আরও একটি তারা পাবেন।`
              : `পরের কার্ড খুলতে কমপক্ষে ${need(STAR_STEPS[0])}টি সঠিক লাগবে।`}
        </AppText>
      </ResultCard>

      {stars > 0 && next && (
        <Button title={`পরের কার্ড: ${PRACTICE_KIND[next.kind].bn}`} icon="arrow-forward" onPress={() => router.replace(next.href as Href)} />
      )}
      <Button title="আবার চেষ্টা করুন" icon="refresh" variant="secondary" onPress={onRetry} />
      <Button title="সিঁড়িতে ফিরে যান" icon="list-outline" variant="secondary" onPress={() => router.back()} />

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
    </Screen>
  );
}
