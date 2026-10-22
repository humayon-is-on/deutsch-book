import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Level, LevelIndex, TopicFile } from '@/content/types';

/**
 * Downloaded course files saved on the device, so they open instantly and
 * work offline. Only the current level's table of contents and a handful of
 * topic files are kept; see `prune`.
 */

const PREFIX = 'deutschbook.content.v1.';
const indexKey = (level: Level) => `${PREFIX}index.${level}`;
const FILE_PREFIX = `${PREFIX}file.`;
const fileKey = (path: string) => FILE_PREFIX + path;

/** Files already read this session, so screens don't wait on storage twice. */
const memory = new Map<string, TopicFile>();

export type SavedIndex = { path: string; index: LevelIndex };

async function readJson<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export const readIndex = (level: Level) => readJson<SavedIndex>(indexKey(level));

export function writeIndex(saved: SavedIndex) {
  return AsyncStorage.setItem(indexKey(saved.index.level), JSON.stringify(saved)).catch(() => {});
}

export async function readFile(path: string): Promise<TopicFile | null> {
  const hit = memory.get(path);
  if (hit) return hit;
  const file = await readJson<TopicFile>(fileKey(path));
  if (file) memory.set(path, file);
  return file;
}

export async function writeFile(path: string, file: TopicFile) {
  memory.set(path, file);
  await AsyncStorage.setItem(fileKey(path), JSON.stringify(file)).catch(() => {});
}

export const hasFile = async (path: string) => memory.has(path) || (await AsyncStorage.getItem(fileKey(path)).catch(() => null)) !== null;

/** Deletes every saved topic file not in `keep`, and the tables of contents of other levels. */
export async function prune(level: Level, keep: Set<string>) {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const drop = keys.filter(
      (k) =>
        (k.startsWith(FILE_PREFIX) && !keep.has(k.slice(FILE_PREFIX.length))) ||
        (k.startsWith(`${PREFIX}index.`) && k !== indexKey(level)),
    );
    for (const k of drop) if (k.startsWith(FILE_PREFIX)) memory.delete(k.slice(FILE_PREFIX.length));
    if (drop.length) await AsyncStorage.multiRemove(drop);
  } catch {}
}
