/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { buildLevel } from '../content/build';
import { course as content } from '../content/levels';
import { LEVELS, MODULES, type Question } from '../src/content';
import { nextTopic, topicsFor } from '../src/content/topics';
import {
  hasActivity,
  learnedWordCount,
  levelProgress,
  nextLevel,
  shouldUseAccountCopy,
  topicDone,
  topicsToKeep,
  topicUnlocked,
} from '../src/state/progress-rules';
import type { Progress } from '../src/state/progress';

// The app works on one level's table of contents at a time; these tests use A1's.
const A1 = buildLevel(content.A1).index;

/** Every topic's end test in every level, as published. */
const publishedTests = new Map<string, Question[]>(
  LEVELS.flatMap((l) => Object.values(buildLevel(content[l]).files).map((f) => [f.id, f.test] as const)),
);
const topicTest = (id: string) => publishedTests.get(id) ?? [];

const empty = (): Progress => ({
  version: 1,
  onboarded: true,
  level: 'A1',
  history: [],
  grammar: {},
  learned: {},
  bookmarks: {},
  vocabPosition: {},
  quizzes: {},
  textsRead: {},
  topicTests: {},
  practice: {},
  settings: { showEnglish: true },
  updatedAt: 0,
});

test('sign-up keeps guest progress, sign-in uses the account copy', () => {
  const local = { updatedAt: 200 };
  const remote = { updatedAt: 100 };
  assert.equal(shouldUseAccountCopy({ fromGuest: true, strategy: 'keep-guest', local, remote }), false);
  assert.equal(shouldUseAccountCopy({ fromGuest: true, strategy: 'use-account', local, remote }), true);
  // An account with nothing saved yet keeps what the guest did.
  assert.equal(shouldUseAccountCopy({ fromGuest: true, strategy: 'use-account', local }), false);
  // App start with a saved session: newest copy wins.
  assert.equal(shouldUseAccountCopy({ fromGuest: false, strategy: 'use-account', local, remote }), false);
  assert.equal(shouldUseAccountCopy({ fromGuest: false, strategy: 'use-account', local: remote, remote: local }), true);
});

test('hasActivity notices any learning', () => {
  assert.equal(hasActivity(empty()), false);
  assert.equal(hasActivity({ ...empty(), textsRead: { x: 1 } }), true);
});

test('the level is complete once every topic is finished', () => {
  assert.equal(levelProgress(empty(), A1).complete, false);
  const p = empty();
  for (const m of MODULES) {
    for (const t of topicsFor(A1, m)) p.topicTests[t.id] = { bestScore: 5, total: 5, passed: true, attempts: 1, updatedAt: 1 };
  }
  const done = levelProgress(p, A1);
  assert.equal(done.overall, 1);
  assert.equal(done.complete, true);
  assert.equal(nextLevel('A1'), 'A2');
  assert.equal(nextLevel('B1'), null);
});

test('topics open one by one inside a module', () => {
  const [first, second] = topicsFor(A1, 'grammar');
  const p = empty();
  assert.equal(topicUnlocked(p, A1, first.id), true);
  assert.equal(topicUnlocked(p, A1, second.id), false);
  // A failed test doesn't open the next topic, a passed one does.
  p.topicTests[first.id] = { bestScore: 1, total: 5, passed: false, attempts: 1, updatedAt: 1 };
  assert.equal(topicUnlocked(p, A1, second.id), false);
  p.topicTests[first.id] = { bestScore: 4, total: 5, passed: true, attempts: 2, updatedAt: 2 };
  assert.equal(topicDone(p, A1, first.id), true);
  assert.equal(topicUnlocked(p, A1, second.id), true);
  assert.equal(nextTopic(A1, first.id)?.id, second.id);
});

test('the phone keeps the current topic and the next two of each module', () => {
  const grammar = topicsFor(A1, 'grammar');
  const p = empty();
  p.topicTests[grammar[0].id] = { bestScore: 6, total: 6, passed: true, attempts: 1, updatedAt: 1 };
  const keep = topicsToKeep(p, A1);
  assert.deepEqual(
    keep.filter((id) => grammar.some((g) => g.id === id)),
    grammar.slice(1, 4).map((g) => g.id),
  );
  // Far topics aren't kept.
  assert.ok(!keep.includes(grammar[10].id));
  // The other modules haven't started, so their first topics are kept.
  for (const m of MODULES.filter((x) => x !== 'grammar')) assert.ok(keep.includes(topicsFor(A1, m)[0].id), m);
});

