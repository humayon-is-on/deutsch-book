import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import { Translation } from '@/components/learning';
import { SpeakButton } from '@/components/speak-button';
import { AppText, Card, Icon, Row } from '@/components/ui';
import { Spacing, TouchTarget } from '@/constants/theme';
import type { VocabEntry } from '@/content';
import { useTheme } from '@/hooks/use-theme';
import { spokenWord } from '@/services/speech/audio-key';
import { useProgress } from '@/state/progress';
import { useT } from '@/i18n';

export const articleColor = { der: '#2F6FD6', die: '#C2334D', das: '#2E8B57' } as const;

export function VocabCard({ entry, large, style }: { entry: VocabEntry; large?: boolean; style?: StyleProp<ViewStyle> }) {
  const { colors } = useTheme();
  const { progress, toggleBookmark } = useProgress();
  const t = useT();
  const bookmarked = !!progress.bookmarks[entry.id];
  const spoken = spokenWord(entry);

  return (
    <Card style={[large && { paddingVertical: Spacing.xl }, style]}>
      <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <SpeakButton text={spoken} size={large ? 28 : 22} />
        <View style={{ flex: 1, gap: 2 }}>
          <AppText variant={large ? 'title' : 'heading'}>
            {entry.article ? <AppText variant={large ? 'title' : 'heading'} color={articleColor[entry.article]}>{entry.article} </AppText> : null}
            {entry.de}
          </AppText>
          {entry.plural ? (
            <AppText variant="caption" muted>
              {t('বহুবচন', 'Plural')}: {entry.plural}
            </AppText>
          ) : null}
          {entry.forms ? (
            <AppText variant="caption" muted>
              Präteritum: {entry.forms.praeteritum} · Partizip II: {entry.forms.partizip}
            </AppText>
          ) : null}
          {entry.pronunciation ? (
            <AppText variant="caption" muted>
              {t('উচ্চারণ', 'Pronunciation')}: {entry.pronunciation}
            </AppText>
          ) : null}
        </View>
        <Pressable
          onPress={() => toggleBookmark(entry.id)}
          accessibilityRole="button"
          accessibilityLabel={bookmarked ? t('বুকমার্ক সরান', 'Remove bookmark') : t('বুকমার্ক করুন', 'Bookmark')}
          style={{ minWidth: TouchTarget, minHeight: TouchTarget, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={bookmarked ? 'bookmark' : 'bookmark-outline'} color={colors.primary} size={26} />
        </Pressable>
      </Row>

      <AppText variant={large ? 'heading' : 'subheading'}>{entry.bn}</AppText>
      {entry.en && progress.settings.showEnglish ? (
        <AppText variant="caption" muted style={{ fontStyle: 'italic' }}>
          {entry.en}
        </AppText>
      ) : null}

      {entry.example ? (
        <View style={{ backgroundColor: colors.surfaceMuted, borderRadius: 8, padding: Spacing.md, marginTop: Spacing.xs }}>
          <Translation item={entry.example} compact />
        </View>
      ) : null}

    </Card>
  );
}
