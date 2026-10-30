import type { Level } from '@/content';
import { hasActivity, type Progress } from '@/state/progress';

/** A level change waiting for the learner's answer in the level-change popup. */
export type LevelChangeRequest = {
  from: Level | null;
  to: Level;
  /** Earned by finishing the level (all topics, or the level test): no code needed. */
  earned: boolean;
  resolve: (ok: boolean) => void;
};

let request: LevelChangeRequest | null = null;
const listeners = new Set<() => void>();

export const levelChange = {
  current: () => request,
  subscribe(l: () => void) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
  answer(ok: boolean) {
    request?.resolve(ok);
    request = null;
    listeners.forEach((l) => l());
  },
};

/**
 * Asks before a level change wipes the learner's progress, in the app's own
 * popup (see components/level-change). A signed-in learner who has not
 * finished the level also types a code sent to their email. Resolves true
 * to go ahead.
 */
export function confirmLevelChange(p: Progress, to: Level, { earned = false } = {}) {
  if (!p.onboarded || p.level === to || !hasActivity(p)) return Promise.resolve(true);
  return new Promise<boolean>((resolve) => {
    request?.resolve(false);
    request = { from: p.level, to, earned, resolve };
    listeners.forEach((l) => l());
  });
}
