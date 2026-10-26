import { useEffect, useState, useSyncExternalStore } from 'react';
import { Pressable, type StyleProp, type ViewStyle } from 'react-native';

import { Icon } from '@/components/ui';
import { TouchTarget } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { canSpeak, speakGerman, speakingNow, subscribeSpeaking } from '@/services/speech';
import { speechText } from '@/services/speech/audio-key';

/** While playing, the speaker's waves fill in one by one. */
const WAVES = ['volume-off', 'volume-low', 'volume-medium', 'volume-high'] as const;
const WAVE_MS = 220;
/** The speaker's colour for a moment after it's tapped. */
const TAP_COLOR = '#F5B323';
const TAP_MS = 300;

/** A speaker button, placed before German text, that reads it aloud; hidden where speech isn't available. */
export function SpeakButton({ text, size = 22, style }: { text: string; size?: number; style?: StyleProp<ViewStyle> }) {
  const { colors } = useTheme();
  const playing = useSyncExternalStore(subscribeSpeaking, speakingNow, speakingNow) === speechText(text);
  const [frame, setFrame] = useState(WAVES.length - 1);
  const [tapped, setTapped] = useState(false);

  useEffect(() => {
    if (!tapped) return;
    const timer = setTimeout(() => setTapped(false), TAP_MS);
    return () => clearTimeout(timer);
  }, [tapped]);

  useEffect(() => {
    if (!playing) return;
    let i = 0;
    const timer = setInterval(() => setFrame((i = (i + 1) % WAVES.length)), WAVE_MS);
    return () => {
      clearInterval(timer);
      setFrame(WAVES.length - 1);
    };
  }, [playing]);

  if (!canSpeak) return null;
  return (
    <Pressable
      onPress={() => {
        setTapped(true);
        void speakGerman(text);
      }}
      accessibilityRole="button"
      accessibilityLabel="উচ্চারণ শুনুন"
      hitSlop={8}
      style={[{ minWidth: TouchTarget - 8, minHeight: TouchTarget - 8, alignItems: 'center', justifyContent: 'center' }, style]}>
      {({ pressed }) => (
        <Icon name={playing ? WAVES[frame] : 'volume-high'} color={pressed || tapped ? TAP_COLOR : colors.primary} size={size} />
      )}
    </Pressable>
  );
}
