/*
 * Writes the published course files: `npx tsx scripts/build-content.ts <out dir>`.
 * The web workflow runs it into dist/content, so the files are served next to
 * the web app and the phone app downloads them from there.
 */
import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { buildCourse } from '../content/build';
import { course } from '../content/levels';

const outDir = process.argv[2] ?? 'dist/content';
const files = buildCourse(course);
for (const [path, data] of Object.entries(files)) {
  const target = join(outDir, path);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, JSON.stringify(data));
}
// Pictures (model texts) are served as they are.
cpSync('content/images', join(outDir, 'images'), { recursive: true });
console.log(`Wrote ${Object.keys(files).length} content files to ${outDir}`);
