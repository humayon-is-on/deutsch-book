import { router, Stack, useLocalSearchParams, type Href } from 'expo-router';
import { useRef } from 'react';
import { ScrollView, View } from 'react-native';

import { AppText, Icon, levelHeader, ListItem, Notice, Screen } from '@/components/ui';
import { LEVELS, moduleInfo, MODULES, type ModuleKey } from '@/content';
import { topicsFor, type Topic } from '@/content/topics';
import { useLevelColor, useTheme } from '@/hooks/use-theme';
import { useLevelIndex } from '@/services/content/store';
import { moduleUnlockSeen, topicDone, topicUnlocked, useProgress } from '@/state/progress';

export default function ModuleScreen() {
  const params = useLocalSearchParams<{ module: string }>();
  const module = (MODULES.includes(params.module as ModuleKey) ? params.module : 'grammar') as ModuleKey;
  const { progress } = useProgress();
  // The whole app works on the learner's one current level.
  const level = progress.level ?? 'A1';
  const { fg } = useLevelColor(level);
  const { colors } = useTheme();
  const index = useLevelIndex(level);
  const topics = topicsFor(index, module);
  // Grammar builds on the level before: A2 grammar expects the A1 topics done.
  const earlier = module === 'grammar' ? LEVELS[LEVELS.indexOf(level) - 1] : undefined;
  // Parts of a split topic share its number: 3.1, 3.2.
  const topicNumbers = topics.reduce<{ n: number; out: string[] }>(
    (acc, t) => {
      const part = t.summary.part;
      const n = part && part > 1 ? acc.n : acc.n + 1;
      return { n, out: [...acc.out, part ? `${n}.${part}` : `${n}.`] };
    },
    { n: 0, out: [] },
  ).out;

  // On entering, the list scrolls once to the last open topic, centred on the screen.
  const lastOpen = topics.reduce((last, t, i) => (topicUnlocked(progress, index, t.id) ? i : last), -1);
  const scroll = useRef<ScrollView>(null);
  const place = useRef({ y: -1, viewport: 0, done: false });
  const scrollToCurrent = () => {
    const p = place.current;
    if (p.done || p.y < 0 || p.viewport === 0) return;
    p.done = true;
    scroll.current?.scrollTo({ y: Math.max(0, p.y - p.viewport / 2), animated: true });
  };

  /** Extra line under a topic's title, saying where the learner is in it. */
  const detail = (t: Topic): string => {
    switch (module) {
      case 'vocabulary': {
        return `${t.summary.wordIds?.length ?? 0}টি শব্দ`;
      }
      default:
        return t.subtitle ?? '';
    }
  };

  return (
    <Screen
      edges={[]}
      scrollRef={scroll}
      onViewport={(height) => {
        place.current.viewport = height;
        scrollToCurrent();
      }}>
      <Stack.Screen options={{ title: moduleInfo[module].bn, ...levelHeader(level) }} />
      <AppText variant="caption" muted>
        {moduleInfo[module].de}
        {/* The rule is shown until the learner has opened this module's second topic. */}
        {moduleUnlockSeen(progress, index, module) ? '' : ' · প্রতিটি টপিকের টেস্টে পাস করলে পরেরটি খুলবে।'}
      </AppText>
      {earlier && <Notice>এই টপিকগুলো শুরু করার আগে {earlier} লেভেলের গ্রামার টপিকগুলো শেষ করা জরুরি।</Notice>}
      {topics.map((t, i) => {
        const number = topicNumbers[i];
        const open = topicUnlocked(progress, index, t.id);
        const done = topicDone(progress, index, t.id);
        const right = done ? (
          <Icon name="checkmark-circle" color={colors.correct} />
        ) : open ? undefined : (
          <Icon name="lock-closed" color={colors.textSecondary} />
        );
        const item = (
          <ListItem
            icon={open ? moduleInfo[module].icon : 'lock-closed-outline'}
            iconColor={open ? fg : colors.textSecondary}
            title={`${number} ${t.title.bn}`}
            subtitle={
              open
                ? // The German title is left out when the title already shows it.
                  [t.title.bn.includes(t.title.de) ? '' : t.title.de, detail(t)].filter(Boolean).join(' · ')
                : 'আগের টপিক শেষ করলে খুলবে'
            }
            right={right}
            onPress={open ? () => router.push(t.href as Href) : undefined}
          />
        );
        if (i !== lastOpen || i === 0) return <View key={t.id}>{item}</View>;
        return (
          <View
            key={t.id}
            onLayout={(e) => {
              const { y, height } = e.nativeEvent.layout;
              place.current.y = y + height / 2;
              scrollToCurrent();
            }}>
            {item}
          </View>
        );
      })}
      {topics.length === 0 && <Notice>এই অংশে শীঘ্রই নতুন বিষয় যোগ করা হবে।</Notice>}
    </Screen>
  );
}
