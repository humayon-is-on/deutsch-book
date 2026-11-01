import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useSyncExternalStore } from 'react';

/**
 * The app's interface language. Only the app's own text (buttons, labels,
 * popups, headings, notices) follows it; the course itself (lessons, words,
 * texts, questions) is never translated by it.
 *
 * Every piece of interface text is written in both languages where it is
 * used: `t('বাংলা লেখা', 'English text')`. Bangla is the default.
 */
export type Lang = 'bn' | 'en';

const DEVICE_KEY = 'deutschbook.lang.v1';

let current: Lang = 'bn';
const listeners = new Set<() => void>();

export function getLang(): Lang {
  return current;
}

/** Switches the interface language. Remembered on the device, so screens before sign-in use it too. */
export function setLang(lang: Lang) {
  if (lang === current) return;
  current = lang;
  AsyncStorage.setItem(DEVICE_KEY, lang).catch(() => {});
  listeners.forEach((l) => l());
}

/** Loads the language last used on this device. */
export async function loadDeviceLang() {
  const saved = await AsyncStorage.getItem(DEVICE_KEY).catch(() => null);
  if (saved === 'bn' || saved === 'en') setLang(saved);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Interface text in the current language, for code outside components. */
export function tr(bn: string, en: string) {
  return current === 'en' ? en : bn;
}

/** The current interface language; re-renders the component when it changes. */
export function useLang(): Lang {
  return useSyncExternalStore(subscribe, getLang, getLang);
}

/** `t(bn, en)` for components; re-renders when the language changes. */
export function useT() {
  const lang = useLang();
  return useCallback((bn: string, en: string) => (lang === 'en' ? en : bn), [lang]);
}

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';

/** A number written in the interface language's digits. */
export function num(n: number | string, lang: Lang = current) {
  const s = String(n);
  return lang === 'en' ? s : s.replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}
