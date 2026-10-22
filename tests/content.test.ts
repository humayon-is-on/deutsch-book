/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { content, getExercise, isAnswerCorrect, LEVELS } from '../src/content';
import { placementQuestions, scorePlacement } from '../src/content/placement';

const allIds = LEVELS.flatMap((l) => {
  const c = content[l];
  return [
    ...c.grammar.map((g) => g.id),
    ...c.vocabulary.flatMap((t) => [t.id, ...t.entries.map((e) => e.id)]),
    ...c.exercises.flatMap((e) => [e.id, ...e.questions.map((q) => q.id)]),
    ...c.texts.map((t) => t.id),
  ];
});

test('content ids are unique', () => {
  const dupes = allIds.filter((id, i) => allIds.indexOf(id) !== i);
  assert.deepEqual(dupes, []);
});

test('every item sits in the level it is filed under', () => {
  for (const l of LEVELS) {
    const c = content[l];
    for (const item of [...c.grammar, ...c.vocabulary, ...c.exercises, ...c.texts]) {
      assert.equal(item.level, l, item.id);
    }
  }
});

test('questions are well formed', () => {
  for (const l of LEVELS) {
    for (const ex of content[l].exercises) {
      assert.ok(ex.questions.length > 0, ex.id);
      for (const q of ex.questions) {
        if (q.type === 'mcq') {
          assert.ok(q.answer >= 0 && q.answer < q.options.length, q.id);
          assert.equal(new Set(q.options).size, q.options.length, `${q.id} has duplicate options`);
          if (q.wrongNotes) assert.ok(q.wrongNotes.length <= q.options.length, q.id);
        } else {
          assert.ok(q.prompt.includes('___'), `${q.id} needs a ___ gap`);
          assert.ok(q.accept.length > 0, q.id);
        }
      }
    }
  }
});

test('lessons link to exercises that exist', () => {
  for (const l of LEVELS) {
    for (const g of content[l].grammar) {
      if (g.exerciseId) assert.ok(getExercise(g.exerciseId), `${g.id} → ${g.exerciseId}`);
    }
  }
});

test('every level has content in every module', () => {
  for (const l of LEVELS) {
    const c = content[l];
    assert.ok(c.grammar.length && c.vocabulary.length && c.exercises.length, l);
    for (const m of ['emails', 'dialogues']) {
      assert.ok(c.texts.some((t) => t.module === m), `${l} ${m}`);
    }
  }
});

test('fill answers accept umlaut and ß spellings', () => {
  const q = { id: 'x', type: 'fill' as const, prompt: '___', accept: ['heißt'] };
  assert.ok(isAnswerCorrect(q, 'heisst'));
  assert.ok(isAnswerCorrect(q, ' Heißt '));
  assert.ok(!isAnswerCorrect(q, 'heiße'));
  const h = { id: 'y', type: 'fill' as const, prompt: '___', accept: ['hätte'] };
  assert.ok(isAnswerCorrect(h, 'haette'));
});

test('placement recommends the first level not yet mastered', () => {
  const all = (pred: (lvl: string) => boolean) =>
    Object.fromEntries(placementQuestions.map((q) => [q.id, pred(q.level)]));
  assert.equal(scorePlacement(all(() => false)).recommended, 'A1');
  assert.equal(scorePlacement(all((l) => l === 'A1')).recommended, 'A2');
  assert.equal(scorePlacement(all(() => true)).recommended, 'B1');
  assert.equal(scorePlacement(all(() => true)).correct, placementQuestions.length);
});
