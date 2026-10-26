import { b1Dialogues } from './b1-dialogues';
import { b1Emails } from './b1-emails';
import { b1Grammar } from './b1-grammar';
import { b1Vocabulary } from './b1-vocab';
import type { LevelContent } from '../../src/content/types';

export const b1: LevelContent = {
  level: 'B1',
  grammar: b1Grammar,
  vocabulary: b1Vocabulary,
  exercises: [
    {
      id: 'b1-mcq-nebensatz',
      level: 'B1',
      title: { de: 'Nebensätze', bn: 'অধীন বাক্য', en: 'Subordinate clauses' },
      skill: 'sentence',
      difficulty: 2,
      questions: [
        {
          id: 'b1-q-1',
          type: 'mcq',
          prompt: 'Ich bleibe zu Hause, weil ich krank ___.',
          options: ['bin', 'sein', 'ist', 'bin ich'],
          answer: 0,
          explanation: '„weil“-এর পরে ক্রিয়া শেষে বসে, আর কর্তা „ich“ তাই „bin“।',
        },
        {
          id: 'b1-q-2',
          type: 'mcq',
          prompt: 'Welcher Satz ist richtig?',
          promptBn: 'কোন বাক্যটি সঠিক?',
          options: [
            'Ich weiß, dass er kommt morgen.',
            'Ich weiß, dass er morgen kommt.',
            'Ich weiß, dass kommt er morgen.',
            'Ich weiß dass, er morgen kommt.',
          ],
          answer: 1,
          explanation: '„dass“-বাক্যে ক্রিয়া „kommt“ একদম শেষে, আর কমা „dass“-এর আগে বসে।',
        },
        {
          id: 'b1-q-3',
          type: 'mcq',
          prompt: 'Wenn das Wetter schön ist, ___ wir an den See.',
          options: ['wir fahren', 'fahren', 'fahren wir nicht', 'gefahren'],
          answer: 1,
          explanation: 'Nebensatz প্রথমে থাকলে মূল বাক্যের ক্রিয়া সরাসরি কমার পরে বসে: „…, fahren wir an den See.“',
        },
        {
          id: 'b1-q-4',
          type: 'mcq',
          prompt: '___ er viel gelernt hat, hat er die Prüfung nicht bestanden.',
          options: ['Weil', 'Obwohl', 'Wenn', 'Dass'],
          answer: 1,
          explanation: 'বিপরীত ফল বোঝাতে „obwohl“ (যদিও): পড়েছে, তবুও পাস করেনি।',
          wrongNotes: ['„weil“ কারণ বোঝায়, কিন্তু এখানে ফল বিপরীত।', undefined, '„wenn“ শর্ত বা সময় বোঝায়।', '„dass“ দিয়ে এভাবে বাক্য শুরু করলে অর্থ হয় না।'],
        },
        {
          id: 'b1-q-5',
          type: 'mcq',
          prompt: 'Wenn ich mehr Geld ___, würde ich ein Auto kaufen.',
          options: ['habe', 'hatte', 'hätte', 'haben'],
          answer: 2,
          explanation: 'কাল্পনিক পরিস্থিতিতে Konjunktiv II: „hätte“।',
        },
      ],
    },
    {
      id: 'b1-mcq-reading',
      level: 'B1',
      title: { de: 'Lesen: Homeoffice', bn: 'পড়া: বাড়ি থেকে কাজ', en: 'Reading: Working from home' },
      skill: 'reading',
      difficulty: 3,
      passage: {
        de: 'Seit einigen Jahren arbeiten viele Menschen in Deutschland teilweise im Homeoffice. Viele Beschäftigte finden es praktisch, weil sie keine Zeit für den Weg zur Arbeit brauchen. Außerdem können sie ihren Tag flexibler planen. Andererseits fehlt manchen der Kontakt zu den Kollegen. Einige berichten auch, dass es schwierig ist, Arbeit und Freizeit zu trennen. Deshalb arbeiten viele Firmen heute mit einem Mix: zwei oder drei Tage im Büro, den Rest zu Hause.',
        bn: 'কয়েক বছর ধরে জার্মানিতে অনেক মানুষ আংশিকভাবে বাড়ি থেকে কাজ করছেন। অনেক কর্মী এটা সুবিধাজনক মনে করেন, কারণ তাদের কাজে যাওয়ার পথে সময় লাগে না। তাছাড়া তারা নিজেদের দিন আরও নমনীয়ভাবে পরিকল্পনা করতে পারেন। অন্যদিকে, কারও কারও সহকর্মীদের সাথে যোগাযোগের অভাব বোধ হয়। কেউ কেউ এটাও বলেন যে কাজ আর অবসর আলাদা রাখা কঠিন। তাই অনেক প্রতিষ্ঠান এখন মিশ্র পদ্ধতিতে কাজ করে: দুই বা তিন দিন অফিসে, বাকি দিন বাড়িতে।',
      },
      questions: [
        { id: 'b1-r-1', type: 'mcq', prompt: 'Warum finden viele Menschen Homeoffice praktisch?', promptBn: 'অনেকে কেন বাড়ি থেকে কাজ সুবিধাজনক মনে করেন?', options: ['Weil sie mehr Geld verdienen.', 'Weil sie keinen Arbeitsweg haben.', 'Weil sie weniger arbeiten.', 'Weil das Büro geschlossen ist.'], answer: 1, explanation: '„…weil sie keine Zeit für den Weg zur Arbeit brauchen.“' },
        { id: 'b1-r-2', type: 'mcq', prompt: 'Was ist ein Nachteil?', promptBn: 'একটি অসুবিধা কী?', options: ['Der lange Arbeitsweg', 'Zu viele Meetings im Büro', 'Weniger Kontakt zu Kollegen', 'Der hohe Lohn'], answer: 2, explanation: '„…fehlt manchen der Kontakt zu den Kollegen.“' },
        { id: 'b1-r-3', type: 'mcq', prompt: 'Wie arbeiten viele Firmen heute?', promptBn: 'অনেক প্রতিষ্ঠান এখন কীভাবে কাজ করে?', options: ['Nur im Büro', 'Nur zu Hause', 'Mit einer Mischung aus Büro und Homeoffice', 'Nur am Wochenende'], answer: 2, explanation: '„…arbeiten viele Firmen heute mit einem Mix: zwei oder drei Tage im Büro, den Rest zu Hause.“' },
      ],
    },
  ],
  texts: [
    ...b1Emails,
    ...b1Dialogues,
  ],
};
