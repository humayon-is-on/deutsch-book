import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { TopicTestCard, WithTopic } from '@/components/topic';
import { AppText, Card, Icon, LevelBadge, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { moduleInfo, type TextItem } from '@/content';
import { useLevelColor, useTheme } from '@/hooks/use-theme';
import { useProgress } from '@/state/progress';

/** Viewer for emails/letters and dialogues. */
export default function ReadScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <WithTopic id={id} modules={['emails', 'dialogues']}>
      {(file) => <Reader item={file.item} />}
    </WithTopic>
  );
}

function Reader({ item }: { item: TextItem }) {
  const { visit } = useProgress();
  const { fg } = useLevelColor(item.level);

  useEffect(() => {
    visit({ href: `/read/${item.id}`, title: item.title.bn, level: item.level, module: item.module });
  }, [item.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Screen edges={[]}>
      <Stack.Screen options={{ title: moduleInfo[item.module].bn }} />
      <Row>
        <LevelBadge level={item.level} />
        {item.tag ? (
          <AppText variant="caption" muted>
            {item.tag}
          </AppText>
        ) : null}
      </Row>
      <View>
        <AppText variant="title">{item.title.bn}</AppText>
        <AppText variant="subheading" muted>
          {item.title.de}
        </AppText>
      </View>

      {item.module === 'emails' ? <LetterCard item={item} /> : <DialogueCard item={item} />}

      {item.notes?.length ? (
        <Card>
          <AppText variant="heading">গুরুত্বপূর্ণ শব্দ ও গঠন</AppText>
          {item.notes.map((n, i) => (
            <View key={i} style={{ gap: 2, paddingVertical: Spacing.xs }}>
              <AppText variant="body" style={{ fontWeight: '700' }} color={fg}>
                {n.term}
              </AppText>
              <AppText variant="bn">{n.bn}</AppText>
            </View>
          ))}
        </Card>
      ) : null}

      <TopicTestCard id={item.id} />
    </Screen>
  );
}

/**
 * A letter or email as one piece: the German text, with a small button in the
 * top corner that opens the whole Bangla translation underneath it.
 */
function LetterCard({ item }: { item: TextItem }) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [first, ...rest] = item.lines;
  return (
    <Card style={{ gap: Spacing.md }}>
      {/* The greeting shares its row with the translation button. */}
      <Row style={{ alignItems: 'flex-start', gap: Spacing.sm }}>
        <AppText variant="body" style={{ fontSize: 17, flex: 1 }}>
          {first.de}
        </AppText>
        <BnToggle open={open} onToggle={() => setOpen(!open)} />
      </Row>
      {rest.map((line, i) => (
        <AppText key={i} variant="body" style={{ fontSize: 17 }}>
          {line.de}
        </AppText>
      ))}
      {open && (
        <View style={{ gap: Spacing.md, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: Spacing.md }}>
          <AppText variant="label" muted>
            বাংলা অনুবাদ
          </AppText>
          {item.lines.map((line, i) => (
            <AppText key={i} variant="bn">
              {line.bn}
            </AppText>
          ))}
        </View>
      )}
    </Card>
  );
}

/** The small button in a text's top corner that shows or hides its full Bangla translation. */
function BnToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="button"
      accessibilityState={{ expanded: open }}
      accessibilityLabel={open ? 'বাংলা অনুবাদ লুকান' : 'বাংলা অনুবাদ দেখুন'}
      hitSlop={8}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: Spacing.sm,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: open ? colors.primary : colors.surfaceMuted,
      }}>
      <Icon name="language-outline" size={16} color={open ? colors.primaryText : colors.primary} />
      <AppText variant="caption" color={open ? colors.primaryText : colors.primary} style={{ fontWeight: '700' }}>
        {open ? 'অনুবাদ লুকান' : 'বাংলা'}
      </AppText>
    </Pressable>
  );
}

/**
 * A dialogue as chat bubbles in German, with the same corner button as
 * letters to open the whole Bangla translation underneath.
 */
function DialogueCard({ item }: { item: TextItem }) {
  const { colors } = useTheme();
  const { fg, bg } = useLevelColor(item.level);
  const [open, setOpen] = useState(false);
  const speakers = [...new Set(item.lines.map((l) => l.speaker))];
  const second = (s?: string) => speakers.indexOf(s) === 1;
  return (
    <Card style={{ gap: Spacing.sm }}>
      <Row style={{ justifyContent: 'space-between' }}>
        <AppText variant="label" muted>
          কথোপকথন
        </AppText>
        <BnToggle open={open} onToggle={() => setOpen(!open)} />
      </Row>
      {item.lines.map((line, i) => (
        <View
          key={i}
          style={{
            alignSelf: second(line.speaker) ? 'flex-end' : 'flex-start',
            maxWidth: '88%',
            backgroundColor: second(line.speaker) ? bg : colors.surfaceMuted,
            borderRadius: 12,
            padding: Spacing.md,
          }}>
          <AppText variant="caption" color={second(line.speaker) ? fg : colors.textSecondary} style={{ fontWeight: '700' }}>
            {line.speaker}
          </AppText>
          <AppText variant="de">{line.de}</AppText>
        </View>
      ))}
      {open && (
        <View style={{ gap: Spacing.sm, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: Spacing.md }}>
          <AppText variant="label" muted>
            বাংলা অনুবাদ
          </AppText>
          {item.lines.map((line, i) => (
            <AppText key={i} variant="bn">
              <AppText variant="bn" style={{ fontWeight: '700' }}>
                {line.speaker}:{' '}
              </AppText>
              {line.bn}
            </AppText>
          ))}
        </View>
      )}
    </Card>
  );
}
