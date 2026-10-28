import { Redirect, router } from 'expo-router';
import { View } from 'react-native';

import { LevelOption } from '@/components/level-option';
import { AppText, Card, Icon, Row, Screen } from '@/components/ui';
import { Radius, Spacing } from '@/constants/theme';
import { LEVELS, type Level } from '@/content';
import { useTheme } from '@/hooks/use-theme';
import { useProgress } from '@/state/progress';

const features = [
  { icon: 'trending-up-outline', text: 'শূন্য থেকে B1 পর্যন্ত, ধাপে ধাপে অনুশীলনসহ' },
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
    <Screen edges={['bottom']} contentStyle={{ paddingTop: Spacing.xs }}>
      {/* What the app offers: a plain list, so it reads as information, not as a choice. */}
      <View>
        {features.map((f) => (
          <Row key={f.icon} style={{ gap: Spacing.md, paddingVertical: Spacing.xs }}>
            <Icon name={f.icon} color={colors.textSecondary} />
            <AppText variant="bn" style={{ flex: 1 }}>
              {f.text}
            </AppText>
          </Row>
        ))}
      </View>

      <View style={{ marginTop: Spacing.md }}>
        <AppText variant="heading">আপনার লেভেল বেছে নিন</AppText>
        <AppText variant="caption" muted>
          কোথা থেকে শেখা শুরু করতে চান, তা ঠিক করুন।
        </AppText>
      </View>

      {/* The level choices sit closer together than the screen's sections. */}
      <View style={{ gap: 8 }}>
        {LEVELS.map((l) => (
          <LevelOption key={l} level={l} current={false} recommended={false} onPress={() => pick(l)} />
        ))}

        {/* The other way in, laid out like the level cards. */}
        <Card
          onPress={() => router.push('/onboarding/placement')}
          accessibilityLabel="লেভেল যাচাই পরীক্ষা দিন"
          style={{ borderColor: `${colors.textSecondary}55`, borderWidth: 1.5 }}>
          <Row style={{ gap: Spacing.md }}>
            <View style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: Radius.pill, backgroundColor: colors.surfaceMuted }}>
              <Icon name="speedometer-outline" color={colors.text} size={18} />
            </View>
            <AppText variant="subheading" style={{ flex: 1, fontSize: 19, fontWeight: '700' }}>
              লেভেল যাচাই পরীক্ষা
            </AppText>
            <Icon name="chevron-forward" size={18} />
          </Row>
          <AppText variant="bn" muted>
            নিশ্চিত নন? ১৫টি ছোট প্রশ্ন, প্রায় ৬ মিনিট। আমরা একটি লেভেল প্রস্তাব করব।
          </AppText>
        </Card>
      </View>
    </Screen>
  );
}
