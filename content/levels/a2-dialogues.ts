import type { Article, TextItem } from '../../src/content/types';

/**
 * The 20 A2 dialogues from the course material, easiest first. Like A1, the
 * Bangla translation opens as one block under the dialogue. Each also starts
 * with a short description of the situation and carries three key words,
 * Bangla only, that the learner can bookmark.
 */
type Line = [speaker: string, de: string, bn: string];
type Word = [de: string, bn: string, article?: Article];

function dialog(
  id: string,
  title: { de: string; bn: string; en: string },
  summary: { bn: string; en: string },
  lines: Line[],
  words: Word[],
): TextItem {
  const itemId = `a2-dialogue-${id}`;
  return {
    id: itemId,
    level: 'A2',
    module: 'dialogues',
    topic: title.de,
    title,
    situation: summary,
    lines: lines.map(([speaker, de, bn]) => ({ speaker, de, bn })),
    words: words.map(([de, bn, article], i) => ({ id: `${itemId}-w${i + 1}`, de, bn, ...(article ? { article } : {}) })),
  };
}

export const a2Dialogues: TextItem[] = [
  dialog(
    'supermarket',
    { de: 'Im Supermarkt', bn: 'সুপারমার্কেটে', en: 'At the supermarket' },
    {
      bn: 'একজন ক্রেতা দুধ ও রুটি কোথায় পাওয়া যাবে তা জানতে চান। পরে তিনি একটি রুটি কেনেন।',
      en: 'A customer asks where to find milk and bread and then buys a loaf of bread.',
    },
    [
      ['Kunde', 'Entschuldigung, wo finde ich die Milch?', 'মাফ করবেন, দুধ কোথায় পাব?'],
      ['Verkäuferin', 'Die Milch finden Sie im Kühlregal, neben dem Käse.', 'দুধ পাবেন ঠান্ডা তাকে, পনিরের পাশে।'],
      ['Kunde', 'Danke. Und wo ist das Brot?', 'ধন্যবাদ। আর রুটি কোথায়?'],
      ['Verkäuferin', 'Das Brot liegt vorne, gleich neben der Kasse.', 'রুটি সামনের দিকে, ক্যাশ কাউন্টারের ঠিক পাশে।'],
      ['Kunde', 'Wie viel kostet dieses Brot?', 'এই রুটিটার দাম কত?'],
      ['Verkäuferin', 'Es kostet zwei Euro fünfzig.', 'এটার দাম দুই ইউরো পঞ্চাশ সেন্ট।'],
      ['Kunde', 'Gut, dann nehme ich eins. Vielen Dank!', 'ঠিক আছে, তাহলে একটা নিচ্ছি। অনেক ধন্যবাদ!'],
      ['Verkäuferin', 'Gern geschehen!', 'আপনাকে স্বাগতম!'],
    ],
    [
      ['Kühlregal', 'ঠান্ডা রাখার তাক', 'das'],
      ['Kasse', 'ক্যাশ কাউন্টার', 'die'],
      ['nehmen', 'নেওয়া'],
    ],
  ),
  dialog(
    'restaurant',
    { de: 'Im Restaurant', bn: 'রেস্টুরেন্টে', en: 'At the restaurant' },
    {
      bn: 'একজন অতিথি রেস্টুরেন্টে ভাতের সঙ্গে মুরগির খাবার এবং এক গ্লাস পানি অর্ডার করেন।',
      en: 'A guest orders chicken with rice and a glass of water at a restaurant.',
    },
    [
      ['Kellner', 'Guten Abend! Haben Sie schon gewählt?', 'শুভ সন্ধ্যা! আপনি কি খাবার বেছে নিয়েছেন?'],
      ['Gast', 'Ja, ich hätte gern ein Hähnchengericht mit Reis.', 'হ্যাঁ, আমি ভাতের সঙ্গে একটা মুরগির পদ নিতে চাই।'],
      ['Kellner', 'Möchten Sie auch etwas trinken?', 'কিছু পান করতেও চান?'],
      ['Gast', 'Ja, bitte ein Glas Wasser.', 'হ্যাঁ, এক গ্লাস পানি দিন, প্লিজ।'],
      ['Kellner', 'Möchten Sie eine Suppe als Vorspeise?', 'শুরুতে কি একটা স্যুপ নেবেন?'],
      ['Gast', 'Nein, danke. Das reicht für mich.', 'না, ধন্যবাদ। আমার জন্য এটুকুই যথেষ্ট।'],
      ['Kellner', 'In Ordnung. Ihr Essen kommt gleich.', 'ঠিক আছে। আপনার খাবার এখনই আসছে।'],
    ],
    [
      ['Gericht', 'খাবারের পদ', 'das'],
      ['Vorspeise', 'শুরুর খাবার', 'die'],
      ['reichen', 'যথেষ্ট হওয়া'],
    ],
  ),
  dialog(
    'weekend',
    { de: 'Ein Treffen am Wochenende', bn: 'সপ্তাহান্তে দেখা করা', en: 'A weekend meeting' },
    {
      bn: 'আলী সারাকে জিজ্ঞেস করে, সপ্তাহান্তে তার সময় আছে কি না। তারা শনিবার বিকেল চারটায় সিনেমা দেখতে যাওয়ার সিদ্ধান্ত নেয়।',
      en: 'Ali asks Sara if she is free on the weekend. They decide to watch a comedy at the cinema on Saturday at 4 p.m.',
    },
    [
      ['Ali', 'Hallo, Sara! Hast du am Wochenende Zeit?', 'হ্যালো, সারা! সপ্তাহান্তে তোমার সময় আছে?'],
      ['Sara', 'Ja, am Samstag habe ich Zeit. Warum fragst du?', 'হ্যাঁ, শনিবার আমার সময় আছে। কেন জিজ্ঞেস করছ?'],
      ['Ali', 'Möchtest du mit mir ins Kino gehen?', 'তুমি কি আমার সঙ্গে সিনেমা দেখতে যাবে?'],
      ['Sara', 'Gute Idee! Welchen Film möchtest du sehen?', 'ভালো বুদ্ধি! কোন সিনেমাটা দেখতে চাও?'],
      ['Ali', 'Vielleicht eine Komödie. Ich lache gern.', 'হয়তো একটা হাসির সিনেমা। আমি হাসতে ভালোবাসি।'],
      ['Sara', 'Super! Um wie viel Uhr treffen wir uns?', 'দারুণ! আমরা কয়টায় দেখা করব?'],
      ['Ali', 'Um 16 Uhr vor dem Kino.', 'বিকেল চারটায়, সিনেমা হলের সামনে।'],
      ['Sara', 'Alles klar. Bis Samstag!', 'ঠিক আছে। শনিবার দেখা হবে!'],
    ],
    [
      ['Zeit haben', 'সময় থাকা'],
      ['Komödie', 'হাসির সিনেমা', 'die'],
      ['sich treffen', 'দেখা করা'],
    ],
  ),
  dialog(
    'directions',
    { de: 'Nach dem Weg fragen', bn: 'রাস্তা জিজ্ঞেস করা', en: 'Asking for directions' },
    {
      bn: 'একজন পর্যটক ট্রেন স্টেশনে যাওয়ার রাস্তা জানতে চান। একজন পথচারী হাঁটার রাস্তা ও বাসের বিকল্প বুঝিয়ে দেন।',
      en: 'A tourist asks how to get to the train station. A passerby explains the walking route and bus option.',
    },
    [
      ['Tourist', 'Entschuldigung, wie komme ich zum Bahnhof?', 'মাফ করবেন, রেলস্টেশনে কীভাবে যাব?'],
      ['Passant', 'Gehen Sie geradeaus und dann an der Ampel nach links.', 'সোজা যান, তারপর ট্রাফিক লাইটে গিয়ে বাঁয়ে।'],
      ['Tourist', 'Ist der Bahnhof weit von hier?', 'স্টেশন কি এখান থেকে অনেক দূরে?'],
      ['Passant', 'Nein, zu Fuß brauchen Sie ungefähr zehn Minuten.', 'না, হেঁটে গেলে প্রায় দশ মিনিট লাগবে।'],
      ['Tourist', 'Kann ich auch mit dem Bus fahren?', 'বাসেও কি যেতে পারি?'],
      ['Passant', 'Ja, die Linie 5 hält direkt vor dem Bahnhof.', 'হ্যাঁ, ৫ নম্বর বাস ঠিক স্টেশনের সামনে থামে।'],
      ['Tourist', 'Vielen Dank für Ihre Hilfe!', 'আপনার সাহায্যের জন্য অনেক ধন্যবাদ!'],
    ],
    [
      ['geradeaus', 'সোজা'],
      ['Ampel', 'ট্রাফিক লাইট', 'die'],
      ['zu Fuß', 'হেঁটে'],
    ],
  ),
  dialog(
    'clothes',
    { de: 'Im Kleidungsgeschäft', bn: 'কাপড়ের দোকানে', en: 'At a clothing shop' },
    {
      bn: 'একজন ক্রেতা শীতের জন্য একটি জ্যাকেট খুঁজছেন। মাপ জানিয়ে তিনি একটি নীল জ্যাকেট পরে দেখতে চান।',
      en: 'A customer looks for a winter jacket, checks the size, and asks to try on a blue one.',
    },
    [
      ['Verkäuferin', 'Kann ich Ihnen helfen?', 'আমি কি আপনাকে সাহায্য করতে পারি?'],
      ['Kunde', 'Ja, ich suche eine Jacke für den Winter.', 'হ্যাঁ, আমি শীতের জন্য একটা জ্যাকেট খুঁজছি।'],
      ['Verkäuferin', 'Welche Größe tragen Sie?', 'আপনি কোন মাপ পরেন?'],
      ['Kunde', 'Normalerweise Größe M.', 'সাধারণত M মাপ।'],
      ['Verkäuferin', 'Wie gefällt Ihnen diese blaue Jacke?', 'এই নীল জ্যাকেটটা আপনার কেমন লাগছে?'],
      ['Kunde', 'Sie sieht gut aus. Kann ich sie anprobieren?', 'দেখতে ভালো লাগছে। আমি কি এটা পরে দেখতে পারি?'],
      ['Verkäuferin', 'Natürlich. Die Umkleidekabine ist dort drüben.', 'অবশ্যই। পোশাক বদলানোর ঘরটা ওই দিকে।'],
    ],
    [
      ['Größe', 'মাপ', 'die'],
      ['anprobieren', 'পরে দেখা'],
      ['Umkleidekabine', 'পোশাক বদলানোর ঘর', 'die'],
    ],
  ),
  dialog(
    'weather',
    { de: 'Über das Wetter sprechen', bn: 'আবহাওয়া নিয়ে কথা বলা', en: 'Talking about the weather' },
    {
      bn: 'দুই বন্ধু ঠান্ডা ও বৃষ্টির আবহাওয়া নিয়ে কথা বলে। রোদ উঠলে তারা পার্কে হাঁটতে যাওয়ার পরিকল্পনা করে।',
      en: 'Two friends talk about the cold, rainy weather and plan a walk in the park if it becomes sunny.',
    },
    [
      ['Mia', 'Heute ist es wirklich kalt, oder?', 'আজ সত্যিই ঠান্ডা, তাই না?'],
      ['Tom', 'Ja, und gestern hat es auch geregnet.', 'হ্যাঁ, আর গতকাল বৃষ্টিও হয়েছে।'],
      ['Mia', 'Ich hoffe, dass es am Wochenende sonnig wird.', 'আশা করি সপ্তাহান্তে রোদ উঠবে।'],
      ['Tom', 'Ich auch. Dann können wir im Park spazieren gehen.', 'আমিও। তাহলে আমরা পার্কে হাঁটতে যেতে পারব।'],
      ['Mia', 'Gute Idee! Wenn das Wetter schön ist, bringe ich etwas zu essen mit.', 'ভালো বুদ্ধি! আবহাওয়া ভালো থাকলে আমি কিছু খাবার সঙ্গে নিয়ে আসব।'],
      ['Tom', 'Super. Dann treffen wir uns am Samstag.', 'দারুণ। তাহলে শনিবার দেখা হচ্ছে।'],
    ],
    [
      ['regnen', 'বৃষ্টি হওয়া'],
      ['sonnig', 'রৌদ্রোজ্জ্বল'],
      ['mitbringen', 'সঙ্গে করে আনা'],
    ],
  ),
  dialog(
    'hobbies',
    { de: 'Über Hobbys sprechen', bn: 'শখ নিয়ে কথা বলা', en: 'Talking about hobbies' },
    {
      bn: 'মিরা ও ডেভিড নিজেদের শখ নিয়ে কথা বলে। ডেভিড গেম খেলতে ও রান্না করতে ভালোবাসে, বিশেষ করে বিরিয়ানি ও কেক। সে মিরাকে একসঙ্গে রান্না করার আমন্ত্রণ জানায়।',
      en: 'Mira and David discuss their hobbies. David likes gaming and cooking, especially biryani and cakes, and invites Mira to cook together.',
    },
    [
      ['Mira', 'Was machst du gern in deiner Freizeit?', 'অবসর সময়ে তুমি কী করতে ভালোবাসো?'],
      ['David', 'Ich spiele gern Computerspiele und koche manchmal.', 'আমি কম্পিউটার গেম খেলতে ভালোবাসি, আর মাঝে মাঝে রান্না করি।'],
      ['Mira', 'Wirklich? Was kochst du am liebsten?', 'সত্যি? সবচেয়ে বেশি কী রান্না করতে ভালোবাসো?'],
      ['David', 'Ich mache gern Biryani und Kuchen.', 'আমি বিরিয়ানি আর কেক বানাতে ভালোবাসি।'],
      ['Mira', 'Das klingt lecker! Kannst du mir das Rezept geben?', 'শুনেই মজার লাগছে! আমাকে রেসিপিটা দিতে পারবে?'],
      ['David', 'Natürlich. Vielleicht können wir am Wochenende zusammen kochen.', 'অবশ্যই। হয়তো সপ্তাহান্তে আমরা একসঙ্গে রান্না করতে পারি।'],
      ['Mira', 'Sehr gern!', 'খুব ভালো হয়!'],
    ],
    [
      ['Freizeit', 'অবসর সময়', 'die'],
      ['am liebsten', 'সবচেয়ে বেশি পছন্দ করে'],
      ['Rezept', 'রান্নার রেসিপি', 'das'],
    ],
  ),
  dialog(
    'gift',
    { de: 'Ein Geschenk kaufen', bn: 'উপহার কেনা', en: 'Buying a gift' },
    {
      bn: 'পল ভাইয়ের জন্মদিনে কী কিনবে বুঝতে পারছে না। ভাই গোয়েন্দা ও অভিযানের গল্প পড়তে ভালোবাসে বলে লেনা একটি বই কেনার পরামর্শ দেয়।',
      en: "Paul is unsure what to buy for his brother's birthday. Lena suggests a book because he enjoys reading crime and adventure stories.",
    },
    [
      ['Lena', 'Was schenkst du deinem Bruder zum Geburtstag?', 'তোমার ভাইকে জন্মদিনে কী উপহার দেবে?'],
      ['Paul', 'Ich weiß es noch nicht. Vielleicht ein Buch.', 'এখনো জানি না। হয়তো একটা বই।'],
      ['Lena', 'Liest er gern?', 'সে কি পড়তে ভালোবাসে?'],
      ['Paul', 'Ja, besonders Krimis und Abenteuerromane.', 'হ্যাঁ, বিশেষ করে গোয়েন্দা গল্প আর অভিযানের উপন্যাস।'],
      ['Lena', 'Dann ist ein Buch eine gute Idee.', 'তাহলে বই একটা ভালো বুদ্ধি।'],
      ['Paul', 'Stimmt! Ich kaufe ihm ein spannendes Buch.', 'ঠিক বলেছ! আমি ওর জন্য একটা রোমাঞ্চকর বই কিনব।'],
    ],
    [
      ['schenken', 'উপহার দেওয়া'],
      ['Krimi', 'গোয়েন্দা গল্প', 'der'],
      ['spannend', 'রোমাঞ্চকর'],
    ],
  ),
  dialog(
    'appointment',
    { de: 'Einen Arzttermin machen', bn: 'ডাক্তারের অ্যাপয়েন্টমেন্ট নেওয়া', en: "Making a doctor's appointment" },
    {
      bn: 'একজন রোগী দুই দিন ধরে মাথাব্যথা হওয়ায় ডাক্তারের অ্যাপয়েন্টমেন্ট নিতে ফোন করেন।',
      en: "A patient calls to arrange a doctor's appointment because they have had a headache for two days.",
    },
    [
      ['Patient', 'Guten Tag. Ich möchte einen Termin beim Arzt machen.', 'শুভ দিন। আমি ডাক্তারের একটা অ্যাপয়েন্টমেন্ট নিতে চাই।'],
      ['Mitarbeiterin', 'Natürlich. Was fehlt Ihnen denn?', 'অবশ্যই। আপনার কী সমস্যা?'],
      ['Patient', 'Ich habe seit zwei Tagen Kopfschmerzen.', 'দুই দিন ধরে আমার মাথাব্যথা।'],
      ['Mitarbeiterin', 'Haben Sie morgen Vormittag Zeit?', 'কাল সকালে কি আপনার সময় হবে?'],
      ['Patient', 'Ja, um zehn Uhr passt es mir gut.', 'হ্যাঁ, দশটায় আমার জন্য ভালো হয়।'],
      ['Mitarbeiterin', 'Gut. Dann kommen Sie bitte morgen um zehn Uhr.', 'ঠিক আছে। তাহলে কাল দশটায় আসবেন।'],
      ['Patient', 'Vielen Dank. Auf Wiederhören!', 'অনেক ধন্যবাদ। রাখছি, আবার কথা হবে!'],
      ['Mitarbeiterin', 'Auf Wiederhören!', 'আবার কথা হবে!'],
    ],
    [
      ['Termin', 'অ্যাপয়েন্টমেন্ট', 'der'],
      ['Kopfschmerzen', 'মাথাব্যথা', 'die'],
      ['passen', 'সুবিধাজনক হওয়া'],
    ],
  ),
  dialog(
    'train',
    { de: 'Einen Zug buchen', bn: 'ট্রেনের টিকিট কাটা', en: 'Booking a train' },
    {
      bn: 'একজন যাত্রী বার্লিনের যাওয়া-আসার ট্রেন টিকিট কেনেন এবং একটি আসন সংরক্ষণ করেন।',
      en: 'A traveler buys a return train ticket to Berlin and reserves a seat.',
    },
    [
      ['Reisender', 'Guten Tag. Ich möchte eine Fahrkarte nach Berlin kaufen.', 'শুভ দিন। আমি বার্লিনের একটা টিকিট কিনতে চাই।'],
      ['Mitarbeiter', 'Einfach oder hin und zurück?', 'শুধু যাওয়া, নাকি যাওয়া-আসা?'],
      ['Reisender', 'Hin und zurück, bitte.', 'যাওয়া-আসা, প্লিজ।'],
      ['Mitarbeiter', 'Wann möchten Sie zurückfahren?', 'কবে ফিরতে চান?'],
      ['Reisender', 'Am Sonntagabend.', 'রবিবার সন্ধ্যায়।'],
      ['Mitarbeiter', 'Möchten Sie einen Sitzplatz reservieren?', 'আপনি কি একটা আসন সংরক্ষণ করতে চান?'],
      ['Reisender', 'Ja, bitte. Wie viel kostet alles zusammen?', 'হ্যাঁ, প্লিজ। সব মিলিয়ে কত হলো?'],
      ['Mitarbeiter', 'Das macht 85 Euro.', 'মোট ৮৫ ইউরো।'],
    ],
    [
      ['Fahrkarte', 'টিকিট', 'die'],
      ['hin und zurück', 'যাওয়া-আসা'],
      ['reservieren', 'সংরক্ষণ করা'],
    ],
  ),
  dialog(
    'apartment',
    { de: 'Eine Wohnung besichtigen', bn: 'বাসা দেখতে যাওয়া', en: 'Viewing an apartment' },
    {
      bn: 'একজন সম্ভাব্য ভাড়াটিয়া দুই কক্ষের একটি ফ্ল্যাট দেখতে যান এবং ভাড়া ও বারান্দা সম্পর্কে জানতে চান।',
      en: 'A prospective tenant views a two-room apartment and asks about the rent and balcony.',
    },
    [
      ['Mieter', 'Guten Tag. Ich interessiere mich für die Wohnung.', 'শুভ দিন। আমি বাসাটার ব্যাপারে আগ্রহী।'],
      ['Vermieterin', 'Schön. Möchten Sie die Wohnung sehen?', 'ভালো। আপনি কি বাসাটা দেখতে চান?'],
      ['Mieter', 'Ja, gern. Wie viele Zimmer hat sie?', 'হ্যাঁ, অবশ্যই। এতে কয়টা ঘর আছে?'],
      ['Vermieterin', 'Sie hat zwei Zimmer, eine Küche und ein Badezimmer.', 'এতে দুটো ঘর, একটা রান্নাঘর আর একটা বাথরুম আছে।'],
      ['Mieter', 'Wie hoch ist die Miete?', 'ভাড়া কত?'],
      ['Vermieterin', 'Die Miete beträgt 650 Euro im Monat, ohne Strom.', 'ভাড়া মাসে ৬৫০ ইউরো, বিদ্যুৎ বিল ছাড়া।'],
      ['Mieter', 'Das klingt gut. Gibt es auch einen Balkon?', 'ভালোই শোনাচ্ছে। বারান্দাও আছে কি?'],
      ['Vermieterin', 'Ja, einen kleinen Balkon.', 'হ্যাঁ, একটা ছোট বারান্দা।'],
    ],
    [
      ['sich interessieren für', 'আগ্রহী হওয়া'],
      ['Miete', 'বাড়িভাড়া', 'die'],
      ['Balkon', 'বারান্দা', 'der'],
    ],
  ),
  dialog(
    'trip',
    { de: 'Einen Ausflug planen', bn: 'এক দিনের ভ্রমণের পরিকল্পনা', en: 'Planning a day trip' },
    {
      bn: 'দুই বন্ধু পাহাড়ে বেড়াতে যাওয়ার পরিকল্পনা করে। কীভাবে যাবে আর কী সঙ্গে নেবে, তা নিয়ে কথা বলে।',
      en: 'Two friends plan a trip to the mountains and discuss transportation and what to bring.',
    },
    [
      ['Jonas', 'Was machen wir in den Ferien?', 'ছুটিতে আমরা কী করব?'],
      ['Emma', 'Wir könnten einen Ausflug in die Berge machen.', 'আমরা পাহাড়ে বেড়াতে যেতে পারি।'],
      ['Jonas', 'Das klingt toll! Wie kommen wir dorthin?', 'দারুণ শোনাচ্ছে! আমরা সেখানে কীভাবে যাব?'],
      ['Emma', 'Wir können mit dem Zug fahren.', 'আমরা ট্রেনে যেতে পারি।'],
      ['Jonas', 'Was sollen wir mitnehmen?', 'আমরা কী কী সঙ্গে নেব?'],
      ['Emma', 'Nimm bitte Wasser, etwas zu essen und eine Jacke mit.', 'পানি, কিছু খাবার আর একটা জ্যাকেট সঙ্গে নিয়ো।'],
      ['Jonas', 'Gute Idee. Ich hoffe, das Wetter bleibt schön.', 'ভালো বুদ্ধি। আশা করি আবহাওয়া ভালো থাকবে।'],
    ],
    [
      ['Ausflug', 'এক দিনের ভ্রমণ', 'der'],
      ['Berge', 'পাহাড়', 'die'],
      ['mitnehmen', 'সঙ্গে নেওয়া'],
    ],
  ),
  dialog(
    'invitation',
    { de: 'Eine Einladung absagen', bn: 'আমন্ত্রণে না বলা', en: 'Declining an invitation' },
    {
      bn: 'পরীক্ষার পড়া থাকায় ম্যাক্স ভদ্রভাবে সোফির পার্টির আমন্ত্রণে না বলে। তারা অন্য একদিন দেখা করার ঠিক করে।',
      en: "Max politely declines Sophie's party invitation because he needs to study for an exam. They arrange to meet another time.",
    },
    [
      ['Sophie', 'Hallo, kommst du morgen zu meiner Party?', 'হ্যালো, কাল আমার পার্টিতে আসছ?'],
      ['Max', 'Danke für die Einladung, aber leider kann ich nicht kommen.', 'আমন্ত্রণের জন্য ধন্যবাদ, কিন্তু দুঃখিত, আমি আসতে পারব না।'],
      ['Sophie', 'Oh, warum denn nicht?', 'ওহ, কেন পারবে না?'],
      ['Max', 'Ich muss für meine Prüfung lernen.', 'আমাকে পরীক্ষার জন্য পড়তে হবে।'],
      ['Sophie', 'Das ist schade. Vielleicht hast du nächste Woche Zeit?', 'খারাপ লাগল। হয়তো আগামী সপ্তাহে তোমার সময় হবে?'],
      ['Max', 'Ja, gern! Dann können wir einen Kaffee trinken.', 'হ্যাঁ, অবশ্যই! তখন আমরা একসঙ্গে কফি খেতে পারি।'],
      ['Sophie', 'Gute Idee. Viel Erfolg bei deiner Prüfung!', 'ভালো বুদ্ধি। পরীক্ষার জন্য শুভকামনা!'],
    ],
    [
      ['Einladung', 'আমন্ত্রণ', 'die'],
      ['absagen', 'বাতিল করা / না বলা'],
      ['Prüfung', 'পরীক্ষা', 'die'],
    ],
  ),
  dialog(
    'health',
    { de: 'Über Gesundheit sprechen', bn: 'স্বাস্থ্য নিয়ে কথা বলা', en: 'Talking about health' },
    {
      bn: 'লিয়া দেখে বেনকে ক্লান্ত লাগছে। সে বেনকে ভালো ঘুমের অভ্যাস করতে আর কম কফি খেতে পরামর্শ দেয়।',
      en: 'Lea notices that Ben looks tired and suggests improving his sleep habits and drinking less coffee.',
    },
    [
      ['Lea', 'Du siehst heute müde aus. Geht es dir gut?', 'আজ তোমাকে ক্লান্ত দেখাচ্ছে। তুমি ঠিক আছ?'],
      ['Ben', 'Nicht besonders. Ich habe schlecht geschlafen.', 'খুব একটা না। আমার ঘুম ভালো হয়নি।'],
      ['Lea', 'Vielleicht solltest du heute früher ins Bett gehen.', 'হয়তো আজ তোমার একটু আগে ঘুমাতে যাওয়া উচিত।'],
      ['Ben', 'Ja, das mache ich. Außerdem trinke ich zu viel Kaffee.', 'হ্যাঁ, তাই করব। তা ছাড়া আমি খুব বেশি কফি খাই।'],
      ['Lea', 'Versuch doch, mehr Wasser zu trinken und abends weniger Kaffee zu trinken.', 'বেশি পানি খাওয়ার চেষ্টা করো, আর সন্ধ্যায় কম কফি খাও।'],
      ['Ben', 'Danke für den Tipp. Das werde ich versuchen.', 'পরামর্শের জন্য ধন্যবাদ। আমি চেষ্টা করব।'],
    ],
    [
      ['müde', 'ক্লান্ত'],
      ['Tipp', 'পরামর্শ', 'der'],
      ['versuchen', 'চেষ্টা করা'],
    ],
  ),
  dialog(
    'neighbour',
    { de: 'Beim Nachbarn', bn: 'প্রতিবেশীর সঙ্গে কথা', en: 'Talking to a neighbor' },
    {
      bn: 'আনা বাড়িতে থাকবে না, তাই সে প্রতিবেশীকে তার পার্সেলটা রেখে দিতে অনুরোধ করে।',
      en: 'Anna asks her neighbor to receive a package because she will be away from home.',
    },
    [
      ['Anna', 'Guten Morgen, Herr Müller. Könnten Sie mir bitte helfen?', 'শুভ সকাল, মি. মুলার। আপনি কি আমাকে একটু সাহায্য করতে পারবেন?'],
      ['Herr Müller', 'Natürlich. Was ist denn passiert?', 'অবশ্যই। কী হয়েছে?'],
      ['Anna', 'Ich bin morgen nicht zu Hause. Könnten Sie mein Paket annehmen?', 'কাল আমি বাড়িতে থাকব না। আপনি কি আমার পার্সেলটা রেখে দিতে পারবেন?'],
      ['Herr Müller', 'Ja, kein Problem. Wann kommt das Paket?', 'হ্যাঁ, কোনো সমস্যা নেই। পার্সেলটা কখন আসবে?'],
      ['Anna', 'Es soll zwischen zehn und zwölf Uhr kommen.', 'দশটা থেকে বারোটার মধ্যে আসার কথা।'],
      ['Herr Müller', 'Gut. Ich werde darauf achten.', 'ঠিক আছে। আমি খেয়াল রাখব।'],
      ['Anna', 'Vielen Dank! Das ist sehr nett von Ihnen.', 'অনেক ধন্যবাদ! আপনি খুব ভালো মানুষ।'],
    ],
    [
      ['annehmen', 'গ্রহণ করা'],
      ['Paket', 'পার্সেল', 'das'],
      ['darauf achten', 'খেয়াল রাখা'],
    ],
  ),
  dialog(
    'phone',
    { de: 'Am Telefon', bn: 'ফোনে কথা বলা', en: 'Making a phone call' },
    {
      bn: 'একজন ক্রেতা তার অর্ডার নিয়ে জানতে ফোন করেন। কর্মী অর্ডার নম্বর দেখে জানান, পার্সেলটা সম্ভবত কাল পৌঁছাবে।',
      en: 'A customer calls to ask about an order. The employee checks the order number and explains that the package should arrive tomorrow.',
    },
    [
      ['Kunde', 'Guten Tag. Ich habe eine Frage zu meiner Bestellung.', 'শুভ দিন। আমার অর্ডার নিয়ে একটা প্রশ্ন আছে।'],
      ['Mitarbeiterin', 'Gern. Haben Sie Ihre Bestellnummer?', 'অবশ্যই। আপনার অর্ডার নম্বরটা আছে?'],
      ['Kunde', 'Ja, sie lautet 45821.', 'হ্যাঁ, নম্বরটা ৪৫৮২১।'],
      ['Mitarbeiterin', 'Einen Moment bitte. Ich schaue nach.', 'এক মুহূর্ত, প্লিজ। আমি দেখে নিচ্ছি।'],
      ['Kunde', 'Natürlich.', 'অবশ্যই।'],
      ['Mitarbeiterin', 'Ihr Paket wurde gestern verschickt. Es kommt wahrscheinlich morgen an.', 'আপনার পার্সেলটা গতকাল পাঠানো হয়েছে। সম্ভবত কাল পৌঁছাবে।'],
      ['Kunde', 'Vielen Dank für die Information.', 'তথ্যের জন্য অনেক ধন্যবাদ।'],
    ],
    [
      ['Bestellung', 'অর্ডার', 'die'],
      ['nachschauen', 'দেখে নেওয়া'],
      ['verschicken', 'পাঠানো'],
    ],
  ),
  dialog(
    'internet',
    { de: 'Ein Problem mit dem Internet', bn: 'ইন্টারনেটের সমস্যা', en: 'An internet problem' },
    {
      bn: 'একজন গ্রাহক ইন্টারনেটের সমস্যার কথা জানান। সাপোর্টের কর্মী পরের দিন একজন টেকনিশিয়ান পাঠানোর ব্যবস্থা করেন।',
      en: 'A customer reports an internet problem. The support employee arranges a technician visit for the next day.',
    },
    [
      ['Kunde', 'Guten Tag. Mein Internet funktioniert seit gestern nicht.', 'শুভ দিন। গতকাল থেকে আমার ইন্টারনেট কাজ করছে না।'],
      ['Mitarbeiter', 'Haben Sie den Router schon neu gestartet?', 'আপনি কি রাউটারটা আবার চালু করে দেখেছেন?'],
      ['Kunde', 'Ja, aber es funktioniert immer noch nicht.', 'হ্যাঁ, কিন্তু এখনো কাজ করছে না।'],
      ['Mitarbeiter', 'Welche Farbe hat das Licht am Router?', 'রাউটারের বাতিটা কোন রঙের?'],
      ['Kunde', 'Es blinkt rot.', 'লাল রঙে জ্বলছে-নিভছে।'],
      ['Mitarbeiter', 'Dann gibt es wahrscheinlich eine Störung. Wir schicken einen Techniker zu Ihnen.', 'তাহলে সম্ভবত কোনো ত্রুটি হয়েছে। আমরা আপনার কাছে একজন টেকনিশিয়ান পাঠাচ্ছি।'],
      ['Kunde', 'Wann kommt er?', 'তিনি কখন আসবেন?'],
      ['Mitarbeiter', 'Morgen zwischen neun und elf Uhr.', 'কাল নয়টা থেকে এগারোটার মধ্যে।'],
    ],
    [
      ['funktionieren', 'কাজ করা'],
      ['neu starten', 'পুনরায় চালু করা'],
      ['Störung', 'ত্রুটি বা সমস্যা', 'die'],
    ],
  ),
  dialog(
    'course',
    { de: 'Im Deutschkurs', bn: 'জার্মান ক্লাসে', en: 'In the German class' },
    {
      bn: 'নিনা শিক্ষকের কাছে অধীন বাক্য সম্পর্কে জানতে চায়। শিক্ষক বুঝিয়ে দেন, „weil“ দিয়ে শুরু হওয়া বাক্যে ক্রিয়া সাধারণত শেষে বসে।',
      en: 'Nina asks her teacher about subordinate clauses. The teacher explains that the verb normally goes at the end in a clause with weil.',
    },
    [
      ['Lehrer', 'Hast du die Hausaufgaben gemacht?', 'তুমি কি বাড়ির কাজ করেছ?'],
      ['Nina', 'Ja, aber ich habe eine Aufgabe nicht verstanden.', 'হ্যাঁ, কিন্তু একটা প্রশ্ন বুঝতে পারিনি।'],
      ['Lehrer', 'Welche Aufgabe ist das?', 'কোন প্রশ্নটা?'],
      ['Nina', 'Die Übung mit den Nebensätzen. Ich weiß nicht, wo das Verb stehen muss.', 'অধীন বাক্যের অনুশীলনটা। ক্রিয়া কোথায় বসবে আমি বুঝতে পারছি না।'],
      ['Lehrer', 'Bei einem Nebensatz mit „weil“ steht das Verb normalerweise am Ende.', '„weil“ দিয়ে অধীন বাক্যে ক্রিয়া সাধারণত শেষে বসে।'],
      ['Nina', 'Ach so! Jetzt verstehe ich. Vielen Dank!', 'ও আচ্ছা! এবার বুঝেছি। অনেক ধন্যবাদ!'],
    ],
    [
      ['verstehen', 'বোঝা'],
      ['Nebensatz', 'অধীন বাক্য', 'der'],
      ['am Ende', 'শেষে'],
    ],
  ),
  dialog(
    'future',
    { de: 'Zukunftspläne', bn: 'ভবিষ্যৎ পরিকল্পনা', en: 'Future plans' },
    {
      bn: 'নোরা জানায়, সে জার্মানিতে কাজ করতে আর পেশাগত প্রশিক্ষণ নিতে চায়। সে জার্মান শিখছে এবং আইটি ও ইলেকট্রিক্যাল ইঞ্জিনিয়ারিংয়ে আগ্রহী।',
      en: 'Nora explains that she wants to work and complete vocational training in Germany. She is learning German and is interested in IT and electrical engineering.',
    },
    [
      ['Amir', 'Was möchtest du nach deinem Studium machen?', 'পড়াশোনা শেষ করে তুমি কী করতে চাও?'],
      ['Nora', 'Ich möchte in Deutschland arbeiten und eine Ausbildung machen.', 'আমি জার্মানিতে কাজ করতে আর একটা পেশাগত প্রশিক্ষণ নিতে চাই।'],
      ['Amir', 'Das ist interessant! Lernst du schon Deutsch?', 'দারুণ ব্যাপার! তুমি কি এখনই জার্মান শিখছ?'],
      ['Nora', 'Ja, ich lerne jeden Tag, weil ich meine Sprachkenntnisse verbessern möchte.', 'হ্যাঁ, প্রতিদিন শিখি, কারণ আমি আমার ভাষাগত দক্ষতা বাড়াতে চাই।'],
      ['Amir', 'Das ist gut. Welche Ausbildung interessiert dich?', 'ভালো। কোন প্রশিক্ষণে তোমার আগ্রহ?'],
      ['Nora', 'Ich interessiere mich für IT und Elektrotechnik.', 'আমি আইটি আর ইলেকট্রিক্যাল ইঞ্জিনিয়ারিংয়ে আগ্রহী।'],
      ['Amir', 'Ich wünsche dir viel Erfolg!', 'তোমার জন্য অনেক শুভকামনা!'],
      ['Nora', 'Vielen Dank! Ich hoffe, dass mein Plan funktioniert.', 'অনেক ধন্যবাদ! আশা করি আমার পরিকল্পনা সফল হবে।'],
    ],
    [
      ['Ausbildung', 'পেশাগত প্রশিক্ষণ', 'die'],
      ['Sprachkenntnisse', 'ভাষাগত দক্ষতা', 'die'],
      ['sich interessieren für', 'আগ্রহী হওয়া'],
    ],
  ),
  dialog(
    'interview',
    { de: 'Beim Bewerbungsgespräch', bn: 'চাকরির সাক্ষাৎকারে', en: 'At a job interview' },
    {
      bn: 'চাকরির সাক্ষাৎকারে একজন প্রার্থী তার কম্পিউটার বিষয়ক প্রশিক্ষণ আর এক বছরের UI/UX কাজের অভিজ্ঞতার কথা বলেন।',
      en: 'A candidate describes their computer-related education and one year of UI/UX experience during a job interview.',
    },
    [
      ['Personalchef', 'Guten Tag. Erzählen Sie bitte etwas über sich.', 'শুভ দিন। নিজের সম্পর্কে কিছু বলুন।'],
      ['Bewerber', 'Guten Tag. Ich habe eine Ausbildung im Computerbereich gemacht.', 'শুভ দিন। আমি কম্পিউটার বিষয়ে একটা পেশাগত প্রশিক্ষণ নিয়েছি।'],
      ['Personalchef', 'Welche Erfahrungen haben Sie?', 'আপনার কী ধরনের অভিজ্ঞতা আছে?'],
      ['Bewerber', 'Ich habe ein Jahr als UI/UX-Designer gearbeitet.', 'আমি এক বছর UI/UX ডিজাইনার হিসেবে কাজ করেছি।'],
      ['Personalchef', 'Warum möchten Sie bei uns arbeiten?', 'আপনি আমাদের এখানে কেন কাজ করতে চান?'],
      ['Bewerber', 'Ich möchte meine Fähigkeiten verbessern und neue Erfahrungen sammeln.', 'আমি আমার দক্ষতা বাড়াতে আর নতুন অভিজ্ঞতা অর্জন করতে চাই।'],
      ['Personalchef', 'Vielen Dank. Wir melden uns nächste Woche bei Ihnen.', 'অনেক ধন্যবাদ। আমরা আগামী সপ্তাহে আপনার সঙ্গে যোগাযোগ করব।'],
    ],
    [
      ['Erfahrung', 'অভিজ্ঞতা', 'die'],
      ['Fähigkeit', 'দক্ষতা', 'die'],
      ['sich melden', 'যোগাযোগ করা'],
    ],
  ),
];
