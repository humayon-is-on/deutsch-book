import type { Note, TextItem } from '../../src/content/types';

/**
 * B1 emails, the person's 40 Goethe B1 models (20 formal, 20 informal),
 * easiest first: short informal emails about everyday life come first,
 * formal requests and complaints with harder words and Konjunktiv II
 * later. Each one is a topic that opens after the one before it.
 *
 * Every email is greeting, body, closing and signature, each with its full
 * Bangla translation, which the app shows as one block under the email.
 * The Bangla keeps one sentence per German sentence, so the end test can
 * ask about single sentences.
 */
type Part = [de: string, bn: string];

function email(
  id: string,
  register: 'formell' | 'informell',
  title: { de: string; bn: string; en: string },
  parts: [greeting: Part, body: Part, closing: Part, signature: Part],
  notes: Note[],
): TextItem {
  return {
    id: `b1-email-${id}`,
    level: 'B1',
    module: 'emails',
    topic: 'E-Mail',
    tag: `E-Mail · ${register}`,
    title,
    lines: parts.map(([de, bn]) => ({ de, bn })),
    notes,
  };
}

const DAMEN_HERREN: Part = ['Sehr geehrte Damen und Herren,', 'সম্মানিত মহোদয়/মহোদয়া,'];
const FRAU_MUELLER: Part = ['Sehr geehrte Frau Müller,', 'সম্মানিত মিসেস মুলার,'];
const FORMAL_END: Part = ['Mit freundlichen Grüßen', 'বিনীত শুভেচ্ছাসহ'];
const LIEBE_GRUESSE: Part = ['Liebe Grüße', 'ভালোবাসা ও শুভেচ্ছাসহ'];
const VIELE_GRUESSE: Part = ['Viele Grüße', 'শুভেচ্ছাসহ'];
const MAHID_HASAN: Part = ['Mahid Hasan', 'মাহিদ হাসান'];
const MAHID: Part = ['Mahid', 'মাহিদ'];

