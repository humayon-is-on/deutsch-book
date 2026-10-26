/*
 * Lists the German words and sentences that still need a recording:
 * `npx tsx scripts/audio-list.ts A1 A2 > todo.jsonl`. Each line is
 * {"file": "audio/….mp3", "text": "…"}; files already in content/audio are
 * skipped. The "Generate audio" workflow records them with Piper.
 * Keep this in step with the speaker buttons in the app.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { buildLevel } from '../content/build';
import { course } from '../content/levels';
import type { Level } from '../src/content';
import type { Example, GrammarBlock, VocabEntry } from '../src/content/types';
import { audioPath, speechText, spokenText, spokenWord } from '../src/services/speech/audio-key';

const levels = (process.argv.slice(2).length ? process.argv.slice(2) : ['A1', 'A2']) as Level[];
const texts = new Set<string>();
const add = (t: string | undefined) => t && speechText(t) && texts.add(speechText(t));
const word = (w: VocabEntry) => {
  add(spokenWord(w));
  add(w.example?.de);
};
const examples = (items?: Example[]) => items?.forEach((e) => add(e.de));
const blocks = (list?: GrammarBlock[]) => list?.forEach((b) => b.kind === 'examples' && examples(b.items));

for (const level of levels) {
  for (const f of Object.values(buildLevel(course[level]).files)) {
    if (f.module === 'vocabulary') f.item.entries.forEach(word);
    else if (f.module === 'grammar') {
      blocks(f.item.intro);
      f.item.sections.forEach((s) => {
        examples(s.examples);
        blocks(s.blocks);
      });
    } else if (f.module === 'mcq') add(f.item.passage?.de);
    else if (f.module === 'dialogues') {
      f.item.lines.forEach((l) => add(l.de));
      f.item.words?.forEach(word);
    } else if (f.module === 'models' || f.module === 'emails') {
      add(spokenText(f.item.lines));
      f.item.words?.forEach(word);
    }
  }
}

let missing = 0;
for (const text of texts) {
  const file = audioPath(text);
  if (existsSync(join('content', file))) continue;
  missing++;
  process.stdout.write(JSON.stringify({ file, text }) + '\n');
}
console.error(`${texts.size} texts, ${missing} need recording`);
