/**
 * Practice hearts ("lives"): the learner has up to five, shared by every
 * practice card. Each wrong answer costs one; at zero the card stops until a
 * heart comes back, from a rewarded ad or on its own after a short wait.
 */

export const LIVES_MAX = 5;
/** Time for one heart to come back on its own. */
export const LIVES_REFILL_MS = 2 * 60 * 1000;

/** Hearts as of `at`; stars refilled since then are counted when read. */
export type Lives = { count: number; at: number };

const FULL: Lives = { count: LIVES_MAX, at: 0 };

/** Hearts right now, and when the next one comes back (null when full). */
export function currentLives(lives: Lives | undefined, now: number): { count: number; nextAt: number | null; base: Lives } {
  const l = lives ?? FULL;
  if (l.count >= LIVES_MAX) return { count: LIVES_MAX, nextAt: null, base: l };
  const refilled = Math.floor((now - l.at) / LIVES_REFILL_MS);
  const count = Math.min(LIVES_MAX, l.count + Math.max(0, refilled));
  if (count >= LIVES_MAX) return { count, nextAt: null, base: { count, at: now } };
  // Keep the time already waited towards the next heart.
  const base = { count, at: l.at + Math.max(0, refilled) * LIVES_REFILL_MS };
  return { count, nextAt: base.at + LIVES_REFILL_MS, base };
}

/** Hearts after `change` (−1 for a mistake, +1 for an ad), counted from now. */
export function changeLives(lives: Lives | undefined, change: number, now: number): Lives {
  const { count, base } = currentLives(lives, now);
  const next = Math.max(0, Math.min(LIVES_MAX, count + change));
  // Leaving a full row starts the refill clock now.
  return { count: next, at: count >= LIVES_MAX ? now : base.at };
}
