import { router, Stack, type Href } from 'expo-router';
import { useEffect, useState, type ReactNode } from 'react';
import { ActivityIndicator, Animated, Platform, View } from 'react-native';

import { Missing } from '@/components/missing';
import { AppText, Button, Card, Icon, Notice, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { getTopic, nextTopic, previousTopic } from '@/content/topics';
import type { ModuleKey, TopicFile } from '@/content/types';
import { useTheme } from '@/hooks/use-theme';
import { getLevelIndex, useLevelIndex } from '@/services/content/store';
import { playVictory } from '@/services/sound/victory';
import { useTopicFile } from '@/services/content/use-topic';
import { moduleUnlockSeen, topicDone, topicUnlocked, useProgress } from '@/state/progress';
import { useT } from '@/i18n';

export function useTopicLocked(id: string | undefined) {
  const { progress } = useProgress();
  const index = useLevelIndex(); // the lock depends on the topic order in the table of contents
  return !!id && !topicUnlocked(progress, index, id);
}

/** Opens a topic in place of the current screen, so Back returns to the module list. */
export function openTopic(id: string) {
  const t = getTopic(getLevelIndex(), id);
  if (t) router.replace(t.href as Href);
}

/** Back to the list of topics in this topic's module, closing the screens opened on top of it. */
export function backToTopics(id: string) {
  const t = getTopic(getLevelIndex(), id);
  if (t) router.dismissTo({ pathname: '/learn/[module]', params: { module: t.module } });
}

/** Opens a topic from its module's list, so Back from it shows the list. */
export function openFromTopics(id: string) {
  backToTopics(id);
  const t = getTopic(getLevelIndex(), id);
  if (t) router.push(t.href as Href);
}

/**
 * The buttons under a topic test's result: passed, the next topic and the
 * topic list; not passed, a retest and the topic list.
 */
export function TestResultActions({ id, passed, onRetest }: { id: string; passed: boolean; onRetest: () => void }) {
  const next = nextTopic(useLevelIndex(), id);
  const t = useT();
  return (
    <>
      {/* Not passed: retry first and no next topic, since it stays locked. */}
      {!passed && <Button title={t('আবার টেস্ট দিন', 'Retake test')} icon="refresh" onPress={onRetest} />}
      {passed && next && (
        <Button title={`${t('পরের টপিক', 'Next topic')}: ${next.title.bn}`} singleLine icon="arrow-forward" onPress={() => openFromTopics(next.id)} />
      )}
      <Button title={t('টপিক তালিকায় ফিরে যান', 'Back to topic list')} icon="list-outline" variant="secondary" onPress={() => backToTopics(id)} />
    </>
  );
}

/**
 * The score card at the top of a test result. A passing score gets a shiny
 * gold outline and a gold cup; otherwise the plain card with a retry icon.
 */
const TROPHY = require('../../assets/images/trophy.png');
const SPARKLE = require('../../assets/images/sparkle.png');
/** The logo-style stars around the trophy; half twinkle while the others fade. */
const SPARKLES = [
  { left: 4, top: 4, size: 30, flip: false },
  { right: 8, top: -2, size: 22, flip: true },
  { left: 44, top: -8, size: 15, flip: true },
  { left: 0, bottom: 14, size: 20, flip: true },
  { right: 0, bottom: 22, size: 28, flip: false },
  { right: 40, bottom: -2, size: 14, flip: false },
];

/** `perfect` (every answer right) plays the victory chime once, as the result opens. */
export function ResultCard({ passed, perfect = false, children }: { passed: boolean; perfect?: boolean; children: ReactNode }) {
  const { colors } = useTheme();
  const [shine] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (perfect) playVictory();
  }, [perfect]);

  useEffect(() => {
    if (!passed) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shine, { toValue: 1, duration: 900, useNativeDriver: Platform.OS !== 'web' }),
        Animated.timing(shine, { toValue: 0, duration: 900, useNativeDriver: Platform.OS !== 'web' }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [passed, shine]);

  if (!passed) {
    return (
      <Card style={{ alignItems: 'center', paddingVertical: Spacing.xl }}>
        <Icon name="refresh" size={44} color={colors.primary} />
        {children}
      </Card>
    );
  }
  return (
    <Card
      style={{
        alignItems: 'center',
        paddingVertical: Spacing.xl,
        borderWidth: 3,
        borderColor: colors.gold,
        backgroundColor: colors.goldBg,
        shadowColor: colors.gold,
        shadowOpacity: 0.6,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 0 },
        elevation: 8,
      }}>
      <View style={{ width: 180, height: 128, alignItems: 'center', justifyContent: 'center' }}>
        {SPARKLES.map(({ size, flip, ...place }, i) => (
          <Animated.Image
            key={i}
            source={SPARKLE}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              ...place,
              opacity: shine.interpolate({ inputRange: [0, 1], outputRange: flip ? [1, 0.7] : [0.7, 1] }),
              transform: [{ scale: shine.interpolate({ inputRange: [0, 1], outputRange: flip ? [1.1, 0.8] : [0.8, 1.1] }) }],
            }}
          />
        ))}
        <Animated.Image
          source={TROPHY}
          style={{
            width: 112,
            height: 112,
            transform: [{ scale: shine.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] }) }],
          }}
        />
      </View>
      {children}
    </Card>
  );
}

