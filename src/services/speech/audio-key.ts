// Pure helpers shared by the app and the audio generator (scripts/audio-list.ts),
// so both name a sentence's recording the same way.

/** The text as it is spoken: spacing tidied. */
export function speechText(text: string) {
  return text.replace(/\s+/g, ' ').trim();
}

/** cyrb53: a small, stable 53-bit string hash. */
function hash(s: string) {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

/**
 * The voice and speed the recordings are made with. Changing it gives every
 * recording a new name, so the generator records them all again and no device
 * keeps playing an old copy.
 */
export const VOICE = 'thorsten-high@1.25';

/** Where a German word or sentence's recording lives, relative to the content root. */
export function audioPath(text: string) {
  return `audio/${hash(`${VOICE}|${speechText(text)}`)}.mp3`;
}

/** A word as it is spoken: with its article. */
export function spokenWord(w: { de: string; article?: string }) {
  return w.article ? `${w.article} ${w.de}` : w.de;
}

/** A letter, email or model text read as one piece. */
export function spokenText(lines: { de: string }[]) {
  return lines.map((l) => l.de).join(' ');
}
