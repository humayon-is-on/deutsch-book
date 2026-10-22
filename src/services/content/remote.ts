import type { ContentManifest, LevelIndex, TopicFile } from '@/content/types';
import { SITE_URL } from '@/lib/site';

/**
 * Where the published course files live. By default next to the web app;
 * set EXPO_PUBLIC_CONTENT_URL to load them from somewhere else (a local
 * build, or later a storage bucket).
 */
export const CONTENT_URL = process.env.EXPO_PUBLIC_CONTENT_URL || `${SITE_URL}content/`;

async function getJson<T>(path: string, fresh = false): Promise<T> {
  // The manifest must never come from a cache; every other file name changes with its content.
  const url = CONTENT_URL + path + (fresh ? `?t=${Date.now()}` : '');
  const res = await fetch(url, fresh ? { cache: 'no-store' } : undefined);
  if (!res.ok) throw new Error(`${res.status} for ${path}`);
  return (await res.json()) as T;
}

export const fetchManifest = () => getJson<ContentManifest>('manifest.json', true);
export const fetchIndex = (path: string) => getJson<LevelIndex>(path);
export const fetchTopicFile = (path: string) => getJson<TopicFile>(path);
