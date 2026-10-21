import { router } from 'expo-router';

import { AppText, Icon, LevelBadge, ListItem, Row, Screen, Section } from '@/components/ui';
import { content, type Exercise } from '@/content';
import { useLevelColor, useTheme } from '@/hooks/use-theme';
import { useProgress } from '@/state/progress';

export default function PracticeScreen() {
  const { progress } = useProgress();
  const level = progress.level ?? 'A1';
  const { fg } = useLevelColor(level);
  const { colors } = useTheme();
  const mistakes = Object.keys(progress.mistakes).length;
  const exercises = content[level].exercises;
  const isFill = (e: Exercise) => e.questions.every((q) => q.type === 'fill');

  const row = (e: Exercise) => {
    const q = progress.quizzes[e.id];
    const answered = q ? Object.keys(q.answers).length : 0;
    const status = q?.completed
      ? `সেরা স্কোর ${q.bestScore}/${e.questions.length}`
      : answered
        ? `${answered}/${e.questions.length} উত্তর দেওয়া, চালিয়ে যান`
        : `${e.questions.length}টি প্রশ্ন`;
    return (
      <ListItem
        key={e.id}
        icon={isFill(e) ? 'create-outline' : 'checkbox-outline'}
        iconColor={fg}
        title={e.title.bn}
        subtitle={status}
        right={q?.completed ? <Icon name="checkmark-circle" color={colors.correct} /> : undefined}
        onPress={() => router.push({ pathname: '/quiz/[id]', params: { id: e.id } })}
      />
    );
  };

  return (
    <Screen>
      <Row style={{ justifyContent: 'space-between' }}>
        <AppText variant="title">অনুশীলন</AppText>
        <LevelBadge level={level} />
      </Row>

      <ListItem
        icon="refresh-circle-outline"
        title="রিভিশন"
        subtitle={mistakes ? `${mistakes}টি ভুল প্রশ্ন আবার অনুশীলন করুন` : 'কোনো ভুল প্রশ্ন বাকি নেই'}
        onPress={() => router.push('/quiz/revision')}
      />
      <ListItem
        icon="speedometer-outline"
        title="লেভেল যাচাই পরীক্ষা"
        subtitle={
          progress.placement
            ? `শেষ ফলাফল: ${progress.placement.correct}/${progress.placement.total}, প্রস্তাবিত ${progress.placement.recommended}`
            : 'আপনার জন্য কোন লেভেল উপযুক্ত, জেনে নিন'
        }
        onPress={() => router.push('/onboarding/placement')}
      />

      <Section title="বহুনির্বাচনী (MCQ)">{exercises.filter((e) => !isFill(e)).map(row)}</Section>
      <Section title="শূন্যস্থান পূরণ">{exercises.filter(isFill).map(row)}</Section>
    </Screen>
  );
}
