import { useCallback, useEffect, useState } from 'react';

import type { TopicFile } from '@/content/types';
import { isOnline, useOnline } from '@/services/network';
import { getOfflineWindow, openOffline } from './offline';
import { indexEntry, practiceEntry, useLevelIndex } from './store';
import { loadTopic } from './sync';

export type TopicLoad =
  | { status: 'loading' }
  | { status: 'ready'; file: TopicFile }
  | { status: 'missing' }
  | { status: 'offline'; retry: () => void };

/**
 * One topic's content, loaded from the device or downloaded when it is opened.
 * Offline, only what offline mode allows opens; the rest shows as 'offline'
 * and loads by itself once the connection is back. A topic already open stays
 * open when the connection drops.
 */
export function useTopicFile(id: string | undefined): TopicLoad {
  const index = useLevelIndex();
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  // Results are tagged with the request they answer, so a stale one is never shown.
  const request = `${id}|${index?.version}|${attempt}`;
  const [result, setResult] = useState<{ request: string; file?: TopicFile }>();
  const known = !!id && !!(indexEntry(index, id) ?? practiceEntry(index, id));

  const online = useOnline();
  const failed = result?.request === request && !result.file;
  const [wasOnline, setWasOnline] = useState(online);
  if (online !== wasOnline) {
    setWasOnline(online);
    if (online && failed) setAttempt((n) => n + 1);
  }

  useEffect(() => {
    if (!known) return;
    let cancelled = false;
    const blocked = !isOnline() && !openOffline(getOfflineWindow(), id!);
    (blocked ? Promise.reject(new Error('Needs internet')) : loadTopic(index, id!)).then(
      (file) => !cancelled && setResult({ request, file }),
      () => !cancelled && setResult({ request }),
    );
    return () => {
      cancelled = true;
    };
  }, [known, index, id, request]);

  if (!index) return { status: 'loading' };
  if (!known) return { status: 'missing' };
  if (result?.request !== request) return { status: 'loading' };
  return result.file ? { status: 'ready', file: result.file } : { status: 'offline', retry };
}

/** Several topics at once (saved words). Topics that fail to load are left out. */
export function useTopicFiles(ids: string[]): { loading: boolean; files: TopicFile[] } {
  const index = useLevelIndex();
  const request = `${index?.version}|${ids.join(',')}`;
  const [result, setResult] = useState<{ request: string; files: TopicFile[] }>();

  useEffect(() => {
    if (!index) return;
    let cancelled = false;
    const wanted = request.split('|')[1].split(',').filter(Boolean);
    Promise.all(wanted.map((id) => loadTopic(index, id).catch(() => null))).then(
      (files) => !cancelled && setResult({ request, files: files.filter((f): f is TopicFile => !!f) }),
    );
    return () => {
      cancelled = true;
    };
  }, [index, request]);

  const ready = result?.request === request;
  return { loading: !ready, files: ready ? result.files : [] };
}
