import { useSyncExternalStore } from 'react';
import { AppState, Platform } from 'react-native';

import { CONTENT_URL } from '@/services/content/remote';

/**
 * Whether the app is online, checked against the course server. Without a
 * connection the app keeps working in offline mode (see `offline.ts`); this
 * store only says which mode it is in.
 */

/** How often the app checks the connection while it is open. */
const CHECK_EVERY_MS = 15 * 1000;
/** A check that takes longer than this counts as no connection. */
const CHECK_TIMEOUT_MS = 8 * 1000;

/** True when the course server answers. */
async function reachServer() {
  if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.onLine === false) return false;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), CHECK_TIMEOUT_MS);
  try {
    const res = await fetch(`${CONTENT_URL}manifest.json?t=${Date.now()}`, { cache: 'no-store', signal: ctrl.signal });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

// Online until a check says otherwise, so nothing looks locked while the first check runs.
let online = true;
const listeners = new Set<() => void>();

function set(value: boolean) {
  if (value === online) return;
  online = value;
  listeners.forEach((l) => l());
}

let running: Promise<boolean> | null = null;

/** Checks the connection now; resolves to whether the app is online. */
export function checkConnection(): Promise<boolean> {
  running ??= reachServer()
    .then((ok) => {
      set(ok);
      return ok;
    })
    .finally(() => {
      running = null;
    });
  return running;
}

let started = false;

/** Starts watching the connection: at once, every few seconds, and when the app or browser says it changed. */
function start() {
  if (started) return;
  started = true;
  void checkConnection();
  setInterval(checkConnection, CHECK_EVERY_MS);
  AppState.addEventListener('change', (s) => s === 'active' && checkConnection());
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.addEventListener('offline', () => set(false));
    window.addEventListener('online', () => void checkConnection());
  }
}

export const isOnline = () => online;

function subscribe(listener: () => void) {
  start();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Whether the app is online; screens re-render when it changes. */
export const useOnline = () => useSyncExternalStore(subscribe, isOnline, isOnline);
