import type { Note, TextItem } from '../../src/content/types';

/**
 * A2 emails, the person's 20 formal emails, easiest first: short requests
 * and thanks come first, emails with weil, ob and dass clauses later. Each
 * one is a topic that opens after the one before it.
 *
 * Every email is greeting, body, closing and signature, each with its full
 * Bangla translation, which the app shows as one block under the email.
 */
type Part = [de: string, bn: string];

function email(id: string, title: { de: string; bn: string; en: string }, parts: [greeting: Part, body: Part, signature: Part], notes: Note[]): TextItem {
  const [greeting, body, signature] = parts;
  return {
    id: `a2-email-${id}`,
    level: 'A2',
    module: 'emails',
    topic: 'E-Mail',
    tag: 'E-Mail · formell',
    title,
    lines: [greeting, body, FORMAL_END, signature].map(([de, bn]) => ({ de, bn })),
    notes,
  };
}

const DAMEN_HERREN: Part = ['Sehr geehrte Damen und Herren,', 'সম্মানিত মহোদয়/মহোদয়া,'];
const FORMAL_END: Part = ['Mit freundlichen Grüßen', 'বিনীত শুভেচ্ছাসহ'];
const FARHAN: Part = ['Farhan Ahmed', 'ফারহান আহমেদ'];
const NUSRAT: Part = ['Nusrat Jahan', 'নুসরাত জাহান'];
const RAFI: Part = ['Rafi Hasan', 'রাফি হাসান'];
const SADIA: Part = ['Sadia Islam', 'সাদিয়া ইসলাম'];

