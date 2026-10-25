import { router, type Href } from 'expo-router';
import { Pressable, View } from 'react-native';

import { GuestBanner, useGuestBackWarning } from '@/components/account';
import { Avatar } from '@/components/avatar';
import { AppText, Button, Card, Icon, LevelBadge, ProgressBar, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { levelInfo, MODULES, moduleInfo, type Level } from '@/content';
import { topicsFor } from '@/content/topics';
import { useLevelColor, useTheme } from '@/hooks/use-theme';
import { confirmLevelChange } from '@/lib/level';
import { useLevelIndex } from '@/services/content/store';
import { useIdentity } from '@/state/identity';
import { LEVEL_UP_SCORE, levelProgress, nextLevel, useProgress } from '@/state/progress';

/**
 * Learn: the app's first tab. The learner's level and progress, the way back
 * into the last lesson, then the five modules.
 */
export default function LearnScreen() {
  const { progress } = useProgress();
  const level = progress.level ?? 'A1';
  const index = useLevelIndex(level);
  const lp = levelProgress(progress, index);
  const { fg } = useLevelColor(level);
  const { colors } = useTheme();
  const identity = useIdentity();
  useGuestBackWarning();

  const first = topicsFor(index, 'grammar')[0];
  const continueHref = (progress.lastLocation?.href ?? first?.href ?? '/learn/grammar') as Href;
  const continueTitle = progress.lastLocation?.title ?? first?.title.bn ?? '';

  return (
    <Screen>
      {/* Header: the greeting on the left, the learner on the right. */}
      <Row style={{ gap: Spacing.sm }}>
        <AppText variant="subheading" numberOfLines={1} style={{ flex: 1 }}>
          আবার স্বাগতম 👋
        </AppText>
        <Pressable
          onPress={() => router.push('/profile')}
          accessibilityRole="button"
          accessibilityLabel={`প্রোফাইল: ${identity.name}`}
          style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: Spacing.sm }}>
          <AppText variant="caption" numberOfLines={1} style={{ flexShrink: 1, fontWeight: '700', color: colors.text }}>
            {identity.name}
          </AppText>
          <Avatar id={identity.avatar} size={32} />
        </Pressable>
      </Row>

      <GuestBanner />

      <Card>
        <Row style={{ justifyContent: 'space-between' }}>
          <Row>
            <LevelBadge level={level} />
            <AppText variant="subheading">
              {levelInfo[level].bn} · {levelInfo[level].name}
            </AppText>
          </Row>
          <AppText variant="subheading" color={fg}>
            {Math.round(lp.overall * 100)}%
          </AppText>
        </Row>
        <ProgressBar value={lp.overall} color={fg} />
        <AppText variant="caption" muted>
          এই লেভেলে আপনার মোট অগ্রগতি
        </AppText>
      </Card>

      {lp.complete && <LevelComplete level={level} quizScore={lp.quizScore} ready={lp.readyToMoveUp} />}

      <Card style={{ backgroundColor: colors.primary, borderColor: colors.primary }}>
        <AppText variant="label" color={colors.primaryText}>
          {progress.lastLocation ? 'যেখানে থেমেছিলেন' : 'শুরু করুন'}
        </AppText>
        <AppText variant="heading" color={colors.primaryText}>
          {continueTitle}
        </AppText>
        <Button
          title="শেখা চালিয়ে যান"
          icon="play"
          variant="secondary"
          onPress={() => router.push(continueHref)}
        />
      </Card>

      <View style={{ gap: Spacing.md }}>
        <AppText variant="heading" style={{ marginTop: Spacing.sm }}>
          শেখার মডিউল
        </AppText>
        {MODULES.map((m) => {
          const mp = lp[m];
          return (
            <Card
              key={m}
              onPress={() => router.push({ pathname: '/learn/[module]', params: { module: m } })}
              accessibilityLabel={moduleInfo[m].bn}>
              <Row style={{ gap: Spacing.md }}>
                <Icon name={moduleInfo[m].icon} color={fg} size={26} />
                <View style={{ flex: 1, gap: 2 }}>
                  <AppText variant="subheading">{moduleInfo[m].bn}</AppText>
                  <AppText variant="caption" muted>
                    {moduleInfo[m].de} · {mp.done}/{mp.total}
                  </AppText>
                </View>
                <Icon name="chevron-forward" size={18} />
              </Row>
              <ProgressBar value={mp.total ? mp.done / mp.total : 0} color={fg} height={6} />
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}

/** Shown once every lesson in the level is done: the way up to the next level. */
function LevelComplete({ level, quizScore, ready }: { level: Level; quizScore: number; ready: boolean }) {
  const { progress, chooseLevel } = useProgress();
  const { colors } = useTheme();
  const next = nextLevel(level);
  const score = Math.round(quizScore * 100);
  const need = Math.round(LEVEL_UP_SCORE * 100);

  if (!next) {
    return (
      <Card style={{ borderColor: colors.correct }}>
        <AppText variant="heading">অভিনন্দন! 🎉</AppText>
        <AppText variant="bn">আপনি {level} লেভেলের পুরো পাঠক্রম শেষ করেছেন। মডেলে আপনার স্কোর {score}%।</AppText>
      </Card>
    );
  }
  return (
    <Card style={{ borderColor: ready ? colors.correct : colors.border }}>
      <AppText variant="heading">{level} লেভেলের সব পাঠ শেষ!</AppText>
      {ready ? (
        <>
          <AppText variant="bn">
            মডেলে আপনার স্কোর {score}%। আপনি এখন {next} লেভেলে যেতে পারেন। নতুন লেভেল শূন্য থেকে শুরু হবে।
          </AppText>
          <Button
            title={`${next} লেভেলে যান`}
            icon="arrow-up-circle-outline"
            onPress={async () => {
              if (await confirmLevelChange(progress, next)) chooseLevel(next);
            }}
          />
        </>
      ) : (
        <AppText variant="bn">
          পরের লেভেলে যেতে মডেলে কমপক্ষে {need}% স্কোর লাগবে। এখন আপনার স্কোর {score}%। মডেলের প্রশ্নগুলো আবার করে স্কোর বাড়ান।
        </AppText>
      )}
    </Card>
  );
}
