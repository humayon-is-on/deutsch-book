import type { McqQuestion, VocabEntry, VocabTopic } from '../../src/content/types';

/**
 * A1 Alltagsausdrücke, from the person's list "German A1: 60 Everyday
 * Phrases": six topics of ten phrases, in the list's order. Every phrase has
 * its Bangla and English meaning. Each topic's test asks every phrase twice
 * (German → Bangla, then Bangla → German), so the tests are long.
 */

type Row = [de: string, bn: string, en: string];

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Same order every time for the same seed, so a test is the same on every phone. */
function shuffle<T>(items: T[], seed: string): T[] {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * The topic's test: every phrase German → Bangla, then every phrase Bangla →
 * German, three choices each. Wrong choices come from the same topic, but
 * never a phrase of nearly the same meaning (`twins`), so only one choice is right.
 */
function phraseTest(id: string, entries: VocabEntry[], twins: string[][]): McqQuestion[] {
  const near = (a: VocabEntry, b: VocabEntry) => a === b || twins.some((g) => g.includes(a.de) && g.includes(b.de));
  const ask = (dir: 'de' | 'bn', key: string, promptBn: string): McqQuestion[] =>
    shuffle(entries, `${id}-${key}`).map((e, i) => {
      const other = dir === 'de' ? 'bn' : 'de';
      const wrong = shuffle(entries.filter((x) => !near(e, x)), `${id}-${key}${i}`).slice(0, 2).map((x) => x[other]);
      const options = shuffle([e[other], ...wrong], `${id}-${key}${i}-options`);
      return {
        id: `test-${id}-${key}${i + 1}`,
        type: 'mcq',
        prompt: `„${e[dir]}“`,
        promptBn,
        options,
        answer: options.indexOf(e[other]),
        explanation: `${e.de} = ${e.bn} (${e.en})`,
      };
    });
  return [...ask('de', 'a', 'এর অর্থ কোনটি?'), ...ask('bn', 'b', 'জার্মানে কোনটি?')];
}

function topic(key: string, de: string, bn: string, en: string, icon: string, rows: Row[], twins: string[][] = []): VocabTopic {
  const id = `a1-phrases-${key}`;
  const entries = rows.map(([pde, pbn, pen]) => ({ id: `a1-ph-${key}-${slug(pde)}`, de: pde, bn: pbn, en: pen }));
  return { id, level: 'A1', title: { de, bn: `${de} · ${bn}`, en }, icon, entries, test: phraseTest(id, entries, twins) };
}

export const a1Phrases: VocabTopic[] = [
  topic('alltag', 'Alltag', 'দৈনন্দিন কথা', 'Everyday expressions', 'sunny-outline', [
    ['Guten Morgen!', 'সুপ্রভাত!', 'Good morning!'],
    ['Guten Appetit!', 'খাবার উপভোগ করুন!', 'Enjoy your meal!'],
    ['Gute Nacht!', 'শুভ রাত্রি!', 'Good night!'],
    ['Bis später!', 'পরে দেখা হবে!', 'See you later!'],
    ['Bis bald!', 'শীঘ্রই দেখা হবে!', 'See you soon!'],
    ['Kein Problem!', 'কোনো সমস্যা নেই!', 'No problem!'],
    ['Macht nichts!', 'কিছু যায় আসে না!', "It doesn't matter!"],
    ['Natürlich!', 'অবশ্যই!', 'Of course!'],
    ['Auf jeden Fall!', 'নিশ্চয়ই!', 'Definitely!'],
    ['Vielleicht!', 'হয়তো!', 'Maybe!'],
  ], [['Bis später!', 'Bis bald!'], ['Kein Problem!', 'Macht nichts!'], ['Natürlich!', 'Auf jeden Fall!']]),
  topic('gespraech', 'Im Gespräch', 'কথোপকথনের বাক্য', 'Common conversational phrases', 'chatbubble-ellipses-outline', [
    ["Wie geht's?", 'কেমন আছো?', 'How are you?'],
    ["Mir geht's gut.", 'আমি ভালো আছি।', "I'm fine."],
    ['Was ist los?', 'কী হয়েছে?', "What's wrong?"],
    ['Was meinst du?', 'তুমি কী বোঝাতে চাচ্ছ?', 'What do you mean?'],
    ['Ich verstehe.', 'আমি বুঝেছি।', 'I understand.'],
    ['Ich weiß nicht.', 'আমি জানি না।', "I don't know."],
    ['Keine Ahnung!', 'কোনো ধারণা নেই!', 'No idea!'],
    ['Das stimmt.', 'এটা ঠিক।', "That's right."],
    ['Das glaube ich nicht.', 'আমি এটা বিশ্বাস করি না।', "I don't believe that."],
    ['Du hast recht.', 'তুমি ঠিক বলেছ।', "You're right."],
  ], [['Ich weiß nicht.', 'Keine Ahnung!'], ['Das stimmt.', 'Du hast recht.']]),
  topic('hilfe', 'Hilfe und Nachfragen', 'সাহায্য চাওয়া ও বুঝে নেওয়া', 'Asking for help and clarification', 'help-buoy-outline', [
    ['Kannst du mir helfen?', 'তুমি কি আমাকে সাহায্য করতে পারো?', 'Can you help me?'],
    ['Einen Moment, bitte!', 'এক মুহূর্ত, দয়া করে!', 'One moment, please!'],
    ['Wie bitte?', 'কী বললেন?', 'Pardon?'],
    ['Noch einmal, bitte!', 'আরেকবার বলুন!', 'One more time, please!'],
    ['Langsam, bitte!', 'আস্তে বলুন!', 'Slowly, please!'],
    ['Was bedeutet das?', 'এর অর্থ কী?', 'What does that mean?'],
    ['Wie sagt man das auf Deutsch?', 'এটা জার্মান ভাষায় কীভাবে বলে?', 'How do you say that in German?'],
    ['Ich habe eine Frage.', 'আমার একটি প্রশ্ন আছে।', 'I have a question.'],
    ['Ich brauche Hilfe.', 'আমার সাহায্য দরকার।', 'I need help.'],
    ['Das habe ich nicht verstanden.', 'আমি এটা বুঝিনি।', "I didn't understand that."],
  ], [['Wie bitte?', 'Noch einmal, bitte!'], ['Kannst du mir helfen?', 'Ich brauche Hilfe.']]),
  topic('natuerlich', 'Natürlich sprechen', 'স্বাভাবিক জার্মান অভিব্যক্তি', 'Natural German expressions', 'happy-outline', [
    ['Na klar!', 'তা তো বটেই!', 'Sure!'],
    ['Echt?', 'সত্যি?', 'Really?'],
    ['Ach so!', 'ও, আচ্ছা!', 'Oh, I see!'],
    ['Na gut!', 'আচ্ছা ঠিক আছে!', 'All right then!'],
    ['Schade!', 'আফসোস!', 'What a pity!'],
    ['Super!', 'দারুণ!', 'Great!'],
    ['Toll gemacht!', 'খুব ভালো করেছ!', 'Well done!'],
    ['Das ist mir egal.', 'এটা আমার কাছে গুরুত্বপূর্ণ নয়।', "I don't care."],
    ['Das macht Spaß!', 'এটা বেশ মজার!', "That's fun!"],
    ['Ich freue mich!', 'আমি আনন্দিত!', "I'm happy / excited!"],
  ], [['Na klar!', 'Na gut!'], ['Super!', 'Toll gemacht!']]),
  topic('unterwegs', 'Einkaufen, Arbeit und Reisen', 'কেনাকাটা, কাজ ও ভ্রমণ', 'Shopping, work and travel', 'cart-outline', [
    ['Was kostet das?', 'এটার দাম কত?', 'How much does it cost?'],
    ['Das ist zu teuer.', 'এটা অনেক দামি।', "That's too expensive."],
    ['Ich nehme das.', 'আমি এটা নেব।', "I'll take this."],
    ['Kann ich mit Karte bezahlen?', 'আমি কি কার্ড দিয়ে পেমেন্ট করতে পারি?', 'Can I pay by card?'],
    ['Wo ist der Bahnhof?', 'রেলস্টেশন কোথায়?', 'Where is the train station?'],
    ['Ich suche eine Wohnung.', 'আমি একটি বাসা খুঁজছি।', "I'm looking for an apartment."],
    ['Ich bin gleich da.', 'আমি এখনই পৌঁছাচ্ছি।', "I'll be there in a moment."],
    ['Ich habe keine Zeit.', 'আমার সময় নেই।', "I don't have time."],
    ['Ich bin müde.', 'আমি ক্লান্ত।', "I'm tired."],
    ['Ich muss los.', 'আমাকে এখন যেতে হবে।', 'I have to go.'],
  ]),
  topic('ausdruecke', 'Nützliche Ausdrücke', 'আরও দরকারি বাক্য', 'Useful everyday expressions', 'star-outline', [
    ['Alles klar!', 'সব পরিষ্কার! / ঠিক আছে!', 'Everything is clear! / All right!'],
    ['Keine Sorge!', 'চিন্তা করো না!', "Don't worry!"],
    ['Mach dir keine Sorgen!', 'এটা নিয়ে চিন্তা করো না!', "Don't worry about it!"],
    ['Mal sehen.', 'দেখা যাক।', "Let's see."],
    ['Es kommt darauf an.', 'এটা পরিস্থিতির ওপর নির্ভর করে।', 'It depends.'],
    ['Das klingt gut!', 'শুনতে ভালো লাগছে!', 'That sounds good!'],
    ['Ich bin dabei!', 'আমিও আছি!', "I'm in!"],
    ['Lass uns gehen!', 'চলো যাই!', "Let's go!"],
    ['Warte mal!', 'একটু অপেক্ষা করো!', 'Wait a moment!'],
    ['Gute Idee!', 'ভালো ধারণা!', 'Good idea!'],
  ], [['Keine Sorge!', 'Mach dir keine Sorgen!'], ['Mal sehen.', 'Es kommt darauf an.'], ['Alles klar!', 'Das klingt gut!', 'Gute Idee!']]),
];