export const b1Emails: TextItem[] = [
  email(
    'birthday-party',
    'informell',
    { de: 'Einladung zur Party', bn: 'জন্মদিনের পার্টিতে দাওয়াত', en: 'Inviting a friend to a party' },
    [
      ['Hallo Alex,', 'হ্যালো অ্যালেক্স,'],
      [
        'wie geht es dir? Nächsten Samstag habe ich Geburtstag und möchte eine kleine Party bei mir zu Hause machen. Die Party beginnt um 18 Uhr. Ich möchte mit meinen Freunden essen, Musik hören und ein paar Spiele spielen. Es wäre toll, wenn du auch kommen könntest, weil wir uns schon lange nicht gesehen haben. Bitte bring nichts mit. Deine Gesellschaft reicht mir völlig! Sag mir bitte Bescheid, ob du Zeit hast.',
        'কেমন আছ? আগামী শনিবার আমার জন্মদিন, আর আমি বাসায় একটা ছোট পার্টি করতে চাই। পার্টি শুরু হবে সন্ধ্যা ৬টায়। আমি বন্ধুদের সাথে খেতে, গান শুনতে আর কয়েকটা খেলা খেলতে চাই। তুমিও এলে খুব ভালো হতো, কারণ অনেক দিন আমাদের দেখা হয়নি। দয়া করে কিছু নিয়ে এসো না। তোমার সঙ্গই আমার জন্য যথেষ্ট! তোমার সময় আছে কি না, আমাকে জানিও।',
      ],
      LIEBE_GRUESSE,
      MAHID,
    ],
    [
      { term: 'Bescheid sagen', bn: 'জানানো, খবর দেওয়া।' },
      { term: 'Es wäre toll, wenn …', bn: '… হলে খুব ভালো হতো। Konjunktiv II দিয়ে ভদ্রভাবে ইচ্ছা জানানো।' },
      { term: 'Bring nichts mit!', bn: 'কিছু নিয়ে এসো না! mitbringen-এর du-আদেশ রূপ।' },
    ],
  ),
  email(
    'holiday',
    'informell',
    { de: 'Vom Urlaub erzählen', bn: 'ছুটির গল্প বলা', en: 'Talking about a holiday' },
    [
      ['Hallo Sarah,', 'হ্যালো সারা,'],
      [
        'wie geht’s dir? Ich bin gerade aus meinem Urlaub zurückgekommen und möchte dir davon erzählen. Ich war eine Woche in Cox’s Bazar. Das Wetter war wunderbar, und ich konnte jeden Tag am Strand spazieren gehen. Außerdem habe ich viele Fotos gemacht und leckeres Essen probiert. Am besten hat mir der Sonnenuntergang gefallen, weil die Aussicht wirklich schön war. Ich hätte gern noch ein paar Tage dort verbracht. Und wie war dein Urlaub? Erzähl mir alles!',
        'কেমন আছ? আমি এইমাত্র ছুটি কাটিয়ে ফিরেছি আর তোমাকে সে সম্পর্কে বলতে চাই। আমি এক সপ্তাহ কক্সবাজারে ছিলাম। আবহাওয়া চমৎকার ছিল, আর আমি প্রতিদিন সৈকতে হাঁটতে পেরেছি। তাছাড়া আমি অনেক ছবি তুলেছি আর মজার খাবার চেখে দেখেছি। সবচেয়ে ভালো লেগেছে সূর্যাস্ত, কারণ দৃশ্যটা সত্যিই সুন্দর ছিল। আমি আরও কয়েকটা দিন সেখানে কাটাতে পারলে ভালো হতো। আর তোমার ছুটি কেমন কাটল? আমাকে সব খুলে বলো!',
      ],
      LIEBE_GRUESSE,
      MAHID,
    ],
    [
      { term: 'zurückkommen', bn: 'ফিরে আসা। Perfekt: ich bin zurückgekommen (sein দিয়ে)।' },
      { term: 'Am besten hat mir … gefallen.', bn: 'আমার সবচেয়ে ভালো লেগেছে …।' },
      { term: 'Ich hätte gern …', bn: 'আমি … করতে পারলে ভালো হতো। অতীতের অপূর্ণ ইচ্ছা (Konjunktiv II)।' },
    ],
  ),
  email(
    'new-flat',
    'informell',
    { de: 'Die neue Wohnung', bn: 'নতুন ফ্ল্যাটের বর্ণনা', en: 'Describing a new home' },
    [
      ['Hallo Anna,', 'হ্যালো আনা,'],
      [
        'ich habe tolle Neuigkeiten! Letzte Woche bin ich in eine neue Wohnung gezogen. Die Wohnung ist nicht sehr groß, aber sie ist hell und gemütlich. Besonders gefällt mir das große Fenster im Wohnzimmer. In der Nähe gibt es einen Supermarkt, einen Park und eine Bushaltestelle. Obwohl der Umzug anstrengend war, bin ich sehr glücklich mit meiner Entscheidung. Ich möchte dich gern einladen, damit du meine neue Wohnung sehen kannst. Hast du am kommenden Wochenende Zeit?',
        'আমার কাছে দারুণ খবর আছে! গত সপ্তাহে আমি একটা নতুন ফ্ল্যাটে উঠেছি। ফ্ল্যাটটা খুব বড় না, কিন্তু আলো-ঝলমলে আর আরামদায়ক। বসার ঘরের বড় জানালাটা আমার বিশেষভাবে পছন্দ। কাছেই একটা সুপারমার্কেট, একটা পার্ক আর একটা বাসস্টপ আছে। যদিও বাসা বদলানো ক্লান্তিকর ছিল, তবুও আমি আমার সিদ্ধান্তে খুব খুশি। আমি তোমাকে দাওয়াত দিতে চাই, যাতে তুমি আমার নতুন ফ্ল্যাটটা দেখতে পারো। আগামী সপ্তাহান্তে কি তোমার সময় আছে?',
      ],
      LIEBE_GRUESSE,
      MAHID,
    ],
    [
      { term: 'die Neuigkeiten', bn: 'খবর, নতুন খবর।' },
      { term: 'in eine Wohnung ziehen', bn: 'নতুন বাসায় ওঠা। Perfekt: ich bin gezogen।' },
      { term: 'Obwohl …, …', bn: 'যদিও …, তবুও …। obwohl-এর পরে ক্রিয়া বাক্যাংশের শেষে যায়।' },
    ],
  ),
  email(
    'ill',
    'informell',
    { de: 'Ich bin krank', bn: 'বন্ধুকে অসুস্থতার খবর দেওয়া', en: 'Informing a friend about illness' },
    [
      ['Hallo Julia,', 'হ্যালো ইউলিয়া,'],
      [
        'leider muss ich unser Treffen morgen absagen. Seit gestern habe ich Fieber und starke Halsschmerzen. Deshalb muss ich zu Hause bleiben und mich ausruhen. Es tut mir leid, dass ich dir so kurzfristig Bescheid gebe. Ich hatte mich wirklich auf unser Treffen gefreut. Ich möchte dich aber gern nächste Woche sehen, wenn ich wieder gesund bin. Vielleicht können wir am Samstag zusammen ins Café gehen. Ich hoffe, dass du Verständnis dafür hast.',
        'দুঃখের বিষয়, কালকের দেখা করাটা আমাকে বাতিল করতে হচ্ছে। গতকাল থেকে আমার জ্বর আর গলায় খুব ব্যথা। তাই আমাকে বাসায় থেকে বিশ্রাম নিতে হবে। এত শেষ মুহূর্তে জানাচ্ছি বলে আমি দুঃখিত। আমি সত্যিই আমাদের দেখা হওয়ার অপেক্ষায় ছিলাম। তবে আমি সুস্থ হয়ে গেলে আগামী সপ্তাহে তোমার সাথে দেখা করতে চাই। হয়তো শনিবার আমরা একসাথে ক্যাফেতে যেতে পারি। আশা করি তুমি ব্যাপারটা বুঝবে।',
      ],
      LIEBE_GRUESSE,
      MAHID,
    ],
    [
      { term: 'absagen', bn: 'বাতিল করা (দেখা, অ্যাপয়েন্টমেন্ট ইত্যাদি)।' },
      { term: 'kurzfristig', bn: 'শেষ মুহূর্তে, অল্প সময় আগে।' },
      { term: 'sich auf etwas freuen', bn: 'সামনের কোনো কিছুর জন্য আনন্দে অপেক্ষা করা।' },
    ],
  ),
  email(
    'late',
    'informell',
    { de: 'Entschuldigung für die Verspätung', bn: 'দেরির জন্য ক্ষমা চাওয়া', en: 'Apologising for being late' },
    [
      ['Hallo Lisa,', 'হ্যালো লিসা,'],
      [
        'es tut mir wirklich leid, dass ich gestern zu spät zu unserem Treffen gekommen bin. Mein Bus hatte eine Verspätung, und ich konnte dich leider nicht rechtzeitig informieren. Ich weiß, dass du lange auf mich warten musstest. Das war nicht meine Absicht. Ich hoffe, du bist nicht mehr böse auf mich. Als Entschuldigung möchte ich dich am Wochenende zum Essen einladen. Hast du am Samstag Zeit? Wir könnten uns in unserem Lieblingsrestaurant treffen.',
        'গতকাল আমাদের দেখা করতে দেরিতে আসার জন্য আমি সত্যিই দুঃখিত। আমার বাস দেরি করেছিল, আর দুঃখের বিষয় আমি তোমাকে সময়মতো জানাতে পারিনি। আমি জানি তোমাকে অনেকক্ষণ আমার জন্য অপেক্ষা করতে হয়েছে। এটা আমার ইচ্ছাকৃত ছিল না। আশা করি তুমি আর আমার ওপর রাগ করে নেই। ক্ষমা চাওয়ার উপায় হিসেবে আমি সপ্তাহান্তে তোমাকে খাওয়াতে নিয়ে যেতে চাই। শনিবার কি তোমার সময় আছে? আমরা আমাদের প্রিয় রেস্টুরেন্টে দেখা করতে পারি।',
      ],
      LIEBE_GRUESSE,
      MAHID,
    ],
    [
      { term: 'rechtzeitig', bn: 'সময়মতো।' },
      { term: 'böse auf jemanden sein', bn: 'কারও ওপর রাগ করা।' },
      { term: 'die Absicht', bn: 'ইচ্ছা, উদ্দেশ্য। absichtlich = ইচ্ছাকৃতভাবে।' },
    ],
  ),
  email(
    'moving-help',
    'informell',
    { de: 'Um Hilfe beim Umzug bitten', bn: 'বাসা বদলাতে সাহায্য চাওয়া', en: 'Asking for help with moving' },
    [
      ['Hallo Tom,', 'হ্যালো টম,'],
      [
        'ich hoffe, es geht dir gut. Ich ziehe nächste Woche in eine neue Wohnung und brauche etwas Hilfe beim Umzug. Ich habe einige schwere Möbel und viele Kartons, die ich transportieren muss. Deshalb wollte ich fragen, ob du mir am Samstag helfen könntest. Natürlich bestelle ich danach eine Pizza für uns, und wir können zusammen essen. Wenn du keine Zeit hast, ist das auch kein Problem. Kannst du mir bitte bald Bescheid geben?',
        'আশা করি তুমি ভালো আছ। আমি আগামী সপ্তাহে নতুন ফ্ল্যাটে উঠছি আর বাসা বদলাতে একটু সাহায্য লাগবে। আমার কিছু ভারী আসবাব আর অনেকগুলো কার্টন আছে, যেগুলো আমাকে সরিয়ে নিতে হবে। তাই জিজ্ঞেস করতে চাইছিলাম, তুমি কি শনিবার আমাকে সাহায্য করতে পারবে। অবশ্যই এরপর আমি আমাদের জন্য পিৎজা অর্ডার করব, আর আমরা একসাথে খেতে পারব। তোমার সময় না থাকলেও কোনো সমস্যা নেই। তুমি কি আমাকে তাড়াতাড়ি জানাতে পারবে?',
      ],
      VIELE_GRUESSE,
      MAHID,
    ],
    [
      { term: 'der Umzug', bn: 'বাসা বদল, এক বাসা থেকে অন্য বাসায় যাওয়া।' },
      { term: 'die Möbel', bn: 'আসবাবপত্র (সবসময় বহুবচন)।' },
      { term: 'Ich wollte fragen, ob …', bn: 'জিজ্ঞেস করতে চাইছিলাম, … কি না। ভদ্রভাবে অনুরোধ শুরু করার উপায়।' },
    ],
  ),
  email(
    'movie-night',
    'informell',
    { de: 'Ein Filmabend', bn: 'সিনেমা দেখার সন্ধ্যার আয়োজন', en: 'Organising a movie night' },
    [
      ['Hallo Max,', 'হ্যালো ম্যাক্স,'],
      [
        'hast du am Freitagabend schon etwas vor? Ich möchte einen Filmabend bei mir zu Hause organisieren und dich gern einladen. Wir könnten eine Komödie anschauen, weil wir beide gern lachen. Danach können wir etwas essen und über den Film sprechen. Ich kümmere mich um Getränke und Pizza. Könntest du vielleicht etwas Popcorn mitbringen? Du kannst gern auch deine Lieblingsfilme vorschlagen. Wenn du möchtest, können wir außerdem noch einen weiteren Freund einladen. Ich freue mich auf Freitag!',
        'শুক্রবার সন্ধ্যায় কি তোমার আগে থেকে কোনো পরিকল্পনা আছে? আমি বাসায় একটা সিনেমা দেখার সন্ধ্যা আয়োজন করতে চাই আর তোমাকে দাওয়াত দিতে চাই। আমরা একটা কমেডি দেখতে পারি, কারণ আমরা দুজনেই হাসতে ভালোবাসি। এরপর আমরা কিছু খেতে আর সিনেমাটা নিয়ে কথা বলতে পারি। পানীয় আর পিৎজার ব্যবস্থা আমি করব। তুমি কি একটু পপকর্ন নিয়ে আসতে পারবে? চাইলে তুমি তোমার প্রিয় সিনেমাগুলোর নামও বলতে পারো। তুমি চাইলে আমরা আরও একজন বন্ধুকে দাওয়াত দিতে পারি। শুক্রবারের অপেক্ষায় রইলাম!',
      ],
      VIELE_GRUESSE,
      MAHID,
    ],
    [
      { term: 'etwas vorhaben', bn: 'কিছু করার পরিকল্পনা থাকা।' },
      { term: 'sich um etwas kümmern', bn: 'কোনো কিছুর দায়িত্ব নেওয়া বা ব্যবস্থা করা।' },
      { term: 'vorschlagen', bn: 'প্রস্তাব দেওয়া, পরামর্শ দেওয়া।' },
    ],
  ),
  email(
    'gift-advice',
    'informell',
    { de: 'Ein Geschenk auswählen', bn: 'উপহার বাছাইয়ে পরামর্শ চাওয়া', en: 'Asking for advice about a gift' },
    [
      ['Hallo Emma,', 'হ্যালো এমা,'],
      [
        'ich brauche deinen Rat. Nächste Woche hat meine Schwester Geburtstag, und ich möchte ihr etwas Besonderes schenken. Zuerst dachte ich an ein Buch oder ein Kleid. Allerdings weiß ich nicht genau, was ihr im Moment gefällt. Sie interessiert sich auch für Technik und Musik. Da du sie gut kennst, wollte ich dich fragen, ob du eine gute Geschenkidee hast. Vielleicht könnten wir am Samstag zusammen einkaufen gehen. Dann können wir gemeinsam etwas Schönes finden. Danke für deine Hilfe!',
        'আমার তোমার পরামর্শ দরকার। আগামী সপ্তাহে আমার বোনের জন্মদিন, আর আমি তাকে বিশেষ কিছু উপহার দিতে চাই। প্রথমে আমি একটা বই বা একটা জামার কথা ভেবেছিলাম। তবে এই মুহূর্তে তার কী পছন্দ, তা আমি ঠিক জানি না। সে প্রযুক্তি আর গানেও আগ্রহী। যেহেতু তুমি তাকে ভালো চেনো, তাই তোমাকে জিজ্ঞেস করতে চাইছিলাম তোমার কাছে কোনো ভালো উপহারের আইডিয়া আছে কি না। হয়তো শনিবার আমরা একসাথে কেনাকাটা করতে যেতে পারি। তাহলে আমরা মিলে সুন্দর কিছু খুঁজে নিতে পারব। তোমার সাহায্যের জন্য ধন্যবাদ!',
      ],
      LIEBE_GRUESSE,
      MAHID,
    ],
    [
      { term: 'der Rat', bn: 'পরামর্শ, উপদেশ।' },
      { term: 'sich für etwas interessieren', bn: 'কোনো কিছুতে আগ্রহী হওয়া।' },
      { term: 'Allerdings …', bn: 'তবে …। আগের কথার সাথে একটু বিপরীত কিছু যোগ করে।' },
    ],
  ),
  email(
    'new-hobby',
    'informell',
    { de: 'Ein neues Hobby', bn: 'নতুন শখের কথা বলা', en: 'Talking about a hobby' },
    [
      ['Hallo Ben,', 'হ্যালো বেন,'],
      [
        'ich habe vor Kurzem ein neues Hobby angefangen: Ich lerne, Kuchen zu backen! Zuerst war es ziemlich schwierig, weil ich nicht wusste, wie man den Teig richtig vorbereitet. Inzwischen habe ich aber schon mehrere Kuchen gebacken, und meine Familie findet sie lecker. Mir gefällt dieses Hobby, weil ich dabei kreativ sein kann und nach der Arbeit entspanne. Hättest du Lust, am Wochenende mit mir einen Kuchen zu backen? Wir könnten ein neues Rezept ausprobieren.',
        'কিছুদিন আগে আমি একটা নতুন শখ শুরু করেছি: আমি কেক বানানো শিখছি! প্রথমে বেশ কঠিন ছিল, কারণ ময়দার মণ্ড কীভাবে ঠিকমতো তৈরি করতে হয়, আমি জানতাম না। তবে এর মধ্যে আমি কয়েকটা কেক বানিয়ে ফেলেছি, আর আমার পরিবার সেগুলো মজার বলে মনে করে। শখটা আমার ভালো লাগে, কারণ এতে আমি সৃজনশীল হতে পারি আর কাজের পরে মন হালকা হয়। সপ্তাহান্তে আমার সাথে একটা কেক বানাতে কি তোমার ইচ্ছে আছে? আমরা একটা নতুন রেসিপি চেষ্টা করে দেখতে পারি।',
      ],
      VIELE_GRUESSE,
      MAHID,
    ],
    [
      { term: 'vor Kurzem', bn: 'কিছুদিন আগে, সম্প্রতি।' },
      { term: 'inzwischen', bn: 'এর মধ্যে, এতদিনে।' },
      { term: 'Hättest du Lust, … zu …?', bn: 'তোমার কি … করার ইচ্ছে আছে? ভদ্রভাবে কাউকে কিছু করতে ডাকা।' },
    ],
  ),
  email(
    'festival',
    'informell',
    { de: 'Ein Fest beschreiben', bn: 'একটি উৎসবের বর্ণনা', en: 'Describing a festival' },
    [
      ['Hallo Paul,', 'হ্যালো পল,'],
      [
        'am vergangenen Wochenende habe ich ein großes Kulturfest besucht, und ich möchte dir davon erzählen. Es gab viele Essensstände, traditionelle Musik und interessante Veranstaltungen. Besonders gut hat mir die Atmosphäre gefallen, weil so viele Menschen zusammen gefeiert haben. Ich habe auch einige neue Gerichte probiert und viele Fotos gemacht. Obwohl es ziemlich voll war, hatte ich sehr viel Spaß. Warst du schon einmal auf einem ähnlichen Fest? Vielleicht könnten wir beim nächsten Mal zusammen hingehen. Schreib mir bald!',
        'গত সপ্তাহান্তে আমি একটা বড় সাংস্কৃতিক উৎসবে গিয়েছিলাম, আর তোমাকে সেটার কথা বলতে চাই। সেখানে অনেক খাবারের দোকান, ঐতিহ্যবাহী গান আর মজার মজার অনুষ্ঠান ছিল। পরিবেশটা আমার বিশেষভাবে ভালো লেগেছে, কারণ এত মানুষ একসাথে উৎসব করছিল। আমি কয়েকটা নতুন খাবারও চেখে দেখেছি আর অনেক ছবি তুলেছি। যদিও বেশ ভিড় ছিল, তবুও আমি খুব মজা করেছি। তুমি কি কখনো এরকম কোনো উৎসবে গিয়েছ? হয়তো পরের বার আমরা একসাথে যেতে পারি। তাড়াতাড়ি লিখো!',
      ],
      LIEBE_GRUESSE,
      MAHID,
    ],
    [
      { term: 'die Veranstaltung', bn: 'অনুষ্ঠান, আয়োজন।' },
      { term: 'die Atmosphäre', bn: 'পরিবেশ, আবহ।' },
      { term: 'Spaß haben', bn: 'মজা করা, আনন্দ পাওয়া।' },
    ],
  ),
  email(
    'language-course',
    'formell',
    { de: 'Anfrage zu einem Deutschkurs', bn: 'জার্মান কোর্স সম্পর্কে তথ্য চাওয়া', en: 'Asking about a German course' },
    [
      DAMEN_HERREN,
      [
        'ich möchte gern einen Deutschkurs an Ihrer Sprachschule besuchen, weil ich meine Deutschkenntnisse verbessern möchte. Ich lerne Deutsch, da ich später in Deutschland arbeiten will. Ich suche einen B1-Kurs, der am Abend stattfindet, weil ich tagsüber beschäftigt bin. Könnten Sie mir bitte Informationen über die Kurszeiten und die Kosten schicken? Außerdem möchte ich wissen, ob ich vor Kursbeginn einen Einstufungstest machen muss. Vielen Dank im Voraus.',
        'আমি আপনাদের ভাষা স্কুলে একটি জার্মান কোর্স করতে চাই, কারণ আমি আমার জার্মান জ্ঞান আরও উন্নত করতে চাই। আমি জার্মান শিখছি, কারণ পরে আমি জার্মানিতে কাজ করতে চাই। আমি সন্ধ্যায় হয় এমন একটি B1 কোর্স খুঁজছি, কারণ দিনের বেলা আমি ব্যস্ত থাকি। আপনি কি অনুগ্রহ করে কোর্সের সময়সূচি আর খরচ সম্পর্কে আমাকে তথ্য পাঠাতে পারবেন? এছাড়া আমি জানতে চাই, কোর্স শুরুর আগে আমাকে কোনো লেভেল নির্ধারণী পরীক্ষা দিতে হবে কি না। আগাম অনেক ধন্যবাদ।',
      ],
      FORMAL_END,
      MAHID_HASAN,
    ],
    [
      { term: 'stattfinden', bn: 'অনুষ্ঠিত হওয়া, হওয়া (কোর্স, মিটিং ইত্যাদি)।' },
      { term: 'der Einstufungstest', bn: 'লেভেল নির্ধারণী পরীক্ষা।' },
      { term: 'Vielen Dank im Voraus.', bn: 'আগাম অনেক ধন্যবাদ।' },
    ],
  ),
  email(
    'decline-party',
    'informell',
    { de: 'Eine Einladung ablehnen', bn: 'বন্ধুর দাওয়াতে না বলা', en: 'Declining an invitation' },
    [
      ['Hallo Daniel,', 'হ্যালো ড্যানিয়েল,'],
      [
        'vielen Dank für deine Einladung! Ich habe mich sehr gefreut, dass du an mich gedacht hast. Leider kann ich am Freitag nicht zu deiner Feier kommen, weil ich an diesem Tag eine wichtige Prüfung vorbereiten muss. Ich finde es wirklich schade, dass ich nicht dabei sein kann. Ich hoffe, du hast trotzdem einen tollen Abend mit deinen Freunden. Wie wäre es, wenn wir uns am Sonntag treffen? Dann können wir zusammen etwas essen und in Ruhe reden.',
        'তোমার দাওয়াতের জন্য অনেক ধন্যবাদ! তুমি আমার কথা ভেবেছ বলে আমি খুব খুশি হয়েছি। দুঃখের বিষয়, শুক্রবার আমি তোমার অনুষ্ঠানে আসতে পারব না, কারণ সেদিন আমাকে একটা গুরুত্বপূর্ণ পরীক্ষার প্রস্তুতি নিতে হবে। থাকতে পারছি না বলে সত্যিই খারাপ লাগছে। আশা করি তবুও বন্ধুদের সাথে তোমার সন্ধ্যাটা দারুণ কাটবে। রবিবার দেখা করলে কেমন হয়? তখন আমরা একসাথে কিছু খেতে আর নিরিবিলিতে গল্প করতে পারব।',
      ],
      LIEBE_GRUESSE,
      MAHID,
    ],
    [
      { term: 'an jemanden denken', bn: 'কারও কথা ভাবা।' },
      { term: 'Ich finde es schade, dass …', bn: '… বলে খারাপ লাগছে, আফসোস হচ্ছে।' },
      { term: 'Wie wäre es, wenn …?', bn: '… করলে কেমন হয়? নতুন কিছু প্রস্তাব করার ভদ্র উপায়।' },
    ],
  ),
  email(
    'restaurant',
    'informell',
    { de: 'Ein Restaurant empfehlen', bn: 'রেস্টুরেন্টের পরামর্শ দেওয়া', en: 'Recommending a restaurant' },
    [
      ['Hallo Lisa,', 'হ্যালো লিসা,'],
      [
        'wie schön, dass du bald meine Stadt besuchst! Ich kenne ein Restaurant, das dir bestimmt gefallen wird. Dort gibt es viele leckere Gerichte, und die Preise sind ziemlich günstig. Besonders gut finde ich das Essen, weil es frisch zubereitet wird. Außerdem ist das Restaurant leicht mit dem Bus zu erreichen. Wenn du möchtest, können wir dort zusammen essen gehen. Ich kenne auch einen schönen Park in der Nähe, in dem wir danach spazieren gehen könnten. Wann kommst du genau an?',
        'কী দারুণ যে তুমি শিগগিরই আমার শহরে বেড়াতে আসছ! আমি একটা রেস্টুরেন্ট চিনি, যেটা তোমার নিশ্চয়ই ভালো লাগবে। সেখানে অনেক মজার খাবার পাওয়া যায়, আর দামও বেশ কম। খাবারটা আমার বিশেষভাবে ভালো লাগে, কারণ তা টাটকা রান্না করা হয়। তাছাড়া বাসে করে রেস্টুরেন্টটায় সহজেই যাওয়া যায়। তুমি চাইলে আমরা সেখানে একসাথে খেতে যেতে পারি। কাছেই একটা সুন্দর পার্কও আমি চিনি, যেখানে আমরা পরে হাঁটতে পারি। তুমি ঠিক কখন পৌঁছাচ্ছ?',
      ],
      LIEBE_GRUESSE,
      MAHID,
    ],
    [
      { term: 'das Gericht', bn: 'খাবারের পদ, ডিশ।' },
      { term: 'günstig', bn: 'সস্তা, কম দামের।' },
      { term: 'leicht zu erreichen sein', bn: 'সহজে যাওয়া যায়, সহজে পৌঁছানো যায়।' },
    ],
  ),
  email(
    'sports-club',
    'formell',
    { de: 'Mitgliedschaft im Sportverein', bn: 'ক্রীড়া ক্লাবের সদস্যপদ নিয়ে জানতে চাওয়া', en: 'Asking about a sports club' },
    [
      DAMEN_HERREN,
      [
        'ich interessiere mich für Ihren Sportverein und möchte gern regelmäßig Sport treiben, um fit und gesund zu bleiben. Besonders interessiere ich mich für Badminton und Fitness. Könnten Sie mir bitte mitteilen, ob Sie diese Sportarten anbieten und an welchen Tagen das Training stattfindet? Außerdem möchte ich wissen, wie hoch die monatlichen Mitgliedsbeiträge sind und ob ich zuerst an einem kostenlosen Probetraining teilnehmen kann. Vielen Dank für Ihre Informationen.',
        'আমি আপনাদের ক্রীড়া ক্লাবে আগ্রহী এবং সুস্থ ও ফিট থাকার জন্য নিয়মিত খেলাধুলা করতে চাই। আমি বিশেষ করে ব্যাডমিন্টন আর ফিটনেসে আগ্রহী। আপনি কি অনুগ্রহ করে জানাতে পারবেন, আপনারা এই খেলাগুলো করান কি না এবং কোন কোন দিনে অনুশীলন হয়? এছাড়া আমি জানতে চাই, মাসিক সদস্য ফি কত এবং প্রথমে আমি একটি বিনামূল্যের ট্রায়াল সেশনে অংশ নিতে পারব কি না। তথ্যের জন্য অনেক ধন্যবাদ।',
      ],
      FORMAL_END,
      MAHID_HASAN,
    ],
    [
      { term: 'Sport treiben', bn: 'খেলাধুলা বা ব্যায়াম করা।' },
      { term: 'der Mitgliedsbeitrag', bn: 'সদস্য ফি, চাঁদা।' },
      { term: 'das Probetraining', bn: 'পরীক্ষামূলক প্রথম অনুশীলন, ট্রায়াল সেশন।' },
    ],
  ),
  email(
    'sport-together',
    'informell',
    { de: 'Zusammen Sport machen', bn: 'একসাথে ব্যায়ামের পরিকল্পনা', en: 'Making plans for exercise' },
    [
      ['Hallo Jonas,', 'হ্যালো ইয়োনাস,'],
      [
        'ich möchte in Zukunft mehr Sport machen, weil ich in letzter Zeit zu viel Zeit vor dem Computer verbringe. Ich dachte, dass wir zusammen joggen oder Fahrrad fahren könnten. So bleiben wir fit und können gleichzeitig etwas Zeit miteinander verbringen. Wie wäre es, wenn wir jeden Samstagmorgen im Park trainieren? Wir könnten uns um 8 Uhr am Haupteingang treffen. Wenn dir diese Zeit nicht passt, können wir natürlich auch einen anderen Termin finden. Was meinst du dazu?',
        'আমি এখন থেকে বেশি ব্যায়াম করতে চাই, কারণ ইদানীং আমি কম্পিউটারের সামনে অনেক বেশি সময় কাটাই। ভাবছিলাম, আমরা একসাথে জগিং করতে বা সাইকেল চালাতে পারি। এভাবে আমরা ফিট থাকব আর একই সাথে একে অপরের সাথে কিছু সময়ও কাটাতে পারব। প্রতি শনিবার সকালে পার্কে ব্যায়াম করলে কেমন হয়? আমরা সকাল ৮টায় প্রধান ফটকে দেখা করতে পারি। এই সময় তোমার সুবিধা না হলে অবশ্যই আমরা অন্য কোনো সময় ঠিক করতে পারি। তুমি কী বলো?',
      ],
      VIELE_GRUESSE,
      MAHID,
    ],
    [
      { term: 'in letzter Zeit', bn: 'ইদানীং, সম্প্রতি।' },
      { term: 'gleichzeitig', bn: 'একই সময়ে, একসাথে।' },
      { term: 'jemandem passen', bn: 'কারও সুবিধা হওয়া (সময় বা তারিখ নিয়ে)।' },
    ],
  ),
  email(
    'flat-enquiry',
    'formell',
    { de: 'Anfrage zu einer Wohnung', bn: 'ভাড়ার ফ্ল্যাট সম্পর্কে জানতে চাওয়া', en: 'Asking about a rental flat' },
    [
      DAMEN_HERREN,
      [
        'ich habe Ihre Anzeige für die Wohnung im Internet gelesen und interessiere mich sehr dafür. Ich suche eine kleine Wohnung, die gut mit öffentlichen Verkehrsmitteln erreichbar ist. Könnten Sie mir bitte mitteilen, wie hoch die monatliche Miete einschließlich Nebenkosten ist? Außerdem möchte ich gern wissen, ob die Wohnung möbliert ist. Wenn möglich, würde ich sie gern am kommenden Samstag besichtigen. Ich freue mich auf Ihre Antwort.',
        'আমি ইন্টারনেটে ফ্ল্যাটটির জন্য আপনার বিজ্ঞাপন পড়েছি এবং এতে আমি খুব আগ্রহী। আমি একটি ছোট ফ্ল্যাট খুঁজছি, যেখান থেকে গণপরিবহনে সহজে যাতায়াত করা যায়। আপনি কি অনুগ্রহ করে জানাতে পারবেন, আনুষঙ্গিক খরচসহ মাসিক ভাড়া কত? এছাড়া আমি জানতে চাই, ফ্ল্যাটটি আসবাবসহ কি না। সম্ভব হলে আমি আগামী শনিবার ফ্ল্যাটটি দেখতে চাই। আপনার উত্তরের অপেক্ষায় রইলাম।',
      ],
      FORMAL_END,
      MAHID_HASAN,
    ],
    [
      { term: 'die Nebenkosten', bn: 'ভাড়ার বাইরে আনুষঙ্গিক খরচ (পানি, হিটিং, ময়লা ইত্যাদি)।' },
      { term: 'möbliert', bn: 'আসবাবসহ।' },
      { term: 'besichtigen', bn: 'সরেজমিনে দেখা (ফ্ল্যাট, শহর ইত্যাদি)।' },
    ],
  ),
  email(
    'computer-help',
    'informell',
    { de: 'Ein Computerproblem', bn: 'কম্পিউটারের সমস্যায় সাহায্য চাওয়া', en: 'Asking for technical help' },
    [
      ['Hallo Alex,', 'হ্যালো অ্যালেক্স,'],
      [
        'ich brauche deine Hilfe mit meinem Computer. Seit gestern startet er sehr langsam, und manchmal bleibt der Bildschirm einfach stehen. Ich habe bereits versucht, den Computer neu zu starten und einige unnötige Dateien zu löschen. Leider hat das nicht geholfen. Da du dich mit Computern gut auskennst, wollte ich fragen, ob du dir das Problem einmal ansehen könntest. Hast du vielleicht am Wochenende Zeit? Ich kann zu dir kommen oder du kannst mich besuchen. Vielen Dank schon einmal!',
        'আমার কম্পিউটার নিয়ে তোমার সাহায্য দরকার। গতকাল থেকে এটা খুব ধীরে চালু হচ্ছে, আর মাঝে মাঝে স্ক্রিন একদম আটকে যায়। আমি ইতিমধ্যে কম্পিউটারটা রিস্টার্ট করে আর কিছু অপ্রয়োজনীয় ফাইল মুছে চেষ্টা করেছি। দুঃখের বিষয়, তাতে কাজ হয়নি। যেহেতু তুমি কম্পিউটার ভালো বোঝো, তাই জিজ্ঞেস করতে চাইছিলাম তুমি একবার সমস্যাটা দেখে দিতে পারবে কি না। সপ্তাহান্তে কি তোমার সময় হবে? আমি তোমার কাছে আসতে পারি, অথবা তুমি আমার এখানে আসতে পারো। আগেই অনেক ধন্যবাদ!',
      ],
      VIELE_GRUESSE,
      MAHID,
    ],
    [
      { term: 'sich mit etwas auskennen', bn: 'কোনো বিষয়ে ভালো জানা বা বোঝা।' },
      { term: 'stehen bleiben', bn: 'আটকে যাওয়া, থেমে যাওয়া।' },
      { term: 'sich etwas ansehen', bn: 'কোনো কিছু ভালো করে দেখা বা পরীক্ষা করা।' },
    ],
  ),
  email(
    'library',
    'formell',
    { de: 'Mitgliedschaft in der Bibliothek', bn: 'লাইব্রেরির সদস্যপদ নিয়ে জানতে চাওয়া', en: 'Library membership' },
    [
      DAMEN_HERREN,
      [
        'ich interessiere mich für eine Mitgliedschaft in Ihrer Bibliothek, weil ich gern Bücher lese und meine Sprachkenntnisse verbessern möchte. Könnten Sie mir bitte mitteilen, wie ich mich anmelden kann und welche Dokumente ich dafür benötige? Außerdem möchte ich wissen, ob die Mitgliedschaft kostenlos ist und wie lange ich Bücher ausleihen darf. Da ich tagsüber arbeite, wären auch Informationen über Ihre Öffnungszeiten am Abend sehr hilfreich. Vielen Dank im Voraus.',
        'আমি আপনাদের লাইব্রেরির সদস্য হতে আগ্রহী, কারণ আমি বই পড়তে ভালোবাসি এবং আমার ভাষাজ্ঞান উন্নত করতে চাই। আপনি কি অনুগ্রহ করে জানাতে পারবেন, আমি কীভাবে নিবন্ধন করতে পারি এবং এর জন্য কোন কোন কাগজপত্র লাগবে? এছাড়া আমি জানতে চাই, সদস্যপদ বিনামূল্যে কি না এবং কত দিনের জন্য বই ধার নেওয়া যায়। যেহেতু আমি দিনের বেলা কাজ করি, তাই সন্ধ্যার খোলার সময় সম্পর্কে তথ্যও খুব কাজে আসবে। আগাম অনেক ধন্যবাদ।',
      ],
      FORMAL_END,
      MAHID_HASAN,
    ],
    [
      { term: 'die Mitgliedschaft', bn: 'সদস্যপদ।' },
      { term: 'ausleihen', bn: 'ধার নেওয়া (বই ইত্যাদি)।' },
      { term: 'die Öffnungszeiten', bn: 'খোলা থাকার সময়।' },
    ],
  ),
  email(
    'course-report',
    'informell',
    { de: 'Über einen Deutschkurs berichten', bn: 'বন্ধুকে জার্মান কোর্সের কথা বলা', en: 'Telling a friend about a language course' },
    [
      ['Hallo Sophie,', 'হ্যালো সোফি,'],
      [
        'seit einem Monat besuche ich einen Deutschkurs, und ich möchte dir erzählen, wie es läuft. Unser Lehrer ist sehr freundlich und erklärt die Grammatik mit vielen Beispielen. Besonders gut finde ich die Partnerübungen, weil wir dabei viel sprechen können. Allerdings finde ich das Schreiben noch schwierig, obwohl ich jeden Tag übe. Deshalb möchte ich zu Hause mehr E-Mails und Briefe schreiben. Hättest du Lust, gemeinsam mit mir Deutsch zu lernen? Wir könnten uns zweimal pro Woche online treffen. Ich freue mich auf deine Antwort!',
        'এক মাস ধরে আমি একটা জার্মান কোর্স করছি, আর কেমন চলছে তা তোমাকে বলতে চাই। আমাদের শিক্ষক খুব আন্তরিক, আর অনেক উদাহরণ দিয়ে ব্যাকরণ বোঝান। জোড়ায় জোড়ায় অনুশীলনগুলো আমার বিশেষ ভালো লাগে, কারণ তাতে আমরা অনেক কথা বলতে পারি। তবে লেখাটা এখনো আমার কাছে কঠিন লাগে, যদিও আমি প্রতিদিন অনুশীলন করি। তাই আমি বাসায় আরও বেশি ইমেইল আর চিঠি লিখতে চাই। আমার সাথে মিলে জার্মান শিখতে কি তোমার ইচ্ছে আছে? আমরা সপ্তাহে দুবার অনলাইনে দেখা করতে পারি। তোমার উত্তরের অপেক্ষায় রইলাম!',
      ],
      LIEBE_GRUESSE,
      MAHID,
    ],
    [
      { term: 'Wie läuft es?', bn: 'কেমন চলছে? কোনো কিছুর অগ্রগতি জানতে চাওয়া।' },
      { term: 'üben', bn: 'অনুশীলন করা।' },
      { term: 'zweimal pro Woche', bn: 'সপ্তাহে দুবার।' },
    ],
  ),
  email(
    'bank-account',
    'formell',
    { de: 'Ein Bankkonto eröffnen', bn: 'ব্যাংক অ্যাকাউন্ট খোলা নিয়ে জানতে চাওয়া', en: 'Asking about a bank account' },
    [
      DAMEN_HERREN,
      [
        'ich möchte gern ein Girokonto bei Ihrer Bank eröffnen, da ich ein Konto für mein Gehalt und meine täglichen Ausgaben benötige. Könnten Sie mir bitte Informationen über die monatlichen Kontogebühren und die Kosten für eine Bankkarte geben? Außerdem möchte ich wissen, welche Dokumente ich für die Kontoeröffnung benötige und ob ich dafür einen Termin vereinbaren muss. Über eine kurze Antwort würde ich mich sehr freuen.',
        'আমি আপনাদের ব্যাংকে একটি চলতি হিসাব খুলতে চাই, কারণ আমার বেতন আর দৈনন্দিন খরচের জন্য একটি অ্যাকাউন্ট দরকার। আপনি কি অনুগ্রহ করে মাসিক অ্যাকাউন্ট ফি আর ব্যাংক কার্ডের খরচ সম্পর্কে আমাকে তথ্য দিতে পারবেন? এছাড়া আমি জানতে চাই, অ্যাকাউন্ট খোলার জন্য কোন কোন কাগজপত্র লাগবে এবং এর জন্য আমাকে অ্যাপয়েন্টমেন্ট নিতে হবে কি না। একটি সংক্ষিপ্ত উত্তর পেলে আমি খুব খুশি হব।',
      ],
      FORMAL_END,
      MAHID_HASAN,
    ],
    [
      { term: 'das Girokonto', bn: 'চলতি হিসাব, সাধারণ ব্যাংক অ্যাকাউন্ট।' },
      { term: 'einen Termin vereinbaren', bn: 'অ্যাপয়েন্টমেন্ট ঠিক করা।' },
      { term: 'Über … würde ich mich sehr freuen.', bn: '… পেলে আমি খুব খুশি হব। আনুষ্ঠানিক চিঠির ভদ্র সমাপ্তি।' },
    ],
  ),
  email(
    'moving-away',
    'informell',
    { de: 'Umzug in eine andere Stadt', bn: 'অন্য শহরে চলে যাওয়ার খবর', en: 'Telling a friend about moving away' },
    [
      ['Hallo Maria,', 'হ্যালো মারিয়া,'],
      [
        'ich wollte dir etwas Wichtiges erzählen: Nächsten Monat ziehe ich nach Hamburg, weil ich dort eine neue Arbeitsstelle gefunden habe. Einerseits freue ich mich auf diese neue Möglichkeit, andererseits bin ich traurig, weil ich meine Freunde hier vermissen werde. Ich hoffe aber, dass wir trotzdem in Kontakt bleiben. Wir können regelmäßig telefonieren oder uns über das Internet Nachrichten schicken. Außerdem kannst du mich jederzeit besuchen, wenn du in Hamburg bist. Lass uns vor meinem Umzug noch einmal zusammen essen gehen!',
        'তোমাকে একটা গুরুত্বপূর্ণ কথা বলতে চাইছিলাম: আগামী মাসে আমি হামবুর্গে চলে যাচ্ছি, কারণ সেখানে একটা নতুন চাকরি পেয়েছি। একদিকে এই নতুন সুযোগ নিয়ে আমি খুশি, অন্যদিকে আমার মন খারাপ, কারণ এখানকার বন্ধুদের আমি মিস করব। তবে আশা করি তবুও আমরা যোগাযোগ রাখব। আমরা নিয়মিত ফোনে কথা বলতে পারি বা ইন্টারনেটে একে অপরকে মেসেজ পাঠাতে পারি। তাছাড়া তুমি হামবুর্গে এলে যেকোনো সময় আমার কাছে বেড়াতে আসতে পারো। চলো, আমার চলে যাওয়ার আগে আরেকবার একসাথে খেতে যাই!',
      ],
      LIEBE_GRUESSE,
      MAHID,
    ],
    [
      { term: 'einerseits …, andererseits …', bn: 'একদিকে …, অন্যদিকে …।' },
      { term: 'vermissen', bn: 'কারও বা কিছুর অভাব বোধ করা, মিস করা।' },
      { term: 'in Kontakt bleiben', bn: 'যোগাযোগ রাখা।' },
    ],
  ),
  email(
    'exam-info',
    'formell',
    { de: 'Informationen über eine Prüfung', bn: 'পরীক্ষা সম্পর্কে তথ্য চাওয়া', en: 'Asking about an exam' },
    [
      DAMEN_HERREN,
      [
        'ich möchte in nächster Zeit die Goethe-Zertifikat-B1-Prüfung ablegen und interessiere mich für Ihre Prüfungstermine. Könnten Sie mir bitte mitteilen, wann die nächste Prüfung stattfindet und wie hoch die Prüfungsgebühr ist? Außerdem möchte ich wissen, welche Dokumente ich für die Anmeldung benötige und bis wann ich mich anmelden muss. Da ich mich bereits auf die Prüfung vorbereite, wäre ich Ihnen für eine schnelle Antwort sehr dankbar.',
        'আমি শিগগিরই Goethe-Zertifikat B1 পরীক্ষা দিতে চাই এবং আপনাদের পরীক্ষার তারিখগুলো জানতে আগ্রহী। আপনি কি অনুগ্রহ করে জানাতে পারবেন, পরের পরীক্ষা কবে হবে এবং পরীক্ষার ফি কত? এছাড়া আমি জানতে চাই, নিবন্ধনের জন্য কোন কোন কাগজপত্র লাগবে এবং কত তারিখের মধ্যে নিবন্ধন করতে হবে। যেহেতু আমি ইতিমধ্যে পরীক্ষার প্রস্তুতি নিচ্ছি, তাই দ্রুত উত্তর পেলে আমি আপনার কাছে খুব কৃতজ্ঞ থাকব।',
      ],
      FORMAL_END,
      MAHID_HASAN,
    ],
    [
      { term: 'eine Prüfung ablegen', bn: 'পরীক্ষা দেওয়া।' },
      { term: 'die Anmeldung', bn: 'নিবন্ধন, নাম লেখানো।' },
      { term: 'Ich wäre Ihnen sehr dankbar.', bn: 'আমি আপনার কাছে খুব কৃতজ্ঞ থাকব।' },
    ],
  ),
  email(
    'exam-passed',
    'informell',
    { de: 'Prüfung bestanden', bn: 'পরীক্ষায় পাসের সুখবর', en: 'Sharing good news' },
    [
      ['Hallo Sara,', 'হ্যালো সারা,'],
      [
        'ich habe eine tolle Nachricht: Ich habe meine Deutschprüfung bestanden! Ich bin wirklich glücklich, weil ich in den letzten Monaten sehr viel gelernt habe. Besonders das Schreiben war schwierig für mich, aber meine Vorbereitung hat sich gelohnt. Jetzt möchte ich meine Freude mit meinen Freunden teilen. Hast du am Samstag Zeit? Ich würde dich gern zum Essen einladen, damit wir zusammen feiern können. Ohne deine Unterstützung wäre das Lernen manchmal viel schwieriger gewesen. Bis bald!',
        'আমার কাছে একটা দারুণ খবর আছে: আমি আমার জার্মান পরীক্ষায় পাস করেছি! আমি সত্যিই খুব খুশি, কারণ গত কয়েক মাস আমি অনেক পড়াশোনা করেছি। বিশেষ করে লেখার অংশটা আমার জন্য কঠিন ছিল, কিন্তু আমার প্রস্তুতি সার্থক হয়েছে। এখন আমি আমার আনন্দ বন্ধুদের সাথে ভাগ করে নিতে চাই। শনিবার কি তোমার সময় আছে? আমি তোমাকে খাওয়াতে নিয়ে যেতে চাই, যাতে আমরা একসাথে উদযাপন করতে পারি। তোমার সহযোগিতা না থাকলে পড়াশোনাটা মাঝে মাঝে অনেক বেশি কঠিন হয়ে যেত। শিগগিরই দেখা হবে!',
      ],
      LIEBE_GRUESSE,
      MAHID,
    ],
    [
      { term: 'eine Prüfung bestehen', bn: 'পরীক্ষায় পাস করা।' },
      { term: 'sich lohnen', bn: 'সার্থক হওয়া, কষ্টের মূল্য পাওয়া।' },
      { term: 'wäre … gewesen', bn: '… হয়ে যেত (কিন্তু হয়নি)। অতীতের কাল্পনিক অবস্থা।' },
    ],
  ),
  email(
    'doctor',
    'formell',
    { de: 'Termin beim Arzt', bn: 'ডাক্তারের অ্যাপয়েন্টমেন্ট চাওয়া', en: 'Asking for a doctor’s appointment' },
    [
      DAMEN_HERREN,
      [
        'seit drei Tagen habe ich starke Kopfschmerzen und Fieber. Außerdem fühle ich mich sehr müde, weshalb ich mich nicht gut konzentrieren kann. Ich möchte mich gern von einem Arzt untersuchen lassen. Deshalb möchte ich fragen, ob ich in den nächsten Tagen einen Termin bekommen könnte. Am besten passt mir ein Termin am Vormittag, da ich am Nachmittag arbeiten muss. Bitte teilen Sie mir mit, wann ein Termin möglich ist. Vielen Dank für Ihre Hilfe.',
        'তিন দিন ধরে আমার প্রচণ্ড মাথাব্যথা আর জ্বর। তাছাড়া আমি খুব ক্লান্ত বোধ করছি, যে কারণে ঠিকমতো মনোযোগ দিতে পারছি না। আমি একজন ডাক্তারকে দিয়ে নিজেকে পরীক্ষা করাতে চাই। তাই জানতে চাই, আগামী কয়েক দিনের মধ্যে আমি একটি অ্যাপয়েন্টমেন্ট পেতে পারি কি না। সকালের দিকে অ্যাপয়েন্টমেন্ট হলে আমার সবচেয়ে সুবিধা হয়, কারণ বিকেলে আমাকে কাজ করতে হয়। অনুগ্রহ করে আমাকে জানান, কখন অ্যাপয়েন্টমেন্ট পাওয়া সম্ভব। আপনার সাহায্যের জন্য অনেক ধন্যবাদ।',
      ],
      FORMAL_END,
      MAHID_HASAN,
    ],
    [
      { term: 'sich untersuchen lassen', bn: 'ডাক্তার দিয়ে নিজেকে পরীক্ষা করানো।' },
      { term: 'weshalb', bn: 'যে কারণে, যার ফলে।' },
      { term: 'Bitte teilen Sie mir mit, …', bn: 'অনুগ্রহ করে আমাকে জানান, …। আনুষ্ঠানিক অনুরোধ।' },
    ],
  ),
  email(
    'misunderstanding',
    'informell',
    { de: 'Ein Missverständnis klären', bn: 'ভুল বোঝাবুঝি মেটানো', en: 'Clearing up a misunderstanding' },
    [
      ['Hallo David,', 'হ্যালো ডেভিড,'],
      [
        'ich glaube, es gab ein Missverständnis zwischen uns. Du denkst vielleicht, dass ich dich absichtlich nicht angerufen habe, aber das stimmt nicht. Mein Handy war kaputt, und ich konnte deine Nachrichten einige Tage lang nicht lesen. Es tut mir leid, dass ich mich nicht früher bei dir gemeldet habe. Unsere Freundschaft ist mir wichtig, deshalb möchte ich nicht, dass wir wegen dieses Problems streiten. Können wir uns diese Woche treffen und in Ruhe darüber sprechen?',
        'আমার মনে হয়, আমাদের মধ্যে একটা ভুল বোঝাবুঝি হয়েছে। তুমি হয়তো ভাবছ যে আমি ইচ্ছা করে তোমাকে ফোন করিনি, কিন্তু সেটা সত্যি নয়। আমার মোবাইলটা নষ্ট ছিল, আর কয়েক দিন ধরে আমি তোমার মেসেজগুলো পড়তে পারিনি। তোমার সাথে আগে যোগাযোগ করিনি বলে আমি দুঃখিত। আমাদের বন্ধুত্ব আমার কাছে গুরুত্বপূর্ণ, তাই আমি চাই না এই সমস্যার কারণে আমরা ঝগড়া করি। আমরা কি এই সপ্তাহে দেখা করে শান্তভাবে এটা নিয়ে কথা বলতে পারি?',
      ],
      LIEBE_GRUESSE,
      MAHID,
    ],
    [
      { term: 'das Missverständnis', bn: 'ভুল বোঝাবুঝি।' },
      { term: 'sich bei jemandem melden', bn: 'কারও সাথে যোগাযোগ করা, খোঁজ নেওয়া।' },
      { term: 'streiten', bn: 'ঝগড়া করা, তর্ক করা।' },
    ],
  ),
  email(
    'part-time-job',
    'formell',
    { de: 'Bewerbung um einen Nebenjob', bn: 'খণ্ডকালীন চাকরির আবেদন', en: 'Applying for a part-time job' },
    [
      DAMEN_HERREN,
      [
        'mit großem Interesse habe ich Ihre Anzeige für einen Nebenjob gelesen. Hiermit möchte ich mich für die angebotene Stelle bewerben. Ich habe bereits Erfahrungen im Kundenservice gesammelt und kann gut mit Menschen umgehen. Außerdem bin ich zuverlässig, freundlich und arbeite gern im Team. Ich könnte ab nächstem Monat anfangen und bin zeitlich flexibel. Über eine Einladung zu einem Vorstellungsgespräch würde ich mich sehr freuen. Meinen Lebenslauf kann ich Ihnen gern zusenden.',
        'খণ্ডকালীন চাকরির জন্য আপনাদের বিজ্ঞাপনটি আমি খুব আগ্রহ নিয়ে পড়েছি। এর মাধ্যমে আমি প্রস্তাবিত পদটির জন্য আবেদন করতে চাই। গ্রাহকসেবায় আমার আগে থেকেই অভিজ্ঞতা আছে এবং আমি মানুষের সাথে ভালোভাবে মিশতে পারি। এছাড়া আমি নির্ভরযোগ্য, বন্ধুসুলভ এবং দলবদ্ধভাবে কাজ করতে পছন্দ করি। আমি আগামী মাস থেকে কাজ শুরু করতে পারি এবং সময়ের ব্যাপারে আমি নমনীয়। একটি ইন্টারভিউয়ের আমন্ত্রণ পেলে আমি খুব খুশি হব। আমার জীবনবৃত্তান্ত আমি সানন্দে আপনাকে পাঠাতে পারি।',
      ],
      FORMAL_END,
      MAHID_HASAN,
    ],
    [
      { term: 'sich bewerben', bn: 'কোনো পদের জন্য আবেদন করা।' },
      { term: 'mit Menschen umgehen', bn: 'মানুষের সাথে আচরণ করা, মিশতে পারা।' },
      { term: 'das Vorstellungsgespräch', bn: 'চাকরির ইন্টারভিউ।' },
    ],
  ),
  email(
    'internship',
    'formell',
    { de: 'Anfrage zu einem Praktikum', bn: 'ইন্টার্নশিপের জন্য জানতে চাওয়া', en: 'Asking for an internship' },
    [
      DAMEN_HERREN,
      [
        'ich studiere derzeit Informatik und möchte gern praktische Erfahrungen in Ihrem Unternehmen sammeln. Besonders interessiere ich mich für den Bereich IT-Support, da ich gern technische Probleme löse und Menschen bei der Nutzung von Computern helfe. Deshalb möchte ich fragen, ob Sie in den kommenden Monaten Praktikumsplätze anbieten. Ich würde gern wissen, wie lange das Praktikum dauert und welche Voraussetzungen dafür erforderlich sind. Über eine Rückmeldung würde ich mich sehr freuen.',
        'আমি বর্তমানে কম্পিউটার বিজ্ঞান পড়ছি এবং আপনাদের প্রতিষ্ঠানে হাতে-কলমে অভিজ্ঞতা অর্জন করতে চাই। আমি বিশেষ করে আইটি সাপোর্ট বিভাগে আগ্রহী, কারণ আমি প্রযুক্তিগত সমস্যার সমাধান করতে এবং কম্পিউটার ব্যবহারে মানুষকে সাহায্য করতে ভালোবাসি। তাই জানতে চাই, আগামী কয়েক মাসে আপনারা ইন্টার্নশিপের সুযোগ দিচ্ছেন কি না। আমি জানতে চাই, ইন্টার্নশিপ কত দিনের এবং এর জন্য কী কী যোগ্যতা দরকার। আপনার কাছ থেকে উত্তর পেলে আমি খুব খুশি হব।',
      ],
      FORMAL_END,
      MAHID_HASAN,
    ],
    [
      { term: 'Erfahrungen sammeln', bn: 'অভিজ্ঞতা অর্জন করা।' },
      { term: 'die Voraussetzung', bn: 'পূর্বশর্ত, প্রয়োজনীয় যোগ্যতা।' },
      { term: 'die Rückmeldung', bn: 'উত্তর, প্রতিক্রিয়া জানানো।' },
    ],
  ),
  email(
    'late-delivery',
    'formell',
    { de: 'Verspätete Lieferung', bn: 'দেরিতে আসা পার্সেল নিয়ে জানতে চাওয়া', en: 'Late delivery' },
    [
      DAMEN_HERREN,
      [
        'vor zehn Tagen habe ich in Ihrem Onlineshop eine Tastatur bestellt. Laut Ihrer Bestätigung sollte das Paket innerhalb von fünf Werktagen ankommen. Leider habe ich die Lieferung bisher nicht erhalten. Da ich die Tastatur für meine tägliche Arbeit benötige, ist die Verspätung für mich sehr problematisch. Könnten Sie bitte prüfen, wo sich mein Paket befindet? Außerdem möchte ich wissen, wann ich mit der Lieferung rechnen kann. Vielen Dank für Ihre Unterstützung.',
        'দশ দিন আগে আমি আপনাদের অনলাইন শপ থেকে একটি কিবোর্ড অর্ডার করেছি। আপনাদের নিশ্চিতকরণ বার্তা অনুযায়ী পাঁচ কর্মদিবসের মধ্যে প্যাকেটটি পৌঁছানোর কথা ছিল। দুঃখের বিষয়, এখনো পর্যন্ত আমি পণ্যটি পাইনি। যেহেতু প্রতিদিনের কাজের জন্য কিবোর্ডটি আমার দরকার, তাই এই দেরি আমার জন্য বড় সমস্যা। আপনি কি অনুগ্রহ করে দেখবেন, আমার প্যাকেটটি এখন কোথায় আছে? এছাড়া আমি জানতে চাই, কবে নাগাদ পণ্যটি পেতে পারি। আপনার সহযোগিতার জন্য অনেক ধন্যবাদ।',
      ],
      FORMAL_END,
      MAHID_HASAN,
    ],
    [
      { term: 'laut', bn: '… অনুযায়ী (laut Ihrer Bestätigung = আপনাদের নিশ্চিতকরণ অনুযায়ী)।' },
      { term: 'der Werktag', bn: 'কর্মদিবস (রবিবার ও ছুটির দিন বাদে)।' },
      { term: 'mit etwas rechnen', bn: 'কোনো কিছু আশা করা, ধরে নেওয়া।' },
    ],
  ),
  email(
    'family-visit',
    'informell',
    { de: 'Besuch bei der Familie', bn: 'আত্মীয়ের বাসায় বেড়াতে যাওয়ার কথা', en: 'Planning a visit to a relative' },
    [
      ['Hallo Amir,', 'হ্যালো আমির,'],
      [
        'wie geht es dir und deiner Familie? Ich würde euch gern nächsten Monat besuchen, weil wir uns schon lange nicht gesehen haben. Ich habe vor, für zwei oder drei Tage zu bleiben. Wir könnten zusammen essen, die Stadt besichtigen und uns über alles unterhalten, was in letzter Zeit passiert ist. Wäre es für euch in Ordnung, wenn ich bei euch übernachten würde? Falls das nicht möglich ist, kann ich natürlich auch ein Hotel buchen. Sag mir bitte, wann es euch am besten passt.',
        'তুমি আর তোমার পরিবার কেমন আছ? আমি আগামী মাসে তোমাদের কাছে বেড়াতে আসতে চাই, কারণ অনেক দিন আমাদের দেখা হয়নি। আমি দুই-তিন দিন থাকার পরিকল্পনা করছি। আমরা একসাথে খেতে পারি, শহর ঘুরে দেখতে পারি আর ইদানীং যা যা ঘটেছে সব নিয়ে গল্প করতে পারি। আমি তোমাদের বাসায় রাত কাটালে কি তোমাদের অসুবিধা হবে না? সেটা সম্ভব না হলে অবশ্যই আমি হোটেলও বুক করতে পারি। কখন তোমাদের সবচেয়ে সুবিধা হয়, আমাকে জানিও।',
      ],
      LIEBE_GRUESSE,
      MAHID,
    ],
    [
      { term: 'vorhaben, … zu …', bn: '… করার পরিকল্পনা করা।' },
      { term: 'übernachten', bn: 'রাত কাটানো, রাতে থাকা।' },
      { term: 'falls', bn: 'যদি (সম্ভাবনা বোঝাতে, wenn-এর মতো)।' },
    ],
  ),
  email(
    'damaged-order',
    'formell',
    { de: 'Beschwerde über eine Bestellung', bn: 'ক্ষতিগ্রস্ত অর্ডার নিয়ে অভিযোগ', en: 'Complaint about an order' },
    [
      DAMEN_HERREN,
      [
        'letzte Woche habe ich bei Ihnen einen Laptop bestellt. Leider habe ich das Gerät gestern beschädigt erhalten. Auf dem Bildschirm gibt es einen großen Riss, obwohl die Verpackung äußerlich in Ordnung war. Ich bin enttäuscht, weil ich den Laptop dringend für meine Arbeit brauche. Deshalb möchte ich Sie bitten, mir ein neues Gerät zu schicken. Falls das nicht möglich ist, möchte ich mein Geld zurückbekommen. Bitte informieren Sie mich über das weitere Vorgehen.',
        'গত সপ্তাহে আমি আপনাদের কাছ থেকে একটি ল্যাপটপ অর্ডার করেছি। দুঃখের বিষয়, গতকাল আমি যন্ত্রটি ক্ষতিগ্রস্ত অবস্থায় পেয়েছি। স্ক্রিনে একটি বড় ফাটল আছে, যদিও বাইরে থেকে প্যাকেটটি ঠিকঠাক ছিল। আমি হতাশ, কারণ কাজের জন্য ল্যাপটপটি আমার জরুরি দরকার। তাই আমি আপনাদের অনুরোধ করছি আমাকে একটি নতুন যন্ত্র পাঠাতে। সেটা সম্ভব না হলে আমি আমার টাকা ফেরত চাই। পরবর্তী পদক্ষেপ সম্পর্কে অনুগ্রহ করে আমাকে জানান।',
      ],
      FORMAL_END,
      MAHID_HASAN,
    ],
    [
      { term: 'beschädigt', bn: 'ক্ষতিগ্রস্ত, ভাঙা অবস্থায়।' },
      { term: 'enttäuscht', bn: 'হতাশ।' },
      { term: 'das weitere Vorgehen', bn: 'পরবর্তী পদক্ষেপ, এরপর কী করা হবে।' },
    ],
  ),
  email(
    'advice',
    'informell',
    { de: 'Einem Freund Rat geben', bn: 'বন্ধুকে পরামর্শ দেওয়া', en: 'Giving advice to a friend' },
    [
      ['Hallo Tim,', 'হ্যালো টিম,'],
      [
        'es tut mir leid zu hören, dass du momentan so viel Stress bei der Arbeit hast. Ich kann gut verstehen, dass du dich müde fühlst. Vielleicht solltest du versuchen, deine Aufgaben besser zu planen und regelmäßig kleine Pausen zu machen. Außerdem wäre es gut, wenn du nach der Arbeit nicht ständig an deine Arbeit denken würdest. Was hältst du davon, wenn wir am Wochenende zusammen spazieren gehen? Frische Luft hilft oft dabei, den Kopf frei zu bekommen. Pass gut auf dich auf!',
        'শুনে খারাপ লাগল যে এখন তোমার কাজে এত চাপ যাচ্ছে। তুমি যে ক্লান্ত বোধ করছ, তা আমি ভালোই বুঝতে পারছি। হয়তো তোমার কাজগুলো আরও ভালোভাবে পরিকল্পনা করার আর নিয়মিত ছোট ছোট বিরতি নেওয়ার চেষ্টা করা উচিত। তাছাড়া কাজের পরে সারাক্ষণ কাজের কথা না ভাবলে ভালো হতো। সপ্তাহান্তে আমরা একসাথে হাঁটতে গেলে কেমন হয়? তাজা বাতাস প্রায়ই মাথা হালকা করতে সাহায্য করে। নিজের যত্ন নিও!',
      ],
      LIEBE_GRUESSE,
      MAHID,
    ],
    [
      { term: 'Du solltest …', bn: 'তোমার … করা উচিত। পরামর্শ দেওয়ার ভদ্র উপায় (Konjunktiv II)।' },
      { term: 'Was hältst du davon, wenn …?', bn: '… করলে তোমার কী মনে হয়? মত জানতে চেয়ে প্রস্তাব দেওয়া।' },
      { term: 'den Kopf frei bekommen', bn: 'মাথা হালকা করা, দুশ্চিন্তা থেকে মুক্ত হওয়া।' },
    ],
  ),
  email(
    'hotel-complaint',
    'formell',
    { de: 'Beschwerde über ein Hotel', bn: 'হোটেল নিয়ে অভিযোগ', en: 'Complaint about a hotel' },
    [
      DAMEN_HERREN,
      [
        'vor einigen Tagen habe ich drei Nächte in Ihrem Hotel verbracht. Leider war ich mit meinem Aufenthalt nicht zufrieden. Das Zimmer war nicht sauber und die Klimaanlage funktionierte nicht. Außerdem war es nachts sehr laut, sodass ich kaum schlafen konnte. Ich hatte erwartet, dass das Zimmer sauber und ruhig ist, da ich für meinen Aufenthalt einen hohen Preis bezahlt habe. Ich möchte Sie deshalb um eine angemessene Entschädigung bitten. Ich hoffe auf eine baldige Antwort.',
        'কয়েক দিন আগে আমি আপনাদের হোটেলে তিন রাত কাটিয়েছি। দুঃখের বিষয়, আমার থাকার অভিজ্ঞতায় আমি সন্তুষ্ট ছিলাম না। রুমটি পরিষ্কার ছিল না এবং এসি কাজ করছিল না। তাছাড়া রাতে খুব শব্দ হতো, ফলে আমি প্রায় ঘুমাতেই পারিনি। আমি আশা করেছিলাম রুমটি পরিষ্কার ও শান্ত থাকবে, কারণ থাকার জন্য আমি বেশ চড়া দাম দিয়েছি। তাই আমি আপনাদের কাছে উপযুক্ত ক্ষতিপূরণ চাইছি। শিগগিরই উত্তর পাওয়ার আশা রাখি।',
      ],
      FORMAL_END,
      MAHID_HASAN,
    ],
    [
      { term: 'der Aufenthalt', bn: 'থাকা, অবস্থানকাল (হোটেল, শহর ইত্যাদিতে)।' },
      { term: 'sodass', bn: 'ফলে, যার কারণে।' },
      { term: 'die Entschädigung', bn: 'ক্ষতিপূরণ।' },
    ],
  ),
  email(
    'faulty-fridge',
    'formell',
    { de: 'Reklamation eines Produkts', bn: 'নষ্ট পণ্য নিয়ে অভিযোগ', en: 'Returning a faulty product' },
    [
      DAMEN_HERREN,
      [
        'am 10. Oktober habe ich in Ihrem Geschäft einen Kühlschrank gekauft. Leider funktioniert das Gerät seit gestern nicht mehr, obwohl es erst wenige Tage alt ist. Da ich meine Lebensmittel nicht länger aufbewahren kann, brauche ich dringend eine Lösung. Ich möchte Sie daher bitten, den Kühlschrank kostenlos zu reparieren oder durch ein neues Gerät zu ersetzen. Die Rechnung habe ich noch und kann sie Ihnen bei Bedarf zusenden. Bitte informieren Sie mich über einen möglichen Reparaturtermin.',
        '১০ অক্টোবর আমি আপনাদের দোকান থেকে একটি ফ্রিজ কিনেছি। দুঃখের বিষয়, যন্ত্রটির বয়স মাত্র কয়েক দিন হলেও গতকাল থেকে এটি আর কাজ করছে না। যেহেতু আমি আমার খাবার আর সংরক্ষণ করতে পারছি না, তাই আমার জরুরি সমাধান দরকার। তাই আমি আপনাদের অনুরোধ করছি ফ্রিজটি বিনামূল্যে মেরামত করতে অথবা একটি নতুন যন্ত্র দিয়ে বদলে দিতে। রসিদটি এখনো আমার কাছে আছে এবং প্রয়োজনে আমি তা আপনাদের পাঠাতে পারি। সম্ভাব্য মেরামতের তারিখ সম্পর্কে অনুগ্রহ করে আমাকে জানান।',
      ],
      FORMAL_END,
      MAHID_HASAN,
    ],
    [
      { term: 'ersetzen', bn: 'বদলে দেওয়া, প্রতিস্থাপন করা।' },
      { term: 'bei Bedarf', bn: 'প্রয়োজনে, দরকার হলে।' },
      { term: 'die Rechnung', bn: 'রসিদ, বিল।' },
    ],
  ),
  email(
    'train-delay',
    'formell',
    { de: 'Beschwerde über eine Zugverspätung', bn: 'ট্রেন দেরির অভিযোগ', en: 'Complaint about a delayed train' },
    [
      DAMEN_HERREN,
      [
        'am vergangenen Montag bin ich mit Ihrem Zug von Köln nach Berlin gefahren. Leider hatte der Zug eine Verspätung von fast zwei Stunden. Deshalb habe ich meinen wichtigen Anschlusstermin verpasst und musste ein Taxi nehmen, um rechtzeitig zu meinem nächsten Termin zu kommen. Ich hatte meine Reise sorgfältig geplant und bin mit dieser Situation sehr unzufrieden. Könnten Sie bitte prüfen, ob ich eine Entschädigung für die Verspätung und die zusätzlichen Kosten erhalten kann?',
        'গত সোমবার আমি আপনাদের ট্রেনে কোলন থেকে বার্লিনে গিয়েছিলাম। দুঃখের বিষয়, ট্রেনটি প্রায় দুই ঘণ্টা দেরি করেছিল। এর ফলে আমি আমার গুরুত্বপূর্ণ পরবর্তী অ্যাপয়েন্টমেন্টটি মিস করেছি এবং সময়মতো পরের অ্যাপয়েন্টমেন্টে পৌঁছানোর জন্য আমাকে ট্যাক্সি নিতে হয়েছে। আমি আমার যাত্রা যত্ন নিয়ে পরিকল্পনা করেছিলাম এবং এই পরিস্থিতিতে আমি খুবই অসন্তুষ্ট। আপনি কি অনুগ্রহ করে যাচাই করে দেখবেন, দেরি আর বাড়তি খরচের জন্য আমি কোনো ক্ষতিপূরণ পেতে পারি কি না?',
      ],
      FORMAL_END,
      MAHID_HASAN,
    ],
    [
      { term: 'die Verspätung', bn: 'দেরি, বিলম্ব।' },
      { term: 'verpassen', bn: 'হাতছাড়া করা, মিস করা (ট্রেন, অ্যাপয়েন্টমেন্ট)।' },
      { term: 'um … zu …', bn: '… করার জন্য। উদ্দেশ্য বোঝায়।' },
    ],
  ),
  email(
    'noise',
    'formell',
    { de: 'Beschwerde über Lärm', bn: 'প্রতিবেশীর শব্দ নিয়ে অভিযোগ', en: 'Complaint about noise' },
    [
      ['Sehr geehrte Frau Schneider,', 'সম্মানিত মিসেস শ্নাইডার,'],
      [
        'ich schreibe Ihnen, weil es in unserem Wohnhaus seit einigen Wochen regelmäßig sehr laut ist. Die Nachbarn in der Wohnung über mir hören häufig bis spät in die Nacht laute Musik. Deshalb kann ich oft nicht schlafen und bin bei der Arbeit sehr müde. Ich habe bereits versucht, freundlich mit ihnen zu sprechen, aber leider hat sich die Situation nicht verbessert. Könnten Sie bitte mit den betreffenden Mietern sprechen und versuchen, eine Lösung zu finden? Vielen Dank für Ihre Unterstützung.',
        'আমি আপনাকে লিখছি, কারণ কয়েক সপ্তাহ ধরে আমাদের ভবনে নিয়মিত খুব শব্দ হচ্ছে। আমার ওপরের ফ্ল্যাটের প্রতিবেশীরা প্রায়ই গভীর রাত পর্যন্ত জোরে গান শোনেন। তাই আমি প্রায়ই ঘুমাতে পারি না এবং কাজের সময় খুব ক্লান্ত থাকি। আমি আগেই তাদের সাথে ভদ্রভাবে কথা বলার চেষ্টা করেছি, কিন্তু দুঃখের বিষয় পরিস্থিতির উন্নতি হয়নি। আপনি কি অনুগ্রহ করে সংশ্লিষ্ট ভাড়াটেদের সাথে কথা বলে একটি সমাধান খোঁজার চেষ্টা করবেন? আপনার সহযোগিতার জন্য অনেক ধন্যবাদ।',
      ],
      FORMAL_END,
      MAHID_HASAN,
    ],
    [
      { term: 'der Mieter', bn: 'ভাড়াটে।' },
      { term: 'betreffend', bn: 'সংশ্লিষ্ট।' },
      { term: 'sich verbessern', bn: 'উন্নতি হওয়া, ভালো হওয়া।' },
    ],
  ),
  email(
    'decline-company-event',
    'formell',
    { de: 'Eine formelle Einladung ablehnen', bn: 'অফিসের অনুষ্ঠানের আমন্ত্রণে না বলা', en: 'Declining a formal invitation' },
    [
      FRAU_MUELLER,
      [
        'vielen Dank für Ihre freundliche Einladung zur Firmenveranstaltung am kommenden Freitag. Ich habe mich sehr darüber gefreut. Leider kann ich an diesem Tag nicht teilnehmen, weil ich bereits einen wichtigen privaten Termin habe, den ich nicht verschieben kann. Ich finde es schade, dass ich nicht dabei sein kann, da ich gern meine Kolleginnen und Kollegen treffen würde. Ich hoffe, dass ich bei einer zukünftigen Veranstaltung teilnehmen kann. Ich wünsche Ihnen und allen Gästen einen schönen Abend.',
        'আগামী শুক্রবার অফিসের অনুষ্ঠানে আপনার আন্তরিক আমন্ত্রণের জন্য অনেক ধন্যবাদ। এতে আমি খুব খুশি হয়েছি। দুঃখের বিষয়, সেদিন আমি অংশ নিতে পারব না, কারণ আমার আগে থেকেই একটি গুরুত্বপূর্ণ ব্যক্তিগত অ্যাপয়েন্টমেন্ট আছে, যা আমি পেছাতে পারব না। থাকতে পারছি না বলে আমার খারাপ লাগছে, কারণ আমি সহকর্মীদের সাথে দেখা করতে চাইতাম। আশা করি ভবিষ্যতের কোনো অনুষ্ঠানে আমি অংশ নিতে পারব। আপনার এবং সব অতিথির সন্ধ্যা সুন্দর কাটুক, এই কামনা করি।',
      ],
      FORMAL_END,
      MAHID_HASAN,
    ],
    [
      { term: 'teilnehmen an', bn: 'অংশ নেওয়া।' },
      { term: 'verschieben', bn: 'পিছিয়ে দেওয়া, সময় বদলানো।' },
      { term: 'zukünftig', bn: 'ভবিষ্যতের।' },
    ],
  ),
  email(
    'training',
    'formell',
    { de: 'Anfrage zu einer Weiterbildung', bn: 'পেশাগত প্রশিক্ষণের অনুরোধ', en: 'Request for professional training' },
    [
      FRAU_MUELLER,
      [
        'ich möchte gern an einer Weiterbildung im Bereich Kundenkommunikation teilnehmen. Ich bin überzeugt, dass ich dadurch meine Fähigkeiten verbessern und meine Aufgaben im Unternehmen besser erledigen kann. Der Kurs beginnt nächsten Monat und dauert vier Wochen. Könnten Sie mir bitte mitteilen, ob das Unternehmen die Kursgebühren übernehmen kann? Außerdem möchte ich fragen, ob ich während der Arbeitszeit an den Unterrichtsstunden teilnehmen darf. Ich freue mich auf Ihre Rückmeldung.',
        'আমি গ্রাহক যোগাযোগ বিষয়ে একটি পেশাগত প্রশিক্ষণে অংশ নিতে চাই। আমি নিশ্চিত যে এর মাধ্যমে আমি আমার দক্ষতা বাড়াতে এবং প্রতিষ্ঠানে আমার কাজগুলো আরও ভালোভাবে করতে পারব। কোর্সটি আগামী মাসে শুরু হবে এবং চার সপ্তাহ চলবে। আপনি কি অনুগ্রহ করে জানাতে পারবেন, প্রতিষ্ঠান কোর্সের ফি বহন করতে পারবে কি না? এছাড়া আমি জানতে চাই, কাজের সময়ের মধ্যে আমি ক্লাসগুলোতে অংশ নিতে পারব কি না। আপনার উত্তরের অপেক্ষায় রইলাম।',
      ],
      FORMAL_END,
      MAHID_HASAN,
    ],
    [
      { term: 'die Weiterbildung', bn: 'পেশাগত প্রশিক্ষণ, দক্ষতা বাড়ানোর কোর্স।' },
      { term: 'überzeugt sein', bn: 'নিশ্চিত হওয়া, দৃঢ় বিশ্বাস থাকা।' },
      { term: 'die Kosten übernehmen', bn: 'খরচ বহন করা।' },
    ],
  ),
  email(
    'cancel-course',
    'formell',
    { de: 'Einen Kurs kündigen', bn: 'কোর্স বাতিল করা', en: 'Cancelling a course' },
    [
      DAMEN_HERREN,
      [
        'leider muss ich Ihnen mitteilen, dass ich an meinem Deutschkurs nicht mehr teilnehmen kann. Aus beruflichen Gründen werde ich in den nächsten Monaten sehr wenig Zeit haben. Es tut mir leid, dass ich den Kurs so kurzfristig absagen muss. Ich möchte Sie deshalb bitten, meine Kursteilnahme zu beenden. Da ich bisher nur an zwei Unterrichtsstunden teilgenommen habe, möchte ich fragen, ob eine teilweise Rückerstattung der Kursgebühr möglich ist. Vielen Dank für Ihr Verständnis.',
        'দুঃখের সাথে জানাচ্ছি যে আমি আর আমার জার্মান কোর্সে অংশ নিতে পারব না। পেশাগত কারণে আগামী কয়েক মাস আমার হাতে খুব কম সময় থাকবে। এত শেষ মুহূর্তে কোর্সটি বাতিল করতে হচ্ছে বলে আমি দুঃখিত। তাই আমি আপনাদের অনুরোধ করছি কোর্সে আমার অংশগ্রহণ বন্ধ করে দিতে। যেহেতু এখন পর্যন্ত আমি মাত্র দুটি ক্লাসে অংশ নিয়েছি, তাই জানতে চাই কোর্স ফি-র কিছু অংশ ফেরত পাওয়া সম্ভব কি না। আপনার বোঝার জন্য অনেক ধন্যবাদ।',
      ],
      FORMAL_END,
      MAHID_HASAN,
    ],
    [
      { term: 'Leider muss ich Ihnen mitteilen, dass …', bn: 'দুঃখের সাথে জানাচ্ছি যে …। খারাপ খবর দেওয়ার আনুষ্ঠানিক শুরু।' },
      { term: 'aus beruflichen Gründen', bn: 'পেশাগত কারণে।' },
      { term: 'die Rückerstattung', bn: 'টাকা ফেরত।' },
    ],
  ),
  email(
    'missed-appointment',
    'formell',
    { de: 'Entschuldigung bei einer Behörde', bn: 'সরকারি অফিসে অ্যাপয়েন্টমেন্ট মিসের জন্য ক্ষমা চাওয়া', en: 'Missing an appointment at an office' },
    [
      DAMEN_HERREN,
      [
        'leider konnte ich meinen Termin am 20. Oktober nicht wahrnehmen. Auf dem Weg zu Ihrer Behörde hatte mein Bus eine technische Störung, weshalb ich nicht rechtzeitig ankommen konnte. Ich entschuldige mich für die entstandenen Unannehmlichkeiten. Da ich die Angelegenheit so bald wie möglich erledigen muss, möchte ich Sie um einen neuen Termin bitten. Wenn möglich, würde mir ein Termin am Vormittag in der kommenden Woche gut passen. Vielen Dank für Ihr Verständnis.',
        'দুঃখের বিষয়, ২০ অক্টোবরের অ্যাপয়েন্টমেন্টে আমি উপস্থিত হতে পারিনি। আপনাদের অফিসে আসার পথে আমার বাসে যান্ত্রিক ত্রুটি দেখা দেয়, যে কারণে আমি সময়মতো পৌঁছাতে পারিনি। এর ফলে যে অসুবিধা হয়েছে, তার জন্য আমি ক্ষমা চাইছি। যেহেতু বিষয়টি আমাকে যত দ্রুত সম্ভব সম্পন্ন করতে হবে, তাই আমি আপনাদের কাছে একটি নতুন অ্যাপয়েন্টমেন্ট চাইছি। সম্ভব হলে আগামী সপ্তাহে সকালের দিকে একটি অ্যাপয়েন্টমেন্ট আমার জন্য সুবিধাজনক হবে। আপনার বোঝার জন্য অনেক ধন্যবাদ।',
      ],
      FORMAL_END,
      MAHID_HASAN,
    ],
    [
      { term: 'einen Termin wahrnehmen', bn: 'অ্যাপয়েন্টমেন্টে উপস্থিত হওয়া।' },
      { term: 'die Behörde', bn: 'সরকারি অফিস, কর্তৃপক্ষ।' },
      { term: 'die Angelegenheit', bn: 'বিষয়, যে কাজ সম্পন্ন করতে হবে।' },
    ],
  ),
  email(
    'working-hours',
    'formell',
    { de: 'Arbeitszeit ändern', bn: 'কাজের সময় বদলানোর অনুরোধ', en: 'Request to change working hours' },
    [
      FRAU_MUELLER,
      [
        'ich möchte Sie fragen, ob es möglich wäre, meine Arbeitszeiten ab nächsten Monat zu ändern. Aus familiären Gründen wäre es für mich hilfreich, morgens eine Stunde früher anzufangen und dafür am Nachmittag früher Feierabend zu machen. Ich bin überzeugt, dass ich meine Aufgaben trotzdem vollständig erledigen kann. Natürlich bin ich bereit, die Einzelheiten mit Ihnen zu besprechen, damit die Änderung auch für das Team gut funktioniert. Ich würde mich freuen, wenn Sie meinen Vorschlag prüfen könnten.',
        'আমি আপনার কাছে জানতে চাই, আগামী মাস থেকে আমার কাজের সময় বদলানো সম্ভব হবে কি না। পারিবারিক কারণে সকালে এক ঘণ্টা আগে কাজ শুরু করে বিকেলে আগে ছুটি নিতে পারলে আমার জন্য সুবিধা হতো। আমি নিশ্চিত যে তবুও আমি আমার সব কাজ পুরোপুরি শেষ করতে পারব। অবশ্যই আমি আপনার সাথে বিস্তারিত আলোচনা করতে প্রস্তুত, যাতে পরিবর্তনটি দলের জন্যও ভালোভাবে কাজ করে। আপনি আমার প্রস্তাবটি বিবেচনা করলে আমি খুশি হব।',
      ],
      FORMAL_END,
      MAHID_HASAN,
    ],
    [
      { term: 'Feierabend machen', bn: 'দিনের কাজ শেষ করে ছুটি নেওয়া।' },
      { term: 'die Einzelheiten', bn: 'খুঁটিনাটি, বিস্তারিত।' },
      { term: 'Ich würde mich freuen, wenn …', bn: '… করলে আমি খুশি হব। ভদ্র অনুরোধ।' },
    ],
  ),
];
