import type { Article, TextItem } from '../../src/content/types';

/**
 * A2 model texts: twelve short reading passages with a cartoon banner each.
 * Like the A1 models, each passage is kept sentence by sentence with its
 * Bangla and English meaning. Each also carries a few key words, Bangla only,
 * that the learner can bookmark.
 */
type Sentence = [de: string, bn: string, en: string];
type Word = [de: string, bn: string, article?: Article];
/** A question on the text: the question, three choices and the right one's position. */
type Ask = [prompt: string, options: [string, string, string], answer: number];

function model(n: number, title: { de: string; bn: string; en: string }, heading: string, sentences: Sentence[], words: Word[], asks: Ask[]): TextItem {
  const num = String(n).padStart(2, '0');
  const id = `a2-model-${num}`;
  return {
    id,
    level: 'A2',
    module: 'models',
    topic: 'Lesetext',
    tag: heading,
    title,
    image: `images/a2-model-${num}.jpg`,
    imageAspect: 2,
    lines: sentences.map(([de, bn, en]) => ({ de, bn, en })),
    words: words.map(([de, bn, article], i) => ({ id: `${id}-w${i + 1}`, de, bn, ...(article ? { article } : {}) })),
    questions: asks.map(([prompt, options, answer], i) => ({ id: `${id}-c${i + 1}`, type: 'mcq', prompt, promptBn: 'লেখাটি অনুযায়ী সঠিক উত্তর বেছে নিন', options, answer })),
  };
}

