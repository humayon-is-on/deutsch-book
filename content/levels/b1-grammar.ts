import type { GrammarLesson } from '../../src/content/types';
import { examplesEn, lessonMaker, list, section, table, text } from './grammar-helpers';

/**
 * B1 grammar topics (Grammatik), from the person's 12 main topics in their
 * order. A main topic with subtopics is split so each subtopic is its own
 * small topic, numbered 1.1, 1.2, … in the list (`part`). Every topic has a
 * 6-question test with 3 options.
 */

const lesson = lessonMaker('B1');

/** The rule shared by every clause with the verb at the end. */
const VERB_LAST = text('মনে রাখো: এই ধরনের clause-এ verb সাধারণত clause-এর একদম শেষে বসে।');

export const b1Grammar: GrammarLesson[] = [
  // Topic 1: Advanced subordinate clauses
  lesson({
    slug: 'nebensatz-obwohl',
    part: 1,
    topic: 'Nebensätze',
    de: 'Nebensätze: obwohl',
    bn: 'Subordinate clause: obwohl — যদিও',
    summary: 'দুটি বিপরীত বা অপ্রত্যাশিত বিষয় যুক্ত করতে obwohl; তার অংশে verb শেষে।',
    intro: [
      text('Topic 1-এ আমরা শিখব: obwohl, während, bevor, nachdem, seitdem, damit, falls এবং um … zu।'),
      text('প্রথমে একটি গুরুত্বপূর্ণ নিয়ম মনে রাখো: যেসব clause-এ verb শেষে যায়, সেগুলোতে verb সাধারণত clause-এর একদম শেষে বসে।'),
      examplesEn(
        ['Ich lerne Deutsch.', 'I learn German.', 'আমি জার্মান শিখি।'],
        ['Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.', 'I learn German because I want to work in Germany.', 'আমি জার্মান শিখি, কারণ আমি জার্মানিতে কাজ করতে চাই।'],
      ),
      text('দ্বিতীয় বাক্যে weil-এর clause-এর verb möchte একদম শেষে গেছে।'),
    ],
    sections: [
      section(
        'obwohl — যদিও',
        text('দুটি বিপরীত বা অপ্রত্যাশিত বিষয় যুক্ত করতে ব্যবহার হয়।'),
        text('Structure: Obwohl + subject + other words + verb, main clause.'),
        examplesEn(['Obwohl ich müde bin, lerne ich Deutsch.', 'Although I am tired, I study German.', 'যদিও আমি ক্লান্ত, তবুও আমি জার্মান শিখি।']),
        text('কেন bin শেষে? obwohl দিয়ে শুরু হওয়া অংশে verb শেষে যায়। ওই অংশ শেষ হওয়ার পর main clause-এর verb lerne subject ich-এর আগে আসে।'),
        text('আরেকটি উদাহরণ:'),
        examplesEn(['Obwohl es regnet, gehe ich spazieren.', 'Although it is raining, I go for a walk.', 'যদিও বৃষ্টি হচ্ছে, তবুও আমি হাঁটতে যাই।']),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Obwohl er krank ist, geht er zur Arbeit.', 'Although he is ill, he goes to work.', 'যদিও সে অসুস্থ, তবুও সে কাজে যায়।'],
          ['Obwohl das Wetter schlecht war, haben wir einen Ausflug gemacht.', 'Although the weather was bad, we went on a trip.', 'আবহাওয়া খারাপ থাকলেও আমরা একটি ভ্রমণে গিয়েছিলাম।'],
        ),
        text('obwohl-অংশ বাক্যের শেষেও আসতে পারে। তখন main clause আগে, স্বাভাবিক word order-এ:'),
        examplesEn(['Ich habe die Prüfung bestanden, obwohl ich wenig gelernt habe.', 'I passed the exam although I studied little.', 'আমি পরীক্ষায় পাস করেছি, যদিও কম পড়েছিলাম।']),
      ),
    ],
    test: [
      ['„obwohl“ মানে কী?', ['কারণ', 'যদিও', 'যাতে'], 1, 'obwohl = যদিও।'],
      ['Obwohl ich müde ___, lerne ich Deutsch.', ['bin', 'ist', 'sein'], 0, 'obwohl-এর অংশে verb শেষে: obwohl ich müde bin।'],
      ['কোন বাক্যটি সঠিক?', ['Obwohl ich bin müde, lerne ich Deutsch.', 'Obwohl ich müde bin, ich lerne Deutsch.', 'Obwohl ich müde bin, lerne ich Deutsch.'], 2, 'obwohl-অংশে verb শেষে, তারপর main clause-এ verb আগে, subject পরে।'],
      ['Obwohl es regnet, ___ ich spazieren.', ['gehe', 'ich gehe', 'gehen'], 0, 'subordinate clause-এর পরে main clause-এর verb আগে আসে: gehe ich।'],
      ['obwohl কখন ব্যবহার হয়?', ['কারণ বলতে', 'উদ্দেশ্য বলতে', 'বিপরীত বা অপ্রত্যাশিত বিষয় যুক্ত করতে'], 2, 'দুটি বিপরীত বা অপ্রত্যাশিত বিষয় যুক্ত করতে obwohl।'],
      ['„Obwohl es regnet, gehe ich spazieren.“ মানে কী?', ['বৃষ্টি হচ্ছে, তাই আমি বাসায় থাকি।', 'যদিও বৃষ্টি হচ্ছে, তবুও আমি হাঁটতে যাই।', 'বৃষ্টি হলে আমি হাঁটতে যাই।'], 1, 'obwohl = যদিও।'],
    ],
  }),
  lesson({
    slug: 'nebensatz-waehrend',
    part: 2,
    topic: 'Nebensätze',
    de: 'Nebensätze: während',
    bn: 'Subordinate clause: während — যখন / একই সময়ে',
    summary: 'একই সময়ে দুটি কাজ, বা দুটি বিষয়ের তুলনা: während।',
    sections: [
      section(
        'während — যখন / একই সময়ে / অন্যদিকে',
        text('একই সময়ে দুটি কাজ হচ্ছে বোঝাতে অথবা দুইটি বিষয় তুলনা করতে ব্যবহার হয়।'),
        examplesEn(['Während ich koche, hört meine Frau Musik.', 'While I cook, my wife listens to music.', 'আমি রান্না করার সময় আমার স্ত্রী গান শোনে।']),
        text('এখানে während-এর clause-এ koche শেষে গেছে।'),
        VERB_LAST,
      ),
      section(
        'আরও উদাহরণ',
        text('একই সময়ে দুটি কাজ:'),
        examplesEn(
          ['Während der Lehrer spricht, schreiben die Studenten.', 'While the teacher is speaking, the students write.', 'শিক্ষক যখন কথা বলেন, ছাত্ররা তখন লেখে।'],
          ['Ich höre Musik, während ich mit dem Bus fahre.', 'I listen to music while I travel by bus.', 'বাসে যাওয়ার সময় আমি গান শুনি।'],
          ['Während meine Kinder schlafen, lese ich ein Buch.', 'While my children are sleeping, I read a book.', 'আমার বাচ্চারা ঘুমানোর সময় আমি একটি বই পড়ি।'],
        ),
        text('দুটি বিষয়ের তুলনা (অন্যদিকে):'),
        examplesEn(
          ['Mein Bruder arbeitet gern draußen, während ich lieber im Büro arbeite.', 'My brother likes working outside, whereas I prefer working in the office.', 'আমার ভাই বাইরে কাজ করতে পছন্দ করে, অন্যদিকে আমি অফিসে কাজ করতে বেশি পছন্দ করি।'],
          ['Während es in Deutschland kalt ist, ist es in Bangladesch warm.', 'While it is cold in Germany, it is warm in Bangladesh.', 'জার্মানিতে যখন ঠান্ডা, বাংলাদেশে তখন গরম।'],
        ),
      ),
    ],
    test: [
      ['„während“ এখানে মানে কী?', ['একই সময়ে / যখন', 'পরে', 'যদি'], 0, 'während = একই সময়ে দুটি কাজ।'],
      ['Während ich ___, hört meine Frau Musik.', ['koche', 'kochen', 'kocht'], 0, 'ich → koche, während-এর অংশে শেষে।'],
      ['Während ich koche, ___ meine Frau Musik.', ['hört', 'meine Frau hört', 'hören'], 0, 'subordinate clause-এর পরে main clause-এর verb আগে: hört meine Frau।'],
      ['কোন বাক্যটি সঠিক?', ['Während koche ich, hört sie Musik.', 'Während ich koche, hört sie Musik.', 'Während ich koche, sie hört Musik.'], 1, 'während-অংশে verb শেষে, main clause-এ verb আগে।'],
      ['während দিয়ে আর কী বোঝানো যায়?', ['দুটি বিষয়ের তুলনা', 'আদেশ', 'অতীতের আগের অতীত'], 0, 'während দিয়ে একই সময়ের কাজ বা দুটি বিষয়ের তুলনা বোঝায়।'],
      ['„Während ich koche, hört meine Frau Musik.“ মানে কী?', ['রান্নার পরে আমার স্ত্রী গান শোনে।', 'আমি রান্না করার সময় আমার স্ত্রী গান শোনে।', 'আমার স্ত্রী গান শুনলে আমি রান্না করি।'], 1, 'während = একই সময়ে।'],
    ],
  }),
  lesson({
    slug: 'nebensatz-bevor',
    part: 3,
    topic: 'Nebensätze',
    de: 'Nebensätze: bevor',
    bn: 'Subordinate clause: bevor — করার আগে',
    summary: 'একটি কাজের আগে অন্য কাজ: bevor।',
    sections: [
      section(
        'bevor — করার আগে',
        text('একটি কাজের আগে অন্য কাজ ঘটে বোঝায়।'),
        examplesEn(['Bevor ich schlafe, putze ich meine Zähne.', 'Before I sleep, I brush my teeth.', 'ঘুমানোর আগে আমি দাঁত ব্রাশ করি।']),
        text('মনে রাখো: bevor-এর অংশে schlafe শেষে, আর পরের main clause-এ putze subject-এর আগে এসেছে।'),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Bevor ich zur Arbeit gehe, trinke ich einen Kaffee.', 'Before I go to work, I drink a coffee.', 'কাজে যাওয়ার আগে আমি এক কাপ কফি খাই।'],
          ['Bevor wir essen, waschen wir unsere Hände.', 'Before we eat, we wash our hands.', 'খাওয়ার আগে আমরা হাত ধুই।'],
          ['Ich lese die Wörter noch einmal, bevor ich den Test mache.', 'I read the words once more before I take the test.', 'টেস্ট দেওয়ার আগে আমি শব্দগুলো আরেকবার পড়ি।'],
          ['Ruf mich an, bevor du kommst.', 'Call me before you come.', 'আসার আগে আমাকে ফোন করো।'],
          ['Bevor er nach Deutschland kam, hat er in Dhaka gearbeitet.', 'Before he came to Germany, he worked in Dhaka.', 'জার্মানিতে আসার আগে সে ঢাকায় কাজ করত।'],
        ),
      ),
    ],
    test: [
      ['„bevor“ মানে কী?', ['করার পরে', 'করার আগে', 'যদিও'], 1, 'bevor = করার আগে।'],
      ['Bevor ich ___, putze ich meine Zähne.', ['schlafe', 'schlafen', 'schläft'], 0, 'bevor-এর অংশে verb শেষে: bevor ich schlafe।'],
      ['Bevor ich schlafe, ___ ich meine Zähne.', ['putze', 'putzen', 'putzt'], 0, 'main clause-এ ich → putze, subject-এর আগে।'],
      ['কোন বাক্যটি সঠিক?', ['Bevor ich schlafe, ich putze meine Zähne.', 'Bevor schlafe ich, putze ich meine Zähne.', 'Bevor ich schlafe, putze ich meine Zähne.'], 2, 'bevor-অংশে verb শেষে; main clause-এ verb আগে।'],
      ['„Bevor ich esse, wasche ich meine Hände.“ মানে কী?', ['খাওয়ার আগে আমি হাত ধুই।', 'খাওয়ার পরে আমি হাত ধুই।', 'খাওয়ার সময় আমি হাত ধুই।'], 0, 'bevor = আগে।'],
      ['„Ich trinke Kaffee, bevor ich zur Arbeit ___.“', ['gehe', 'gehen', 'geht'], 0, 'ich → gehe, শেষে।'],
    ],
  }),
  lesson({
    slug: 'nebensatz-nachdem',
    part: 4,
    topic: 'Nebensätze',
    de: 'Nebensätze: nachdem',
    bn: 'Subordinate clause: nachdem — করার পরে',
    summary: 'একটি কাজ শেষ হওয়ার পরে আরেকটি কাজ: nachdem।',
    sections: [
      section(
        'nachdem — করার পরে',
        text('একটি কাজ শেষ হওয়ার পর আরেকটি কাজ হয়।'),
        examplesEn(['Nachdem ich gegessen habe, lerne ich Deutsch.', 'After I have eaten, I study German.', 'খাওয়ার পরে আমি জার্মান শিখি।']),
        text('এখানে habe subordinate clause-এর শেষে গেছে। nachdem দিয়ে অতীতের দুটি কাজের ক্রম বোঝাতে B1-এ প্রায়ই Plusquamperfekt-ও শেখানো হয় (Topic 5)।'),
      ),
      section(
        'আরও উদাহরণ',
        text('nachdem-অংশের কাজটি আগে শেষ হয়, তাই সেখানে অতীতের রূপ বসে। main clause present হলে nachdem-অংশে Perfekt:'),
        examplesEn(
          ['Nachdem ich die Hausaufgaben gemacht habe, sehe ich fern.', 'After I have done my homework, I watch TV.', 'বাড়ির কাজ শেষ করার পরে আমি টিভি দেখি।'],
          ['Nachdem er aufgestanden ist, duscht er.', 'After he has got up, he takes a shower.', 'ঘুম থেকে ওঠার পরে সে গোসল করে।'],
          ['Wir gehen spazieren, nachdem wir gegessen haben.', 'We go for a walk after we have eaten.', 'খাওয়ার পরে আমরা হাঁটতে যাই।'],
        ),
        text('main clause অতীতে হলে nachdem-অংশে Plusquamperfekt (hatte/war + Partizip II):'),
        examplesEn(
          ['Nachdem sie den Kurs beendet hatte, fand sie eine Arbeit.', 'After she had finished the course, she found a job.', 'কোর্স শেষ করার পরে সে একটি চাকরি পেয়েছিল।'],
          ['Nachdem der Film angefangen hatte, kamen wir ins Kino.', 'After the film had started, we came into the cinema.', 'সিনেমা শুরু হয়ে যাওয়ার পরে আমরা সিনেমা হলে ঢুকলাম।'],
        ),
      ),
    ],
    test: [
      ['„nachdem“ মানে কী?', ['করার পরে', 'করার আগে', 'যাতে'], 0, 'nachdem = করার পরে।'],
      ['Nachdem ich gegessen ___, lerne ich Deutsch.', ['habe', 'hat', 'bin'], 0, 'nachdem-এর অংশে সহায়ক verb habe একদম শেষে।'],
      ['কোন বাক্যটি সঠিক?', ['Nachdem ich habe gegessen, lerne ich.', 'Nachdem ich gegessen habe, lerne ich.', 'Nachdem ich gegessen habe, ich lerne.'], 1, 'nachdem-অংশে verb শেষে; main clause-এ verb আগে।'],
      ['nachdem আর bevor-এর পার্থক্য কী?', ['nachdem = পরে, bevor = আগে', 'nachdem = আগে, bevor = পরে', 'দুটির মানে একই'], 0, 'nachdem = করার পরে, bevor = করার আগে।'],
      ['„Nachdem ich gegessen habe, lerne ich Deutsch.“ মানে কী?', ['খাওয়ার আগে আমি জার্মান শিখি।', 'খাওয়ার সময় আমি জার্মান শিখি।', 'খাওয়ার পরে আমি জার্মান শিখি।'], 2, 'nachdem = পরে।'],
      ['অতীতের দুটি কাজের ক্রম বোঝাতে nachdem-এর সঙ্গে B1-এ কোন কাল শেখানো হয়?', ['Futur', 'Plusquamperfekt', 'Präsens'], 1, 'nachdem-এর সঙ্গে প্রায়ই Plusquamperfekt শেখানো হয়।'],
    ],
  }),
  lesson({
    slug: 'nebensatz-seitdem',
    part: 5,
    topic: 'Nebensätze',
    de: 'Nebensätze: seitdem',
    bn: 'Subordinate clause: seitdem — তখন থেকে',
    summary: 'কোনো সময় থেকে এখন পর্যন্ত চলমান অবস্থা: seitdem।',
    sections: [
      section(
        'seitdem — সেই সময় থেকে / তখন থেকে',
        text('কোনো সময় থেকে এখন পর্যন্ত চলমান অবস্থা বোঝাতে ব্যবহার হয়।'),
        examplesEn(['Seitdem ich in Dhaka wohne, fahre ich oft mit dem Bus.', 'Since I have lived in Dhaka, I often travel by bus.', 'ঢাকায় থাকার পর থেকে আমি প্রায়ই বাসে যাতায়াত করি।']),
        VERB_LAST,
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Seitdem ich Deutsch lerne, verstehe ich viele Lieder.', 'Since I have been learning German, I understand many songs.', 'জার্মান শেখা শুরু করার পর থেকে আমি অনেক গান বুঝতে পারি।'],
          ['Seitdem er Sport macht, fühlt er sich besser.', 'Since he has been doing sport, he feels better.', 'খেলাধুলা শুরু করার পর থেকে সে আগের চেয়ে ভালো বোধ করে।'],
          ['Seitdem wir ein Auto haben, fahren wir oft aufs Land.', 'Since we have had a car, we often drive to the countryside.', 'আমাদের গাড়ি হওয়ার পর থেকে আমরা প্রায়ই গ্রামে বেড়াতে যাই।'],
          ['Sie ist sehr glücklich, seitdem sie in Berlin wohnt.', 'She has been very happy since she has lived in Berlin.', 'বার্লিনে থাকার পর থেকে সে খুব খুশি।'],
          ['Seit ich die neue Arbeit habe, stehe ich früher auf.', 'Since I have had the new job, I get up earlier.', 'নতুন কাজটি পাওয়ার পর থেকে আমি আগে ঘুম থেকে উঠি।'],
        ),
        text('শেষ উদাহরণের মতো seitdem-এর জায়গায় শুধু seit-ও বলা যায়, অর্থ একই।'),
      ),
    ],
    test: [
      ['„seitdem“ মানে কী?', ['তখন থেকে', 'তার আগে', 'যদি'], 0, 'seitdem = সেই সময় থেকে।'],
      ['Seitdem ich in Dhaka ___, fahre ich oft mit dem Bus.', ['wohne', 'wohnen', 'wohnt'], 0, 'seitdem-এর অংশে verb শেষে: ich wohne।'],
      ['Seitdem ich in Dhaka wohne, ___ ich oft mit dem Bus.', ['fahre', 'ich fahre', 'fahren'], 0, 'main clause-এ verb আগে: fahre ich।'],
      ['seitdem কোন ধরনের অবস্থা বোঝায়?', ['শেষ হয়ে যাওয়া কাজ', 'ভবিষ্যতের পরিকল্পনা', 'কোনো সময় থেকে এখনো চলমান অবস্থা'], 2, 'কোনো সময় থেকে এখন পর্যন্ত চলমান অবস্থা।'],
      ['কোন বাক্যটি সঠিক?', ['Seitdem ich wohne hier, bin ich glücklich.', 'Seitdem ich hier wohne, bin ich glücklich.', 'Seitdem ich hier wohne, ich bin glücklich.'], 1, 'seitdem-অংশে verb শেষে, main clause-এ verb আগে।'],
      ['„Seitdem ich Deutsch lerne, lese ich mehr.“ মানে কী?', ['জার্মান শেখার পর থেকে আমি বেশি পড়ি।', 'জার্মান শেখার আগে আমি বেশি পড়তাম।', 'জার্মান শিখলে আমি বেশি পড়ব।'], 0, 'seitdem = তখন থেকে এখন পর্যন্ত।'],
    ],
  }),
  lesson({
    slug: 'nebensatz-damit',
    part: 6,
    topic: 'Nebensätze',
    de: 'Nebensätze: damit',
    bn: 'Subordinate clause: damit — যাতে',
    summary: 'কোনো কাজের উদ্দেশ্য: damit; তার অংশে verb শেষে।',
    sections: [
      section(
        'damit — যাতে',
        text('কোনো কাজের উদ্দেশ্য বোঝাতে ব্যবহার হয়।'),
        examplesEn(['Ich lerne Deutsch, damit ich in Deutschland arbeiten kann.', 'I am learning German so that I can work in Germany.', 'আমি জার্মান শিখছি, যাতে জার্মানিতে কাজ করতে পারি।']),
        text('এখানে kann শেষে এসেছে।'),
        examplesEn(['Ich lerne Deutsch, damit meine Frau mich versteht.', 'I learn German so that my wife understands me.', 'আমি জার্মান শিখি, যাতে আমার স্ত্রী আমাকে বুঝতে পারে।']),
        text('damit-এ দুই clause-এর কর্তা একই হতে পারে, আলাদাও হতে পারে। দ্বিতীয় উদাহরণে subject আলাদা (ich, meine Frau)।'),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Ich spreche langsam, damit alle mich verstehen.', 'I speak slowly so that everyone understands me.', 'আমি ধীরে কথা বলি, যাতে সবাই আমাকে বুঝতে পারে।'],
          ['Die Mutter kocht früh, damit die Kinder pünktlich essen können.', 'The mother cooks early so that the children can eat on time.', 'মা আগে আগে রান্না করেন, যাতে বাচ্চারা সময়মতো খেতে পারে।'],
          ['Ich stelle den Wecker, damit ich nicht zu spät komme.', 'I set the alarm so that I am not late.', 'আমি অ্যালার্ম দিয়ে রাখি, যাতে দেরি না হয়।'],
          ['Er gibt mir seine Telefonnummer, damit ich ihn anrufen kann.', 'He gives me his phone number so that I can call him.', 'সে আমাকে তার ফোন নম্বর দেয়, যাতে আমি তাকে ফোন করতে পারি।'],
        ),
      ),
    ],
    test: [
      ['„damit“ মানে কী?', ['যাতে', 'যদিও', 'তখন থেকে'], 0, 'damit = যাতে (উদ্দেশ্য)।'],
      ['Ich lerne Deutsch, damit ich in Deutschland arbeiten ___.', ['kann', 'können', 'kannst'], 0, 'damit-এর অংশে verb শেষে: ich … kann।'],
      ['damit কী বোঝায়?', ['কারণ', 'উদ্দেশ্য', 'সময়'], 1, 'damit দিয়ে কোনো কাজের উদ্দেশ্য বোঝায়।'],
      ['Ich lerne Deutsch, damit meine Frau mich ___.', ['versteht', 'verstehe', 'verstehen'], 0, 'meine Frau (sie) → versteht, শেষে।'],
      ['damit-এ দুই clause-এর subject কি আলাদা হতে পারে?', ['না, কখনো না', 'হ্যাঁ, একই বা আলাদা দুটোই হতে পারে', 'শুধু প্রশ্নে'], 1, 'damit: কর্তা একইও হতে পারে, আলাদাও হতে পারে।'],
      ['কোন বাক্যটি সঠিক?', ['…, damit ich kann arbeiten.', '…, damit kann ich arbeiten.', '…, damit ich arbeiten kann.'], 2, 'damit-অংশে conjugated verb একদম শেষে।'],
    ],
  }),
  lesson({
    slug: 'nebensatz-falls',
    part: 7,
    topic: 'Nebensätze',
    de: 'Nebensätze: falls',
    bn: 'Subordinate clause: falls — যদি',
    summary: 'কোনো সম্ভাব্য পরিস্থিতি বা শর্ত: falls।',
    sections: [
      section(
        'falls — যদি / যদি কখনো',
        text('কোনো সম্ভাব্য পরিস্থিতি বোঝাতে ব্যবহার হয়।'),
        examplesEn(['Falls ich Zeit habe, besuche ich dich.', 'If I have time, I will visit you.', 'যদি আমার সময় থাকে, আমি তোমার সঙ্গে দেখা করতে আসব।']),
        text('falls এবং wenn অনেক ক্ষেত্রে কাছাকাছি অর্থ দেয়। falls-এ প্রায়ই সম্ভাবনা বা শর্তের ভাব বেশি থাকে।'),
        VERB_LAST,
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Falls es regnet, bleiben wir zu Hause.', 'If it rains, we will stay at home.', 'যদি বৃষ্টি হয়, আমরা বাসায় থাকব।'],
          ['Nimm einen Regenschirm mit, falls es regnet.', 'Take an umbrella in case it rains.', 'ছাতা নিয়ে যাও, যদি বৃষ্টি হয়।'],
          ['Falls du Fragen hast, schreib mir eine E-Mail.', 'If you have any questions, write me an email.', 'তোমার কোনো প্রশ্ন থাকলে আমাকে একটি ইমেইল লিখো।'],
          ['Falls der Zug Verspätung hat, rufe ich dich an.', 'In case the train is late, I will call you.', 'ট্রেন দেরি করলে আমি তোমাকে ফোন করব।'],
          ['Ich nehme etwas Geld mit, falls ich ein Taxi brauche.', 'I am taking some money in case I need a taxi.', 'ট্যাক্সি লাগতে পারে, তাই আমি কিছু টাকা সঙ্গে নিই।'],
        ),
      ),
    ],
    test: [
      ['„falls“ মানে কী?', ['যদি', 'যখন থেকে', 'যদিও'], 0, 'falls = যদি / যদি কখনো।'],
      ['Falls ich Zeit ___, besuche ich dich.', ['habe', 'hat', 'haben'], 0, 'falls-এর অংশে verb শেষে: ich … habe।'],
      ['Falls ich Zeit habe, ___ ich dich.', ['besuche', 'ich besuche', 'besuchen'], 0, 'main clause-এ verb আগে: besuche ich।'],
      ['falls-এর কাছাকাছি অর্থের শব্দ কোনটি?', ['obwohl', 'wenn', 'damit'], 1, 'falls এবং wenn অনেক ক্ষেত্রে কাছাকাছি অর্থ দেয়।'],
      ['falls-এ কোন ভাব বেশি থাকে?', ['সম্ভাবনা বা শর্ত', 'নিশ্চিত অতীত', 'আদেশ'], 0, 'falls-এ সম্ভাবনা বা শর্তের ভাব বেশি থাকে।'],
      ['„Falls es regnet, bleibe ich zu Hause.“ মানে কী?', ['বৃষ্টি হচ্ছে, তবুও আমি বাইরে যাই।', 'যদি বৃষ্টি হয়, আমি বাসায় থাকব।', 'বৃষ্টির পরে আমি বাসায় থাকি।'], 1, 'falls = যদি।'],
    ],
  }),
  lesson({
    slug: 'nebensatz-um-zu',
    part: 8,
    topic: 'Nebensätze',
    de: 'um … zu und damit',
    bn: 'Subordinate clause: um … zu — করার জন্য',
    summary: 'একই কর্তার উদ্দেশ্য: um … zu; কর্তা আলাদা হলে damit।',
    sections: [
      section(
        'um … zu — করার জন্য',
        text('যখন একই ব্যক্তি দুটি কাজ করছে এবং দ্বিতীয় কাজটি প্রথম কাজের উদ্দেশ্য, তখন ব্যবহার করতে পারো।'),
        examplesEn(['Ich lerne Deutsch, um in Deutschland zu arbeiten.', 'I am learning German in order to work in Germany.', 'জার্মানিতে কাজ করার জন্য আমি জার্মান শিখছি।']),
      ),
      section(
        'damit-এর সঙ্গে পার্থক্য',
        list('um … zu: সাধারণত দুই কাজের কর্তা একই।', 'damit: কর্তা একইও হতে পারে, আলাদাও হতে পারে।'),
        examplesEn(['Ich lerne Deutsch, damit meine Frau mich versteht.', 'I learn German so that my wife understands me.', 'আমি জার্মান শিখি, যাতে আমার স্ত্রী আমাকে বুঝতে পারে।']),
        text('এখানে দুই clause-এর subject আলাদা, তাই um … zu নয়, damit।'),
      ),
      section(
        'আরও উদাহরণ',
        text('কর্তা একই, তাই um … zu:'),
        examplesEn(
          ['Ich gehe in die Stadt, um Brot zu kaufen.', 'I am going into town to buy bread.', 'রুটি কেনার জন্য আমি শহরে যাচ্ছি।'],
          ['Er steht früh auf, um pünktlich zu sein.', 'He gets up early in order to be on time.', 'সময়মতো পৌঁছানোর জন্য সে ভোরে ওঠে।'],
        ),
        text('কর্তা আলাদা, তাই damit:'),
        examplesEn(
          ['Ich erkläre es noch einmal, damit du es verstehst.', 'I will explain it again so that you understand it.', 'আমি আবার বুঝিয়ে বলছি, যাতে তুমি বুঝতে পারো।'],
          ['Wir sprechen leise, damit das Baby schlafen kann.', 'We speak quietly so that the baby can sleep.', 'আমরা আস্তে কথা বলি, যাতে শিশুটি ঘুমাতে পারে।'],
        ),
      ),
    ],
    test: [
      ['Ich lerne Deutsch, um in Deutschland ___ arbeiten.', ['zu', 'um', 'für'], 0, 'um … zu + infinitive: um … zu arbeiten।'],
      ['um … zu কখন ব্যবহার হয়?', ['দুই কাজের কর্তা একই হলে', 'দুই কাজের কর্তা আলাদা হলে', 'অতীত বলতে'], 0, 'um … zu: সাধারণত দুই কাজের কর্তা একই।'],
      ['Ich lerne Deutsch, ___ meine Frau mich versteht.', ['um', 'damit', 'zu'], 1, 'subject আলাদা (ich, meine Frau), তাই damit।'],
      ['„um in Deutschland zu arbeiten“ মানে কী?', ['জার্মানিতে কাজ করার পরে', 'জার্মানিতে কাজ করার জন্য', 'জার্মানিতে কাজ না করে'], 1, 'um … zu = করার জন্য।'],
      ['um … zu-তে verb কোন রূপে থাকে?', ['zu + Infinitiv', 'Partizip II', 'conjugated রূপ'], 0, 'um … zu + infinitive: zu arbeiten।'],
      ['কোন বাক্যটি সঠিক?', ['Ich spare, um ein Auto kaufe.', 'Ich spare, um ein Auto zu kaufen.', 'Ich spare, um zu ein Auto kaufen.'], 1, 'um + অন্যান্য শব্দ + zu + infinitive শেষে।'],
    ],
  }),

  // Topic 2: Relative clauses
  lesson({
    slug: 'relativsatz',
    topic: 'Relativsätze',
    de: 'Relativsätze: der, die, das, den, dem',
    bn: 'Relative clause: der, die, das, den, dem',
    summary: 'কোনো মানুষ বা জিনিস সম্পর্কে বাড়তি তথ্য: Der Mann, der dort steht, …',
    intro: [
      text('Relative clause দিয়ে কোনো মানুষ, জিনিস বা জায়গা সম্পর্কে অতিরিক্ত তথ্য দেওয়া হয়।'),
      text('বাংলায় যেমন বলি: „যে ছেলেটি সেখানে দাঁড়িয়ে আছে, সে আমার ভাই।“'),
      examplesEn(['Der Mann, der dort steht, ist mein Lehrer.', 'The man who is standing there is my teacher.', 'যে লোকটি সেখানে দাঁড়িয়ে আছে, তিনি আমার শিক্ষক।']),
      text('এখানে der dort steht লোকটি সম্পর্কে বাড়তি তথ্য দিচ্ছে।'),
    ],
    sections: [
      section(
        'সহজ নিয়ম',
        text('Relative pronoun নির্ভর করে দুটি বিষয়ের ওপর:'),
        list('কোন noun-এর কথা বলা হচ্ছে—der Mann, die Frau, das Kind ইত্যাদি।', 'Relative clause-এর ভেতরে সেই noun কী কাজ করছে—subject, direct object, নাকি indirect object।'),
        table(['Case', 'Masculine', 'Feminine', 'Neuter', 'Plural'], ['Nominativ', 'der', 'die', 'das', 'die'], ['Akkusativ', 'den', 'die', 'das', 'die'], ['Dativ', 'dem', 'der', 'dem', 'denen']),
      ),
      section(
        'উদাহরণ',
        text('১. Nominativ — যে কাজটি করছে'),
        examplesEn(['Der Mann, der hier wohnt, ist nett.', 'The man who lives here is nice.', 'যে লোকটি এখানে থাকে, তিনি ভালো মানুষ।']),
        text('২. Akkusativ — যাকে কাজটি করা হচ্ছে'),
        examplesEn(['Der Mann, den ich kenne, ist nett.', 'The man whom I know is nice.', 'যে লোকটিকে আমি চিনি, তিনি ভালো মানুষ।']),
        text('এখানে ich হলো subject, আর লোকটিকে চেনা হচ্ছে—তাই den।'),
        text('৩. Dativ — যাকে কিছু দেওয়া হচ্ছে বা যার জন্য কিছু করা হচ্ছে'),
        examplesEn(['Der Mann, dem ich helfe, ist nett.', 'The man whom I help is nice.', 'যে লোকটিকে আমি সাহায্য করি, তিনি ভালো মানুষ।']),
        text('helfen verb-এর সঙ্গে Dativ লাগে, তাই dem।'),
        text('মনে রাখবে: Relative clause-এ verb শেষে যায়।'),
      ),
      section(
        'আরও উদাহরণ',
        text('Feminine, neuter ও plural:'),
        examplesEn(
          ['Die Frau, die neben mir wohnt, ist Ärztin.', 'The woman who lives next to me is a doctor.', 'যে মহিলা আমার পাশে থাকেন, তিনি একজন ডাক্তার।'],
          ['Das Buch, das ich gerade lese, ist sehr spannend.', 'The book that I am reading at the moment is very exciting.', 'যে বইটি আমি এখন পড়ছি, সেটি খুব রোমাঞ্চকর।'],
          ['Die Tasche, die du gekauft hast, ist sehr schön.', 'The bag that you bought is very nice.', 'যে ব্যাগটি তুমি কিনেছ, সেটি খুব সুন্দর।'],
          ['Die Kollegin, der ich helfe, ist neu.', 'The colleague whom I am helping is new.', 'যে সহকর্মীকে আমি সাহায্য করছি, তিনি নতুন।'],
          ['Die Kinder, die im Park spielen, sind laut.', 'The children who are playing in the park are loud.', 'যে বাচ্চারা পার্কে খেলছে, তারা খুব হইচই করছে।'],
          ['Die Freunde, denen ich oft schreibe, wohnen in Deutschland.', 'The friends to whom I often write live in Germany.', 'যে বন্ধুদের আমি প্রায়ই লিখি, তারা জার্মানিতে থাকে।'],
        ),
        text('Preposition থাকলে সেটি relative pronoun-এর আগে বসে:'),
        examplesEn(
          ['Die Freundin, mit der ich Deutsch lerne, kommt aus Indien.', 'The friend with whom I learn German comes from India.', 'যে বান্ধবীর সঙ্গে আমি জার্মান শিখি, সে ভারত থেকে এসেছে।'],
          ['Der Kurs, an dem ich teilnehme, ist sehr gut.', 'The course that I am taking part in is very good.', 'যে কোর্সে আমি অংশ নিচ্ছি, সেটি খুব ভালো।'],
        ),
      ),
    ],
    test: [
      ['Der Mann, ___ hier wohnt, ist nett.', ['der', 'den', 'dem'], 0, 'লোকটি নিজেই কাজ করছে (subject) → Nominativ: der।'],
      ['Der Mann, ___ ich kenne, ist nett.', ['der', 'den', 'dem'], 1, 'ich subject, লোকটিকে চেনা হচ্ছে → Akkusativ: den।'],
      ['Der Mann, ___ ich helfe, ist nett.', ['den', 'der', 'dem'], 2, 'helfen + Dativ → dem।'],
      ['Die Frau, ___ dort steht, ist meine Lehrerin.', ['die', 'der', 'den'], 0, 'die Frau, Nominativ → die।'],
      ['Relative clause-এ verb কোথায় বসে?', ['শুরুতে', 'শেষে', 'দ্বিতীয় স্থানে'], 1, 'Relative clause-এ verb শেষে যায়।'],
      ['Plural-এ Dativ relative pronoun কোনটি?', ['dem', 'der', 'denen'], 2, 'Plural Dativ → denen।'],
    ],
  }),

  // Topic 3: Konjunktiv II
  lesson({
    slug: 'konjunktiv-vorstellung',
    part: 1,
    topic: 'Konjunktiv II',
    de: 'Konjunktiv II: Vorstellung',
    bn: 'Konjunktiv II: কল্পনা',
    summary: 'বাস্তব নয় এমন কল্পনা: Wenn ich reich wäre, würde ich …',
    intro: [
      text('Konjunktiv II দিয়ে এমন কথা বলি যা বাস্তব নয়: কল্পনা, ইচ্ছা, পরামর্শ বা ভদ্র অনুরোধ।'),
      table(['সাধারণ রূপ', 'Konjunktiv II'], ['haben', 'hätte'], ['sein', 'wäre'], ['können', 'könnte'], ['müssen', 'müsste'], ['dürfen', 'dürfte'], ['werden', 'würde']),
    ],
    sections: [
      section(
        'কল্পনা',
        examplesEn(['Wenn ich reich wäre, würde ich ein Haus kaufen.', 'If I were rich, I would buy a house.', 'আমি যদি ধনী হতাম, তাহলে একটি বাড়ি কিনতাম।']),
        text('এখানে wäre মানে „হতাম“, আর würde … kaufen মানে „কিনতাম“।'),
        text('Common mistake: Wenn ich Zeit hätte, ich würde lernen. — subordinate clause-এর পরে main clause-এর word order ভুল।'),
        text('সঠিক: Wenn ich Zeit hätte, würde ich lernen.'),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Wenn ich mehr Zeit hätte, würde ich öfter Sport machen.', 'If I had more time, I would do sport more often.', 'আমার আরও সময় থাকলে আমি আরও বেশি খেলাধুলা করতাম।'],
          ['Wenn ich in Deutschland wäre, würde ich jeden Tag Deutsch sprechen.', 'If I were in Germany, I would speak German every day.', 'আমি জার্মানিতে থাকলে প্রতিদিন জার্মান বলতাম।'],
          ['Wenn ich ein Auto hätte, könnte ich dich besuchen.', 'If I had a car, I could visit you.', 'আমার একটি গাড়ি থাকলে আমি তোমার সঙ্গে দেখা করতে যেতে পারতাম।'],
        ),
        text('ইচ্ছা প্রকাশ:'),
        examplesEn(
          ['Ich würde gern nach Berlin reisen.', 'I would like to travel to Berlin.', 'আমি বার্লিনে বেড়াতে যেতে চাই।'],
          ['Wenn ich doch nur mehr Geld hätte!', 'If only I had more money!', 'ইশ, যদি আমার আরও টাকা থাকত!'],
          ['Es wäre schön, wenn du mitkommen würdest.', 'It would be nice if you came along.', 'তুমি সঙ্গে এলে খুব ভালো হতো।'],
        ),
      ),
    ],
    test: [
      ['sein → Konjunktiv II কোনটি?', ['war', 'wäre', 'würde'], 1, 'sein → wäre।'],
      ['haben → Konjunktiv II কোনটি?', ['hätte', 'hatte', 'habe'], 0, 'haben → hätte।'],
      ['Wenn ich reich ___, würde ich ein Haus kaufen.', ['bin', 'war', 'wäre'], 2, 'কল্পনা (বাস্তব নয়): wäre।'],
      ['কোন বাক্যটি সঠিক?', ['Wenn ich Zeit hätte, ich würde lernen.', 'Wenn ich Zeit hätte, würde ich lernen.', 'Wenn hätte ich Zeit, würde ich lernen.'], 1, 'subordinate clause-এর পরে main clause-এ verb আগে: würde ich।'],
      ['„würde … kaufen“ মানে কী?', ['কিনতাম', 'কিনেছি', 'কিনব'], 0, 'würde + infinitive = কল্পনায় „কিনতাম“।'],
      ['Konjunktiv II কী বোঝায়?', ['নিশ্চিত অতীত', 'বাস্তব নয় এমন কল্পনা, ইচ্ছা বা ভদ্রতা', 'আদেশ'], 1, 'কল্পনা, ইচ্ছা, পরামর্শ বা ভদ্র অনুরোধ।'],
    ],
  }),
  lesson({
    slug: 'konjunktiv-bitte',
    part: 2,
    topic: 'Konjunktiv II',
    de: 'Konjunktiv II: höfliche Bitten',
    bn: 'Konjunktiv II: ভদ্র অনুরোধ',
    summary: 'Könnten Sie mir bitte helfen? — Können-এর চেয়ে বেশি ভদ্র।',
    sections: [
      section(
        'ভদ্র অনুরোধ',
        examplesEn(['Könnten Sie mir bitte helfen?', 'Could you please help me?', 'আপনি কি দয়া করে আমাকে সাহায্য করতে পারবেন?']),
        text('এটা Können Sie mir helfen?-এর চেয়ে বেশি ভদ্র শোনায়।'),
        examplesEn(['Hätten Sie kurz Zeit?', 'Would you have a moment?', 'আপনার কি একটু সময় হবে?'], ['Ich hätte gern einen Kaffee.', 'I would like a coffee.', 'আমি একটি কফি নিতে চাই।']),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Würden Sie bitte das Fenster schließen?', 'Would you please close the window?', 'আপনি কি দয়া করে জানালাটি বন্ধ করবেন?'],
          ['Könntest du mir bitte das Salz geben?', 'Could you please pass me the salt?', 'তুমি কি দয়া করে আমাকে লবণটা দিতে পারবে?'],
          ['Dürfte ich kurz Ihr Telefon benutzen?', 'Might I use your phone for a moment?', 'আমি কি একটু আপনার ফোনটি ব্যবহার করতে পারি?'],
          ['Wäre es möglich, den Termin zu verschieben?', 'Would it be possible to postpone the appointment?', 'অ্যাপয়েন্টমেন্টটি কি পিছিয়ে দেওয়া সম্ভব হবে?'],
        ),
      ),
    ],
    test: [
      ['সবচেয়ে ভদ্র অনুরোধ কোনটি?', ['Können Sie mir helfen?', 'Könnten Sie mir bitte helfen?', 'Helfen Sie mir!'], 1, 'Konjunktiv II (könnten) + bitte সবচেয়ে ভদ্র।'],
      ['können → Konjunktiv II কোনটি?', ['konnte', 'könnte', 'kann'], 1, 'können → könnte।'],
      ['„Könnten Sie mir bitte helfen?“ মানে কী?', ['আপনি কি দয়া করে আমাকে সাহায্য করতে পারবেন?', 'আপনি আমাকে সাহায্য করেছিলেন।', 'আমাকে সাহায্য করুন!'], 0, 'ভদ্র অনুরোধ।'],
      ['Ich ___ gern einen Kaffee. (চাই, ভদ্রভাবে)', ['hätte', 'hatte', 'habe'], 0, 'Ich hätte gern … = আমি … নিতে চাই (ভদ্র)।'],
      ['___ Sie kurz Zeit? (ভদ্রভাবে)', ['Hatten', 'Haben', 'Hätten'], 2, 'Konjunktiv II: Hätten Sie …?'],
      ['Konjunktiv II অনুরোধকে কেমন করে?', ['আরও ভদ্র', 'আরও কড়া', 'অতীত'], 0, 'Konjunktiv II অনুরোধকে আরও ভদ্র শোনায়।'],
    ],
  }),
  lesson({
    slug: 'konjunktiv-rat',
    part: 3,
    topic: 'Konjunktiv II',
    de: 'Konjunktiv II: Ratschläge',
    bn: 'Konjunktiv II: পরামর্শ',
    summary: 'পরামর্শ দিতে sollte: Du solltest mehr Wasser trinken.',
    sections: [
      section(
        'পরামর্শ',
        examplesEn(['Du solltest mehr Wasser trinken.', 'You should drink more water.', 'তোমার আরও বেশি পানি পান করা উচিত।'], ['An deiner Stelle würde ich zum Arzt gehen.', 'If I were you, I would go to the doctor.', 'তোমার জায়গায় থাকলে আমি ডাক্তারের কাছে যেতাম।']),
        text('sollte (sollen-এর Konjunktiv II) দিয়ে নরমভাবে পরামর্শ দেওয়া যায়। মূল verb শেষে infinitive হিসেবে থাকে।'),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Ihr solltet früher ins Bett gehen.', 'You should go to bed earlier.', 'তোমাদের আরও আগে ঘুমাতে যাওয়া উচিত।'],
          ['Sie sollten mehr Obst essen.', 'You should eat more fruit.', 'আপনার আরও বেশি ফল খাওয়া উচিত।'],
          ['Wenn ich du wäre, würde ich mehr Deutsch sprechen.', 'If I were you, I would speak more German.', 'আমি তোমার জায়গায় হলে আরও বেশি জার্মান বলতাম।'],
          ['Du könntest einen Deutschkurs machen.', 'You could take a German course.', 'তুমি একটি জার্মান কোর্স করতে পারো।'],
          ['Es wäre besser, heute zu Hause zu bleiben.', 'It would be better to stay at home today.', 'আজ বাসায় থাকাই ভালো হবে।'],
        ),
      ),
    ],
    test: [
      ['Du ___ mehr Wasser trinken. (উচিত)', ['solltest', 'sollst', 'sollen'], 0, 'পরামর্শে Konjunktiv II: du solltest।'],
      ['„Du solltest mehr schlafen.“ মানে কী?', ['তুমি বেশি ঘুমিয়েছ।', 'তোমার আরও বেশি ঘুমানো উচিত।', 'তুমি বেশি ঘুমাবে।'], 1, 'solltest = উচিত (পরামর্শ)।'],
      ['পরামর্শ দিতে কোন রূপ ব্যবহার হয়?', ['sollte', 'war', 'hatte'], 0, 'sollte দিয়ে নরমভাবে পরামর্শ।'],
      ['Du solltest mehr Wasser ___.', ['trinkst', 'trinken', 'getrunken'], 1, 'মূল verb শেষে infinitive: trinken।'],
      ['„An deiner Stelle würde ich zum Arzt gehen.“ মানে কী?', ['আমি ডাক্তারের কাছে গিয়েছিলাম।', 'তোমার জায়গায় থাকলে আমি ডাক্তারের কাছে যেতাম।', 'ডাক্তার তোমার কাছে আসবে।'], 1, 'würde + infinitive দিয়ে পরামর্শ।'],
      ['Ihr ___ früher aufstehen. (উচিত)', ['solltet', 'solltest', 'sollte'], 0, 'ihr → solltet।'],
    ],
  }),

  // Topic 4: Passive
  lesson({
    slug: 'passiv',
    topic: 'Passiv',
    de: 'Das Passiv: werden + Partizip II',
    bn: 'Passive voice: werden + Partizip II',
    summary: 'কে করছে নয়, কী হচ্ছে: Das Auto wird repariert / wurde repariert.',
    intro: [
      text('Passive voice-এ কে কাজটি করছে, তার চেয়ে কী কাজ হচ্ছে সেটির ওপর গুরুত্ব দেওয়া হয়।'),
      text('বাংলা: „কেউ গাড়িটি মেরামত করছে“ → „গাড়িটি মেরামত করা হচ্ছে।“'),
    ],
    sections: [
      section(
        'Present passive',
        examplesEn(['Der Mechaniker repariert das Auto.', 'The mechanic repairs the car.', 'মেকানিক গাড়িটি মেরামত করছে।'], ['Das Auto wird repariert.', 'The car is being repaired.', 'গাড়িটি মেরামত করা হচ্ছে।']),
        text('Structure: Subject + werden-এর সঠিক রূপ + Partizip II'),
      ),
      section(
        'Past passive',
        examplesEn(['Das Auto wurde repariert.', 'The car was repaired.', 'গাড়িটি মেরামত করা হয়েছিল।']),
        list('wird = present passive', 'wurde = past passive', 'repariert = Partizip II'),
        text('আরেকটি উদাহরণ:'),
        examplesEn(['Die E-Mail wird geschrieben.', 'The email is being written.', 'ইমেইলটি লেখা হচ্ছে।'], ['Die E-Mail wurde geschrieben.', 'The email was written.', 'ইমেইলটি লেখা হয়েছিল।']),
      ),
      section(
        'আরও উদাহরণ',
        text('Present passive (wird / werden):'),
        examplesEn(
          ['Hier wird Deutsch gesprochen.', 'German is spoken here.', 'এখানে জার্মান বলা হয়।'],
          ['In Deutschland wird viel Brot gegessen.', 'A lot of bread is eaten in Germany.', 'জার্মানিতে অনেক রুটি খাওয়া হয়।'],
          ['Die Briefe werden jeden Morgen gebracht.', 'The letters are delivered every morning.', 'চিঠিগুলো প্রতিদিন সকালে দিয়ে যাওয়া হয়।'],
        ),
        text('Past passive (wurde / wurden):'),
        examplesEn(
          ['Das Haus wurde 1990 gebaut.', 'The house was built in 1990.', 'বাড়িটি ১৯৯০ সালে তৈরি করা হয়েছিল।'],
          ['Die Fenster wurden gestern geputzt.', 'The windows were cleaned yesterday.', 'জানালাগুলো গতকাল পরিষ্কার করা হয়েছিল।'],
        ),
        text('কে কাজটি করছে বলতে চাইলে von + Dativ:'),
        examplesEn(
          ['Das Auto wird vom Mechaniker repariert.', 'The car is being repaired by the mechanic.', 'গাড়িটি মেকানিক দ্বারা মেরামত করা হচ্ছে।'],
        ),
        text('Modal verb-এর সঙ্গে: modal verb + Partizip II + werden (শেষে):'),
        examplesEn(
          ['Das Formular muss heute ausgefüllt werden.', 'The form must be filled in today.', 'ফর্মটি আজই পূরণ করতে হবে।'],
        ),
      ),
    ],
    test: [
      ['Das Auto ___ repariert. (হচ্ছে)', ['wird', 'wurde', 'ist'], 0, 'present passive: wird + Partizip II।'],
      ['Das Auto ___ repariert. (হয়েছিল)', ['wird', 'wurde', 'werden'], 1, 'past passive: wurde + Partizip II।'],
      ['Passive গঠনের সূত্র কোনটি?', ['haben + Infinitiv', 'werden + Partizip II', 'sein + Infinitiv'], 1, 'Passiv = werden + Partizip II।'],
      ['„Die E-Mail wird geschrieben.“ মানে কী?', ['ইমেইলটি লেখা হচ্ছে।', 'ইমেইলটি লেখা হয়েছিল।', 'আমি ইমেইল লিখি।'], 0, 'wird + Partizip II = present passive।'],
      ['Passive voice-এ কিসের ওপর গুরুত্ব বেশি?', ['কে কাজটি করছে', 'কী কাজ হচ্ছে', 'কখন কাজটি হবে'], 1, 'কাজটির ওপর গুরুত্ব।'],
      ['Die Briefe ___ gestern geschrieben.', ['werden', 'wird', 'wurden'], 2, 'বহুবচন + অতীত: wurden + Partizip II।'],
    ],
  }),

  // Topic 5: Plusquamperfekt
  lesson({
    slug: 'plusquamperfekt',
    topic: 'Zeitformen',
    de: 'Das Plusquamperfekt',
    bn: 'Plusquamperfekt: অতীতেরও আগের অতীত',
    summary: 'অতীতে একটি ঘটনার আগেই আরেকটি শেষ: hatte/war + Partizip II।',
    intro: [
      text('এটি বোঝার সহজ উপায়: অতীতে দুটি ঘটনা ঘটেছে, কিন্তু একটি ঘটনা অন্যটির আগেই শেষ হয়েছিল।'),
      text('বাংলায়: „আমি স্টেশনে পৌঁছানোর আগেই ট্রেন চলে গিয়েছিল।“'),
      examplesEn(['Der Zug war schon abgefahren, bevor ich am Bahnhof ankam.', 'The train had already left before I arrived at the station.', 'আমি স্টেশনে পৌঁছানোর আগেই ট্রেন চলে গিয়েছিল।']),
    ],
    sections: [
      section(
        'কীভাবে বানাবে?',
        text('hatte বা war + Partizip II'),
        examplesEn(['Ich hatte gegessen.', 'I had eaten.', 'আমি খেয়ে নিয়েছিলাম।'], ['Er war gegangen.', 'He had gone.', 'সে চলে গিয়েছিল।'], ['Wir hatten gelernt.', 'We had studied.', 'আমরা পড়েছিলাম।']),
        text('সাধারণভাবে haben-যুক্ত verb-এর ক্ষেত্রে hatte, আর যেসব verb Perfekt-এ sein নেয়, সেগুলোর ক্ষেত্রে war ব্যবহার হয়।'),
      ),
      section(
        'Perfekt না Plusquamperfekt?',
        list('Perfekt: Ich habe gegessen. — আমি খেয়েছি।', 'Plusquamperfekt: Ich hatte gegessen. — আমি খেয়ে নিয়েছিলাম।'),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Als ich nach Hause kam, hatte meine Mutter schon gekocht.', 'When I came home, my mother had already cooked.', 'আমি বাসায় আসার আগেই মা রান্না করে ফেলেছিলেন।'],
          ['Er war sehr müde, weil er schlecht geschlafen hatte.', 'He was very tired because he had slept badly.', 'সে খুব ক্লান্ত ছিল, কারণ সে ভালো ঘুমায়নি।'],
          ['Nachdem wir den Film gesehen hatten, gingen wir essen.', 'After we had seen the film, we went out to eat.', 'সিনেমা দেখার পরে আমরা খেতে গেলাম।'],
          ['Sie hatte ihren Schlüssel vergessen, deshalb konnte sie nicht in die Wohnung gehen.', 'She had forgotten her key, so she could not go into the flat.', 'সে চাবি ভুলে গিয়েছিল, তাই বাসায় ঢুকতে পারেনি।'],
          ['Wir waren schon nach Hause gefahren, als es zu regnen begann.', 'We had already driven home when it began to rain.', 'বৃষ্টি শুরু হওয়ার আগেই আমরা বাসায় ফিরে গিয়েছিলাম।'],
        ),
      ),
    ],
    test: [
      ['Plusquamperfekt কীভাবে গঠিত হয়?', ['hatte/war + Partizip II', 'habe/bin + Partizip II', 'werden + Infinitiv'], 0, 'hatte বা war + Partizip II।'],
      ['Ich ___ gegessen. (খেয়ে নিয়েছিলাম)', ['habe', 'hatte', 'war'], 1, 'essen haben নেয় → hatte gegessen।'],
      ['Er ___ gegangen. (চলে গিয়েছিল)', ['hatte', 'war', 'ist'], 1, 'gehen Perfekt-এ sein নেয় → war gegangen।'],
      ['Plusquamperfekt কী বোঝায়?', ['অতীতে একটি ঘটনার আগেই আরেকটি শেষ হওয়া', 'ভবিষ্যৎ', 'এখনকার কাজ'], 0, 'অতীতেরও আগের অতীত।'],
      ['Der Zug ___ schon abgefahren, bevor ich ankam.', ['hatte', 'war', 'wird'], 1, 'abfahren sein নেয় → war abgefahren।'],
      ['„Wir hatten gelernt.“ মানে কী?', ['আমরা পড়ছি।', 'আমরা পড়ব।', 'আমরা পড়েছিলাম।'], 2, 'hatten + Partizip II = Plusquamperfekt।'],
    ],
  }),

  // Topic 6: Infinitive constructions
  lesson({
    slug: 'infinitiv-um-zu',
    part: 1,
    topic: 'Infinitivsätze',
    de: 'Infinitivsätze: um … zu',
    bn: 'Infinitive: um … zu — করার জন্য',
    summary: 'উদ্দেশ্য বোঝাতে um … zu + infinitive।',
    intro: [text('Topic 6-এর গঠনগুলো দিয়ে বাক্য ছোট ও স্বাভাবিকভাবে বলা যায়: um … zu, ohne … zu, (an)statt … zu এবং zu + Infinitiv।')],
    sections: [
      section(
        'um … zu — করার জন্য',
        examplesEn(['Ich spare Geld, um ein Auto zu kaufen.', 'I am saving money in order to buy a car.', 'গাড়ি কেনার জন্য আমি টাকা জমাচ্ছি।']),
        text('zu + infinitive অংশটি একদম শেষে বসে।'),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Ich lerne jeden Tag, um die Prüfung zu bestehen.', 'I study every day in order to pass the exam.', 'পরীক্ষায় পাস করার জন্য আমি প্রতিদিন পড়ি।'],
          ['Sie fährt nach Berlin, um ihre Freundin zu besuchen.', 'She is going to Berlin to visit her friend.', 'বান্ধবীর সঙ্গে দেখা করার জন্য সে বার্লিনে যাচ্ছে।'],
          ['Er arbeitet viel, um seiner Familie zu helfen.', 'He works a lot in order to help his family.', 'পরিবারকে সাহায্য করার জন্য সে অনেক কাজ করে।'],
        ),
        text('Separable verb হলে zu মাঝখানে বসে:'),
        examplesEn(
          ['Wir gehen in den Supermarkt, um einzukaufen.', 'We are going to the supermarket to do the shopping.', 'বাজার করার জন্য আমরা সুপারমার্কেটে যাচ্ছি।'],
        ),
        text('um … zu-অংশ বাক্যের শুরুতে এলে তার পরেই main clause-এর verb আসে:'),
        examplesEn(
          ['Um gesund zu bleiben, mache ich jeden Morgen Sport.', 'To stay healthy, I do sport every morning.', 'সুস্থ থাকার জন্য আমি প্রতিদিন সকালে ব্যায়াম করি।'],
        ),
      ),
    ],
    test: [
      ['Ich spare Geld, um ein Auto zu ___.', ['kaufe', 'kaufen', 'gekauft'], 1, 'um … zu + infinitive: zu kaufen।'],
      ['„um … zu“ মানে কী?', ['করার জন্য', 'না করে', 'করার পরিবর্তে'], 0, 'um … zu = করার জন্য।'],
      ['কোন বাক্যটি সঠিক?', ['Ich spare, um zu ein Auto kaufen.', 'Ich spare, um ein Auto zu kaufen.', 'Ich spare, um ein Auto kaufen zu.'], 1, 'um + অন্যান্য শব্দ + zu + infinitive।'],
      ['„Ich lerne, um die Prüfung zu bestehen.“ মানে কী?', ['পরীক্ষায় পাস করার জন্য আমি পড়ি।', 'পরীক্ষার পরে আমি পড়ি।', 'পরীক্ষা ছাড়া আমি পড়ি।'], 0, 'um … zu = উদ্দেশ্য।'],
      ['Er fährt nach Berlin, ___ seine Familie zu besuchen.', ['um', 'ohne', 'damit'], 0, 'zu + infinitive দিয়ে উদ্দেশ্য: um … zu।'],
      ['um … zu-তে zu কোথায় বসে?', ['infinitive-এর ঠিক আগে', 'বাক্যের শুরুতে', 'um-এর ঠিক পরে'], 0, 'zu বসে infinitive-এর ঠিক আগে: zu kaufen।'],
    ],
  }),
  lesson({
    slug: 'infinitiv-ohne-zu',
    part: 2,
    topic: 'Infinitivsätze',
    de: 'Infinitivsätze: ohne … zu',
    bn: 'Infinitive: ohne … zu — না করে',
    summary: 'কোনো কাজ না করে: ohne … zu + infinitive।',
    sections: [
      section(
        'ohne … zu — না করে',
        examplesEn(['Er ging, ohne sich zu verabschieden.', 'He left without saying goodbye.', 'বিদায় না জানিয়েই সে চলে গেল।'], ['Sie ging aus dem Haus, ohne zu frühstücken.', 'She left the house without having breakfast.', 'নাশতা না করেই সে বাসা থেকে বের হলো।']),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Er fährt Auto, ohne einen Führerschein zu haben.', 'He drives a car without having a driving licence.', 'ড্রাইভিং লাইসেন্স ছাড়াই সে গাড়ি চালায়।'],
          ['Ich habe den Text gelesen, ohne alles zu verstehen.', 'I read the text without understanding everything.', 'আমি লেখাটি পড়েছি, কিন্তু সবকিছু বুঝিনি।'],
          ['Sie hat die Prüfung bestanden, ohne viel zu lernen.', 'She passed the exam without studying much.', 'বেশি না পড়েই সে পরীক্ষায় পাস করেছে।'],
          ['Geh nicht weg, ohne mir Bescheid zu sagen!', 'Don’t leave without letting me know!', 'আমাকে না জানিয়ে চলে যেও না!'],
        ),
      ),
    ],
    test: [
      ['„ohne … zu“ মানে কী?', ['না করে', 'করার জন্য', 'করার পরে'], 0, 'ohne … zu = না করে।'],
      ['Er ging, ohne sich zu ___.', ['verabschiedet', 'verabschieden', 'verabschiedete'], 1, 'zu + infinitive: zu verabschieden।'],
      ['„Er ging, ohne sich zu verabschieden.“ মানে কী?', ['বিদায় জানিয়ে সে চলে গেল।', 'বিদায় না জানিয়েই সে চলে গেল।', 'সে বিদায় জানাতে গেল।'], 1, 'ohne … zu = না করে।'],
      ['Sie ging aus dem Haus, ___ zu frühstücken.', ['um', 'ohne', 'statt'], 1, 'নাশতা না করে → ohne … zu।'],
      ['ohne … zu-এর পরে verb কোন রূপে?', ['zu + Infinitiv', 'Partizip II', 'conjugated রূপ'], 0, 'ohne … zu + infinitive।'],
      ['„Er lernt, ohne Pause zu machen.“ মানে কী?', ['বিরতি নিয়ে সে পড়ে।', 'বিরতির পরে সে পড়ে।', 'বিরতি না নিয়ে সে পড়ে।'], 2, 'ohne … zu = না করে।'],
    ],
  }),
  lesson({
    slug: 'infinitiv-statt-zu',
    part: 3,
    topic: 'Infinitivsätze',
    de: 'Infinitivsätze: (an)statt … zu',
    bn: 'Infinitive: (an)statt … zu — করার পরিবর্তে',
    summary: 'একটি কাজের বদলে আরেকটি: (an)statt … zu।',
    sections: [
      section(
        '(an)statt … zu — করার পরিবর্তে',
        examplesEn(['Statt fernzusehen, lerne ich Deutsch.', 'Instead of watching TV, I study German.', 'টিভি দেখার পরিবর্তে আমি জার্মান শিখি।']),
        text('fernsehen একটি separable verb, তাই zu মাঝখানে বসে: fernzusehen। statt আর anstatt একই অর্থ।'),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Anstatt mit dem Auto zu fahren, nehme ich das Fahrrad.', 'Instead of going by car, I take the bike.', 'গাড়িতে যাওয়ার পরিবর্তে আমি সাইকেল নিই।'],
          ['Er spielt am Handy, statt seine Hausaufgaben zu machen.', 'He plays on his phone instead of doing his homework.', 'বাড়ির কাজ করার পরিবর্তে সে মোবাইলে খেলছে।'],
          ['Sie trinkt Tee, statt Kaffee zu trinken.', 'She drinks tea instead of drinking coffee.', 'কফির পরিবর্তে সে চা পান করে।'],
          ['Statt zu warten, sind wir zu Fuß gegangen.', 'Instead of waiting, we walked.', 'অপেক্ষা করার পরিবর্তে আমরা হেঁটে চলে গেলাম।'],
          ['Anstatt mich anzurufen, hat er mir eine Nachricht geschrieben.', 'Instead of calling me, he wrote me a message.', 'আমাকে ফোন করার পরিবর্তে সে একটি মেসেজ লিখেছে।'],
        ),
      ),
    ],
    test: [
      ['„statt … zu“ মানে কী?', ['করার পরিবর্তে', 'করার জন্য', 'না করে'], 0, '(an)statt … zu = করার পরিবর্তে।'],
      ['Statt ___, lerne ich Deutsch. (fernsehen)', ['zu fernsehen', 'fernzusehen', 'fernsehen zu'], 1, 'separable verb-এ zu মাঝখানে: fernzusehen।'],
      ['„Statt fernzusehen, lerne ich Deutsch.“ মানে কী?', ['টিভি দেখার পরিবর্তে আমি জার্মান শিখি।', 'টিভি দেখার পরে আমি জার্মান শিখি।', 'টিভি দেখার জন্য আমি জার্মান শিখি।'], 0, 'statt … zu = পরিবর্তে।'],
      ['statt-এর পরে main clause-এ verb কোথায়?', ['শেষে', 'subject-এর আগে', 'শুরুতে statt-এর আগে'], 1, 'Statt …, lerne ich — main clause-এ verb আগে।'],
      ['anstatt আর statt-এর অর্থ কী?', ['আলাদা', 'একই', 'একটি অতীত, অন্যটি বর্তমান'], 1, 'statt আর anstatt একই অর্থ।'],
      ['Statt zu arbeiten, ___ er.', ['schläft', 'schlafen', 'er schläft'], 0, 'main clause-এ verb আগে: schläft er।'],
    ],
  }),
  lesson({
    slug: 'infinitiv-zu',
    part: 4,
    topic: 'Infinitivsätze',
    de: 'zu + Infinitiv',
    bn: 'zu + Infinitiv',
    summary: 'কিছু verb-এর পরে zu-সহ infinitive: Ich hoffe, … zu finden.',
    sections: [
      section(
        'zu + Infinitiv',
        text('কিছু verb ও expression-এর পরে zu-সহ infinitive লাগে।'),
        examplesEn(['Ich hoffe, bald eine Arbeit zu finden.', 'I hope to find a job soon.', 'আমি আশা করি শিগগিরই একটি কাজ খুঁজে পাব।']),
      ),
      section(
        'Separable verb-এ zu মাঝখানে',
        text('Common mistake: zu সবসময় infinitive-এর ঠিক আগে বসে না। Separable verb হলে মাঝখানে আসে:'),
        list('einkaufen → einzukaufen', 'aufstehen → aufzustehen'),
        examplesEn(['Ich habe keine Zeit, heute einzukaufen.', 'I have no time to go shopping today.', 'আজ বাজার করার সময় আমার নেই।']),
      ),
      section(
        'আরও উদাহরণ',
        text('যেসব verb ও expression-এর পরে প্রায়ই zu + Infinitiv আসে: hoffen, vergessen, versuchen, Lust haben, Zeit haben, es ist wichtig, es macht Spaß।'),
        examplesEn(
          ['Es ist wichtig, jeden Tag Deutsch zu sprechen.', 'It is important to speak German every day.', 'প্রতিদিন জার্মান বলা গুরুত্বপূর্ণ।'],
          ['Ich habe vergessen, dich anzurufen.', 'I forgot to call you.', 'আমি তোমাকে ফোন করতে ভুলে গেছি।'],
          ['Hast du Lust, heute Abend ins Kino zu gehen?', 'Do you feel like going to the cinema tonight?', 'আজ সন্ধ্যায় সিনেমা দেখতে যেতে ইচ্ছা করছে?'],
          ['Er versucht, weniger Kaffee zu trinken.', 'He is trying to drink less coffee.', 'সে কম কফি খাওয়ার চেষ্টা করছে।'],
          ['Es macht Spaß, neue Wörter zu lernen.', 'It is fun to learn new words.', 'নতুন শব্দ শেখা মজার।'],
        ),
      ),
    ],
    test: [
      ['Ich hoffe, bald eine Arbeit ___ finden.', ['zu', 'um', 'für'], 0, 'hoffen-এর পরে zu + infinitive।'],
      ['einkaufen → zu-সহ রূপ কোনটি?', ['zu einkaufen', 'einzukaufen', 'einkaufenzu'], 1, 'separable verb-এ zu মাঝখানে: einzukaufen।'],
      ['aufstehen → zu-সহ রূপ কোনটি?', ['aufzustehen', 'zu aufstehen', 'aufstehenzu'], 0, 'auf + zu + stehen।'],
      ['Ich habe keine Zeit, heute ___.', ['zu einkaufen', 'einkaufen zu', 'einzukaufen'], 2, 'separable verb: einzukaufen।'],
      ['„Ich hoffe, bald eine Arbeit zu finden.“ মানে কী?', ['আমি শিগগিরই একটি কাজ খুঁজে পেয়েছি।', 'আমি আশা করি শিগগিরই একটি কাজ খুঁজে পাব।', 'আমি কাজ খুঁজতে চাই না।'], 1, 'hoffen + zu + infinitive।'],
      ['Es ist schwer, früh ___. (aufstehen)', ['aufzustehen', 'zu aufstehen', 'aufstehen'], 0, 'zu মাঝখানে: aufzustehen।'],
    ],
  }),

  // Topic 7: Adjective endings
  lesson({
    slug: 'adjektivendungen',
    topic: 'Adjektive',
    de: 'Adjektivendungen',
    bn: 'Adjective endings: বিশেষণের শেষের পরিবর্তন',
    summary: 'article, gender ও case অনুযায়ী adjective-এর শেষে -e, -en, -er, -es।',
    intro: [
      text('German-এ adjective-এর শেষে -e, -en, -er, -es ইত্যাদি পরিবর্তন হতে পারে।'),
      examplesEn(['ein schönes Haus', 'a beautiful house', 'একটি সুন্দর বাড়ি']),
      text('কেন schönes, শুধু schön নয়? কারণ Haus হলো neuter noun এবং এখানে ein-এর সঙ্গে Nominativ/Akkusativ রূপে adjective ending -es হয়েছে।'),
    ],
    sections: [
      section(
        'সহজ উদাহরণ',
        table(
          ['German', 'বাংলা'],
          ['der nette Mann', 'ভালো লোকটি'],
          ['die nette Frau', 'ভালো মহিলাটি'],
          ['das nette Kind', 'ভালো শিশুটি'],
          ['ein netter Mann', 'একজন ভালো লোক'],
          ['eine nette Frau', 'একজন ভালো মহিলা'],
          ['ein nettes Kind', 'একটি ভালো শিশু'],
        ),
      ),
      section(
        'Case বদলালে ending বদলাতে পারে',
        examplesEn(['Ich sehe den netten Mann.', 'I see the nice man.', 'আমি ভালো লোকটিকে দেখছি।']),
        text('এখানে der Mann Akkusativ হওয়ায় den Mann, আর adjective হয়েছে netten।'),
        examplesEn(['Ich helfe dem netten Mann.', 'I help the nice man.', 'আমি ভালো লোকটিকে সাহায্য করি।']),
        text('এখানে helfen Dativ নেয়, তাই dem netten Mann।'),
        text('B1-এ কী শিখবে?'),
        list('Definite article-এর পরে: der gute Mann', 'Indefinite article-এর পরে: ein guter Mann', 'Dativ-এ: mit einem guten Mann', 'Plural-এ: mit netten Freunden'),
        text('টিপ: শুধু ending মুখস্থ না করে noun-এর gender এবং case শনাক্ত করার অভ্যাস করো।'),
      ),
      section(
        'আরও উদাহরণ',
        text('Definite article-এর পরে:'),
        examplesEn(
          ['Der neue Kollege ist sehr freundlich.', 'The new colleague is very friendly.', 'নতুন সহকর্মীটি খুব বন্ধুসুলভ।'],
          ['Ich fahre mit dem alten Fahrrad zur Arbeit.', 'I ride the old bike to work.', 'আমি পুরোনো সাইকেলটি নিয়ে কাজে যাই।'],
          ['Die jungen Leute tanzen gern.', 'The young people like dancing.', 'তরুণরা নাচতে পছন্দ করে।'],
        ),
        text('Indefinite article-এর পরে:'),
        examplesEn(
          ['Ich kaufe einen neuen Computer.', 'I am buying a new computer.', 'আমি একটি নতুন কম্পিউটার কিনছি।'],
          ['Sie trägt eine rote Jacke.', 'She is wearing a red jacket.', 'সে একটি লাল জ্যাকেট পরে আছে।'],
          ['Wir wohnen in einem kleinen Dorf.', 'We live in a small village.', 'আমরা একটি ছোট গ্রামে থাকি।'],
        ),
        text('Article ছাড়া হলে adjective নিজেই case দেখায়:'),
        examplesEn(
          ['Ich trinke gern heißen Tee.', 'I like drinking hot tea.', 'আমি গরম চা খেতে পছন্দ করি।'],
          ['Er hat nette Freunde.', 'He has nice friends.', 'তার ভালো ভালো বন্ধু আছে।'],
        ),
      ),
    ],
    test: [
      ['ein ___ Haus (schön)', ['schöne', 'schönes', 'schöner'], 1, 'neuter + ein (Nominativ/Akkusativ) → -es: ein schönes Haus।'],
      ['der ___ Mann (nett)', ['nette', 'netter', 'netten'], 0, 'der-এর পরে Nominativ: der nette Mann।'],
      ['ein ___ Mann (nett)', ['nette', 'netten', 'netter'], 2, 'ein + masculine Nominativ → -er: ein netter Mann।'],
      ['Ich sehe den ___ Mann.', ['nette', 'netten', 'netter'], 1, 'Akkusativ masculine: den netten Mann।'],
      ['Ich helfe dem ___ Mann.', ['netten', 'nette', 'netter'], 0, 'Dativ: dem netten Mann।'],
      ['mit ___ Freunden (nett, Plural)', ['nette', 'netter', 'netten'], 2, 'Dativ plural: mit netten Freunden।'],
    ],
  }),

  // Topic 8: Verbs with prepositions
  lesson({
    slug: 'verben-praepositionen',
    topic: 'Verben',
    de: 'Verben mit Präpositionen',
    bn: 'Verbs with prepositions: verb-এর সঙ্গে নির্দিষ্ট preposition',
    summary: 'warten auf, sich interessieren für, teilnehmen an … এবং worauf / darauf।',
    intro: [text('German-এ কিছু verb-এর সঙ্গে নির্দিষ্ট preposition ব্যবহার করতে হয়। এগুলো ইংরেজি বা বাংলা থেকে সরাসরি অনুমান করা সবসময় সম্ভব নয়।')],
    sections: [
      section(
        'গুরুত্বপূর্ণ verb pattern',
        table(
          ['Verb pattern', 'বাংলা অর্থ'],
          ['warten auf + Akk.', 'অপেক্ষা করা'],
          ['sich interessieren für + Akk.', 'আগ্রহী হওয়া'],
          ['denken an + Akk.', 'মনে করা / ভাবা'],
          ['sprechen mit + Dat.', 'কারও সঙ্গে কথা বলা'],
          ['teilnehmen an + Dat.', 'অংশগ্রহণ করা'],
          ['sich freuen auf + Akk.', 'ভবিষ্যতের কিছু নিয়ে আনন্দিত হওয়া'],
          ['sich freuen über + Akk.', 'ঘটে যাওয়া বা পাওয়া কিছু নিয়ে আনন্দিত হওয়া'],
        ),
        examplesEn(['Ich warte auf den Bus.', 'I am waiting for the bus.', 'আমি বাসের জন্য অপেক্ষা করছি।']),
        text('warten auf-এর পরে এখানে Akkusativ: den Bus।'),
        examplesEn(['Ich interessiere mich für Design.', 'I am interested in design.', 'আমি ডিজাইনে আগ্রহী।'], ['Ich nehme an einem Kurs teil.', 'I am taking part in a course.', 'আমি একটি কোর্সে অংশ নিচ্ছি।']),
        text('এখানে teilnehmen an-এর পরে Dativ, তাই einem Kurs।'),
      ),
      section(
        'worauf এবং darauf',
        text('কোনো বস্তু বা বিষয় সম্পর্কে প্রশ্ন করলে অনেক সময় wo(r) + preposition ব্যবহার হয়।'),
        examplesEn(['Worauf wartest du?', 'What are you waiting for?', 'তুমি কিসের জন্য অপেক্ষা করছ?'], ['Ich warte darauf.', 'I am waiting for it.', 'আমি সেটার জন্য অপেক্ষা করছি।']),
        text('কিন্তু কোনো ব্যক্তির বিষয়ে প্রশ্ন করলে সাধারণত preposition-এর পরে wen বা wem আসে:'),
        examplesEn(['Auf wen wartest du?', 'Who are you waiting for?', 'তুমি কার জন্য অপেক্ষা করছ?']),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Ich denke oft an meine Familie.', 'I often think of my family.', 'আমি প্রায়ই আমার পরিবারের কথা ভাবি।'],
          ['Wir freuen uns auf den Urlaub.', 'We are looking forward to the holiday.', 'আমরা ছুটির অপেক্ষায় আনন্দিত।'],
          ['Sie freut sich über das Geschenk.', 'She is happy about the present.', 'সে উপহারটি পেয়ে খুশি।'],
          ['Ich spreche morgen mit meinem Chef.', 'I will speak with my boss tomorrow.', 'আমি আগামীকাল আমার বসের সঙ্গে কথা বলব।'],
        ),
        text('প্রশ্ন ও উত্তরে wo(r)- এবং da(r)-:'),
        examplesEn(
          ['Woran denkst du? – Ich denke an die Prüfung.', 'What are you thinking about? – I am thinking about the exam.', 'তুমি কী নিয়ে ভাবছ? – আমি পরীক্ষার কথা ভাবছি।'],
          ['Worüber freust du dich? – Ich freue mich über den Brief.', 'What are you happy about? – I am happy about the letter.', 'তুমি কী নিয়ে খুশি? – আমি চিঠিটা পেয়ে খুশি।'],
        ),
      ),
    ],
    test: [
      ['Ich warte ___ den Bus.', ['auf', 'für', 'an'], 0, 'warten auf + Akkusativ।'],
      ['Ich interessiere mich ___ Design.', ['an', 'für', 'mit'], 1, 'sich interessieren für।'],
      ['Ich nehme an ___ Kurs teil.', ['einen', 'ein', 'einem'], 2, 'teilnehmen an + Dativ: einem Kurs।'],
      ['Ich freue mich ___ den Urlaub. (আসছে এমন ছুটি)', ['auf', 'über', 'für'], 0, 'ভবিষ্যতের কিছু নিয়ে আনন্দ: sich freuen auf।'],
      ['___ wartest du? (কিসের জন্য, কোনো জিনিস)', ['Auf wen', 'Worauf', 'Wofür'], 1, 'জিনিস সম্পর্কে প্রশ্ন: wo(r) + auf = worauf।'],
      ['___ wartest du? (কার জন্য, মানুষ)', ['Worauf', 'Darauf', 'Auf wen'], 2, 'ব্যক্তি সম্পর্কে: preposition + wen: Auf wen।'],
    ],
  }),

  // Topic 9: Advanced connectors
  lesson({
    slug: 'konnektor-einerseits',
    part: 1,
    topic: 'Konnektoren',
    de: 'einerseits … andererseits',
    bn: 'Connector: einerseits … andererseits — একদিকে … অন্যদিকে',
    summary: 'একটি বিষয়ের দুই দিক: einerseits … andererseits।',
    intro: [
      text('Topic 9-এর connector ব্যবহার করলে তোমার কথা বলা ও লেখা আরও পরিণত এবং B1-উপযোগী হবে।'),
      text('মনে রাখো: obwohl-এর মতো সব connector subordinate clause তৈরি করে না। এই connector-গুলো সাধারণ main clause-এর সঙ্গে ব্যবহৃত হয়, তাই প্রতিটির word order আলাদাভাবে শিখবে।'),
    ],
    sections: [
      section(
        'einerseits … andererseits — একদিকে … অন্যদিকে',
        examplesEn(['Einerseits möchte ich in Deutschland arbeiten, andererseits vermisse ich meine Familie.', 'On the one hand, I want to work in Germany; on the other hand, I miss my family.', 'একদিকে আমি জার্মানিতে কাজ করতে চাই, অন্যদিকে আমার পরিবারকে মিস করি।']),
        text('einerseits ও andererseits-এর পরে verb সঙ্গে সঙ্গে আসে: Einerseits möchte ich …, andererseits vermisse ich …'),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Einerseits ist die Wohnung schön, andererseits ist sie zu teuer.', 'On the one hand the flat is nice, on the other hand it is too expensive.', 'একদিকে বাসাটি সুন্দর, অন্যদিকে এটি খুব দামি।'],
          ['Einerseits macht mir die Arbeit Spaß, andererseits habe ich wenig Freizeit.', 'On the one hand I enjoy the work, on the other hand I have little free time.', 'একদিকে কাজটি আমার ভালো লাগে, অন্যদিকে আমার অবসর সময় কম।'],
          ['Einerseits ist das Leben in der Stadt praktisch, andererseits ist es sehr laut.', 'On the one hand life in the city is practical, on the other hand it is very loud.', 'একদিকে শহরের জীবন সুবিধাজনক, অন্যদিকে খুব কোলাহলপূর্ণ।'],
          ['Einerseits möchte ich ein Auto kaufen, andererseits fahre ich gern Fahrrad.', 'On the one hand I want to buy a car, on the other hand I like cycling.', 'একদিকে আমি একটি গাড়ি কিনতে চাই, অন্যদিকে সাইকেল চালাতেও ভালোবাসি।'],
        ),
      ),
    ],
    test: [
      ['„einerseits … andererseits“ মানে কী?', ['একদিকে … অন্যদিকে', 'হয় … নয়তো', 'না … না'], 0, 'একটি বিষয়ের দুই দিক।'],
      ['Einerseits ___ ich in Deutschland arbeiten, …', ['möchte', 'ich möchte', 'möchten'], 0, 'einerseits-এর পরে verb আগে: möchte ich।'],
      ['…, andererseits ___ ich meine Familie.', ['vermisse', 'ich vermisse', 'vermissen'], 0, 'andererseits-এর পরেও verb আগে: vermisse ich।'],
      ['কোন বাক্যটি সঠিক?', ['Einerseits ich möchte reisen, andererseits ich habe kein Geld.', 'Einerseits möchte ich reisen, andererseits habe ich kein Geld.', 'Einerseits reisen möchte ich, andererseits kein Geld habe ich.'], 1, 'দুই অংশেই connector-এর পরে verb আগে।'],
      ['einerseits … andererseits দিয়ে কী বোঝায়?', ['একটি বিষয়ের দুই দিক', 'কারণ', 'সময়ের ক্রম'], 0, 'দুই দিক তুলনা করা।'],
      ['einerseits কি subordinate clause তৈরি করে (verb শেষে)?', ['হ্যাঁ, verb শেষে যায়', 'না, পরে verb সঙ্গে সঙ্গে আসে', 'শুধু প্রশ্নে'], 1, 'এটি main clause-এর সঙ্গে ব্যবহৃত; পরে verb আসে।'],
    ],
  }),
  lesson({
    slug: 'konnektor-sowohl',
    part: 2,
    topic: 'Konnektoren',
    de: 'sowohl … als auch',
    bn: 'Connector: sowohl … als auch — উভয়ই',
    summary: 'দুটিই: sowohl … als auch।',
    sections: [
      section(
        'sowohl … als auch — উভয়ই',
        examplesEn(['Ich lerne sowohl Deutsch als auch Englisch.', 'I learn both German and English.', 'আমি জার্মান এবং ইংরেজি—দুটিই শিখি।']),
        text('দুটি জিনিসকে একসঙ্গে জোর দিয়ে বলতে ব্যবহার হয়।'),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Das Restaurant ist sowohl gut als auch günstig.', 'The restaurant is both good and cheap.', 'রেস্টুরেন্টটি ভালোও, আবার সস্তাও।'],
          ['Sie kann sowohl kochen als auch backen.', 'She can both cook and bake.', 'সে রান্নাও করতে পারে, কেক-রুটিও বানাতে পারে।'],
          ['Wir haben sowohl am Samstag als auch am Sonntag Zeit.', 'We have time on both Saturday and Sunday.', 'শনিবার ও রবিবার দুই দিনই আমাদের সময় আছে।'],
        ),
        text('দুটি subject হলে verb plural হয়:'),
        examplesEn(
          ['Sowohl mein Bruder als auch meine Schwester wohnen in Deutschland.', 'Both my brother and my sister live in Germany.', 'আমার ভাই ও বোন দুজনেই জার্মানিতে থাকে।'],
        ),
      ),
    ],
    test: [
      ['„sowohl … als auch“ মানে কী?', ['উভয়ই', 'না … না', 'হয় … নয়তো'], 0, 'sowohl … als auch = দুটিই।'],
      ['Ich lerne sowohl Deutsch ___ Englisch.', ['als auch', 'oder', 'noch'], 0, 'sowohl … als auch।'],
      ['„Ich lerne sowohl Deutsch als auch Englisch.“ মানে কী?', ['আমি জার্মান শিখি, ইংরেজি নয়।', 'আমি জার্মান এবং ইংরেজি দুটিই শিখি।', 'আমি জার্মান বা ইংরেজি শিখি।'], 1, 'দুটিই।'],
      ['Sie spielt ___ Fußball als auch Tennis.', ['weder', 'sowohl', 'entweder'], 1, 'als auch-এর সঙ্গে sowohl।'],
      ['sowohl … als auch কাছাকাছি কোনটির মতো?', ['nicht nur … sondern auch', 'weder … noch', 'entweder … oder'], 0, 'দুটিই বোঝায়, nicht nur … sondern auch-এর মতো।'],
      ['„Er trinkt sowohl Tee als auch Kaffee.“ মানে কী?', ['সে চা ও কফি দুটিই পান করে।', 'সে চা বা কফি পান করে না।', 'সে হয় চা নয়তো কফি পান করে।'], 0, 'দুটিই।'],
    ],
  }),
  lesson({
    slug: 'konnektor-weder',
    part: 3,
    topic: 'Konnektoren',
    de: 'weder … noch',
    bn: 'Connector: weder … noch — না … না',
    summary: 'দুটির কোনোটিই নয়: weder … noch।',
    sections: [
      section(
        'weder … noch — না … না',
        examplesEn(['Ich trinke weder Kaffee noch Tee.', 'I drink neither coffee nor tea.', 'আমি কফিও পান করি না, চাও পান করি না।']),
        text('weder … noch-এ আলাদা nicht বা kein লাগে না, এটি নিজেই না-বাচক।'),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Er hat weder Zeit noch Geld.', 'He has neither time nor money.', 'তার সময়ও নেই, টাকাও নেই।'],
          ['Das Hotel war weder sauber noch ruhig.', 'The hotel was neither clean nor quiet.', 'হোটেলটি পরিষ্কারও ছিল না, শান্তও ছিল না।'],
          ['Ich habe heute weder gegessen noch getrunken.', 'Today I have neither eaten nor drunk anything.', 'আজ আমি কিছু খাইনি, পানও করিনি।'],
          ['Weder mein Vater noch meine Mutter spricht Englisch.', 'Neither my father nor my mother speaks English.', 'আমার বাবাও ইংরেজি বলেন না, মাও বলেন না।'],
        ),
      ),
    ],
    test: [
      ['„weder … noch“ মানে কী?', ['উভয়ই', 'না … না', 'একদিকে … অন্যদিকে'], 1, 'weder … noch = কোনোটিই নয়।'],
      ['Ich trinke weder Kaffee ___ Tee.', ['noch', 'oder', 'als auch'], 0, 'weder … noch।'],
      ['„Ich trinke weder Kaffee noch Tee.“ মানে কী?', ['আমি কফি ও চা দুটিই পান করি।', 'আমি কফিও পান করি না, চাও পান করি না।', 'আমি কফি বা চা পান করি।'], 1, 'না … না।'],
      ['weder … noch-এর সঙ্গে কি nicht লাগে?', ['হ্যাঁ, সবসময়', 'না, এটি নিজেই না-বাচক', 'শুধু অতীতে'], 1, 'weder … noch নিজেই না-বাচক।'],
      ['Er spricht ___ Deutsch noch Englisch.', ['sowohl', 'entweder', 'weder'], 2, 'noch-এর সঙ্গে weder।'],
      ['„Sie hat weder Zeit noch Geld.“ মানে কী?', ['তার সময়ও নেই, টাকাও নেই।', 'তার সময় ও টাকা দুটিই আছে।', 'তার হয় সময় নয়তো টাকা আছে।'], 0, 'না … না।'],
    ],
  }),
  lesson({
    slug: 'konnektor-nicht-nur',
    part: 4,
    topic: 'Konnektoren',
    de: 'nicht nur … sondern auch',
    bn: 'Connector: nicht nur … sondern auch — শুধু … নয়, বরং …ও',
    summary: 'একটির সঙ্গে আরেকটিও: nicht nur … sondern auch।',
    sections: [
      section(
        'nicht nur … sondern auch — শুধু … নয়, বরং …ও',
        examplesEn(['Sie spricht nicht nur Deutsch, sondern auch Englisch.', 'She speaks not only German but also English.', 'সে শুধু জার্মান নয়, ইংরেজিও বলে।']),
        text('sondern-এর আগে কমা বসে।'),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Die Wohnung ist nicht nur groß, sondern auch hell.', 'The flat is not only big but also bright.', 'বাসাটি শুধু বড় নয়, আলো-বাতাসেও ভরা।'],
          ['Ich habe nicht nur Brot gekauft, sondern auch Obst.', 'I bought not only bread but also fruit.', 'আমি শুধু রুটি নয়, ফলও কিনেছি।'],
          ['Er arbeitet nicht nur am Montag, sondern auch am Samstag.', 'He works not only on Monday but also on Saturday.', 'সে শুধু সোমবার নয়, শনিবারেও কাজ করে।'],
          ['Nicht nur die Kinder, sondern auch die Eltern hatten Spaß.', 'Not only the children but also the parents had fun.', 'শুধু বাচ্চারা নয়, বাবা-মায়েরাও মজা পেয়েছে।'],
        ),
      ),
    ],
    test: [
      ['„nicht nur … sondern auch“ মানে কী?', ['শুধু … নয়, বরং …ও', 'না … না', 'হয় … নয়তো'], 0, 'একটির সঙ্গে আরেকটিও।'],
      ['Sie spricht nicht nur Deutsch, ___ auch Englisch.', ['aber', 'sondern', 'oder'], 1, 'nicht nur … sondern auch।'],
      ['„Er ist nicht nur nett, sondern auch klug.“ মানে কী?', ['সে ভালো, কিন্তু বুদ্ধিমান নয়।', 'সে শুধু ভালো নয়, বুদ্ধিমানও।', 'সে ভালোও নয়, বুদ্ধিমানও নয়।'], 1, 'শুধু … নয়, …ও।'],
      ['sondern-এর আগে কী বসে?', ['কমা', 'পূর্ণচ্ছেদ', 'কিছু না'], 0, 'sondern-এর আগে কমা।'],
      ['Ich lerne nicht ___ Deutsch, sondern auch Französisch.', ['nur', 'noch', 'weder'], 0, 'nicht nur … sondern auch।'],
      ['এর কাছাকাছি অর্থ কোনটি?', ['weder … noch', 'sowohl … als auch', 'entweder … oder'], 1, 'দুটিই বোঝায়: sowohl … als auch।'],
    ],
  }),
  lesson({
    slug: 'konnektor-entweder',
    part: 5,
    topic: 'Konnektoren',
    de: 'entweder … oder',
    bn: 'Connector: entweder … oder — হয় … নয়তো',
    summary: 'দুটির একটি: entweder … oder।',
    sections: [
      section(
        'entweder … oder — হয় … নয়তো',
        examplesEn(['Entweder fahren wir mit dem Bus oder wir nehmen ein Taxi.', 'Either we go by bus or we take a taxi.', 'হয় আমরা বাসে যাব, নয়তো ট্যাক্সি নেব।']),
        text('entweder-এর পরে verb সঙ্গে সঙ্গে আসে (fahren wir); oder-এর পরে সাধারণ word order (wir nehmen)।'),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Ich trinke entweder Tee oder Wasser.', 'I drink either tea or water.', 'আমি হয় চা খাই, নয়তো পানি।'],
          ['Wir können entweder heute oder morgen einkaufen gehen.', 'We can go shopping either today or tomorrow.', 'আমরা হয় আজ, নয়তো কাল বাজারে যেতে পারি।'],
          ['Entweder kommst du mit oder du bleibst zu Hause.', 'Either you come along or you stay at home.', 'হয় তুমি সঙ্গে আসবে, নয়তো বাসায় থাকবে।'],
          ['Entweder ruft er mich an oder er schreibt mir eine E-Mail.', 'Either he calls me or he writes me an email.', 'হয় সে আমাকে ফোন করবে, নয়তো একটি ইমেইল লিখবে।'],
        ),
      ),
    ],
    test: [
      ['„entweder … oder“ মানে কী?', ['হয় … নয়তো', 'উভয়ই', 'না … না'], 0, 'দুটির একটি।'],
      ['Entweder ___ wir mit dem Bus oder wir nehmen ein Taxi.', ['fahren', 'wir fahren', 'fährt'], 0, 'entweder-এর পরে verb আগে: fahren wir।'],
      ['Entweder fahren wir mit dem Bus ___ wir nehmen ein Taxi.', ['noch', 'oder', 'als auch'], 1, 'entweder … oder।'],
      ['oder-এর পরে word order কেমন?', ['সাধারণ: subject + verb', 'verb শেষে', 'verb প্রথমে'], 0, 'oder-এর পরে সাধারণ word order: wir nehmen।'],
      ['„Entweder lerne ich heute oder morgen.“ মানে কী?', ['আমি আজ এবং কাল পড়ব।', 'হয় আজ নয়তো কাল আমি পড়ব।', 'আমি আজও পড়ব না, কালও না।'], 1, 'হয় … নয়তো।'],
      ['কোন বাক্যটি সঠিক?', ['Entweder wir kommen heute oder morgen.', 'Entweder kommen wir heute oder morgen.', 'Entweder heute kommen wir oder morgen.'], 1, 'entweder-এর পরে verb আগে।'],
    ],
  }),

  // Topic 10: Complex sentence patterns
  lesson({
    slug: 'satzmuster-je-desto',
    part: 1,
    topic: 'Satzmuster',
    de: 'je … desto',
    bn: 'Sentence pattern: je … desto — যত … তত',
    summary: 'দুটি বিষয় একসঙ্গে বাড়ে বা কমে: Je mehr …, desto besser …',
    intro: [text('Topic 10-এ আমরা চারটি গুরুত্বপূর্ণ pattern শিখব: je … desto, zwar … aber, so … dass এবং als ob।')],
    sections: [
      section(
        'je … desto — যত … তত',
        text('দুটি বিষয় একসঙ্গে বাড়ে বা কমে বোঝাতে ব্যবহার হয়।'),
        examplesEn(['Je mehr ich übe, desto besser spreche ich Deutsch.', 'The more I practise, the better I speak German.', 'আমি যত বেশি অনুশীলন করি, তত ভালো জার্মান বলি।']),
        text('Structure: Je + comparative + subject + verb (শেষে), desto + comparative + verb + subject'),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Je älter er wird, desto ruhiger wird er.', 'The older he gets, the calmer he becomes.', 'সে যত বড় হচ্ছে, তত শান্ত হচ্ছে।'],
          ['Je früher wir losfahren, desto schneller sind wir da.', 'The earlier we leave, the sooner we are there.', 'আমরা যত আগে রওনা দেব, তত তাড়াতাড়ি পৌঁছাব।'],
          ['Je mehr Wörter du lernst, desto leichter wird das Lesen.', 'The more words you learn, the easier reading becomes.', 'তুমি যত বেশি শব্দ শিখবে, পড়া তত সহজ হবে।'],
          ['Je länger ich in Deutschland wohne, desto besser gefällt es mir.', 'The longer I live in Germany, the more I like it.', 'আমি যত বেশি দিন জার্মানিতে থাকছি, তত বেশি ভালো লাগছে।'],
        ),
      ),
    ],
    test: [
      ['„je … desto“ মানে কী?', ['যত … তত', 'এত … যে', 'যেন'], 0, 'je … desto = যত … তত।'],
      ['Je mehr ich übe, ___ besser spreche ich.', ['desto', 'als', 'so'], 0, 'je … desto।'],
      ['Je mehr ich ___, desto besser spreche ich.', ['übe', 'üben', 'übt'], 0, 'je-অংশে verb শেষে: ich übe।'],
      ['…, desto besser ___ ich Deutsch.', ['spreche', 'ich spreche', 'sprechen'], 0, 'desto + comparative-এর পরে verb আগে: spreche ich।'],
      ['je ও desto-এর পরে কোন রূপের adjective আসে?', ['comparative (mehr, besser)', 'superlative', 'মূল রূপ'], 0, 'দুই অংশেই comparative।'],
      ['„Je früher du kommst, desto mehr Zeit haben wir.“ মানে কী?', ['তুমি তাড়াতাড়ি এলে আমাদের সময় কম থাকবে।', 'তুমি যত তাড়াতাড়ি আসবে, আমাদের তত বেশি সময় থাকবে।', 'তুমি দেরিতে এলে আমাদের সময় বেশি থাকবে।'], 1, 'যত … তত।'],
    ],
  }),
  lesson({
    slug: 'satzmuster-zwar-aber',
    part: 2,
    topic: 'Satzmuster',
    de: 'zwar … aber',
    bn: 'Sentence pattern: zwar … aber — ঠিকই … কিন্তু',
    summary: 'একটি কথা মেনে নিয়ে বিপরীত কিছু বলা: zwar … aber।',
    sections: [
      section(
        'zwar … aber — ঠিকই … কিন্তু',
        examplesEn(['Die Arbeit ist zwar schwer, aber interessant.', 'The job is indeed difficult, but interesting.', 'কাজটি কঠিন ঠিকই, কিন্তু আকর্ষণীয়।']),
        text('প্রথমে একটি কথা মেনে নেওয়া হয় (zwar), তারপর তার বিপরীত দিক বলা হয় (aber)।'),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Das Hotel war zwar teuer, aber sehr schön.', 'The hotel was indeed expensive, but very nice.', 'হোটেলটি দামি ছিল ঠিকই, কিন্তু খুব সুন্দর।'],
          ['Ich habe zwar wenig Zeit, aber ich helfe dir gern.', 'I do have little time, but I am happy to help you.', 'আমার সময় কম ঠিকই, কিন্তু আমি খুশি মনে তোমাকে সাহায্য করব।'],
          ['Er spricht zwar gut Deutsch, aber er macht beim Schreiben noch viele Fehler.', 'He does speak German well, but he still makes many mistakes when writing.', 'সে ভালো জার্মান বলে ঠিকই, কিন্তু লেখার সময় এখনো অনেক ভুল করে।'],
        ),
        text('zwar বাক্যের শুরুতে এলে তার পরেই verb আসে:'),
        examplesEn(
          ['Zwar regnet es, aber wir gehen trotzdem spazieren.', 'It is raining, but we are going for a walk anyway.', 'বৃষ্টি হচ্ছে ঠিকই, কিন্তু তবুও আমরা হাঁটতে যাচ্ছি।'],
        ),
      ),
    ],
    test: [
      ['„zwar … aber“ মানে কী?', ['ঠিকই … কিন্তু', 'যত … তত', 'না … না'], 0, 'zwar … aber = ঠিকই … কিন্তু।'],
      ['Die Arbeit ist zwar schwer, ___ interessant.', ['aber', 'oder', 'denn'], 0, 'zwar … aber।'],
      ['„Die Wohnung ist zwar klein, aber billig.“ মানে কী?', ['ফ্ল্যাটটি ছোট ঠিকই, কিন্তু সস্তা।', 'ফ্ল্যাটটি ছোট এবং দামি।', 'ফ্ল্যাটটি বড় কিন্তু সস্তা।'], 0, 'ঠিকই … কিন্তু।'],
      ['zwar দিয়ে কী করা হয়?', ['একটি কথা মেনে নেওয়া', 'কারণ বলা', 'প্রশ্ন করা'], 0, 'প্রথমে একটি কথা মেনে নেওয়া হয়, তারপর aber দিয়ে বিপরীত দিক।'],
      ['Das Auto ist ___ alt, aber es fährt gut.', ['zwar', 'je', 'so'], 0, 'aber-এর সঙ্গে zwar।'],
      ['zwar … aber-এ দ্বিতীয় অংশ কী বলে?', ['একই কথা আবার', 'বিপরীত দিক', 'সময়'], 1, 'aber দিয়ে বিপরীত দিক বলা হয়।'],
    ],
  }),
  lesson({
    slug: 'satzmuster-so-dass',
    part: 3,
    topic: 'Satzmuster',
    de: 'so … dass',
    bn: 'Sentence pattern: so … dass — এত … যে',
    summary: 'কোনো কিছুর মাত্রা ও তার ফল: so müde, dass …',
    sections: [
      section(
        'so … dass — এত … যে',
        examplesEn(['Ich bin so müde, dass ich nicht lernen kann.', 'I am so tired that I cannot study.', 'আমি এত ক্লান্ত যে পড়তে পারছি না।']),
        text('এখানে dass-এর clause-এ kann শেষে গেছে।'),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Es war so kalt, dass wir zu Hause geblieben sind.', 'It was so cold that we stayed at home.', 'এত ঠান্ডা ছিল যে আমরা বাসায় থেকে গেলাম।'],
          ['Er spricht so schnell, dass ich ihn nicht verstehe.', 'He speaks so fast that I do not understand him.', 'সে এত দ্রুত কথা বলে যে আমি তাকে বুঝি না।'],
          ['Der Film war so lustig, dass wir viel gelacht haben.', 'The film was so funny that we laughed a lot.', 'সিনেমাটি এত মজার ছিল যে আমরা অনেক হেসেছি।'],
          ['Ich hatte so viel Arbeit, dass ich keine Pause machen konnte.', 'I had so much work that I could not take a break.', 'আমার এত কাজ ছিল যে আমি কোনো বিরতি নিতে পারিনি।'],
        ),
        text('so আর dass একসঙ্গে লিখলে sodass, অর্থ „ফলে / তাই“:'),
        examplesEn(
          ['Der Bus kam zu spät, sodass ich den Zug verpasst habe.', 'The bus came too late, so I missed the train.', 'বাস দেরিতে এল, ফলে আমি ট্রেন মিস করলাম।'],
        ),
      ),
    ],
    test: [
      ['„so … dass“ মানে কী?', ['এত … যে', 'যত … তত', 'যেন'], 0, 'so … dass = এত … যে।'],
      ['Ich bin so müde, ___ ich nicht lernen kann.', ['dass', 'als', 'desto'], 0, 'so … dass।'],
      ['Ich bin so müde, dass ich nicht lernen ___.', ['kann', 'können', 'kannst'], 0, 'dass-অংশে verb শেষে: ich … kann।'],
      ['„Es ist so kalt, dass wir zu Hause bleiben.“ মানে কী?', ['এত ঠান্ডা যে আমরা বাসায় থাকছি।', 'ঠান্ডা হলেও আমরা বাইরে যাই।', 'যত ঠান্ডা তত ভালো।'], 0, 'এত … যে।'],
      ['কোন বাক্যটি সঠিক?', ['…, dass ich kann nicht lernen.', '…, dass ich nicht lernen kann.', '…, dass kann ich nicht lernen.'], 1, 'dass-অংশে conjugated verb একদম শেষে।'],
      ['so … dass দিয়ে কী বোঝায়?', ['মাত্রা ও তার ফল', 'দুটির একটি', 'কল্পনা'], 0, 'কোনো কিছু এতটা যে তার একটি ফল হয়।'],
    ],
  }),
  lesson({
    slug: 'satzmuster-als-ob',
    part: 4,
    topic: 'Satzmuster',
    de: 'als ob',
    bn: 'Sentence pattern: als ob — যেন',
    summary: 'বাস্তবে নয়, কিন্তু মনে হয় যেন: als ob + Konjunktiv II।',
    sections: [
      section(
        'als ob — যেন / মনে হয় যেন',
        examplesEn(['Er tut so, als ob er alles wüsste.', 'He acts as if he knew everything.', 'সে এমন আচরণ করে, যেন সে সবকিছু জানে।']),
        text('এখানে wüsste হলো wissen-এর Konjunktiv II রূপ। als ob-এর অংশে verb শেষে যায়।'),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Sie sieht aus, als ob sie krank wäre.', 'She looks as if she were ill.', 'তাকে দেখে মনে হচ্ছে যেন সে অসুস্থ।'],
          ['Er spricht, als ob er Deutscher wäre.', 'He speaks as if he were German.', 'সে এমনভাবে কথা বলে, যেন সে জার্মান।'],
          ['Es sieht aus, als ob es gleich regnen würde.', 'It looks as if it is going to rain soon.', 'দেখে মনে হচ্ছে যেন এখনই বৃষ্টি নামবে।'],
          ['Du tust so, als ob du mich nicht kennen würdest.', 'You act as if you did not know me.', 'তুমি এমন ভাব করছ, যেন আমাকে চেনো না।'],
        ),
      ),
    ],
    test: [
      ['„als ob“ মানে কী?', ['যেন', 'যদিও', 'যত'], 0, 'als ob = যেন।'],
      ['Er tut so, ___ er alles wüsste.', ['als ob', 'obwohl', 'damit'], 0, 'যেন = als ob।'],
      ['„wüsste“ কোন verb-এর Konjunktiv II?', ['werden', 'wissen', 'wohnen'], 1, 'wissen → wüsste।'],
      ['als ob-এর অংশে verb কোথায় বসে?', ['শেষে', 'শুরুতে', 'দ্বিতীয় স্থানে'], 0, 'als ob-এর অংশে verb শেষে।'],
      ['„Er tut so, als ob er alles wüsste.“ মানে কী?', ['সে সবকিছু জানে।', 'সে এমন আচরণ করে, যেন সে সবকিছু জানে।', 'সে কিছুই জানতে চায় না।'], 1, 'যেন (বাস্তবে হয়তো নয়)।'],
      ['als ob-এর সঙ্গে প্রায়ই কোন রূপ ব্যবহার হয়?', ['Konjunktiv II', 'Imperativ', 'Futur'], 0, 'বাস্তব নয় বোঝাতে Konjunktiv II: wüsste, wäre, hätte।'],
    ],
  }),

  // Topic 11: Advanced noun and verb patterns
  lesson({
    slug: 'n-deklination',
    part: 1,
    topic: 'Nomen',
    de: 'Die n-Deklination',
    bn: 'N-declension: কিছু masculine noun-এর ending বদলায়',
    summary: 'der Student → den Studenten, der Junge → dem Jungen।',
    intro: [text('Topic 11-এ মূলত তিনটি জিনিস শিখবে: N-declension, noun-verb combinations এবং compound nouns।')],
    sections: [
      section(
        'N-declension',
        text('কিছু masculine noun Akkusativ ও Dativ-এর মতো নির্দিষ্ট case-এ -n বা -en নেয়।'),
        examplesEn(['Der Student lernt Deutsch.', 'The student learns German.', 'ছাত্রটি জার্মান শেখে।']),
        text('এখানে der Student হলো Nominativ।'),
        examplesEn(['Ich sehe den Studenten.', 'I see the student.', 'আমি ছাত্রটিকে দেখি।']),
        text('এখানে den Studenten হলো Akkusativ।'),
        examplesEn(['Ich helfe dem Jungen.', 'I help the boy.', 'আমি ছেলেটিকে সাহায্য করি।']),
        text('der Junge → dem Jungen।'),
        text('এ ধরনের noun-এর কয়েকটি উদাহরণ: der Student, der Junge, der Kollege, der Mensch।'),
      ),
      section(
        'আরও উদাহরণ',
        text('আরও কয়েকটি n-Deklination noun: der Nachbar, der Patient, der Herr।'),
        examplesEn(
          ['Ich frage den Kollegen.', 'I ask the colleague.', 'আমি সহকর্মীকে জিজ্ঞেস করি।'],
          ['Wir sprechen mit dem Nachbarn.', 'We are talking to the neighbour.', 'আমরা প্রতিবেশীর সঙ্গে কথা বলছি।'],
          ['Der Arzt hilft dem Patienten.', 'The doctor helps the patient.', 'ডাক্তার রোগীকে সাহায্য করেন।'],
          ['Kennst du den Herrn dort?', 'Do you know the gentleman over there?', 'তুমি কি ওখানকার ভদ্রলোককে চেনো?'],
        ),
      ),
    ],
    test: [
      ['Ich sehe den ___. (der Student)', ['Student', 'Studenten', 'Students'], 1, 'N-declension: Akkusativ-এ -en: den Studenten।'],
      ['Ich helfe dem ___. (der Junge)', ['Junge', 'Jungen', 'Junges'], 1, 'Dativ-এ -n: dem Jungen।'],
      ['Der ___ lernt Deutsch. (Nominativ)', ['Student', 'Studenten', 'Studente'], 0, 'Nominativ-এ ending বদলায় না: der Student।'],
      ['N-declension কোন noun-এ হয়?', ['কিছু masculine noun-এ', 'সব feminine noun-এ', 'সব neuter noun-এ'], 0, 'কিছু masculine noun।'],
      ['কোনটি N-declension noun?', ['der Tisch', 'der Kollege', 'der Hund'], 1, 'der Kollege → den Kollegen।'],
      ['Ich spreche mit dem ___. (der Mensch)', ['Mensch', 'Menschen', 'Menschs'], 1, 'Dativ: dem Menschen।'],
    ],
  }),
  lesson({
    slug: 'nomen-verb-verbindungen',
    part: 2,
    topic: 'Nomen',
    de: 'Nomen-Verb-Verbindungen',
    bn: 'Noun-verb combinations: noun + verb',
    summary: 'eine Entscheidung treffen, einen Termin vereinbaren, eine Frage stellen …',
    sections: [
      section(
        'Noun + verb',
        text('কিছু expression-এ noun ও verb একসঙ্গে ব্যবহার হয়।'),
        table(
          ['German', 'বাংলা অর্থ'],
          ['eine Entscheidung treffen', 'সিদ্ধান্ত নেওয়া'],
          ['einen Termin vereinbaren', 'অ্যাপয়েন্টমেন্ট ঠিক করা'],
          ['Hilfe leisten', 'সাহায্য প্রদান করা'],
          ['eine Frage stellen', 'প্রশ্ন করা'],
          ['einen Antrag stellen', 'আবেদন করা'],
        ),
        examplesEn(['Ich muss eine Entscheidung treffen.', 'I have to make a decision.', 'আমাকে একটি সিদ্ধান্ত নিতে হবে।']),
        text('এখানে eine Entscheidung machen না বলে সাধারণত eine Entscheidung treffen বলা হয়।'),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Ich möchte einen Termin beim Arzt vereinbaren.', 'I would like to make an appointment with the doctor.', 'আমি ডাক্তারের কাছে একটি অ্যাপয়েন্টমেন্ট ঠিক করতে চাই।'],
          ['Darf ich eine Frage stellen?', 'May I ask a question?', 'আমি কি একটি প্রশ্ন করতে পারি?'],
          ['Er hat einen Antrag auf ein Visum gestellt.', 'He has applied for a visa.', 'সে ভিসার জন্য আবেদন করেছে।'],
          ['Die Feuerwehr leistet schnell Hilfe.', 'The fire brigade provides help quickly.', 'ফায়ার সার্ভিস দ্রুত সাহায্য করে।'],
          ['Am Ende haben wir eine gute Entscheidung getroffen.', 'In the end we made a good decision.', 'শেষ পর্যন্ত আমরা একটি ভালো সিদ্ধান্ত নিয়েছি।'],
        ),
      ),
    ],
    test: [
      ['eine Entscheidung ___ (সিদ্ধান্ত নেওয়া)', ['machen', 'treffen', 'stellen'], 1, 'eine Entscheidung treffen।'],
      ['eine Frage ___ (প্রশ্ন করা)', ['stellen', 'treffen', 'leisten'], 0, 'eine Frage stellen।'],
      ['einen Termin ___ (অ্যাপয়েন্টমেন্ট ঠিক করা)', ['leisten', 'stellen', 'vereinbaren'], 2, 'einen Termin vereinbaren।'],
      ['„einen Antrag stellen“ মানে কী?', ['আবেদন করা', 'প্রশ্ন করা', 'সাহায্য করা'], 0, 'einen Antrag stellen = আবেদন করা।'],
      ['Hilfe ___ (সাহায্য প্রদান করা)', ['treffen', 'leisten', 'vereinbaren'], 1, 'Hilfe leisten।'],
      ['„Ich muss eine Entscheidung treffen.“ মানে কী?', ['আমাকে একটি সিদ্ধান্ত নিতে হবে।', 'আমি কাউকে দেখতে যাচ্ছি।', 'আমাকে একটি প্রশ্ন করতে হবে।'], 0, 'eine Entscheidung treffen = সিদ্ধান্ত নেওয়া।'],
    ],
  }),
  lesson({
    slug: 'komposita',
    part: 3,
    topic: 'Nomen',
    de: 'Komposita',
    bn: 'Compound nouns: একাধিক শব্দ মিলে একটি noun',
    summary: 'Arbeit + Zimmer → das Arbeitszimmer; gender আসে শেষের noun থেকে।',
    sections: [
      section(
        'Compound nouns',
        text('German-এ দুই বা তার বেশি শব্দ মিলে একটি নতুন noun তৈরি হতে পারে।'),
        list('Arbeit + Zimmer → Arbeitszimmer — কাজের ঘর', 'Haus + Tür → Haustür — বাড়ির দরজা', 'Deutsch + Kurs → Deutschkurs — জার্মান ভাষার কোর্স', 'Führerschein — ড্রাইভিং লাইসেন্স'),
        text('মনে রাখো: Compound noun-এর gender সাধারণত শেষের noun থেকে নির্ধারিত হয়।'),
        text('das Arbeitszimmer-এ শেষ শব্দ Zimmer, তাই das।'),
      ),
      section(
        'আরও উদাহরণ',
        text('অনেক সময় দুই শব্দের মাঝে -s- বসে: Arbeit + s + Zimmer → Arbeitszimmer।'),
        examplesEn(
          ['Mein Arbeitszimmer ist klein, aber hell.', 'My study is small but bright.', 'আমার কাজের ঘরটি ছোট, কিন্তু আলো-বাতাসে ভরা।'],
          ['Die Haustür ist offen.', 'The front door is open.', 'বাড়ির দরজা খোলা।'],
          ['Ich besuche einen Deutschkurs.', 'I am attending a German course.', 'আমি একটি জার্মান কোর্সে যাই।'],
          ['Ich habe meinen Führerschein letztes Jahr gemacht.', 'I got my driving licence last year.', 'আমি গত বছর ড্রাইভিং লাইসেন্স পেয়েছি।'],
          ['Der Kindergarten ist neben dem Bahnhof.', 'The kindergarten is next to the station.', 'কিন্ডারগার্টেনটি স্টেশনের পাশে।'],
        ),
        text('Kind + Garten → der Kindergarten, Bahn + Hof → der Bahnhof: gender শেষের noun থেকে (der Garten, der Hof)।'),
      ),
    ],
    test: [
      ['Compound noun-এর gender কোথা থেকে আসে?', ['প্রথম noun থেকে', 'শেষের noun থেকে', 'সবসময় das'], 1, 'শেষের noun থেকে।'],
      ['___ Arbeitszimmer (das Zimmer)', ['der', 'die', 'das'], 2, 'শেষ শব্দ Zimmer → das Arbeitszimmer।'],
      ['___ Haustür (die Tür)', ['die', 'das', 'der'], 0, 'শেষ শব্দ Tür → die Haustür।'],
      ['___ Deutschkurs (der Kurs)', ['das', 'der', 'die'], 1, 'শেষ শব্দ Kurs → der Deutschkurs।'],
      ['Haus + Tür → ?', ['Türhaus', 'Haustür', 'Haus-Tür'], 1, 'Haus + Tür → Haustür (বাড়ির দরজা)।'],
      ['„Führerschein“ মানে কী?', ['ড্রাইভিং লাইসেন্স', 'বাড়ির দরজা', 'কাজের ঘর'], 0, 'Führerschein = ড্রাইভিং লাইসেন্স।'],
    ],
  }),

  // Topic 12: Future and reported information
  lesson({
    slug: 'futur',
    part: 1,
    topic: 'Zeitformen',
    de: 'Futur I: werden + Infinitiv',
    bn: 'Future tense: werden + Infinitiv',
    summary: 'ভবিষ্যৎ: Ich werde morgen Deutsch lernen. Present tense-ও খুব স্বাভাবিক।',
    intro: [text('Topic 12-এ ভবিষ্যতের পরিকল্পনা, অনুমান এবং অন্যের বলা তথ্য প্রকাশ করা শিখবে।')],
    sections: [
      section(
        'werden + Infinitiv',
        examplesEn(['Ich werde morgen Deutsch lernen.', 'I will study German tomorrow.', 'আমি আগামীকাল জার্মান পড়ব।']),
        text('Structure: Subject + werden-এর সঠিক রূপ + অন্যান্য শব্দ + infinitive'),
        table(['Subject', 'werden'], ['ich', 'werde'], ['du', 'wirst'], ['er/sie/es', 'wird'], ['wir', 'werden'], ['ihr', 'werdet'], ['sie/Sie', 'werden']),
        examplesEn(['Wir werden nächstes Jahr nach Deutschland reisen.', 'We will travel to Germany next year.', 'আমরা আগামী বছর জার্মানিতে ভ্রমণ করব।']),
      ),
      section(
        'Present tense দিয়েও ভবিষ্যৎ',
        text('ভবিষ্যতের পরিকল্পনা বোঝাতে German-এ present tense-ও খুব স্বাভাবিক:'),
        examplesEn(['Morgen fahre ich nach Dhaka.', 'Tomorrow I am going to Dhaka.', 'আমি আগামীকাল ঢাকায় যাচ্ছি।']),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Du wirst die Prüfung bestimmt bestehen.', 'You will surely pass the exam.', 'তুমি নিশ্চয়ই পরীক্ষায় পাস করবে।'],
          ['Nächste Woche werde ich einen neuen Kurs beginnen.', 'Next week I will start a new course.', 'আগামী সপ্তাহে আমি একটি নতুন কোর্স শুরু করব।'],
          ['Wir werden uns bald wiedersehen.', 'We will see each other again soon.', 'আমাদের শিগগিরই আবার দেখা হবে।'],
        ),
        text('werden + wohl দিয়ে বর্তমানের অনুমানও বলা যায়:'),
        examplesEn(
          ['Er wird wohl krank sein.', 'He is probably ill.', 'সে সম্ভবত অসুস্থ।'],
        ),
      ),
    ],
    test: [
      ['Ich ___ morgen Deutsch lernen.', ['werde', 'wird', 'werden'], 0, 'ich → werde।'],
      ['Du ___ morgen arbeiten.', ['werdet', 'wirst', 'wird'], 1, 'du → wirst।'],
      ['Er ___ nach Berlin fahren.', ['werde', 'werden', 'wird'], 2, 'er → wird।'],
      ['Futur-এ মূল verb কোথায় ও কোন রূপে?', ['শেষে, infinitive', 'দ্বিতীয় স্থানে, conjugated', 'শেষে, Partizip II'], 0, 'werden + … + infinitive (শেষে)।'],
      ['„Morgen fahre ich nach Dhaka.“ কোন সময় বোঝায়?', ['অতীত', 'ভবিষ্যৎ (present tense দিয়ে)', 'এই মুহূর্তে'], 1, 'present tense দিয়েও ভবিষ্যতের পরিকল্পনা বোঝায়।'],
      ['Wir ___ nächstes Jahr reisen.', ['werdet', 'wird', 'werden'], 2, 'wir → werden।'],
    ],
  }),
  lesson({
    slug: 'sollen-bericht',
    part: 2,
    topic: 'Modalverben',
    de: 'sollen: Gehörtes wiedergeben',
    bn: 'sollen — অন্যের বলা তথ্য বা দাবি',
    summary: 'শোনা কথা জানাতে sollen: Er soll sehr gut Deutsch sprechen.',
    sections: [
      section(
        'sollen — শোনা যায়',
        examplesEn(['Er soll sehr gut Deutsch sprechen.', 'He is said to speak German very well.', 'শোনা যায়, সে খুব ভালো জার্মান বলে।']),
        text('এখানে soll শুধু „উচিত“ বোঝাচ্ছে না; অন্যের কাছ থেকে পাওয়া তথ্যও বোঝাতে পারে।'),
        examplesEn(['Das Restaurant soll sehr gut sein.', 'The restaurant is said to be very good.', 'শোনা যায়, রেস্টুরেন্টটি খুব ভালো।']),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Morgen soll es schneien.', 'It is supposed to snow tomorrow.', 'শোনা যাচ্ছে, আগামীকাল তুষারপাত হবে।'],
          ['Der neue Film soll sehr spannend sein.', 'The new film is said to be very exciting.', 'শোনা যায়, নতুন সিনেমাটি খুব রোমাঞ্চকর।'],
          ['Die Preise sollen nächstes Jahr steigen.', 'Prices are supposed to rise next year.', 'শোনা যাচ্ছে, আগামী বছর দাম বাড়বে।'],
        ),
        text('অতীতের শোনা কথা: sollen + Partizip II + haben/sein:'),
        examplesEn(
          ['Sie soll eine neue Arbeit gefunden haben.', 'She is said to have found a new job.', 'শোনা যায়, সে একটি নতুন চাকরি পেয়েছে।'],
        ),
      ),
    ],
    test: [
      ['„Er soll sehr gut Deutsch sprechen.“ মানে কী?', ['তার ভালো জার্মান বলা উচিত।', 'শোনা যায়, সে খুব ভালো জার্মান বলে।', 'সে ভালো জার্মান বলতে চায়।'], 1, 'এখানে sollen = অন্যের কাছ থেকে শোনা তথ্য।'],
      ['sollen দিয়ে আর কী বোঝানো যায়?', ['অন্যের কাছ থেকে শোনা তথ্য', 'অতীতেরও আগের অতীত', 'তুলনা'], 0, 'soll = উচিত, আবার শোনা তথ্যও।'],
      ['Das Restaurant ___ sehr gut sein. (শোনা যায়)', ['soll', 'will', 'muss'], 0, 'শোনা তথ্য: soll।'],
      ['„Die Wohnung soll billig sein.“ মানে কী?', ['শোনা যায়, ফ্ল্যাটটি সস্তা।', 'ফ্ল্যাটটি সস্তা হতে চায়।', 'ফ্ল্যাটটি অবশ্যই সস্তা।'], 0, 'sollen = শোনা কথা।'],
      ['Sie ___ sehr reich sein. (শোনা যায়, sie = সে)', ['sollen', 'soll', 'sollst'], 1, 'sie (একবচন) → soll।'],
      ['এই অর্থে sollen-এর পরে মূল verb কোন রূপে?', ['Partizip II', 'infinitive, শেষে', 'conjugated'], 1, 'soll + … + infinitive (শেষে)।'],
    ],
  }),
  lesson({
    slug: 'wollen-behauptung',
    part: 3,
    topic: 'Modalverben',
    de: 'wollen: Behauptungen',
    bn: 'wollen — কারও দাবি অনুযায়ী',
    summary: 'কেউ নিজে দাবি করে: Er will den Chef gesehen haben.',
    sections: [
      section(
        'wollen — দাবি করা',
        examplesEn(['Er will den Chef gesehen haben.', 'He claims to have seen the boss.', 'সে দাবি করছে যে সে বসকে দেখেছে।']),
        text('এই structure একটু কঠিন, তাই প্রথমে sollen দিয়ে অন্যের কাছ থেকে শোনা তথ্য বোঝার অনুশীলন করো। পরে wollen + Partizip II + haben/sein শিখবে।'),
        list('sollen: অন্য কেউ বলছে (শোনা যায়)', 'wollen: ব্যক্তি নিজেই দাবি করছে'),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Sie will das Buch in einer Nacht gelesen haben.', 'She claims to have read the book in one night.', 'সে দাবি করে যে সে বইটি এক রাতেই পড়ে ফেলেছে।'],
          ['Mein Sohn will seine Hausaufgaben schon gemacht haben.', 'My son claims to have done his homework already.', 'আমার ছেলে দাবি করছে যে সে বাড়ির কাজ আগেই করে ফেলেছে।'],
          ['Der Mann will nichts gesehen haben.', 'The man claims to have seen nothing.', 'লোকটি দাবি করছে যে সে কিছুই দেখেনি।'],
        ),
        text('sein নেয় এমন verb হলে haben-এর জায়গায় sein:'),
        examplesEn(
          ['Er will gestern zu Hause gewesen sein.', 'He claims to have been at home yesterday.', 'সে দাবি করছে যে গতকাল সে বাসায় ছিল।'],
        ),
      ),
    ],
    test: [
      ['„Er will den Chef gesehen haben.“ মানে কী?', ['সে বসকে দেখতে চায়।', 'সে দাবি করছে যে সে বসকে দেখেছে।', 'শোনা যায়, বস তাকে দেখেছে।'], 1, 'wollen + Partizip II + haben = দাবি করা।'],
      ['দাবির অর্থে wollen-এর structure কোনটি?', ['wollen + Partizip II + haben/sein', 'wollen + zu + Infinitiv', 'werden + Infinitiv'], 0, 'wollen + Partizip II + haben/sein।'],
      ['sollen আর wollen (দাবি)-এর পার্থক্য কী?', ['sollen: অন্যরা বলে; wollen: সে নিজে দাবি করে', 'দুটির মানে একই', 'sollen: সে নিজে; wollen: অন্যরা'], 0, 'sollen = শোনা কথা; wollen = নিজের দাবি।'],
      ['Er will alles ___ haben. (gewusst, দাবি)', ['wissen', 'gewusst', 'weiß'], 1, 'Partizip II: gewusst, তারপর haben।'],
      ['এই structure শেখার আগে কোনটি অনুশীলন করতে বলা হয়েছে?', ['sollen দিয়ে শোনা তথ্য', 'Passiv', 'Komposita'], 0, 'প্রথমে sollen দিয়ে অনুশীলন।'],
      ['Sie ___ das Geld nicht genommen haben. (সে দাবি করে)', ['will', 'soll', 'wird'], 0, 'নিজের দাবি: will।'],
    ],
  }),
  lesson({
    slug: 'vermutungen',
    part: 4,
    topic: 'Wortschatz',
    de: 'Vermutungen: wahrscheinlich, vielleicht, vermutlich',
    bn: 'অনুমান প্রকাশ করা',
    summary: 'সম্ভবত, হয়তো: wahrscheinlich, vielleicht, vermutlich।',
    sections: [
      section(
        'অনুমানের শব্দ',
        list('wahrscheinlich — সম্ভবত', 'vielleicht — হয়তো', 'vermutlich — অনুমান করা যায় / সম্ভবত'),
        examplesEn(['Wahrscheinlich wird es morgen regnen.', 'It will probably rain tomorrow.', 'সম্ভবত আগামীকাল বৃষ্টি হবে।'], ['Vielleicht komme ich später.', 'Maybe I will come later.', 'হয়তো আমি পরে আসব।']),
        text('এই শব্দ বাক্যের শুরুতে এলে পরেই verb আসে: Wahrscheinlich wird es …'),
      ),
      section(
        'আরও উদাহরণ',
        examplesEn(
          ['Vermutlich ist er schon zu Hause.', 'Presumably he is already at home.', 'সম্ভবত সে এর মধ্যেই বাসায় পৌঁছে গেছে।'],
          ['Sie ist wahrscheinlich krank.', 'She is probably ill.', 'সে সম্ভবত অসুস্থ।'],
          ['Der Bus kommt vielleicht zu spät.', 'The bus may be late.', 'বাসটি হয়তো দেরিতে আসবে।'],
          ['Vielleicht hat er unsere Nachricht nicht gelesen.', 'Maybe he has not read our message.', 'হয়তো সে আমাদের মেসেজটি পড়েনি।'],
        ),
        text('ich glaube, dass … দিয়েও অনুমান বলা যায় (dass-অংশে verb শেষে):'),
        examplesEn(
          ['Ich glaube, dass sie heute nicht kommt.', 'I think that she is not coming today.', 'আমার মনে হয়, সে আজ আসবে না।'],
        ),
      ),
    ],
    test: [
      ['„wahrscheinlich“ মানে কী?', ['সম্ভবত', 'কখনো না', 'অবশ্যই'], 0, 'wahrscheinlich = সম্ভবত।'],
      ['„vielleicht“ মানে কী?', ['সবসময়', 'হয়তো', 'কখনো না'], 1, 'vielleicht = হয়তো।'],
      ['Wahrscheinlich ___ es morgen regnen.', ['wird', 'es wird', 'werden'], 0, 'শুরুতে wahrscheinlich, তারপর verb: wird es।'],
      ['„vermutlich“ মানে কী?', ['অনুমান করা যায় / সম্ভবত', 'নিশ্চিতভাবে', 'গতকাল'], 0, 'vermutlich = সম্ভবত।'],
      ['„Vielleicht komme ich später.“ মানে কী?', ['আমি অবশ্যই পরে আসব।', 'হয়তো আমি পরে আসব।', 'আমি আগে এসেছিলাম।'], 1, 'vielleicht = হয়তো।'],
      ['কোন বাক্যটি সঠিক?', ['Vielleicht ich komme morgen.', 'Vielleicht komme ich morgen.', 'Vielleicht morgen ich komme.'], 1, 'শুরুতে vielleicht, তারপর verb।'],
    ],
  }),
];
