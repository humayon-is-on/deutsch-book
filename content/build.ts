import { createHash } from 'node:crypto';

import {
  CONTENT_SCHEMA,
  type ContentManifest,
  type Level,
  type LevelContent,
  type LevelIndex,
  type McqQuestion,
  type ModuleKey,
  type Question,
  type TopicFile,
  type TopicItem,
  type TopicSummary,
} from '../src/content/types';

/*
 * Turns the course source into the files the app downloads: per level a
 * table of contents (index) and one file per topic. File names carry a hash
 * of their content, so a changed topic gets a new name and phones download
 * it again, while unchanged files can be cached for good.
 */

/** Questions in the end test of a stand-in topic test. */
const TEST_SIZE = 5;
/** Questions in the test of a reading topic (letters, emails, dialogues). */
const TEXT_TEST_SIZE = 6;
/** Answer choices per test question. */
const OPTIONS = 3;
/** Word topics: bigger word lists get longer tests. */
const vocabTestSize = (words: number) => (words > 40 ? 10 : words >= 20 ? 8 : 6);

const hash = (s: string) => createHash('sha256').update(s).digest('hex').slice(0, 12);

/** Same order every time for the same seed, so a test is the same on every phone. */
function seededShuffle<T>(items: T[], seed: string): T[] {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * A text line cut into sentence pairs, German with its Bangla. Lines whose
 * sentences don't pair up one to one stay whole.
 */
function sentencePairs(line: { de: string; bn: string }): { de: string; bn: string }[] {
  // A full stop after a number ("5.") or "Dr." doesn't end a sentence.
  const de = line.de.split(/(?<![0-9]\.|Dr\.)(?<=[.!?][“"]?)\s+(?=[A-ZÄÖÜ„])/);
  const bn = line.bn.split(/(?<=[।!?][“"]?)\s+/);
  return de.length === bn.length ? de.map((d, i) => ({ de: d, bn: bn.at(i)! })) : [line];
}

/** Up to `count` items picked evenly from start to end. */
function spread<T>(items: T[], count: number): T[] {
  if (items.length <= count) return items;
  return Array.from({ length: count }, (_, i) => items[Math.floor((i * items.length) / count)]);
}

/** Parts of a meaning, e.g. "ট্রেন (রেললাইন)" → ট্রেন, রেললাইন. */
const meaningParts = (bn: string) => bn.split(/[/,;()]/).map((x) => x.trim()).filter(Boolean);

/** True when two meanings share a part, so one can't be a wrong choice for the other. */
function sameMeaning(a: string, b: string) {
  const parts = new Set(meaningParts(a));
  return meaningParts(b).some((p) => parts.has(p));
}

/**
 * A meaning question: which Bangla line matches the German one. Wrong options
 * come from the same topic first, then from the rest of the level.
 */
function meaningQuestions(
  testId: string,
  pairs: { de: string; bn: string }[],
  pool: string[],
  promptBn: string,
  size = TEST_SIZE,
  key = 'q',
): McqQuestion[] {
  return pairs.slice(0, size).map((pair, i) => {
    const near = seededShuffle([...new Set(pairs.map((p) => p.bn))].filter((bn) => !sameMeaning(bn, pair.bn)), `${testId}-${key}${i}`);
    const far = seededShuffle([...new Set(pool)].filter((bn) => !sameMeaning(bn, pair.bn) && !near.includes(bn)), `${testId}-${key}${i}-far`);
    const wrong = [...near, ...far].slice(0, OPTIONS - 1);
    const options = seededShuffle([pair.bn, ...wrong], `${testId}-${key}${i}-options`);
    return {
      id: `${testId}-${key}${i + 1}`,
      type: 'mcq',
      prompt: `„${pair.de}“`,
      promptBn,
      options,
      answer: options.indexOf(pair.bn),
    };
  });
}

/**
 * The end test of a topic. Grammar topics can carry their own; the rest are
 * stand-ins built from the topic's own material. Exercises are their own
 * test, so they have none.
 */
export function topicTest(c: LevelContent, t: TopicItem): Question[] {
  const testId = `test-${t.item.id}`;
  switch (t.module) {
    case 'grammar': {
      const lesson = t.item;
      if (lesson.test) return lesson.test;
      const linked = lesson.exerciseId ? c.exercises.find((e) => e.id === lesson.exerciseId) : undefined;
      if (linked) return linked.questions.slice(0, TEST_SIZE);
      const examples = lesson.sections.flatMap((s) => s.examples ?? []);
      const pool = c.grammar.flatMap((g) => g.sections.flatMap((s) => (s.examples ?? []).map((e) => e.bn)));
      return meaningQuestions(testId, examples, pool, 'এই বাক্যের সঠিক অর্থ কোনটি?');
    }
    case 'vocabulary': {
      const pool = c.vocabulary.flatMap((v) => v.entries.map((e) => e.bn));
      const pairs = seededShuffle(t.item.entries, testId).map((e) => ({ de: e.article ? `${e.article} ${e.de}` : e.de, bn: e.bn }));
      return meaningQuestions(testId, pairs, pool, 'এই শব্দের অর্থ কোনটি?', vocabTestSize(t.item.entries.length));
    }
    case 'mcq':
    case 'practice':
      return [];
    default: {
      // The text's own questions and half on the key phrases, the rest on what sentences of the text mean.
      const item = t.item;
      const notes = (item.notes ?? []).slice(0, TEXT_TEST_SIZE / 2).map((n) => ({ de: n.term, bn: n.bn }));
      const notePool = c.texts.flatMap((x) => (x.notes ?? []).map((n) => n.bn));
      // Only whole sentences: greetings and sign-offs ("Liebe Lena,", "Viele Grüße") are left out.
      const sentences = item.lines
        .flatMap(sentencePairs)
        .filter((p) => /[.!?][“"]?$/.test(p.de) && p.de.split(' ').length >= 4);
      const sentencePool = c.texts.flatMap((x) => x.lines.flatMap(sentencePairs).map((p) => p.bn));
      const own = (item.questions ?? []).slice(0, TEXT_TEST_SIZE / 2);
      const count = TEXT_TEST_SIZE - notes.length - own.length;
      return [
        ...own,
        ...meaningQuestions(testId, notes, notePool, 'এর অর্থ কোনটি?', notes.length, 'n'),
        ...meaningQuestions(testId, spread(sentences, count), sentencePool, 'এই বাক্যের সঠিক অর্থ কোনটি?', count, 's'),
      ];
    }
  }
}

/** Every topic of a level, by module, in learning order. */
export function levelTopics(c: LevelContent): Record<ModuleKey, TopicItem[]> {
  return {
    grammar: c.grammar.map((item) => ({ module: 'grammar', item })),
    vocabulary: c.vocabulary.map((item) => ({ module: 'vocabulary', item })),
    mcq: c.exercises.map((item) => ({ module: 'mcq', item })),
    models: c.texts.filter((x) => x.module === 'models').map((item) => ({ module: 'models', item })),
    emails: c.texts.filter((x) => x.module === 'emails').map((item) => ({ module: 'emails', item })),
    dialogues: c.texts.filter((x) => x.module === 'dialogues').map((item) => ({ module: 'dialogues', item })),
  };
}

function summary(t: TopicItem, file: string): TopicSummary {
  const base = { id: t.item.id, title: t.item.title, file };
  switch (t.module) {
    case 'grammar':
      return { ...base, subtitle: t.item.summary };
    case 'vocabulary':
      return { ...base, wordIds: t.item.entries.map((e) => e.id), ...(t.item.part ? { part: t.item.part } : {}) };
    case 'mcq':
      return {
        ...base,
        questionIds: t.item.questions.map((q) => q.id),
        fill: t.item.questions.every((q) => q.type === 'fill'),
      };
    case 'practice':
      return { ...base, questionIds: t.item.questions.map((q) => q.id) };
    default:
      return { ...base, subtitle: t.item.tag };
  }
}

/** A level's table of contents and its topic files, keyed by path. */
export function buildLevel(c: LevelContent): { index: LevelIndex; files: Record<string, TopicFile> } {
  const files: Record<string, TopicFile> = {};
  const publish = (t: TopicItem) => {
    const file: TopicFile = { ...t, schema: CONTENT_SCHEMA, id: t.item.id, level: c.level, test: topicTest(c, t) };
    const path = `${c.level}/${t.item.id}.${hash(JSON.stringify(file))}.json`;
    files[path] = file;
    return summary(t, path);
  };
  const byModule = levelTopics(c);
  const modules = Object.fromEntries(
    Object.entries(byModule).map(([module, topics]) => [module, topics.map(publish)]),
  ) as LevelIndex['modules'];
  const practice = (c.practice ?? []).map((item) => ({ ...publish({ module: 'practice', item }), kind: item.kind }));
  const version = hash(JSON.stringify({ modules, practice }));
  return { index: { schema: CONTENT_SCHEMA, level: c.level, version, modules, practice }, files };
}

/** Every file to publish, keyed by path, with the manifest at `manifest.json`. */
export function buildCourse(course: Record<Level, LevelContent>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  const levels: ContentManifest['levels'] = {};
  for (const c of Object.values(course)) {
    const { index, files } = buildLevel(c);
    Object.assign(out, files);
    const path = `${c.level}/index.${index.version}.json`;
    out[path] = index;
    levels[c.level] = { index: path };
  }
  const manifest: ContentManifest = { schema: CONTENT_SCHEMA, version: hash(JSON.stringify(levels)), levels };
  out['manifest.json'] = manifest;
  return out;
}
