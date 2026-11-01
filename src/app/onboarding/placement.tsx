import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { useLeaveGuard } from '@/components/leave-guard';
import { QuestionView } from '@/components/learning';
import { AppText, CountBar, Button, Card, LevelBadge, Notice, ProgressBar, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { isAnswerCorrect, LEVELS, levelInfo, type Answer, type Level } from '@/content';
import { placementQuestions, scorePlacement, type PlacementResult } from '@/content/placement';
import { useLevelColor } from '@/hooks/use-theme';
import { confirmLevelChange } from '@/lib/level';
import { useProgress } from '@/state/progress';
import { useMarkTestRunning } from '@/state/test-running';
import { useT } from '@/i18n';

export default function PlacementScreen() {
  const { progress, savePlacement, chooseLevel } = useProgress();
  const [pos, setPos] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [result, setResult] = useState<PlacementResult | null>(null);
  const t = useT();
  // Leaving half-way loses the answers, so every way out asks first.
  // Reminders wait until the questions are done.
  useMarkTestRunning(!result);
  const guard = useLeaveGuard(!result && (pos > 0 || Object.keys(answers).length > 0));

  if (result) {
    return (
      <Result
        result={result}
        current={progress.onboarded ? (progress.level ?? undefined) : undefined}
        onAccept={async () => {
          if (progress.onboarded && progress.level === result.recommended) return router.back();
          if (!(await confirmLevelChange(progress, result.recommended))) return;
          chooseLevel(result.recommended);
          if (router.canDismiss()) router.dismissAll();
          router.replace('/');
        }}
        onChooseOther={() => router.replace({ pathname: '/onboarding/level', params: { recommended: result.recommended } })}
      />
    );
  }

  const q = placementQuestions[pos];
  const total = placementQuestions.length;
  const answer = answers[q.id];
  const isLast = pos === total - 1;

  const next = () => {
    if (!isLast) return setPos(pos + 1);
    const correct = Object.fromEntries(
      placementQuestions.map((x) => [x.id, isAnswerCorrect(x, answers[x.id])]),
    );
    const r = scorePlacement(correct);
    savePlacement(r);
    setResult(r);
  };

  return (
    <Screen edges={[]}>
      <CountBar value={pos / total} count={`${pos + 1}/${total}`} />
      {pos === 0 && (
        <Notice>
          {t('না জানলে আন্দাজ না করে „এড়িয়ে যান“ চাপুন। এতে ফলাফল বেশি সঠিক হবে।', 'If you don’t know, tap „Skip“ instead of guessing. This makes the result more accurate.')}
        </Notice>
      )}
      {/* Placement shows right/wrong but hides explanations to keep it short. */}
      <QuestionView
        key={q.id}
        question={q}
        answer={answer}
        showExplanation={false}
        onAnswer={(a) => setAnswers({ ...answers, [q.id]: a })}
      />
      {answer !== undefined ? (
        <Button title={isLast ? t('ফলাফল দেখুন', 'See result') : t('পরের প্রশ্ন', 'Next question')} onPress={next} />
      ) : (
        // Under the options on the right, within thumb reach.
        <Button title={t('এড়িয়ে যান', 'Skip')} icon="play-skip-forward-outline" variant="secondary" onPress={next} style={{ alignSelf: 'flex-end' }} />
      )}
      {guard.confirm}
    </Screen>
  );
}

function Result({
  result,
  current,
  onAccept,
  onChooseOther,
}: {
  result: PlacementResult;
  /** The learner's level when they took the test again from the profile. */
  current?: Level;
  onAccept: () => void;
  onChooseOther: () => void;
}) {
  const { fg, bg } = useLevelColor(result.recommended);
  const t = useT();
  return (
    <Screen edges={[]}>
      <Card style={{ backgroundColor: bg, borderColor: fg, alignItems: 'center', paddingVertical: Spacing.xl }}>
        <AppText variant="caption" muted>
          {t('প্রস্তাবিত লেভেল', 'Suggested level')}
        </AppText>
        <AppText variant="title" color={fg} style={{ fontSize: 48, lineHeight: 56 }}>
          {result.recommended}
        </AppText>
        <AppText variant="subheading">{t(levelInfo[result.recommended].bn, levelInfo[result.recommended].name)}</AppText>
        <AppText variant="caption" muted>
          {t('মোট সঠিক', 'Total correct')}: {result.correct}/{result.total}
        </AppText>
      </Card>

      <Card>
        {LEVELS.map((l) => (
          <View key={l} style={{ gap: 4, paddingVertical: Spacing.xs }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <LevelBadge level={l} size="sm" />
              <AppText variant="caption" muted>
                {result.byLevel[l].correct}/{result.byLevel[l].total}
              </AppText>
            </Row>
            <LevelBar level={l} value={result.byLevel[l].correct / result.byLevel[l].total} />
          </View>
        ))}
      </Card>

      <Notice>{t('এই ফলাফল শুধু নির্দেশনা, কোনো আনুষ্ঠানিক ভাষা-দক্ষতার সনদ নয়।', 'This result is only a guide, not an official language certificate.')}</Notice>
      <Button
        title={
          !current
            ? t(`${result.recommended} দিয়ে শুরু করুন`, `Start with ${result.recommended}`)
            : current === result.recommended
              ? t(`${current} লেভেলেই থাকুন`, `Stay at level ${current}`)
              : t(`${result.recommended} লেভেলে যান`, `Go to level ${result.recommended}`)
        }
        icon="play"
        onPress={onAccept}
      />
      <Button title={t('অন্য লেভেল বেছে নিন', 'Choose another level')} variant="secondary" onPress={onChooseOther} />
    </Screen>
  );
}

function LevelBar({ level, value }: { level: (typeof LEVELS)[number]; value: number }) {
  const { fg } = useLevelColor(level);
  return <ProgressBar value={value} color={fg} height={6} />;
}
