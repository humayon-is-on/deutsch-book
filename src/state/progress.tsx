import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
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
  isAnswerCorrect,
  MODULES,
  type Exercise,
  type Question,
  type Answer,
  type Level,
  type ModuleKey,
} from '@/content';
import type { PlacementResult } from '@/content/placement';
import { passesTopicTest, practiceStars } from '@/content/topics';
import { changeLives, type Lives } from '@/state/lives';
import { supabase } from '@/lib/supabase';
import { shouldUseAccountCopy } from '@/state/progress-rules';
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
  /** End-of-topic test results by topic id. A passed test finishes the topic. */
  topicTests: Record<string, TopicTestState>;
  /** Practice ladder results by card id. */
  practice: Record<string, PracticeState>;
  /** Practice hearts left (see state/lives); missing means full. */
  lives?: Lives;
  settings: Settings;
  updatedAt: number;
};

export type Settings = {
  showEnglish: boolean;
  /** Chosen avatar's id (see components/avatar). */
  avatar?: number;
  /** Name chosen by the learner; when empty the account's own name is shown. */
  displayName?: string;
};

export type PracticeState = { bestScore: number; total: number; stars: number; attempts: number; updatedAt: number };

export type TopicTestState = { bestScore: number; total: number; passed: boolean; attempts: number; updatedAt: number };

export type SyncStatus = 'guest' | 'local' | 'saving' | 'synced' | 'offline';

/**
 * How a fresh sign-in treats the progress the learner made as a guest.
 * Sign-up keeps it (it becomes the new account's progress); sign-in to an
 * existing account replaces it with the account's saved progress.
 */
export type AuthStrategy = 'keep-guest' | 'use-account';

const GUEST_KEY = 'deutschbook.guest.v1';
const LEGACY_KEY = 'deutschbook.progress.v1';
const userKey = (userId: string) => `deutschbook.progress.v1.${userId}`;
const HISTORY_LIMIT = 20;

/**
 * A saved place whose module still exists: modules can be removed in updates.
 * Removed topics are left out where places are listed, once the level's
 * table of contents has loaded.
 */
const stillExists = (loc: Location) => MODULES.includes(loc.module);

/** Progress read from storage or the server, filled out and cleaned of places that no longer exist. */
function restoreProgress(saved: Partial<Progress>): Progress {
  const p = { ...initialProgress(), ...saved };
  return {
    ...p,
    history: p.history.filter(stillExists),
    lastLocation: p.lastLocation && stillExists(p.lastLocation) ? p.lastLocation : undefined,
  };
}

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
  topicTests: {},
  practice: {},
  settings: { showEnglish: true },
  updatedAt: 0,
});

/**
 * Guest progress lasts only while the app (or browser tab) is open. On web it
 * is kept in sessionStorage so a page refresh doesn't lose it; closing the tab
 * does. On a phone it lives in memory and is gone when the app is closed.
 */
const guestStore = {
  available: () => Platform.OS === 'web' && typeof sessionStorage !== 'undefined',
  read(): Progress | null {
    if (!guestStore.available()) return null;
    try {
      const raw = sessionStorage.getItem(GUEST_KEY);
      return raw ? restoreProgress(JSON.parse(raw)) : null;
    } catch {
      return null;
    }
  },
  write(p: Progress) {
    if (!guestStore.available()) return;
    try {
      sessionStorage.setItem(GUEST_KEY, JSON.stringify(p));
    } catch {}
  },
  clear() {
    if (!guestStore.available()) return;
    try {
      sessionStorage.removeItem(GUEST_KEY);
    } catch {}
  },
};

