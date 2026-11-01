import { Redirect, router, usePathname } from 'expo-router';
import { Tabs } from 'expo-router/js-tabs';
import { useEffect, useRef } from 'react';

import { HumpTabBar } from '@/components/hump-tab-bar';
import { Icon } from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/state/auth';
import { useProgress } from '@/state/progress';
import { useT } from '@/i18n';

// The premium PDF practice tab is parked in src/features/pdf-practice.tsx until it is built:
// move it back to (tabs)/pdf.tsx and add { name: 'pdf', title: 'PDF', icon: 'document-text' } here.
const tabs = [
  { name: 'index', title: 'শিখুন', en: 'Learn', icon: 'book' },
  { name: 'practice', title: 'অনুশীলন', en: 'Practice', icon: 'create' },
  { name: 'profile', title: 'প্রোফাইল', en: 'Profile', icon: 'person' },
] as const;

export default function TabLayout() {
  const { colors } = useTheme();
  const t = useT();
  const { progress } = useProgress();
  const { session } = useAuth();
  const pathname = usePathname();
  // A signed-in learner with no level yet starts on the welcome screen; from its
  // avatar they can open Profile, with the other tabs shown but locked.
  const locked = !progress.onboarded;

  // Once a level is set (picked, or the account's progress has arrived), open Learn.
  const wasLocked = useRef(locked);
  useEffect(() => {
    if (wasLocked.current && !locked && session) router.replace('/');
    wasLocked.current = locked;
  }, [locked, session]);

  if (locked && (!session || pathname !== '/profile')) return <Redirect href="/onboarding" />;

  return (
    <Tabs
      tabBar={(props) => <HumpTabBar {...props} names={tabs.map((tab) => tab.name)} locked={locked} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, minHeight: 60 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: t(tab.title, tab.en),
            tabBarIcon: ({ color, focused }) => (
              <Icon name={focused ? tab.icon : `${tab.icon}-outline`} color={color as string} size={24} />
            ),
          }}
        />
      ))}
      {/* Old address of Learn, kept so links to it still work. */}
      <Tabs.Screen name="learn" options={{ href: null }} />
    </Tabs>
  );
}
