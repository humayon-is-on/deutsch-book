import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { useEffect, useState } from 'react';
import { Animated, Easing, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

/** The hump is a circle stretched sideways (WIDEN) so its top is flatter; RISE is how far it rises above the bar. */
const HUMP = 88;
const WIDEN = 1.6;
const RISE = 12;
/** Radius of the soft curve where the hump meets the bar's top line. */
const FILLET = 16;
/** How far the active icon lifts into the hump. */
const LIFT = 4;
const SLIDE_MS = 380;

const native = Platform.OS !== 'web';

/**
 * Where the soft curve joins the hump (`touch`) and its circle's centre
 * (`centre`), measured from the hump's middle at the bar's top line, right
 * side (y grows downwards). The circle touches the line and the stretched hump.
 */
const fillet = (() => {
  const a = (HUMP / 2) * WIDEN;
  const b = HUMP / 2;
  const cy = b - RISE;
  const at = (t: number) => {
    const p = { x: a * Math.sin(t), y: cy - b * Math.cos(t) };
    const nx = p.x / (a * a);
    const ny = (p.y - cy) / (b * b);
    const len = Math.hypot(nx, ny);
    return { touch: p, centre: { x: p.x + (FILLET * nx) / len, y: p.y + (FILLET * ny) / len } };
  };
  // Find the point whose circle sits on the line (centre y = -FILLET).
  let lo = 0;
  let hi = Math.PI / 2;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (at(mid).centre.y < -FILLET) lo = mid;
    else hi = mid;
  }
  return at((lo + hi) / 2);
})();

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
    const slide = Animated.timing(pos, { toValue: active, duration: SLIDE_MS, easing: Easing.out(Easing.back(1.3)), useNativeDriver: native });
    slide.start();
    return () => slide.stop();
  }, [active, pos]);

  const slot = routes.length ? width / routes.length : 0;
  const last = Math.max(1, routes.length - 1);
  const humpX = pos.interpolate({ inputRange: [0, last], outputRange: [slot / 2, slot * last + slot / 2] });

  return (
    <View onLayout={(e) => setWidth(e.nativeEvent.layout.width)} accessibilityRole="tablist">
      <View style={[styles.line, { backgroundColor: colors.border }]} />
      {width > 0 && (
        <Animated.View style={[styles.humpGroup, { transform: [{ translateX: humpX }] }]}>
          <View style={[styles.hump, { backgroundColor: colors.surface, borderColor: colors.border }]} />
          {[1, -1].map((side) => (
            <View
              key={side}
              style={[
                styles.filletBox,
                { backgroundColor: colors.surface, left: side === 1 ? fillet.touch.x : -fillet.centre.x },
              ]}>
              <View
                style={[
                  styles.filletCircle,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    left: side === 1 ? fillet.centre.x - FILLET - fillet.touch.x : -FILLET,
                  },
                ]}
              />
            </View>
          ))}
        </Animated.View>
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
  // Everything in the group is placed from the hump's middle on the top line.
  humpGroup: { position: 'absolute', top: 0, left: 0, width: 0, height: 0 },
  hump: {
    position: 'absolute',
    top: -RISE,
    left: -HUMP / 2,
    width: HUMP,
    height: HUMP,
    borderRadius: HUMP / 2,
    borderWidth: 1,
    transform: [{ scaleX: WIDEN }],
  },
  filletBox: {
    position: 'absolute',
    top: fillet.touch.y,
    width: fillet.centre.x - fillet.touch.x,
    height: 1 - fillet.touch.y,
    overflow: 'hidden',
  },
  filletCircle: {
    position: 'absolute',
    top: 1 - 2 * FILLET - fillet.touch.y,
    width: 2 * FILLET,
    height: 2 * FILLET,
    borderRadius: FILLET,
    borderWidth: 1,
  },
  body: { marginTop: 1, flexDirection: 'row', minHeight: 60 },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2, paddingVertical: 6 },
  label: { fontSize: 12, fontWeight: '600' },
});
