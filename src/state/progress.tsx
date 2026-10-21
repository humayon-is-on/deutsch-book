import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  content,
  getExercise,
  isAnswerCorrect,
  type Answer,
  type Level,
  type ModuleKey,
} from '@/content';
import type { PlacementResult } from '@/content/placement';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/state/auth';

export type QuizState = {
  answers: Record<string, Answer>;
  /** Index of the question the learner is on, for resuming. */
  position: number;
  completed: boolean;
  score: number;
  bestScore: number;
  attempts: number;
  updatedAt: number;
};

export type Location = {
  href: string;
  title: string;
  level: Level;
  module: ModuleKey;
  at: number;
};

export type Progress = {
  version: 1;
  onboarded: boolean;
  level: Level | null;
  placement?: PlacementResult & { at: number };
  lastLocation?: Location;
  history: Location[];
  grammar: Record<string, { completed: boolean; openedAt: number }>;
  learned: Record<string, number>;
  bookmarks: Record<string, number>;
  vocabPosition: Record<string, number>;
  quizzes: Record<string, QuizState>;
  /** Question id → time it was last answered wrong. Cleared when answered right. */
  mistakes: Record<string, number>;
  textsRead: Record<string, number>;
  settings: { showEnglish: boolean };
  updatedAt: number;
};

export type SyncStatus = 'local' | 'saving' | 'synced' | 'offline';

const STORAGE_KEY = 'deutschbook.progress.v1';
const HISTORY_LIMIT = 20;

const initialProgress = (): Progress => ({
  version: 1,
  onboarded: false,
  level: null,
  history: [],
  grammar: {},
  learned: {},
  bookmarks: {},
  vocabPosition: {},
  quizzes: {},
  mistakes: {},
  textsRead: {},
  settings: { showEnglish: true },
  updatedAt: 0,
});

type Actions = {
  chooseLevel: (level: Level) => void;
  savePlacement: (result: PlacementResult) => void;
  visit: (loc: Omit<Location, 'at'>) => void;
  openGrammar: (id: string) => void;
  completeGrammar: (id: string) => void;
  toggleLearned: (entryId: string) => void;
  toggleBookmark: (entryId: string) => void;
  setVocabPosition: (topicId: string, index: number) => void;
  answerQuestion: (exerciseId: string, questionId: string, answer: Answer, position: number) => void;
  setQuizPosition: (exerciseId: string, position: number) => void;
  finishQuiz: (exerciseId: string) => void;
  restartQuiz: (exerciseId: string) => void;
  /** Revision answers don't belong to a quiz; they only update the mistakes list. */
  recordRevision: (questionId: string, correct: boolean) => void;
  markTextRead: (id: string) => void;
  setShowEnglish: (v: boolean) => void;
  resetAll: () => void;
};

type ProgressValue = {
  progress: Progress;
  loaded: boolean;
  syncStatus: SyncStatus;
} & Actions;

