import { View } from 'react-native';

import { AppText, Card, Icon, LevelBadge, Row } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { levelInfo, type Level } from '@/content';
import { useLevelColor } from '@/hooks/use-theme';
import { useT } from '@/i18n';

/** One level to pick: its badge, name and description, marked when current or suggested by the level test. */
export function LevelOption({
  level,
  current,
  recommended,
  onPress,
}: {
  level: Level;
  current: boolean;
  recommended: boolean;
  onPress: () => void;
}) {
  const { fg, bg } = useLevelColor(level);
  const t = useT();
  // Outlined in the badge's colour, softened; the chosen or suggested level gets it in full.
  return (
    <Card
      onPress={onPress}
      accessibilityLabel={`${level} ${t(levelInfo[level].bn, levelInfo[level].name)}`}
      style={recommended || current ? { borderColor: fg, borderWidth: 2, backgroundColor: bg } : { borderColor: `${fg}66`, borderWidth: 1.5 }}>
      <Row style={{ gap: Spacing.md }}>
        <LevelBadge level={level} />
        <View style={{ flex: 1 }}>
          <AppText variant="subheading" style={{ fontSize: 19, fontWeight: '700' }}>
            {t(`${levelInfo[level].bn} · ${levelInfo[level].name}`, levelInfo[level].name)}
          </AppText>
          {recommended && (
            <AppText variant="caption" color={fg} style={{ fontWeight: '700' }}>
              {t('পরীক্ষার ভিত্তিতে প্রস্তাবিত', 'Suggested by your test')}
            </AppText>
          )}
          {current && !recommended && (
            <AppText variant="caption" color={fg} style={{ fontWeight: '700' }}>
              {t('বর্তমান লেভেল', 'Current level')}
            </AppText>
          )}
        </View>
        <Icon name="chevron-forward" size={18} />
      </Row>
      <AppText variant="bn" muted>
        {t(levelInfo[level].description, levelInfo[level].descriptionEn)}
      </AppText>
    </Card>
  );
}