export const a2Models: TextItem[] = [
  model(1, { de: 'Ein besonderes Wochenende', bn: 'একটি বিশেষ সপ্তাহান্ত', en: 'A special weekend' }, 'Familie und Beziehungen', [
    ['Letztes Wochenende habe ich meine Schwester und ihre Familie besucht.', 'গত সপ্তাহান্তে আমি আমার বোন ও তার পরিবারের সঙ্গে দেখা করতে গিয়েছিলাম।', 'Last weekend, I visited my sister and her family.'],
    ['Wir haben zusammen gekocht und danach einen langen Spaziergang gemacht.', 'আমরা একসঙ্গে রান্না করেছি এবং তারপর দীর্ঘ সময় হাঁটতে বের হয়েছি।', 'We cooked together and then went for a long walk.'],
    ['Meine Nichte hat mir viele Fragen über die Schule gestellt.', 'আমার ভাগনি আমাকে স্কুল সম্পর্কে অনেক প্রশ্ন করেছে।', 'My niece asked me many questions about school.'],
    ['Obwohl das Wetter nicht besonders warm war, haben wir viel Zeit draußen verbracht.', 'আবহাওয়া খুব একটা উষ্ণ না হলেও আমরা বাইরে অনেক সময় কাটিয়েছি।', 'Although the weather was not particularly warm, we spent a lot of time outside.'],
    ['Am Abend sind wir müde, aber glücklich nach Hause gefahren.', 'সন্ধ্যায় ক্লান্ত কিন্তু আনন্দিত মনে বাড়ি ফিরেছি।', 'In the evening, we went home tired but happy.'],
    ['Ich möchte sie bald wieder besuchen.', 'আমি শিগগিরই আবার তাদের দেখতে যেতে চাই।', 'I would like to visit them again soon.'],
  ], [
    ['besuchen', 'দেখা করতে যাওয়া'],
    ['Spaziergang', 'হাঁটাহাঁটি', 'der'],
    ['obwohl', 'যদিও'],
    ['verbringen', 'সময় কাটানো'],
  ], [
    ['Wen hat die Person besucht?', ['Ihre Schwester und ihre Familie', 'Ihren Chef', 'Ihre Lehrerin'], 0],
    ['Wie war das Wetter?', ['Sehr heiß', 'Nicht besonders warm', 'Es hat geschneit'], 1],
  ]),
  model(2, { de: 'Meine neue Wohnung', bn: 'আমার নতুন বাসা', en: 'My new apartment' }, 'Wohnen und Alltag', [
    ['Seit zwei Monaten wohne ich in einer neuen Wohnung in der Stadt.', 'দুই মাস ধরে আমি শহরের একটি নতুন অ্যাপার্টমেন্টে থাকছি।', 'I have been living in a new apartment in the city for two months.'],
    ['Sie ist kleiner als meine alte Wohnung, aber sie liegt näher an der Universität.', 'এটি আমার আগের অ্যাপার্টমেন্টের চেয়ে ছোট, কিন্তু বিশ্ববিদ্যালয়ের কাছাকাছি।', 'It is smaller than my old apartment, but it is closer to the university.'],
    ['Deshalb brauche ich morgens weniger Zeit für den Weg.', 'তাই সকালে যাতায়াতে আমার কম সময় লাগে।', 'Therefore, I need less time to commute in the morning.'],
    ['In der Nähe gibt es einen Supermarkt, eine Apotheke und eine Bushaltestelle.', 'কাছেই একটি সুপারমার্কেট, ফার্মেসি ও বাসস্টপ আছে।', 'There is a supermarket, a pharmacy and a bus stop nearby.'],
    ['Am Anfang war es schwierig, die Nachbarn kennenzulernen, aber inzwischen helfen wir uns oft gegenseitig.', 'শুরুতে প্রতিবেশীদের সঙ্গে পরিচিত হওয়া কঠিন ছিল, কিন্তু এখন আমরা প্রায়ই একে অপরকে সাহায্য করি।', 'At first, it was difficult to get to know the neighbours, but now we often help one another.'],
  ], [
    ['Wohnung', 'বাসা / অ্যাপার্টমেন্ট', 'die'],
    ['Apotheke', 'ফার্মেসি', 'die'],
    ['Nachbar', 'প্রতিবেশী', 'der'],
    ['inzwischen', 'ইতিমধ্যে / এখন'],
  ], [
    ['Seit wann wohnt die Person in der neuen Wohnung?', ['Seit zwei Wochen', 'Seit zwei Monaten', 'Seit zwei Jahren'], 1],
    ['Warum braucht die Person morgens weniger Zeit?', ['Die Wohnung ist größer.', 'Sie fährt mit dem Auto.', 'Die Wohnung liegt näher an der Universität.'], 2],
  ]),
  model(3, { de: 'Ein Tag im Büro', bn: 'অফিসে একটি দিন', en: 'A day at the office' }, 'Arbeit und Beruf', [
    ['Seit einem Jahr arbeite ich in einem kleinen Unternehmen.', 'আমি এক বছর ধরে একটি ছোট প্রতিষ্ঠানে কাজ করছি।', 'I have been working at a small company for a year.'],
    ['Normalerweise beginne ich um neun Uhr und beantworte zuerst meine E-Mails.', 'সাধারণত সকাল নয়টায় কাজ শুরু করি এবং প্রথমে ইমেইলের উত্তর দিই।', 'I usually start at nine and answer my emails first.'],
    ['Danach bespreche ich mit meinem Team die Aufgaben für den Tag.', 'এরপর দলের সঙ্গে দিনের কাজগুলো নিয়ে আলোচনা করি।', 'After that, I discuss the day\'s tasks with my team.'],
    ['Manchmal gibt es viel Arbeit, und ich muss länger bleiben.', 'কখনো অনেক কাজ থাকে, তাই আমাকে বেশি সময় থাকতে হয়।', 'Sometimes there is a lot of work, and I have to stay longer.'],
    ['Das gefällt mir nicht immer, aber ich lerne jeden Tag etwas Neues.', 'এটা সব সময় ভালো লাগে না, তবে প্রতিদিন নতুন কিছু শিখি।', 'I don\'t always like that, but I learn something new every day.'],
    ['In Zukunft möchte ich mehr Verantwortung übernehmen.', 'ভবিষ্যতে আমি আরও বেশি দায়িত্ব নিতে চাই।', 'In the future, I would like to take on more responsibility.'],
  ], [
    ['Unternehmen', 'প্রতিষ্ঠান', 'das'],
    ['besprechen', 'আলোচনা করা'],
    ['Aufgabe', 'কাজ / দায়িত্ব', 'die'],
    ['Verantwortung', 'দায়িত্ব', 'die'],
  ], [
    ['Was macht die Person zuerst?', ['Sie beantwortet E-Mails.', 'Sie trinkt Kaffee.', 'Sie geht nach Hause.'], 0],
    ['Was möchte die Person in Zukunft?', ['Weniger arbeiten', 'Mehr Verantwortung übernehmen', 'Eine neue Stadt sehen'], 1],
  ]),
  model(4, { de: 'Mehr Bewegung im Alltag', bn: 'দৈনন্দিন জীবনে আরও চলাফেরা', en: 'More exercise in everyday life' }, 'Gesundheit', [
    ['Früher bin ich fast überall mit dem Bus gefahren.', 'আগে আমি প্রায় সব জায়গায় বাসে যেতাম।', 'In the past, I travelled almost everywhere by bus.'],
    ['In den letzten Monaten habe ich aber versucht, mich mehr zu bewegen.', 'তবে গত কয়েক মাসে আরও বেশি চলাফেরা করার চেষ্টা করেছি।', 'However, in recent months, I have tried to move more.'],
    ['Jetzt gehe ich kurze Strecken zu Fuß und benutze die Treppe statt des Aufzugs.', 'এখন কাছাকাছি দূরত্ব হেঁটে যাই এবং লিফটের বদলে সিঁড়ি ব্যবহার করি।', 'Now I walk short distances and use the stairs instead of the lift.'],
    ['Außerdem mache ich dreimal pro Woche einfache Übungen zu Hause.', 'এ ছাড়া সপ্তাহে তিন দিন বাড়িতে সহজ ব্যায়াম করি।', 'I also do simple exercises at home three times a week.'],
    ['Am Anfang war ich schnell müde, aber inzwischen fühle ich mich fitter.', 'শুরুতে দ্রুত ক্লান্ত হয়ে পড়তাম, কিন্তু এখন নিজেকে আরও ফিট মনে হয়।', 'At first, I got tired quickly, but now I feel fitter.'],
    ['Ich glaube, kleine Veränderungen können viel bewirken.', 'আমার বিশ্বাস, ছোট পরিবর্তনও অনেক বড় প্রভাব ফেলতে পারে।', 'I believe small changes can make a big difference.'],
  ], [
    ['früher', 'আগে'],
    ['sich bewegen', 'চলাফেরা করা'],
    ['Treppe', 'সিঁড়ি', 'die'],
    ['Aufzug', 'লিফট', 'der'],
  ], [
    ['Was benutzt die Person jetzt statt des Aufzugs?', ['Den Bus', 'Die Treppe', 'Das Fahrrad'], 1],
    ['Wie oft macht die Person Übungen zu Hause?', ['Jeden Tag', 'Einmal pro Monat', 'Dreimal pro Woche'], 2],
  ]),
  model(5, { de: 'Ich plane meine Ausgaben', bn: 'আমি আমার খরচের পরিকল্পনা করি', en: 'I plan my expenses' }, 'Einkaufen und Geld', [
    ['Seit einiger Zeit schreibe ich jeden Monat meine Ausgaben auf.', 'কিছুদিন ধরে আমি প্রতি মাসে আমার খরচ লিখে রাখছি।', 'For some time, I have been writing down my expenses every month.'],
    ['So kann ich sehen, wofür ich mein Geld ausgebe.', 'এতে বুঝতে পারি কোন খাতে টাকা খরচ করছি।', 'This helps me see what I spend my money on.'],
    ['Früher habe ich oft Dinge gekauft, die ich eigentlich nicht gebraucht habe.', 'আগে এমন অনেক জিনিস কিনতাম, যেগুলো আসলে আমার দরকার ছিল না।', 'In the past, I often bought things that I didn\'t really need.'],
    ['Jetzt vergleiche ich die Preise und überlege, ob ich etwas wirklich brauche.', 'এখন দাম তুলনা করি এবং ভাবি, জিনিসটি সত্যিই প্রয়োজন কি না।', 'Now I compare prices and think about whether I really need something.'],
    ['Einen kleinen Betrag spare ich jeden Monat für Notfälle.', 'জরুরি পরিস্থিতির জন্য প্রতি মাসে অল্প টাকা জমাই।', 'I save a small amount every month for emergencies.'],
    ['Dadurch fühle ich mich sicherer und kann besser planen.', 'এর ফলে নিজেকে বেশি নিরাপদ মনে হয় এবং ভালোভাবে পরিকল্পনা করতে পারি।', 'As a result, I feel more secure and can plan better.'],
  ], [
    ['Ausgabe', 'খরচ', 'die'],
    ['ausgeben', 'টাকা খরচ করা'],
    ['vergleichen', 'তুলনা করা'],
    ['sparen', 'টাকা জমানো'],
  ], [
    ['Was schreibt die Person jeden Monat auf?', ['Ihre Ausgaben', 'Neue Wörter', 'Ihre Termine'], 0],
    ['Wofür spart die Person einen kleinen Betrag?', ['Für eine Reise', 'Für Notfälle', 'Für ein neues Handy'], 1],
  ]),
  model(6, { de: 'Eine Reise mit dem Zug', bn: 'ট্রেনে একটি যাত্রা', en: 'A train journey' }, 'Reisen und Verkehr', [
    ['Letzten Sommer bin ich mit dem Zug in eine andere Stadt gefahren.', 'গত গ্রীষ্মে আমি ট্রেনে করে অন্য একটি শহরে গিয়েছিলাম।', 'Last summer, I travelled by train to another city.'],
    ['Ich hatte die Fahrkarte online gekauft und musste sie am Bahnhof nur noch zeigen.', 'অনলাইনে টিকিট কিনেছিলাম, তাই স্টেশনে শুধু সেটি দেখাতে হয়েছে।', 'I had bought the ticket online and only had to show it at the station.'],
    ['Leider hatte der Zug zwanzig Minuten Verspätung.', 'দুর্ভাগ্যবশত ট্রেনটি বিশ মিনিট দেরি করেছিল।', 'Unfortunately, the train was twenty minutes late.'],
    ['Während ich gewartet habe, habe ich mir einen Kaffee gekauft und ein Buch gelesen.', 'অপেক্ষা করার সময় কফি কিনে একটি বই পড়েছি।', 'While I was waiting, I bought a coffee and read a book.'],
    ['Trotzdem war die Reise angenehm, weil ich unterwegs schöne Landschaften sehen konnte.', 'তবুও যাত্রাটি আনন্দদায়ক ছিল, কারণ পথে সুন্দর প্রাকৃতিক দৃশ্য দেখতে পেয়েছি।', 'Nevertheless, the journey was pleasant because I could see beautiful landscapes along the way.'],
  ], [
    ['Fahrkarte', 'যাত্রার টিকিট', 'die'],
    ['Bahnhof', 'রেলস্টেশন', 'der'],
    ['Verspätung', 'দেরি', 'die'],
    ['trotzdem', 'তা সত্ত্বেও'],
  ], [
    ['Wie viel Verspätung hatte der Zug?', ['Zehn Minuten', 'Zwanzig Minuten', 'Eine Stunde'], 1],
    ['Was hat die Person beim Warten gemacht?', ['Sie hat geschlafen.', 'Sie hat telefoniert.', 'Sie hat ein Buch gelesen.'], 2],
  ]),
  model(7, { de: 'Mein Handy und ich', bn: 'আমার মোবাইল ফোন আর আমি', en: 'My phone and me' }, 'Medien und Technik', [
    ['Ich benutze mein Handy jeden Tag, zum Beispiel um Nachrichten zu lesen, Fotos zu machen und mit Freunden zu sprechen.', 'আমি প্রতিদিন ফোন ব্যবহার করি, যেমন খবর পড়তে, ছবি তুলতে এবং বন্ধুদের সঙ্গে কথা বলতে।', 'I use my phone every day, for example to read news, take photos and talk to friends.'],
    ['Früher habe ich oft lange Videos angesehen und dabei die Zeit vergessen.', 'আগে অনেকক্ষণ ভিডিও দেখতাম এবং সময়ের হিসাব ভুলে যেতাম।', 'In the past, I often watched videos for a long time and lost track of time.'],
    ['Deshalb habe ich jetzt eine tägliche Bildschirmzeit festgelegt.', 'তাই এখন প্রতিদিন ফোন ব্যবহারের একটি সময়সীমা নির্ধারণ করেছি।', 'That\'s why I have now set a daily screen-time limit.'],
    ['Beim Lernen schalte ich die Benachrichtigungen aus.', 'পড়াশোনার সময় নোটিফিকেশন বন্ধ রাখি।', 'While studying, I turn off notifications.'],
    ['So kann ich mich besser konzentrieren und meine Aufgaben schneller erledigen.', 'এতে মনোযোগ ভালো থাকে এবং কাজ দ্রুত শেষ করতে পারি।', 'This helps me concentrate better and finish my tasks faster.'],
  ], [
    ['Nachricht', 'খবর / বার্তা', 'die'],
    ['Benachrichtigung', 'বিজ্ঞপ্তি', 'die'],
    ['sich konzentrieren', 'মনোযোগ দেওয়া'],
    ['erledigen', 'সম্পন্ন করা'],
  ], [
    ['Was hat die Person früher oft gemacht?', ['Lange Videos angesehen', 'Bücher gelesen', 'Sport gemacht'], 0],
    ['Was macht die Person beim Lernen?', ['Sie hört Musik.', 'Sie schaltet die Benachrichtigungen aus.', 'Sie ruft Freunde an.'], 1],
  ]),
  model(8, { de: 'Deutsch Schritt für Schritt', bn: 'ধাপে ধাপে জার্মান', en: 'German step by step' }, 'Lernen und Sprachen', [
    ['Ich lerne seit einigen Monaten Deutsch.', 'আমি কয়েক মাস ধরে জার্মান শিখছি।', 'I have been learning German for several months.'],
    ['Am schwierigsten finde ich manchmal die Artikel und die Satzstellung.', 'কখনো কখনো আর্টিকেল এবং বাক্যে শব্দের অবস্থান আমার কাছে সবচেয়ে কঠিন মনে হয়।', 'Sometimes I find articles and word order the most difficult.'],
    ['Deshalb wiederhole ich jeden Tag zehn neue Wörter und schreibe mit ihnen eigene Sätze.', 'তাই প্রতিদিন দশটি নতুন শব্দ পুনরাবৃত্তি করি এবং সেগুলো দিয়ে নিজের বাক্য লিখি।', 'Therefore, I review ten new words every day and write my own sentences with them.'],
    ['Außerdem höre ich kurze Podcasts und spreche laut nach.', 'এ ছাড়া ছোট পডকাস্ট শুনি এবং জোরে জোরে অনুকরণ করে বলার অনুশীলন করি।', 'I also listen to short podcasts and repeat aloud.'],
    ['Wenn ich einen Fehler mache, versuche ich zu verstehen, warum er falsch ist.', 'ভুল করলে কেন ভুল হয়েছে তা বোঝার চেষ্টা করি।', 'When I make a mistake, I try to understand why it is wrong.'],
    ['So werde ich langsam sicherer.', 'এভাবে ধীরে ধীরে আমার আত্মবিশ্বাস বাড়ছে।', 'This way, I am slowly becoming more confident.'],
  ], [
    ['Satzstellung', 'বাক্যে শব্দের অবস্থান', 'die'],
    ['wiederholen', 'পুনরাবৃত্তি করা'],
    ['Fehler', 'ভুল', 'der'],
    ['außerdem', 'এ ছাড়া'],
  ], [
    ['Was findet die Person manchmal am schwierigsten?', ['Die Artikel und die Satzstellung', 'Die Zahlen', 'Das Alphabet'], 0],
    ['Wie viele neue Wörter wiederholt die Person jeden Tag?', ['Fünf', 'Zehn', 'Zwanzig'], 1],
  ]),
  model(9, { de: 'Weniger Müll im Alltag', bn: 'দৈনন্দিন জীবনে কম আবর্জনা', en: 'Less rubbish in everyday life' }, 'Umwelt', [
    ['In unserem Viertel liegt manchmal viel Müll auf der Straße.', 'আমাদের এলাকায় কখনো কখনো রাস্তায় অনেক আবর্জনা থাকে।', 'Sometimes there is a lot of rubbish in the streets in our neighbourhood.'],
    ['Deshalb haben einige Nachbarn beschlossen, gemeinsam etwas dagegen zu tun.', 'তাই কয়েকজন প্রতিবেশী একসঙ্গে এর বিরুদ্ধে কিছু করার সিদ্ধান্ত নিয়েছেন।', 'Therefore, some neighbours have decided to do something about it together.'],
    ['Einmal im Monat sammeln wir Abfälle im Park und trennen Papier, Glas und Plastik.', 'মাসে একবার আমরা পার্কে আবর্জনা সংগ্রহ করি এবং কাগজ, কাচ ও প্লাস্টিক আলাদা করি।', 'Once a month, we collect rubbish in the park and separate paper, glass and plastic.'],
    ['Wir benutzen auch öfter Stofftaschen, statt neue Plastiktüten zu nehmen.', 'নতুন প্লাস্টিক ব্যাগের বদলে কাপড়ের ব্যাগও বেশি ব্যবহার করি।', 'We also use cloth bags more often instead of taking new plastic bags.'],
    ['Natürlich können wir nicht alles verändern, aber jeder kleine Beitrag hilft der Umwelt.', 'অবশ্যই সবকিছু পরিবর্তন করতে পারব না, তবে ছোট ছোট অবদানও পরিবেশকে সাহায্য করে।', 'Of course, we cannot change everything, but every small contribution helps the environment.'],
  ], [
    ['Müll', 'আবর্জনা', 'der'],
    ['trennen', 'আলাদা করা'],
    ['Umwelt', 'পরিবেশ', 'die'],
    ['Beitrag', 'অবদান', 'der'],
  ], [
    ['Wie oft sammeln die Nachbarn Abfälle im Park?', ['Jeden Tag', 'Einmal im Monat', 'Einmal im Jahr'], 1],
    ['Was benutzen sie statt neuer Plastiktüten?', ['Papiertüten', 'Kartons', 'Stofftaschen'], 2],
  ]),
  model(10, { de: 'Ein Abendessen mit Freunden', bn: 'বন্ধুদের সঙ্গে রাতের খাবার', en: 'Dinner with friends' }, 'Essen und Einladen', [
    ['Am Freitag habe ich Freunde zum Abendessen eingeladen.', 'শুক্রবার আমি বন্ধুদের রাতের খাবারের জন্য আমন্ত্রণ জানিয়েছিলাম।', 'On Friday, I invited friends to dinner.'],
    ['Weil eine Freundin kein Fleisch isst, habe ich auch ein vegetarisches Gericht vorbereitet.', 'একজন বান্ধবী মাংস খান না বলে আমি একটি নিরামিষ পদও তৈরি করেছি।', 'Because one friend does not eat meat, I also prepared a vegetarian dish.'],
    ['Wir haben gemeinsam Gemüse geschnitten und den Tisch gedeckt.', 'আমরা একসঙ্গে সবজি কেটেছি এবং খাবারের টেবিল সাজিয়েছি।', 'We cut vegetables together and set the table.'],
    ['Als alle angekommen waren, haben wir zuerst gegessen und danach ein Brettspiel gespielt.', 'সবাই আসার পর প্রথমে খেয়েছি, তারপর বোর্ড গেম খেলেছি।', 'When everyone had arrived, we ate first and then played a board game.'],
    ['Obwohl die Vorbereitung etwas Zeit gebraucht hat, hatte ich viel Spaß.', 'প্রস্তুতিতে কিছুটা সময় লাগলেও আমার খুব আনন্দ হয়েছে।', 'Although the preparation took some time, I had a lot of fun.'],
  ], [
    ['einladen', 'আমন্ত্রণ জানানো'],
    ['vorbereiten', 'প্রস্তুত করা'],
    ['den Tisch decken', 'খাবারের টেবিল সাজানো'],
    ['ankommen', 'পৌঁছানো'],
  ], [
    ['Warum gab es auch ein vegetarisches Gericht?', ['Eine Freundin isst kein Fleisch.', 'Fleisch war zu teuer.', 'Der Supermarkt war geschlossen.'], 0],
    ['Was haben sie nach dem Essen gemacht?', ['Einen Film gesehen', 'Ein Brettspiel gespielt', 'Einen Spaziergang gemacht'], 1],
  ]),
  model(11, { de: 'Ein verlorener Geldbeutel', bn: 'হারিয়ে যাওয়া মানিব্যাগ', en: 'A lost wallet' }, 'Probleme lösen', [
    ['Gestern habe ich im Bus meinen Geldbeutel verloren.', 'গতকাল বাসে আমার মানিব্যাগ হারিয়ে ফেলেছি।', 'Yesterday, I lost my wallet on the bus.'],
    ['Als ich es bemerkt habe, war der Bus schon weg.', 'যখন বিষয়টি বুঝতে পেরেছি, তখন বাস চলে গিয়েছিল।', 'When I noticed, the bus had already left.'],
    ['Zuerst habe ich beim Verkehrsunternehmen angerufen und den Verlust beschrieben.', 'প্রথমে পরিবহন সংস্থায় ফোন করে হারানো জিনিসটির বর্ণনা দিয়েছি।', 'First, I called the transport company and described what I had lost.'],
    ['Danach habe ich meine Bank informiert, damit meine Karte gesperrt werden kann.', 'এরপর ব্যাংককে জানিয়েছি, যাতে আমার কার্ডটি বন্ধ করা যায়।', 'Then I informed my bank so that my card could be blocked.'],
    ['Zum Glück hat ein Fahrgast den Geldbeutel gefunden und beim Fundbüro abgegeben.', 'সৌভাগ্যবশত একজন যাত্রী মানিব্যাগটি পেয়ে হারানো জিনিসের অফিসে জমা দিয়েছেন।', 'Luckily, a passenger found the wallet and handed it in to the lost-property office.'],
    ['Heute konnte ich ihn abholen.', 'আজ আমি সেটি সংগ্রহ করতে পেরেছি।', 'Today, I was able to collect it.'],
  ], [
    ['Geldbeutel', 'মানিব্যাগ', 'der'],
    ['verlieren', 'হারিয়ে ফেলা'],
    ['Fundbüro', 'হারানো জিনিসের অফিস', 'das'],
    ['abholen', 'সংগ্রহ করা'],
  ], [
    ['Wo hat die Person den Geldbeutel verloren?', ['Im Bus', 'Im Supermarkt', 'Im Park'], 0],
    ['Wer hat den Geldbeutel gefunden?', ['Ein Polizist', 'Ein Fahrgast', 'Die Bank'], 1],
  ]),
  model(12, { de: 'Meine Zukunftspläne', bn: 'আমার ভবিষ্যৎ পরিকল্পনা', en: 'My future plans' }, 'Pläne und Zukunft', [
    ['In Zukunft möchte ich in Deutschland leben und arbeiten.', 'ভবিষ্যতে আমি জার্মানিতে বসবাস ও কাজ করতে চাই।', 'In the future, I would like to live and work in Germany.'],
    ['Deshalb lerne ich jeden Tag Deutsch und versuche, meine Sprachkenntnisse zu verbessern.', 'তাই প্রতিদিন জার্মান শিখি এবং ভাষাগত দক্ষতা উন্নত করার চেষ্টা করি।', 'Therefore, I learn German every day and try to improve my language skills.'],
    ['Außerdem informiere ich mich über verschiedene Berufe und Ausbildungsmöglichkeiten.', 'এ ছাড়া বিভিন্ন পেশা ও বৃত্তিমূলক প্রশিক্ষণের সুযোগ সম্পর্কে তথ্য সংগ্রহ করি।', 'I also find out about different professions and vocational training opportunities.'],
    ['Ich weiß, dass es Zeit und Geduld braucht, ein neues Leben in einem anderen Land aufzubauen.', 'আমি জানি, অন্য একটি দেশে নতুন জীবন গড়তে সময় ও ধৈর্য লাগে।', 'I know that it takes time and patience to build a new life in another country.'],
    ['Trotzdem bin ich motiviert und möchte mein Ziel Schritt für Schritt erreichen.', 'তবুও আমি অনুপ্রাণিত এবং ধাপে ধাপে আমার লক্ষ্য অর্জন করতে চাই।', 'Nevertheless, I am motivated and want to achieve my goal step by step.'],
  ], [
    ['Sprachkenntnisse', 'ভাষাগত দক্ষতা', 'die'],
    ['Ausbildung', 'বৃত্তিমূলক প্রশিক্ষণ', 'die'],
    ['Geduld', 'ধৈর্য', 'die'],
    ['erreichen', 'অর্জন করা'],
  ], [
    ['Wo möchte die Person in Zukunft leben?', ['In Deutschland', 'In Bangladesch', 'In England'], 0],
    ['Was braucht man, um ein neues Leben aufzubauen?', ['Nur Geld', 'Zeit und Geduld', 'Viele Freunde'], 1],
  ]),
];
