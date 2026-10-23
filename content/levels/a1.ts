import { a1Dialogues } from './a1-dialogues';
import { a1Grammar } from './a1-grammar';
import { a1Letters } from './a1-letters';
import { a1Practice } from './a1-practice';
import { a1Vocabulary } from './a1-vocab';
import type { LevelContent } from '../../src/content/types';

export const a1: LevelContent = {
  level: 'A1',
  grammar: a1Grammar,
  vocabulary: a1Vocabulary,
  practice: a1Practice,
  exercises: [
    {
      id: 'a1-mcq-basics',
      level: 'A1',
      title: { de: 'Grundlagen', bn: 'মৌলিক ব্যাকরণ', en: 'Basics' },
      skill: 'grammar',
      difficulty: 1,
      questions: [
        {
          id: 'a1-q-1',
          type: 'mcq',
          prompt: 'Ich ___ aus Bangladesch.',
          promptBn: 'সঠিক রূপটি বেছে নিন।',
          options: ['bin', 'bist', 'ist', 'sind'],
          answer: 0,
          explanation: '„ich“-এর সাথে „sein“ ক্রিয়ার রূপ হলো „bin“।',
          wrongNotes: [undefined, '„bist“ ব্যবহার হয় „du“-এর সাথে।', '„ist“ ব্যবহার হয় „er/sie/es“-এর সাথে।', '„sind“ ব্যবহার হয় „wir“ ও „sie/Sie“-এর সাথে।'],
        },
        {
          id: 'a1-q-2',
          type: 'mcq',
          prompt: 'Wie ___ du?',
          promptBn: '„তোমার নাম কী?“',
          options: ['heiße', 'heißt', 'heißen', 'heißt du'],
          answer: 1,
          explanation: '„du“-এর সাথে ক্রিয়ার শেষে সাধারণত „-st“ বসে; „heißen“-এর ক্ষেত্রে শুধু „-t“: du heißt।',
          wrongNotes: ['„heiße“ হলো „ich“-এর রূপ।', undefined, '„heißen“ হলো „wir/sie/Sie“-এর রূপ।', '„du“ শব্দটি বাক্যে আগেই আছে।'],
        },
        {
          id: 'a1-q-3',
          type: 'mcq',
          prompt: 'Welcher Satz ist richtig?',
          promptBn: 'কোন বাক্যটি সঠিক?',
          options: ['Heute ich lerne Deutsch.', 'Heute lerne ich Deutsch.', 'Heute Deutsch ich lerne.', 'Lerne heute ich Deutsch.'],
          answer: 1,
          explanation: 'সাধারণ বাক্যে ক্রিয়া দ্বিতীয় স্থানে বসে। „Heute“ প্রথমে থাকায় ক্রিয়া „lerne“ দ্বিতীয়তে, তারপর কর্তা „ich“।',
        },
        {
          id: 'a1-q-4',
          type: 'mcq',
          prompt: '___ Buch ist interessant.',
          promptBn: 'সঠিক আর্টিকেল বেছে নিন।',
          options: ['Der', 'Die', 'Das', 'Den'],
          answer: 2,
          explanation: '„Buch“ ক্লীবলিঙ্গ, তাই আর্টিকেল „das“।',
        },
        {
          id: 'a1-q-5',
          type: 'mcq',
          prompt: '„Danke!“ – „___!“',
          promptBn: 'কেউ ধন্যবাদ দিলে কী বলবেন?',
          options: ['Bitte', 'Tschüss', 'Hallo', 'Entschuldigung'],
          answer: 0,
          explanation: '„Danke“-এর উত্তরে „Bitte“ মানে „আপনাকে স্বাগতম“।',
        },
        {
          id: 'a1-q-6',
          type: 'mcq',
          prompt: 'Woher ___ Sie?',
          promptBn: '„আপনি কোথা থেকে এসেছেন?“',
          options: ['kommt', 'kommst', 'kommen', 'komme'],
          answer: 2,
          explanation: 'সম্মানসূচক „Sie“-এর সাথে ক্রিয়ার রূপ সবসময় মূল রূপের মতো: „kommen“।',
        },
      ],
    },
    {
      id: 'a1-fill-sein',
      level: 'A1',
      title: { de: '„sein“ üben', bn: '„sein“ অনুশীলন', en: 'Practise “sein”' },
      skill: 'grammar',
      difficulty: 1,
      questions: [
        { id: 'a1-f-1', type: 'fill', prompt: 'Du ___ mein Freund.', promptBn: 'তুমি আমার বন্ধু।', accept: ['bist'], explanation: 'du → bist' },
        { id: 'a1-f-2', type: 'fill', prompt: 'Wir ___ Studenten.', promptBn: 'আমরা ছাত্র।', accept: ['sind'], explanation: 'wir → sind' },
        { id: 'a1-f-3', type: 'fill', prompt: 'Sie ___ Ärztin. (sie = সে, মেয়ে)', promptBn: 'সে ডাক্তার।', accept: ['ist'], explanation: 'sie (একবচন) → ist' },
        { id: 'a1-f-4', type: 'fill', prompt: 'Ihr ___ sehr freundlich.', promptBn: 'তোমরা খুব বন্ধুসুলভ।', accept: ['seid'], explanation: 'ihr → seid' },
        { id: 'a1-f-5', type: 'fill', prompt: 'Ich ___ 20 Jahre alt.', promptBn: 'আমার বয়স ২০ বছর।', accept: ['bin'], explanation: 'জার্মানে বয়স বলতে „sein“ ব্যবহার হয়: Ich bin … Jahre alt.' },
      ],
    },
    {
      id: 'a1-mcq-reading',
      level: 'A1',
      title: { de: 'Lesen: Ich bin Karim', bn: 'পড়া: আমি করিম', en: 'Reading: I am Karim' },
      skill: 'reading',
      difficulty: 1,
      passage: {
        de: 'Hallo! Ich heiße Karim. Ich bin 24 Jahre alt und komme aus Chattogram. Jetzt wohne ich in Köln. Ich lerne Deutsch, denn ich möchte eine Ausbildung machen. Ich habe eine Schwester. Sie heißt Nadia und wohnt in Dhaka.',
        bn: 'হ্যালো! আমার নাম করিম। আমার বয়স ২৪ বছর এবং আমি চট্টগ্রাম থেকে এসেছি। এখন আমি কোলনে থাকি। আমি জার্মান শিখছি, কারণ আমি একটা Ausbildung (বৃত্তিমূলক প্রশিক্ষণ) করতে চাই। আমার একটা বোন আছে। তার নাম নাদিয়া এবং সে ঢাকায় থাকে।',
      },
      questions: [
        { id: 'a1-r-1', type: 'mcq', prompt: 'Wo wohnt Karim jetzt?', promptBn: 'করিম এখন কোথায় থাকে?', options: ['In Chattogram', 'In Köln', 'In Dhaka', 'In Berlin'], answer: 1, explanation: '„Jetzt wohne ich in Köln.“' },
        { id: 'a1-r-2', type: 'mcq', prompt: 'Wie alt ist Karim?', promptBn: 'করিমের বয়স কত?', options: ['20', '22', '24', '42'], answer: 2, explanation: '„Ich bin 24 Jahre alt.“' },
        { id: 'a1-r-3', type: 'mcq', prompt: 'Warum lernt Karim Deutsch?', promptBn: 'করিম কেন জার্মান শিখছে?', options: ['Für eine Reise', 'Für eine Ausbildung', 'Für seine Schwester', 'Für die Schule'], answer: 1, explanation: '„…denn ich möchte eine Ausbildung machen.“' },
      ],
    },
  ],
  texts: [
    ...a1Letters,
    ...a1Dialogues,
  ],
};
