import { indexEntry } from '@/services/content/store';
import type { Level, LevelIndex, ModuleKey, Translated, TopicSummary } from './types';

/**
 * Topics are the items inside a module (a grammar lesson, a word topic, an
 * exercise, a text). Inside a module they unlock one by one: a topic opens
 * once the topic before it is finished, and a topic is finished by passing
 * the short test at its end. Every helper takes the level's table of
 * contents (null while it loads, which reads as an empty level), so screens
 * recompute when a new one arrives.
 */
export type Topic = {
  id: string;
  level: Level;
  module: ModuleKey;
  title: Translated;
  subtitle?: string;
  href: string;
  summary: TopicSummary;
};

/** Share of a topic test that must be right to finish the topic. */
export const TOPIC_PASS = 0.6;

const SCREEN: Record<ModuleKey, string> = {
  grammar: 'lesson',
  vocabulary: 'vocab',
  mcq: 'quiz',
  emails: 'read',
  dialogues: 'read',
};

const toTopic = (level: Level, module: ModuleKey, s: TopicSummary): Topic => ({
  id: s.id,
  level,
  module,
  title: s.title,
  subtitle: s.subtitle,
  href: `/${SCREEN[module]}/${s.id}`,
  summary: s,
});

type Index = LevelIndex | null;

export function topicsFor(index: Index, module: ModuleKey): Topic[] {
  return index ? index.modules[module].map((s) => toTopic(index.level, module, s)) : [];
}

export function getTopic(index: Index, id: string): Topic | undefined {
  const entry = indexEntry(index, id);
  return entry && index ? toTopic(index.level, entry.module, entry.summary) : undefined;
}

function neighbour(index: Index, id: string, step: number): Topic | undefined {
  const entry = indexEntry(index, id);
  const s = entry?.list[entry.position + step];
  return entry && s && index ? toTopic(index.level, entry.module, s) : undefined;
}

/** The topic that comes right after this one in its module, if any. */
export const nextTopic = (index: Index, id: string) => neighbour(index, id, 1);

/** The topic that must be finished before this one opens, if any. */
export const previousTopic = (index: Index, id: string) => (indexEntry(index, id)?.position ? neighbour(index, id, -1) : undefined);

/** Questions in an exercise, known before it is downloaded. */
export const questionCount = (index: Index, exerciseId: string) => indexEntry(index, exerciseId)?.summary.questionIds?.length ?? 0;

export const passesTopicTest = (score: number, total: number) => total > 0 && score / total >= TOPIC_PASS;
