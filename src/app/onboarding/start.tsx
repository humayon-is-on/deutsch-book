import { Redirect, router } from 'expo-router';
import { View } from 'react-native';

import { LevelOption } from '@/components/level-option';
import { AppText, Card, Icon, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { LEVELS, type Level } from '@/content';
import { useTheme } from '@/hooks/use-theme';
import { useProgress } from '@/state/progress';

const features = [
  { icon: 'language-outline', text: 'সহজ বাংলায় জার্মান ব্যাকরণের ব্যাখ্যা' },
  { icon: 'layers-outline', text: 'প্রতিটি লেভেলের আলাদা পাঠ' },
  { icon: 'checkmark-done-outline', text: 'শব্দভান্ডার, মডেল, চিঠি ও কথোপকথন' },
];

/** Get started: what the app offers, then the level to begin with, or the level test. */
export default function GetStartedScreen() {
  const { colors } = useTheme();
  const { progress, chooseLevel } = useProgress();
  if (progress.onboarded) return <Redirect href="/" />;

  const pick = (l: Level) => {
    chooseLevel(l);
    if (router.canDismiss()) router.dismissAll();
    router.replace('/');
  };

  return (
    <Screen edges={['bottom']}>
      <AppText variant="bn" muted>
        শূন্য থেকে B1 পর্যন্ত, ধাপে ধাপে।
      </AppText>

      <Card>
        {features.map((f) => (
          <Row key={f.icon} style={{ gap: Spacing.md, paddingVertical: Spacing.xs }}>
            <Icon name={f.icon} color={colors.primary} />
            <AppText variant="bn" style={{ flex: 1 }}>
              {f.text}
            </AppText>
          </Row>
        ))}
      </Card>

      <View style={{ gap: Spacing.xs }}>
        <AppText variant="subheading">আপনার লেভেল বেছে নিন</AppText>
        <AppText variant="caption" muted>
          কোথা থেকে শেখা শুরু করতে চান, তা ঠিক করুন।
        </AppText>
      </View>

      {/* The level choices sit closer together than the screen's sections. */}
      <View style={{ gap: 8 }}>
        {LEVELS.map((l) => (
          <LevelOption key={l} level={l} current={false} recommended={false} onPress={() => pick(l)} />
        ))}

        <Card onPress={() => router.push('/onboarding/placement')} accessibilityLabel="লেভেল যাচাই পরীক্ষা দিন">
          <Row style={{ gap: Spacing.md }}>
            <Icon name="speedometer-outline" color={colors.primary} size={28} />
            <View style={{ flex: 1 }}>
              <AppText variant="subheading">নিশ্চিত নন? লেভেল যাচাই পরীক্ষা দিন</AppText>
              <AppText variant="caption" muted>
                ১৫টি ছোট প্রশ্ন, প্রায় ৬ মিনিট। আমরা একটি লেভেল প্রস্তাব করব।
              </AppText>
            </View>
            <Icon name="chevron-forward" size={18} />
          </Row>
        </Card>
      </View>
    </Screen>
  );
}
