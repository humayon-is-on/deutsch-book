import { useCallback, useEffect, useState } from 'react';

import type { TopicFile } from '@/content/types';
import { indexEntry, practiceEntry, useLevelIndex } from './store';
import { loadTopic } from './sync';

export type TopicLoad =
  | { status: 'loading' }
  | { status: 'ready'; file: TopicFile }
  | { status: 'missing' }
  | { status: 'offline'; retry: () => void };

/** One topic's content, loaded from the device or downloaded when it is opened. */
export function useTopicFile(id: string | undefined): TopicLoad {
  const index = useLevelIndex();
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  // Results are tagged with the request they answer, so a stale one is never shown.
  const request = `${id}|${index?.version}|${attempt}`;
  const [result, setResult] = useState<{ request: string; file?: TopicFile }>();
  const known = !!id && !!(indexEntry(index, id) ?? practiceEntry(index, id));

  useEffect(() => {
    if (!known) return;
    let cancelled = false;
    loadTopic(index, id!).then(
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

/** Several topics at once (revision, saved words). Topics that fail to load are left out. */
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
