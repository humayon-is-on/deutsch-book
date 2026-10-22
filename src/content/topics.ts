import { content, getExercise, MODULES, textsFor } from '.';
import type { Level, McqQuestion, ModuleKey, Question, Translated } from './types';

/**
 * Topics are the items inside a module (a grammar lesson, a word topic, an
 * exercise, a text). Inside a module they unlock one by one: a topic opens
 * once the topic before it is finished, and a topic is finished by passing
 * the short test at its end.
 */
export type Topic = { id: string; level: Level; module: ModuleKey; title: Translated; href: string };

/** Share of a topic test that must be right to finish the topic. */
export const TOPIC_PASS = 0.6;

/** Most questions a stand-in topic test asks. */
const TEST_SIZE = 5;

/** Questions in the test of a reading topic (letters, emails, dialogues). */
const TEXT_TEST_SIZE = 6;

export function topicsFor(level: Level, module: ModuleKey): Topic[] {
  const c = content[level];
  const t = (id: string, title: Translated, href: string): Topic => ({ id, level, module, title, href });
  switch (module) {
    case 'grammar':
      return c.grammar.map((g) => t(g.id, g.title, `/lesson/${g.id}`));
    case 'vocabulary':
      return c.vocabulary.map((v) => t(v.id, v.title, `/vocab/${v.id}`));
    case 'mcq':
      return c.exercises.map((e) => t(e.id, e.title, `/quiz/${e.id}`));
    default:
      return textsFor(level, module).map((x) => t(x.id, x.title, `/read/${x.id}`));
  }
}

const topicIndex = new Map<string, { topic: Topic; index: number; list: Topic[] }>();
for (const level of Object.keys(content) as Level[]) {
  for (const module of MODULES) {
    const list = topicsFor(level, module);
    list.forEach((topic, index) => topicIndex.set(topic.id, { topic, index, list }));
  }
}

export const getTopic = (id: string) => topicIndex.get(id)?.topic;

/** The topic that comes right after this one in its module, if any. */
export function nextTopic(id: string): Topic | undefined {
  const entry = topicIndex.get(id);
  return entry?.list[entry.index + 1];
}

/** The topic that must be finished before this one opens, if any. */
export function previousTopic(id: string): Topic | undefined {
  const entry = topicIndex.get(id);
  return entry && entry.index > 0 ? entry.list[entry.index - 1] : undefined;
}

/** Same order every time for the same seed, so a test doesn't reshuffle while it's taken. */
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
    // Wrong options from the same topic first, so the learner has to tell its own lines apart.
    const near = seededShuffle([...new Set(pairs.map((p) => p.bn))].filter((bn) => bn !== pair.bn), `${testId}-${key}${i}`);
    const far = seededShuffle([...new Set(pool)].filter((bn) => bn !== pair.bn && !near.includes(bn)), `${testId}-${key}${i}-far`);
    const wrong = [...near, ...far].slice(0, 3);
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
 * The questions of a topic's end test. Grammar topics can carry their own;
 * the rest are stand-ins built from the topic's own material until each
 * module gets its own kind of test.
 * Exercises are their own test, so they have none here.
 */
export function topicTest(id: string): Question[] {
  const topic = getTopic(id);
  if (!topic) return [];
  const c = content[topic.level];
  const testId = `test-${id}`;
  switch (topic.module) {
    case 'grammar': {
      const lesson = c.grammar.find((g) => g.id === id)!;
      if (lesson.test) return lesson.test;
      const linked = lesson.exerciseId ? getExercise(lesson.exerciseId) : undefined;
      if (linked) return linked.questions.slice(0, TEST_SIZE);
      const examples = lesson.sections.flatMap((s) => s.examples ?? []);
      const pool = c.grammar.flatMap((g) => g.sections.flatMap((s) => (s.examples ?? []).map((e) => e.bn)));
      return meaningQuestions(testId, examples, pool, 'এই বাক্যের সঠিক অর্থ কোনটি?');
    }
    case 'vocabulary': {
      const words = c.vocabulary.find((v) => v.id === id)!.entries;
      const pool = c.vocabulary.flatMap((v) => v.entries.map((e) => e.bn));
      const pairs = seededShuffle(words, testId).map((e) => ({ de: e.article ? `${e.article} ${e.de}` : e.de, bn: e.bn }));
      return meaningQuestions(testId, pairs, pool, 'এই শব্দের অর্থ কোনটি?');
    }
    case 'mcq':
      return [];
    default: {
      // Half on the key phrases, the rest on what sentences of the text mean.
      const item = c.texts.find((x) => x.id === id)!;
      const notes = (item.notes ?? []).slice(0, TEXT_TEST_SIZE / 2).map((n) => ({ de: n.term, bn: n.bn }));
      const notePool = c.texts.flatMap((x) => (x.notes ?? []).map((n) => n.bn));
      // Only whole sentences: greetings and sign-offs ("Liebe Lena,", "Viele Grüße") are left out.
      const sentences = item.lines
        .flatMap(sentencePairs)
        .filter((p) => /[.!?][“"]?$/.test(p.de) && p.de.split(' ').length >= 4);
      const sentencePool = c.texts.flatMap((x) => x.lines.flatMap(sentencePairs).map((p) => p.bn));
      const count = TEXT_TEST_SIZE - notes.length;
      return [
        ...meaningQuestions(testId, notes, notePool, 'এর অর্থ কোনটি?', notes.length, 'n'),
        ...meaningQuestions(testId, spread(sentences, count), sentencePool, 'এই বাক্যের সঠিক অর্থ কোনটি?', count, 's'),
      ];
    }
  }
}

export const passesTopicTest = (score: number, total: number) => total > 0 && score / total >= TOPIC_PASS;
