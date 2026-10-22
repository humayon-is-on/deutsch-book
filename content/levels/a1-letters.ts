import type { Note, TextItem } from '../../src/content/types';

/**
 * A1 letters and emails, 10 of each picked from the course material for
 * being short and simple, easiest first. Letters come before emails, and
 * each one is a topic that opens after the one before it.
 *
 * Every item is greeting, body, closing and signature, each with its full
 * Bangla translation, which the app shows as one block under the letter.
 */
type Part = [de: string, bn: string];

function letter(
  id: string,
  kind: 'Brief' | 'E-Mail',
  register: 'formell' | 'informell',
  title: { de: string; bn: string; en: string },
  parts: [greeting: Part, body: Part, closing: Part, signature: Part],
  notes: Note[],
): TextItem {
  return {
    id: `a1-${kind === 'Brief' ? 'letter' : 'email'}-${id}`,
    level: 'A1',
    module: 'emails',
    topic: kind,
    tag: `${kind} · ${register}`,
    title,
    lines: parts.map(([de, bn]) => ({ de, bn })),
    notes,
  };
}

const FORMAL_START: Part = ['Sehr geehrte Damen und Herren,', 'সম্মানিত মহোদয়/মহোদয়া,'];
const FORMAL_END: Part = ['Mit freundlichen Grüßen', 'বিনীত শুভেচ্ছাসহ'];
const VIELE_GRUESSE: Part = ['Viele Grüße', 'শুভেচ্ছাসহ'];
const LIEBE_GRUESSE: Part = ['Liebe Grüße', 'ভালোবাসা ও শুভেচ্ছাসহ'];
const HERZLICHE_GRUESSE: Part = ['Herzliche Grüße', 'আন্তরিক শুভেচ্ছাসহ'];

