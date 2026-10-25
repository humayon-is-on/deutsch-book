import { b, f, levelExam, m, type Draft } from './practice-helpers';

/**
 * The A1 level test at the end of the practice ladder: 20 of the harder A1
 * questions, drawn from every module (grammar, vocabulary, letters and
 * dialogues). Passing it takes the learner up to A2.
 */

const questions: Draft[] = [
  m('Ich helfe ___ Mutter in der Küche.', ['meine', 'meiner', 'meinen'], 1, 'helfen + Dativ; die Mutter → meiner'),
  b('Der Zug fährt um halb acht ab.', 'ট্রেন সাড়ে সাতটায় ছাড়ে।', 'Um halb acht fährt der Zug ab.'),
  f('Ich hole meine Freundin vom Bahnhof ___. (abholen)', 'ab', 'trennbares Verb: উপসর্গটি বাক্যের শেষে যায়', 'abholen → ich hole … ab'),
  m('Wir fahren ___ Bus zur Arbeit.', ['mit dem', 'mit den', 'mit der'], 0, 'mit + Dativ; der Bus → dem Bus'),
  m('Morgen ___ ich nicht kommen, ich bin krank.', ['kann', 'kannst', 'können'], 0, 'ich → kann'),
  b('Am Wochenende besuche ich meine Oma.', 'সপ্তাহান্তে আমি দাদিকে দেখতে যাই।', 'Ich besuche am Wochenende meine Oma.'),
  f('Ich habe ___ Zeit. Ich muss arbeiten.', 'keine', 'Zeit স্ত্রীলিঙ্গ', 'die Zeit → keine Zeit'),
  m('Kennst du den Mann? – Ja, ich kenne ___.', ['er', 'ihn', 'ihm'], 1, 'Akkusativ: er → ihn'),
  m('___ bitte das Fenster, es ist kalt! (du)', ['Mach … zu', 'Machst … zu', 'Machen … zu'], 0, 'du-Imperativ: Mach das Fenster zu!'),
  b('Wo kann ich eine Fahrkarte kaufen?', 'আমি কোথায় টিকিট কিনতে পারি?'),
  f('Er ___ jeden Morgen um sechs Uhr auf. (aufstehen)', 'steht', 'er-এর রূপ বেছে নিন', 'aufstehen → er steht … auf'),
  m('Die Kinder ___ im Park.', ['spielt', 'spielen', 'spielst'], 1, 'die Kinder (sie, Plural) → spielen'),
  m('Wie heißt der Plural von „das Buch“?', ['die Buchs', 'die Bücher', 'die Buche'], 1),
  b('Leider habe ich heute keine Zeit.', 'দুঃখিত, আজ আমার সময় নেই।', 'Ich habe heute leider keine Zeit.', 'Heute habe ich leider keine Zeit.'),
  f('Der Termin ist am Montag ___ zehn Uhr.', 'um', 'ঘড়ির সময়ের আগে কোন প্রিপজিশন?', 'Uhrzeit → um zehn Uhr'),
  m('„umsteigen“ মানে …', ['গাড়ি বদল করা', 'গাড়ি থেকে নামা', 'গাড়িতে উঠা'], 0),
  b('Ich komme nicht, denn ich bin krank.', 'আমি আসছি না, কারণ আমি অসুস্থ।'),
  f('Liebe Maria, vielen Dank für ___ Brief! (dein)', 'deinen', 'der Brief, Akkusativ', 'für + Akkusativ: deinen Brief'),
  m('Entschuldigung, wie komme ich ___ Bahnhof?', ['zum', 'zur', 'nach'], 0, 'zu + dem → zum (der Bahnhof)'),
  b('Kannst du mir bitte helfen?', 'তুমি কি আমাকে একটু সাহায্য করতে পারবে?'),
];

export const a1Exam = levelExam('A1', { de: 'A1-Abschlusstest', bn: 'A1 লেভেল টেস্ট' }, questions);
