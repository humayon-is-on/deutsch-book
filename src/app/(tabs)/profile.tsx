import { router, type Href } from 'expo-router';
import { Switch, View } from 'react-native';

import { AppText, Button, Card, LevelBadge, ListItem, Notice, Row, Screen, Section } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { levelInfo, moduleInfo } from '@/content';
import { useTheme } from '@/hooks/use-theme';
import { GUEST_WARNING, openSignIn, openSignUp } from '@/components/account';
import { backendEnabled } from '@/lib/supabase';
import { confirm } from '@/lib/confirm';
import { useAuth } from '@/state/auth';
import { useProgress } from '@/state/progress';

export default function ProfileScreen() {
  const { session, signOut, deleteAccount } = useAuth();
  const { progress, setShowEnglish, resetAll } = useProgress();
  const { colors } = useTheme();
  const level = progress.level ?? 'A1';

  return (
    <Screen>
      <AppText variant="title">প্রোফাইল</AppText>

      <Section title="অ্যাকাউন্ট">
        {session ? (
          <Card>
            <AppText variant="subheading">{session.user.email}</AppText>
            <AppText variant="caption" muted>
              আপনার অগ্রগতি অ্যাকাউন্টে সংরক্ষিত হচ্ছে।
            </AppText>
          </Card>
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
      </Section>

      <ListItem icon="bookmark-outline" title="সংরক্ষিত শব্দ" subtitle="বুকমার্ক ও শেখা শব্দ" onPress={() => router.push('/vocab/saved')} />

      {progress.history.length > 0 && (
        <Section title="শেখার ইতিহাস">
          {progress.history.slice(0, 8).map((h) => (
            <ListItem
              key={h.href}
              icon={moduleInfo[h.module].icon}
              title={h.title}
              subtitle={`${h.level} · ${moduleInfo[h.module].bn} · ${new Date(h.at).toLocaleDateString()}`}
              onPress={() => router.push(h.href as Href)}
            />
          ))}
        </Section>
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
            সব পাঠ, শব্দভান্ডার ও অনুশীলনী ফ্রি। প্রিমিয়ামে থাকবে AI দিয়ে PDF অনুশীলন।
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

      <AppText variant="caption" muted style={{ textAlign: 'center', color: colors.textSecondary }}>
        Deutsch Book · লেভেল যাচাই পরীক্ষা শুধু নির্দেশনা, কোনো আনুষ্ঠানিক সনদ নয়।
      </AppText>
    </Screen>
  );
}
