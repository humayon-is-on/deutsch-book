import * as Updates from 'expo-updates';
import { useEffect } from 'react';

/** Longest wait after launch for which a new version is still applied straight away. */
const APPLY_WITHIN_MS = 10_000;

/**
 * The installed app downloads a new version at launch, but by default only
 * shows it on the launch after. This applies it right away when it arrives
 * within a few seconds of opening, before the learner has done anything.
 * A later download is applied on the next launch as usual.
 */
export function useApplyUpdateOnLaunch() {
  useEffect(() => {
    if (__DEV__ || !Updates.isEnabled) return;
    const started = Date.now();
    (async () => {
      try {
        const check = await Updates.checkForUpdateAsync();
        if (!check.isAvailable) return;
        await Updates.fetchUpdateAsync();
        if (Date.now() - started < APPLY_WITHIN_MS) await Updates.reloadAsync();
      } catch {
        // Offline or the update server is unreachable: keep the current version.
      }
    })();
  }, []);
}
