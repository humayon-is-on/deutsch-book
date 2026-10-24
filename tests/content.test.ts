/// <reference types="node" />
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { test } from 'node:test';

import { buildCourse, buildLevel } from '../content/build';
import { course as content } from '../content/levels';
import { isAnswerCorrect, LEVELS, type ContentManifest, type LevelIndex, type Question } from '../src/content';
import { placementQuestions, scorePlacement } from '../src/content/placement';
import { courseWords, knows, questionWords } from '../content/word-check';

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

function checkQuestion(q: Question) {
  if (q.type === 'mcq') {
    assert.ok(q.answer >= 0 && q.answer < q.options.length, q.id);
    assert.equal(new Set(q.options).size, q.options.length, `${q.id} has duplicate options`);
    if (q.wrongNotes) assert.ok(q.wrongNotes.length <= q.options.length, q.id);
  } else if (q.type === 'fill') {
    assert.ok(q.prompt.includes('___'), `${q.id} needs a ___ gap`);
    assert.ok(q.accept.length > 0, q.id);
  } else if (q.type === 'gap') {
    const gaps = q.prompt.split('___').length - 1;
    assert.ok(gaps >= 1 && gaps <= 2, `${q.id} needs one or two ___ gaps`);
    assert.equal(q.answers.length, gaps, `${q.id}: one answer per gap`);
    assert.equal(new Set(q.options).size, q.options.length, `${q.id} has duplicate options`);
    for (const a of q.answers) assert.ok(q.options.includes(a), `${q.id}: options must include "${a}"`);
    assert.ok(q.options.length >= q.answers.length + 2, `${q.id} needs at least 2 wrong options`);
  } else {
    assert.ok(q.words.length >= 3, `${q.id} needs at least 3 words`);
    const all = [...q.words, ...(q.extra ?? [])].map((w) => w.toLowerCase());
    assert.equal(new Set(all).size, new Set(q.words.map((w) => w.toLowerCase())).size + (q.extra?.length ?? 0), `${q.id}: extra words must be new`);
    for (const alt of q.accept ?? []) {
      const sorted = (s: string[]) => [...s].map((w) => w.replace(/[.!?,]/g, '').toLowerCase()).sort().join(' ');
      assert.equal(sorted(alt.split(' ')), sorted(q.words), `${q.id}: "${alt}" must use the same words`);
    }
  }
}

test('questions are well formed', () => {
  for (const l of LEVELS) {
    for (const ex of content[l].exercises) {
      assert.ok(ex.questions.length > 0, ex.id);
      ex.questions.forEach(checkQuestion);
    }
  }
});

test('practice ladder: 15 questions of the card\'s kind, never 3 of a kind in a row, then a 20-question level test', () => {
  for (const l of LEVELS) {
    const sets = content[l].practice ?? [];
    if (l === 'A1') assert.equal(sets.filter((x) => x.kind !== 'exam').length, 45, 'A1 has 45 practice cards');
    const ids = new Set<string>();
    sets.forEach((set, i) => {
      const exam = set.kind === 'exam';
      if (exam) assert.equal(i, sets.length - 1, `${set.id}: the level test closes the ladder`);
      assert.equal(set.questions.length, exam ? 20 : 15, set.id);
      for (const q of set.questions) {
        const kind = q.type === 'order' ? 'build' : q.type === 'gap' ? 'fill' : q.type;
        if (!exam) assert.equal(kind, set.kind, q.id);
        assert.ok(!ids.has(q.id), `duplicate id ${q.id}`);
        ids.add(q.id);
        checkQuestion(q);
      }
      if (i >= 2) assert.ok(!(sets[i - 1].kind === set.kind && sets[i - 2].kind === set.kind), `${set.id}: 3 ${set.kind} cards in a row`);
    });
  }
});

test('practice questions only use words from the level\'s modules', () => {
  for (const l of LEVELS) {
    const known = courseWords(content[l]);
    for (const set of content[l].practice ?? []) {
      for (const q of set.questions) {
        const unknown = questionWords(q).filter((w) => !knows(known, w));
        assert.deepEqual(unknown, [], q.id);
      }
    }
  }
});

test('lessons link to exercises that exist', () => {
  for (const l of LEVELS) {
    for (const g of content[l].grammar) {
      if (g.exerciseId) assert.ok(content[l].exercises.some((e) => e.id === g.exerciseId), `${g.id} → ${g.exerciseId}`);
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

test('model texts have a picture and Bangla and English for every sentence', () => {
  for (const l of LEVELS) {
    for (const t of content[l].texts.filter((x) => x.module === 'models')) {
      assert.ok(t.image && existsSync(`content/${t.image}`), `${t.id}: picture`);
      for (const line of t.lines) assert.ok(line.bn && line.en, `${t.id}: ${line.de}`);
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

test('published files: the manifest leads to every level and every topic file exists', () => {
  const files = buildCourse(content);
  const manifest = files['manifest.json'] as ContentManifest;
  for (const l of LEVELS) {
    const index = files[manifest.levels[l]!.index] as LevelIndex;
    assert.equal(index.level, l);
    for (const list of Object.values(index.modules)) {
      for (const t of list) assert.ok(files[t.file], `${t.id} → ${t.file}`);
    }
  }
});

test('a changed topic gets a new file name, the others keep theirs', () => {
  const before = buildLevel(content.A1).index.modules.grammar;
  const [first, ...rest] = content.A1.grammar;
  const changed = { ...content.A1, grammar: [{ ...first, summary: first.summary + '!' }, ...rest] };
  const after = buildLevel(changed).index.modules.grammar;
  assert.notEqual(after[0].file, before[0].file);
  assert.deepEqual(after.slice(1).map((t) => t.file), before.slice(1).map((t) => t.file));
});
