import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { useEffect, useState } from 'react';
import { Animated, Easing, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

/** How wide the hump's circle is, and how far its top rises above the bar. */
const HUMP = 88;
const RISE = 12;
/** How far the active icon lifts into the hump. */
const LIFT = 4;
const SLIDE_MS = 280;

const native = Platform.OS !== 'web';

/**
 * The bottom tab bar, with a soft hump in its top edge over the active tab.
 * The hump slides to a newly tapped tab. Only the tabs named in `names` are
 * shown; any other route (an old address) counts as the first tab.
 */
export function HumpTabBar({ state, descriptors, navigation, insets, names }: BottomTabBarProps & { names: readonly string[] }) {
  const { colors } = useTheme();
  const [width, setWidth] = useState(0);
  const routes = names.map((n) => state.routes.find((r) => r.name === n)).filter((r) => r !== undefined);
  const active = Math.max(0, routes.findIndex((r) => r.key === state.routes[state.index].key));
  const [pos] = useState(() => new Animated.Value(active));

  useEffect(() => {
    const slide = Animated.timing(pos, { toValue: active, duration: SLIDE_MS, easing: Easing.out(Easing.cubic), useNativeDriver: native });
    slide.start();
    return () => slide.stop();
  }, [active, pos]);

  const slot = routes.length ? width / routes.length : 0;
  const last = Math.max(1, routes.length - 1);
  const humpX = pos.interpolate({ inputRange: [0, last], outputRange: [slot / 2 - HUMP / 2, slot * last + slot / 2 - HUMP / 2] });

  return (
    <View onLayout={(e) => setWidth(e.nativeEvent.layout.width)} accessibilityRole="tablist">
      <View style={[styles.line, { backgroundColor: colors.border }]} />
      {width > 0 && (
        <Animated.View
          style={[
            styles.hump,
            { backgroundColor: colors.surface, borderColor: colors.border, transform: [{ translateX: humpX }] },
          ]}
        />
      )}
      <View style={[styles.body, { backgroundColor: colors.surface, paddingBottom: insets.bottom }]}>
        {routes.map((route, i) => {
          const { options } = descriptors[route.key];
          const focused = i === active;
          const color = focused ? colors.primary : colors.textSecondary;
          const lift = pos.interpolate({ inputRange: [i - 1, i, i + 1], outputRange: [0, -LIFT, 0], extrapolate: 'clamp' });
          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
          };
          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={options.title}
              style={styles.tab}>
              <Animated.View style={{ transform: [{ translateY: lift }] }}>
                {options.tabBarIcon?.({ focused, color, size: 24 })}
              </Animated.View>
              <Text style={[styles.label, { color }]} numberOfLines={1}>
                {options.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  line: { position: 'absolute', top: 0, left: 0, right: 0, height: 1 },
  hump: { position: 'absolute', top: -RISE, left: 0, width: HUMP, height: HUMP, borderRadius: HUMP / 2, borderWidth: 1 },
  body: { marginTop: 1, flexDirection: 'row', minHeight: 60 },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2, paddingVertical: 6 },
  label: { fontSize: 12, fontWeight: '600' },
});
