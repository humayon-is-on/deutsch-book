/**
 * Content model for all learning material.
 *
 * Every piece of text a learner reads comes in three layers:
 * German (`de`), Bangla (`bn`, always present, it is the core explanation
 * language) and English (`en`, optional, only where it helps).
 *
 * Ids are globally unique and stable, because progress is stored by id.
 * Convention: `<level>-<module>-<slug>`, e.g. `a1-grammar-sein`.
 */

export type Level = 'A1' | 'A2' | 'B1';
export const LEVELS: Level[] = ['A1', 'A2', 'B1'];

export type ModuleKey = 'grammar' | 'vocabulary' | 'mcq' | 'qa' | 'emails' | 'dialogues';

export type Translated = {
  de: string;
  bn: string;
  en?: string;
};

/** Word-by-word breakdown for a difficult example sentence. */
export type WordGloss = { de: string; bn: string };

export type Example = Translated & { words?: WordGloss[] };

export type GrammarSection = {
  /** Heading in Bangla. */
  heading: string;
  /** Explanation in simple Bangla. */
  body: string;
  /** Optional table, e.g. a conjugation table. First row is the header. */
  table?: string[][];
  examples?: Example[];
};

export type GrammarLesson = {
  id: string;
  level: Level;
  topic: string;
  title: Translated;
  /** One-line Bangla summary shown in lists. */
  summary: string;
  sections: GrammarSection[];
  /** Id of an MCQ/fill-in exercise that practises this lesson. */
  exerciseId?: string;
};

export type Article = 'der' | 'die' | 'das';

export type VocabEntry = {
  id: string;
  de: string;
  article?: Article;
  plural?: string;
  bn: string;
  en?: string;
  /** Pronunciation help written in Bangla script. */
  pronunciation?: string;
  example: Translated;
};

export type VocabTopic = {
  id: string;
  level: Level;
  title: Translated;
  icon: string;
  entries: VocabEntry[];
};

export type Skill = 'grammar' | 'vocabulary' | 'sentence' | 'reading';
export type Difficulty = 1 | 2 | 3;

export type McqQuestion = {
  id: string;
  type: 'mcq';
  prompt: string;
  /** Optional Bangla hint/instruction under the prompt. */
  promptBn?: string;
  options: string[];
  answer: number;
  /** Why the correct answer is correct (Bangla). */
  explanation?: string;
  /** Per-option note on why a wrong option is wrong (Bangla), same index as options. */
  wrongNotes?: (string | undefined)[];
};

export type FillQuestion = {
  id: string;
  type: 'fill';
  /** Sentence with a single `___` gap. */
  prompt: string;
  promptBn?: string;
  /** Accepted answers, compared case-insensitively after trimming. */
  accept: string[];
  explanation?: string;
};

export type Question = McqQuestion | FillQuestion;

export type Exercise = {
  id: string;
  level: Level;
  title: Translated;
  skill: Skill;
  difficulty: Difficulty;
  /** Optional reading passage shown above the questions. */
  passage?: Translated;
  questions: Question[];
};

export type TextLine = Translated & { speaker?: string };

export type Note = { term: string; bn: string };

/** Shared shape for Q&A items, emails/letters and dialogues. */
export type TextItem = {
  id: string;
  level: Level;
  module: 'qa' | 'emails' | 'dialogues';
  topic: string;
  title: Translated;
  /** e.g. "formell", "informell" for emails, a situation for dialogues. */
  tag?: string;
  lines: TextLine[];
  notes?: Note[];
};

export type LevelContent = {
  level: Level;
  grammar: GrammarLesson[];
  vocabulary: VocabTopic[];
  exercises: Exercise[];
  texts: TextItem[];
};
