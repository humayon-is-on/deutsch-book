import { router, Stack, type Href } from 'expo-router';
import type { ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';

import { Missing } from '@/components/missing';
import { AppText, Button, Card, Icon, Notice, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { getTopic, nextTopic, previousTopic, TOPIC_PASS } from '@/content/topics';
import type { ModuleKey, TopicFile } from '@/content/types';
import { useTheme } from '@/hooks/use-theme';
import { getLevelIndex, useLevelIndex } from '@/services/content/store';
import { useTopicFile } from '@/services/content/use-topic';
import { topicDone, topicUnlocked, useProgress } from '@/state/progress';

const PASS_PERCENT = Math.round(TOPIC_PASS * 100);

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
 * The buttons under a topic test's result: the next topic (locked until the
 * test is passed), a retest when it wasn't, and the way back to the topic list.
 */
export function TestResultActions({ id, passed, onRetest }: { id: string; passed: boolean; onRetest: () => void }) {
  const next = nextTopic(useLevelIndex(), id);
  return (
    <>
      {next && (
        <Button
          title={`পরের টপিক: ${next.title.bn}`}
          icon={passed ? 'arrow-forward' : 'lock-closed-outline'}
          disabled={!passed}
          onPress={() => openFromTopics(next.id)}
        />
      )}
      {!passed && <Button title="আবার টেস্ট দিন" icon="refresh" variant="secondary" onPress={onRetest} />}
      <Button title="টপিক তালিকায় ফিরে যান" icon="list-outline" variant="secondary" onPress={() => backToTopics(id)} />
    </>
  );
}

/** Shown instead of a topic that isn't open yet. */
export function LockedTopic({ id }: { id: string }) {
  const prev = previousTopic(useLevelIndex(), id);
  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: 'বন্ধ টপিক' }} />
      <Card style={{ alignItems: 'center', paddingVertical: Spacing.xl, gap: Spacing.sm }}>
        <Icon name="lock-closed" size={40} />
        <AppText variant="heading">এই টপিক এখনো বন্ধ</AppText>
        <AppText variant="bn" muted style={{ textAlign: 'center' }}>
          আগের টপিক „{prev?.title.bn}“ শেষ করলে এটি খুলবে। টপিক শেষ হয় তার শেষের ছোট টেস্টে পাস করলে।
        </AppText>
      </Card>
      {prev && <Button title="আগের টপিকে যান" icon="arrow-back" onPress={() => openTopic(prev.id)} />}
      <Button title="ফিরে যান" variant="secondary" onPress={() => router.back()} />
    </Screen>
  );
}

/** The end of a topic: the test that finishes it, or the way on once it's passed. */
export function TopicTestCard({ id }: { id: string }) {
  const { progress } = useProgress();
  const { colors } = useTheme();
  const index = useLevelIndex();
  const done = topicDone(progress, index, id);
  const result = progress.topicTests[id];
  const next = nextTopic(index, id);
  const start = () => router.push({ pathname: '/topic-test/[id]', params: { id } });

  if (done) {
    return (
      <Card style={{ borderColor: colors.correct }}>
        <Row style={{ gap: Spacing.sm }}>
          <Icon name="checkmark-circle" color={colors.correct} />
          <AppText variant="subheading" style={{ flex: 1 }}>
            টপিক সম্পন্ন
          </AppText>
          {result && (
            <AppText variant="caption" muted>
              সেরা স্কোর {result.bestScore}/{result.total}
            </AppText>
          )}
        </Row>
        {next ? (
          <Button title={`পরের টপিক: ${next.title.bn}`} icon="arrow-forward" onPress={() => openFromTopics(next.id)} />
        ) : (
          <AppText variant="bn" muted>
            এই অংশের সব টপিক শেষ।
          </AppText>
        )}
        <Button title="আবার টেস্ট দিন" variant="ghost" onPress={start} />
      </Card>
    );
  }
  return (
    <Card>
      <AppText variant="subheading">টপিক টেস্ট</AppText>
      <AppText variant="bn" muted>
        টপিকটি শেষ করতে ছোট একটি টেস্টে কমপক্ষে {PASS_PERCENT}% সঠিক উত্তর দিন। পাস করলে পরের টপিক খুলে যাবে।
      </AppText>
      {result && <Notice>শেষ চেষ্টায় সেরা স্কোর {result.bestScore}/{result.total}। আবার পড়ে চেষ্টা করুন।</Notice>}
      <Button title="টপিক টেস্ট দিন" icon="flag-outline" onPress={start} />
    </Card>
  );
}

/** Shown while something is downloading. */
export function Loading({ title }: { title?: string }) {
  const { colors } = useTheme();
  return (
    <Screen edges={[]}>
      {title && <Stack.Screen options={{ title }} />}
      <Card style={{ alignItems: 'center', paddingVertical: Spacing.xl, gap: Spacing.sm }}>
        <ActivityIndicator color={colors.primary} />
        <AppText variant="bn" muted>
          লোড হচ্ছে…
        </AppText>
      </Card>
    </Screen>
  );
}

/** Shown when something couldn't be downloaded. */
export function Offline({ onRetry }: { onRetry: () => void }) {
  return (
    <Screen edges={[]}>
      <Card style={{ alignItems: 'center', paddingVertical: Spacing.xl, gap: Spacing.sm }}>
        <Icon name="cloud-offline-outline" size={40} />
        <AppText variant="heading">ইন্টারনেট সংযোগ নেই</AppText>
        <AppText variant="bn" muted style={{ textAlign: 'center' }}>
          এই টপিকটি এখনো ফোনে নামানো হয়নি। ইন্টারনেটে যুক্ত হয়ে আবার চেষ্টা করুন।
        </AppText>
      </Card>
      <Button title="আবার চেষ্টা করুন" icon="refresh" onPress={onRetry} />
      <Button title="ফিরে যান" variant="secondary" onPress={() => router.back()} />
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
