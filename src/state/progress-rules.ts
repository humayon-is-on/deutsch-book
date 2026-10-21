import { content, LEVELS, type Level, type ModuleKey } from '@/content';
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
    Object.keys(p.textsRead).length > 0
  );
}

export type ModuleProgress = { done: number; total: number };

/** Completion per module for one level. */
export function levelProgress(
  p: Progress,
  level: Level,
): Record<ModuleKey, ModuleProgress> & { overall: number; quizScore: number; complete: boolean; readyToMoveUp: boolean } {
  const c = content[level];
  const vocabIds = c.vocabulary.flatMap((t) => t.entries.map((e) => e.id));
  const texts = (m: string) => c.texts.filter((t) => t.module === m);
  const modules: Record<ModuleKey, ModuleProgress> = {
    grammar: { done: c.grammar.filter((g) => p.grammar[g.id]?.completed).length, total: c.grammar.length },
    vocabulary: { done: vocabIds.filter((id) => p.learned[id]).length, total: vocabIds.length },
    mcq: { done: c.exercises.filter((e) => p.quizzes[e.id]?.completed).length, total: c.exercises.length },
    qa: { done: texts('qa').filter((t) => p.textsRead[t.id]).length, total: texts('qa').length },
    emails: { done: texts('emails').filter((t) => p.textsRead[t.id]).length, total: texts('emails').length },
    dialogues: { done: texts('dialogues').filter((t) => p.textsRead[t.id]).length, total: texts('dialogues').length },
  };
  // Each module counts equally so a big vocabulary list doesn't dominate.
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
