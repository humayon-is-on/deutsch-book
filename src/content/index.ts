import type { Level, ModuleKey, Question } from './types';

export * from './types';

/*
 * App-side facts about the course. The course itself (lessons, words,
 * texts, practice) isn't bundled: it is downloaded per topic, see
 * src/services/content.
 */

export const levelInfo: Record<Level, { name: string; bn: string; description: string }> = {
  A1: { name: 'Beginner', bn: 'প্রাথমিক', description: 'একদম শূন্য থেকে শুরু: পরিচয়, শুভেচ্ছা, সংখ্যা, সহজ বাক্য।' },
  A2: { name: 'Elementary', bn: 'প্রাথমিক-মধ্যম', description: 'দৈনন্দিন কথাবার্তা, আরও শব্দ, ব্যাকরণ ও পড়া।' },
  B1: { name: 'Intermediate', bn: 'মধ্যম', description: 'স্বাধীনভাবে কথা বলা, মতামত, লেখা ও পরীক্ষার প্রস্তুতি।' },
};

export const moduleInfo: Record<ModuleKey, { bn: string; de: string; icon: string }> = {
  grammar: { bn: 'ব্যাকরণ', de: 'Grammatik', icon: 'school-outline' },
  vocabulary: { bn: 'শব্দভান্ডার', de: 'Wortschatz', icon: 'book-outline' },
  models: { bn: 'মডেল', de: 'Modelle', icon: 'images-outline' },
  emails: { bn: 'ইমেইল ও চিঠি', de: 'E-Mails & Briefe', icon: 'mail-outline' },
  dialogues: { bn: 'কথোপকথন', de: 'Dialoge', icon: 'chatbubbles-outline' },
};

/** The modules the learner sees, in order. */
export const MODULES: ModuleKey[] = ['grammar', 'vocabulary', 'models', 'emails', 'dialogues'];

/** Normalises German input so ß/ss and umlaut spellings (ae, oe, ue) are accepted. */
export function normalizeAnswer(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/[.!?]+$/, '')
    .replace(/ß/g, 'ss')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/\s+/g, ' ');
}

export type Answer = number | string;

/** A gap answer: the chosen word for each gap, in order. */
export const GAP_JOIN = ' | ';

export function isAnswerCorrect(q: Question, a: Answer | undefined): boolean {
  if (a === undefined) return false;
  if (q.type === 'mcq') return a === q.answer;
  if (q.type === 'gap') {
    const given = String(a).split(GAP_JOIN);
    return q.answers.length === given.length && q.answers.every((x, i) => normalizeAnswer(x) === normalizeAnswer(given[i]));
  }
  const given = normalizeAnswer(String(a));
  const accepted = q.type === 'order' ? [q.words.join(' '), ...(q.accept ?? [])] : q.accept;
  return accepted.some((x) => normalizeAnswer(x) === given);
}

export function correctAnswerText(q: Question) {
  if (q.type === 'gap') return fillGaps(q.prompt, q.answers);
  return q.type === 'mcq' ? q.options[q.answer] : q.type === 'order' ? q.words.join(' ') : q.accept[0];
}

/** A gap sentence with its gaps filled in, in order. */
export function fillGaps(prompt: string, words: string[]) {
  let n = 0;
  return prompt.replace(/___/g, () => words[n++] ?? '___');
}
