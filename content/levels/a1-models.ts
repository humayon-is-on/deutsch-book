import type { TextItem } from '../../src/content/types';

/**
 * A1 model texts: twelve short illustrated reading passages, easiest first.
 * Each passage is kept sentence by sentence with its Bangla and English
 * meaning; the app shows the German as one paragraph, with the Bangla
 * translation under it and a button to switch to English.
 */
type Sentence = [de: string, bn: string, en: string];
/** A question on the text: the question, three choices and the right one's position. */
type Ask = [prompt: string, options: [string, string, string], answer: number];

function model(n: number, title: { de: string; bn: string; en: string }, heading: string, sentences: Sentence[], asks: Ask[]): TextItem {
  const num = String(n).padStart(2, '0');
  const id = `a1-model-${num}`;
  return {
    id,
    level: 'A1',
    module: 'models',
    topic: 'Lesetext',
    tag: heading,
    title,
    image: `images/a1-model-${num}.jpg`,
    lines: sentences.map(([de, bn, en]) => ({ de, bn, en })),
    questions: asks.map(([prompt, options, answer], i) => ({ id: `${id}-c${i + 1}`, type: 'mcq', prompt, promptBn: 'লেখাটি অনুযায়ী সঠিক উত্তর বেছে নিন', options, answer })),
  };
}

