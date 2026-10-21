import { a1 } from './a1';
import { a2 } from './a2';
import { b1 } from './b1';
import type {
  Exercise,
  GrammarLesson,
  Level,
  LevelContent,
  ModuleKey,
  Question,
  TextItem,
  VocabEntry,
  VocabTopic,
} from './types';

export * from './types';

export const content: Record<Level, LevelContent> = { A1: a1, A2: a2, B1: b1 };

export const levelInfo: Record<Level, { name: string; bn: string; description: string }> = {
  A1: { name: 'Beginner', bn: 'প্রাথমিক', description: 'একদম শূন্য থেকে শুরু: পরিচয়, শুভেচ্ছা, সংখ্যা, সহজ বাক্য।' },
  A2: { name: 'Elementary', bn: 'প্রাথমিক-মধ্যম', description: 'দৈনন্দিন কথাবার্তা, আরও শব্দ, ব্যাকরণ ও পড়া।' },
  B1: { name: 'Intermediate', bn: 'মধ্যম', description: 'স্বাধীনভাবে কথা বলা, মতামত, লেখা ও পরীক্ষার প্রস্তুতি।' },
};

export const moduleInfo: Record<ModuleKey, { bn: string; de: string; icon: string }> = {
  grammar: { bn: 'ব্যাকরণ', de: 'Grammatik', icon: 'school-outline' },
  vocabulary: { bn: 'শব্দভান্ডার', de: 'Wortschatz', icon: 'book-outline' },
  mcq: { bn: 'অনুশীলনী', de: 'Übungen', icon: 'checkbox-outline' },
  qa: { bn: 'প্রশ্ন ও উত্তর', de: 'Fragen & Antworten', icon: 'help-circle-outline' },
  emails: { bn: 'ইমেইল ও চিঠি', de: 'E-Mails & Briefe', icon: 'mail-outline' },
  dialogues: { bn: 'কথোপকথন', de: 'Dialoge', icon: 'chatbubbles-outline' },
};

export const MODULES: ModuleKey[] = ['grammar', 'vocabulary', 'mcq', 'qa', 'emails', 'dialogues'];

const all = Object.values(content);

const grammarById = new Map<string, GrammarLesson>(all.flatMap((c) => c.grammar.map((g) => [g.id, g])));
const topicById = new Map<string, VocabTopic>(all.flatMap((c) => c.vocabulary.map((t) => [t.id, t])));
const entryById = new Map<string, VocabEntry>(
  all.flatMap((c) => c.vocabulary.flatMap((t) => t.entries.map((e) => [e.id, e] as const))),
);
const exerciseById = new Map<string, Exercise>(all.flatMap((c) => c.exercises.map((e) => [e.id, e])));
const textById = new Map<string, TextItem>(all.flatMap((c) => c.texts.map((t) => [t.id, t])));
const questionIndex = new Map<string, { question: Question; exercise: Exercise }>(
  all.flatMap((c) => c.exercises.flatMap((e) => e.questions.map((q) => [q.id, { question: q, exercise: e }] as const))),
);

export const getGrammar = (id: string) => grammarById.get(id);
export const getVocabTopic = (id: string) => topicById.get(id);
export const getVocabEntry = (id: string) => entryById.get(id);
export const getExercise = (id: string) => exerciseById.get(id);
export const getText = (id: string) => textById.get(id);
export const getQuestion = (id: string) => questionIndex.get(id);

export function textsFor(level: Level, module: TextItem['module']) {
  return content[level].texts.filter((t) => t.module === module);
}

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
