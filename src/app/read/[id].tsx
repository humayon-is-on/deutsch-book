import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, View } from 'react-native';

import { SpeakButton } from '@/components/speak-button';
import { TopicTestCard, WithTopic } from '@/components/topic';
import { articleColor } from '@/components/vocab-card';
import { AppText, Card, Icon, levelHeader, Row, Screen } from '@/components/ui';
import { Spacing, TouchTarget } from '@/constants/theme';
import { moduleInfo, type TextItem, type VocabEntry } from '@/content';
import { useLevelColor, useTheme } from '@/hooks/use-theme';
import { CONTENT_URL } from '@/services/content/remote';
import { useProgress } from '@/state/progress';

/** Viewer for emails/letters, dialogues and model texts. */
export default function ReadScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <WithTopic id={id} modules={['emails', 'dialogues', 'models']}>
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
      <Stack.Screen options={{ title: moduleInfo[item.module].bn, ...levelHeader(item.level) }} />
      {item.tag && item.module !== 'models' ? (
        <AppText variant="caption" muted>
          {item.tag}
        </AppText>
      ) : null}
      <View>
        <AppText variant="title">{item.title.bn}</AppText>
        <AppText variant="subheading" muted>
          {item.title.de}
        </AppText>
      </View>

      {item.situation ? <SituationCard situation={item.situation} /> : null}

      {item.module === 'models' ? <ModelCard item={item} /> : item.module === 'emails' ? <LetterCard item={item} /> : <DialogueCard item={item} />}

      {item.words?.length ? <KeyWords words={item.words} /> : null}

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
        <SpeakButton text={item.lines.map((l) => l.de).join(' ')} />
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

/**
 * A model text: its picture, the German as one paragraph, and the Bangla
 * translation under it, with a button that switches the translation to English.
 */
function ModelCard({ item }: { item: TextItem }) {
  const { colors } = useTheme();
  const { fg } = useLevelColor(item.level);
  const [english, setEnglish] = useState(false);
  const hasEnglish = item.lines.every((l) => l.en);
  return (
    <Card style={{ gap: Spacing.md }}>
      {item.image ? (
        <Image
          source={{ uri: CONTENT_URL + item.image }}
          accessibilityIgnoresInvertColors
          style={{
            width: '100%',
            maxWidth: item.imageAspect ? 560 : 320,
            aspectRatio: item.imageAspect ?? 142 / 115,
            alignSelf: 'center',
            borderRadius: 12,
            backgroundColor: colors.surfaceMuted,
          }}
        />
      ) : null}
      {item.tag ? (
        <AppText variant="heading" color={fg}>
          {item.tag}
        </AppText>
      ) : null}
      <AppText variant="body" style={{ fontSize: 17, lineHeight: 26 }}>
        {item.lines.map((l) => l.de).join(' ')}
      </AppText>
      <View style={{ gap: Spacing.sm, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: Spacing.md }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <AppText variant="label" muted>
            {english ? 'English translation' : 'বাংলা অনুবাদ'}
          </AppText>
          {hasEnglish && <LanguageSwitch english={english} onToggle={() => setEnglish(!english)} />}
        </Row>
        <AppText variant={english ? 'body' : 'bn'}>{item.lines.map((l) => (english ? l.en : l.bn)).join(' ')}</AppText>
      </View>
    </Card>
  );
}

/** What the text is about, in Bangla, with a button that switches it to English. */
function SituationCard({ situation }: { situation: NonNullable<TextItem['situation']> }) {
  const [english, setEnglish] = useState(false);
  return (
    <Card style={{ gap: Spacing.sm }}>
      <Row style={{ justifyContent: 'space-between' }}>
        <AppText variant="label" muted>
          {english ? 'Situation' : 'পরিস্থিতি'}
        </AppText>
        {situation.en ? <LanguageSwitch english={english} onToggle={() => setEnglish(!english)} /> : null}
      </Row>
      <AppText variant={english ? 'body' : 'bn'}>{english ? situation.en : situation.bn}</AppText>
    </Card>
  );
}

const spoken = (w: VocabEntry) => (w.article ? `${w.article} ${w.de}` : w.de);

/** A text's key words with their Bangla meaning, each with a bookmark that adds it to the saved words. */
function KeyWords({ words }: { words: VocabEntry[] }) {
  const { colors } = useTheme();
  const { progress, toggleBookmark } = useProgress();
  return (
    <Card style={{ gap: 0 }}>
      <AppText variant="heading">গুরুত্বপূর্ণ শব্দ</AppText>
      {words.map((w, i) => {
        const saved = !!progress.bookmarks[w.id];
        return (
          <Row key={w.id} style={{ gap: Spacing.sm, borderTopWidth: i ? 1 : 0, borderTopColor: colors.border }}>
            <SpeakButton text={spoken(w)} />
            <View style={{ flex: 1, paddingVertical: Spacing.xs }}>
              <AppText variant="body" style={{ fontWeight: '700' }}>
                {w.article ? <AppText variant="body" style={{ fontWeight: '700' }} color={articleColor[w.article]}>{w.article} </AppText> : null}
                {w.de}
              </AppText>
              <AppText variant="bn">{w.bn}</AppText>
            </View>
            <Pressable
              onPress={() => toggleBookmark(w.id)}
              accessibilityRole="button"
              accessibilityLabel={saved ? `${w.de}: বুকমার্ক সরান` : `${w.de}: বুকমার্ক করুন`}
              style={{ minWidth: TouchTarget, minHeight: TouchTarget, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={saved ? 'bookmark' : 'bookmark-outline'} color={colors.primary} size={24} />
            </Pressable>
          </Row>
        );
      })}
    </Card>
  );
}

/** The small pill that switches a translation between Bangla and English. */
function LanguageSwitch({ english, onToggle }: { english: boolean; onToggle: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="button"
      accessibilityLabel={english ? 'বাংলা অনুবাদ দেখুন' : 'Show English translation'}
      hitSlop={8}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: Spacing.sm,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: colors.surfaceMuted,
      }}>
      <Icon name="swap-horizontal" size={16} color={colors.primary} />
      <AppText variant="caption" color={colors.primary} style={{ fontWeight: '700' }}>
        {english ? 'বাংলা' : 'English'}
      </AppText>
    </Pressable>
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
          <Row style={{ alignItems: 'flex-start', gap: 4 }}>
            <SpeakButton text={line.de} size={18} style={{ minHeight: 28, minWidth: 28 }} />
            <AppText variant="de" style={{ flexShrink: 1 }}>
              {line.de}
            </AppText>
          </Row>
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