type Actions = {
  /** Sets the study level and starts it from zero progress. */
  chooseLevel: (level: Level) => void;
  savePlacement: (result: PlacementResult) => void;
  visit: (loc: Omit<Location, 'at'>) => void;
  openGrammar: (id: string) => void;
  completeGrammar: (id: string) => void;
  toggleLearned: (entryId: string) => void;
  toggleBookmark: (entryId: string) => void;
  setVocabPosition: (topicId: string, index: number) => void;
  answerQuestion: (exerciseId: string, question: Question, answer: Answer, position: number) => void;
  setQuizPosition: (exerciseId: string, position: number) => void;
  finishQuiz: (exercise: Exercise) => void;
  restartQuiz: (exerciseId: string) => void;
  /** Revision answers don't belong to a quiz; they only update the mistakes list. */
  recordRevision: (questionId: string, correct: boolean) => void;
  markTextRead: (id: string) => void;
  recordTopicTest: (topicId: string, score: number, total: number) => void;
  recordPractice: (cardId: string, score: number, total: number) => void;
  /** A practice mistake costs a heart; a rewarded ad gives one back. */
  changeLives: (change: number) => void;
  setShowEnglish: (v: boolean) => void;
  setProfile: (changes: Pick<Settings, 'avatar' | 'displayName'>) => void;
  resetAll: () => void;
  /** Call right before signing in or up, to say what happens to guest progress. */
  prepareAuth: (strategy: AuthStrategy) => void;
};

type ProgressValue = {
  progress: Progress;
  loaded: boolean;
  syncStatus: SyncStatus;
  isGuest: boolean;
} & Actions;

