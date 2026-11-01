import { router, Stack, useLocalSearchParams, type Href } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { useLeaveGuard } from '@/components/leave-guard';
import { QuestionView } from '@/components/learning';
import { LivesRow, OutOfLives, useLives } from '@/components/lives';
import { Missing } from '@/components/missing';
import { PRACTICE_KIND, Stars } from '@/components/practice-ladder';
import { Loading, Offline, ResultCard } from '@/components/topic';
import { AppText, Button, Card, Icon, levelHeader, Notice, ProgressBar, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { correctAnswerText, isAnswerCorrect, type Answer, type PracticeSet } from '@/content';
import type { PracticeReach } from '@/content/types';
import { EXAM_PASS, getPracticeCard, passesExam, practiceCards, practiceStars, STAR_STEPS, type PracticeCard } from '@/content/topics';
import { useLevelColor, useTheme } from '@/hooks/use-theme';
import { useLevelIndex } from '@/services/content/store';
import { useTopicFile } from '@/services/content/use-topic';
import { confirmLevelChange } from '@/lib/level';
import { EXAM_LEARN_SHARE, examNeedsLearning, nextLevel, practiceUnlocked, useProgress } from '@/state/progress';
import { useMarkTestRunning } from '@/state/test-running';
import { useT } from '@/i18n';

/** One card of the practice ladder: ten questions, then stars. The level test at its end has twenty. */
export default function PracticeCardScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { progress } = useProgress();
  const t = useT();
  const index = useLevelIndex();
  const card = getPracticeCard(index, id);
  const needsLearning = card?.kind === 'exam' && examNeedsLearning(progress, index);
  const open = !!card && practiceUnlocked(progress, index, id) && !needsLearning;
  const load = useTopicFile(open ? id : undefined);

  if (!index) return <Loading />;
  if (!card) return <Missing />;
  if (!open) {
    return (
      <Screen edges={[]}>
        <Card style={{ alignItems: 'center', paddingVertical: Spacing.xl, gap: Spacing.sm }}>
          <Icon name="lock-closed" size={40} />
          <AppText variant="heading">{card.kind === 'exam' ? t('লেভেল টেস্ট এখনো বন্ধ', 'The level test is still locked') : t('এই কার্ড এখনো বন্ধ', 'This card is still locked')}</AppText>
          <AppText variant="bn" muted style={{ textAlign: 'center' }}>
            {card.kind !== 'exam'
              ? t('আগের কার্ডে কমপক্ষে ১টি তারা পেলে এটি খুলবে।', 'It opens when you get at least 1 star on the previous card.')
              : needsLearning
                ? t(
                    `টেস্ট কার্ডটি খুলতে শেখার মডিউলগুলোতে মোট কমপক্ষে ${Math.round(EXAM_LEARN_SHARE * 100)}% অগ্রগতি সম্পন্ন করতে হবে।`,
                    `To open the test card, finish at least ${Math.round(EXAM_LEARN_SHARE * 100)}% of the learning modules in total.`,
                  )
                : t('সব অনুশীলন কার্ডে কমপক্ষে ১টি তারা পেলে লেভেল টেস্ট খুলবে।', 'The level test opens when you get at least 1 star on every practice card.')}
          </AppText>
        </Card>
        <Button title={t('ফিরে যান', 'Go back')} variant="secondary" onPress={() => router.back()} />
      </Screen>
    );
  }
  if (load.status === 'loading') return <Loading />;
  if (load.status === 'offline') return <Offline onRetry={load.retry} />;
  if (load.status === 'missing' || load.file.module !== 'practice') return <Missing />;
  return <Practice key={id} card={card} set={load.file.item} />;
}

