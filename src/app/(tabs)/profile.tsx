import { router } from 'expo-router';
import { Switch, View } from 'react-native';

import { AppText, Button, Card, LevelBadge, ListItem, Notice, Row, Screen, Section } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { levelInfo } from '@/content';
import { AccountCard } from '@/components/account-card';
import { useTheme } from '@/hooks/use-theme';
import { GUEST_WARNING, openSignIn, openSignUp } from '@/components/account';
import { backendEnabled } from '@/lib/supabase';
import { confirm } from '@/lib/confirm';
import { useAuth } from '@/state/auth';
import { useLevelIndex } from '@/services/content/store';
import { learnedWordCount, useProgress } from '@/state/progress';
import { openPage } from '@/lib/site';

export default function ProfileScreen() {
  return <Profile />;
}

/**
 * The profile. `standalone` is the copy opened from Get started before a
 * level is picked: it sits in the stack with a back arrow and no tab bar.
 */
export function Profile({ standalone = false }: { standalone?: boolean }) {
  const { session, signOut, deleteAccount } = useAuth();
  const { progress, setShowEnglish, resetAll } = useProgress();
  const { colors } = useTheme();
  const level = progress.level ?? 'A1';
  const index = useLevelIndex(level);

  return (
    <Screen edges={standalone ? ['bottom'] : ['top']}>
      {!standalone && <AppText variant="title">প্রোফাইল</AppText>}

      <Section title="অ্যাকাউন্ট">
        {session ? (
          <AccountCard />
        ) : (
          <Card>
            <AppText variant="bn">{GUEST_WARNING}</AppText>
            <Button title="অ্যাকাউন্ট খুলুন" icon="person-add-outline" disabled={!backendEnabled} onPress={openSignUp} />
            <Button title="সাইন ইন" variant="secondary" disabled={!backendEnabled} onPress={openSignIn} />
            {!backendEnabled && <Notice>সার্ভার এখনো যুক্ত হয়নি, তাই আপাতত অ্যাকাউন্ট খোলা যাবে না।</Notice>}
          </Card>
        )}
      </Section>

      <Section title="আমার লেভেল">
        {progress.onboarded ? (
          <Card>
            <Row>
              <LevelBadge level={level} />
              <AppText variant="subheading">{levelInfo[level].bn}</AppText>
            </Row>
            <AppText variant="caption" muted>
              পুরো অ্যাপ শুধু এই লেভেলের পাঠ দেখায়। লেভেল বদলালে বর্তমান লেভেলের অগ্রগতি মুছে যাবে।
            </AppText>
            <Button title="লেভেল পরিবর্তন করুন" variant="secondary" onPress={() => router.push('/onboarding/level')} />
          </Card>
        ) : (
          <Card style={{ borderColor: colors.primary, borderWidth: 2 }}>
            <AppText variant="subheading">এখনো কোনো লেভেল বেছে নেওয়া হয়নি</AppText>
            <AppText variant="caption" muted>
              শেখা শুরু করতে একটি লেভেল বেছে নিন। তারপর অ্যাপের সব অংশ খুলে যাবে।
            </AppText>
            <Button title="নিজে লেভেল বেছে নিন" icon="hand-right-outline" onPress={() => router.push('/onboarding/level')} />
            <Button
              title="লেভেল যাচাই পরীক্ষা দিন"
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
          title="মোট শেখা শব্দ"
          right={<AppText variant="heading">{learnedWordCount(progress, index)}</AppText>}
        />
      )}

      <Section title="সেটিংস">
        <Card>
          <Row style={{ justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <AppText variant="subheading">ইংরেজি অনুবাদ দেখান</AppText>
              <AppText variant="caption" muted>
                যেখানে সহায়ক, সেখানে ইংরেজি অর্থও দেখাবে
              </AppText>
            </View>
            <Switch value={progress.settings.showEnglish} onValueChange={setShowEnglish} accessibilityLabel="ইংরেজি অনুবাদ দেখান" />
          </Row>
        </Card>
      </Section>

      <Section title="সাবস্ক্রিপশন">
        <Card>
          <AppText variant="subheading">ফ্রি প্ল্যান</AppText>
          <AppText variant="bn" muted>
            সব পাঠ, শব্দভান্ডার ও মডেল ফ্রি। প্রিমিয়ামে থাকবে AI দিয়ে PDF অনুশীলন।
          </AppText>
          <Button title="প্রিমিয়াম (শীঘ্রই আসছে)" variant="secondary" disabled onPress={() => {}} />
        </Card>
      </Section>

      <Section title="অ্যাকাউন্ট ও ডেটা">
        <View style={{ gap: Spacing.sm }}>
          {session && (
            <Button
              title="সাইন আউট"
              icon="log-out-outline"
              variant="secondary"
              onPress={async () => {
                if (await confirm('সাইন আউট করবেন?', 'আপনার অগ্রগতি অ্যাকাউন্টে সংরক্ষিত থাকবে। আবার সাইন ইন করলে ফিরে পাবেন।', 'সাইন আউট')) {
                  await signOut();
                  router.replace('/onboarding');
                }
              }}
            />
          )}
          {!session && (
            <Button
              title="শুরু থেকে আবার শুরু করুন"
              variant="danger"
              onPress={async () => {
                if (await confirm('অগ্রগতি মুছবেন?', 'আপনার সব অগ্রগতি মুছে যাবে। এটা ফেরানো যাবে না।', 'মুছুন')) {
                  resetAll();
                  router.replace('/onboarding');
                }
              }}
            />
          )}
          {session && (
            <Button
              title="অ্যাকাউন্ট স্থায়ীভাবে মুছুন"
              icon="trash-outline"
              variant="danger"
              onPress={async () => {
                if (await confirm('অ্যাকাউন্ট মুছবেন?', 'আপনার অ্যাকাউন্ট ও সার্ভারে রাখা সব অগ্রগতি স্থায়ীভাবে মুছে যাবে। এটা ফেরানো যাবে না।', 'মুছুন')) {
                  const err = await deleteAccount();
                  if (err) return void (await confirm('মুছতে পারা যায়নি', err, 'ঠিক আছে'));
                  router.replace('/onboarding');
                }
              }}
            />
          )}
        </View>
      </Section>

      <Section title="তথ্য">
        <ListItem icon="shield-checkmark-outline" title="গোপনীয়তা নীতি" onPress={() => openPage('privacy.html')} />
        <ListItem icon="trash-bin-outline" title="অ্যাকাউন্ট মোছার নিয়ম" onPress={() => openPage('delete-account.html')} />
      </Section>

      <AppText variant="caption" muted style={{ textAlign: 'center', color: colors.textSecondary }}>
        Deutsch Book · লেভেল যাচাই পরীক্ষা শুধু নির্দেশনা, কোনো আনুষ্ঠানিক সনদ নয়।
      </AppText>
    </Screen>
  );
}
