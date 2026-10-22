import { router } from 'expo-router';

import { AppText, Icon, LevelBadge, ListItem, Row, Screen, Section } from '@/components/ui';
import { topicsFor, type Topic } from '@/content/topics';
import { useLevelIndex } from '@/services/content/store';
import { useLevelColor, useTheme } from '@/hooks/use-theme';
import { topicDone, topicUnlocked, useProgress } from '@/state/progress';

export default function PracticeScreen() {
  const { progress } = useProgress();
  const level = progress.level ?? 'A1';
  const { fg } = useLevelColor(level);
  const { colors } = useTheme();
  const mistakes = Object.keys(progress.mistakes).length;
  const index = useLevelIndex(level);
  const exercises = topicsFor(index, 'mcq');
  const isFill = (e: Topic) => !!e.summary.fill;

  const row = (e: Topic) => {
    const n = e.summary.questionIds?.length ?? 0;
    const q = progress.quizzes[e.id];
    const open = topicUnlocked(progress, index, e.id);
    const answered = q ? Object.keys(q.answers).length : 0;
    const status = !open
      ? 'আগের অনুশীলনী শেষ করলে খুলবে'
      : q?.completed
        ? `সেরা স্কোর ${q.bestScore}/${n}`
        : answered
          ? `${answered}/${n} উত্তর দেওয়া, চালিয়ে যান`
          : `${n}টি প্রশ্ন`;
    return (
      <ListItem
        key={e.id}
        icon={!open ? 'lock-closed-outline' : isFill(e) ? 'create-outline' : 'checkbox-outline'}
        iconColor={open ? fg : colors.textSecondary}
        title={e.title.bn}
        subtitle={status}
        right={
          topicDone(progress, index, e.id) ? (
            <Icon name="checkmark-circle" color={colors.correct} />
          ) : open ? undefined : (
            <Icon name="lock-closed" color={colors.textSecondary} />
          )
        }
        onPress={open ? () => router.push({ pathname: '/quiz/[id]', params: { id: e.id } }) : undefined}
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
