import { b, f, levelExam, m, spreadAnswers, type Draft } from './practice-helpers';

/**
 * The A2 level test at the end of the practice ladder: 20 of the hardest A2
 * questions, new ones that appear nowhere else, covering the grammar topics
 * from sondern to trotzdem/bevor. Passing it takes the learner up to B1.
 */

const questions: Draft[] = [
  m('Ich komme heute nicht mit dem Auto, ___ mit dem Zug.', ['sondern', 'aber', 'oder'], 0, 'nicht …, sondern …'),
  f('___ Rock gefällt dir besser, der rote oder der blaue?', 'Welcher', 'der Rock → ?', undefined, ['Welche', 'Welches']),
  m('Früher ___ es in unserem Dorf keine Schule.', ['gab', 'gibt', 'hatte'], 0, 'es gibt → অতীতে es gab'),
  b('Als ich jung war, wollte ich Pilot werden.', 'যখন আমি তরুণ ছিলাম, আমি পাইলট হতে চেয়েছিলাম।'),
  f('Ich ___ gern ein Zimmer für zwei Nächte. (ভদ্রভাবে চাওয়া)', 'hätte', 'hätte gern', undefined, ['habe', 'wäre']),
  m('Ich interessiere mich ___ IT und Elektrotechnik.', ['für', 'auf', 'über'], 0, 'sich interessieren für'),
  m('Wir gehen am Sonntag ___ den Wald spazieren. (ভেতর দিয়ে)', ['durch', 'um', 'gegen'], 0, 'durch + Akkusativ'),
  m('Die Lampe hängt jetzt über ___ Sofa.', ['dem', 'das', 'den'], 0, 'Wo? → Dativ'),
  f('Ich ___ die Bücher auf den Tisch. (খাড়া করে রাখি)', 'stelle', 'stellen → Wohin?', undefined, ['stehe', 'liege']),
  m('Er hat ___ Mutter Blumen geschenkt.', ['seiner', 'seine', 'seinen'], 0, 'Dativ: die Mutter → seiner'),
  f('Die neuen Schuhe gefallen ___ nicht. (আমার)', 'mir', 'gefallen + Dativ', undefined, ['mich', 'ich']),
  b('Ich freue mich auf deine Antwort.', 'তোমার উত্তরের অপেক্ষায় আছি।'),
  m('Die neue Wohnung liegt ___ an der Universität als die alte.', ['näher', 'nah', 'am nächsten'], 0, 'nah → näher'),
  b('Trotzdem war die Reise angenehm.', 'তবুও যাত্রাটা আনন্দদায়ক ছিল।', 'Die Reise war trotzdem angenehm.'),
  b('Ich nehme heute den Bus, weil mein Fahrrad in der Werkstatt ist.', 'আমি আজ বাস নিই, কারণ আমার সাইকেল ওয়ার্কশপে।', 'Weil mein Fahrrad in der Werkstatt ist, nehme ich heute den Bus.'),
  f('Ich weiß nicht, ___ der Zug pünktlich kommt.', 'ob', 'হ্যাঁ/না প্রশ্ন', 'ob → ক্রিয়া শেষে', ['dass', 'wann']),
  m('___ ich am Wochenende Zeit habe, gehe ich schwimmen.', ['Wenn', 'Als', 'Ob'], 0, 'যখনই / যদি: wenn'),
  f('Bevor ich zur Arbeit gehe, ___ ich meine E-Mails.', 'lese', 'মূল বাক্যের ক্রিয়া প্রথমে', undefined, ['liest', 'lesen']),
  f('In der Bibliothek darf ___ nicht laut sprechen.', 'man', 'সাধারণভাবে সবাই', undefined, ['jemand', 'niemand']),
  f('Gestern ___ ich bis neun Uhr arbeiten. (müssen)', 'musste', 'müssen-এর অতীত', undefined, ['muss', 'müsste']),
];

export const a2Exam = spreadAnswers(levelExam('A2', { de: 'A2-Abschlusstest', bn: 'A2 লেভেল টেস্ট' }, questions));