export const a2Emails: TextItem[] = [
  email(
    'appointment-request',
    { de: 'Um einen Termin bitten', bn: 'অ্যাপয়েন্টমেন্ট চাওয়া', en: 'Asking for an appointment' },
    [
      DAMEN_HERREN,
      [
        'ich möchte gern einen Termin bei Ihnen machen. Ich habe am Dienstag und am Donnerstag am Nachmittag Zeit. Ist das möglich? Bitte antworten Sie mir per E-Mail. Vielen Dank für Ihre Antwort.',
        'আমি আপনার কাছে একটি অ্যাপয়েন্টমেন্ট নিতে চাই। মঙ্গলবার আর বৃহস্পতিবার বিকেলে আমার সময় আছে। এটা কি সম্ভব? অনুগ্রহ করে আমাকে ইমেইলে উত্তর দিন। আপনার উত্তরের জন্য অনেক ধন্যবাদ।',
      ],
      FARHAN,
    ],
    [
      { term: 'einen Termin machen', bn: 'অ্যাপয়েন্টমেন্ট নেওয়া বা ঠিক করা।' },
      { term: 'Ist das möglich?', bn: '„এটা কি সম্ভব?“ ভদ্রভাবে কিছু জানতে চাওয়ার ছোট প্রশ্ন।' },
      { term: 'per E-Mail', bn: 'ইমেইলের মাধ্যমে। একইভাবে: per Post = ডাকে।' },
    ],
  ),
  email(
    'thanks',
    { de: 'Sich für Hilfe bedanken', bn: 'সাহায্যের জন্য ধন্যবাদ জানানো', en: 'Thanking for help' },
    [
      ['Sehr geehrte Frau Hoffmann,', 'সম্মানিত মিসেস হফমান,'],
      [
        'vielen Dank für Ihre Hilfe letzte Woche. Sie haben mir sehr geholfen und ich bin sehr froh. Ich möchte mich noch einmal herzlich bei Ihnen bedanken. Ich wünsche Ihnen einen schönen Tag und ein schönes Wochenende.',
        'গত সপ্তাহে আপনার সাহায্যের জন্য অনেক ধন্যবাদ। আপনি আমাকে অনেক সাহায্য করেছেন এবং আমি খুব খুশি। আমি আরেকবার আপনাকে আন্তরিক ধন্যবাদ জানাতে চাই। আপনার দিনটি সুন্দর কাটুক এবং সপ্তাহান্ত ভালো যাক।',
      ],
      NUSRAT,
    ],
    [
      { term: 'sich bei jemandem bedanken', bn: 'কাউকে ধন্যবাদ জানানো।' },
      { term: 'Sie haben mir geholfen', bn: '„আপনি আমাকে সাহায্য করেছেন“ — helfen-এর Perfekt; helfen-এর পরে Dativ (mir)।' },
      { term: 'Ich wünsche Ihnen …', bn: 'আমি আপনার … কামনা করি। শুভকামনা জানিয়ে চিঠি শেষ করার সাধারণ বাক্য।' },
    ],
  ),
  email(
    'broken-heater',
    { de: 'Die Heizung ist kaputt', bn: 'হিটার নষ্ট হয়েছে', en: 'Reporting a broken heater' },
    [
      ['Sehr geehrter Herr Schmidt,', 'সম্মানিত জনাব শ্মিট,'],
      [
        'ich habe ein Problem in meiner Wohnung. Die Heizung funktioniert seit zwei Tagen nicht mehr und es ist sehr kalt. Könnten Sie bitte schnell einen Techniker schicken? Vielen Dank für Ihre Hilfe.',
        'আমার ফ্ল্যাটে একটি সমস্যা হয়েছে। দুই দিন ধরে হিটার আর কাজ করছে না এবং খুব ঠান্ডা লাগছে। আপনি কি অনুগ্রহ করে তাড়াতাড়ি একজন টেকনিশিয়ান পাঠাতে পারবেন? আপনার সাহায্যের জন্য অনেক ধন্যবাদ।',
      ],
      RAFI,
    ],
    [
      { term: 'funktioniert nicht mehr', bn: 'আর কাজ করছে না। „nicht mehr“ = আর না।' },
      { term: 'seit zwei Tagen', bn: 'দুই দিন ধরে। „seit“ মানে অতীতে শুরু হয়ে এখনও চলছে।' },
      { term: 'Könnten Sie bitte …?', bn: '„আপনি কি অনুগ্রহ করে … পারবেন?“ — können-এর ভদ্র রূপ, অনুরোধে খুব কাজে লাগে।' },
    ],
  ),
  email(
    'cannot-come',
    { de: 'Absage einer Einladung', bn: 'দাওয়াতে আসতে না পারা', en: 'Saying you cannot come' },
    [
      ['Sehr geehrte Frau Richter,', 'সম্মানিত মিসেস রিখটার,'],
      [
        'leider kann ich am Samstag nicht zu Ihrer Feier kommen. Meine Familie besucht mich an diesem Tag und ich muss zu Hause sein. Es tut mir sehr leid. Ich wünsche Ihnen ein schönes Fest.',
        'দুঃখিত, শনিবার আমি আপনার অনুষ্ঠানে আসতে পারব না। সেদিন আমার পরিবার আমার কাছে বেড়াতে আসছে এবং আমাকে বাসায় থাকতে হবে। আমি খুবই দুঃখিত। আপনার অনুষ্ঠান সুন্দর হোক।',
      ],
      SADIA,
    ],
    [
      { term: 'leider', bn: 'দুঃখজনকভাবে — খারাপ খবর ভদ্রভাবে দেওয়ার শব্দ।' },
      { term: 'Es tut mir leid.', bn: 'আমি দুঃখিত। ক্ষমা চাওয়ার বা দুঃখ প্রকাশের সাধারণ বাক্য।' },
      { term: 'an diesem Tag', bn: 'সেই দিনে।' },
    ],
  ),
  email(
    'accept-invitation',
    { de: 'Eine Einladung annehmen', bn: 'দাওয়াত গ্রহণ করা', en: 'Accepting an invitation' },
    [
      ['Sehr geehrte Frau Weber,', 'সম্মানিত মিসেস ভেবার,'],
      [
        'vielen Dank für Ihre Einladung. Ich komme sehr gern zu Ihrer Feier am Samstag. Könnten Sie mir bitte noch sagen, wann die Feier beginnt und wo sie genau stattfindet? Ich freue mich sehr.',
        'আপনার দাওয়াতের জন্য অনেক ধন্যবাদ। শনিবার আপনার অনুষ্ঠানে আমি খুব আনন্দের সাথে আসব। অনুগ্রহ করে আমাকে আরও জানাবেন কি, অনুষ্ঠান কখন শুরু হবে আর ঠিক কোথায় হবে? আমি খুবই আনন্দিত।',
      ],
      FARHAN,
    ],
    [
      { term: 'die Einladung', bn: 'দাওয়াত, নিমন্ত্রণ। einladen = দাওয়াত দেওয়া।' },
      { term: 'stattfinden', bn: 'অনুষ্ঠিত হওয়া। Die Feier findet im Garten statt = অনুষ্ঠান বাগানে হবে।' },
      { term: '…, wann die Feier beginnt', bn: 'পরোক্ষ প্রশ্ন: wann/wo-এর পরের বাক্যে ক্রিয়া শেষে যায়।' },
    ],
  ),
  email(
    'opening-hours',
    { de: 'Nach den Öffnungszeiten fragen', bn: 'খোলার সময় জানতে চাওয়া', en: 'Asking about opening hours' },
    [
      DAMEN_HERREN,
      [
        'ich möchte nächste Woche zu Ihnen kommen. Könnten Sie mir bitte sagen, wann Sie geöffnet haben und bis wann ich am Nachmittag kommen kann? Ich habe nur am Nachmittag Zeit. Vielen Dank.',
        'আমি আগামী সপ্তাহে আপনাদের কাছে আসতে চাই। অনুগ্রহ করে আমাকে জানাবেন কি, আপনারা কখন খোলা থাকেন এবং বিকেলে কয়টা পর্যন্ত আমি আসতে পারি? আমার শুধু বিকেলে সময় আছে। অনেক ধন্যবাদ।',
      ],
      NUSRAT,
    ],
    [
      { term: 'geöffnet haben', bn: 'খোলা থাকা (দোকান, অফিস)। উল্টো: geschlossen = বন্ধ।' },
      { term: 'bis wann', bn: 'কখন পর্যন্ত।' },
      { term: 'nächste Woche', bn: 'আগামী সপ্তাহে।' },
    ],
  ),
  email(
    'meeting',
    { de: 'Um ein Treffen bitten', bn: 'একটি মিটিং চাওয়া', en: 'Asking for a meeting' },
    [
      ['Sehr geehrte Frau Becker,', 'সম্মানিত মিসেস বেকার,'],
      [
        'ich möchte gern mit Ihnen über das Projekt sprechen. Haben Sie nächste Woche Zeit für ein kurzes Treffen? Könnten Sie mir bitte zwei Termine nennen? Ich kann am Montag und am Mittwoch. Vielen Dank.',
        'আমি প্রকল্পটি নিয়ে আপনার সাথে কথা বলতে চাই। আগামী সপ্তাহে কি একটি ছোট মিটিংয়ের জন্য আপনার সময় হবে? অনুগ্রহ করে আমাকে দুটি সময়ের কথা বলবেন কি? আমি সোমবার আর বুধবার পারি। অনেক ধন্যবাদ।',
      ],
      SADIA,
    ],
    [
      { term: 'sprechen über', bn: 'কোনো কিছু নিয়ে কথা বলা। über das Projekt = প্রকল্প নিয়ে।' },
      { term: 'das Treffen', bn: 'সাক্ষাৎ, মিটিং।' },
      { term: 'einen Termin nennen', bn: 'একটি সময় বলা বা প্রস্তাব করা।' },
    ],
  ),
  email(
    'course',
    { de: 'Nach einem Kurs fragen', bn: 'একটি কোর্স সম্পর্কে জানতে চাওয়া', en: 'Asking about a course' },
    [
      DAMEN_HERREN,
      [
        'ich interessiere mich für Ihren Deutschkurs am Abend. Könnten Sie mir bitte sagen, wann der Kurs beginnt, wie oft er pro Woche ist und wie viel er kostet? Ich warte auf Ihre Antwort. Vielen Dank im Voraus.',
        'আমি আপনাদের সন্ধ্যার জার্মান কোর্সে আগ্রহী। অনুগ্রহ করে আমাকে জানাবেন কি, কোর্স কখন শুরু হবে, সপ্তাহে কতবার হয় এবং এর খরচ কত? আমি আপনার উত্তরের অপেক্ষায় আছি। আগাম অনেক ধন্যবাদ।',
      ],
      RAFI,
    ],
    [
      { term: 'sich interessieren für', bn: 'কোনো কিছুতে আগ্রহী হওয়া। Ich interessiere mich für Musik = আমি সংগীতে আগ্রহী।' },
      { term: 'wie oft', bn: 'কতবার।' },
      { term: 'Vielen Dank im Voraus.', bn: 'আগাম অনেক ধন্যবাদ — অনুরোধের চিঠির শেষে লেখা হয়।' },
    ],
  ),
  email(
    'cancel-appointment',
    { de: 'Einen Termin absagen', bn: 'অ্যাপয়েন্টমেন্ট বাতিল করা', en: 'Cancelling an appointment' },
    [
      ['Sehr geehrte Frau Müller,', 'সম্মানিত মিসেস মুলার,'],
      [
        'leider kann ich am Montag nicht zu unserem Termin kommen, weil ich krank bin und zu Hause bleiben muss. Es tut mir sehr leid. Können wir bitte einen neuen Termin machen? Ich habe am Donnerstag Zeit. Vielen Dank.',
        'দুঃখিত, সোমবার আমি আমাদের অ্যাপয়েন্টমেন্টে আসতে পারব না, কারণ আমি অসুস্থ এবং আমাকে বাসায় থাকতে হবে। আমি খুবই দুঃখিত। আমরা কি অনুগ্রহ করে নতুন একটি সময় ঠিক করতে পারি? বৃহস্পতিবার আমার সময় আছে। অনেক ধন্যবাদ।',
      ],
      SADIA,
    ],
    [
      { term: 'weil', bn: 'কারণ। weil-এর পরের বাক্যে ক্রিয়া একদম শেষে যায়: weil ich krank bin।' },
      { term: 'zu Hause bleiben', bn: 'বাসায় থাকা।' },
      { term: 'einen neuen Termin machen', bn: 'নতুন সময় ঠিক করা।' },
    ],
  ),
  email(
    'change-appointment',
    { de: 'Einen Termin verschieben', bn: 'অ্যাপয়েন্টমেন্টের সময় বদলানো', en: 'Changing an appointment' },
    [
      ['Sehr geehrter Herr Bauer,', 'সম্মানিত জনাব বাউয়ার,'],
      [
        'leider kann ich am Freitag nicht kommen, weil ich arbeiten muss. Könnten wir den Termin bitte auf nächste Woche verschieben? Passt Ihnen Montag um 10 Uhr? Bitte antworten Sie mir kurz. Vielen Dank.',
        'দুঃখিত, শুক্রবার আমি আসতে পারব না, কারণ আমাকে কাজ করতে হবে। আমরা কি অনুগ্রহ করে অ্যাপয়েন্টমেন্টটি আগামী সপ্তাহে সরিয়ে নিতে পারি? সোমবার সকাল ১০টা কি আপনার জন্য সুবিধাজনক? অনুগ্রহ করে আমাকে সংক্ষেপে উত্তর দিন। অনেক ধন্যবাদ।',
      ],
      FARHAN,
    ],
    [
      { term: 'verschieben', bn: 'পিছিয়ে দেওয়া, অন্য সময়ে সরানো। auf nächste Woche verschieben = আগামী সপ্তাহে সরানো।' },
      { term: 'Passt Ihnen …?', bn: '„… কি আপনার জন্য সুবিধাজনক?“ সময় প্রস্তাব করার ভদ্র প্রশ্ন।' },
      { term: 'kurz', bn: 'সংক্ষেপে, অল্প কথায়।' },
    ],
  ),
  email(
    'hotel-late',
    { de: 'Hotel: Ich komme später an', bn: 'হোটেল: দেরিতে পৌঁছানো', en: 'Hotel: arriving later' },
    [
      DAMEN_HERREN,
      [
        'ich habe ein Zimmer in Ihrem Hotel für nächste Woche reserviert. Leider komme ich erst um 22 Uhr an, weil mein Zug später fährt. Ist das ein Problem? Bitte schreiben Sie mir kurz zurück. Danke.',
        'আমি আগামী সপ্তাহের জন্য আপনাদের হোটেলে একটি রুম বুক করেছি। দুঃখিত, আমি রাত ১০টার আগে পৌঁছাতে পারব না, কারণ আমার ট্রেন দেরিতে ছাড়বে। এতে কি কোনো সমস্যা হবে? অনুগ্রহ করে আমাকে সংক্ষেপে উত্তর লিখুন। ধন্যবাদ।',
      ],
      NUSRAT,
    ],
    [
      { term: 'reservieren', bn: 'বুক করা, আগে থেকে সংরক্ষণ করা। ich habe reserviert = আমি বুক করেছি।' },
      { term: 'erst um 22 Uhr', bn: '„রাত ১০টার আগে নয়“ — „erst“ বোঝায় প্রত্যাশার চেয়ে দেরিতে।' },
      { term: 'zurückschreiben', bn: 'উত্তর লেখা। Schreiben Sie mir zurück = আমাকে উত্তর লিখুন।' },
    ],
  ),
  email(
    'flat',
    { de: 'Informationen über eine Wohnung', bn: 'একটি ফ্ল্যাট সম্পর্কে তথ্য চাওয়া', en: 'Requesting information about a flat' },
    [
      ['Sehr geehrter Herr Neumann,', 'সম্মানিত জনাব নয়মান,'],
      [
        'ich habe Ihre Anzeige gelesen und interessiere mich für die Wohnung. Könnten Sie mir bitte sagen, wie hoch die Miete ist und ab wann die Wohnung frei ist? Vielen Dank für Ihre Antwort.',
        'আমি আপনার বিজ্ঞাপনটি পড়েছি এবং ফ্ল্যাটটিতে আগ্রহী। অনুগ্রহ করে আমাকে জানাবেন কি, ভাড়া কত এবং কবে থেকে ফ্ল্যাটটি খালি হবে? আপনার উত্তরের জন্য অনেক ধন্যবাদ।',
      ],
      RAFI,
    ],
    [
      { term: 'die Anzeige', bn: 'বিজ্ঞাপন (পত্রিকা বা ইন্টারনেটে)।' },
      { term: 'Wie hoch ist die Miete?', bn: 'ভাড়া কত? ভাড়ার পরিমাণ জানতে „hoch“ ব্যবহার হয়।' },
      { term: 'ab wann', bn: 'কবে থেকে।' },
    ],
  ),
  email(
    'repair',
    { de: 'Um eine Reparatur bitten', bn: 'মেরামতের অনুরোধ', en: 'Asking for a repair' },
    [
      ['Sehr geehrter Herr Wagner,', 'সম্মানিত জনাব ভাগনার,'],
      [
        'in meinem Badezimmer ist der Wasserhahn kaputt. Das Wasser läuft die ganze Zeit und ich kann es nicht stoppen. Könnten Sie bitte so schnell wie möglich jemanden schicken? Vielen Dank im Voraus für Ihre Hilfe.',
        'আমার বাথরুমের পানির কল নষ্ট হয়ে গেছে। সারাক্ষণ পানি পড়ছে এবং আমি তা বন্ধ করতে পারছি না। আপনি কি অনুগ্রহ করে যত তাড়াতাড়ি সম্ভব কাউকে পাঠাতে পারবেন? আপনার সাহায্যের জন্য আগাম অনেক ধন্যবাদ।',
      ],
      SADIA,
    ],
    [
      { term: 'der Wasserhahn', bn: 'পানির কল।' },
      { term: 'die ganze Zeit', bn: 'সারাক্ষণ, সব সময়।' },
      { term: 'so schnell wie möglich', bn: 'যত তাড়াতাড়ি সম্ভব।' },
    ],
  ),
  email(
    'bill',
    { de: 'Eine Frage zur Rechnung', bn: 'বিল সম্পর্কে প্রশ্ন', en: 'Asking about a bill' },
    [
      DAMEN_HERREN,
      [
        'ich habe eine Frage zu meiner Rechnung. Ich habe die Rechnung am Montag bekommen. Könnten Sie mir bitte sagen, bis wann ich bezahlen muss und ob ich per Bank überweisen kann? Vielen Dank.',
        'আমার বিল সম্পর্কে আমার একটি প্রশ্ন আছে। সোমবার আমি বিলটি পেয়েছি। অনুগ্রহ করে আমাকে জানাবেন কি, কবের মধ্যে আমাকে টাকা দিতে হবে এবং আমি ব্যাংকের মাধ্যমে টাকা পাঠাতে পারব কিনা? অনেক ধন্যবাদ।',
      ],
      FARHAN,
    ],
    [
      { term: 'die Rechnung', bn: 'বিল।' },
      { term: 'ob', bn: '„কিনা“: ob ich überweisen kann = আমি পাঠাতে পারব কিনা। ক্রিয়া শেষে যায়।' },
      { term: 'überweisen', bn: 'ব্যাংকের মাধ্যমে টাকা পাঠানো (ট্রান্সফার)।' },
    ],
  ),
  email(
    'documents',
    { de: 'Nach Dokumenten fragen', bn: 'কাগজপত্র সম্পর্কে জানতে চাওয়া', en: 'Asking about documents' },
    [
      ['Sehr geehrte Frau Klein,', 'সম্মানিত মিসেস ক্লাইন,'],
      [
        'ich brauche für meine Anmeldung einige Dokumente. Könnten Sie mir bitte sagen, welche Papiere ich mitbringen muss und wann ich sie bringen soll? Vielen Dank für Ihre Hilfe. Ich warte auf Ihre Antwort.',
        'আমার নিবন্ধনের জন্য কিছু কাগজপত্র দরকার। অনুগ্রহ করে আমাকে জানাবেন কি, কোন কাগজগুলো আমাকে সাথে আনতে হবে এবং কখন আনতে হবে? আপনার সাহায্যের জন্য অনেক ধন্যবাদ। আমি আপনার উত্তরের অপেক্ষায় আছি।',
      ],
      NUSRAT,
    ],
    [
      { term: 'die Anmeldung', bn: 'নিবন্ধন, নাম লেখানো (যেমন ঠিকানা বা কোর্সে)।' },
      { term: 'mitbringen', bn: 'সাথে আনা। ich bringe … mit।' },
      { term: 'welche Papiere', bn: 'কোন কাগজগুলো। welche = কোনগুলো।' },
    ],
  ),
  email(
    'delay',
    { de: 'Ich komme später', bn: 'দেরির কথা জানানো', en: 'Informing about a delay' },
    [
      ['Sehr geehrter Herr Fischer,', 'সম্মানিত জনাব ফিশার,'],
      [
        'leider muss ich Ihnen mitteilen, dass ich mich heute etwas verspäte. Mein Zug hat 20 Minuten Verspätung und ich komme später an. Ich bin gegen 15 Uhr bei Ihnen. Bitte warten Sie kurz.',
        'দুঃখের সাথে আপনাকে জানাতে হচ্ছে যে আজ আমার একটু দেরি হবে। আমার ট্রেন ২০ মিনিট দেরিতে চলছে এবং আমি দেরিতে পৌঁছাব। আমি বিকেল ৩টার দিকে আপনার কাছে পৌঁছাব। অনুগ্রহ করে একটু অপেক্ষা করুন।',
      ],
      RAFI,
    ],
    [
      { term: 'mitteilen', bn: 'জানানো (আনুষ্ঠানিকভাবে)। dass-এর পরের বাক্যে ক্রিয়া শেষে যায়।' },
      { term: 'sich verspäten', bn: 'দেরি করা। die Verspätung = দেরি।' },
      { term: 'gegen 15 Uhr', bn: 'বিকেল ৩টার দিকে। „gegen“ সময়ের আগে = প্রায়।' },
    ],
  ),
  email(
    'missing-class',
    { de: 'Ich fehle im Kurs', bn: 'ক্লাসে অনুপস্থিত থাকা', en: 'Missing a class' },
    [
      ['Sehr geehrte Frau Lang,', 'সম্মানিত মিসেস লাং,'],
      [
        'leider kann ich nächste Woche nicht am Kurs teilnehmen, weil ich beruflich verreisen muss. Könnten Sie mir bitte die Hausaufgaben per E-Mail schicken? Vielen Dank für Ihr Verständnis und Ihre Hilfe.',
        'দুঃখিত, আগামী সপ্তাহে আমি কোর্সে অংশ নিতে পারব না, কারণ কাজের জন্য আমাকে বাইরে যেতে হবে। অনুগ্রহ করে আমাকে বাড়ির কাজগুলো ইমেইলে পাঠাবেন কি? আপনার বিবেচনা ও সাহায্যের জন্য অনেক ধন্যবাদ।',
      ],
      SADIA,
    ],
    [
      { term: 'teilnehmen an', bn: 'অংশ নেওয়া। am Kurs teilnehmen = কোর্সে অংশ নেওয়া।' },
      { term: 'beruflich verreisen', bn: 'কাজের জন্য ভ্রমণে যাওয়া।' },
      { term: 'Vielen Dank für Ihr Verständnis.', bn: 'আপনার বিবেচনার জন্য অনেক ধন্যবাদ — অসুবিধার জন্য ভদ্র সমাপ্তি।' },
    ],
  ),
  email(
    'apology',
    { de: 'Entschuldigung für einen Fehler', bn: 'ভুলের জন্য ক্ষমা চাওয়া', en: 'Apologizing for a mistake' },
    [
      ['Sehr geehrte Frau Schwarz,', 'সম্মানিত মিসেস শোয়ার্জ,'],
      [
        'es tut mir sehr leid, aber ich habe einen Fehler gemacht. Ich habe den Termin falsch notiert und bin nicht gekommen. Könnten wir bitte einen neuen Termin ausmachen? Vielen Dank für Ihr Verständnis.',
        'আমি খুবই দুঃখিত, কিন্তু আমি একটি ভুল করেছি। আমি অ্যাপয়েন্টমেন্টের সময় ভুল লিখে রেখেছিলাম এবং আসিনি। আমরা কি অনুগ্রহ করে নতুন একটি সময় ঠিক করতে পারি? আপনার বিবেচনার জন্য অনেক ধন্যবাদ।',
      ],
      FARHAN,
    ],
    [
      { term: 'einen Fehler machen', bn: 'ভুল করা। ich habe einen Fehler gemacht = আমি ভুল করেছি।' },
      { term: 'falsch notieren', bn: 'ভুল লিখে রাখা।' },
      { term: 'einen Termin ausmachen', bn: 'সময় ঠিক করা (einen Termin machen-এর মতো)।' },
    ],
  ),
  email(
    'certificate',
    { de: 'Um eine Bescheinigung bitten', bn: 'সনদপত্র চাওয়া', en: 'Asking for a certificate' },
    [
      DAMEN_HERREN,
      [
        'ich habe den Kurs im Mai beendet. Könnten Sie mir bitte eine Bescheinigung über den Kurs schicken? Ich brauche sie für meinen Job und muss sie nächste Woche abgeben. Vielen Dank.',
        'আমি মে মাসে কোর্সটি শেষ করেছি। অনুগ্রহ করে আমাকে কোর্সের একটি সনদপত্র পাঠাবেন কি? আমার চাকরির জন্য এটা দরকার এবং আগামী সপ্তাহে এটা জমা দিতে হবে। অনেক ধন্যবাদ।',
      ],
      NUSRAT,
    ],
    [
      { term: 'die Bescheinigung', bn: 'সনদপত্র, প্রত্যয়নপত্র।' },
      { term: 'beenden', bn: 'শেষ করা। ich habe beendet = আমি শেষ করেছি।' },
      { term: 'abgeben', bn: 'জমা দেওয়া। ich gebe … ab।' },
    ],
  ),
  email(
    'booking',
    { de: 'Eine Buchung bestätigen', bn: 'বুকিং নিশ্চিত করা', en: 'Confirming a booking' },
    [
      DAMEN_HERREN,
      [
        'vielen Dank für Ihre Bestätigung. Ich möchte Ihnen mitteilen, dass ich das Zimmer vom 3. bis 7. Juni nehme. Eine Frage: Gibt es im Hotel einen Parkplatz und kostet er extra? Danke.',
        'আপনাদের নিশ্চিতকরণের জন্য অনেক ধন্যবাদ। আমি আপনাদের জানাতে চাই যে আমি ৩ থেকে ৭ জুন পর্যন্ত রুমটি নিচ্ছি। একটি প্রশ্ন: হোটেলে কি পার্কিংয়ের জায়গা আছে এবং এর জন্য কি আলাদা খরচ দিতে হয়? ধন্যবাদ।',
      ],
      RAFI,
    ],
    [
      { term: 'die Bestätigung', bn: 'নিশ্চিতকরণ। bestätigen = নিশ্চিত করা।' },
      { term: 'vom 3. bis 7. Juni', bn: '৩ থেকে ৭ জুন পর্যন্ত। তারিখের সংখ্যার পরে বিন্দু বসে।' },
      { term: 'extra kosten', bn: 'আলাদা খরচ লাগা।' },
    ],
  ),
];
