import { LEVELS, MODULES, type Level, type ModuleKey } from '@/content';
import type { LevelIndex } from '@/content/types';
import { getTopic, passesTopicTest, practiceCards, previousPracticeCard, previousTopic, questionCount, topicsFor } from '@/content/topics';
import type { AuthStrategy, Progress } from '@/state/progress';

// Pure rules about progress, kept free of React Native so tests can run them.

/** Share of best quiz scores needed across a level before moving up. */
export const LEVEL_UP_SCORE = 0.95;

/**
 * Whether to replace the progress in memory with the account's saved copy.
 * Right after a guest signs in: sign-up keeps the guest's progress, sign-in
 * takes the account's (unless the account has none yet). On app start with a
 * saved session: whichever copy is newer.
 */
export function shouldUseAccountCopy({
  fromGuest,
  strategy,
  local,
  remote,
}: {
  fromGuest: boolean;
  strategy: AuthStrategy;
  local: Pick<Progress, 'updatedAt'>;
  remote?: Pick<Progress, 'updatedAt'>;
}) {
  if (!remote) return false;
  if (fromGuest) return strategy === 'use-account';
  return remote.updatedAt > local.updatedAt;
}

/** True once the learner has done anything worth keeping. */
export function hasActivity(p: Progress) {
  return (
    p.history.length > 0 ||
    Object.keys(p.grammar).length > 0 ||
    Object.keys(p.learned).length > 0 ||
    Object.keys(p.bookmarks).length > 0 ||
    Object.keys(p.quizzes).length > 0 ||
    Object.keys(p.textsRead).length > 0 ||
    Object.keys(p.topicTests).length > 0 ||
    Object.keys(p.practice ?? {}).length > 0
  );
}

export type ModuleProgress = { done: number; total: number };

/**
 * A topic is finished once its end test is passed. An exercise is its own
 * test, so it is finished once its best score reaches the pass mark.
 */
export function topicDone(p: Progress, index: LevelIndex | null, topicId: string): boolean {
  const topic = getTopic(index, topicId);
  if (topic?.module === 'mcq') {
    const quiz = p.quizzes[topicId];
    return !!quiz && passesTopicTest(quiz.bestScore, questionCount(index, topicId));
  }
  return !!p.topicTests[topicId]?.passed;
}

/**
 * Topics open in order inside their module: the first always, each next one
 * after the one before is finished. A topic already finished stays open, so
 * a topic inserted earlier in the list later doesn't lock what was passed.
 */
export function topicUnlocked(p: Progress, index: LevelIndex | null, topicId: string): boolean {
  const prev = previousTopic(index, topicId);
  return !prev || topicDone(p, index, prev.id) || topicDone(p, index, topicId);
}

/** A practice card opens once the card before it has at least one star. */
export function practiceUnlocked(p: Progress, index: LevelIndex | null, cardId: string): boolean {
  const prev = previousPracticeCard(index, cardId);
  return !prev || (p.practice[prev.id]?.stars ?? 0) > 0 || (p.practice[cardId]?.stars ?? 0) > 0;
}

/** Share of the Learn modules (all combined) to finish before the level test opens. */
export const EXAM_LEARN_SHARE = 0.6;

/** Whether the level test still waits for more Learn progress, even with every practice card starred. */
export function examNeedsLearning(p: Progress, index: LevelIndex | null): boolean {
  return levelProgress(p, index).overall < EXAM_LEARN_SHARE;
}

/** Words learned: every word of the vocabulary topics whose test is passed. */
export function learnedWordCount(p: Progress, index: LevelIndex | null): number {
  return topicsFor(index, 'vocabulary')
    .filter((t) => topicDone(p, index, t.id))
    .reduce((n, t) => n + (t.summary.wordIds?.length ?? 0), 0);
}

/** Completion per module for the level of `index`, counted in finished topics. */
export function levelProgress(
  p: Progress,
  index: LevelIndex | null,
): Record<ModuleKey, ModuleProgress> & { overall: number; quizScore: number; complete: boolean; readyToMoveUp: boolean } {
  const modules = Object.fromEntries(
    MODULES.map((m) => {
      const topics = topicsFor(index, m);
      return [m, { done: topics.filter((t) => topicDone(p, index, t.id)).length, total: topics.length }];
    }),
  ) as Record<ModuleKey, ModuleProgress>;
  // Each module counts equally so a module with many topics doesn't dominate.
  const ratios = Object.values(modules).map((m) => (m.total ? m.done / m.total : 0));
  const overall = ratios.reduce((s, r) => s + r, 0) / ratios.length;
  // Best score of every exercise in the level, unfinished ones counting as zero.
  const exercises = topicsFor(index, 'mcq');
  const questions = exercises.reduce((s, e) => s + questionCount(index, e.id), 0);
  const best = exercises.reduce((s, e) => s + (p.quizzes[e.id]?.bestScore ?? 0), 0);
  const quizScore = questions ? best / questions : 1;
  return { ...modules, overall, quizScore, complete: overall >= 1, readyToMoveUp: overall >= 1 && quizScore >= LEVEL_UP_SCORE };
}

/** Topics ahead in each module that are fetched before they're opened. */
const AHEAD = 2;
/** Recently opened topics kept on the device besides the ones ahead. */
const RECENT = 5;

/**
 * The topics worth keeping on the device: in each module the current topic
 * (the first one not finished) and the next two, plus the last few opened.
 */
export function topicsToKeep(p: Progress, index: LevelIndex): string[] {
  const ahead = MODULES.flatMap((m) => {
    const topics = topicsFor(index, m);
    const current = topics.findIndex((t) => !topicDone(p, index, t.id));
    return current < 0 ? [] : topics.slice(current, current + 1 + AHEAD).map((t) => t.id);
  });
  const cards = practiceCards(index);
  const nextCard = cards.findIndex((c) => !(p.practice[c.id]?.stars ?? 0));
  const practice = nextCard < 0 ? [] : cards.slice(nextCard, nextCard + 1 + AHEAD).map((c) => c.id);
  const recent = p.history
    .filter((h) => h.level === index.level)
    .slice(0, RECENT)
    .map((h) => h.href.split('/').pop() ?? '');
  return [...new Set([...ahead, ...practice, ...recent])].filter((id) => getTopic(index, id) || cards.some((c) => c.id === id));
}

export function nextLevel(level: Level): Level | null {
  const i = LEVELS.indexOf(level);
  return LEVELS[i + 1] ?? null;
}
