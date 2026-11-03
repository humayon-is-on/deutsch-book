import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { handleAuthUrl } from '@/state/auth';

/**
 * Phones: the page the router opens for the Google/Facebook return link
 * (deutschbook://auth/callback#access_token=…). It signs in with the tokens,
 * then steps back; the screens below send the learner on to Learn or Get started.
 */
export default function AuthCallback() {
  const url = Linking.useLinkingURL();
  const { colors } = useTheme();

  useEffect(() => {
    let done = false;
    (async () => {
      await handleAuthUrl(url);
      if (done) return;
      done = true;
      if (router.canGoBack()) router.back();
      else router.replace('/onboarding');
    })();
    return () => {
      done = true;
    };
  }, [url]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
}
