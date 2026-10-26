import { requireOptionalNativeModule } from 'expo';
import { Platform } from 'react-native';

import { CONTENT_URL } from '@/services/content/remote';
import { audioPath, speechText } from '@/services/speech/audio-key';

/**
 * Plays German pronunciation: the recording made for each word and sentence
 * (Piper, voice Thorsten; see scripts/audio-list.ts), served with the course
 * files. Text that has no recording yet (a new level still being written)
 * falls back to the device's own voice.
 *
 * App builds made before sound was added have neither module; there
 * `canSpeak` is false and the speaker buttons stay hidden.
 */
type AudioModule = typeof import('expo-audio');
type SpeechModule = typeof import('expo-speech');

const web = Platform.OS === 'web';

// Loaded only when the native part exists, so older app builds don't crash.
/* eslint-disable @typescript-eslint/no-require-imports */
const audio: AudioModule | null = !web && requireOptionalNativeModule('ExpoAudio') ? require('expo-audio') : null;
const speech: SpeechModule | null =
  (web ? typeof window !== 'undefined' && 'speechSynthesis' in window : !!requireOptionalNativeModule('ExpoSpeech'))
    ? require('expo-speech')
    : null;
/* eslint-enable @typescript-eslint/no-require-imports */

export const canSpeak = web ? typeof window !== 'undefined' : audio !== null;

/** The text being spoken right now, so its speaker button can show it. */
let speaking: string | null = null;
/** Counts plays, so a finished old play doesn't end a newer one. */
let playId = 0;
const listeners = new Set<() => void>();

function setSpeaking(text: string | null) {
  speaking = text;
  listeners.forEach((l) => l());
}

export function subscribeSpeaking(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export const speakingNow = () => speaking;

const finish = (id: number) => () => {
  if (id === playId) setSpeaking(null);
};

/** Whether each recording exists, learned on first use. */
const known = new Map<string, boolean>();

async function hasRecording(url: string) {
  if (!known.has(url)) {
    try {
      known.set(url, (await fetch(url, { method: 'HEAD' })).ok);
    } catch {
      return false; // Offline: try again next time.
    }
  }
  return known.get(url)!;
}

let webPlayer: HTMLAudioElement | null = null;
let nativePlayer: ReturnType<AudioModule['createAudioPlayer']> | null = null;

function play(url: string, id: number) {
  if (web) {
    webPlayer?.pause();
    const player = new Audio(url);
    player.onended = player.onerror = finish(id);
    webPlayer = player;
    void player.play().catch(finish(id));
    return;
  }
  if (!audio) return;
  if (!nativePlayer) {
    void audio.setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
    nativePlayer = audio.createAudioPlayer({ uri: url });
    nativePlayer.addListener('playbackStatusUpdate', (s) => {
      if (s.didJustFinish) finish(playId)();
    });
  } else {
    nativePlayer.replace({ uri: url });
  }
  nativePlayer.play();
}

function deviceVoice(text: string, id: number) {
  if (!speech) return finish(id)();
  try {
    speech.stop();
    speech.speak(text, { language: 'de-DE', rate: 0.85, onDone: finish(id), onStopped: finish(id), onError: finish(id) });
  } catch {
    finish(id)(); // No German voice: stay quiet.
  }
}

/** Says a German word or sentence; does nothing when the device can't. */
export async function speakGerman(text: string) {
  if (!canSpeak || !text.trim()) return;
  const id = ++playId;
  setSpeaking(speechText(text));
  const url = CONTENT_URL + audioPath(text);
  try {
    if (await hasRecording(url)) {
      if (id === playId) play(url, id);
    } else if (id === playId) deviceVoice(text, id);
  } catch {
    finish(id)();
  }
}
