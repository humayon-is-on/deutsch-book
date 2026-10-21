import { router, type Href } from 'expo-router';
import { View } from 'react-native';

import { AppText, Button, Card, Icon, LevelBadge, ListItem, ProgressBar, Row, Screen, Section } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { content, levelInfo, moduleInfo } from '@/content';
import { useLevelColor, useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/state/auth';
import { levelProgress, useProgress, type SyncStatus } from '@/state/progress';

export default function HomeScreen() {
  const { progress, syncStatus } = useProgress();
  const level = progress.level ?? 'A1';
  const lp = levelProgress(progress, level);
  const { fg } = useLevelColor(level);
  const { colors } = useTheme();

  const continueHref = (progress.lastLocation?.href ??
    `/lesson/${content[level].grammar[0]?.id}`) as Href;
  const continueTitle = progress.lastLocation?.title ?? content[level].grammar[0]?.title.bn ?? '';
  const learnedCount = Object.keys(progress.learned).length;
  const mistakeCount = Object.keys(progress.mistakes).length;

  return (
    <Screen>
      <Row style={{ justifyContent: 'space-between' }}>
        <View>
          <AppText variant="caption" muted>
            Willkommen!
          </AppText>
          <AppText variant="title">স্বাগতম 👋</AppText>
        </View>
        <SyncBadge status={syncStatus} />
      </Row>

      <Card>
        <Row style={{ justifyContent: 'space-between' }}>
          <Row>
            <LevelBadge level={level} />
            <AppText variant="subheading">
              {levelInfo[level].bn} · {levelInfo[level].name}
            </AppText>
          </Row>
          <AppText variant="subheading" color={fg}>
            {Math.round(lp.overall * 100)}%
          </AppText>
        </Row>
        <ProgressBar value={lp.overall} color={fg} />
        <AppText variant="caption" muted>
          এই লেভেলে আপনার মোট অগ্রগতি
        </AppText>
      </Card>

      <Card style={{ backgroundColor: colors.primary, borderColor: colors.primary }}>
        <AppText variant="label" color={colors.primaryText}>
          {progress.lastLocation ? 'যেখানে থেমেছিলেন' : 'শুরু করুন'}
        </AppText>
        <AppText variant="heading" color={colors.primaryText}>
          {continueTitle}
        </AppText>
        <Button
          title="শেখা চালিয়ে যান"
          icon="play"
          variant="secondary"
          onPress={() => router.push(continueHref)}
        />
      </Card>

      <Row style={{ gap: Spacing.md }}>
        <Stat icon="book-outline" value={learnedCount} label="শেখা শব্দ" onPress={() => router.push('/vocab/saved')} />
        <Stat
          icon="refresh-outline"
          value={mistakeCount}
          label="রিভিশন বাকি"
          onPress={() => router.push('/quiz/revision')}
        />
      </Row>

      {progress.history.length > 0 && (
        <Section title="সাম্প্রতিক কার্যক্রম">
          {progress.history.slice(0, 3).map((h) => (
            <ListItem
              key={h.href}
              icon={moduleInfo[h.module].icon}
              title={h.title}
              subtitle={`${h.level} · ${moduleInfo[h.module].bn}`}
              onPress={() => router.push(h.href as Href)}
            />
          ))}
        </Section>
      )}
    </Screen>
  );
}

function Stat({ icon, value, label, onPress }: { icon: string; value: number; label: string; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Card onPress={onPress} style={{ flex: 1 }} accessibilityLabel={`${label}: ${value}`}>
      <Icon name={icon} color={colors.primary} />
      <AppText variant="title">{value}</AppText>
      <AppText variant="caption" muted>
        {label}
      </AppText>
    </Card>
  );
}

const syncText: Record<SyncStatus, { label: string; icon: string }> = {
  local: { label: 'ডিভাইসে সংরক্ষিত', icon: 'phone-portrait-outline' },
  saving: { label: 'সংরক্ষণ হচ্ছে…', icon: 'sync-outline' },
  synced: { label: 'ক্লাউডে সংরক্ষিত', icon: 'cloud-done-outline' },
  offline: { label: 'অফলাইন, ডিভাইসে সংরক্ষিত', icon: 'cloud-offline-outline' },
};

export function SyncBadge({ status }: { status: SyncStatus }) {
  const { colors } = useTheme();
  const { session } = useAuth();
  const s = syncText[status];
  return (
    <Row style={{ gap: 4 }}>
      <Icon name={s.icon} size={16} color={colors.textSecondary} />
      <AppText variant="caption" muted onPress={session ? undefined : () => router.push('/auth/sign-in')}>
        {s.label}
      </AppText>
    </Row>
  );
}
