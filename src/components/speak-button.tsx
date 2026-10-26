import { useFocusEffect } from 'expo-router';
import { createContext, useCallback, useContext, useEffect, useRef, useState, useSyncExternalStore, type ReactNode, type RefObject } from 'react';
import { Animated, Dimensions, Easing, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import { Icon } from '@/components/ui';
import { TouchTarget } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { canSpeak, speakGerman, speakingNow, stopSpeaking, subscribeSpeaking } from '@/services/speech';
import { speechText } from '@/services/speech/audio-key';

/** Share of the icon's width taken by the speaker body; the waves are the rest. */
const BODY = 0.5;
/** While playing, the waves are revealed slowly from the speaker outwards, again and again. */
const WAVE_MS = 1300;
const WAVE_PAUSE_MS = 350;
/** The speaker's colour for a moment after it's tapped. */
const TAP_COLOR = '#F5B323';
const TAP_MS = 300;
/** How often a playing speaker checks that its text is still on screen. */
const VISIBLE_CHECK_MS = 400;
/** Text this close to the top (under the screen's header) or bottom edge counts as gone. */
const HIDDEN_TOP = 80;
const HIDDEN_BOTTOM = 40;

/**
 * The part of the screen a speaker reads, for a long text whose speaker sits
 * above it: the reading goes on while any of the area is on screen, not
 * only the speaker itself.
 */
const SpeakAreaContext = createContext<RefObject<View | null> | null>(null);

export function SpeakArea({ children }: { children: ReactNode }) {
  const ref = useRef<View>(null);
  return (
    <SpeakAreaContext.Provider value={ref}>
      <View ref={ref} collapsable={false}>
        {children}
      </View>
    </SpeakAreaContext.Provider>
  );
}

/** A speaker button, placed before German text, that reads it aloud; hidden where speech isn't available. */
export function SpeakButton({ text, size = 22, style }: { text: string; size?: number; style?: StyleProp<ViewStyle> }) {
  const { colors } = useTheme();
  const playing = useSyncExternalStore(subscribeSpeaking, speakingNow, speakingNow) === speechText(text);
  const [tapped, setTapped] = useState(false);
  const [reveal] = useState(() => new Animated.Value(1));
  const own = useRef<View>(null);
  const area = useContext(SpeakAreaContext) ?? own;

  // The reading stops when its text leaves: the screen is closed or left
  // for another one, or the text is scrolled out of sight.
  useFocusEffect(
    useCallback(() => {
      if (!playing) return;
      const timer = setInterval(() => {
        area.current?.measureInWindow((_x, y, _w, h) => {
          if (h > 0 && (y + h < HIDDEN_TOP || y > Dimensions.get('window').height - HIDDEN_BOTTOM)) stopSpeaking();
        });
      }, VISIBLE_CHECK_MS);
      return () => {
        clearInterval(timer);
        if (speakingNow() === speechText(text)) stopSpeaking();
      };
    }, [playing, area, text]),
  );

  useEffect(() => {
    if (!tapped) return;
    const timer = setTimeout(() => setTapped(false), TAP_MS);
    return () => clearTimeout(timer);
  }, [tapped]);

  useEffect(() => {
    if (!playing) return;
    // Width can't use the native driver; it is a tiny view, so that's fine.
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(reveal, { toValue: 0, duration: 0, useNativeDriver: false }),
        Animated.timing(reveal, { toValue: 1, duration: WAVE_MS, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
        Animated.delay(WAVE_PAUSE_MS),
      ]),
    );
    loop.start();
    return () => {
      loop.stop();
      reveal.setValue(1);
    };
  }, [playing, reveal]);

  if (!canSpeak) return null;
  return (
    <Pressable
      onPress={() => {
        setTapped(true);
        // A second tap while it reads stops it.
        if (playing) stopSpeaking();
        else void speakGerman(text);
      }}
      accessibilityRole="button"
      accessibilityLabel="উচ্চারণ শুনুন"
      hitSlop={8}
      ref={own}
      style={[{ minWidth: TouchTarget - 8, minHeight: TouchTarget - 8, alignItems: 'center', justifyContent: 'center' }, style]}>
      {({ pressed }) => {
        const color = pressed || tapped ? TAP_COLOR : colors.primary;
        const icon = <Icon name="volume-high" color={color} size={size} />;
        return (
          // The same icon twice: the body always shown, the waves uncovered bit by bit while playing.
          <View style={{ width: size, height: size }}>
            <View style={{ position: 'absolute', width: size * BODY, height: size, overflow: 'hidden' }}>{icon}</View>
            <Animated.View
              style={{
                position: 'absolute',
                height: size,
                overflow: 'hidden',
                width: reveal.interpolate({ inputRange: [0, 1], outputRange: [size * BODY, size] }),
              }}>
              {icon}
            </Animated.View>
          </View>
        );
      }}
    </Pressable>
  );
}