/** Shown instead of a topic that isn't open yet. */
export function LockedTopic({ id }: { id: string }) {
  const prev = previousTopic(useLevelIndex(), id);
  const t = useT();
  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: t('বন্ধ টপিক', 'Locked topic') }} />
      <Card style={{ alignItems: 'center', paddingVertical: Spacing.xl, gap: Spacing.sm }}>
        <Icon name="lock-closed" size={40} />
        <AppText variant="heading">{t('এই টপিক এখনো বন্ধ', 'This topic is still locked')}</AppText>
        <AppText variant="bn" muted style={{ textAlign: 'center' }}>
          {t(
            `আগের টপিক „${prev?.title.bn ?? ''}“ শেষ করলে এটি খুলবে। টপিক শেষ হয় তার শেষের ছোট টেস্টে পাস করলে।`,
            `It opens when you finish the previous topic „${prev?.title.bn ?? ''}“. A topic is finished when you pass the short test at its end.`,
          )}
        </AppText>
      </Card>
      {prev && <Button title={t('আগের টপিকে যান', 'Go to previous topic')} icon="arrow-back" onPress={() => openTopic(prev.id)} />}
      <Button title={t('ফিরে যান', 'Go back')} variant="secondary" onPress={() => router.back()} />
    </Screen>
  );
}

/** The end of a topic: the test that finishes it, or the way on once it's passed. */
export function TopicTestCard({ id }: { id: string }) {
  const { progress } = useProgress();
  const { colors } = useTheme();
  const t = useT();
  const index = useLevelIndex();
  const done = topicDone(progress, index, id);
  const result = progress.topicTests[id];
  const next = nextTopic(index, id);
  const topic = getTopic(index, id);
  const start = () => router.push({ pathname: '/topic-test/[id]', params: { id } });

  if (done) {
    return (
      <Card style={{ borderColor: colors.correct }}>
        <Row style={{ gap: Spacing.sm }}>
          <Icon name="checkmark-circle" color={colors.correct} />
          <AppText variant="subheading" style={{ flex: 1 }}>
            {t('টপিক সম্পন্ন', 'Topic complete')}
          </AppText>
          {result && (
            <AppText variant="caption" muted>
              {t('সেরা স্কোর', 'Best score')} {result.bestScore}/{result.total}
            </AppText>
          )}
        </Row>
        {next ? (
          <Button title={`${t('পরের টপিক', 'Next topic')}: ${next.title.bn}`} singleLine icon="arrow-forward" onPress={() => openFromTopics(next.id)} />
        ) : (
          <AppText variant="bn" muted>
            {t('এই অংশের সব টপিক শেষ।', 'All topics in this part are done.')}
          </AppText>
        )}
        <Button title={t('আবার টেস্ট দিন', 'Retake test')} variant="ghost" onPress={start} />
      </Card>
    );
  }
  return (
    <Card>
      <AppText variant="subheading">{t('টপিক টেস্ট', 'Topic test')}</AppText>
      {/* Once this module's second topic is open, the learner knows the rule. */}
      {!(topic && moduleUnlockSeen(progress, index, topic.module)) && (
        <AppText variant="bn" muted>
          {t('পাস করলে পরের টপিক খুলবে।', 'Pass it to open the next topic.')}
        </AppText>
      )}
      {result && (
        <Notice>
          {t(
            `শেষ চেষ্টায় সেরা স্কোর ${result.bestScore}/${result.total}। আবার পড়ে চেষ্টা করুন।`,
            `Best score so far ${result.bestScore}/${result.total}. Read again and try.`,
          )}
        </Notice>
      )}
      <Button title={t('টপিক টেস্ট দিন', 'Take topic test')} icon="flag-outline" onPress={start} />
    </Card>
  );
}

/** Shown while something is downloading. */
export function Loading({ title }: { title?: string }) {
  const { colors } = useTheme();
  const t = useT();
  return (
    <Screen edges={[]}>
      {title && <Stack.Screen options={{ title }} />}
      <Card style={{ alignItems: 'center', paddingVertical: Spacing.xl, gap: Spacing.sm }}>
        <ActivityIndicator color={colors.primary} />
        <AppText variant="bn" muted>
          {t('লোড হচ্ছে…', 'Loading…')}
        </AppText>
      </Card>
    </Screen>
  );
}

/** Shown when something couldn't be downloaded. */
export function Offline({ onRetry }: { onRetry: () => void }) {
  const t = useT();
  return (
    <Screen edges={[]}>
      <Card style={{ alignItems: 'center', paddingVertical: Spacing.xl, gap: Spacing.sm }}>
        <Icon name="cloud-offline-outline" size={40} />
        <AppText variant="heading">{t('ইন্টারনেট সংযোগ নেই', 'No internet connection')}</AppText>
        <AppText variant="bn" muted style={{ textAlign: 'center' }}>
          {t('এই টপিকটি এখনো ফোনে নামানো হয়নি। ইন্টারনেটে যুক্ত হয়ে আবার চেষ্টা করুন।', 'This topic is not downloaded to your phone yet. Connect to the internet and try again.')}
        </AppText>
      </Card>
      <Button title={t('আবার চেষ্টা করুন', 'Try again')} icon="refresh" onPress={onRetry} />
      <Button title={t('ফিরে যান', 'Go back')} variant="secondary" onPress={() => router.back()} />
    </Screen>
  );
}

type FileOf<M extends ModuleKey> = Extract<TopicFile, { module: M }>;

/**
 * A topic screen's frame: the lock screen while the topic isn't open yet,
 * otherwise its content once loaded from the device or downloaded.
 */
export function WithTopic<M extends ModuleKey>({
  id,
  modules,
  children,
}: {
  id: string;
  modules: M[];
  children: (file: FileOf<M>) => ReactNode;
}) {
  const locked = useTopicLocked(id);
  const load = useTopicFile(locked ? undefined : id);
  if (locked) return <LockedTopic id={id} />;
  switch (load.status) {
    case 'loading':
      return <Loading />;
    case 'offline':
      return <Offline onRetry={load.retry} />;
    case 'missing':
      return <Missing />;
  }
  if (!modules.includes(load.file.module as M)) return <Missing />;
  return children(load.file as FileOf<M>);
}
