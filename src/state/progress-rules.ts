import { content, getExercise, LEVELS, MODULES, type Level, type ModuleKey } from '@/content';
import { getTopic, passesTopicTest, previousTopic, topicsFor } from '@/content/topics';
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
    Object.keys(p.topicTests).length > 0
  );
}

export type ModuleProgress = { done: number; total: number };

/**
 * A topic is finished once its end test is passed. An exercise is its own
 * test, so it is finished once its best score reaches the pass mark.
 */
export function topicDone(p: Progress, topicId: string): boolean {
  const topic = getTopic(topicId);
  if (topic?.module === 'mcq') {
    const quiz = p.quizzes[topicId];
    return !!quiz && passesTopicTest(quiz.bestScore, getExercise(topicId)?.questions.length ?? 0);
  }
  return !!p.topicTests[topicId]?.passed;
}

/**
 * Topics open in order inside their module: the first always, each next one
 * after the one before is finished. A topic already finished stays open, so
 * a topic inserted earlier in the list later doesn't lock what was passed.
 */
export function topicUnlocked(p: Progress, topicId: string): boolean {
  const prev = previousTopic(topicId);
  return !prev || topicDone(p, prev.id) || topicDone(p, topicId);
}

/** Completion per module for one level, counted in finished topics. */
export function levelProgress(
  p: Progress,
  level: Level,
): Record<ModuleKey, ModuleProgress> & { overall: number; quizScore: number; complete: boolean; readyToMoveUp: boolean } {
  const c = content[level];
  const modules = Object.fromEntries(
    MODULES.map((m) => {
      const topics = topicsFor(level, m);
      return [m, { done: topics.filter((t) => topicDone(p, t.id)).length, total: topics.length }];
    }),
  ) as Record<ModuleKey, ModuleProgress>;
  // Each module counts equally so a module with many topics doesn't dominate.
  const ratios = Object.values(modules).map((m) => (m.total ? m.done / m.total : 0));
  const overall = ratios.reduce((s, r) => s + r, 0) / ratios.length;
  // Best score of every exercise in the level, unfinished ones counting as zero.
  const questions = c.exercises.reduce((s, e) => s + e.questions.length, 0);
  const best = c.exercises.reduce((s, e) => s + (p.quizzes[e.id]?.bestScore ?? 0), 0);
  const quizScore = questions ? best / questions : 1;
  return { ...modules, overall, quizScore, complete: overall >= 1, readyToMoveUp: overall >= 1 && quizScore >= LEVEL_UP_SCORE };
}

export function nextLevel(level: Level): Level | null {
  const i = LEVELS.indexOf(level);
  return LEVELS[i + 1] ?? null;
}
