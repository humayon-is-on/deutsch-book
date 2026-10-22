import { useSyncExternalStore } from 'react';

import type { Level, LevelIndex, ModuleKey, TopicSummary } from '@/content/types';

/**
 * The current level's table of contents, held in memory. Screens read it with
 * `useLevelIndex` and hand it to the topic and progress helpers, so they
 * re-render (and recompute) when it changes.
 */

export type IndexEntry = { summary: TopicSummary; module: ModuleKey; position: number; list: TopicSummary[] };

type Lookup = { entries: Map<string, IndexEntry>; questionOwners: Map<string, string>; wordOwners: Map<string, string> };

const lookups = new WeakMap<LevelIndex, Lookup>();

/** Lookup tables for an index, built once per index. */
function lookup(index: LevelIndex): Lookup {
  let l = lookups.get(index);
  if (l) return l;
  l = { entries: new Map(), questionOwners: new Map(), wordOwners: new Map() };
  for (const [module, list] of Object.entries(index.modules) as [ModuleKey, TopicSummary[]][]) {
    list.forEach((summary, position) => {
      l!.entries.set(summary.id, { summary, module, position, list });
      summary.questionIds?.forEach((q) => l!.questionOwners.set(q, summary.id));
      summary.wordIds?.forEach((w) => l!.wordOwners.set(w, summary.id));
    });
  }
  lookups.set(index, l);
  return l;
}

export const indexEntry = (index: LevelIndex | null, topicId: string) => (index ? lookup(index).entries.get(topicId) : undefined);
/** The exercise a question belongs to. */
export const exerciseOfQuestion = (index: LevelIndex | null, questionId: string) =>
  index ? lookup(index).questionOwners.get(questionId) : undefined;
/** The vocabulary topic a word belongs to. */
export const topicOfWord = (index: LevelIndex | null, wordId: string) => (index ? lookup(index).wordOwners.get(wordId) : undefined);

let current: LevelIndex | null = null;
const listeners = new Set<() => void>();

export function setLevelIndex(index: LevelIndex | null) {
  if (index === current) return;
  current = index;
  listeners.forEach((l) => l());
}

export const getLevelIndex = () => current;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * The table of contents for screens. With `level`, it's null until that
 * level's contents are loaded (for example right after switching level).
 */
export function useLevelIndex(level?: Level | null) {
  const index = useSyncExternalStore(subscribe, getLevelIndex, getLevelIndex);
  return level === undefined || index?.level === level ? index : null;
}