export const a1Models: TextItem[] = [
  model(1, { de: 'Sich vorstellen', bn: 'নিজের পরিচয় দেওয়া', en: 'Introducing yourself' }, 'Hallo, ich heiße Daniel', [
    ['Hallo!', 'হ্যালো!', 'Hello!'],
    ['Ich heiße Daniel und bin 20 Jahre alt.', 'আমার নাম ড্যানিয়েল এবং আমার বয়স ২০ বছর।', 'My name is Daniel, and I am 20 years old.'],
    ['Ich komme aus Deutschland und wohne in Berlin.', 'আমি জার্মানি থেকে এসেছি এবং বার্লিনে থাকি।', 'I come from Germany and live in Berlin.'],
    ['Ich bin Student.', 'আমি একজন শিক্ষার্থী।', 'I am a student.'],
    ['Ich spreche Deutsch und ein bisschen Englisch.', 'আমি জার্মান এবং অল্প ইংরেজি বলতে পারি।', 'I speak German and a little English.'],
    ['In meiner Freizeit höre ich gern Musik und spiele Fußball.', 'অবসর সময়ে আমি গান শুনতে এবং ফুটবল খেলতে পছন্দ করি।', 'In my free time, I like listening to music and playing football.'],
  ], [['Wie alt ist Daniel?', ['18 Jahre', '20 Jahre', '25 Jahre'], 1], ['Wo wohnt Daniel?', ['In Berlin', 'In Dhaka', 'In Köln'], 0]]),
  model(2, { de: 'Meine Familie', bn: 'আমার পরিবার', en: 'My family' }, 'Meine Familie', [
    ['Ich habe eine kleine Familie.', 'আমার একটি ছোট পরিবার আছে।', 'I have a small family.'],
    ['Mein Vater ist 50 Jahre alt und meine Mutter ist 45.', 'আমার বাবার বয়স ৫০ বছর এবং মায়ের ৪৫ বছর।', 'My father is 50 years old and my mother is 45.'],
    ['Ich habe einen Bruder.', 'আমার একজন ভাই আছে।', 'I have a brother.'],
    ['Er ist 15 Jahre alt und geht zur Schule.', 'তার বয়স ১৫ বছর এবং সে স্কুলে যায়।', 'He is 15 and goes to school.'],
    ['Wir wohnen zusammen in einem Haus.', 'আমরা একটি বাড়িতে একসঙ্গে থাকি।', 'We live together in a house.'],
    ['Am Abend essen wir gemeinsam.', 'সন্ধ্যায় আমরা একসঙ্গে খাই।', 'In the evening, we eat together.'],
  ], [['Wie alt ist der Bruder?', ['15 Jahre', '45 Jahre', '50 Jahre'], 0], ['Wann essen sie gemeinsam?', ['Am Morgen', 'Am Mittag', 'Am Abend'], 2]]),
  model(3, { de: 'Mein Tagesablauf', bn: 'আমার দৈনন্দিন রুটিন', en: 'My daily routine' }, 'Mein Tag', [
    ['Ich stehe jeden Morgen um sieben Uhr auf.', 'আমি প্রতিদিন সকালে সাতটায় উঠি।', 'Every morning, I get up at seven.'],
    ['Dann dusche ich und frühstücke.', 'তারপর গোসল করি এবং নাশতা করি।', 'Then I shower and have breakfast.'],
    ['Um acht Uhr gehe ich zur Universität.', 'আটটায় বিশ্ববিদ্যালয়ে যাই।', 'At eight, I go to university.'],
    ['Ich lerne bis zwei Uhr nachmittags.', 'দুপুর দুইটা পর্যন্ত পড়াশোনা করি।', 'I study until two in the afternoon.'],
    ['Am Nachmittag komme ich nach Hause und mache meine Hausaufgaben.', 'বিকেলে বাড়ি ফিরে বাড়ির কাজ করি।', 'In the afternoon, I come home and do my homework.'],
    ['Um elf Uhr gehe ich ins Bett.', 'রাত এগারোটায় ঘুমাতে যাই।', 'At eleven, I go to bed.'],
  ], [['Wann steht die Person auf?', ['Um sechs Uhr', 'Um sieben Uhr', 'Um acht Uhr'], 1], ['Was macht die Person am Nachmittag?', ['Sie geht ins Bett.', 'Sie macht Hausaufgaben.', 'Sie frühstückt.'], 1]]),
  model(4, { de: 'Mein Hobby', bn: 'আমার শখ', en: 'My hobby' }, 'Kochen macht Spaß', [
    ['Mein Hobby ist Kochen.', 'আমার শখ রান্না করা।', 'My hobby is cooking.'],
    ['Ich koche gern Reis, Gemüse und Hähnchen.', 'আমি ভাত, সবজি ও মুরগির মাংস রান্না করতে পছন্দ করি।', 'I like cooking rice, vegetables and chicken.'],
    ['Am Wochenende probiere ich neue Rezepte aus.', 'সপ্তাহান্তে নতুন রেসিপি চেষ্টা করি।', 'At the weekend, I try new recipes.'],
    ['Manchmal koche ich mit meiner Familie.', 'মাঝে মাঝে পরিবারের সঙ্গে রান্না করি।', 'Sometimes I cook with my family.'],
    ['Ich finde Kochen interessant und lecker!', 'আমার কাছে রান্না করা মজার এবং সুস্বাদু!', 'I find cooking interesting and delicious!'],
  ], [['Was ist das Hobby?', ['Kochen', 'Fußball', 'Musik'], 0], ['Wann probiert die Person neue Rezepte aus?', ['Am Montag', 'Am Wochenende', 'Jeden Morgen'], 1]]),
  model(5, { de: 'Mein Essen', bn: 'আমার খাবার', en: 'My food' }, 'Was esse ich gern?', [
    ['Zum Frühstück esse ich Brot und Eier.', 'সকালের নাশতায় আমি রুটি ও ডিম খাই।', 'For breakfast, I eat bread and eggs.'],
    ['Ich trinke gern Tee.', 'আমি চা পান করতে পছন্দ করি।', 'I like drinking tea.'],
    ['Mittags esse ich Reis mit Fisch oder Gemüse.', 'দুপুরে মাছ বা সবজির সঙ্গে ভাত খাই।', 'At lunchtime, I eat rice with fish or vegetables.'],
    ['Am Abend esse ich manchmal Suppe oder Nudeln.', 'সন্ধ্যায় মাঝে মাঝে স্যুপ বা নুডলস খাই।', 'In the evening, I sometimes eat soup or noodles.'],
    ['Ich trinke viel Wasser.', 'আমি প্রচুর পানি পান করি।', 'I drink a lot of water.'],
    ['Mein Lieblingsessen ist Reis mit Hähnchen.', 'আমার প্রিয় খাবার মুরগির মাংস দিয়ে ভাত।', 'My favorite food is rice with chicken.'],
  ], [['Was isst die Person zum Frühstück?', ['Reis und Fisch', 'Brot und Eier', 'Suppe und Nudeln'], 1], ['Was ist das Lieblingsessen?', ['Reis mit Hähnchen', 'Nudeln mit Gemüse', 'Brot mit Käse'], 0]]),
  model(6, { de: 'Mein Zimmer', bn: 'আমার ঘর', en: 'My room' }, 'Mein Zimmer', [
    ['Mein Zimmer ist nicht sehr groß, aber es ist schön.', 'আমার ঘর খুব বড় নয়, তবে সুন্দর।', 'My room is not very big, but it is nice.'],
    ['In meinem Zimmer stehen ein Bett, ein Schreibtisch und ein Schrank.', 'আমার ঘরে একটি বিছানা, একটি পড়ার টেবিল এবং একটি আলমারি আছে।', 'There are a bed, a desk and a wardrobe in my room.'],
    ['Auf dem Schreibtisch steht mein Computer.', 'টেবিলের ওপর আমার কম্পিউটার আছে।', 'My computer is on the desk.'],
    ['Neben dem Fenster steht eine Pflanze.', 'জানালার পাশে একটি গাছ আছে।', 'There is a plant next to the window.'],
    ['Ich lerne und arbeite gern in meinem Zimmer.', 'আমি আমার ঘরে পড়াশোনা ও কাজ করতে পছন্দ করি।', 'I like studying and working in my room.'],
  ], [['Wo steht der Computer?', ['Auf dem Bett', 'Neben der Tür', 'Auf dem Schreibtisch'], 2], ['Was steht neben dem Fenster?', ['Ein Schrank', 'Eine Pflanze', 'Ein Bett'], 1]]),
  model(7, { de: 'Einkaufen', bn: 'কেনাকাটা', en: 'Shopping' }, 'Im Supermarkt', [
    ['Heute gehe ich in den Supermarkt.', 'আজ আমি সুপারমার্কেটে যাই।', 'Today I am going to the supermarket.'],
    ['Ich brauche Milch, Brot, Eier und Äpfel.', 'আমার দুধ, রুটি, ডিম ও আপেল দরকার।', 'I need milk, bread, eggs and apples.'],
    ['Die Milch kostet einen Euro und das Brot zwei Euro.', 'দুধের দাম এক ইউরো এবং রুটির দাম দুই ইউরো।', 'The milk costs one euro and the bread costs two euros.'],
    ['Ich kaufe auch ein Kilo Äpfel.', 'আমি এক কেজি আপেলও কিনি।', 'I also buy one kilo of apples.'],
    ['An der Kasse bezahle ich zehn Euro.', 'ক্যাশ কাউন্টারে দশ ইউরো পরিশোধ করি।', 'At the checkout, I pay ten euros.'],
    ['Dann gehe ich nach Hause.', 'তারপর বাড়ি যাই।', 'Then I go home.'],
  ], [['Was kostet die Milch?', ['Einen Euro', 'Zwei Euro', 'Zehn Euro'], 0], ['Wie viel bezahlt die Person an der Kasse?', ['Zwei Euro', 'Fünf Euro', 'Zehn Euro'], 2]]),
  model(8, { de: 'Mein Wochenende', bn: 'আমার সপ্তাহান্ত', en: 'My weekend' }, 'Am Samstag und Sonntag', [
    ['Am Samstag schlafe ich lange.', 'শনিবার আমি দেরিতে ঘুম থেকে উঠি।', 'On Saturday, I sleep in.'],
    ['Danach frühstücke ich mit meiner Familie.', 'এরপর পরিবারের সঙ্গে নাশতা করি।', 'After that, I have breakfast with my family.'],
    ['Am Nachmittag treffe ich meine Freunde im Park.', 'বিকেলে পার্কে বন্ধুদের সঙ্গে দেখা করি।', 'In the afternoon, I meet my friends in the park.'],
    ['Wir spazieren und sprechen zusammen.', 'আমরা একসঙ্গে হাঁটি ও কথা বলি।', 'We walk and talk together.'],
    ['Am Sonntag bleibe ich zu Hause und sehe einen Film.', 'রবিবার বাড়িতে থাকি এবং একটি সিনেমা দেখি।', 'On Sunday, I stay home and watch a film.'],
    ['Am Abend bereite ich mich auf die neue Woche vor.', 'সন্ধ্যায় নতুন সপ্তাহের জন্য প্রস্তুতি নিই।', 'In the evening, I prepare for the new week.'],
  ], [['Wo trifft die Person ihre Freunde?', ['Im Park', 'Im Kino', 'Zu Hause'], 0], ['Was macht die Person am Sonntag?', ['Sie schläft lange.', 'Sie sieht einen Film.', 'Sie geht einkaufen.'], 1]]),
  model(9, { de: 'Mein Freund', bn: 'আমার বন্ধু', en: 'My friend' }, 'Mein bester Freund', [
    ['Mein bester Freund heißt Karim.', 'আমার সবচেয়ে ভালো বন্ধুর নাম করিম।', 'My best friend is called Karim.'],
    ['Er ist 21 Jahre alt und wohnt in Dhaka.', 'তার বয়স ২১ বছর এবং সে ঢাকায় থাকে।', 'He is 21 years old and lives in Dhaka.'],
    ['Er ist freundlich und hilfsbereit.', 'সে বন্ধুসুলভ ও সাহায্যকারী।', 'He is friendly and helpful.'],
    ['Wir kennen uns seit drei Jahren.', 'আমাদের পরিচয় তিন বছর ধরে।', 'We have known each other for three years.'],
    ['In unserer Freizeit spielen wir Computerspiele oder gehen spazieren.', 'অবসর সময়ে আমরা কম্পিউটার গেম খেলি অথবা হাঁটতে যাই।', 'In our free time, we play computer games or go for walks.'],
    ['Karim hilft mir oft beim Lernen.', 'করিম প্রায়ই আমাকে পড়াশোনায় সাহায্য করে।', 'Karim often helps me study.'],
  ], [['Wo wohnt Karim?', ['In Berlin', 'In Dhaka', 'In München'], 1], ['Seit wann kennen sie sich?', ['Seit einem Jahr', 'Seit zwei Jahren', 'Seit drei Jahren'], 2]]),
  model(10, { de: 'Beim Arzt', bn: 'ডাক্তারের কাছে', en: 'At the doctor' }, 'Ich bin krank', [
    ['Heute fühle ich mich nicht gut.', 'আজ আমার শরীর ভালো লাগছে না।', "Today I don't feel well."],
    ['Ich habe Kopfschmerzen und Fieber.', 'আমার মাথাব্যথা ও জ্বর হয়েছে।', 'I have a headache and a fever.'],
    ['Deshalb gehe ich zum Arzt.', 'তাই আমি ডাক্তারের কাছে যাই।', 'Therefore, I go to the doctor.'],
    ['Der Arzt untersucht mich und gibt mir ein Rezept.', 'ডাক্তার আমাকে পরীক্ষা করেন এবং একটি প্রেসক্রিপশন দেন।', 'The doctor examines me and gives me a prescription.'],
    ['Ich soll viel Wasser trinken und zu Hause bleiben.', 'আমার প্রচুর পানি পান করা এবং বাড়িতে থাকা উচিত।', 'I should drink plenty of water and stay home.'],
    ['Ich hoffe, dass ich bald gesund bin.', 'আশা করি শিগগিরই সুস্থ হব।', 'I hope I will be healthy soon.'],
  ], [['Was hat die Person?', ['Kopfschmerzen und Fieber', 'Hunger und Durst', 'Keine Zeit'], 0], ['Was gibt der Arzt?', ['Ein Buch', 'Ein Rezept', 'Wasser'], 1]]),
  model(11, { de: 'Meine Stadt', bn: 'আমার শহর', en: 'My city' }, 'Ich wohne in Dhaka', [
    ['Ich wohne in Dhaka, der Hauptstadt von Bangladesch.', 'আমি বাংলাদেশের রাজধানী ঢাকায় থাকি।', 'I live in Dhaka, the capital of Bangladesh.'],
    ['Die Stadt ist groß und lebendig.', 'শহরটি বড় এবং প্রাণবন্ত।', 'The city is big and lively.'],
    ['Es gibt viele Geschäfte, Restaurants und Schulen.', 'এখানে অনেক দোকান, রেস্তোরাঁ ও স্কুল আছে।', 'There are many shops, restaurants and schools.'],
    ['Die Straßen sind oft voll.', 'রাস্তাগুলো প্রায়ই ভিড়ে পূর্ণ থাকে।', 'The streets are often crowded.'],
    ['Ich fahre manchmal mit dem Bus und manchmal mit einer Rikscha.', 'আমি কখনো বাসে, আবার কখনো রিকশায় যাতায়াত করি।', 'Sometimes I travel by bus and sometimes by rickshaw.'],
    ['Ich mag meine Stadt.', 'আমার শহর ভালো লাগে।', 'I like my city.'],
  ], [['Was ist Dhaka?', ['Ein Dorf', 'Die Hauptstadt von Bangladesch', 'Ein Restaurant'], 1], ['Wie fährt die Person manchmal?', ['Mit dem Zug', 'Mit einer Rikscha', 'Mit dem Flugzeug'], 1]]),
  model(12, { de: 'Deutsch lernen', bn: 'জার্মান শেখা', en: 'Learning German' }, 'Warum lerne ich Deutsch?', [
    ['Ich lerne Deutsch, weil ich in Deutschland leben und arbeiten möchte.', 'আমি জার্মান শিখছি, কারণ আমি জার্মানিতে বসবাস ও কাজ করতে চাই।', 'I am learning German because I want to live and work in Germany.'],
    ['Jeden Tag lerne ich neue Wörter und übe die Grammatik.', 'প্রতিদিন নতুন শব্দ শিখি এবং ব্যাকরণ অনুশীলন করি।', 'Every day, I learn new words and practise grammar.'],
    ['Ich höre deutsche Musik und sehe Videos auf Deutsch.', 'জার্মান গান শুনি এবং জার্মান ভাষায় ভিডিও দেখি।', 'I listen to German music and watch videos in German.'],
    ['Manchmal ist Deutsch schwierig, aber ich gebe nicht auf.', 'মাঝে মাঝে জার্মান কঠিন মনে হয়, কিন্তু আমি হাল ছাড়ি না।', "Sometimes German is difficult, but I don't give up."],
    ['Mein Ziel ist es, gut Deutsch zu sprechen.', 'আমার লক্ষ্য ভালোভাবে জার্মান বলা।', 'My goal is to speak German well.'],
  ], [['Warum lernt die Person Deutsch?', ['Sie möchte in Deutschland leben und arbeiten.', 'Sie möchte nach Spanien reisen.', 'Sie möchte Koch werden.'], 0], ['Was ist manchmal schwierig?', ['Musik', 'Deutsch', 'Videos'], 1]]),
];
