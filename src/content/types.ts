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

export type ModuleKey = 'grammar' | 'vocabulary' | 'mcq' | 'models' | 'emails' | 'dialogues';

export type Translated = {
  de: string;
  bn: string;
  en?: string;
};

/** Word-by-word breakdown for a difficult example sentence. */
export type WordGloss = { de: string; bn: string };

export type Example = Translated & { words?: WordGloss[] };

/** One piece of a grammar section, shown in the order written. */
export type GrammarBlock =
  | { kind: 'text'; text: string }
  /** First row is the header. */
  | { kind: 'table'; rows: string[][] }
  | { kind: 'examples'; items: Example[] }
  | { kind: 'list'; items: string[]; numbered?: boolean };

export type GrammarSection = {
  /** Heading in Bangla. */
  heading: string;
  /** Explanation in simple Bangla. */
  body?: string;
  /** Optional table, e.g. a conjugation table. First row is the header. */
  table?: string[][];
  examples?: Example[];
  /** Text, tables, lists and examples mixed in their own order, shown after the fields above. */
  blocks?: GrammarBlock[];
};

export type GrammarLesson = {
  id: string;
  level: Level;
  topic: string;
  title: Translated;
  /** One-line Bangla summary shown in lists. */
  summary: string;
  /** Shown above the first section, without a heading. */
  intro?: GrammarBlock[];
  sections: GrammarSection[];
  /** Id of an MCQ/fill-in exercise that practises this lesson. */
  exerciseId?: string;
  /** The end-of-topic test. Without one, a stand-in test is built from the lesson. */
  test?: McqQuestion[];
  /** Subtopic number when a main topic is split (1, 2, 3), shown as 1.1, 1.2, … */
  part?: number;
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
  /** Past forms of a verb. */
  forms?: { praeteritum: string; partizip: string };
  example?: Translated;
};

export type VocabTopic = {
  id: string;
  level: Level;
  title: Translated;
  icon: string;
  entries: VocabEntry[];
  /** Part number when a long word list is split (1, 2, 3), shown as 3.1, 3.2, … */
  part?: number;
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

export type OrderQuestion = {
  id: string;
  type: 'order';
  /** What to build, usually the sentence's Bangla meaning. */
  prompt: string;
  promptBn?: string;
  /** The sentence's words in the right order; the learner gets them mixed up. */
  words: string[];
  /** Other correct sentences from the same words, e.g. "Heute lerne ich Deutsch." */
  accept?: string[];
  /** Extra words that don't belong in the sentence, mixed in with the others. */
  extra?: string[];
  explanation?: string;
};

/**
 * Fill in the gaps by choosing words: the learner taps a word and it moves
 * into the next gap. Once every gap is filled the answer is checked.
 */
export type GapQuestion = {
  id: string;
  type: 'gap';
  /** Sentence with one or two `___` gaps. */
  prompt: string;
  promptBn?: string;
  /** The right word for each gap, in order. */
  answers: string[];
  /** Words to choose from: the answers and some wrong ones. Shown mixed. */
  options: string[];
  explanation?: string;
};

export type Question = McqQuestion | FillQuestion | OrderQuestion | GapQuestion;

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

/** The kinds of card on the practice ladder; the level test ('exam') closes it. */
export type PracticeKind = 'build' | 'mcq' | 'fill' | 'exam';

/** One card of the practice ladder: a set of questions of one kind. */
export type PracticeSet = {
  id: string;
  level: Level;
  kind: PracticeKind;
  title: Translated;
  questions: Question[];
};

export type TextLine = Translated & { speaker?: string };

export type Note = { term: string; bn: string };

/** Shared shape for emails/letters, dialogues and model texts. */
export type TextItem = {
  id: string;
  level: Level;
  module: 'emails' | 'dialogues' | 'models';
  topic: string;
  title: Translated;
  /** e.g. "formell", "informell" for emails, a situation for dialogues. */
  tag?: string;
  lines: TextLine[];
  notes?: Note[];
  /** A picture for the text, relative to the content root (model texts). */
  image?: string;
  /** The picture's width / height, when it isn't the A1 size. */
  imageAspect?: number;
  /** A short description of the situation, shown above the text (A2 dialogues). */
  situation?: { bn: string; en?: string };
  /** Key words of the text (Bangla only) that the learner can bookmark. */
  words?: VocabEntry[];
  /** Questions on what the text says, asked first in its end test. */
  questions?: McqQuestion[];
};

export type LevelContent = {
  level: Level;
  grammar: GrammarLesson[];
  vocabulary: VocabTopic[];
  exercises: Exercise[];
  texts: TextItem[];
  /** The practice ladder, in order. */
  practice?: PracticeSet[];
};

/*
 * Published content. The course isn't part of the app: it is published as
 * files (see content/ and scripts/build-content.ts) and downloaded on demand.
 */

/** Version of the published file format. The app ignores files of a format it doesn't know. */
export const CONTENT_SCHEMA = 1;

/** Where each level's table of contents is. Fetched fresh on every app start. */
export type ContentManifest = { schema: number; version: string; levels: Partial<Record<Level, { index: string }>> };

/** One topic in a level's table of contents: enough to list, lock and count it without downloading it. */
export type TopicSummary = {
  id: string;
  title: Translated;
  /** Short line under the title: a grammar summary or a text's tag. */
  subtitle?: string;
  /** Vocabulary: the topic's word ids, for counting learned and saved words. */
  wordIds?: string[];
  /** Exercises: the question ids, for scores and revision. */
  questionIds?: string[];
  /** Exercises made only of fill-in questions. */
  fill?: boolean;
  /** Vocabulary and grammar: part number of a split topic. */
  part?: number;
  /** The topic's file, relative to the content root. Its name changes whenever the topic does. */
  file: string;
};

/** A level's table of contents: every topic of every module, in order. */
export type LevelIndex = {
  schema: number;
  level: Level;
  version: string;
  modules: Record<ModuleKey, TopicSummary[]>;
  /** The practice ladder's cards, in order (missing in older files). */
  practice?: (TopicSummary & { kind: PracticeKind })[];
};

export type TopicItem =
  | { module: 'grammar'; item: GrammarLesson }
  | { module: 'vocabulary'; item: VocabTopic }
  | { module: 'mcq'; item: Exercise }
  | { module: 'emails' | 'dialogues' | 'models'; item: TextItem }
  | { module: 'practice'; item: PracticeSet };

/** One downloaded topic: its content and the test that finishes it (empty for exercises, which are their own test). */
export type TopicFile = TopicItem & { schema: number; id: string; level: Level; test: Question[] };
