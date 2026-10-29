import { a2Grammar } from './a2-grammar';
import { a2Dialogues } from './a2-dialogues';
import { a2Emails } from './a2-emails';
import { a2Exam } from './a2-exam';
import { a2Models } from './a2-models';
import { a2Practice } from './a2-practice';
import { a2Vocabulary } from './a2-vocab';
import type { LevelContent } from '../../src/content/types';

export const a2: LevelContent = {
  level: 'A2',
  grammar: a2Grammar,
  vocabulary: a2Vocabulary,
  practice: [...a2Practice, a2Exam],
  texts: [
    ...a2Models,
    ...a2Emails,
    ...a2Dialogues,
  ],
};
