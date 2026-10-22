import type { Level, ModuleKey, Question } from './types';

export * from './types';

/*
 * App-side facts about the course. The course itself (lessons, words,
 * exercises, texts) isn't bundled: it is downloaded per topic, see
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
  mcq: { bn: 'অনুশীলনী', de: 'Übungen', icon: 'checkbox-outline' },
  emails: { bn: 'ইমেইল ও চিঠি', de: 'E-Mails & Briefe', icon: 'mail-outline' },
  dialogues: { bn: 'কথোপকথন', de: 'Dialoge', icon: 'chatbubbles-outline' },
};

export const MODULES: ModuleKey[] = ['grammar', 'vocabulary', 'mcq', 'emails', 'dialogues'];

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

export function isAnswerCorrect(q: Question, a: Answer | undefined): boolean {
  if (a === undefined) return false;
  if (q.type === 'mcq') return a === q.answer;
  const given = normalizeAnswer(String(a));
  return q.accept.some((x) => normalizeAnswer(x) === given);
}

export function correctAnswerText(q: Question) {
  return q.type === 'mcq' ? q.options[q.answer] : q.accept[0];
}