function Practice({ card, set }: { card: PracticeCard; set: PracticeSet }) {
  const { recordPractice, changeLives } = useProgress();
  const t = useT();
  // Practice cards spend hearts on mistakes; the level test doesn't.
  const usesLives = set.kind !== 'exam';
  const lives = useLives();
  const { fg } = useLevelColor(set.level);
  const [pos, setPos] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [finished, setFinished] = useState(false);
  const questions = set.questions;
  const total = questions.length;
  const score = questions.filter((q) => isAnswerCorrect(q, answers[q.id])).length;
  // Leaving half-way loses the card's answers, so the back button asks first.
  // Reminders wait until the questions are done.
  useMarkTestRunning(!finished);
  const guard = useLeaveGuard(!finished && Object.keys(answers).length > 0);

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
      <Stack.Screen options={{ title: set.title.bn, ...levelHeader(set.level) }} />
      {card.requires && pos === 0 && answer === undefined && <FinishFirst reach={card.requires} />}
      <Row style={{ gap: Spacing.md }}>
        <View style={{ flex: 1 }}>
          <ProgressBar value={(pos + (answer !== undefined ? 1 : 0)) / total} color={fg} height={14} />
        </View>
        {usesLives && <LivesRow size={18} />}
      </Row>
      <QuestionView
        key={q.id}
        question={q}
        answer={answer}
        onAnswer={(a) => {
          setAnswers({ ...answers, [q.id]: a });
          if (usesLives && !isAnswerCorrect(q, a)) changeLives(-1);
        }}
      />
      {/* Out of hearts: the card waits here, at this question, until a heart comes back. */}
      {usesLives && lives.count === 0 && <OutOfLives onBack={guard.leave} onReward={() => changeLives(1)} />}
      {guard.confirm}
      {answer !== undefined && (
        <Button title={isLast ? t('ফলাফল দেখুন', 'See result') : t('পরের প্রশ্ন', 'Next question')} icon={isLast ? 'flag' : 'arrow-forward'} onPress={next} />
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
  const index = useLevelIndex();
  const cards = practiceCards(index);
  const next = cards[cards.findIndex((c) => c.id === card.id) + 1];
  const total = set.questions.length;
  const stars = practiceStars(score, total);
  const wrong = set.questions.filter((q) => !isAnswerCorrect(q, answers[q.id]));
  const need = (step: number) => Math.ceil(step * total);
  const t = useT();

  if (set.kind === 'exam') return <ExamResult set={set} score={score} wrong={wrong} onRetry={onRetry} />;

  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: t('ফলাফল', 'Result') }} />
      <ResultCard passed={stars > 0} perfect={total > 0 && score === total}>
        <Stars count={stars} size={32} />
        <AppText variant="title">
          {score} / {total}
        </AppText>
        <AppText variant="bn" muted style={{ textAlign: 'center' }}>
          {stars === 3
            ? t('অসাধারণ! পুরো তিন তারা।', 'Excellent! All three stars.')
            : stars > 0
              ? t(`ভালো হয়েছে! ${need(STAR_STEPS[stars])}টি সঠিক হলে আরও একটি তারা পাবেন।`, `Well done! Get ${need(STAR_STEPS[stars])} right for one more star.`)
              : t(`পরের কার্ড খুলতে কমপক্ষে ${need(STAR_STEPS[0])}টি সঠিক লাগবে।`, `You need at least ${need(STAR_STEPS[0])} right to open the next card.`)}
        </AppText>
      </ResultCard>

      {/* Passed: next card, the ladder, then a retry for more stars. Not passed: retry first, no next card. */}
      {stars > 0 && next && (
        <Button title={`${t('পরের কার্ড', 'Next card')}: ${t(PRACTICE_KIND[next.kind].bn, PRACTICE_KIND[next.kind].en)}`} singleLine icon="arrow-forward" onPress={() => router.replace(next.href as Href)} />
      )}
      <ResultActions passed={stars > 0} onRetry={onRetry} />

      <Mistakes wrong={wrong} />
    </Screen>
  );
}

