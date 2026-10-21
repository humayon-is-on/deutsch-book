import type { Level } from '@/content';
import { confirm } from '@/lib/confirm';
import { hasActivity, type Progress } from '@/state/progress';

/** Asks before a level change wipes the learner's progress. Resolves true to go ahead. */
export function confirmLevelChange(p: Progress, to: Level) {
  if (!p.onboarded || p.level === to || !hasActivity(p)) return Promise.resolve(true);
  return confirm(
    `${to} লেভেলে যাবেন?`,
    `লেভেল বদলালে ${p.level} লেভেলের সব অগ্রগতি মুছে যাবে এবং ${to} একদম শুরু থেকে শুরু হবে।`,
    'লেভেল বদলান',
  );
}
