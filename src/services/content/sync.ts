import { CONTENT_SCHEMA, type Level, type LevelIndex, type TopicFile } from '@/content/types';
import { indexEntry, setLevelIndex } from './store';
import { hasFile, prune, readFile, readIndex, writeFile, writeIndex } from './cache';
import { fetchIndex, fetchManifest, fetchTopicFile } from './remote';

/**
 * Loading course content: the level's table of contents on start, single
 * topics when opened, and a few upcoming topics in the background.
 */

export type LoadState = 'loading' | 'ready' | 'offline';

/**
 * Makes `level` the current level: shows its saved table of contents at
 * once, then checks online for a newer one. 'offline' only when there is
 * neither a saved copy nor a connection.
 */
export async function loadLevel(level: Level): Promise<LoadState> {
  const saved = await readIndex(level);
  setLevelIndex(saved?.index ?? null);
  try {
    const manifest = await fetchManifest();
    const path = manifest.levels[level]?.index;
    if (manifest.schema !== CONTENT_SCHEMA || !path) throw new Error('No content for this level');
    if (saved?.path !== path) {
      const index = await fetchIndex(path);
      await writeIndex({ path, index });
      setLevelIndex(index);
    }
    return 'ready';
  } catch {
    return saved ? 'ready' : 'offline';
  }
}

const inFlight = new Map<string, Promise<TopicFile>>();

/** A topic's file, from the device if saved, otherwise downloaded and saved. */
export function loadTopic(index: LevelIndex | null, topicId: string): Promise<TopicFile> {
  const path = indexEntry(index, topicId)?.summary.file;
  if (!path) return Promise.reject(new Error(`Unknown topic ${topicId}`));
  const running = inFlight.get(path);
  if (running) return running;
  const job = (async () => {
    const saved = await readFile(path);
    if (saved) return saved;
    const file = await fetchTopicFile(path);
    await writeFile(path, file);
    return file;
  })().finally(() => inFlight.delete(path));
  inFlight.set(path, job);
  return job;
}

/**
 * Downloads the topics in `wanted` that aren't on the device yet, then
 * deletes saved topics that are no longer wanted. Failures are left for the
 * next run.
 */
export async function keepOnly(index: LevelIndex, wanted: string[]) {
  const paths = new Set<string>();
  for (const id of wanted) {
    const path = indexEntry(index, id)?.summary.file;
    if (!path) continue;
    paths.add(path);
    if (!(await hasFile(path))) await loadTopic(index, id).catch(() => {});
  }
  await prune(index.level, paths);
}
