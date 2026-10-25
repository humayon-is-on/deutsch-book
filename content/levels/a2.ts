import { a2Grammar } from './a2-grammar';
import { a2Dialogues } from './a2-dialogues';
import { a2Emails } from './a2-emails';
import { a2Exam } from './a2-exam';
import { a2Models } from './a2-models';
import { a2Practice } from './a2-practice';
import { a2Vocabulary } from './a2-vocab';
import type { LevelContent } from '../../src/content/types';

export const a2: LevelContent = {
  level: 'A2',
  grammar: a2Grammar,
  vocabulary: a2Vocabulary,
  practice: [...a2Practice, a2Exam],
  exercises: [
    {
      id: 'a2-mcq-perfekt',
      level: 'A2',
      title: { de: 'Perfekt üben', bn: 'Perfekt অনুশীলন', en: 'Practise the perfect' },
      skill: 'grammar',
      difficulty: 2,
      questions: [
        {
          id: 'a2-q-1',
          type: 'mcq',
          prompt: 'Gestern ___ ich nach Berlin gefahren.',
          options: ['habe', 'bin', 'hat', 'ist'],
          answer: 1,
          explanation: '„fahren“ এক জায়গা থেকে অন্য জায়গায় যাওয়া বোঝায়, তাই „sein“ নেয়; ich → bin।',
          wrongNotes: ['„fahren“ চলাচল বোঝায়, তাই „haben“ নয়।', undefined, '„hat“ হলো „er/sie/es“-এর রূপ, আর এখানে „sein“ লাগবে।', '„ist“ „er/sie/es“-এর রূপ, কর্তা এখানে „ich“।'],
        },
        {
          id: 'a2-q-2',
          type: 'mcq',
          prompt: 'Hast du die Hausaufgaben ___?',
          options: ['machen', 'gemacht', 'macht', 'gemachen'],
          answer: 1,
          explanation: '„machen“-এর Partizip II হলো „gemacht“ (ge- + mach + -t)।',
        },
        {
          id: 'a2-q-3',
          type: 'mcq',
          prompt: 'Wir haben Pizza ___.',
          options: ['gegessen', 'geesst', 'essen', 'gegesst'],
          answer: 0,
          explanation: '„essen“ অনিয়মিত ক্রিয়া, তাই Partizip II „gegessen“।',
        },
        {
          id: 'a2-q-4',
          type: 'mcq',
          prompt: 'Um wie viel Uhr ___ du aufgestanden?',
          options: ['hast', 'bist', 'hat', 'sind'],
          answer: 1,
          explanation: '„aufstehen“ অবস্থার পরিবর্তন বোঝায় (শুয়ে থাকা → ওঠা), তাই „sein“: du bist aufgestanden।',
        },
        {
          id: 'a2-q-5',
          type: 'mcq',
          prompt: 'Welcher Satz ist richtig?',
          promptBn: 'কোন বাক্যটি সঠিক?',
          options: ['Ich habe gekauft ein Handy.', 'Ich habe ein Handy gekauft.', 'Ich gekauft habe ein Handy.', 'Ich ein Handy habe gekauft.'],
          answer: 1,
          explanation: 'সহায়ক ক্রিয়া „habe“ দ্বিতীয় স্থানে, Partizip II „gekauft“ একদম শেষে।',
        },
      ],
    },
    {
      id: 'a2-fill-modal',
      level: 'A2',
      title: { de: 'Modalverben üben', bn: 'মোডাল ক্রিয়া অনুশীলন', en: 'Practise modal verbs' },
      skill: 'grammar',
      difficulty: 2,
      questions: [
        { id: 'a2-f-1', type: 'fill', prompt: 'Ich ___ gut schwimmen. (können)', promptBn: 'আমি ভালো সাঁতার কাটতে পারি।', accept: ['kann'], explanation: 'ich → kann' },
        { id: 'a2-f-2', type: 'fill', prompt: 'Du ___ mehr Wasser trinken. (müssen)', promptBn: 'তোমাকে আরও পানি খেতে হবে।', accept: ['musst'], explanation: 'du → musst' },
        { id: 'a2-f-3', type: 'fill', prompt: 'Er ___ Arzt werden. (wollen)', promptBn: 'সে ডাক্তার হতে চায়।', accept: ['will'], explanation: 'er → will' },
        { id: 'a2-f-4', type: 'fill', prompt: 'Hier ___ man nicht parken. (dürfen)', promptBn: 'এখানে গাড়ি রাখা নিষেধ।', accept: ['darf'], explanation: 'man → darf („man“ সবসময় er/sie/es-এর মতো)' },
        { id: 'a2-f-5', type: 'fill', prompt: '___ Sie einen Tee? (möchten)', promptBn: 'আপনি কি চা নেবেন?', accept: ['Möchten', 'möchten'], explanation: 'Sie → möchten; হ্যাঁ/না প্রশ্নে ক্রিয়া প্রথমে।' },
      ],
    },
  ],
  texts: [
    ...a2Models,
    ...a2Emails,
    ...a2Dialogues,
  ],
};
