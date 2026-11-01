import { router } from 'expo-router';
import { Switch, View } from 'react-native';

import { AppText, Button, Card, LevelBadge, ListItem, Notice, Row, Screen, Section } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useLang, useT, type Lang } from '@/i18n';
import { levelInfo } from '@/content';
import { AccountCard } from '@/components/account-card';
import { useTheme } from '@/hooks/use-theme';
import { guestWarning, openSignIn, openSignUp } from '@/components/account';
import { backendEnabled } from '@/lib/supabase';
import { confirm } from '@/lib/confirm';
import { useAuth } from '@/state/auth';
import { useLevelIndex } from '@/services/content/store';
import { learnedWordCount, useProgress } from '@/state/progress';
import { openPage } from '@/lib/site';

// Premium is not offered yet; flip to true after the Play Store launch.
const SHOW_PREMIUM_BUTTON = false;
// Subscription section (Free plan card) hidden until Premium launches; flip to true to show it.
const SHOW_SUBSCRIPTION_SECTION = false;

export default function ProfileScreen() {
  return <Profile />;
}

/**
 * The profile. `standalone` is the copy opened from Get started before a
 * level is picked: it sits in the stack with a back arrow and no tab bar.
 */
export function Profile({ standalone = false }: { standalone?: boolean }) {
  const { session, signOut } = useAuth();
  const { progress, setShowEnglish, setLanguage, resetAll } = useProgress();
  const { colors } = useTheme();
  const t = useT();
  const level = progress.level ?? 'A1';
  const index = useLevelIndex(level);

  return (
    <Screen edges={standalone ? ['bottom'] : ['top']}>
      {!standalone && <AppText variant="title">{t('প্রোফাইল', 'Profile')}</AppText>}

      <Section title={t('অ্যাকাউন্ট', 'Account')}>
        {session ? (
          <AccountCard />
        ) : (
          <Card>
            <AppText variant="bn">{guestWarning(t)}</AppText>
            <Button title={t('অ্যাকাউন্ট খুলুন', 'Create account')} icon="person-add-outline" disabled={!backendEnabled} onPress={openSignUp} />
            <Button title={t('সাইন ইন', 'Sign in')} variant="secondary" disabled={!backendEnabled} onPress={openSignIn} />
            {!backendEnabled && <Notice>{t('সার্ভার এখনো যুক্ত হয়নি, তাই আপাতত অ্যাকাউন্ট খোলা যাবে না।', 'The server is not connected yet, so accounts cannot be created for now.')}</Notice>}
          </Card>
        )}
      </Section>

      <Section title={t('আমার লেভেল', 'My level')}>
        {progress.onboarded ? (
          <Card>
            <Row>
              <LevelBadge level={level} />
              <AppText variant="subheading">{t(levelInfo[level].bn, levelInfo[level].name)}</AppText>
            </Row>
            <AppText variant="caption" muted>
              {t(
                'পুরো অ্যাপ শুধু এই লেভেলের পাঠ দেখায়। লেভেল বদলালে বর্তমান লেভেলের অগ্রগতি মুছে যাবে।',
                'The whole app shows lessons for this level only. Changing the level deletes your progress in the current level.',
              )}
            </AppText>
            <Button title={t('লেভেল পরিবর্তন করুন', 'Change level')} variant="secondary" onPress={() => router.push('/onboarding/level')} />
          </Card>
        ) : (
          <Card style={{ borderColor: colors.primary, borderWidth: 2 }}>
            <AppText variant="subheading">{t('এখনো কোনো লেভেল বেছে নেওয়া হয়নি', 'No level chosen yet')}</AppText>
            <AppText variant="caption" muted>
              {t('শেখা শুরু করতে একটি লেভেল বেছে নিন। তারপর অ্যাপের সব অংশ খুলে যাবে।', 'Choose a level to start learning. Then every part of the app opens.')}
            </AppText>
            <Button title={t('নিজে লেভেল বেছে নিন', 'Choose a level yourself')} icon="hand-right-outline" onPress={() => router.push('/onboarding/level')} />
            <Button
              title={t('লেভেল যাচাই পরীক্ষা দিন', 'Take the level check test')}
              icon="speedometer-outline"
              variant="secondary"
              onPress={() => router.push('/onboarding/placement')}
            />
          </Card>
        )}
      </Section>

      {progress.onboarded && (
        <ListItem
          icon="checkmark-circle-outline"
          title={t('মোট শেখা শব্দ', 'Total words learned')}
          right={<AppText variant="heading">{learnedWordCount(progress, index)}</AppText>}
        />
      )}

      <Section title={t('সেটিংস', 'Settings')}>
        <Card>
          <Row style={{ justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <AppText variant="subheading">{t('ইংরেজি অনুবাদ দেখান', 'Show English translation')}</AppText>
              <AppText variant="caption" muted>
                {t('ব্যাকরণ টপিকের উদাহরণ বাক্যগুলোর ইংরেজি অনুবাদ দেখাবে', 'Shows the English translation of example sentences in grammar topics')}
              </AppText>
            </View>
            <Switch value={progress.settings.showEnglish} onValueChange={setShowEnglish} accessibilityLabel={t('ইংরেজি অনুবাদ দেখান', 'Show English translation')} />
          </Row>
        </Card>
        <Card>
          <Row style={{ justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <AppText variant="subheading">{t('অ্যাপের ভাষা', 'App language')}</AppText>
              <AppText variant="caption" muted>
                {t('অ্যাপ চালানোর ভাষা', 'App’s operating language')}
              </AppText>
            </View>
            <LanguageToggle onChange={setLanguage} />
          </Row>
        </Card>
      </Section>

      {SHOW_SUBSCRIPTION_SECTION && (
        <Section title={t('সাবস্ক্রিপশন', 'Subscription')}>
          <Card>
            <AppText variant="subheading">{t('ফ্রি প্ল্যান', 'Free plan')}</AppText>
            <AppText variant="bn" muted>
              {t('সব পাঠ, শব্দভান্ডার ও মডেল ফ্রি। প্রিমিয়ামে থাকবে AI দিয়ে PDF অনুশীলন।', 'All lessons, vocabulary and models are free. Premium will add AI practice from PDFs.')}
            </AppText>
            {/* Premium button hidden until after the Play Store launch (code kept). */}
            {SHOW_PREMIUM_BUTTON && <Button title={t('প্রিমিয়াম (শীঘ্রই আসছে)', 'Premium (coming soon)')} variant="secondary" disabled onPress={() => {}} />}
          </Card>
        </Section>
      )}

      <Section title={t('তথ্য', 'Info')}>
        <ListItem icon="shield-checkmark-outline" title={t('গোপনীয়তা নীতি', 'Privacy policy')} onPress={() => openPage('privacy.html')} />
        <ListItem icon="trash-bin-outline" title={t('অ্যাকাউন্ট মোছার নিয়ম', 'How to delete your account')} onPress={() => openPage('delete-account.html')} />
      </Section>

      <Section title={t('অ্যাকাউন্ট ও ডেটা', 'Account and data')}>
        <View style={{ gap: Spacing.sm }}>
          {session && (
            <Button
              title={t('সাইন আউট', 'Sign out')}
              icon="log-out-outline"
              variant="secondary"
              onPress={async () => {
                if (await confirm(t('সাইন আউট করবেন?', 'Sign out?'), t('আপনার অগ্রগতি অ্যাকাউন্টে সংরক্ষিত থাকবে। আবার সাইন ইন করলে ফিরে পাবেন।', 'Your progress stays saved in your account. Sign in again to get it back.'), t('সাইন আউট', 'Sign out'))) {
                  await signOut();
                  router.replace('/onboarding');
                }
              }}
            />
          )}
          {!session && (
            <Button
              title={t('শুরু থেকে আবার শুরু করুন', 'Start over from the beginning')}
              variant="danger"
              onPress={async () => {
                if (await confirm(t('অগ্রগতি মুছবেন?', 'Delete progress?'), t('আপনার সব অগ্রগতি মুছে যাবে। এটা ফেরানো যাবে না।', 'All your progress will be deleted. This cannot be undone.'), t('মুছুন', 'Delete'))) {
                  resetAll();
                  router.replace('/onboarding');
                }
              }}
            />
          )}
        </View>
      </Section>

      <AppText variant="caption" muted style={{ textAlign: 'center', color: colors.textSecondary }}>
        Deutsch Book · {t('লেভেল যাচাই পরীক্ষা শুধু নির্দেশনা, কোনো আনুষ্ঠানিক সনদ নয়।', 'The level check test is only a guide, not an official certificate.')}
      </AppText>
    </Screen>
  );
}

/** A switch for the app's interface language: off is Bangla, on is English. */
function LanguageToggle({ onChange }: { onChange: (lang: Lang) => void }) {
  const lang = useLang();
  const { colors } = useTheme();
  const english = lang === 'en';
  const label = (text: string, active: boolean) => (
    <AppText variant="caption" color={active ? colors.primary : colors.textSecondary} style={{ fontWeight: active ? '700' : '400' }}>
      {text}
    </AppText>
  );
  return (
    <Row style={{ gap: 6 }}>
      {label('বাংলা', !english)}
      <Switch value={english} onValueChange={(v) => onChange(v ? 'en' : 'bn')} accessibilityLabel="App language: English" />
      {label('English', english)}
    </Row>
  );
}