const ProgressContext = createContext<ProgressValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [progress, setProgress] = useState<Progress>(initialProgress);
  const [loaded, setLoaded] = useState(false);
  // Last server write we know about. Status is derived from it, not stored.
  const [synced, setSynced] = useState({ at: 0, ok: true });
  const remoteReady = useRef(false);
  const userId = session?.user.id;

  // Load from device storage once.
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setProgress({ ...initialProgress(), ...JSON.parse(raw) });
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  // Persist to device on every change.
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress)).catch(() => {});
  }, [progress, loaded]);

  // On sign-in, reconcile with the server copy. Newest copy wins.
  useEffect(() => {
    remoteReady.current = false;
    if (!supabase || !userId || !loaded) return;
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('user_progress')
        .select('data, updated_at')
        .eq('user_id', userId)
        .maybeSingle();
      if (cancelled) return;
      if (error) {
        setSynced({ at: 0, ok: false });
        return;
      }
      const remote = data?.data as Progress | undefined;
      remoteReady.current = true;
      setProgress((local) => {
        if (remote && remote.updatedAt > local.updatedAt) {
          setSynced({ at: remote.updatedAt, ok: true });
          return { ...initialProgress(), ...remote };
        }
        // Local is newer: bump updatedAt so the push effect uploads it.
        return { ...local, updatedAt: Math.max(local.updatedAt, Date.now()) };
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, loaded]);

  // Push changes to the server, debounced.
  useEffect(() => {
    if (!supabase || !userId || !remoteReady.current) return;
    const t = setTimeout(async () => {
      const { error } = await supabase!.from('user_progress').upsert({
        user_id: userId,
        data: progress,
        updated_at: new Date(progress.updatedAt || Date.now()).toISOString(),
      });
      setSynced({ at: progress.updatedAt, ok: !error });
    }, 1200);
    return () => clearTimeout(t);
  }, [progress, userId]);

  const update = useCallback((fn: (p: Progress) => Progress) => {
    setProgress((p) => ({ ...fn(p), updatedAt: Date.now() }));
  }, []);

  const actions = useMemo<Actions>(
    () => ({
      chooseLevel: (level) => update((p) => ({ ...p, level, onboarded: true })),
      savePlacement: (result) => update((p) => ({ ...p, placement: { ...result, at: Date.now() } })),
      visit: (loc) =>
        update((p) => {
          const entry = { ...loc, at: Date.now() };
          const history = [entry, ...p.history.filter((h) => h.href !== loc.href)].slice(0, HISTORY_LIMIT);
          return { ...p, lastLocation: entry, history };
        }),
      openGrammar: (id) =>
        update((p) => ({
          ...p,
          grammar: { ...p.grammar, [id]: { completed: p.grammar[id]?.completed ?? false, openedAt: Date.now() } },
        })),
      completeGrammar: (id) =>
        update((p) => ({ ...p, grammar: { ...p.grammar, [id]: { completed: true, openedAt: Date.now() } } })),
      toggleLearned: (entryId) => update((p) => ({ ...p, learned: toggle(p.learned, entryId) })),
      toggleBookmark: (entryId) => update((p) => ({ ...p, bookmarks: toggle(p.bookmarks, entryId) })),
      setVocabPosition: (topicId, index) =>
        update((p) => ({ ...p, vocabPosition: { ...p.vocabPosition, [topicId]: index } })),
      answerQuestion: (exerciseId, questionId, answer, position) =>
        update((p) => {
          const ex = getExercise(exerciseId);
          const q = ex?.questions.find((x) => x.id === questionId);
          const prev = p.quizzes[exerciseId] ?? emptyQuiz();
          const quiz = { ...prev, answers: { ...prev.answers, [questionId]: answer }, position, updatedAt: Date.now() };
          const mistakes = { ...p.mistakes };
          if (q && isAnswerCorrect(q, answer)) delete mistakes[questionId];
          else mistakes[questionId] = Date.now();
          return { ...p, quizzes: { ...p.quizzes, [exerciseId]: quiz }, mistakes };
        }),
      setQuizPosition: (exerciseId, position) =>
        update((p) => ({
          ...p,
          quizzes: { ...p.quizzes, [exerciseId]: { ...(p.quizzes[exerciseId] ?? emptyQuiz()), position } },
        })),
      finishQuiz: (exerciseId) =>
        update((p) => {
          const ex = getExercise(exerciseId);
          const prev = p.quizzes[exerciseId] ?? emptyQuiz();
          const score = ex ? ex.questions.filter((q) => isAnswerCorrect(q, prev.answers[q.id])).length : 0;
          return {
            ...p,
            quizzes: {
              ...p.quizzes,
              [exerciseId]: {
                ...prev,
                completed: true,
                score,
                bestScore: Math.max(prev.bestScore, score),
                attempts: prev.attempts + 1,
                updatedAt: Date.now(),
              },
            },
          };
        }),
      restartQuiz: (exerciseId) =>
        update((p) => {
          const prev = p.quizzes[exerciseId] ?? emptyQuiz();
          return {
            ...p,
            quizzes: { ...p.quizzes, [exerciseId]: { ...prev, answers: {}, position: 0, completed: false, score: 0 } },
          };
        }),
      recordRevision: (questionId, correct) =>
        update((p) => {
          const mistakes = { ...p.mistakes };
          if (correct) delete mistakes[questionId];
          else mistakes[questionId] = Date.now();
          return { ...p, mistakes };
        }),
      markTextRead: (id) => update((p) => ({ ...p, textsRead: { ...p.textsRead, [id]: Date.now() } })),
      setShowEnglish: (v) => update((p) => ({ ...p, settings: { ...p.settings, showEnglish: v } })),
      resetAll: () => update(() => initialProgress()),
    }),
    [update],
  );

  const syncStatus: SyncStatus =
    !supabase || !userId ? 'local' : !synced.ok ? 'offline' : synced.at >= progress.updatedAt ? 'synced' : 'saving';

  const value = useMemo(() => ({ progress, loaded, syncStatus, ...actions }), [progress, loaded, syncStatus, actions]);
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
}

function emptyQuiz(): QuizState {
  return { answers: {}, position: 0, completed: false, score: 0, bestScore: 0, attempts: 0, updatedAt: Date.now() };
}

function toggle(set: Record<string, number>, id: string) {
  const next = { ...set };
  if (next[id]) delete next[id];
  else next[id] = Date.now();
  return next;
}

export type ModuleProgress = { done: number; total: number };

/** Completion per module for one level. */
export function levelProgress(p: Progress, level: Level): Record<ModuleKey, ModuleProgress> & { overall: number } {
  const c = content[level];
  const vocabIds = c.vocabulary.flatMap((t) => t.entries.map((e) => e.id));
  const texts = (m: string) => c.texts.filter((t) => t.module === m);
  const modules: Record<ModuleKey, ModuleProgress> = {
    grammar: { done: c.grammar.filter((g) => p.grammar[g.id]?.completed).length, total: c.grammar.length },
    vocabulary: { done: vocabIds.filter((id) => p.learned[id]).length, total: vocabIds.length },
    mcq: { done: c.exercises.filter((e) => p.quizzes[e.id]?.completed).length, total: c.exercises.length },
    qa: { done: texts('qa').filter((t) => p.textsRead[t.id]).length, total: texts('qa').length },
    emails: { done: texts('emails').filter((t) => p.textsRead[t.id]).length, total: texts('emails').length },
    dialogues: { done: texts('dialogues').filter((t) => p.textsRead[t.id]).length, total: texts('dialogues').length },
  };
  // Each module counts equally so a big vocabulary list doesn't dominate.
  const ratios = Object.values(modules).map((m) => (m.total ? m.done / m.total : 0));
  const overall = ratios.reduce((s, r) => s + r, 0) / ratios.length;
  return { ...modules, overall };
}
