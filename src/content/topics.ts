import { content, getExercise, textsFor } from '.';
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
  for (const module of ['grammar', 'vocabulary', 'mcq', 'qa', 'emails', 'dialogues'] as ModuleKey[]) {
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
 * A meaning question: which Bangla line matches the German one. Wrong options
 * come from the same topic first, then from the rest of the level.
 */
function meaningQuestions(
  testId: string,
  pairs: { de: string; bn: string }[],
  pool: string[],
  promptBn: string,
): McqQuestion[] {
  return pairs.slice(0, TEST_SIZE).map((pair, i) => {
    const others = [...new Set([...pairs.map((p) => p.bn), ...pool])].filter((bn) => bn !== pair.bn);
    const wrong = seededShuffle(others, `${testId}-${i}`).slice(0, 3);
    const options = seededShuffle([pair.bn, ...wrong], `${testId}-${i}-options`);
    return {
      id: `${testId}-q${i + 1}`,
      type: 'mcq',
      prompt: `„${pair.de}“`,
      promptBn,
      options,
      answer: options.indexOf(pair.bn),
    };
  });
}

/**
 * The questions of a topic's end test. These are stand-ins built from the
 * topic's own material until each module gets its own kind of test.
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
      const item = c.texts.find((x) => x.id === id)!;
      const pool = c.texts.flatMap((x) => (x.notes ?? []).map((n) => n.bn));
      const pairs = (item.notes ?? []).map((n) => ({ de: n.term, bn: n.bn }));
      if (pairs.length) return meaningQuestions(testId, pairs, pool, 'এর অর্থ কোনটি?');
      return meaningQuestions(testId, item.lines, c.texts.flatMap((x) => x.lines.map((l) => l.bn)), 'এই লাইনের সঠিক অর্থ কোনটি?');
    }
  }
}

export const passesTopicTest = (score: number, total: number) => total > 0 && score / total >= TOPIC_PASS;
