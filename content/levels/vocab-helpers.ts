import type { Article, Level, VocabEntry, VocabTopic } from '../../src/content/types';

/**
 * Helpers for writing word lists. Word ids are built from the level, the
 * topic and the word, so keep those spellings stable once published.
 */

type Draft = Omit<VocabEntry, 'id'>;

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** A noun written with its article, e.g. "der Tag" or "das Land / das Ausland". */
export function noun(de: string, bn: string): Draft {
  const m = /^(der|die|das) (.+)$/.exec(de);
  return m ? { article: m[1] as Article, de: m[2], bn } : { de, bn };
}

export function verb(de: string, bn: string, praeteritum: string, partizip: string): Draft {
  return { de, bn, forms: { praeteritum, partizip } };
}

/** Any other word or phrase (adjectives, word combinations). */
export function word(de: string, bn: string): Draft {
  return { de, bn };
}

/** Makes the topics of one level: titled "Main · Table (Bangla main)". */
export function topicMaker(level: Level) {
  const prefix = level.toLowerCase();
  return (key: string, main: string, mainBn: string, label: string, icon: string, words: Draft[]): VocabTopic => ({
    id: `${prefix}-vocab-${key}`,
    level,
    title: { de: `${main} · ${label}`, bn: `${main} · ${label} (${mainBn})` },
    icon,
    entries: words.map((w) => ({ id: `${prefix}-w-${key}-${slug(w.de)}`, ...w })),
  });
}

/** Verb lists longer than this make two parts, and longer than THREE_PARTS make three. */
const TWO_PARTS = 34;
const THREE_PARTS = 53;

/**
 * Splits long verb lists so a topic stays short: over 34 verbs makes two
 * parts, over 53 makes three. The first part keeps the topic's id (so earlier
 * progress stays), the others get -2 and -3; word ids don't change.
 */
export function splitLongVerbTopics(topics: VocabTopic[]): VocabTopic[] {
  return topics.flatMap((t) => {
    const n = t.entries.length;
    const parts = !t.id.endsWith('-verb') || n <= TWO_PARTS ? 1 : n <= THREE_PARTS ? 2 : 3;
    if (parts === 1) return [t];
    const size = Math.ceil(n / parts);
    return Array.from({ length: parts }, (_, k) => ({
      ...t,
      id: k === 0 ? t.id : `${t.id}-${k + 1}`,
      part: k + 1,
      entries: t.entries.slice(k * size, (k + 1) * size),
    }));
  });
}
