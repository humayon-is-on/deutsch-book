import { View } from 'react-native';

import { AppText, Button, Card, Icon, Notice, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const steps = [
  { icon: 'cloud-upload-outline', text: 'আপনার PDF আপলোড করুন (যেমন পাঠ্যবই বা নোট)।' },
  { icon: 'scan-outline', text: 'সার্ভার PDF থেকে লেখা বের করে।' },
  { icon: 'sparkles-outline', text: 'AI শুধু ওই লেখার ভিত্তিতে MCQ প্রশ্ন তৈরি করে।' },
  { icon: 'checkmark-done-outline', text: 'অ্যাপে কুইজ দিন, স্কোর ও ব্যাখ্যা দেখুন, ভুলগুলো আবার চেষ্টা করুন।' },
];

/**
 * Premium AI PDF practice (spec phase 2). The flow runs entirely on the
 * backend so no AI provider key is ever shipped inside the app.
 */
export default function PdfPracticeScreen() {
  const { colors } = useTheme();
  return (
    <Screen>
      <Row>
        <AppText variant="title">PDF অনুশীলন</AppText>
        <View style={{ backgroundColor: colors.warningBg, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 }}>
          <AppText variant="caption" color={colors.warning} style={{ fontWeight: '700' }}>
            Premium
          </AppText>
        </View>
      </Row>
      <AppText variant="bn" muted>
        নিজের PDF থেকে AI দিয়ে তৈরি প্রশ্নে অনুশীলন করুন। A1, A2 ও B1 সব লেভেলের জন্য।
      </AppText>

      <Card>
        <AppText variant="subheading">কীভাবে কাজ করে</AppText>
        {steps.map((s, i) => (
          <Row key={i} style={{ alignItems: 'flex-start', gap: Spacing.md, paddingVertical: Spacing.xs }}>
            <Icon name={s.icon} color={colors.primary} />
            <AppText variant="bn" style={{ flex: 1 }}>
              {s.text}
            </AppText>
          </Row>
        ))}
      </Card>

      <Notice>এই ফিচারটি শীঘ্রই আসছে। প্রিমিয়াম সাবস্ক্রিপশন চালু হলে আপনি এখান থেকে PDF আপলোড করতে পারবেন।</Notice>
      <Button title="PDF বেছে নিন" icon="document-attach-outline" disabled onPress={() => {}} />
    </Screen>
  );
}
