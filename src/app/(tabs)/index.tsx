import { router, type Href } from 'expo-router';
import { Pressable, View } from 'react-native';

import { GuestBanner, useGuestBackWarning } from '@/components/account';
import { Avatar } from '@/components/avatar';
import { askForInternet, OfflineNotice, useNeedsInternet, useOfflineLock } from '@/components/offline';
import { AppText, Button, Card, Icon, LevelBadge, ProgressBar, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { levelInfo, MODULES, moduleInfo, type Level } from '@/content';
import { getTopic, topicsFor } from '@/content/topics';
import { useLevelColor, useTheme } from '@/hooks/use-theme';
import { confirmLevelChange } from '@/lib/level';
import { useLevelIndex } from '@/services/content/store';
import { useIdentity } from '@/state/identity';
import { levelProgress, nextLevel, useProgress } from '@/state/progress';
import { useT } from '@/i18n';

/**
 * Learn: the app's first tab. The learner's level and progress, the way back
 * into the last lesson, then the five modules.
 */
export default function LearnScreen() {
  const { progress, isGuest } = useProgress();
  const level = progress.level ?? 'A1';
  const index = useLevelIndex(level);
  const lp = levelProgress(progress, index);
  const { fg } = useLevelColor(level);
  const { colors } = useTheme();
  const identity = useIdentity();
  const t = useT();
  const offline = useOfflineLock();
  useGuestBackWarning();

  const first = topicsFor(index, 'grammar')[0];
  // The last topic opened, unless its test is passed: then the next unfinished topic, same module first.
  const last = progress.lastLocation;
  const lastTopic = last ? getTopic(index, last.href.split('/').pop() ?? '') : undefined;
  const passed = (id: string) => !!progress.topicTests[id]?.passed;
  const upNext =
    lastTopic && passed(lastTopic.id)
      ? [lastTopic.module, ...MODULES.filter((m) => m !== lastTopic.module)]
          .flatMap((m) => topicsFor(index, m))
          .find((topic) => !passed(topic.id))
      : undefined;
  const continueHref = (upNext?.href ?? last?.href ?? first?.href ?? '/learn/grammar') as Href;
  // Offline, the Continue button asks for internet when its topic isn't saved for offline use.
  const continueId = String(continueHref).split('/').pop() ?? '';
  const continueLocked = !!getTopic(index, continueId) && offline.locked(continueId);
  const continueTitle = upNext?.title.bn ?? last?.title ?? first?.title.bn ?? '';
  const continueLabel = upNext
    ? t('পরের টপিক', 'Next topic')
    : last
      ? t('যেখানে থেমেছিলেন', 'Where you stopped')
      : t('শুরু করুন যেখানে থেমেছিলেন', 'Start where you left off');

  return (
    <Screen>
      {/* Header: the greeting on the left, the learner on the right. */}
      <Row style={{ gap: Spacing.sm }}>
        <AppText variant="subheading" numberOfLines={1} style={{ flex: 1 }}>
          {isGuest ? t('স্বাগতম 👋', 'Welcome 👋') : t('আবার স্বাগতম 👋', 'Welcome back 👋')}
        </AppText>
        <Pressable
          onPress={() => router.push('/profile')}
          accessibilityRole="button"
          accessibilityLabel={`${t('প্রোফাইল', 'Profile')}: ${identity.name}`}
          style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: Spacing.sm }}>
          <AppText variant="caption" numberOfLines={1} style={{ flexShrink: 1, fontWeight: '700', color: colors.text }}>
            {identity.name}
          </AppText>
          {/* Guests have no avatar yet, just the account icon. */}
          {isGuest ? <Icon name="person-circle-outline" size={32} color={colors.textSecondary} /> : <Avatar id={identity.avatar} size={32} />}
        </Pressable>
      </Row>

      <GuestBanner />

      <OfflineNotice>
        {t(
          'অফলাইন মোড: ইন্টারনেট ছাড়া প্রতিটি মডিউলের পরের ২টি টপিক পড়া যাবে। বাকি টপিকের জন্য ইন্টারনেট লাগবে।',
          'Offline mode: without internet you can study the next 2 topics of each module. Other topics need internet.',
        )}
      </OfflineNotice>

      <Card>
        <Row style={{ justifyContent: 'space-between' }}>
          <Row>
            <LevelBadge level={level} />
            <AppText variant="subheading">
              {t(`${levelInfo[level].bn} · ${levelInfo[level].name}`, levelInfo[level].name)}
            </AppText>
          </Row>
          <AppText variant="subheading" color={fg}>
            {Math.round(lp.overall * 100)}%
          </AppText>
        </Row>
        <ProgressBar value={lp.overall} color={fg} />
        <AppText variant="caption" muted>
          {t('এই লেভেলে আপনার মোট অগ্রগতি', 'Your total progress in this level')}
        </AppText>
      </Card>

      {lp.complete && <LevelComplete level={level} />}

      <Card style={{ backgroundColor: colors.primary, borderColor: colors.primary }}>
        <AppText variant="label" color={colors.primaryText}>
          {continueLabel}
        </AppText>
        <AppText variant="heading" color={colors.primaryText}>
          {continueTitle}
        </AppText>
        <Button
          title={t('শেখা চালিয়ে যান', 'Continue learning')}
          icon="play"
          variant="secondary"
          onPress={() => (continueLocked ? askForInternet() : router.push(continueHref))}
        />
      </Card>

      <View style={{ gap: Spacing.md }}>
        <AppText variant="heading" style={{ marginTop: Spacing.sm }}>
          {t('শেখার মডিউল', 'Learning modules')}
        </AppText>
        {/* A module the level doesn't have (e.g. no everyday phrases) isn't shown. */}
        {MODULES.filter((m) => !index || lp[m].total > 0).map((m) => {
          const mp = lp[m];
          return (
            <Card
              key={m}
              onPress={() => router.push({ pathname: '/learn/[module]', params: { module: m } })}
              accessibilityLabel={t(moduleInfo[m].bn, moduleInfo[m].en)}>
              <Row style={{ gap: Spacing.md }}>
                <Icon name={moduleInfo[m].icon} color={fg} size={26} />
                <View style={{ flex: 1, gap: 2 }}>
                  <AppText variant="subheading">{t(moduleInfo[m].bn, moduleInfo[m].en)}</AppText>
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

/** Shown once every topic in the level is finished: the way up to the next level. */
function LevelComplete({ level }: { level: Level }) {
  const { progress, chooseLevel } = useProgress();
  const { colors } = useTheme();
  const next = nextLevel(level);
  const t = useT();
  const needsInternet = useNeedsInternet();

  if (!next) {
    return (
      <Card style={{ borderColor: colors.correct }}>
        <AppText variant="heading">{t('অভিনন্দন! 🎉', 'Congratulations! 🎉')}</AppText>
        <AppText variant="bn">{t(`আপনি ${level} লেভেলের পুরো পাঠক্রম শেষ করেছেন।`, `You have finished the whole ${level} course.`)}</AppText>
      </Card>
    );
  }
  return (
    <Card style={{ borderColor: colors.correct }}>
      <AppText variant="heading">{t(`${level} লেভেলের সব পাঠ শেষ!`, `All ${level} lessons done!`)}</AppText>
      <AppText variant="bn">
        {t(`আপনি এখন ${next} লেভেলে যেতে পারেন।`, `You can now move to level ${next}.`)}
      </AppText>
      <Button
        title={t(`${next} লেভেলে যান`, `Go to level ${next}`)}
        icon="arrow-up-circle-outline"
        onPress={needsInternet(async () => {
          if (await confirmLevelChange(progress, next)) chooseLevel(next);
        })}
      />
    </Card>
  );
}
