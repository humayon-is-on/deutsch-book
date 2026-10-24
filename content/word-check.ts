import type { LevelContent, Question } from '../src/content/types';

/**
 * Word checks for the practice ladder: every German word a practice question
 * shows must appear somewhere in the level's modules (grammar, vocabulary,
 * models, letters & emails, dialogues).
 */

/** Keys that never hold German course text. */
const SKIP = new Set(['id', 'icon', 'bn', 'en', 'level', 'skill', 'module', 'exerciseId', 'promptBn', 'explanation', 'wrongNotes']);

/** Lower-case German words in a text: Latin letters with umlauts and ß, Bangla and digits ignored. */
export const wordsIn = (text: string) => (text.toLowerCase().match(/[a-zäöüß]+/g) ?? []).filter((w) => w.length > 1 || w === 'a');

function collect(value: unknown, into: Set<string>) {
  if (typeof value === 'string') wordsIn(value).forEach((w) => into.add(w));
  else if (Array.isArray(value)) value.forEach((v) => collect(v, into));
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) if (!SKIP.has(k)) collect(v, into);
  }
}

const ENDINGS = ['en', 'er', 'es', 'em', 'st', 'e', 'n', 's', 't'];

/** A word without its ending, so that regular forms (lerne, lernst, lernt) meet. */
export function stem(w: string) {
  const end = ENDINGS.find((e) => w.endsWith(e) && w.length - e.length >= 3);
  return end ? w.slice(0, -end.length) : w;
}

/** Prefixes of separable verbs: „aufräumen“ also teaches „ich räume … auf“. */
const PREFIXES = ['zurück', 'fern', 'auf', 'aus', 'ein', 'mit', 'weg', 'an', 'ab', 'um', 'vor', 'zu'];

/** Every German word the level's modules use, and their stems. */
export function courseWords(c: LevelContent) {
  const words = new Set<string>();
  collect([c.grammar, c.vocabulary, c.exercises, c.texts], words);
  const stems = new Set<string>();
  for (const w of words) {
    stems.add(stem(w));
    const prefix = PREFIXES.find((x) => w.startsWith(x) && w.length - x.length >= 4);
    if (prefix) stems.add(stem(w.slice(prefix.length)));
  }
  return { words, stems };
}

/** Whether the course knows a word: the same word, or a regular form of it. */
export const knows = (course: ReturnType<typeof courseWords>, w: string) => course.words.has(w) || course.stems.has(stem(w));

/**
 * The German words a question teaches: its prompt and right answer. Wrong
 * choices are left out, as they are often deliberately wrong forms.
 */
export function questionWords(q: Question) {
  const parts = q.type === 'mcq' ? [q.prompt, q.options[q.answer]] : q.type === 'order' ? [...q.words, ...(q.accept ?? [])] : [q.prompt, ...q.accept];
  // Bangla (and any bracket holding Bangla) is left out; the German around it is kept.
  return parts.flatMap((p) => wordsIn(p.replace(/\([^)]*[\u0980-\u09FF][^)]*\)/g, '').replace(/[\u0980-\u09FF]+/g, ' ')));
}
