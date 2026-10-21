/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { content } from '../src/content';
import { hasActivity, levelProgress, nextLevel, shouldUseAccountCopy } from '../src/state/progress-rules';
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

/** A1 progress with every module done and the given share of quiz answers right. */
function finishedA1(share: number): Progress {
  const c = content.A1;
  const p = empty();
  c.grammar.forEach((g) => (p.grammar[g.id] = { completed: true, openedAt: 1 }));
  c.vocabulary.forEach((t) => t.entries.forEach((e) => (p.learned[e.id] = 1)));
  c.texts.forEach((t) => (p.textsRead[t.id] = 1));
  c.exercises.forEach((e) => {
    const n = e.questions.length;
    p.quizzes[e.id] = { answers: {}, position: 0, completed: true, score: 0, bestScore: Math.round(n * share), attempts: 1, updatedAt: 1 };
  });
  return p;
}

test('moving up needs the whole level done with a 95% quiz score', () => {
  assert.equal(levelProgress(empty(), 'A1').readyToMoveUp, false);
  const perfect = levelProgress(finishedA1(1), 'A1');
  assert.equal(perfect.complete, true);
  assert.equal(perfect.readyToMoveUp, true);
  const weak = levelProgress(finishedA1(0.5), 'A1');
  assert.equal(weak.complete, true);
  assert.equal(weak.readyToMoveUp, false);
  assert.equal(nextLevel('A1'), 'A2');
  assert.equal(nextLevel('B1'), null);
});
