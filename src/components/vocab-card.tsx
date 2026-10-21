import { Pressable, View } from 'react-native';

import { Translation } from '@/components/learning';
import { AppText, Card, Icon, Row } from '@/components/ui';
import { Spacing, TouchTarget } from '@/constants/theme';
import type { VocabEntry } from '@/content';
import { useTheme } from '@/hooks/use-theme';
import { useProgress } from '@/state/progress';

const articleColor = { der: '#2F6FD6', die: '#C2334D', das: '#2E8B57' } as const;

export function VocabCard({ entry, large }: { entry: VocabEntry; large?: boolean }) {
  const { colors } = useTheme();
  const { progress, toggleLearned, toggleBookmark } = useProgress();
  const learned = !!progress.learned[entry.id];
  const bookmarked = !!progress.bookmarks[entry.id];

  return (
    <Card style={large ? { paddingVertical: Spacing.xl } : undefined}>
      <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1, gap: 2 }}>
          <AppText variant={large ? 'title' : 'heading'}>
            {entry.article ? <AppText variant={large ? 'title' : 'heading'} color={articleColor[entry.article]}>{entry.article} </AppText> : null}
            {entry.de}
          </AppText>
          {entry.plural ? (
            <AppText variant="caption" muted>
              বহুবচন: {entry.plural}
            </AppText>
          ) : null}
          {entry.pronunciation ? (
            <AppText variant="caption" muted>
              উচ্চারণ: {entry.pronunciation}
            </AppText>
          ) : null}
        </View>
        <Pressable
          onPress={() => toggleBookmark(entry.id)}
          accessibilityRole="button"
          accessibilityLabel={bookmarked ? 'বুকমার্ক সরান' : 'বুকমার্ক করুন'}
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

      <View style={{ backgroundColor: colors.surfaceMuted, borderRadius: 8, padding: Spacing.md, marginTop: Spacing.xs }}>
        <Translation item={entry.example} compact />
      </View>

      <Pressable
        onPress={() => toggleLearned(entry.id)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: learned }}
        style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, minHeight: TouchTarget }}>
        <Icon name={learned ? 'checkmark-circle' : 'ellipse-outline'} color={learned ? colors.correct : colors.textSecondary} />
        <AppText variant="body" color={learned ? colors.correct : colors.textSecondary}>
          {learned ? 'শেখা হয়েছে' : 'শেখা হয়েছে হিসেবে চিহ্নিত করুন'}
        </AppText>
      </Pressable>
    </Card>
  );
}
