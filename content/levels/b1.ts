import { b1Dialogues } from './b1-dialogues';
import { b1Emails } from './b1-emails';
import { b1Models } from './b1-models';
import { b1Practice } from './b1-practice';
import { b1Grammar } from './b1-grammar';
import { b1Vocabulary } from './b1-vocab';
import type { LevelContent } from '../../src/content/types';

export const b1: LevelContent = {
  level: 'B1',
  grammar: b1Grammar,
  vocabulary: b1Vocabulary,
  practice: b1Practice,
  texts: [
    ...b1Models,
    ...b1Emails,
    ...b1Dialogues,
  ],
};
