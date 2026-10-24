import { Redirect } from 'expo-router';
import { Tabs } from 'expo-router/js-tabs';

import { Icon } from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';
import { useProgress } from '@/state/progress';

// The premium PDF practice tab is parked in src/features/pdf-practice.tsx until it is built:
// move it back to (tabs)/pdf.tsx and add { name: 'pdf', title: 'PDF', icon: 'document-text' } here.
const tabs = [
  { name: 'index', title: 'শিখুন', icon: 'book' },
  { name: 'practice', title: 'অনুশীলন', icon: 'create' },
  { name: 'profile', title: 'প্রোফাইল', icon: 'person' },
] as const;

export default function TabLayout() {
  const { colors } = useTheme();
  const { progress } = useProgress();

  if (!progress.onboarded) return <Redirect href="/onboarding" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, minHeight: 60 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}>
      {tabs.map((t) => (
        <Tabs.Screen
          key={t.name}
          name={t.name}
          options={{
            title: t.title,
            tabBarIcon: ({ color, focused }) => (
              <Icon name={focused ? t.icon : `${t.icon}-outline`} color={color as string} size={24} />
            ),
          }}
        />
      ))}
      {/* Old address of Learn, kept so links to it still work. */}
      <Tabs.Screen name="learn" options={{ href: null }} />
    </Tabs>
  );
}
