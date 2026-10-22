/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { content, MODULES } from '../src/content';
import { nextTopic, topicsFor, topicTest } from '../src/content/topics';
import { hasActivity, levelProgress, nextLevel, shouldUseAccountCopy, topicDone, topicUnlocked } from '../src/state/progress-rules';
import type { Progress } from '../src/state/progress';

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
  mistakes: {},
  textsRead: {},
  topicTests: {},
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

/** A1 progress with every topic finished and the given number of quiz answers wrong in the longest exercise. */
function finishedA1(wrong: number): Progress {
  const c = content.A1;
  const p = empty();
  for (const m of MODULES) {
    for (const t of topicsFor('A1', m)) p.topicTests[t.id] = { bestScore: 5, total: 5, passed: true, attempts: 1, updatedAt: 1 };
  }
  const longest = [...c.exercises].sort((a, b) => b.questions.length - a.questions.length)[0];
  c.exercises.forEach((e) => {
    const n = e.questions.length - (e === longest ? wrong : 0);
    p.quizzes[e.id] = { answers: {}, position: 0, completed: true, score: 0, bestScore: n, attempts: 1, updatedAt: 1 };
  });
  return p;
}

test('moving up needs the whole level done with a 95% quiz score', () => {
  assert.equal(levelProgress(empty(), 'A1').readyToMoveUp, false);
  const perfect = levelProgress(finishedA1(0), 'A1');
  assert.equal(perfect.complete, true);
  assert.equal(perfect.readyToMoveUp, true);
  // Every topic passed, but one wrong answer in 14 keeps the quiz score under 95%.
  const weak = levelProgress(finishedA1(1), 'A1');
  assert.equal(weak.complete, true);
  assert.equal(weak.readyToMoveUp, false);
  assert.equal(nextLevel('A1'), 'A2');
  assert.equal(nextLevel('B1'), null);
});

test('topics open one by one inside a module', () => {
  const [first, second] = topicsFor('A1', 'grammar');
  const p = empty();
  assert.equal(topicUnlocked(p, first.id), true);
  assert.equal(topicUnlocked(p, second.id), false);
  // A failed test doesn't open the next topic, a passed one does.
  p.topicTests[first.id] = { bestScore: 1, total: 5, passed: false, attempts: 1, updatedAt: 1 };
  assert.equal(topicUnlocked(p, second.id), false);
  p.topicTests[first.id] = { bestScore: 4, total: 5, passed: true, attempts: 2, updatedAt: 2 };
  assert.equal(topicDone(p, first.id), true);
  assert.equal(topicUnlocked(p, second.id), true);
  assert.equal(nextTopic(first.id)?.id, second.id);
});

test('an exercise is finished by its own score', () => {
  const ex = content.A1.exercises[0];
  const n = ex.questions.length;
  const p = empty();
  p.quizzes[ex.id] = { answers: {}, position: 0, completed: true, score: 0, bestScore: 0, attempts: 1, updatedAt: 1 };
  assert.equal(topicDone(p, ex.id), false);
  p.quizzes[ex.id].bestScore = n;
  assert.equal(topicDone(p, ex.id), true);
});

test('every non-exercise topic has a working end test', () => {
  for (const level of ['A1', 'A2', 'B1'] as const) {
    for (const m of MODULES.filter((x) => x !== 'mcq')) {
      for (const t of topicsFor(level, m)) {
        const qs = topicTest(t.id);
        assert.ok(qs.length > 0, `${t.id} has no test`);
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
