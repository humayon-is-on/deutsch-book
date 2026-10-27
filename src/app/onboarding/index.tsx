import { Redirect, router } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

import { openSignIn } from '@/components/account';
import { AppText, Button, Card, Screen } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { backendEnabled } from '@/lib/supabase';
import { useAuth } from '@/state/auth';
import { useProgress } from '@/state/progress';

const LOGO = require('../../../assets/images/logo.png');

/** The first screen: the logo, then a way in for new learners and for those with an account. */
export default function WelcomeScreen() {
  const { progress } = useProgress();
  const { session } = useAuth();
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
          বাংলায় জার্মান শিখুন
        </AppText>
      </View>

      <Card>
        <AppText variant="subheading">Deutsch Book-এ নতুন?</AppText>
        <AppText variant="caption" muted>
          আপনার লেভেল বেছে নিয়ে আজই শেখা শুরু করুন।
        </AppText>
        <Button title="শুরু করুন" icon="arrow-forward" onPress={() => router.push('/onboarding/start')} />
      </Card>

      <Card>
        <AppText variant="subheading">আগে থেকেই অ্যাকাউন্ট আছে?</AppText>
        <AppText variant="caption" muted>
          সাইন ইন করলে আপনার আগের অগ্রগতি ফিরে পাবেন।
        </AppText>
        <Button title="সাইন ইন" icon="person-outline" variant="secondary" disabled={!backendEnabled} onPress={openSignIn} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { alignItems: 'center', gap: Spacing.xs, marginTop: Spacing.lg, marginBottom: Spacing.md },
  logo: { width: 140, height: 140, marginBottom: Spacing.sm },
});
