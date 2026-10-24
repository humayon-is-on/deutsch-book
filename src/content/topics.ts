import { indexEntry, practiceEntry } from '@/services/content/store';
import type { Level, LevelIndex, ModuleKey, PracticeKind, Translated, TopicSummary } from './types';

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
  models: 'read',
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
  // Older contents files may not have every module yet.
  return index ? (index.modules[module] ?? []).map((s) => toTopic(index.level, module, s)) : [];
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

/*
 * The practice ladder: cards of mixed kinds, each opened by earning at least
 * one star on the card before it.
 */

export type PracticeCard = { id: string; kind: PracticeKind; title: Translated; href: string; questions: number };

/** Score shares for 1, 2 and 3 stars. */
export const STAR_STEPS = [TOPIC_PASS, 0.75, 0.9];

/** Share of the level test to get right to move up a level. */
export const EXAM_PASS = 0.75;

export const passesExam = (score: number, total: number) => total > 0 && score / total >= EXAM_PASS;

export const practiceStars = (score: number, total: number) =>
  total > 0 ? STAR_STEPS.filter((step) => score / total >= step).length : 0;

export function practiceCards(index: Index): PracticeCard[] {
  return (index?.practice ?? []).map((s) => ({
    id: s.id,
    kind: s.kind,
    title: s.title,
    href: `/practice/${s.id}`,
    questions: s.questionIds?.length ?? 0,
  }));
}

export const getPracticeCard = (index: Index, id: string) => practiceCards(index)[practiceEntry(index, id)?.position ?? -1];

/** The card before this one on the ladder, if any. */
export function previousPracticeCard(index: Index, id: string) {
  const position = practiceEntry(index, id)?.position;
  return position ? practiceCards(index)[position - 1] : undefined;
}
