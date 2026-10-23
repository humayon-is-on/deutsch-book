import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { GuestExitGuard, SignUpNudge } from '@/components/account';
import { IntroSplash } from '@/components/intro-splash';
import { ContentGate } from '@/components/content-gate';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useApplyUpdateOnLaunch } from '@/lib/updates';
import { ContentProvider } from '@/services/content/provider';
import { AuthProvider, useAuth } from '@/state/auth';
import { ProgressProvider, useProgress } from '@/state/progress';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useApplyUpdateOnLaunch();
  return (
    <AuthProvider>
      <ProgressProvider>
        <ContentProvider>
          <RootStack />
        </ContentProvider>
      </ProgressProvider>
    </AuthProvider>
  );
}

function RootStack() {
  const { scheme, colors } = useTheme();
  const { loaded } = useProgress();
  const { ready } = useAuth();

  useEffect(() => {
    if (loaded && ready) SplashScreen.hideAsync();
  }, [loaded, ready]);

  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...base,
    colors: { ...base.colors, background: colors.background, card: colors.surface, text: colors.text, primary: colors.primary, border: colors.border },
  };

  if (!loaded || !ready) return null;

  return (
    <ThemeProvider value={navTheme}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerBackButtonDisplayMode: 'minimal',
          headerTintColor: Colors[scheme].primary,
          headerTitleStyle: { color: colors.text },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.background },
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding/level" options={{ title: 'লেভেল বেছে নিন' }} />
        <Stack.Screen name="onboarding/placement" options={{ title: 'লেভেল যাচাই পরীক্ষা' }} />
        <Stack.Screen name="auth/sign-in" options={{ title: 'অ্যাকাউন্ট', presentation: 'modal' }} />
      </Stack>
      <ContentGate />
      <SignUpNudge />
      <GuestExitGuard />
      <IntroSplash />
    </ThemeProvider>
  );
}
