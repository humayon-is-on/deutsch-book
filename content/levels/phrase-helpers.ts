import type { Level, McqQuestion, VocabEntry, VocabTopic } from '../../src/content/types';

/**
 * Helpers for everyday-phrase topics. Phrase ids are built from the level,
 * the topic key and the phrase, so keep those spellings stable once published.
 */

export type PhraseRow = [de: string, bn: string, en: string];

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Same order every time for the same seed, so a test is the same on every phone. */
function shuffle<T>(items: T[], seed: string): T[] {
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
 * The topic's test: every phrase German → Bangla, then every phrase Bangla →
 * German, three choices each. Wrong choices come from the same topic, but
 * never a phrase of nearly the same meaning (`twins`), so only one choice is right.
 */
function phraseTest(id: string, entries: VocabEntry[], twins: string[][]): McqQuestion[] {
  const near = (a: VocabEntry, b: VocabEntry) => a === b || twins.some((g) => g.includes(a.de) && g.includes(b.de));
  const ask = (dir: 'de' | 'bn', key: string, promptBn: string): McqQuestion[] =>
    shuffle(entries, `${id}-${key}`).map((e, i) => {
      const other = dir === 'de' ? 'bn' : 'de';
      const wrong = shuffle(entries.filter((x) => !near(e, x)), `${id}-${key}${i}`).slice(0, 2).map((x) => x[other]);
      const options = shuffle([e[other], ...wrong], `${id}-${key}${i}-options`);
      return {
        id: `test-${id}-${key}${i + 1}`,
        type: 'mcq',
        prompt: `„${e[dir]}“`,
        promptBn,
        options,
        answer: options.indexOf(e[other]),
        explanation: `${e.de} = ${e.bn} (${e.en})`,
      };
    });
  return [...ask('de', 'a', 'এর অর্থ কোনটি?'), ...ask('bn', 'b', 'জার্মানে কোনটি?')];
}

/** Makes the phrase topics of one level. `twins` are phrases of nearly the same meaning. */
export function phraseTopicMaker(level: Level) {
  const prefix = level.toLowerCase();
  return (key: string, de: string, bn: string, en: string, icon: string, rows: PhraseRow[], twins: string[][] = []): VocabTopic => {
    const id = `${prefix}-phrases-${key}`;
    const entries = rows.map(([pde, pbn, pen]) => ({ id: `${prefix}-ph-${key}-${slug(pde)}`, de: pde, bn: pbn, en: pen }));
    return { id, level, title: { de, bn: `${de} · ${bn}`, en }, icon, entries, test: phraseTest(id, entries, twins) };
  };
}
