import { useEffect, useSyncExternalStore } from 'react';

/**
 * Whether a topic test, practice card or the level test is under way
 * (opened and not finished), so reminders can wait until it is done.
 */
let running = 0;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

/** Call in a test screen: true while its questions are still being answered. */
export function useMarkTestRunning(active: boolean) {
  useEffect(() => {
    if (!active) return;
    running += 1;
    emit();
    return () => {
      running -= 1;
      emit();
    };
  }, [active]);
}

export function useTestRunning() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => running > 0,
    () => false,
  );
}
