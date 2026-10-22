import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

import { DataTable, ExampleCard } from '@/components/learning';
import { Missing } from '@/components/missing';
import { LockedTopic, TopicTestCard, useTopicLocked } from '@/components/topic';
import { AppText, Card, LevelBadge, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { getGrammar } from '@/content';
import type { GrammarBlock } from '@/content/types';
import { useProgress } from '@/state/progress';

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = getGrammar(id);
  const { visit, openGrammar } = useProgress();
  const locked = useTopicLocked(lesson?.id);

  useEffect(() => {
    if (!lesson || locked) return;
    openGrammar(lesson.id);
    visit({ href: `/lesson/${lesson.id}`, title: lesson.title.bn, level: lesson.level, module: 'grammar' });
  }, [lesson?.id, locked]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!lesson) return <Missing />;
  if (locked) return <LockedTopic id={lesson.id} />;

  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: 'ব্যাকরণ' }} />
      <LevelBadge level={lesson.level} />
      <View>
        <AppText variant="title">{lesson.title.bn}</AppText>
        <AppText variant="subheading" muted>
          {lesson.title.de}
        </AppText>
      </View>

      {lesson.intro?.length ? (
        <Card>
          <Blocks blocks={lesson.intro} />
        </Card>
      ) : null}

      {lesson.sections.map((s, i) => (
        <Card key={i}>
          <AppText variant="heading">{s.heading}</AppText>
          {s.body ? <AppText variant="bn">{s.body}</AppText> : null}
          {s.table && <DataTable rows={s.table} />}
          {s.examples?.length ? (
            <View style={{ gap: Spacing.sm, marginTop: Spacing.xs }}>
              <AppText variant="label" muted>
                উদাহরণ
              </AppText>
              {s.examples.map((e, j) => (
                <ExampleCard key={j} example={e} />
              ))}
            </View>
          ) : null}
          {s.blocks && <Blocks blocks={s.blocks} />}
        </Card>
      ))}

      <TopicTestCard id={lesson.id} />
    </Screen>
  );
}

/** A lesson's text, tables, lists and examples in the order they were written. */
function Blocks({ blocks }: { blocks: GrammarBlock[] }) {
  return (
    <View style={{ gap: Spacing.sm }}>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case 'text':
            return (
              <AppText key={i} variant="bn">
                {b.text}
              </AppText>
            );
          case 'table':
            return <DataTable key={i} rows={b.rows} />;
          case 'examples':
            return (
              <View key={i} style={{ gap: Spacing.sm }}>
                {b.items.map((e, j) => (
                  <ExampleCard key={j} example={e} />
                ))}
              </View>
            );
          case 'list':
            return (
              <View key={i} style={{ gap: Spacing.xs }}>
                {b.items.map((item, j) => (
                  <Row key={j} style={{ alignItems: 'flex-start' }}>
                    <AppText variant="bn" style={{ minWidth: 20 }}>
                      {b.numbered ? `${j + 1}.` : '•'}
                    </AppText>
                    <AppText variant="bn" style={{ flex: 1 }}>
                      {item}
                    </AppText>
                  </Row>
                ))}
              </View>
            );
        }
      })}
    </View>
  );
}
