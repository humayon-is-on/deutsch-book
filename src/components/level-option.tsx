import { View } from 'react-native';

import { AppText, Card, Icon, LevelBadge, Row } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { levelInfo, type Level } from '@/content';
import { useLevelColor } from '@/hooks/use-theme';

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
  return (
    <Card
      onPress={onPress}
      accessibilityLabel={`${level} ${levelInfo[level].bn}`}
      style={recommended || current ? { borderColor: fg, borderWidth: 2, backgroundColor: bg } : undefined}>
      <Row style={{ gap: Spacing.md }}>
        <LevelBadge level={level} />
        <View style={{ flex: 1 }}>
          <AppText variant="subheading">
            {levelInfo[level].bn} · {levelInfo[level].name}
          </AppText>
          {recommended && (
            <AppText variant="caption" color={fg} style={{ fontWeight: '700' }}>
              পরীক্ষার ভিত্তিতে প্রস্তাবিত
            </AppText>
          )}
          {current && !recommended && (
            <AppText variant="caption" color={fg} style={{ fontWeight: '700' }}>
              বর্তমান লেভেল
            </AppText>
          )}
        </View>
        <Icon name="chevron-forward" size={18} />
      </Row>
      <AppText variant="bn" muted>
        {levelInfo[level].description}
      </AppText>
    </Card>
  );
}
