import { Redirect, router } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

import { openSignIn } from '@/components/account';
import { AppText, Button, Card, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { backendEnabled } from '@/lib/supabase';
import { useAuth } from '@/state/auth';
import { useProgress } from '@/state/progress';
import { useT } from '@/i18n';

const LOGO = require('../../../assets/images/logo.png');

/** The first screen: the logo, then a way in for new learners and for those with an account. */
export default function WelcomeScreen() {
  const { progress } = useProgress();
  const { session } = useAuth();
  const t = useT();
  // Signing in to an account that already has a level lands straight on Learn;
  // one without a level goes on to pick it.
  if (progress.onboarded) return <Redirect href="/" />;
  if (session) return <Redirect href="/onboarding/start" />;

  return (
    <Screen edges={['top', 'bottom']}>
      <View style={styles.top}>
        <Image source={LOGO} style={styles.logo} accessibilityLabel="Deutsch Book" />
        <AppText variant="caption" muted>
          Willkommen bei Deutsch Book
        </AppText>
        <AppText variant="title" style={{ textAlign: 'center' }}>
          {t('বাংলায় জার্মান শিখুন', 'Learn German in Bangla')}
        </AppText>
      </View>

      {/* The two ways in fill the rest of the screen, as one block split in two. */}
      <View style={styles.cards}>
        <Card style={[styles.card, styles.upper]}>
          <View style={styles.text}>
            <AppText variant="subheading">{t('Deutsch Book-এ নতুন?', 'New to Deutsch Book?')}</AppText>
            <AppText variant="caption" muted>
              {t('আপনার লেভেল বেছে নিয়ে আজই শেখা শুরু করুন।', 'Choose your level and start learning today.')}
            </AppText>
          </View>
          <Button title={t('শুরু করুন', 'Get started')} icon="arrow-forward" large onPress={() => router.push('/onboarding/start')} />
        </Card>

        <Card style={[styles.card, styles.lower]}>
          <View style={styles.text}>
            <AppText variant="subheading">{t('আগে থেকেই অ্যাকাউন্ট আছে?', 'Already have an account?')}</AppText>
            <AppText variant="caption" muted>
              {t('সাইন ইন করলে আপনার আগের অগ্রগতি ফিরে পাবেন।', 'Sign in to get your earlier progress back.')}
            </AppText>
          </View>
          <Button title={t('সাইন ইন', 'Sign in')} icon="person-outline" variant="secondary" large disabled={!backendEnabled} onPress={openSignIn} />
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { alignItems: 'center', gap: Spacing.xs, marginTop: Spacing.lg },
  logo: { width: 104, height: 104, marginBottom: Spacing.sm },
  cards: { flex: 1, gap: 8 },
  // A soft shadow, and more room between the words and the button.
  card: {
    flex: 1,
    borderWidth: 0,
    justifyContent: 'center',
    gap: Spacing.xl,
    paddingVertical: Spacing.xl,
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
  },
  text: { gap: Spacing.sm },
  upper: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
  lower: { borderTopLeftRadius: 0, borderTopRightRadius: 0 },
});
