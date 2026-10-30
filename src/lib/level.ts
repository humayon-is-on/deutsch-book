import type { Level } from '@/content';
import { hasActivity, type Progress } from '@/state/progress';

/** A level change waiting for the learner's answer in the level-change popup. */
export type LevelChangeRequest = {
  from: Level | null;
  to: Level;
  /** Earned by finishing the level (all topics, or the level test): no code needed. */
  earned: boolean;
  /** Something done at the current level, so the change wipes progress: warn (and maybe ask a code). */
  hasProgress: boolean;
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
 * Asks before every level change, in the app's own popup (see
 * components/level-change). With progress at the current level it also warns
 * that the progress goes, and a signed-in learner who has not finished the
 * level types a code sent to their email. Resolves true to go ahead.
 */
export function confirmLevelChange(p: Progress, to: Level, { earned = false } = {}) {
  if (!p.onboarded || p.level === to) return Promise.resolve(true);
  return new Promise<boolean>((resolve) => {
    request?.resolve(false);
    request = { from: p.level, to, earned, hasProgress: hasActivity(p), resolve };
    listeners.forEach((l) => l());
  });
}