const ProgressContext = createContext<ProgressValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { session, ready } = useAuth();
  const [progress, setProgress] = useState<Progress>(initialProgress);
  const [loaded, setLoaded] = useState(false);
  // Last server write we know about. Status is derived from it, not stored.
  const [synced, setSynced] = useState({ at: 0, ok: true });
  const remoteReady = useRef(false);
  // Who the progress in memory belongs to: undefined before the first load,
  // null for a guest, otherwise the signed-in user's id.
  const owner = useRef<string | null | undefined>(undefined);
  const strategy = useRef<AuthStrategy>('use-account');
  const latest = useRef(progress);
  useEffect(() => {
    latest.current = progress;
  }, [progress]);
  const userId = session?.user.id ?? null;

  // Load whenever who is using the app changes: first start, sign-in, sign-out.
  useEffect(() => {
    if (!ready) return;
    const prev = owner.current;
    owner.current = userId;
    remoteReady.current = false;
    let cancelled = false;

    (async () => {
      if (!userId) {
        // Guest: a fresh start every time the app opens, and after sign-out.
        if (prev === undefined) AsyncStorage.removeItem(LEGACY_KEY).catch(() => {});
        if (prev) AsyncStorage.removeItem(userKey(prev)).catch(() => {});
        const restored = prev === undefined ? guestStore.read() : null;
        setProgress(restored ?? initialProgress());
        setLoaded(true);
        return;
      }

      // Signed in. Coming from guest mode, start from what the guest did;
      // on app start, from this account's copy saved on the device.
      // On web, Google sign-in reloads the page: guest progress still in this
      // tab's storage means the guest has just signed in that way.
      const redirectedGuest = prev === undefined ? guestStore.read() : null;
      const fromGuest = prev === null || !!redirectedGuest;
      let local = redirectedGuest ?? latest.current;
      if (redirectedGuest) {
        setProgress(redirectedGuest);
        setLoaded(true);
      } else if (!fromGuest) {
        const raw = await AsyncStorage.getItem(userKey(userId)).catch(() => null);
        local = raw ? restoreProgress(JSON.parse(raw)) : initialProgress();
        if (cancelled) return;
        setProgress(local);
        setLoaded(true);
      }
      if (!supabase) return;

      const { data, error } = await supabase.from('user_progress').select('data').eq('user_id', userId).maybeSingle();
      if (cancelled) return;
      guestStore.clear();
      if (error) {
        setSynced({ at: 0, ok: false });
        return;
      }
      const remote = data?.data as Progress | undefined;
      const useRemote = shouldUseAccountCopy({ fromGuest, strategy: strategy.current, local, remote });
      strategy.current = 'use-account';
      remoteReady.current = true;
      if (useRemote && remote) {
        setSynced({ at: remote.updatedAt, ok: true });
        setProgress(restoreProgress(remote));
      } else {
        // Local wins: bump updatedAt so the push effect uploads it.
        setProgress({ ...local, updatedAt: Math.max(local.updatedAt, Date.now()) });
      }
      setLoaded(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [ready, userId]);

  // Save on every change: guests for this session only, accounts on the device.
  useEffect(() => {
    if (!loaded || owner.current === undefined) return;
    if (owner.current) AsyncStorage.setItem(userKey(owner.current), JSON.stringify(progress)).catch(() => {});
    else guestStore.write(progress);
  }, [progress, loaded]);

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
      chooseLevel: (level) =>
        update((p) => ({ ...initialProgress(), onboarded: true, level, placement: p.placement, settings: p.settings, lives: p.lives })),
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
      answerQuestion: (exerciseId, q, answer, position) =>
        update((p) => {
          const questionId = q.id;
          const prev = p.quizzes[exerciseId] ?? emptyQuiz();
          const quiz = { ...prev, answers: { ...prev.answers, [questionId]: answer }, position, updatedAt: Date.now() };
          const mistakes = { ...p.mistakes };
          if (isAnswerCorrect(q, answer)) delete mistakes[questionId];
          else mistakes[questionId] = Date.now();
          return { ...p, quizzes: { ...p.quizzes, [exerciseId]: quiz }, mistakes };
        }),
      setQuizPosition: (exerciseId, position) =>
        update((p) => ({
          ...p,
          quizzes: { ...p.quizzes, [exerciseId]: { ...(p.quizzes[exerciseId] ?? emptyQuiz()), position } },
        })),
      finishQuiz: (ex) =>
        update((p) => {
          const exerciseId = ex.id;
          const prev = p.quizzes[exerciseId] ?? emptyQuiz();
          const score = ex.questions.filter((q) => isAnswerCorrect(q, prev.answers[q.id])).length;
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
      recordTopicTest: (topicId, score, total) =>
        update((p) => {
          const prev = p.topicTests[topicId];
          const passed = (prev?.passed ?? false) || passesTopicTest(score, total);
          const bestScore = Math.max(prev?.bestScore ?? 0, score);
          const attempts = (prev?.attempts ?? 0) + 1;
          return { ...p, topicTests: { ...p.topicTests, [topicId]: { bestScore, total, passed, attempts, updatedAt: Date.now() } } };
        }),
      recordPractice: (cardId, score, total) =>
        update((p) => {
          const prev = p.practice[cardId];
          const bestScore = Math.max(prev?.bestScore ?? 0, score);
          const state = { bestScore, total, stars: practiceStars(bestScore, total), attempts: (prev?.attempts ?? 0) + 1, updatedAt: Date.now() };
          return { ...p, practice: { ...p.practice, [cardId]: state } };
        }),
      changeLives: (change) => update((p) => ({ ...p, lives: changeLives(p.lives, change, Date.now()) })),
      setShowEnglish: (v) => update((p) => ({ ...p, settings: { ...p.settings, showEnglish: v } })),
      setProfile: (changes) => update((p) => ({ ...p, settings: { ...p.settings, ...changes } })),
      resetAll: () => update(() => initialProgress()),
      prepareAuth: (s) => {
        strategy.current = s;
      },
    }),
    [update],
  );

  const isGuest = !userId;
  const syncStatus: SyncStatus = isGuest
    ? 'guest'
    : !supabase
      ? 'local'
      : !synced.ok
        ? 'offline'
        : synced.at >= progress.updatedAt
          ? 'synced'
          : 'saving';

  const value = useMemo(
    () => ({ progress, loaded, syncStatus, isGuest, ...actions }),
    [progress, loaded, syncStatus, isGuest, actions],
  );
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


export {
  hasActivity,
  LEVEL_UP_SCORE,
  learnedWordCount,
  levelProgress,
  nextLevel,
  topicDone,
  topicsToKeep,
  practiceUnlocked,
  topicUnlocked,
  type ModuleProgress,
} from '@/state/progress-rules';
