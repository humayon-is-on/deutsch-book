import { requireOptionalNativeModule } from 'expo';
import { Platform } from 'react-native';

/**
 * Reads German aloud with the device's own text-to-speech voice (the browser's
 * voice on the web). It is the one place the app gets German sound from, so
 * it can later play recorded audio files instead without touching the screens.
 *
 * App builds made before speech was added don't have the speech module; there
 * `canSpeak` is false and the speaker buttons stay hidden.
 */
type SpeechModule = typeof import('expo-speech');

const RATE = 0.85;

const speech: SpeechModule | null = (() => {
  if (Platform.OS !== 'web' && !requireOptionalNativeModule('ExpoSpeech')) return null;
  if (Platform.OS === 'web' && (typeof window === 'undefined' || !('speechSynthesis' in window))) return null;
  try {
    // Loaded only when the module exists, so older app builds don't crash.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('expo-speech') as SpeechModule;
  } catch {
    return null;
  }
})();

export const canSpeak = speech !== null;

/** Says a German word or sentence; does nothing when the device can't. */
export function speakGerman(text: string) {
  if (!speech || !text.trim()) return;
  try {
    speech.stop();
    speech.speak(text, { language: 'de-DE', rate: RATE });
  } catch {
    // No German voice, or speech unavailable right now: stay quiet.
  }
}
