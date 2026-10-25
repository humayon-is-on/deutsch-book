import type { GapQuestion, Level, McqQuestion, OrderQuestion, PracticeKind, PracticeSet, Translated } from '../../src/content/types';
import { extraWords, wrongChoices } from './gap-options';

/** Building blocks for the practice ladders of every level. */

export type Draft = Omit<McqQuestion, 'id'> | Omit<GapQuestion, 'id'> | Omit<OrderQuestion, 'id'>;

/**
 * Sentence building: the German sentence to build and its Bangla meaning.
 * Other correct orders can be added. Two extra words that don't belong are mixed in.
 */
export function b(de: string, bn: string, ...accept: string[]): Omit<OrderQuestion, 'id'> {
  const strip = (s: string) => s.replace(/[.!?]$/, '');
  const words = strip(de).split(' ');
  return { type: 'order', prompt: bn, promptBn: 'শব্দগুলো সাজিয়ে বাক্যটি তৈরি করুন', words, accept: accept.map(strip), extra: extraWords(words) };
}

/** MCQ with three choices; `answer` is the right choice's position. */
export function m(prompt: string, options: [string, string, string], answer: number, explanation?: string): Omit<McqQuestion, 'id'> {
  return { type: 'mcq', prompt, options, answer, explanation };
}

/**
 * Fill in the gap by choosing a word: a sentence with one ___, the right word
 * (the first of `accept`), a Bangla hint and, if the usual mix-ups don't fit,
 * the wrong choices to offer.
 */
export function f(prompt: string, accept: string | string[], promptBn?: string, explanation?: string, wrong?: string[]): Omit<GapQuestion, 'id'> {
  const answer = typeof accept === 'string' ? accept : accept[0];
  return { type: 'gap', prompt, answers: [answer], options: [answer, ...(wrong ?? wrongChoices(answer))], promptBn, explanation };
}

/** Two gaps in one sentence: the right word for each, and the wrong choices offered with them. */
export function f2(prompt: string, answers: [string, string], promptBn?: string, explanation?: string, wrong?: string[]): Omit<GapQuestion, 'id'> {
  const extra = wrong ?? [...wrongChoices(answers[0], 1), ...wrongChoices(answers[1], 2)].filter((w) => !answers.includes(w)).slice(0, 2);
  return { type: 'gap', prompt, answers: [...answers], options: [...new Set([...answers, ...extra])], promptBn, explanation };
}

/** Makes a level's cards, numbered in the order they are made: a1-practice-1, a1-practice-2, … */
export function cardMaker(level: Level) {
  let count = 0;
  return (kind: PracticeKind, title: Translated, questions: Draft[]): PracticeSet => {
    count += 1;
    const id = `${level.toLowerCase()}-practice-${count}`;
    return { id, level, kind, title, questions: questions.map((q, i) => ({ ...q, id: `${id}-q${i + 1}` }) as PracticeSet['questions'][number]) };
  };
}

/** A level test of 20 questions, closing the ladder. */
export function levelExam(level: Level, title: Translated, questions: Draft[]): PracticeSet {
  const id = `${level.toLowerCase()}-exam`;
  return { id, level, kind: 'exam', title, questions: questions.map((q, i) => ({ ...q, id: `${id}-q${i + 1}` }) as PracticeSet['questions'][number]) };
}


/**
 * Moves each MCQ's right answer to a varied position (first, second or third),
 * picked from the question's id so it stays the same on every phone.
 */
export function spreadAnswers(set: PracticeSet): PracticeSet {
  return {
    ...set,
    questions: set.questions.map((q) => {
      if (q.type !== 'mcq') return q;
      const shift = [...q.id].reduce((n, c) => (n * 31 + c.charCodeAt(0)) % 9973, 7) % q.options.length;
      const options = q.options.map((_, i) => q.options[(i + q.options.length - shift) % q.options.length]);
      return { ...q, options, answer: (q.answer + shift) % q.options.length };
    }),
  };
}
