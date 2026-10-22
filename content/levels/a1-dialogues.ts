import type { Note, TextItem } from '../../src/content/types';

/**
 * The 20 A1 dialogues from the course material, easiest first. Each one is a
 * topic that opens after the one before it, and the app shows its Bangla
 * translation as one block under the dialogue.
 */
type Line = [speaker: 'A' | 'B', de: string, bn: string];

function dialog(
  id: string,
  situation: string,
  title: { bn: string; en: string },
  lines: Line[],
  notes: Note[],
): TextItem {
  return {
    id: `a1-dialogue-${id}`,
    level: 'A1',
    module: 'dialogues',
    topic: situation,
    title: { de: situation, ...title },
    lines: lines.map(([speaker, de, bn]) => ({ speaker, de, bn })),
    notes,
  };
}

export const a1Dialogues: TextItem[] = [
  dialog(
    'cafe',
    'Im Café',
    { bn: 'ক্যাফেতে', en: 'At the café' },
    [
      ['A', 'Guten Tag! Was möchten Sie bitte?', 'শুভ দিন! আপনি কী নেবেন?'],
      ['B', 'Guten Tag. Ich möchte einen Kaffee und ein Stück Kuchen, bitte. Der Kuchen sieht sehr lecker aus.', 'শুভ দিন। আমাকে একটা কফি আর এক টুকরো কেক দিন, প্লিজ। কেকটা দেখতে খুব মজার লাগছে।'],
      ['A', 'Möchten Sie Milch oder Zucker im Kaffee?', 'কফিতে দুধ নাকি চিনি দেব?'],
      ['B', 'Nur Milch, bitte. Und wie viel kostet das alles zusammen?', 'শুধু দুধ, প্লিজ। আর সব মিলিয়ে দাম কত?'],
      ['A', 'Das macht 5,50 Euro.', 'মোট ৫.৫০ ইউরো।'],
      ['B', 'Hier bitte. Vielen Dank! Auf Wiedersehen!', 'এই নিন। অনেক ধন্যবাদ! আবার দেখা হবে!'],
    ],
    [
      { term: 'Ich möchte …', bn: 'ভদ্রভাবে কিছু চাওয়া: „আমি … নিতে চাই।“' },
      { term: 'ein Stück Kuchen', bn: 'এক টুকরো কেক।' },
      { term: 'Das macht …', bn: 'দাম বলার সময়: „মোট … হলো।“' },
    ],
  ),
  dialog(
    'bakery',
    'Beim Bäcker',
    { bn: 'বেকারিতে', en: 'At the bakery' },
    [
      ['A', 'Guten Morgen! Was darf es sein?', 'সুপ্রভাত! কী দেব আপনাকে?'],
      ['B', 'Guten Morgen. Ich möchte bitte zwei Brötchen und ein Croissant. Haben Sie auch Kuchen?', 'সুপ্রভাত। আমাকে দুটো ব্রোটশেন (ছোট রুটি) আর একটা ক্রোয়াসাঁ দিন, প্লিজ। আপনাদের কাছে কেকও আছে?'],
      ['A', 'Ja, natürlich. Wir haben Apfelkuchen und Schokoladenkuchen.', 'হ্যাঁ, অবশ্যই। আমাদের আপেল কেক আর চকলেট কেক আছে।'],
      ['B', 'Dann ein Stück Apfelkuchen, bitte.', 'তাহলে এক টুকরো আপেল কেক দিন, প্লিজ।'],
      ['A', 'Zusammen oder getrennt?', 'একসাথে বিল, নাকি আলাদা আলাদা?'],
      ['B', 'Zusammen, bitte. Was macht das?', 'একসাথে, প্লিজ। কত হলো?'],
      ['A', 'Das macht 6,80 Euro.', 'মোট ৬.৮০ ইউরো।'],
    ],
    [
      { term: 'Was darf es sein?', bn: 'দোকানে বিক্রেতার প্রশ্ন: „আপনাকে কী দেব?“' },
      { term: 'Zusammen oder getrennt?', bn: 'বিল দেওয়ার সময়: „একসাথে, নাকি আলাদা আলাদা?“' },
      { term: 'das Brötchen', bn: 'জার্মানির ছোট গোল রুটি, সকালের নাশতায় খুব চলে।' },
    ],
  ),
  dialog(
    'supermarket',
    'Im Supermarkt',
    { bn: 'সুপারমার্কেটে', en: 'At the supermarket' },
    [
      ['A', 'Entschuldigung, wo finde ich die Milch?', 'মাফ করবেন, দুধ কোথায় পাব?'],
      ['B', 'Die Milch ist dort hinten, neben dem Käse.', 'দুধ ওই পেছনের দিকে, পনিরের পাশে।'],
      ['A', 'Danke. Haben Sie auch frisches Brot? Ich brauche Brot für das Frühstück.', 'ধন্যবাদ। আপনাদের কাছে টাটকা রুটিও আছে? সকালের নাশতার জন্য আমার রুটি দরকার।'],
      ['B', 'Ja, das Brot ist vorne an der Kasse.', 'হ্যাঁ, রুটি সামনের দিকে, ক্যাশ কাউন্টারের কাছে।'],
      ['A', 'Super. Und wie viel kostet das Brot?', 'দারুণ। আর রুটির দাম কত?'],
      ['B', 'Das Brot kostet 2,20 Euro.', 'রুটির দাম ২.২০ ইউরো।'],
    ],
    [
      { term: 'Entschuldigung', bn: '„মাফ করবেন“। অপরিচিত কাউকে কিছু জিজ্ঞেস করার আগে বলা হয়।' },
      { term: 'Wo finde ich …?', bn: 'কোনো জিনিস খুঁজতে: „… কোথায় পাব?“' },
      { term: 'neben dem Käse', bn: '„পনিরের পাশে“। neben = পাশে।' },
    ],
  ),
  dialog(
    'way',
    'Nach dem Weg fragen',
    { bn: 'পথ জিজ্ঞেস করা', en: 'Asking for directions' },
    [
      ['A', 'Entschuldigung, ich suche den Bahnhof. Wo ist er bitte?', 'মাফ করবেন, আমি রেলস্টেশন খুঁজছি। এটা কোথায়, বলবেন?'],
      ['B', 'Gehen Sie geradeaus und dann links. Der Bahnhof ist neben der Apotheke.', 'সোজা যান, তারপর বাঁয়ে। স্টেশনটা ফার্মেসির পাশে।'],
      ['A', 'Ist es weit von hier? Ich habe nur zehn Minuten Zeit.', 'এখান থেকে কি অনেক দূর? আমার হাতে মাত্র দশ মিনিট সময়।'],
      ['B', 'Nein, nur fünf Minuten zu Fuß.', 'না, হেঁটে মাত্র পাঁচ মিনিট।'],
      ['A', 'Vielen Dank für Ihre Hilfe!', 'আপনার সাহায্যের জন্য অনেক ধন্যবাদ!'],
      ['B', 'Gern geschehen. Schönen Tag noch!', 'স্বাগতম। দিনটা ভালো কাটুক!'],
    ],
    [
      { term: 'geradeaus / links / rechts', bn: 'সোজা / বাঁয়ে / ডানে।' },
      { term: 'zu Fuß', bn: '„হেঁটে“।' },
      { term: 'Gern geschehen.', bn: 'ধন্যবাদের উত্তরে: „স্বাগতম, কোনো ব্যাপার না।“' },
    ],
  ),
  dialog(
    'time',
    'Nach der Uhrzeit fragen',
    { bn: 'সময় জিজ্ঞেস করা', en: 'Asking the time' },
    [
      ['A', 'Entschuldigung, wie spät ist es bitte?', 'মাফ করবেন, এখন কয়টা বাজে?'],
      ['B', 'Es ist Viertel nach drei.', 'এখন সোয়া তিনটা।'],
      ['A', 'Danke. Wann fährt der nächste Zug nach Berlin? Ich muss heute noch dorthin.', 'ধন্যবাদ। বার্লিনের পরের ট্রেন কখন ছাড়বে? আজকেই আমাকে সেখানে যেতে হবে।'],
      ['B', 'Um 15.45 Uhr, von Gleis 5.', 'বিকেল ৩টা ৪৫ মিনিটে, ৫ নম্বর প্ল্যাটফর্ম থেকে।'],
      ['A', 'Vielen Dank!', 'অনেক ধন্যবাদ!'],
      ['B', 'Bitte schön. Gute Reise!', 'স্বাগতম। যাত্রা শুভ হোক!'],
    ],
    [
      { term: 'Wie spät ist es?', bn: '„এখন কয়টা বাজে?“' },
      { term: 'Viertel nach drei', bn: '„সোয়া তিনটা“ (তিনটা বেজে পনেরো মিনিট)।' },
      { term: 'das Gleis', bn: 'রেলস্টেশনের প্ল্যাটফর্ম।' },
    ],
  ),
  dialog(
    'restaurant',
    'Im Restaurant',
    { bn: 'রেস্টুরেন্টে', en: 'At the restaurant' },
    [
      ['A', 'Guten Abend! Haben Sie einen Tisch für zwei Personen?', 'শুভ সন্ধ্যা! দুজনের জন্য কোনো টেবিল খালি আছে?'],
      ['B', 'Ja, natürlich. Möchten Sie am Fenster sitzen?', 'হ্যাঁ, অবশ্যই। আপনারা কি জানালার পাশে বসতে চান?'],
      ['A', 'Ja, gern. Haben Sie auch eine Speisekarte auf Englisch? Mein Freund versteht kein Deutsch.', 'হ্যাঁ, খুশি হব। ইংরেজিতে কোনো মেনু আছে? আমার বন্ধু জার্মান বোঝে না।'],
      ['B', 'Ja, einen Moment bitte. Möchten Sie schon etwas trinken?', 'হ্যাঁ, এক মিনিট অপেক্ষা করুন। এখনই কিছু পান করবেন?'],
      ['A', 'Ja, zwei Gläser Wasser, bitte.', 'হ্যাঁ, দুই গ্লাস পানি, প্লিজ।'],
    ],
    [
      { term: 'die Speisekarte', bn: 'রেস্টুরেন্টের খাবারের তালিকা, মেনু।' },
      { term: 'am Fenster', bn: '„জানালার পাশে“।' },
      { term: 'Einen Moment, bitte.', bn: '„এক মিনিট, প্লিজ।“ কাউকে একটু অপেক্ষা করতে বলা।' },
    ],
  ),
  dialog(
    'weather',
    'Nach dem Wetter fragen',
    { bn: 'আবহাওয়া নিয়ে কথা', en: 'Asking about the weather' },
    [
      ['A', 'Wie ist das Wetter heute in München?', 'আজ মিউনিখের আবহাওয়া কেমন?'],
      ['B', 'Es ist sonnig, aber ein bisschen kalt.', 'রোদ আছে, তবে একটু ঠান্ডা।'],
      ['A', 'Und wie wird das Wetter am Wochenende? Wir wollen wandern gehen.', 'আর সপ্তাহান্তে আবহাওয়া কেমন থাকবে? আমরা হাইকিংয়ে যেতে চাই।'],
      ['B', 'Am Samstag regnet es leider.', 'দুঃখের বিষয়, শনিবার বৃষ্টি হবে।'],
      ['A', 'Oh, dann nehme ich einen Regenschirm mit.', 'ওহ, তাহলে আমি একটা ছাতা সাথে নেব।'],
      ['B', 'Ja, das ist eine gute Idee. Viel Spaß!', 'হ্যাঁ, এটা ভালো বুদ্ধি। অনেক মজা করো!'],
    ],
    [
      { term: 'Wie ist das Wetter?', bn: '„আবহাওয়া কেমন?“' },
      { term: 'Es regnet.', bn: '„বৃষ্টি হচ্ছে।“ আবহাওয়ার কথায় „es“ দিয়ে বাক্য শুরু হয়।' },
      { term: 'der Regenschirm', bn: 'ছাতা।' },
    ],
  ),
  dialog(
    'cinema',
    'Im Kino',
    { bn: 'সিনেমা হলে', en: 'At the cinema' },
    [
      ['A', 'Guten Abend, zwei Karten für den Film um 20 Uhr, bitte.', 'শুভ সন্ধ্যা, রাত ৮টার সিনেমার দুটো টিকিট দিন, প্লিজ।'],
      ['B', 'Möchten Sie lieber hinten oder vorne sitzen?', 'আপনারা পেছনে বসতে চান, নাকি সামনে?'],
      ['A', 'Hinten, bitte. Gibt es einen Studentenrabatt? Ich bin noch Student.', 'পেছনে, প্লিজ। ছাত্রদের জন্য কোনো ছাড় আছে? আমি এখনো ছাত্র।'],
      ['B', 'Ja, mit Studentenausweis zahlen Sie 7 Euro pro Karte.', 'হ্যাঁ, স্টুডেন্ট আইডি কার্ড থাকলে প্রতি টিকিট ৭ ইউরো।'],
      ['A', 'Super. Hier sind 14 Euro.', 'দারুণ। এই নিন ১৪ ইউরো।'],
      ['B', 'Danke. Viel Spaß beim Film!', 'ধন্যবাদ। সিনেমা উপভোগ করুন!'],
    ],
    [
      { term: 'die Karte', bn: 'এখানে: টিকিট।' },
      { term: 'Gibt es …?', bn: '„… আছে কি?“ কোনো কিছু আছে কিনা জানতে।' },
      { term: 'der Rabatt', bn: 'দামে ছাড়, ডিসকাউন্ট।' },
    ],
  ),
  dialog(
    'clothes',
    'Im Kleidungsgeschäft',
    { bn: 'কাপড়ের দোকানে', en: 'At the clothes shop' },
    [
      ['A', 'Entschuldigung, haben Sie dieses T-Shirt in Größe M?', 'মাফ করবেন, এই টি-শার্টটা কি M সাইজে আছে?'],
      ['B', 'Ja, hier ist es. Möchten Sie es anprobieren?', 'হ্যাঁ, এই যে। আপনি কি এটা পরে দেখতে চান?'],
      ['A', 'Ja, gern. Wo ist die Umkleidekabine? Ich möchte auch noch eine Jacke anprobieren.', 'হ্যাঁ, অবশ্যই। চেঞ্জিং রুম কোথায়? আমি একটা জ্যাকেটও পরে দেখতে চাই।'],
      ['B', 'Dort rechts, neben dem Spiegel.', 'ওই ডান দিকে, আয়নার পাশে।'],
      ['A', 'Danke. Wie viel kostet das T-Shirt?', 'ধন্যবাদ। টি-শার্টটার দাম কত?'],
      ['B', 'Es kostet 15 Euro. Die Jacke kostet 40 Euro.', 'এটার দাম ১৫ ইউরো। জ্যাকেটের দাম ৪০ ইউরো।'],
    ],
    [
      { term: 'die Größe', bn: 'সাইজ, মাপ।' },
      { term: 'anprobieren', bn: 'কাপড় কেনার আগে পরে দেখা।' },
      { term: 'die Umkleidekabine', bn: 'দোকানের চেঞ্জিং রুম।' },
    ],
  ),
  dialog(
    'parcel',
    'Ein Paket abholen',
    { bn: 'পার্সেল তুলতে যাওয়া', en: 'Picking up a parcel' },
    [
      ['A', 'Guten Tag, ich möchte ein Paket abholen.', 'শুভ দিন, আমি একটা পার্সেল নিতে এসেছি।'],
      ['B', 'Haben Sie eine Benachrichtigung?', 'আপনার কাছে নোটিশ কার্ডটা আছে?'],
      ['A', 'Ja, hier bitte. Und hier ist mein Ausweis. Das Paket ist für meine Frau.', 'হ্যাঁ, এই নিন। আর এই যে আমার পরিচয়পত্র। পার্সেলটা আমার স্ত্রীর জন্য।'],
      ['B', 'Danke. Das Paket ist groß. Möchten Sie eine Tasche?', 'ধন্যবাদ। পার্সেলটা বড়। একটা ব্যাগ লাগবে?'],
      ['A', 'Nein, danke. Ich trage es so.', 'না, ধন্যবাদ। আমি এভাবেই নিয়ে যাব।'],
      ['B', 'Bitte schön. Schönen Tag!', 'এই নিন। দিনটা ভালো কাটুক!'],
    ],
    [
      { term: 'abholen', bn: 'কোথাও থেকে কিছু তুলে আনা। বাক্যে ভাগ হয়: Ich hole das Paket ab।' },
      { term: 'der Ausweis', bn: 'পরিচয়পত্র, আইডি কার্ড।' },
      { term: 'die Benachrichtigung', bn: 'নোটিশ বা খবর জানানোর কাগজ।' },
    ],
  ),
  dialog(
    'hotel',
    'Im Hotel',
    { bn: 'হোটেলে', en: 'At the hotel' },
    [
      ['A', 'Guten Tag, ich habe eine Reservierung. Mein Name ist Müller.', 'শুভ দিন, আমার একটা রিজার্ভেশন আছে। আমার নাম মুলার।'],
      ['B', 'Guten Tag, Herr Müller. Ein Einzelzimmer für zwei Nächte, richtig?', 'শুভ দিন, মিস্টার মুলার। দুই রাতের জন্য একটা সিঙ্গেল রুম, তাই তো?'],
      ['A', 'Ja, genau. Ist das Frühstück inklusive? Ich frühstücke immer gern im Hotel.', 'হ্যাঁ, ঠিক তাই। সকালের নাশতা কি দামের মধ্যে ধরা? আমি সবসময় হোটেলে নাশতা করতে পছন্দ করি।'],
      ['B', 'Ja, das Frühstück ist von 7 bis 10 Uhr.', 'হ্যাঁ, নাশতা সকাল ৭টা থেকে ১০টা পর্যন্ত।'],
      ['A', 'Perfekt. Und wann muss ich auschecken?', 'চমৎকার। আর কখন আমাকে চেক-আউট করতে হবে?'],
      ['B', 'Bis 11 Uhr, bitte.', '১১টার মধ্যে, প্লিজ।'],
    ],
    [
      { term: 'das Einzelzimmer', bn: 'একজনের রুম, সিঙ্গেল রুম। দুজনের রুম = das Doppelzimmer।' },
      { term: 'inklusive', bn: 'দামের মধ্যে ধরা আছে।' },
      { term: 'Ja, genau.', bn: '„হ্যাঁ, ঠিক তাই।“' },
    ],
  ),
  dialog(
    'museum',
    'Nach dem Weg zum Museum',
    { bn: 'জাদুঘরের পথ জিজ্ঞেস করা', en: 'The way to the museum' },
    [
      ['A', 'Entschuldigung, wie komme ich zum Museum?', 'মাফ করবেন, জাদুঘরে কীভাবে যাব?'],
      ['B', 'Nehmen Sie die U-Bahn Linie 3 bis zur Station „Museum“.', '৩ নম্বর লাইনের মেট্রো ধরে „Museum“ স্টেশন পর্যন্ত যান।'],
      ['A', 'Wie lange dauert die Fahrt? Ich habe es nicht eilig.', 'যেতে কতক্ষণ লাগে? আমার কোনো তাড়া নেই।'],
      ['B', 'Etwa zehn Minuten. Das Museum ist direkt am Ausgang.', 'প্রায় দশ মিনিট। জাদুঘরটা বের হওয়ার পথের ঠিক পাশেই।'],
      ['A', 'Kostet der Eintritt etwas?', 'ঢুকতে কি টাকা লাগে?'],
      ['B', 'Ja, 8 Euro für Erwachsene.', 'হ্যাঁ, প্রাপ্তবয়স্কদের জন্য ৮ ইউরো।'],
    ],
    [
      { term: 'Wie komme ich zum …?', bn: 'পথ জানতে: „… এ কীভাবে যাব?“' },
      { term: 'die U-Bahn', bn: 'মাটির নিচের ট্রেন, মেট্রো।' },
      { term: 'der Eintritt', bn: 'প্রবেশ, ঢোকার টিকিটের দাম।' },
    ],
  ),
  dialog(
    'phone',
    'Am Telefon',
    { bn: 'ফোনে অ্যাপয়েন্টমেন্ট নেওয়া', en: 'On the phone' },
    [
      ['A', 'Guten Tag, Praxis Dr. Weber. Was kann ich für Sie tun?', 'শুভ দিন, ডা. ভেবারের চেম্বার। আপনার জন্য কী করতে পারি?'],
      ['B', 'Guten Tag, ich möchte einen Termin machen. Ich habe seit drei Tagen Rückenschmerzen.', 'শুভ দিন, আমি একটা অ্যাপয়েন্টমেন্ট নিতে চাই। তিন দিন ধরে আমার পিঠে ব্যথা।'],
      ['A', 'Wann haben Sie Zeit?', 'আপনার কখন সময় হবে?'],
      ['B', 'Am Donnerstagvormittag, bitte.', 'বৃহস্পতিবার সকালে, প্লিজ।'],
      ['A', 'Um 9.30 Uhr ist noch frei. Passt das?', 'সকাল সাড়ে ৯টা এখনো খালি আছে। চলবে?'],
      ['B', 'Ja, perfekt. Vielen Dank!', 'হ্যাঁ, একদম ঠিক আছে। অনেক ধন্যবাদ!'],
    ],
    [
      { term: 'einen Termin machen', bn: 'অ্যাপয়েন্টমেন্ট নেওয়া।' },
      { term: 'seit drei Tagen', bn: '„তিন দিন ধরে“। এখনো চলছে এমন কিছুর জন্য „seit“।' },
      { term: 'Passt das?', bn: '„এটা চলবে? আপনার সুবিধা হবে?“' },
    ],
  ),
  dialog(
    'doctor',
    'Beim Arzt',
    { bn: 'ডাক্তারের কাছে', en: 'At the doctor' },
    [
      ['A', 'Guten Tag, was fehlt Ihnen?', 'শুভ দিন, আপনার কী সমস্যা?'],
      ['B', 'Ich habe seit gestern Kopfschmerzen und Fieber. Ich fühle mich sehr schlecht.', 'গতকাল থেকে আমার মাথাব্যথা আর জ্বর। আমার খুব খারাপ লাগছে।'],
      ['A', 'Haben Sie auch Husten?', 'আপনার কি কাশিও আছে?'],
      ['B', 'Ja, ein bisschen. Und ich bin sehr müde.', 'হ্যাঁ, একটু। আর আমি খুব ক্লান্ত।'],
      ['A', 'Sie sollten im Bett bleiben und viel Wasser trinken. Hier ist ein Rezept.', 'আপনার বিছানায় বিশ্রাম নেওয়া আর প্রচুর পানি খাওয়া উচিত। এই নিন প্রেসক্রিপশন।'],
      ['B', 'Vielen Dank, Frau Doktor. Wann soll ich wieder kommen?', 'অনেক ধন্যবাদ, ডাক্তার। আবার কবে আসব?'],
    ],
    [
      { term: 'Was fehlt Ihnen?', bn: 'ডাক্তারের প্রশ্ন: „আপনার কী সমস্যা?“' },
      { term: 'das Fieber / der Husten', bn: 'জ্বর / কাশি।' },
      { term: 'das Rezept', bn: 'এখানে: ডাক্তারের প্রেসক্রিপশন। (রান্নার রেসিপিও „Rezept“।)' },
    ],
  ),
  dialog(
    'office',
    'Im Büro',
    { bn: 'অফিসে', en: 'At the office' },
    [
      ['A', 'Guten Morgen, Herr Braun. Haben Sie kurz Zeit?', 'সুপ্রভাত, মিস্টার ব্রাউন। আপনার কি একটু সময় হবে?'],
      ['B', 'Guten Morgen. Ja, was gibt es?', 'সুপ্রভাত। হ্যাঁ, কী ব্যাপার?'],
      ['A', 'Wo ist der Besprechungsraum? Ich habe um 10 Uhr ein Meeting mit dem Chef.', 'মিটিং রুমটা কোথায়? ১০টায় বসের সাথে আমার একটা মিটিং আছে।'],
      ['B', 'Der Besprechungsraum ist im zweiten Stock, Zimmer 204.', 'মিটিং রুমটা তিনতলায়, রুম ২০৪।'],
      ['A', 'Vielen Dank. Und wie lange dauert das Meeting?', 'অনেক ধন্যবাদ। আর মিটিং কতক্ষণ চলবে?'],
      ['B', 'Etwa eine Stunde, glaube ich.', 'আমার মনে হয়, প্রায় এক ঘণ্টা।'],
    ],
    [
      { term: 'Haben Sie kurz Zeit?', bn: '„আপনার কি একটু সময় হবে?“' },
      { term: 'im zweiten Stock', bn: 'জার্মানিতে নিচতলা গোনা হয় না, তাই „zweiter Stock“ আমাদের হিসাবে তিনতলা।' },
      { term: 'glaube ich', bn: '„আমার মনে হয়“।' },
    ],
  ),
  dialog(
    'goodbye',
    'Sich verabschieden',
    { bn: 'বিদায় নেওয়া', en: 'Saying goodbye' },
    [
      ['A', 'Es ist schon spät. Ich muss leider gehen.', 'অনেক দেরি হয়ে গেছে। দুঃখিত, আমাকে যেতে হবে।'],
      ['B', 'Schade! Es war sehr schön heute.', 'আফসোস! আজ খুব ভালো লাগল।'],
      ['A', 'Ja, mir hat es auch gefallen. Danke für den Kaffee und den Kuchen.', 'হ্যাঁ, আমারও ভালো লেগেছে। কফি আর কেকের জন্য ধন্যবাদ।'],
      ['B', 'Gern. Wir sehen uns nächste Woche, oder?', 'স্বাগতম। আগামী সপ্তাহে দেখা হচ্ছে, তাই না?'],
      ['A', 'Ja, gern. Bis nächste Woche! Tschüss!', 'হ্যাঁ, অবশ্যই। আগামী সপ্তাহে দেখা হবে! বিদায়!'],
      ['B', 'Tschüss! Schönen Abend noch!', 'বিদায়! সন্ধ্যাটা ভালো কাটুক!'],
    ],
    [
      { term: 'Schade!', bn: '„আফসোস! খারাপ লাগল!“' },
      { term: 'Es hat mir gefallen.', bn: '„আমার ভালো লেগেছে।“' },
      { term: 'Tschüss!', bn: 'অনানুষ্ঠানিক বিদায়: „বাই!“' },
    ],
  ),
  dialog(
    'car',
    'Ein Auto mieten',
    { bn: 'গাড়ি ভাড়া নেওয়া', en: 'Renting a car' },
    [
      ['A', 'Guten Tag, ich möchte ein Auto für drei Tage mieten.', 'শুভ দিন, আমি তিন দিনের জন্য একটা গাড়ি ভাড়া নিতে চাই।'],
      ['B', 'Gern. Möchten Sie ein kleines oder ein großes Auto?', 'অবশ্যই। আপনি ছোট গাড়ি চান, নাকি বড়?'],
      ['A', 'Ein kleines Auto, bitte. Ich fahre nur in der Stadt und parke oft.', 'একটা ছোট গাড়ি, প্লিজ। আমি শুধু শহরের মধ্যে চালাব আর প্রায়ই পার্ক করব।'],
      ['B', 'Das kostet 40 Euro pro Tag. Haben Sie einen Führerschein?', 'এর ভাড়া দিনে ৪০ ইউরো। আপনার কি ড্রাইভিং লাইসেন্স আছে?'],
      ['A', 'Ja, hier bitte. Und wo kann ich das Auto parken?', 'হ্যাঁ, এই নিন। আর গাড়িটা কোথায় পার্ক করতে পারব?'],
      ['B', 'Auf dem Parkplatz hinter dem Gebäude.', 'বিল্ডিংয়ের পেছনের পার্কিংয়ে।'],
    ],
    [
      { term: 'mieten', bn: 'ভাড়া নেওয়া।' },
      { term: 'der Führerschein', bn: 'গাড়ি চালানোর লাইসেন্স।' },
      { term: 'hinter dem Gebäude', bn: '„বিল্ডিংয়ের পেছনে“। hinter = পেছনে।' },
    ],
  ),
  dialog(
    'gym',
    'Im Fitnessstudio',
    { bn: 'জিমে ভর্তি হওয়া', en: 'At the gym' },
    [
      ['A', 'Guten Tag, ich möchte mich im Fitnessstudio anmelden.', 'শুভ দিন, আমি জিমে ভর্তি হতে চাই।'],
      ['B', 'Gern. Haben Sie schon einen Kurs ausgewählt?', 'অবশ্যই। আপনি কি কোনো কোর্স বেছে নিয়েছেন?'],
      ['A', 'Ja, ich interessiere mich für den Yoga-Kurs am Abend. Ich arbeite tagsüber.', 'হ্যাঁ, সন্ধ্যার যোগব্যায়াম কোর্সে আমার আগ্রহ আছে। আমি দিনের বেলা কাজ করি।'],
      ['B', 'Der Kurs ist dienstags und donnerstags um 19 Uhr.', 'কোর্সটা প্রতি মঙ্গলবার আর বৃহস্পতিবার সন্ধ্যা ৭টায় হয়।'],
      ['A', 'Wie viel kostet die Mitgliedschaft pro Monat?', 'মাসে সদস্য ফি কত?'],
      ['B', '30 Euro pro Monat. Der erste Monat ist gratis.', 'মাসে ৩০ ইউরো। প্রথম মাস ফ্রি।'],
    ],
    [
      { term: 'sich anmelden', bn: 'নাম লেখানো, ভর্তি বা রেজিস্ট্রেশন করা।' },
      { term: 'dienstags', bn: '„প্রতি মঙ্গলবার“। দিনের নামের শেষে „-s“ মানে প্রতি সপ্তাহের ওই দিন।' },
      { term: 'gratis', bn: 'বিনা পয়সায়, ফ্রি।' },
    ],
  ),
  dialog(
    'flat',
    'Eine Wohnung besichtigen',
    { bn: 'বাসা দেখতে যাওয়া', en: 'Viewing a flat' },
    [
      ['A', 'Guten Tag, ich komme wegen der Wohnungsanzeige.', 'শুভ দিন, আমি বাসা ভাড়ার বিজ্ঞাপনটা দেখে এসেছি।'],
      ['B', 'Guten Tag, kommen Sie herein. Die Wohnung hat zwei Zimmer und einen Balkon.', 'শুভ দিন, ভেতরে আসুন। বাসাটায় দুটো রুম আর একটা বারান্দা আছে।'],
      ['A', 'Wie hoch ist die Miete?', 'ভাড়া কত?'],
      ['B', '650 Euro pro Monat, ohne Nebenkosten.', 'মাসে ৬৫০ ইউরো, অন্যান্য খরচ (পানি, হিটিং ইত্যাদি) ছাড়া।'],
      ['A', 'Ist die Wohnung möbliert? Ich habe keine Möbel.', 'বাসাটা কি আসবাবসহ? আমার কোনো আসবাবপত্র নেই।'],
      ['B', 'Nein, sie ist leer. Aber die Küche ist neu.', 'না, এটা খালি। তবে রান্নাঘরটা নতুন।'],
    ],
    [
      { term: 'die Miete', bn: 'বাসা ভাড়া।' },
      { term: 'die Nebenkosten', bn: 'ভাড়ার বাইরের খরচ: পানি, হিটিং, ময়লা ইত্যাদি।' },
      { term: 'möbliert', bn: 'আসবাবপত্রসহ।' },
    ],
  ),
  dialog(
    'language-class',
    'Im Sprachkurs',
    { bn: 'ভাষা কোর্সের ক্লাসে', en: 'In the language class' },
    [
      ['A', 'Entschuldigung, verstehe ich das richtig? Das Verb steht an Position zwei?', 'মাফ করবেন, আমি কি ঠিক বুঝলাম? ক্রিয়া দ্বিতীয় স্থানে বসে?'],
      ['B', 'Ja, genau. Im Hauptsatz steht das Verb an Position zwei.', 'হ্যাঁ, ঠিক তাই। মূল বাক্যে ক্রিয়া দ্বিতীয় স্থানে বসে।'],
      ['A', 'Und im Nebensatz? Das ist für mich sehr schwierig.', 'আর অধীন বাক্যে? এটা আমার জন্য খুব কঠিন।'],
      ['B', 'Im Nebensatz steht das Verb am Ende.', 'অধীন বাক্যে ক্রিয়া একদম শেষে বসে।'],
      ['A', 'Ah, jetzt verstehe ich. Vielen Dank!', 'আহ, এবার বুঝলাম। অনেক ধন্যবাদ!'],
      ['B', 'Gern. Üben wir zusammen?', 'স্বাগতম। চলো একসাথে অনুশীলন করি?'],
    ],
    [
      { term: 'Verstehe ich das richtig?', bn: '„আমি কি ঠিক বুঝলাম?“ নিশ্চিত হতে জিজ্ঞেস করা।' },
      { term: 'der Hauptsatz', bn: 'মূল বাক্য। এখানে ক্রিয়া দ্বিতীয় স্থানে।' },
      { term: 'der Nebensatz', bn: 'অধীন বাক্য (যেমন „weil“-এর পরে)। এখানে ক্রিয়া শেষে।' },
    ],
  ),
];