/** The level test's result: pass and the next level opens, otherwise try again. */
function ExamResult({ set, score, wrong, onRetry }: { set: PracticeSet; score: number; wrong: PracticeSet['questions']; onRetry: () => void }) {
  const { progress, chooseLevel } = useProgress();
  const total = set.questions.length;
  const passed = passesExam(score, total);
  const next = nextLevel(set.level);
  const need = Math.ceil(EXAM_PASS * total);
  const t = useT();

  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: t('লেভেল টেস্টের ফলাফল', 'Level test result') }} />
      <ResultCard passed={passed} perfect={total > 0 && score === total}>
        <AppText variant="title">
          {score} / {total}
        </AppText>
        <AppText variant="bn" muted style={{ textAlign: 'center' }}>
          {passed
            ? t(
                `অভিনন্দন! আপনি ${set.level} লেভেল পাশ করেছেন।${next ? ` এখন ${next} লেভেলে যেতে পারেন।` : ''}`,
                `Congratulations! You passed level ${set.level}.${next ? ` You can now move to level ${next}.` : ''}`,
              )
            : t(`পাশ করতে কমপক্ষে ${need}টি সঠিক লাগবে। ভুলগুলো দেখে আবার চেষ্টা করুন।`, `You need at least ${need} right to pass. Review your mistakes and try again.`)}
        </AppText>
      </ResultCard>

      {passed && next && (
        <Button
          title={t(`${next} লেভেলে যান`, `Go to level ${next}`)}
          icon="arrow-up-circle-outline"
          onPress={async () => {
            if (!(await confirmLevelChange(progress, next, { earned: true }))) return;
            router.dismissTo('/');
            chooseLevel(next);
          }}
        />
      )}
      <ResultActions passed={passed} onRetry={onRetry} />
      <Mistakes wrong={wrong} />
    </Screen>
  );
}

/** Under a result: the ladder before a retry once passed; otherwise the retry comes first, as the main button. */
function ResultActions({ passed, onRetry }: { passed: boolean; onRetry: () => void }) {
  const t = useT();
  const retry = <Button title={t('আবার চেষ্টা করুন', 'Try again')} icon="refresh" variant={passed ? 'secondary' : 'primary'} onPress={onRetry} />;
  return (
    <>
      {!passed && retry}
      <Button title={t('সিঁড়িতে ফিরে যান', 'Back to the ladder')} icon="list-outline" variant="secondary" onPress={() => router.back()} />
      {passed && retry}
    </>
  );
}

/** How far into Learn to get before this card: „ব্যাকরণ 6 ও শব্দকোষ 4 পর্যন্ত শিখে এটি প্র্যাকটিস করুন“. */
function FinishFirst({ reach }: { reach: PracticeReach }) {
  const t = useT();
  const bn = [reach.grammar && `ব্যাকরণ ${reach.grammar}`, reach.vocabulary && `শব্দকোষ ${reach.vocabulary}`].filter(Boolean);
  const en = [reach.grammar && `grammar ${reach.grammar}`, reach.vocabulary && `vocabulary ${reach.vocabulary}`].filter(Boolean);
  return <Notice>{t(`${bn.join(' ও ')} পর্যন্ত শিখে এটি প্র্যাকটিস করুন`, `Learn up to ${en.join(' and ')}, then practise this.`)}</Notice>;
}

/** The questions answered wrong, with the right answers. */
function Mistakes({ wrong }: { wrong: PracticeSet['questions'] }) {
  const { colors } = useTheme();
  const t = useT();
  return (
    <>
      {wrong.length > 0 && (
        <View style={{ gap: Spacing.sm }}>
          <AppText variant="subheading">{t('ভুলগুলো দেখুন', 'Review your mistakes')}</AppText>
          {wrong.map((q) => (
            <Card key={q.id}>
              <AppText variant="body" style={{ fontWeight: '600' }}>
                {q.prompt}
              </AppText>
              <AppText variant="caption" color={colors.correct}>
                {t('সঠিক উত্তর', 'Correct answer')}: {correctAnswerText(q)}
              </AppText>
              {q.explanation ? <AppText variant="bn" muted>{q.explanation}</AppText> : null}
            </Card>
          ))}
        </View>
      )}
    </>
  );
}
