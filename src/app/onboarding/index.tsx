import { Redirect, router } from 'expo-router';
import { View } from 'react-native';

import { openSignIn } from '@/components/account';
import { AppText, Button, Card, Icon, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useProgress } from '@/state/progress';

const features = [
  { icon: 'language-outline', text: 'সহজ বাংলায় জার্মান ব্যাকরণের ব্যাখ্যা' },
  { icon: 'layers-outline', text: 'A1, A2 ও B1 — প্রতিটি লেভেলের আলাদা পাঠ' },
  { icon: 'checkmark-done-outline', text: 'শব্দভান্ডার, মডেল, চিঠি ও কথোপকথন' },
  { icon: 'bar-chart-outline', text: 'ফ্রি অ্যাকাউন্টে আপনার অগ্রগতি সংরক্ষিত থাকে' },
];

export default function WelcomeScreen() {
  const { colors } = useTheme();
  const { progress } = useProgress();
  // Signing in to an account that already has a level lands straight on Home.
  if (progress.onboarded) return <Redirect href="/" />;

  return (
    <Screen edges={['top', 'bottom']}>
      <Row style={{ justifyContent: 'flex-end' }}>
        <Button title="সাইন ইন / সাইন আপ" icon="person-outline" variant="secondary" onPress={openSignIn} />
      </Row>
      <View style={{ gap: Spacing.xs, marginTop: Spacing.md }}>
        <AppText variant="caption" muted>
          Willkommen bei Deutsch Book
        </AppText>
        <AppText variant="title">বাংলায় জার্মান শিখুন</AppText>
        <AppText variant="bn" muted>
          শূন্য থেকে B1 পর্যন্ত, ধাপে ধাপে। চাকরি, Ausbildung, পড়াশোনা, ভ্রমণ বা পরীক্ষার প্রস্তুতি — যে লক্ষ্যই হোক।
        </AppText>
      </View>

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

      <AppText variant="subheading">কীভাবে শুরু করতে চান?</AppText>

      <Card onPress={() => router.push('/onboarding/level')} accessibilityLabel="নিজে লেভেল বেছে নিন">
        <Row style={{ gap: Spacing.md }}>
          <Icon name="hand-right-outline" color={colors.primary} size={28} />
          <View style={{ flex: 1 }}>
            <AppText variant="subheading">নিজে লেভেল বেছে নিন</AppText>
            <AppText variant="caption" muted>
              A1, A2 বা B1 — আপনি জানেন কোথা থেকে শুরু করবেন
            </AppText>
          </View>
          <Icon name="chevron-forward" size={18} />
        </Row>
      </Card>

      <Card onPress={() => router.push('/onboarding/placement')} accessibilityLabel="লেভেল যাচাই পরীক্ষা দিন">
        <Row style={{ gap: Spacing.md }}>
          <Icon name="speedometer-outline" color={colors.primary} size={28} />
          <View style={{ flex: 1 }}>
            <AppText variant="subheading">লেভেল যাচাই পরীক্ষা দিন</AppText>
            <AppText variant="caption" muted>
              ১৫টি ছোট প্রশ্ন, প্রায় ৬ মিনিট। আমরা একটি লেভেল প্রস্তাব করব।
            </AppText>
          </View>
          <Icon name="chevron-forward" size={18} />
        </Row>
      </Card>
    </Screen>
  );
}
