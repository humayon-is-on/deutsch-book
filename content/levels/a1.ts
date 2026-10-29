import { a1Dialogues } from './a1-dialogues';
import { a1Grammar } from './a1-grammar';
import { a1Letters } from './a1-letters';
import { a1Models } from './a1-models';
import { a1Exam } from './a1-exam';
import { a1Practice } from './a1-practice';
import { a1Vocabulary } from './a1-vocab';
import type { LevelContent } from '../../src/content/types';

export const a1: LevelContent = {
  level: 'A1',
  grammar: a1Grammar,
  vocabulary: a1Vocabulary,
  practice: [...a1Practice, a1Exam],
  texts: [
    ...a1Models,
    ...a1Letters,
    ...a1Dialogues,
  ],
};
