import { View } from 'react-native';

import { AppText, Button, Card, Icon, Notice, Row, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useT } from '@/i18n';

const steps = [
  { icon: 'cloud-upload-outline', text: 'আপনার PDF আপলোড করুন (যেমন পাঠ্যবই বা নোট)।', en: 'Upload your PDF (for example a textbook or notes).' },
  { icon: 'scan-outline', text: 'সার্ভার PDF থেকে লেখা বের করে।', en: 'The server takes the text out of the PDF.' },
  { icon: 'sparkles-outline', text: 'AI শুধু ওই লেখার ভিত্তিতে MCQ প্রশ্ন তৈরি করে।', en: 'AI makes multiple-choice questions from that text only.' },
  { icon: 'checkmark-done-outline', text: 'অ্যাপে কুইজ দিন, স্কোর ও ব্যাখ্যা দেখুন, ভুলগুলো আবার চেষ্টা করুন।', en: 'Take the quiz in the app, see your score and explanations, and retry your mistakes.' },
];

/**
 * Premium AI PDF practice (spec phase 2). The flow runs entirely on the
 * backend so no AI provider key is ever shipped inside the app.
 */
export default function PdfPracticeScreen() {
  const { colors } = useTheme();
  const t = useT();
  return (
    <Screen>
      <Row>
        <AppText variant="title">{t('PDF অনুশীলন', 'PDF practice')}</AppText>
        <View style={{ backgroundColor: colors.warningBg, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 }}>
          <AppText variant="caption" color={colors.warning} style={{ fontWeight: '700' }}>
            Premium
          </AppText>
        </View>
      </Row>
      <AppText variant="bn" muted>
        {t('নিজের PDF থেকে AI দিয়ে তৈরি প্রশ্নে অনুশীলন করুন। A1, A2 ও B1 সব লেভেলের জন্য।', 'Practise with questions made by AI from your own PDF. For all levels: A1, A2 and B1.')}
      </AppText>

      <Card>
        <AppText variant="subheading">{t('কীভাবে কাজ করে', 'How it works')}</AppText>
        {steps.map((s, i) => (
          <Row key={i} style={{ alignItems: 'flex-start', gap: Spacing.md, paddingVertical: Spacing.xs }}>
            <Icon name={s.icon} color={colors.primary} />
            <AppText variant="bn" style={{ flex: 1 }}>
              {t(s.text, s.en)}
            </AppText>
          </Row>
        ))}
      </Card>

      <Notice>
        {t(
          'এই ফিচারটি শীঘ্রই আসছে। প্রিমিয়াম সাবস্ক্রিপশন চালু হলে আপনি এখান থেকে PDF আপলোড করতে পারবেন।',
          'This feature is coming soon. Once Premium starts, you can upload PDFs here.',
        )}
      </Notice>
      <Button title={t('PDF বেছে নিন', 'Choose PDF')} icon="document-attach-outline" disabled onPress={() => {}} />
    </Screen>
  );
}
