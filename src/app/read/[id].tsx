import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { Missing } from '@/components/missing';
import { LockedTopic, TopicTestCard, useTopicLocked } from '@/components/topic';
import { AppText, Button, Card, Icon, LevelBadge, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { getText, moduleInfo, type TextItem } from '@/content';
import { useLevelColor, useTheme } from '@/hooks/use-theme';
import { useProgress } from '@/state/progress';

/** Viewer for Q&A, emails/letters and dialogues. */
export default function ReadScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = getText(id);
  const { visit } = useProgress();
  const locked = useTopicLocked(item?.id);
  const { colors } = useTheme();
  const { fg, bg } = useLevelColor(item?.level ?? 'A1');
  const [showBn, setShowBn] = useState(true);

  useEffect(() => {
    if (!item || locked) return;
    visit({ href: `/read/${item.id}`, title: item.title.bn, level: item.level, module: item.module });
  }, [item?.id, locked]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!item) return <Missing />;
  if (locked) return <LockedTopic id={item.id} />;
  const isLetter = item.module === 'emails';
  const speakers = [...new Set(item.lines.map((l) => l.speaker).filter(Boolean))];

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

      {isLetter ? (
        <LetterCard item={item} />
      ) : (
        <>
          <Button
            title={showBn ? 'বাংলা অনুবাদ লুকান' : 'বাংলা অনুবাদ দেখুন'}
            icon={showBn ? 'eye-off-outline' : 'eye-outline'}
            variant="secondary"
            onPress={() => setShowBn(!showBn)}
          />

          <Card>
            {item.lines.map((line, i) => {
              const isSecond = line.speaker && speakers.indexOf(line.speaker) === 1;
              return (
                <View
                  key={i}
                  style={
                    line.speaker
                      ? {
                          alignSelf: isSecond ? 'flex-end' : 'flex-start',
                          maxWidth: '88%',
                          backgroundColor: isSecond ? bg : colors.surfaceMuted,
                          borderRadius: 12,
                          padding: Spacing.md,
                          marginBottom: Spacing.sm,
                        }
                      : undefined
                  }>
                  {line.speaker ? (
                    <AppText variant="caption" color={isSecond ? fg : colors.textSecondary} style={{ fontWeight: '700' }}>
                      {speakerLabel(line.speaker)}
                    </AppText>
                  ) : null}
                  <AppText variant={line.speaker ? 'de' : 'body'} style={!line.speaker ? { fontSize: 17 } : undefined}>
                    {line.de}
                  </AppText>
                  {showBn && (
                    <AppText variant="bn" muted>
                      {line.bn}
                    </AppText>
                  )}
                </View>
              );
            })}
          </Card>
        </>
      )}

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
        <Pressable
          onPress={() => setOpen(!open)}
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

function speakerLabel(s: string) {
  if (s === 'F') return 'প্রশ্ন (Frage)';
  if (s === 'A') return 'উত্তর (Antwort)';
  return s;
}
