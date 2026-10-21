import { router } from 'expo-router';
import { View } from 'react-native';

import { AppText, Card, Icon, ProgressBar, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { levelInfo, MODULES, moduleInfo } from '@/content';
import { useLevelColor } from '@/hooks/use-theme';
import { levelProgress, useProgress } from '@/state/progress';

export default function LearnScreen() {
  const { progress } = useProgress();
  const level = progress.level ?? 'A1';
  const { fg, bg } = useLevelColor(level);
  const lp = levelProgress(progress, level);

  return (
    <Screen>
      <AppText variant="title">শিখুন</AppText>

      <Card style={{ backgroundColor: bg, borderColor: fg }}>
        <AppText variant="heading" color={fg}>
          {level} · {levelInfo[level].bn}
        </AppText>
        <AppText variant="bn">{levelInfo[level].description}</AppText>
        <AppText variant="caption" muted>
          লেভেল বদলাতে চাইলে প্রোফাইলে যান।
        </AppText>
      </Card>

      <View style={{ gap: Spacing.md }}>
        {MODULES.map((m) => {
          const mp = lp[m];
          return (
            <Card
              key={m}
              onPress={() => router.push({ pathname: '/learn/[module]', params: { module: m } })}
              accessibilityLabel={moduleInfo[m].bn}>
              <Row style={{ gap: Spacing.md }}>
                <Icon name={moduleInfo[m].icon} color={fg} size={26} />
                <View style={{ flex: 1, gap: 2 }}>
                  <AppText variant="subheading">{moduleInfo[m].bn}</AppText>
                  <AppText variant="caption" muted>
                    {moduleInfo[m].de} · {mp.done}/{mp.total}
                  </AppText>
                </View>
                <Icon name="chevron-forward" size={18} />
              </Row>
              <ProgressBar value={mp.total ? mp.done / mp.total : 0} color={fg} height={6} />
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}
