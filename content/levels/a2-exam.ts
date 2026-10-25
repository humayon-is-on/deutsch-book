import { b, f, levelExam, m, spreadAnswers, type Draft } from './practice-helpers';

/**
 * The A2 level test at the end of the practice ladder: 20 of the hardest A2
 * questions, drawn from every module (grammar, vocabulary, models, emails
 * and dialogues). Passing it takes the learner up to B1.
 */

const questions: Draft[] = [
  m('Nachdem alle angekommen ___, haben wir gegessen.', ['waren', 'sind', 'hatten'], 0, 'nachdem + Plusquamperfekt: waren angekommen'),
  b('Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.', 'আমি জার্মান শিখি, কারণ আমি জার্মানিতে কাজ করতে চাই।', 'Weil ich in Deutschland arbeiten möchte, lerne ich Deutsch.'),
  f('Ich weiß nicht, ___ der Zug pünktlich kommt.', 'ob', 'হ্যাঁ/না প্রশ্ন', 'ob → ক্রিয়া শেষে', ['dass', 'wann']),
  m('Obwohl das Wetter schlecht war, ___ wir viel Zeit draußen verbracht.', ['haben', 'sind', 'hatten'], 0, 'verbringen → haben'),
  m('Ich interessiere mich ___ IT und Elektrotechnik.', ['für', 'auf', 'über'], 0, 'sich interessieren für'),
  b('Trotzdem war die Reise angenehm.', 'তবুও যাত্রাটা আনন্দদায়ক ছিল।', 'Die Reise war trotzdem angenehm.'),
  f('Gestern ___ ich lange arbeiten. (müssen)', 'musste', 'müssen-এর অতীত', undefined, ['muss', 'müsste']),
  m('Er hat ___ Mutter Blumen geschenkt.', ['seiner', 'seine', 'seinen'], 0, 'Dativ: die Mutter → seiner'),
  m('Die neue Wohnung liegt ___ an der Universität als die alte.', ['näher', 'nah', 'am nächsten'], 0, 'nah → näher'),
  b('Könnten Sie mir bitte sagen, wo der Bahnhof ist?', 'আপনি কি দয়া করে বলতে পারবেন, স্টেশন কোথায়?'),
  f('Ich habe noch ___ Biryani gegessen.', 'nie', 'কখনো না', undefined, ['nicht', 'mehr']),
  m('Ich wohne in einer ___ Wohnung.', ['kleinen', 'kleine', 'kleiner'], 0, 'Dativ → -en'),
  m('„die Verantwortung“ মানে …', ['দায়িত্ব', 'অভিজ্ঞতা', 'দক্ষতা'], 0),
  b('Ich freue mich auf deine Antwort.', 'তোমার উত্তরের অপেক্ষায় আছি।'),
  f('Bevor ich zur Arbeit gehe, ___ ich meine E-Mails.', 'lese', 'মূল বাক্যের ক্রিয়া প্রথমে', undefined, ['liest', 'lesen']),
  m('Ich lege das Handy auf ___ Tisch.', ['den', 'dem', 'der'], 0, 'Wohin? → Akkusativ'),
  m('Sehr geehrte Damen und Herren, … Mit freundlichen ___', ['Grüßen', 'Grüße', 'Gruß'], 0),
  b('Ich habe die Fahrkarte online gekauft.', 'আমি অনলাইনে টিকিট কিনেছি।'),
  f('Hier darf ___ nicht rauchen.', 'man', 'সাধারণভাবে সবাই', undefined, ['jemand', 'niemand']),
  m('Ich hoffe, dass ich mein Ziel bald ___.', ['erreiche', 'erreichen', 'erreichst'], 0, 'dass → ক্রিয়া শেষে'),
];

export const a2Exam = spreadAnswers(levelExam('A2', { de: 'A2-Abschlusstest', bn: 'A2 লেভেল টেস্ট' }, questions));
