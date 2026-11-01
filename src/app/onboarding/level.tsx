import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { LevelOption } from '@/components/level-option';
import { AppText, Card, Icon, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { LEVELS, type Level } from '@/content';
import { useTheme } from '@/hooks/use-theme';
import { confirmLevelChange } from '@/lib/level';
import { useProgress } from '@/state/progress';
import { useT } from '@/i18n';

export default function LevelPickScreen() {
  const { recommended } = useLocalSearchParams<{ recommended?: Level }>();
  const { progress, chooseLevel } = useProgress();
  const { colors } = useTheme();
  const t = useT();

  const pick = async (l: Level) => {
    if (progress.onboarded && progress.level === l) return router.back();
    if (!(await confirmLevelChange(progress, l))) return;
    chooseLevel(l);
    if (router.canDismiss()) router.dismissAll();
    router.replace('/');
  };

  return (
    <Screen edges={[]}>
      <AppText variant="bn" muted>
        {t(
          'আপনার জন্য উপযুক্ত লেভেলটি বেছে নিন। পুরো অ্যাপ শুধু এই লেভেলের পাঠ দেখাবে। পরে প্রোফাইল থেকে বদলাতে পারবেন, তবে তখন আগের লেভেলের অগ্রগতি মুছে যাবে।',
          'Choose the level that suits you. The whole app shows lessons for this level only. You can change it later in Profile, but your progress in the old level will be deleted.',
        )}
      </AppText>
      {/* From the profile: check yourself first. The test only suggests a level; nothing changes until you pick one. */}
      {progress.onboarded && (
        <Card onPress={() => router.push('/onboarding/placement')} accessibilityLabel={t('লেভেল যাচাই পরীক্ষা দিন', 'Take the level check test')}>
          <Row style={{ gap: Spacing.md }}>
            <Icon name="speedometer-outline" color={colors.primary} size={28} />
            <View style={{ flex: 1 }}>
              <AppText variant="subheading">{t('লেভেল যাচাই পরীক্ষা দিন', 'Take the level check test')}</AppText>
              <AppText variant="caption" muted>
                {t('বদলানোর আগে নিজের বর্তমান অবস্থা দেখে নিন। পরীক্ষা দিলে লেভেল বা অগ্রগতি বদলাবে না।', 'Check where you stand before changing. Taking the test does not change your level or progress.')}
              </AppText>
            </View>
            <Icon name="chevron-forward" size={18} />
          </Row>
        </Card>
      )}
      {LEVELS.map((l) => (
        <LevelOption
          key={l}
          level={l}
          current={progress.onboarded && progress.level === l}
          recommended={recommended === l}
          onPress={() => pick(l)}
        />
      ))}
    </Screen>
  );
}
