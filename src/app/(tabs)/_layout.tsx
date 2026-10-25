import { Redirect } from 'expo-router';
import { Tabs } from 'expo-router/js-tabs';
import { View } from 'react-native';

import { Icon } from '@/components/ui';
import { Fonts } from '@/constants/theme';
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
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, borderTopWidth: 2, minHeight: 66 },
        tabBarLabelStyle: { fontSize: 13, fontFamily: Fonts.display },
      }}>
      {tabs.map((t) => (
        <Tabs.Screen
          key={t.name}
          name={t.name}
          options={{
            title: t.title,
            tabBarIcon: ({ color, focused }) => (
              // The open tab's icon sits in a soft pill, cartoon style.
              <View
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 2,
                  borderRadius: 999,
                  backgroundColor: focused ? colors.primary + '1F' : 'transparent',
                }}>
                <Icon name={focused ? t.icon : `${t.icon}-outline`} color={color as string} size={24} />
              </View>
            ),
          }}
        />
      ))}
      {/* Old address of Learn, kept so links to it still work. */}
      <Tabs.Screen name="learn" options={{ href: null }} />
    </Tabs>
  );
}
