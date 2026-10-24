/**
 * Wrong choices for gap questions, picked from words that are easily mixed
 * up with the right one: other articles, pronouns, prepositions, other forms
 * of the same verb. A question can also name its own.
 */

/** Words that are confused with each other. A word may sit in more than one group. */
const GROUPS: string[][] = [
  ['der', 'die', 'das', 'den', 'dem'],
  ['ein', 'eine', 'einen', 'einem', 'einer'],
  ['kein', 'keine', 'keinen', 'keinem', 'keiner'],
  ['nicht', 'kein', 'keine'],
  ['mein', 'meine', 'meinen', 'meinem', 'meiner'],
  ['dein', 'deine', 'deinen', 'deinem', 'deiner'],
  ['sein', 'seine', 'seinen', 'seinem'],
  ['ihr', 'ihre', 'ihren', 'ihrem', 'ihrer'],
  ['unser', 'unsere', 'euer', 'Ihr'],
  ['ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr'],
  ['mich', 'dich', 'ihn', 'uns', 'euch'],
  ['mir', 'dir', 'ihm', 'ihr', 'uns'],
  ['bin', 'bist', 'ist', 'sind', 'seid'],
  ['habe', 'hast', 'hat', 'haben', 'habt'],
  ['kann', 'kannst', 'können', 'könnt'],
  ['muss', 'musst', 'müssen', 'müsst'],
  ['darf', 'darfst', 'dürfen'],
  ['will', 'willst', 'wollen', 'wollt'],
  ['soll', 'sollst', 'sollen', 'sollt'],
  ['möchte', 'möchtest', 'möchten', 'möchtet'],
  ['in', 'im', 'ins', 'an', 'am', 'auf', 'um', 'nach', 'zu', 'zum', 'zur', 'bei', 'beim', 'mit', 'aus', 'von', 'vom', 'für', 'seit'],
  ['und', 'oder', 'aber', 'denn'],
  ['wer', 'was', 'wo', 'woher', 'wohin', 'wann', 'wie', 'warum'],
  ['auf', 'an', 'ab', 'aus', 'ein', 'mit', 'fern', 'zu', 'um'],
  ['halb', 'Viertel', 'nach', 'vor'],
  ['eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf'],
  ['zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'einundzwanzig', 'zweiundzwanzig', 'zwölf'],
  ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
  ['groß', 'klein', 'alt', 'neu', 'teuer', 'billig', 'hell', 'dunkel', 'voll', 'leer', 'krank', 'gesund', 'kurz', 'lang', 'gut', 'schlecht', 'heiß', 'kalt'],
];

/** Verbs whose forms change their vowel, so endings alone can't make them. */
const IRREGULAR: string[][] = [
  ['esse', 'isst', 'essen', 'esst'],
  ['lese', 'liest', 'lesen', 'lest'],
  ['fahre', 'fährst', 'fährt', 'fahren', 'fahrt'],
  ['spreche', 'sprichst', 'spricht', 'sprechen', 'sprecht'],
  ['sehe', 'siehst', 'sieht', 'sehen', 'seht'],
  ['nehme', 'nimmst', 'nimmt', 'nehmen', 'nehmt'],
  ['gebe', 'gibst', 'gibt', 'geben', 'gebt'],
  ['helfe', 'hilfst', 'hilft', 'helfen', 'helft'],
  ['schlafe', 'schläfst', 'schläft', 'schlafen', 'schlaft'],
  ['laufe', 'läufst', 'läuft', 'laufen', 'lauft'],
  ['heiße', 'heißt', 'heißen'],
];

const capital = (w: string) => w.charAt(0).toUpperCase() + w.slice(1);

/** Regular present-tense forms from the word's stem: lerne, lernst, lernt, lernen. */
function verbForms(word: string): string[] {
  const w = word.toLowerCase();
  const end = ['en', 'st', 'e', 't'].find((e) => w.endsWith(e) && w.length - e.length >= 3);
  if (!end) return [];
  const stem = w.slice(0, -end.length);
  // Stems ending in t/d take an extra e: arbeitest, arbeitet.
  const e = /[td]$/.test(stem) ? 'e' : '';
  return [`${stem}e`, `${stem}${e}st`, `${stem}${e}t`, `${stem}en`];
}

/**
 * Up to `count` wrong choices for `answer`, nearest in their group first,
 * written with a capital when the answer has one.
 */
export function wrongChoices(answer: string, count = 2): string[] {
  const lower = answer.toLowerCase();
  const pool = [...GROUPS, ...IRREGULAR].filter((g) => g.some((w) => w.toLowerCase() === lower));
  const near = pool.flatMap((g) => {
    const at = g.findIndex((w) => w.toLowerCase() === lower);
    // Neighbours first: the words around the answer in its group.
    return [...g.keys()].sort((a, b) => Math.abs(a - at) - Math.abs(b - at)).map((k) => g[k]);
  });
  const candidates = near.length ? near : verbForms(answer);
  const out: string[] = [];
  for (const c of candidates) {
    const word = answer[0] === answer[0].toUpperCase() && answer[0] !== answer[0].toLowerCase() ? capital(c) : c;
    if (word.toLowerCase() !== lower && !out.some((o) => o.toLowerCase() === word.toLowerCase())) out.push(word);
    if (out.length === count) break;
  }
  return out;
}

/**
 * Mix-ups for sentence building that can never make another correct sentence:
 * other forms of the same article, possessive or verb (bin for bist, einen for
 * ein). Swaps like Montag for Dienstag or in for nach are left out, as they
 * would often still be right.
 */
const FORMS: string[][] = [
  ['der', 'die', 'das', 'den', 'dem'],
  ['ein', 'eine', 'einen', 'einem', 'einer'],
  ['kein', 'keine', 'keinen', 'keinem', 'keiner'],
  ['mein', 'meine', 'meinen', 'meinem', 'meiner'],
  ['dein', 'deine', 'deinen', 'deinem', 'deiner'],
  ['seine', 'seinen', 'seinem'],
  ['ihre', 'ihren', 'ihrem', 'ihrer'],
  ['unser', 'unsere', 'unseren', 'unserem'],
];
const VERBS = GROUPS.filter((g) => g.includes('bin') || g.includes('habe') || g.includes('kann') || g.includes('muss') || g.includes('darf') || g.includes('will') || g.includes('soll') || g.includes('möchte'));
/** Subject pronouns whose swap can't fit the same verb. */
const OTHER_PERSON: Record<string, string> = { ich: 'du', du: 'ich', wir: 'ihr', ihr: 'wir' };

/**
 * Up to two extra words for sentence building that don't belong in the
 * sentence: another form of one of its words, never a word it already has.
 */
export function extraWords(words: string[], count = 2): string[] {
  const lower = words.map((w) => w.toLowerCase());
  const has = new Set(lower);
  const out: string[] = [];
  const add = (c: string, like: string) => {
    const word = like[0] !== like[0].toLowerCase() ? capital(c) : c;
    if (out.length < count && !has.has(word.toLowerCase()) && !out.some((o) => o.toLowerCase() === word.toLowerCase())) out.push(word);
  };
  // With „sie“ the verb could fit she, they or you, so its forms are left alone.
  const verbsOk = !has.has('sie');
  words.forEach((w, i) => {
    const l = lower[i];
    if (OTHER_PERSON[l]) return add(OTHER_PERSON[l], w);
    // Only an article before its noun: one standing alone („Das ist …“, „Haben Sie das in …“) could be swapped.
    const isNoun = (x?: string) => !!x && x[0] !== x[0].toLowerCase();
    if (FORMS[0].includes(l) && !isNoun(words[i + 1]) && !isNoun(words[i + 2])) return;
    const group = [...FORMS, ...(verbsOk ? [...VERBS, ...IRREGULAR] : [])].find((g) => g.some((x) => x.toLowerCase() === l));
    if (group) {
      const at = group.findIndex((x) => x.toLowerCase() === l);
      const near = [...group.keys()].filter((k) => k !== at).sort((a, b) => Math.abs(a - at) - Math.abs(b - at));
      const pick = near.map((k) => group[k]).find((c) => !has.has(c.toLowerCase()) && !out.includes(c));
      if (pick) add(pick, w);
    }
  });
  // Then a wrong form of the verb beside ich, du, wir or ihr: lernst for „ich lerne“.
  if (verbsOk) {
    words.forEach((w, i) => {
      if ([lower[i - 1], lower[i + 1]].some((x) => x && OTHER_PERSON[x]) && !OTHER_PERSON[lower[i]]) verbForms(w).forEach((c) => add(c, w));
    });
  }
  return out;
}
