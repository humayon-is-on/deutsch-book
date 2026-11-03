import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';

import type { Level, LevelIndex } from '@/content/types';
import { indexEntry, practiceEntry } from './store';
import { hasFile } from './cache';

/**
 * Offline mode: what the learner may open without internet. It is fixed
 * while online (the next topics in each module and the newest practice
 * card, all saved on the device) and kept on the device, so it doesn't move
 * ahead while offline: after those topics the app asks for internet.
 */

export type OfflineWindow = { level: Level; topics: string[]; cards: string[] };

const key = (level: Level) => `deutschbook.offline.v1.${level}`;

let current: OfflineWindow | null = null;
const listeners = new Set<() => void>();

function set(w: OfflineWindow | null) {
  current = w;
  listeners.forEach((l) => l());
}

/** Fixes the window from `wanted`, keeping only what is really saved on the device. */
export async function saveOfflineWindow(index: LevelIndex, wanted: { topics: string[]; cards: string[] }) {
  const saved = async (id: string) => {
    const path = (indexEntry(index, id) ?? practiceEntry(index, id))?.summary.file;
    return !!path && (await hasFile(path));
  };
  const keep = async (ids: string[]) => (await Promise.all(ids.map(async (id) => ((await saved(id)) ? id : null)))).filter((id): id is string => !!id);
  const w: OfflineWindow = { level: index.level, topics: await keep(wanted.topics), cards: await keep(wanted.cards) };
  set(w);
  await AsyncStorage.setItem(key(w.level), JSON.stringify(w)).catch(() => {});
}

/** Loads the level's saved window; false when there is none yet. */
export async function loadOfflineWindow(level: Level): Promise<boolean> {
  if (current?.level === level) return true;
  try {
    const raw = await AsyncStorage.getItem(key(level));
    if (raw) {
      set(JSON.parse(raw) as OfflineWindow);
      return true;
    }
  } catch {}
  return false;
}

/** Whether a topic or practice card can be opened without internet. */
export const openOffline = (w: OfflineWindow | null, id: string) => !!w && (w.topics.includes(id) || w.cards.includes(id));

export const getOfflineWindow = () => current;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export const useOfflineWindow = () => useSyncExternalStore(subscribe, getOfflineWindow, getOfflineWindow);
