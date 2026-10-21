import type { LevelContent } from './types';

export const b1: LevelContent = {
  level: 'B1',
  grammar: [
    {
      id: 'b1-grammar-nebensatz',
      level: 'B1',
      topic: 'Satzbau',
      title: { de: 'Nebensätze mit weil, dass, wenn', bn: 'অধীন বাক্য: weil, dass, wenn', en: 'Subordinate clauses' },
      summary: 'অধীন বাক্যে ক্রিয়া একদম শেষে চলে যায়।',
      exerciseId: 'b1-mcq-nebensatz',
      sections: [
        {
          heading: 'ক্রিয়া শেষে',
          body:
            '„weil“ (কারণ), „dass“ (যে), „wenn“ (যদি/যখন), „obwohl“ (যদিও) দিয়ে শুরু হওয়া অংশকে Nebensatz বলে। এই অংশে ক্রিয়া (বা পরিবর্তিত ক্রিয়া) একদম শেষে বসে। মূল বাক্য আর অধীন বাক্যের মাঝে সবসময় কমা দিতে হয়।',
          examples: [
            {
              de: 'Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.',
              bn: 'আমি জার্মান শিখছি, কারণ আমি জার্মানিতে কাজ করতে চাই।',
              words: [
                { de: 'weil', bn: 'কারণ (সংযোজক)' },
                { de: 'ich', bn: 'আমি' },
                { de: 'in Deutschland', bn: 'জার্মানিতে' },
                { de: 'arbeiten', bn: 'কাজ করা' },
                { de: 'möchte', bn: 'চাই (পরিবর্তিত ক্রিয়া, একদম শেষে)' },
              ],
            },
            { de: 'Ich glaube, dass die Prüfung schwer ist.', bn: 'আমার মনে হয় যে পরীক্ষাটা কঠিন।' },
            { de: 'Obwohl es regnet, gehen wir spazieren.', bn: 'যদিও বৃষ্টি হচ্ছে, তবুও আমরা হাঁটতে যাচ্ছি।' },
          ],
        },
        {
          heading: 'অধীন বাক্য প্রথমে থাকলে',
          body:
            'Nebensatz যদি বাক্যের শুরুতে থাকে, তাহলে পুরো Nebensatz-টাকে প্রথম স্থান ধরা হয়। তাই মূল বাক্যের ক্রিয়া কমার ঠিক পরেই বসে (দ্বিতীয় স্থান)।',
          examples: [
            {
              de: 'Wenn ich Zeit habe, rufe ich dich an.',
              bn: 'যদি আমার সময় থাকে, আমি তোমাকে ফোন করব।',
              words: [
                { de: 'Wenn ich Zeit habe,', bn: 'যদি আমার সময় থাকে (১ম স্থান)' },
                { de: 'rufe', bn: 'ফোন করি (২য় স্থান)' },
                { de: 'ich dich an', bn: 'আমি তোমাকে' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'b1-grammar-konjunktiv2',
      level: 'B1',
      topic: 'Verben',
      title: { de: 'Konjunktiv II: würde, hätte, wäre', bn: 'Konjunktiv II: ইচ্ছা, কল্পনা ও ভদ্রতা', en: 'Subjunctive II' },
      summary: 'ভদ্র অনুরোধ, ইচ্ছা আর কাল্পনিক পরিস্থিতির জন্য।',
      sections: [
        {
          heading: 'কখন ব্যবহার করবেন',
          body:
            'Konjunktiv II তিনটি কাজে লাগে: (১) ভদ্র অনুরোধ — „Könnten Sie…?“, (২) ইচ্ছা — „Ich hätte gern…“, (৩) বাস্তবে নেই এমন পরিস্থিতি — „Wenn ich reich wäre…“। বেশিরভাগ ক্রিয়ার জন্য „würde + Infinitiv“ ব্যবহার করা হয়; „haben“, „sein“ ও মোডাল ক্রিয়ার নিজস্ব রূপ আছে।',
          table: [
            ['ক্রিয়া', 'Konjunktiv II (ich)', 'বাংলা'],
            ['sein', 'wäre', 'হতাম'],
            ['haben', 'hätte', 'থাকত'],
            ['können', 'könnte', 'পারতাম'],
            ['werden', 'würde', '…তাম (সহায়ক)'],
          ],
          examples: [
            { de: 'Ich hätte gern ein Glas Wasser.', bn: 'আমি এক গ্লাস পানি পেলে খুশি হতাম।' },
            { de: 'Wenn ich mehr Zeit hätte, würde ich mehr lesen.', bn: 'আমার যদি আরও সময় থাকত, আমি আরও পড়তাম।' },
            { de: 'An deiner Stelle würde ich zum Arzt gehen.', bn: 'তোমার জায়গায় আমি হলে ডাক্তারের কাছে যেতাম।' },
          ],
        },
      ],
    },
  ],
  vocabulary: [
    {
      id: 'b1-vocab-work',
      level: 'B1',
      title: { de: 'Arbeit und Ausbildung', bn: 'কাজ ও Ausbildung', en: 'Work and vocational training' },
      icon: 'briefcase-outline',
      entries: [
        { id: 'b1-v-ausbildung', de: 'Ausbildung', article: 'die', plural: 'die Ausbildungen', bn: 'বৃত্তিমূলক প্রশিক্ষণ (কাজ ও স্কুল একসাথে)', en: 'vocational training', pronunciation: 'আউসবিল্ডুং', example: { de: 'Sie macht eine Ausbildung zur Pflegefachfrau.', bn: 'সে নার্সিং পেশার প্রশিক্ষণ নিচ্ছে।' } },
        { id: 'b1-v-bewerbung', de: 'Bewerbung', article: 'die', plural: 'die Bewerbungen', bn: 'চাকরির আবেদন', en: 'application', pronunciation: 'বেভেরবুং', example: { de: 'Ich habe meine Bewerbung abgeschickt.', bn: 'আমি আমার আবেদন পাঠিয়ে দিয়েছি।' } },
        { id: 'b1-v-lebenslauf', de: 'Lebenslauf', article: 'der', plural: 'die Lebensläufe', bn: 'জীবনবৃত্তান্ত (সিভি)', en: 'CV', pronunciation: 'লেবেন্সলাউফ', example: { de: 'Bitte schicken Sie uns Ihren Lebenslauf.', bn: 'অনুগ্রহ করে আপনার সিভি আমাদের পাঠান।' } },
        { id: 'b1-v-vorstellungsgespraech', de: 'Vorstellungsgespräch', article: 'das', plural: 'die Vorstellungsgespräche', bn: 'চাকরির ইন্টারভিউ', en: 'job interview', pronunciation: 'ফোরশ্টেলুংসগেশপ্রেখ', example: { de: 'Morgen habe ich ein Vorstellungsgespräch.', bn: 'কাল আমার একটা ইন্টারভিউ আছে।' } },
        { id: 'b1-v-arbeitgeber', de: 'Arbeitgeber', article: 'der', plural: 'die Arbeitgeber', bn: 'নিয়োগকর্তা', en: 'employer', pronunciation: 'আরবাইটগেবার', example: { de: 'Mein Arbeitgeber zahlt pünktlich.', bn: 'আমার নিয়োগকর্তা সময়মতো বেতন দেন।' } },
        { id: 'b1-v-kollege', de: 'Kollege', article: 'der', plural: 'die Kollegen', bn: 'সহকর্মী (পুরুষ)', en: 'colleague', pronunciation: 'কোলেগে', example: { de: 'Meine Kollegen sind sehr hilfsbereit.', bn: 'আমার সহকর্মীরা খুব সাহায্যকারী।' } },
        { id: 'b1-v-schicht', de: 'Schicht', article: 'die', plural: 'die Schichten', bn: 'শিফট (কাজের পালা)', en: 'shift', pronunciation: 'শিখ্ট', example: { de: 'Nächste Woche arbeite ich in der Nachtschicht.', bn: 'আগামী সপ্তাহে আমি রাতের শিফটে কাজ করব।' } },
      ],
    },
    {
      id: 'b1-vocab-opinion',
      level: 'B1',
      title: { de: 'Meinung äußern', bn: 'মতামত প্রকাশ', en: 'Expressing opinions' },
      icon: 'chatbubbles-outline',
      entries: [
        { id: 'b1-v-meiner-meinung', de: 'meiner Meinung nach', bn: 'আমার মতে', en: 'in my opinion', pronunciation: 'মাইনার মাইনুং নাখ', example: { de: 'Meiner Meinung nach ist das eine gute Idee.', bn: 'আমার মতে এটা একটা ভালো আইডিয়া।' } },
        { id: 'b1-v-vorteil', de: 'Vorteil', article: 'der', plural: 'die Vorteile', bn: 'সুবিধা', en: 'advantage', pronunciation: 'ফোরটাইল', example: { de: 'Ein Vorteil ist, dass man flexibel ist.', bn: 'একটা সুবিধা হলো, মানুষ নমনীয় থাকতে পারে।' } },
        { id: 'b1-v-nachteil', de: 'Nachteil', article: 'der', plural: 'die Nachteile', bn: 'অসুবিধা', en: 'disadvantage', pronunciation: 'নাখটাইল', example: { de: 'Der Nachteil ist der hohe Preis.', bn: 'অসুবিধা হলো এর উচ্চ দাম।' } },
        { id: 'b1-v-zustimmen', de: 'zustimmen', bn: 'একমত হওয়া', en: 'to agree', pronunciation: 'ৎসুশ্টিমেন', example: { de: 'Da stimme ich dir zu.', bn: 'এ ব্যাপারে আমি তোমার সাথে একমত।' } },
        { id: 'b1-v-einerseits', de: 'einerseits … andererseits', bn: 'একদিকে … অন্যদিকে', en: 'on the one hand … on the other hand', pronunciation: 'আইনারসাইটস … আন্ডেরারসাইটস', example: { de: 'Einerseits ist die Stadt teuer, andererseits gibt es viele Jobs.', bn: 'একদিকে শহরটা ব্যয়বহুল, অন্যদিকে অনেক চাকরি আছে।' } },
      ],
    },
  ],
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
    {
      id: 'b1-qa-future',
      level: 'B1',
      module: 'qa',
      topic: 'Zukunftspläne',
      title: { de: 'Pläne für die Zukunft', bn: 'ভবিষ্যৎ পরিকল্পনা', en: 'Plans for the future' },
      lines: [
        { speaker: 'F', de: 'Was möchten Sie in fünf Jahren erreicht haben?', bn: 'পাঁচ বছরের মধ্যে আপনি কী অর্জন করতে চান?' },
        { speaker: 'A', de: 'Ich möchte meine Ausbildung abgeschlossen haben und als Fachkraft arbeiten.', bn: 'আমি চাই ততদিনে আমার Ausbildung শেষ করে একজন দক্ষ কর্মী হিসেবে কাজ করতে।' },
        { speaker: 'F', de: 'Warum haben Sie sich für Deutschland entschieden?', bn: 'আপনি কেন জার্মানি বেছে নিয়েছেন?' },
        { speaker: 'A', de: 'Weil es hier gute Berufschancen gibt und die Ausbildung einen guten Ruf hat.', bn: 'কারণ এখানে পেশাগত সুযোগ ভালো এবং এখানকার Ausbildung-এর সুনাম আছে।' },
        { speaker: 'F', de: 'Was ist für Sie die größte Herausforderung?', bn: 'আপনার জন্য সবচেয়ে বড় চ্যালেঞ্জ কী?' },
        { speaker: 'A', de: 'Am Anfang war die Sprache schwierig, aber ich mache jeden Tag Fortschritte.', bn: 'শুরুতে ভাষাটা কঠিন ছিল, কিন্তু আমি প্রতিদিন উন্নতি করছি।' },
      ],
      notes: [
        { term: 'sich entscheiden für', bn: '„কোনো কিছু বেছে নেওয়ার সিদ্ধান্ত নেওয়া“ — সাথে সবসময় „für“।' },
        { term: 'Weil es hier … gibt', bn: 'প্রশ্নের উত্তরে শুধু „weil“-বাক্য বলা কথ্য ভাষায় স্বাভাবিক। ক্রিয়া „gibt“ শেষে।' },
        { term: 'Fortschritte machen', bn: '„উন্নতি করা“ — একটা নির্দিষ্ট শব্দজোড়া।' },
      ],
    },
    {
      id: 'b1-email-application',
      level: 'B1',
      module: 'emails',
      topic: 'Bewerbung',
      tag: 'formell',
      title: { de: 'Bewerbung um einen Ausbildungsplatz', bn: 'Ausbildung-এর জন্য আবেদন', en: 'Application for a training place' },
      lines: [
        { de: 'Sehr geehrte Damen und Herren,', bn: 'সম্মানিত মহোদয়/মহোদয়া,' },
        { de: 'mit großem Interesse habe ich Ihre Anzeige auf Ihrer Webseite gelesen und bewerbe mich hiermit um einen Ausbildungsplatz als Pflegefachmann.', bn: 'আপনাদের ওয়েবসাইটে বিজ্ঞাপনটি আমি খুব আগ্রহ নিয়ে পড়েছি এবং এর মাধ্যমে নার্সিং পেশায় একটি Ausbildung-এর জন্য আবেদন করছি।' },
        { de: 'Ich habe in Bangladesch das Abitur gemacht und ein Praktikum in einem Krankenhaus in Dhaka absolviert.', bn: 'আমি বাংলাদেশে উচ্চমাধ্যমিক পাস করেছি এবং ঢাকার একটি হাসপাতালে ইন্টার্নশিপ সম্পন্ন করেছি।' },
        { de: 'Dabei habe ich gemerkt, dass mir die Arbeit mit Menschen große Freude macht.', bn: 'তখন আমি বুঝতে পেরেছি যে মানুষের সাথে কাজ করতে আমি খুব আনন্দ পাই।' },
        { de: 'Zurzeit besuche ich einen Deutschkurs auf dem Niveau B1.', bn: 'বর্তমানে আমি B1 স্তরের একটি জার্মান কোর্স করছি।' },
        { de: 'Über eine Einladung zu einem Vorstellungsgespräch würde ich mich sehr freuen.', bn: 'একটি ইন্টারভিউয়ের আমন্ত্রণ পেলে আমি খুব খুশি হব।' },
        { de: 'Mit freundlichen Grüßen', bn: 'বিনীত' },
        { de: 'Rafiq Islam', bn: 'রফিক ইসলাম' },
      ],
      notes: [
        { term: 'Sehr geehrte Damen und Herren', bn: 'প্রাপকের নাম জানা না থাকলে আনুষ্ঠানিক চিঠির শুরু।' },
        { term: 'sich bewerben um', bn: '„কোনো পদের জন্য আবেদন করা“ — সাথে „um“।' },
        { term: 'Abitur', bn: 'জার্মান উচ্চমাধ্যমিক সমমানের সনদ। আপনার সনদের সঠিক সমতা যাচাই করে নিন।' },
        { term: 'Über … würde ich mich sehr freuen.', bn: 'আবেদনপত্রের একটি প্রচলিত ভদ্র সমাপ্তি বাক্য (Konjunktiv II)।' },
      ],
    },
    {
      id: 'b1-dialogue-interview',
      level: 'B1',
      module: 'dialogues',
      topic: 'Arbeit',
      tag: 'Vorstellungsgespräch',
      title: { de: 'Im Vorstellungsgespräch', bn: 'চাকরির ইন্টারভিউতে', en: 'In a job interview' },
      lines: [
        { speaker: 'Personalchefin', de: 'Erzählen Sie doch bitte etwas über sich.', bn: 'অনুগ্রহ করে নিজের সম্পর্কে কিছু বলুন।' },
        { speaker: 'Bewerberin', de: 'Gern. Ich heiße Mitu Das, bin 26 Jahre alt und habe in Bangladesch Informatik studiert.', bn: 'অবশ্যই। আমার নাম মিতু দাস, বয়স ২৬, আর আমি বাংলাদেশে কম্পিউটার বিজ্ঞান পড়েছি।' },
        { speaker: 'Personalchefin', de: 'Warum möchten Sie bei uns arbeiten?', bn: 'আপনি কেন আমাদের এখানে কাজ করতে চান?' },
        { speaker: 'Bewerberin', de: 'Ihre Firma entwickelt Software für Krankenhäuser. Das finde ich sinnvoll, weil man damit Menschen helfen kann.', bn: 'আপনাদের প্রতিষ্ঠান হাসপাতালের জন্য সফটওয়্যার তৈরি করে। এটা আমার কাছে অর্থবহ মনে হয়, কারণ এর মাধ্যমে মানুষকে সাহায্য করা যায়।' },
        { speaker: 'Personalchefin', de: 'Was sind Ihre Stärken?', bn: 'আপনার শক্তির দিকগুলো কী?' },
        { speaker: 'Bewerberin', de: 'Ich arbeite sehr genau und lerne schnell. Außerdem arbeite ich gern im Team.', bn: 'আমি খুব নিখুঁতভাবে কাজ করি আর দ্রুত শিখি। তাছাড়া আমি দলবদ্ধভাবে কাজ করতে পছন্দ করি।' },
        { speaker: 'Personalchefin', de: 'Haben Sie noch Fragen an uns?', bn: 'আমাদের কাছে আপনার কি আর কোনো প্রশ্ন আছে?' },
        { speaker: 'Bewerberin', de: 'Ja, wie sieht die Einarbeitung in den ersten Wochen aus?', bn: 'হ্যাঁ, প্রথম কয়েক সপ্তাহে কাজ শেখানোর প্রক্রিয়াটা কেমন হয়?' },
      ],
      notes: [
        { term: 'Erzählen Sie doch bitte …', bn: '„doch“ এখানে অনুরোধকে নরম ও বন্ধুসুলভ করে।' },
        { term: 'Stärken / Schwächen', bn: 'ইন্টারভিউর প্রচলিত প্রশ্ন: শক্তি ও দুর্বলতা।' },
        { term: 'Einarbeitung', bn: 'নতুন কর্মীকে কাজ শেখানোর সময়কাল। শেষে প্রশ্ন করলে আগ্রহ প্রকাশ পায়।' },
      ],
    },
  ],
};
