import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

import { topicsToKeep, useProgress } from '@/state/progress';
import { useLevelIndex } from './store';
import { keepOnly, loadLevel, type LoadState } from './sync';

type ContentValue = { state: LoadState; retry: () => void };

const ContentContext = createContext<ContentValue>({ state: 'loading', retry: () => {} });

/** Wait after a change in progress before fetching ahead, so a burst of answers triggers one run. */
const PREFETCH_DELAY = 2000;

/**
 * Loads the learner's level and keeps the topics they need next on the
 * device: in each module the current topic and the two after it.
 */
export function ContentProvider({ children }: { children: ReactNode }) {
  const { progress } = useProgress();
  const level = progress.level;
  const index = useLevelIndex(level);
  const [attempt, setAttempt] = useState(0);
  // The outcome is tagged with the load it answers, so a new load shows as loading at once.
  const request = `${level}|${attempt}`;
  const [result, setResult] = useState<{ request: string; state: LoadState }>();
  const state: LoadState = result?.request === request ? result.state : 'loading';

  useEffect(() => {
    if (!level) return;
    let cancelled = false;
    loadLevel(level).then((s) => !cancelled && setResult({ request, state: s }));
    return () => {
      cancelled = true;
    };
  }, [level, request]);

  useEffect(() => {
    if (state !== 'ready' || !index) return;
    const timer = setTimeout(() => keepOnly(index, topicsToKeep(progress, index)), PREFETCH_DELAY);
    return () => clearTimeout(timer);
  }, [state, index, progress]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return <ContentContext.Provider value={{ state, retry }}>{children}</ContentContext.Provider>;
}

export const useContentState = () => useContext(ContentContext);
