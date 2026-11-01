import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AppText, Button, Icon } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useContentState } from '@/services/content/provider';
import { useLevelIndex } from '@/services/content/store';
import { useProgress } from '@/state/progress';
import { useT } from '@/i18n';

/**
 * Covers the app until the learner's level has its table of contents: on the
 * very first start (or after switching level) it has to be downloaded once.
 */
export function ContentGate() {
  const { progress } = useProgress();
  const index = useLevelIndex();
  const { state, retry } = useContentState();
  const { colors } = useTheme();
  const t = useT();

  if (!progress.level || index?.level === progress.level) return null;

  return (
    <View style={[StyleSheet.absoluteFill, styles.cover, { backgroundColor: colors.background }]}>
      {state === 'offline' ? (
        <>
          <Icon name="cloud-offline-outline" size={44} />
          <AppText variant="heading">{t('ইন্টারনেট সংযোগ নেই', 'No internet connection')}</AppText>
          <AppText variant="bn" muted style={{ textAlign: 'center' }}>
            {t(
              'কোর্সের পাঠগুলো প্রথমবার নামাতে ইন্টারনেট লাগবে। একবার নামানো হলে সেগুলো ইন্টারনেট ছাড়াও খুলবে।',
              'The lessons need internet to download the first time. Once downloaded, they open without internet too.',
            )}
          </AppText>
          <Button title={t('আবার চেষ্টা করুন', 'Try again')} icon="refresh" onPress={retry} />
        </>
      ) : (
        <>
          <ActivityIndicator color={colors.primary} size="large" />
          <AppText variant="bn" muted>
            {t('পাঠ লোড হচ্ছে…', 'Loading lessons…')}
          </AppText>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cover: { alignItems: 'center', justifyContent: 'center', gap: Spacing.md, padding: Spacing.xl },
});
