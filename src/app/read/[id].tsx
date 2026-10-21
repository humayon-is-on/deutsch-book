import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Missing } from '@/components/missing';
import { AppText, Button, Card, LevelBadge, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { getText, moduleInfo } from '@/content';
import { useLevelColor, useTheme } from '@/hooks/use-theme';
import { useProgress } from '@/state/progress';

/** Viewer for Q&A, emails/letters and dialogues. */
export default function ReadScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = getText(id);
  const { progress, visit, markTextRead } = useProgress();
  const { colors } = useTheme();
  const { fg, bg } = useLevelColor(item?.level ?? 'A1');
  const [showBn, setShowBn] = useState(true);

  useEffect(() => {
    if (!item) return;
    visit({ href: `/read/${item.id}`, title: item.title.bn, level: item.level, module: item.module });
  }, [item?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!item) return <Missing />;
  const isLetter = item.module === 'emails';
  const speakers = [...new Set(item.lines.map((l) => l.speaker).filter(Boolean))];
  const read = !!progress.textsRead[item.id];

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

      <Button
        title={showBn ? 'বাংলা অনুবাদ লুকান' : 'বাংলা অনুবাদ দেখুন'}
        icon={showBn ? 'eye-off-outline' : 'eye-outline'}
        variant="secondary"
        onPress={() => setShowBn(!showBn)}
      />

      <Card style={isLetter ? { gap: Spacing.md } : undefined}>
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

      <Button
        title={read ? 'পড়া হয়েছে ✓' : 'পড়া শেষ হিসেবে চিহ্নিত করুন'}
        disabled={read}
        onPress={() => markTextRead(item.id)}
      />
    </Screen>
  );
}

function speakerLabel(s: string) {
  if (s === 'F') return 'প্রশ্ন (Frage)';
  if (s === 'A') return 'উত্তর (Antwort)';
  return s;
}