export const a1Letters: TextItem[] = [
  // Letters
  letter(
    'favorite-food',
    'Brief',
    'informell',
    { de: 'Mein Lieblingsessen', bn: 'আমার প্রিয় খাবার', en: 'Favorite food' },
    [
      ['Liebe Amina,', 'প্রিয় আমিনা,'],
      [
        'du möchtest wissen, was ich gern esse. Mein Lieblingsessen ist Pizza mit Gemüse. Ich esse sie gern am Freitagabend mit meinen Freunden im Restaurant. Manchmal koche ich auch zu Hause. Und was ist dein Lieblingsessen? Schreib mir bald!',
        'তুমি জানতে চেয়েছ আমি কী খেতে ভালোবাসি। আমার প্রিয় খাবার সবজি দেওয়া পিৎজা। শুক্রবার সন্ধ্যায় বন্ধুদের সাথে রেস্টুরেন্টে এটা খেতে আমার ভালো লাগে। মাঝে মাঝে আমি বাসায়ও রান্না করি। আর তোমার প্রিয় খাবার কী? তাড়াতাড়ি লিখো!',
      ],
      LIEBE_GRUESSE,
      ['Deine Freundin', 'তোমার বান্ধবী'],
    ],
    [
      { term: 'Mein Lieblingsessen ist …', bn: 'আমার প্রিয় খাবার হলো …। „Lieblings-“ যোগ করলে „প্রিয়“ বোঝায়: Lieblingsfarbe = প্রিয় রং।' },
      { term: 'Ich esse gern …', bn: 'কিছু করতে ভালো লাগে বলতে ক্রিয়ার পরে „gern“ বসে: Ich esse gern Pizza = আমি পিৎজা খেতে ভালোবাসি।' },
      { term: 'Schreib mir bald!', bn: '„তাড়াতাড়ি লিখো!“ বন্ধুকে লেখা চিঠির শেষে প্রায়ই থাকে।' },
    ],
  ),
  letter(
    'family',
    'Brief',
    'informell',
    { de: 'Meine Familie', bn: 'আমার পরিবার', en: 'Family' },
    [
      ['Liebe Sara,', 'প্রিয় সারা,'],
      [
        'du hast mich nach meiner Familie gefragt. In meiner Familie sind vier Personen: meine Eltern, mein Bruder und ich. Mein Bruder ist zwölf Jahre alt. Am Wochenende essen wir zusammen und machen oft einen Ausflug in den Park. Was macht deine Familie gern?',
        'তুমি আমার পরিবারের কথা জিজ্ঞেস করেছ। আমার পরিবারে চারজন মানুষ: আমার বাবা-মা, আমার ভাই আর আমি। আমার ভাইয়ের বয়স বারো বছর। সপ্তাহান্তে আমরা একসাথে খাই এবং প্রায়ই পার্কে বেড়াতে যাই। তোমার পরিবার কী করতে পছন্দ করে?',
      ],
      LIEBE_GRUESSE,
      ['Deine Freundin', 'তোমার বান্ধবী'],
    ],
    [
      { term: 'die Eltern', bn: 'বাবা-মা। শব্দটি সবসময় বহুবচনে থাকে।' },
      { term: 'Er ist zwölf Jahre alt.', bn: 'বয়স বলার নিয়ম: „তার বয়স বারো বছর।“' },
      { term: 'einen Ausflug machen', bn: 'বেড়াতে যাওয়া, ছোট একটা ভ্রমণে যাওয়া।' },
    ],
  ),
  letter(
    'weekend',
    'Brief',
    'informell',
    { de: 'Pläne für das Wochenende', bn: 'সপ্তাহান্তের পরিকল্পনা', en: 'Weekend plans' },
    [
      ['Lieber Omar,', 'প্রিয় ওমর,'],
      [
        'ich habe eine Frage an dich. Was machst du am Samstag und was machst du am Sonntag? Mit wem bist du am Wochenende zusammen? Hast du vielleicht am Samstagabend Zeit für ein Kino? Bitte antworte mir bald, ich freue mich auf deine Nachricht.',
        'তোমার কাছে আমার একটা প্রশ্ন আছে। শনিবার তুমি কী করছ আর রবিবার কী করছ? সপ্তাহান্তে তুমি কার সাথে থাকছ? শনিবার সন্ধ্যায় কি সিনেমা দেখার মতো সময় তোমার আছে? প্লিজ তাড়াতাড়ি উত্তর দিও, তোমার খবরের অপেক্ষায় রইলাম।',
      ],
      LIEBE_GRUESSE,
      ['Dein Freund', 'তোমার বন্ধু'],
    ],
    [
      { term: 'Hast du Zeit?', bn: 'কারো সময় আছে কিনা জানতে চাওয়া: „তোমার কি সময় আছে?“' },
      { term: 'Mit wem …?', bn: '„কার সাথে …?“ „mit“-এর পরে „wer“ বদলে „wem“ হয়।' },
      { term: 'Ich freue mich auf …', bn: 'সামনের কোনো কিছুর জন্য আনন্দ নিয়ে অপেক্ষা করা: „… এর অপেক্ষায় আছি।“' },
    ],
  ),
  letter(
    'hotel',
    'Brief',
    'formell',
    { de: 'Ein Hotelzimmer buchen', bn: 'হোটেলের রুম বুক করা', en: 'Hotel booking' },
    [
      FORMAL_START,
      [
        'ich möchte ein Doppelzimmer für zwei Personen buchen. Wir bleiben vom 12. bis 15. August in München. Ist ein Parkplatz vorhanden? Wie viel kostet das Frühstück pro Person? Bitte bestätigen Sie mir die Buchung. Vielen Dank im Voraus.',
        'আমি দুজনের জন্য একটি ডাবল রুম বুক করতে চাই। আমরা ১২ থেকে ১৫ আগস্ট পর্যন্ত মিউনিখে থাকব। পার্কিংয়ের জায়গা আছে কি? প্রতিজনের সকালের নাশতার দাম কত? অনুগ্রহ করে আমার বুকিং নিশ্চিত করুন। আগাম ধন্যবাদ।',
      ],
      FORMAL_END,
      ['Sophie Hill', 'সোফি হিল'],
    ],
    [
      { term: 'Sehr geehrte Damen und Herren', bn: 'আনুষ্ঠানিক চিঠির শুরু, যখন প্রাপকের নাম জানা নেই।' },
      { term: 'vom … bis …', bn: 'সময়সীমা বলা: „… থেকে … পর্যন্ত“।' },
      { term: 'Vielen Dank im Voraus.', bn: 'অনুরোধের চিঠির শেষে: „আগাম ধন্যবাদ।“' },
    ],
  ),
  letter(
    'language-course',
    'Brief',
    'formell',
    { de: 'Frage zum Deutschkurs', bn: 'জার্মান কোর্স নিয়ে জানতে চাওয়া', en: 'Language course inquiry' },
    [
      FORMAL_START,
      [
        'ich möchte in Deutschland arbeiten und deshalb Deutsch lernen. Ich suche einen A1-Kurs. Wann beginnt der nächste Kurs? Wie viel kostet der Kurs und wie lange dauert er? Bitte senden Sie mir weitere Informationen. Vielen Dank für Ihre Antwort.',
        'আমি জার্মানিতে কাজ করতে চাই, তাই জার্মান শিখতে চাই। আমি একটি A1 কোর্স খুঁজছি। পরের কোর্স কবে শুরু হবে? কোর্সের খরচ কত এবং এটি কতদিন চলে? অনুগ্রহ করে আমাকে আরও তথ্য পাঠান। আপনার উত্তরের জন্য অনেক ধন্যবাদ।',
      ],
      FORMAL_END,
      ['Daniel Green', 'ড্যানিয়েল গ্রিন'],
    ],
    [
      { term: 'deshalb', bn: '„তাই, সেজন্য“। কারণের পরে ফলাফল বলতে ব্যবহার হয়।' },
      { term: 'Wie viel kostet …?', bn: 'দাম জানতে চাওয়া: „… এর দাম কত?“' },
      { term: 'Wie lange dauert …?', bn: 'সময়কাল জানতে চাওয়া: „… কতক্ষণ বা কতদিন চলে?“' },
    ],
  ),
  letter(
    'gift',
    'Brief',
    'informell',
    { de: 'Danke für das Geschenk', bn: 'উপহারের জন্য ধন্যবাদ', en: 'Thank you for a gift' },
    [
      ['Liebe Oma,', 'প্রিয় দাদি,'],
      [
        'vielen Dank für das schöne Buch zu meinem Geburtstag. Ich habe es schon gelesen und es ist sehr interessant. Du hast mir eine große Freude gemacht. Ich besuche dich bald und dann trinken wir zusammen Kaffee. Bis bald!',
        'আমার জন্মদিনে সুন্দর বইটার জন্য অনেক ধন্যবাদ। আমি এর মধ্যেই বইটা পড়ে ফেলেছি, খুবই মজার। তুমি আমাকে অনেক আনন্দ দিয়েছ। শিগগিরই আমি তোমার কাছে বেড়াতে আসব, তখন আমরা একসাথে কফি খাব। শিগগিরই দেখা হবে!',
      ],
      ['Deine Enkelin', 'তোমার নাতনি'],
      ['Lisa', 'লিসা'],
    ],
    [
      { term: 'Vielen Dank für …', bn: 'কোনো কিছুর জন্য ধন্যবাদ জানানো: „… এর জন্য অনেক ধন্যবাদ।“' },
      { term: 'Ich habe es schon gelesen.', bn: 'অতীতে করা কাজ (Perfekt): haben + ক্রিয়ার শেষ রূপ। gelesen = পড়েছি।' },
      { term: 'Bis bald!', bn: '„শিগগিরই দেখা হবে!“ অনানুষ্ঠানিক বিদায়।' },
    ],
  ),
  letter(
    'borrow-book',
    'Brief',
    'informell',
    { de: 'Ein Buch leihen', bn: 'বই ধার চাওয়া', en: 'Asking a friend for a book' },
    [
      ['Liebe Nina,', 'প্রিয় নিনা,'],
      [
        'ich schreibe dir, weil ich ein Buch für meinen Deutschkurs brauche. Du hast doch das Buch „Schritte A1“. Kannst du es mir bitte für zwei Wochen leihen? Ich bringe es dir danach sofort zurück. Danke dir sehr! Wir sehen uns am Freitag.',
        'তোমাকে লিখছি, কারণ আমার জার্মান কোর্সের জন্য একটা বই দরকার। তোমার কাছে তো „Schritte A1“ বইটা আছে। দুই সপ্তাহের জন্য কি বইটা আমাকে ধার দিতে পারবে? এরপর আমি সাথে সাথেই ফেরত দেব। তোমাকে অনেক ধন্যবাদ! শুক্রবার দেখা হবে।',
      ],
      LIEBE_GRUESSE,
      ['Karin', 'কারিন'],
    ],
    [
      { term: 'weil', bn: '„কারণ“। „weil“-এর পরের অংশে ক্রিয়া একদম শেষে যায়: weil ich ein Buch brauche।' },
      { term: 'Kannst du es mir leihen?', bn: 'ধার চাওয়া: „তুমি কি এটা আমাকে ধার দিতে পারবে?“' },
      { term: 'zurückbringen', bn: 'ফেরত দেওয়া। বাক্যে দুই ভাগ হয়: Ich bringe es zurück।' },
    ],
  ),
  letter(
    'moving',
    'Brief',
    'informell',
    { de: 'Hilfe beim Umzug', bn: 'বাসা বদলে সাহায্য চাওয়া', en: 'Help with moving' },
    [
      ['Lieber Paul,', 'প্রিয় পল,'],
      [
        'ich schreibe dir, weil ich am Samstag in meine neue Wohnung ziehe und ich brauche deine Hilfe. Kannst du mir bitte mit den Kartons und den Möbeln helfen? Danach können wir zusammen Pizza essen und etwas trinken. Hast du am Samstag Zeit? Bitte antworte mir schnell.',
        'তোমাকে লিখছি, কারণ শনিবার আমি আমার নতুন বাসায় উঠছি, আর আমার তোমার সাহায্য দরকার। কার্টন আর আসবাবপত্রগুলো নিয়ে কি একটু সাহায্য করতে পারবে? এরপর আমরা একসাথে পিৎজা খেতে আর কিছু পান করতে পারি। শনিবার কি তোমার সময় আছে? প্লিজ তাড়াতাড়ি উত্তর দিও।',
      ],
      VIELE_GRUESSE,
      ['Alex', 'অ্যালেক্স'],
    ],
    [
      { term: 'in eine Wohnung ziehen', bn: 'নতুন বাসায় ওঠা।' },
      { term: 'Kannst du mir helfen?', bn: 'সাহায্য চাওয়া: „তুমি কি আমাকে সাহায্য করতে পারবে?“' },
      { term: 'danach', bn: '„এরপর, তারপর“।' },
    ],
  ),
  letter(
    'decline-birthday',
    'Brief',
    'informell',
    { de: 'Absage: Geburtstagsfeier', bn: 'জন্মদিনের দাওয়াতে যেতে না পারা', en: 'Declining a birthday invitation' },
    [
      ['Liebe Lena,', 'প্রিয় লেনা,'],
      [
        'vielen Dank für die Einladung zu deiner Geburtstagsfeier am Samstag. Leider kann ich nicht kommen, weil ich am Wochenende arbeiten muss. Können wir uns am Sonntag treffen und zusammen Kaffee trinken? Ich wünsche dir alles Gute zum Geburtstag und viel Spaß!',
        'শনিবার তোমার জন্মদিনের পার্টির দাওয়াতের জন্য অনেক ধন্যবাদ। দুঃখের বিষয়, আমি আসতে পারব না, কারণ সপ্তাহান্তে আমাকে কাজ করতে হবে। আমরা কি রবিবার দেখা করে একসাথে কফি খেতে পারি? তোমাকে জন্মদিনের অনেক শুভেচ্ছা, অনেক মজা করো!',
      ],
      VIELE_GRUESSE,
      ['Emma', 'এমা'],
    ],
    [
      { term: 'Leider kann ich nicht kommen.', bn: 'ভদ্রভাবে না বলা: „দুঃখিত, আমি আসতে পারব না।“' },
      { term: 'Alles Gute zum Geburtstag!', bn: '„শুভ জন্মদিন!“' },
      { term: 'sich treffen', bn: 'দেখা করা: Können wir uns treffen? = আমরা কি দেখা করতে পারি?' },
    ],
  ),
  letter(
    'dinner-invitation',
    'Brief',
    'informell',
    { de: 'Einladung zum Abendessen', bn: 'রাতের খাবারের দাওয়াত', en: 'Invitation to a dinner' },
    [
      ['Liebe Familie Braun,', 'প্রিয় ব্রাউন পরিবার,'],
      [
        'wir möchten Sie gern zu einem Abendessen am Freitag, den 5. Mai, um 19 Uhr einladen. Wir kochen eine Suppe und einen Kuchen. Bitte sagen Sie uns bis Mittwoch Bescheid, ob Sie kommen können. Wir freuen uns sehr auf Ihren Besuch!',
        'আমরা আপনাদের শুক্রবার, ৫ মে, সন্ধ্যা ৭টায় রাতের খাবারে দাওয়াত দিতে চাই। আমরা স্যুপ আর একটা কেক বানাব। আপনারা আসতে পারবেন কিনা, অনুগ্রহ করে বুধবারের মধ্যে আমাদের জানাবেন। আপনাদের আসার অপেক্ষায় আমরা খুবই আনন্দিত!',
      ],
      HERZLICHE_GRUESSE,
      ['Familie Meier', 'মায়ার পরিবার'],
    ],
    [
      { term: 'jemanden einladen', bn: 'কাউকে দাওয়াত দেওয়া। die Einladung = দাওয়াত।' },
      { term: 'Bescheid sagen', bn: 'জানানো, খবর দেওয়া।' },
      { term: 'ob', bn: '„কিনা“: ob Sie kommen können = আপনারা আসতে পারবেন কিনা।' },
    ],
  ),

  // Emails
  letter(
    'table',
    'E-Mail',
    'formell',
    { de: 'Einen Tisch reservieren', bn: 'রেস্টুরেন্টে টেবিল বুক করা', en: 'Booking a table' },
    [
      FORMAL_START,
      [
        'ich möchte für Samstagabend einen Tisch für vier Personen reservieren. Wir kommen um 19 Uhr. Haben Sie noch einen Tisch frei? Bitte bestätigen Sie mir die Reservierung per E-Mail. Vielen Dank im Voraus.',
        'আমি শনিবার সন্ধ্যার জন্য চারজনের একটি টেবিল রিজার্ভ করতে চাই। আমরা সন্ধ্যা ৭টায় আসব। আপনাদের কাছে কি এখনো একটি টেবিল খালি আছে? অনুগ্রহ করে ই-মেইলে আমার রিজার্ভেশন নিশ্চিত করুন। আগাম ধন্যবাদ।',
      ],
      FORMAL_END,
      ['Familie Roth', 'রোট পরিবার'],
    ],
    [
      { term: 'einen Tisch reservieren', bn: 'রেস্টুরেন্টে আগে থেকে টেবিল বুক করা।' },
      { term: 'um 19 Uhr', bn: 'ঘড়ির সময় বলতে „um“: um 19 Uhr = সন্ধ্যা ৭টায়।' },
      { term: 'per E-Mail', bn: '„ই-মেইলের মাধ্যমে“।' },
    ],
  ),
  letter(
    'late',
    'E-Mail',
    'informell',
    { de: 'Ich komme später', bn: 'আমার দেরি হবে', en: 'Delay notification' },
    [
      ['Hallo Lisa,', 'হ্যালো লিসা,'],
      [
        'ich komme leider 20 Minuten später. Mein Bus hat Verspätung und ich stehe noch im Stau. Warte bitte schon im Café am Bahnhof auf mich und bestell schon einen Kaffee. Es tut mir leid. Bis gleich!',
        'দুঃখিত, আমার ২০ মিনিট দেরি হবে। আমার বাস দেরিতে চলছে আর আমি এখনো যানজটে আটকে আছি। প্লিজ স্টেশনের ক্যাফেতে আমার জন্য অপেক্ষা করো আর একটা কফি অর্ডার করে ফেলো। আমি দুঃখিত। একটু পরেই দেখা হচ্ছে!',
      ],
      LIEBE_GRUESSE,
      ['Dein Freund', 'তোমার বন্ধু'],
    ],
    [
      { term: 'Verspätung haben', bn: 'দেরিতে চলা (বাস, ট্রেন)।' },
      { term: 'im Stau stehen', bn: 'যানজটে আটকে থাকা।' },
      { term: 'auf jemanden warten', bn: 'কারো জন্য অপেক্ষা করা: Warte auf mich! = আমার জন্য অপেক্ষা করো!' },
    ],
  ),
  letter(
    'exam-help',
    'E-Mail',
    'informell',
    { de: 'Hilfe beim Deutschlernen', bn: 'জার্মান শেখায় সাহায্য চাওয়া', en: 'Asking a friend for help with German' },
    [
      ['Liebe Eva,', 'প্রিয় এভা,'],
      [
        'ich habe nächste Woche eine Deutschprüfung und ich bin sehr nervös. Kannst du mir bitte am Samstag helfen? Wir können zusammen Grammatik üben und einen Brief schreiben. Ich bringe Kaffee und Kuchen mit. Danke dir!',
        'আগামী সপ্তাহে আমার জার্মান পরীক্ষা, আর আমি খুব নার্ভাস। শনিবার কি তুমি আমাকে একটু সাহায্য করতে পারবে? আমরা একসাথে ব্যাকরণ অনুশীলন করতে আর একটা চিঠি লিখতে পারি। আমি কফি আর কেক নিয়ে আসব। তোমাকে ধন্যবাদ!',
      ],
      LIEBE_GRUESSE,
      ['Deine Freundin', 'তোমার বান্ধবী'],
    ],
    [
      { term: 'nächste Woche', bn: '„আগামী সপ্তাহে“।' },
      { term: 'Ich bin nervös.', bn: '„আমি নার্ভাস/চিন্তিত।“' },
      { term: 'mitbringen', bn: 'সাথে করে নিয়ে আসা। বাক্যে দুই ভাগ হয়: Ich bringe Kuchen mit।' },
    ],
  ),
  letter(
    'neighbor',
    'E-Mail',
    'formell',
    { de: 'Bitte an die Nachbarin', bn: 'প্রতিবেশীর কাছে অনুরোধ', en: 'Neighbor favor' },
    [
      ['Liebe Frau Schmidt,', 'প্রিয় মিসেস শ্মিট,'],
      [
        'ich bin am Wochenende nicht zu Hause und fahre zu meiner Familie. Können Sie bitte meine Blumen gießen und die Post in den Briefkasten legen? Ich bin unter der Nummer 0176 1234567 erreichbar. Vielen Dank für Ihre Hilfe!',
        'সপ্তাহান্তে আমি বাসায় থাকব না, আমার পরিবারের কাছে যাচ্ছি। আপনি কি অনুগ্রহ করে আমার ফুলগাছে পানি দিতে এবং চিঠিপত্র লেটারবক্সে রেখে দিতে পারবেন? আমাকে 0176 1234567 নম্বরে পাওয়া যাবে। আপনার সাহায্যের জন্য অনেক ধন্যবাদ!',
      ],
      VIELE_GRUESSE,
      ['Ihr Nachbar', 'আপনার প্রতিবেশী'],
    ],
    [
      { term: 'Blumen gießen', bn: 'ফুলগাছে পানি দেওয়া।' },
      { term: 'Können Sie bitte …?', bn: 'আনুষ্ঠানিক ভদ্র অনুরোধ: „আপনি কি অনুগ্রহ করে … পারবেন?“' },
      { term: 'erreichbar', bn: 'যোগাযোগ করা যায় এমন: Ich bin erreichbar = আমাকে পাওয়া যাবে।' },
    ],
  ),
  letter(
    'decline-cinema',
    'E-Mail',
    'informell',
    { de: 'Absage: Kino', bn: 'সিনেমার দাওয়াতে যেতে না পারা', en: 'Declining a cinema invitation' },
    [
      ['Hallo Nico,', 'হ্যালো নিকো,'],
      [
        'vielen Dank für die Einladung ins Kino am Freitag. Leider habe ich am Freitagabend einen wichtigen Termin und keine Zeit. Es tut mir sehr leid. Hoffentlich können wir bald zusammen ins Kino gehen. Ich rufe dich am Wochenende an.',
        'শুক্রবার সিনেমায় যাওয়ার দাওয়াতের জন্য অনেক ধন্যবাদ। দুঃখের বিষয়, শুক্রবার সন্ধ্যায় আমার একটা জরুরি অ্যাপয়েন্টমেন্ট আছে, তাই সময় নেই। আমি খুবই দুঃখিত। আশা করি শিগগিরই আমরা একসাথে সিনেমায় যেতে পারব। সপ্তাহান্তে আমি তোমাকে ফোন করব।',
      ],
      VIELE_GRUESSE,
      ['Dein Freund', 'তোমার বন্ধু'],
    ],
    [
      { term: 'Es tut mir leid.', bn: '„আমি দুঃখিত।“' },
      { term: 'hoffentlich', bn: '„আশা করি“।' },
      { term: 'anrufen', bn: 'ফোন করা। বাক্যে দুই ভাগ হয়: Ich rufe dich an।' },
    ],
  ),
  letter(
    'doctor',
    'E-Mail',
    'formell',
    { de: 'Ein Termin beim Arzt', bn: 'ডাক্তারের অ্যাপয়েন্টমেন্ট চাওয়া', en: "Doctor's appointment request" },
    [
      ['Hallo Herr Dr. Müller,', 'হ্যালো ডা. মুলার,'],
      [
        'ich habe seit gestern starke Kopfschmerzen und kann heute nicht in die Praxis kommen. Können Sie mir bitte einen Termin für morgen Vormittag geben? Ich bin ab 9 Uhr erreichbar. Vielen Dank für Ihre Hilfe.',
        'গতকাল থেকে আমার প্রচণ্ড মাথাব্যথা, তাই আজ আমি চেম্বারে আসতে পারছি না। আপনি কি অনুগ্রহ করে আমাকে আগামীকাল সকালের জন্য একটি অ্যাপয়েন্টমেন্ট দিতে পারবেন? সকাল ৯টা থেকে আমাকে পাওয়া যাবে। আপনার সাহায্যের জন্য অনেক ধন্যবাদ।',
      ],
      VIELE_GRUESSE,
      ['Ihr Patient', 'আপনার রোগী'],
    ],
    [
      { term: 'seit gestern', bn: '„গতকাল থেকে“। এখনো চলছে এমন কিছুর জন্য „seit“ বসে।' },
      { term: 'die Kopfschmerzen', bn: 'মাথাব্যথা।' },
      { term: 'der Termin', bn: 'আগে থেকে ঠিক করা সাক্ষাতের সময়, অ্যাপয়েন্টমেন্ট।' },
    ],
  ),
  letter(
    'recipe',
    'E-Mail',
    'informell',
    { de: 'Bitte um ein Rezept', bn: 'রেসিপি চাওয়া', en: 'Asking for a recipe' },
    [
      ['Liebe Maria,', 'প্রিয় মারিয়া,'],
      [
        'ich habe gestern deinen Kuchen gegessen und er war sehr lecker. Kannst du mir bitte das Rezept schicken? Ich möchte den Kuchen am Wochenende für meine Familie backen. Vielen Dank und liebe Grüße an deine Familie!',
        'গতকাল আমি তোমার বানানো কেক খেয়েছি, খুবই মজার ছিল। তুমি কি আমাকে রেসিপিটা পাঠাতে পারবে? সপ্তাহান্তে আমি আমার পরিবারের জন্য কেকটা বানাতে চাই। অনেক ধন্যবাদ, আর তোমার পরিবারকে আমার শুভেচ্ছা জানিও!',
      ],
      ['Deine Freundin', 'তোমার বান্ধবী'],
      ['Clara', 'ক্লারা'],
    ],
    [
      { term: 'lecker', bn: 'সুস্বাদু, মজার (খাবার)।' },
      { term: 'das Rezept', bn: 'রান্নার প্রণালী, রেসিপি।' },
      { term: 'Liebe Grüße an …', bn: '„… কে আমার শুভেচ্ছা জানিও।“' },
    ],
  ),
  letter(
    'thank-evening',
    'E-Mail',
    'informell',
    { de: 'Danke für den Abend', bn: 'সুন্দর সন্ধ্যার জন্য ধন্যবাদ', en: 'Thank you for a nice evening' },
    [
      ['Liebe Familie Klein,', 'প্রিয় ক্লাইন পরিবার,'],
      [
        'vielen Dank für den schönen Abend bei Ihnen. Das Essen war sehr lecker und die Gespräche waren sehr interessant. Wir haben uns sehr wohl gefühlt. Wir möchten Sie bald wieder einladen. Bis bald!',
        'আপনাদের বাসায় সুন্দর সন্ধ্যাটির জন্য অনেক ধন্যবাদ। খাবার খুবই সুস্বাদু ছিল, আর আলাপগুলো খুব মজার ছিল। আমরা খুব স্বাচ্ছন্দ্য বোধ করেছি। শিগগিরই আমরা আপনাদের আবার দাওয়াত দিতে চাই। শিগগিরই দেখা হবে!',
      ],
      HERZLICHE_GRUESSE,
      ['Familie Wagner', 'ভাগনার পরিবার'],
    ],
    [
      { term: 'bei Ihnen', bn: '„আপনাদের বাসায়/কাছে“।' },
      { term: 'war / waren', bn: '„ছিল“: sein-এর অতীত রূপ। Das Essen war lecker।' },
      { term: 'sich wohl fühlen', bn: 'স্বাচ্ছন্দ্য বা আরাম বোধ করা।' },
    ],
  ),
  letter(
    'sports-course',
    'E-Mail',
    'formell',
    { de: 'Frage zum Sportkurs', bn: 'খেলাধুলার কোর্স নিয়ে জানতে চাওয়া', en: 'Sports course inquiry' },
    [
      FORMAL_START,
      [
        'ich interessiere mich für einen Sportkurs bei Ihnen. Wann findet der Kurs statt und wie lange dauert eine Stunde? Wie viel kostet die Teilnahme pro Monat? Bitte senden Sie mir weitere Informationen und einen Plan. Vielen Dank im Voraus.',
        'আপনাদের একটি খেলাধুলার কোর্সে আমি আগ্রহী। কোর্সটি কখন হয় এবং প্রতিটি ক্লাস কতক্ষণ চলে? প্রতি মাসে অংশ নেওয়ার খরচ কত? অনুগ্রহ করে আমাকে আরও তথ্য এবং একটি সময়সূচি পাঠান। আগাম ধন্যবাদ।',
      ],
      FORMAL_END,
      ['Ihr Interessent', 'আগ্রহী একজন'],
    ],
    [
      { term: 'sich interessieren für', bn: 'কোনো কিছুতে আগ্রহী হওয়া: Ich interessiere mich für … = আমি … এ আগ্রহী।' },
      { term: 'stattfinden', bn: 'অনুষ্ঠিত হওয়া। বাক্যে দুই ভাগ হয়: Wann findet der Kurs statt?' },
      { term: 'pro Monat', bn: '„প্রতি মাসে“।' },
    ],
  ),
  letter(
    'evening-course',
    'E-Mail',
    'formell',
    { de: 'Frage zum Abendkurs', bn: 'সান্ধ্য জার্মান কোর্স নিয়ে জানতে চাওয়া', en: 'Asking about a German course' },
    [
      FORMAL_START,
      [
        'ich möchte einen Deutschkurs A1 besuchen. Wann beginnt der nächste Kurs und wie viele Stunden hat er pro Woche? Wie viel kostet der Kurs? Ich arbeite tagsüber und suche einen Abendkurs. Bitte senden Sie mir Informationen.',
        'আমি একটি A1 জার্মান কোর্সে ভর্তি হতে চাই। পরের কোর্স কবে শুরু হবে এবং সপ্তাহে কত ঘণ্টা ক্লাস হয়? কোর্সের খরচ কত? আমি দিনের বেলা কাজ করি, তাই একটি সান্ধ্য কোর্স খুঁজছি। অনুগ্রহ করে আমাকে তথ্য পাঠান।',
      ],
      FORMAL_END,
      ['Ihre Interessentin', 'আগ্রহী একজন'],
    ],
    [
      { term: 'einen Kurs besuchen', bn: 'কোর্সে অংশ নেওয়া, ক্লাস করা।' },
      { term: 'tagsüber', bn: '„দিনের বেলা“।' },
      { term: 'der Abendkurs', bn: 'সন্ধ্যার কোর্স।' },
    ],
  ),
];
