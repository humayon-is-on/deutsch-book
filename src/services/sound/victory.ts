import { requireOptionalNativeModule } from 'expo';
import { Asset } from 'expo-asset';
import { Platform } from 'react-native';

/**
 * A short (2 s), soft chime played when a test or practice card is answered
 * 100% correct. Bundled with the app (16 KB), so it plays offline and at once.
 * App builds made before sound was added have no audio module; there it stays quiet.
 */
type AudioModule = typeof import('expo-audio');

const web = Platform.OS === 'web';
/* eslint-disable @typescript-eslint/no-require-imports */
const audio: AudioModule | null = !web && requireOptionalNativeModule('ExpoAudio') ? require('expo-audio') : null;
const SOUND = require('../../../assets/sounds/victory.mp3');
/* eslint-enable @typescript-eslint/no-require-imports */

let nativePlayer: ReturnType<AudioModule['createAudioPlayer']> | null = null;

export function playVictory() {
  try {
    if (web) {
      if (typeof window === 'undefined') return;
      const player = new Audio(Asset.fromModule(SOUND).uri);
      player.volume = 0.7;
      void player.play().catch(() => {}); // The browser may block sound before a tap: stay quiet.
      return;
    }
    if (!audio) return;
    if (!nativePlayer) {
      nativePlayer = audio.createAudioPlayer(SOUND);
      nativePlayer.volume = 0.7;
    } else {
      void nativePlayer.seekTo(0);
    }
    nativePlayer.play();
  } catch {
    // No sound is better than a crash.
  }
}
