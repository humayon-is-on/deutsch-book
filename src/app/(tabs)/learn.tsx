import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { LevelSwitcher } from '@/components/learning';
import { AppText, Button, Card, Icon, ProgressBar, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { levelInfo, MODULES, moduleInfo, type Level } from '@/content';
import { useLevelColor } from '@/hooks/use-theme';
import { levelProgress, useProgress } from '@/state/progress';

export default function LearnScreen() {
  const { progress, chooseLevel } = useProgress();
  const [level, setLevel] = useState<Level>(progress.level ?? 'A1');
  const { fg, bg } = useLevelColor(level);
  const lp = levelProgress(progress, level);

  return (
    <Screen>
      <AppText variant="title">শিখুন</AppText>
      <LevelSwitcher value={level} onChange={setLevel} />

      <Card style={{ backgroundColor: bg, borderColor: fg }}>
        <AppText variant="heading" color={fg}>
          {level} · {levelInfo[level].bn}
        </AppText>
        <AppText variant="bn">{levelInfo[level].description}</AppText>
        {progress.level !== level && (
          <Button title={`${level} কে আমার লেভেল করুন`} variant="secondary" onPress={() => chooseLevel(level)} />
        )}
      </Card>

      <View style={{ gap: Spacing.md }}>
        {MODULES.map((m) => {
          const mp = lp[m];
          return (
            <Card
              key={m}
              onPress={() => router.push({ pathname: '/learn/[level]/[module]', params: { level, module: m } })}
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
