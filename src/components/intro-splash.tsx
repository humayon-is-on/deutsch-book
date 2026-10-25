import { useEffect, useState } from 'react';
import { Animated, Image, Platform, StyleSheet } from 'react-native';

import { Fonts } from '@/constants/theme';

const LOGO = require('../../assets/images/logo.png');

/** Same cream as the native splash screen (app.json), so the two join up. */
export const SPLASH_CREAM = '#FFF6E5';
const NAVY = '#0A1D3B';

/** When each part appears and when the screen fades away, in ms from start. */
const TITLE_AT = 600;
const TAGLINE_AT = 1500;
const DONE_AT = 3200;
/** How long each part takes to appear, and the screen to fade away. */
const APPEAR = 700;
const FADE = 500;

const native = Platform.OS !== 'web';

/** Shown once each time the app opens; the app loads its data underneath. */
let shown = false;

/**
 * The opening screen: the logo on cream, then the name and the tagline under
 * it, then it fades into the app.
 */
export function IntroSplash() {
  const [visible, setVisible] = useState(!shown);
  const [title] = useState(() => new Animated.Value(0));
  const [tagline] = useState(() => new Animated.Value(0));
  const [cover] = useState(() => new Animated.Value(1));

  useEffect(() => {
    if (shown) return;
    shown = true;
    const show = (v: Animated.Value, delay: number) =>
      Animated.timing(v, { toValue: 1, duration: APPEAR, delay, useNativeDriver: native });
    // The name springs up with a small bounce; the rest glides in.
    const jump = Animated.sequence([
      Animated.delay(TITLE_AT),
      Animated.spring(title, { toValue: 1, friction: 4, tension: 90, useNativeDriver: native }),
    ]);
    const run = Animated.parallel([
      jump,
      show(tagline, TAGLINE_AT),
      Animated.timing(cover, { toValue: 0, duration: FADE, delay: DONE_AT, useNativeDriver: native }),
    ]);
    run.start(() => setVisible(false));
    return () => run.stop();
  }, [title, tagline, cover]);

  if (!visible) return null;
  const rise = (v: Animated.Value) => ({ opacity: v, transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }] });
  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.screen, { opacity: cover }]} accessibilityLabel="Deutsch Book">
      <Image source={LOGO} style={styles.logo} />
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: title.interpolate({ inputRange: [0, 0.6], outputRange: [0, 1], extrapolate: 'clamp' }),
            transform: [{ translateY: title.interpolate({ inputRange: [0, 1], outputRange: [28, 0] }) }],
          },
        ]}>
        Deutsch Book
      </Animated.Text>
      <Animated.Text style={[styles.tagline, rise(tagline)]}>For the Bengali learners</Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: SPLASH_CREAM, alignItems: 'center', justifyContent: 'center', gap: 6, zIndex: 100 },
  logo: { width: 160, height: 160, marginBottom: 12 },
  title: { fontSize: 32, fontWeight: '800', color: NAVY, fontFamily: Fonts.sans },
  tagline: { fontSize: 16, color: '#7A6A4F', fontFamily: Fonts.sans },
});
