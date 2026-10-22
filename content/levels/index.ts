import type { Level, LevelContent } from '../../src/content/types';
import { a1 } from './a1';
import { a2 } from './a2';
import { b1 } from './b1';

/** The course, one entry per level. This is the source the published content files are built from. */
export const course: Record<Level, LevelContent> = { A1: a1, A2: a2, B1: b1 };