test('a passed topic stays open when a new topic is put before it', () => {
  const [, , third] = topicsFor(A1, 'grammar');
  const p = empty();
  p.topicTests[third.id] = { bestScore: 6, total: 6, passed: true, attempts: 1, updatedAt: 1 };
  assert.equal(topicUnlocked(p, A1, third.id), true);
});

test('an exercise is finished by its own score', () => {
  const ex = content.A1.exercises[0];
  const n = ex.questions.length;
  const p = empty();
  p.quizzes[ex.id] = { answers: {}, position: 0, completed: true, score: 0, bestScore: 0, attempts: 1, updatedAt: 1 };
  assert.equal(topicDone(p, A1, ex.id), false);
  p.quizzes[ex.id].bestScore = n;
  assert.equal(topicDone(p, A1, ex.id), true);
});

test('every non-exercise topic has a working end test', () => {
  for (const level of LEVELS) {
    const { index } = buildLevel(content[level]);
    for (const m of MODULES.filter((x) => x !== 'mcq')) {
      for (const t of index.modules[m]) {
        const qs = topicTest(t.id);
        assert.ok(qs.length > 0, `${t.id} has no test`);
        if (m === 'emails' || m === 'dialogues') assert.equal(qs.length, 6, `${t.id} needs 6 questions`);
        assert.equal(new Set(qs.map((q) => q.id)).size, qs.length, `${t.id} repeats a question id`);
        for (const q of qs) {
          if (q.type === 'mcq') {
            assert.ok(q.options.length >= 2, `${q.id} needs options`);
            assert.ok(q.answer >= 0 && q.answer < q.options.length, `${q.id} answer`);
            assert.equal(new Set(q.options).size, q.options.length, `${q.id} repeats an option`);
          }
        }
      }
    }
  }
});

// Bigger topics get longer tests so every section is asked about.
const LONG_TESTS: Record<string, number> = {
  'a1-grammar-zahlen-uhrzeit': 10,
  'a1-grammar-w-fragen': 10,
  'a1-grammar-imperativ': 10,
  'a1-grammar-negation': 10,
  ...Object.fromEntries(
    [
      'sein-haben', 'satzarten', 'ja-nein-frage', 'fragewoerter', 'verbzweitstellung', 'subjekt-verb',
      'nominativ-akkusativ', 'possessivartikel', 'dativ', 'konjunktionen', 'adjektive', 'trennbare-verben',
      'es-gibt-man-gern',
    ].map((slug) => [`a1-grammar-${slug}`, 8]),
  ),
};

test('grammar topic tests ask 6, 8 or 10 questions with 3 options', () => {
  for (const g of content.A1.grammar) {
    assert.ok(g.test, `${g.id} needs its own test`);
    const qs = topicTest(g.id);
    const size = LONG_TESTS[g.id] ?? 6;
    assert.equal(qs.length, size, `${g.id} needs ${size} questions`);
    for (const q of qs) assert.ok(q.type === 'mcq' && q.options.length === 3, `${q.id} needs 3 options`);
  }
});

test('learned words: passed vocabulary topics, minus saved words, plus unsaved ones', () => {
  const [vocab] = topicsFor(A1, 'vocabulary');
  const words = vocab.summary.wordIds ?? [];
  const textWord = topicsFor(A1, 'models').flatMap((t) => t.summary.wordIds ?? [])[0];
  const p = empty();
  assert.equal(learnedWordCount(p, A1), 0);
  p.topicTests[vocab.id] = { bestScore: 5, total: 5, passed: true, attempts: 1, updatedAt: 1 };
  assert.equal(learnedWordCount(p, A1), words.length);
  // Saved words are still being learned.
  p.bookmarks = { [words[0]]: 1, [words[1]]: 1 };
  assert.equal(learnedWordCount(p, A1), words.length - 2);
  // Unsaving a word counts it again, and a word from any module counts once unsaved.
  p.bookmarks = { [words[1]]: 1 };
  p.unmarked = { [words[0]]: 2, ...(textWord ? { [textWord]: 2 } : {}) };
  assert.equal(learnedWordCount(p, A1), words.length - 1 + (textWord ? 1 : 0));
});
