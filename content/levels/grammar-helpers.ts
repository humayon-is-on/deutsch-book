import type { GrammarBlock, GrammarLesson, GrammarSection, Level, McqQuestion } from '../../src/content/types';

/** Building blocks for grammar topics, shared by every level. */

export const text = (t: string): GrammarBlock => ({ kind: 'text', text: t });
export const table = (...rows: string[][]): GrammarBlock => ({ kind: 'table', rows });
export const list = (...items: string[]): GrammarBlock => ({ kind: 'list', items });
export const numbered = (...items: string[]): GrammarBlock => ({ kind: 'list', items, numbered: true });
/** Example sentences, each as [German, Bangla]. */
export const examples = (...pairs: [string, string][]): GrammarBlock => ({
  kind: 'examples',
  items: pairs.map(([de, bn]) => ({ de, bn })),
});
/** Example sentences with English, each as [German, English, Bangla]. */
export const examplesEn = (...rows: [string, string, string][]): GrammarBlock => ({
  kind: 'examples',
  items: rows.map(([de, en, bn]) => ({ de, en, bn })),
});
export const section = (heading: string, ...blocks: GrammarBlock[]): GrammarSection => ({ heading, blocks });

/** A test question: prompt, three options, the index of the right one, and why it's right. */
type Q = [prompt: string, options: [string, string, string], answer: 0 | 1 | 2, explanation: string];

/** Makes the grammar topics of one level: ids are `<level>-grammar-<slug>`. */
export function lessonMaker(level: Level) {
  return (l: {
    slug: string;
    topic: string;
    de: string;
    bn: string;
    summary: string;
    intro?: GrammarBlock[];
    sections: GrammarSection[];
    test: Q[];
    /** Subtopic number within its main topic: 1.1, 1.2, … */
    part?: number;
  }): GrammarLesson => {
    const id = `${level.toLowerCase()}-grammar-${l.slug}`;
    return {
      id,
      level,
      topic: l.topic,
      title: { de: l.de, bn: l.bn },
      summary: l.summary,
      intro: l.intro,
      sections: l.sections,
      ...(l.part ? { part: l.part } : {}),
      test: l.test.map(
        ([prompt, options, answer, explanation], i): McqQuestion => ({
          id: `${id}-t${i + 1}`,
          type: 'mcq',
          prompt,
          options,
          answer,
          explanation,
        }),
      ),
    };
  };
}
