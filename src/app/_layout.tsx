import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import { GuestExitGuard, SignUpNudge, StartAccountButton } from '@/components/account';
import { IntroSplash } from '@/components/intro-splash';
import { ContentGate } from '@/components/content-gate';
import { ExitButton, HomeBackButton } from '@/components/header-buttons';
import { NetworkGate } from '@/components/network-gate';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useApplyUpdateOnLaunch } from '@/lib/updates';
import { ContentProvider } from '@/services/content/provider';
import { AuthProvider, useAuth } from '@/state/auth';
import { ProgressProvider, useProgress } from '@/state/progress';

SplashScreen.preventAutoHideAsync();

// Web: no pull-down-to-reload, so the page behaves like the phone app.
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  document.documentElement.style.overscrollBehaviorY = 'none';
  document.body.style.overscrollBehaviorY = 'none';
}

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
        screenOptions={({ navigation }) => ({
          // Web: a page opened straight from a link or a reload has nothing to go back to, so its arrow goes home.
          headerLeft: Platform.OS === 'web' && !navigation.canGoBack() ? () => <HomeBackButton /> : undefined,
          headerBackButtonDisplayMode: 'minimal',
          headerTintColor: Colors[scheme].primary,
          headerTitleStyle: { color: colors.text },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.background },
        })}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />
        <Stack.Screen
          name="onboarding/start"
          options={{ title: 'শুরু করুন', headerTitleStyle: { color: colors.text, fontSize: 24, fontWeight: '800' }, headerRight: () => <StartAccountButton /> }}
        />
        <Stack.Screen name="account" options={{ title: 'প্রোফাইল' }} />
        <Stack.Screen name="onboarding/level" options={{ title: 'লেভেল বেছে নিন' }} />
        <Stack.Screen name="onboarding/placement" options={{ title: 'লেভেল যাচাই পরীক্ষা', headerLeft: () => <ExitButton /> }} />
        {/* Tests and practice cards only move forward: a cross to leave, no back arrow. */}
        <Stack.Screen name="topic-test/[id]" options={{ headerLeft: () => <ExitButton /> }} />
        <Stack.Screen name="practice/[id]" options={{ headerLeft: () => <ExitButton /> }} />
        <Stack.Screen name="auth/sign-in" options={{ title: 'অ্যাকাউন্ট', presentation: 'modal' }} />
      </Stack>
      <ContentGate />
      <NetworkGate />
      <SignUpNudge />
      <GuestExitGuard />
      <IntroSplash />
    </ThemeProvider>
  );
}
