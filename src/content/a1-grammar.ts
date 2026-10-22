import type { GrammarBlock, GrammarLesson, GrammarSection, McqQuestion } from './types';

/**
 * A1 grammar topics (Grammatik), in the order they are learnt. Each topic
 * opens once the one before it is passed. To add a topic, append another
 * `lesson(...)` to the list at the bottom: its test needs 6 questions with
 * 3 options each.
 */

const text = (t: string): GrammarBlock => ({ kind: 'text', text: t });
const table = (...rows: string[][]): GrammarBlock => ({ kind: 'table', rows });
const list = (...items: string[]): GrammarBlock => ({ kind: 'list', items });
const numbered = (...items: string[]): GrammarBlock => ({ kind: 'list', items, numbered: true });
/** Example sentences, each as [German, Bangla]. */
const examples = (...pairs: [string, string][]): GrammarBlock => ({
  kind: 'examples',
  items: pairs.map(([de, bn]) => ({ de, bn })),
});
const section = (heading: string, ...blocks: GrammarBlock[]): GrammarSection => ({ heading, blocks });

/** A test question: prompt, three options, the index of the right one, and why it's right. */
type Q = [prompt: string, options: [string, string, string], answer: 0 | 1 | 2, explanation: string];

function lesson(l: {
  slug: string;
  topic: string;
  de: string;
  bn: string;
  summary: string;
  intro?: GrammarBlock[];
  sections: GrammarSection[];
  test: Q[];
}): GrammarLesson {
  const id = `a1-grammar-${l.slug}`;
  return {
    id,
    level: 'A1',
    topic: l.topic,
    title: { de: l.de, bn: l.bn },
    summary: l.summary,
    intro: l.intro,
    sections: l.sections,
    test: l.test.map(
      ([prompt, options, answer, explanation], i): McqQuestion => ({
        id: `${id}-t${i + 1}`,
        type: 'mcq',
        prompt,
        options,
        answer,
        explanation,
      }),
    ),
  };
}

export const a1Grammar: GrammarLesson[] = [
  lesson({
    slug: 'alphabet',
    topic: 'Aussprache',
    de: 'Das Alphabet und die Aussprache',
    bn: 'German Alphabet ও উচ্চারণের নিয়ম',
    summary: '২৬টি মূল অক্ষর, বিশেষ অক্ষর Ä Ö Ü ß এবং উচ্চারণের কয়েকটি নিয়ম।',
    intro: [text('জার্মান ভাষায় ইংরেজির মতো ২৬টি মূল অক্ষর আছে। এর পাশাপাশি কিছু বিশেষ অক্ষরও রয়েছে।')],
    sections: [
      section(
        '১.১ জার্মান বর্ণমালা',
        table(
          ['অক্ষর', 'নামের কাছাকাছি উচ্চারণ', 'উদাহরণ'],
          ['A a', 'আ', 'Apfel (আপেল)'],
          ['B b', 'বে', 'Ball (বল)'],
          ['C c', 'ৎসে', 'Café (ক্যাফে)'],
          ['D d', 'ডে', 'Danke (ধন্যবাদ)'],
          ['E e', 'এ', 'Essen (খাবার/খাওয়া)'],
          ['F f', 'এফ', 'Fisch (মাছ)'],
          ['G g', 'গে', 'gut (ভালো)'],
          ['H h', 'হা', 'Haus (বাড়ি)'],
          ['I i', 'ই', 'ich (আমি)'],
          ['J j', 'ইয়ট', 'ja (হ্যাঁ)'],
          ['K k', 'কা', 'Kind (শিশু)'],
          ['L l', 'এল', 'Liebe (ভালোবাসা)'],
          ['M m', 'এম', 'Mann (পুরুষ)'],
          ['N n', 'এন', 'Name (নাম)'],
          ['O o', 'ও', 'Oma (দাদি/নানি)'],
          ['P p', 'পে', 'Papa (বাবা)'],
          ['Q q', 'কু', 'Quelle (উৎস)'],
          ['R r', 'এর', 'rot (লাল)'],
          ['S s', 'এস', 'Sonne (সূর্য)'],
          ['T t', 'টে', 'Tag (দিন)'],
          ['U u', 'উ', 'Uhr (ঘড়ি)'],
          ['V v', 'ফাউ', 'Vater (বাবা)'],
          ['W w', 'ভে', 'Wasser (পানি)'],
          ['X x', 'ইক্স', 'Xylofon (জাইলোফোন)'],
          ['Y y', 'উপসিলন', 'Yoga (যোগব্যায়াম)'],
          ['Z z', 'ৎসেট', 'Zeit (সময়)'],
        ),
        text(
          'মনে রাখবে: এগুলো বাংলা উচ্চারণের কাছাকাছি ধারণা। জার্মানির সব অঞ্চলে উচ্চারণ একদম একই নয়, আর বাংলা অক্ষর দিয়ে সব জার্মান ধ্বনি পুরোপুরি বোঝানো যায় না।',
        ),
      ),
      section(
        '১.২ বিশেষ অক্ষর',
        table(
          ['অক্ষর', 'কীভাবে বুঝবে', 'উদাহরণ'],
          ['Ä ä', 'অনেক ক্ষেত্রে এ-এর কাছাকাছি', 'Mädchen (মেয়ে)'],
          ['Ö ö', 'ও বলার সময় ঠোঁট গোল রেখে এ বলার চেষ্টা', 'schön (সুন্দর)'],
          ['Ü ü', 'উ বলার সময় ঠোঁট গোল রেখে ই বলার চেষ্টা', 'über (উপরে/সম্পর্কে)'],
          ['ß', 'সাধারণত দীর্ঘ বা স্বরধ্বনির পরে ব্যবহৃত ss-এর মতো', 'Straße (রাস্তা)'],
        ),
      ),
      section(
        '১.৩ কয়েকটি গুরুত্বপূর্ণ উচ্চারণের নিয়ম',
        list(
          'ei = আই: mein (মাইন) = আমার',
          'ie = দীর্ঘ ঈ: Liebe (লীবে) = ভালোবাসা',
          'eu / äu = অয়: heute (হয়টে) = আজ',
          'sch = শ: Schule (শুলে) = স্কুল',
          'ch: ich ও Buch শব্দে উচ্চারণ আলাদা।',
          'sp / st: অনেক শব্দের শুরুতে যথাক্রমে শ্প ও শ্ট-এর কাছাকাছি শোনায়। যেমন Sport, Straße।',
        ),
        text('ছোট অনুশীলন: শব্দগুলো জোরে পড়ো।'),
        list('Hallo = হ্যালো', 'Danke = ধন্যবাদ', 'Wasser = পানি', 'Schule = স্কুল', 'Ich = আমি'),
      ),
    ],
    test: [
      ['„Schule“ শব্দের „sch“ কেমন শোনায়?', ['স', 'শ', 'চ'], 1, 'sch = শ, তাই Schule পড়া হয় „শুলে“।'],
      ['„mein“ শব্দের „ei“ কেমন শোনায়?', ['আই', 'ঈ', 'অয়'], 0, 'ei = আই, তাই mein পড়া হয় „মাইন“।'],
      ['„heute“ শব্দের „eu“ কেমন শোনায়?', ['এউ', 'আই', 'অয়'], 2, 'eu / äu = অয়, তাই heute পড়া হয় „হয়টে“।'],
      ['„Liebe“ শব্দের „ie“ কেমন শোনায়?', ['দীর্ঘ ঈ', 'আই', 'এ'], 0, 'ie = দীর্ঘ ঈ, তাই Liebe পড়া হয় „লীবে“।'],
      ['কোন অক্ষরটি ss-এর মতো শোনায়?', ['ü', 'ß', 'ä'], 1, 'ß সাধারণত ss-এর মতো শোনায়, যেমন Straße।'],
      ['জার্মান „W“ অক্ষরের উচ্চারণ কোনটির কাছাকাছি?', ['ডাব্লিউ', 'ফাউ', 'ভে'], 2, 'W-এর নাম „ভে“, যেমন Wasser। „ফাউ“ হলো V-এর নাম।'],
    ],
  }),

  lesson({
    slug: 'nomen',
    topic: 'Nomen',
    de: 'Nomen und Großschreibung',
    bn: 'Noun (Nomen) ও Capitalization',
    summary: 'জার্মান ভাষায় প্রতিটি Noun বড় হাতের অক্ষর দিয়ে শুরু হয়।',
    sections: [
      section(
        '২.১ Noun কী?',
        text('Noun হলো কোনো ব্যক্তি, জায়গা, বস্তু বা ধারণার নাম।'),
        text('বাংলায় যেমন:'),
        list('ছেলে', 'বাড়ি', 'বই', 'পানি', 'ভালোবাসা'),
        text('জার্মান ভাষাতেও একই রকম শব্দ আছে।'),
        table(
          ['German', 'বাংলা অর্থ'],
          ['Mann', 'পুরুষ'],
          ['Frau', 'নারী / মহিলা'],
          ['Kind', 'শিশু'],
          ['Haus', 'বাড়ি'],
          ['Buch', 'বই'],
          ['Wasser', 'পানি'],
          ['Schule', 'স্কুল'],
          ['Liebe', 'ভালোবাসা'],
        ),
      ),
      section(
        '২.২ সবচেয়ে গুরুত্বপূর্ণ নিয়ম',
        text('জার্মান ভাষায় Noun-এর প্রথম অক্ষর সব সময় বড় হাতের (Capital Letter) হয়।'),
        examples(['das Haus', 'বাড়ি'], ['das Buch', 'বই'], ['der Mann', 'পুরুষ'], ['die Frau', 'নারী']),
        text('এখানে Haus, Buch, Mann ও Frau বড় হাতের অক্ষর দিয়ে শুরু হয়েছে।'),
        list('ভুল: das haus', 'সঠিক: das Haus'),
      ),
      section(
        '২.৩ বাক্যের মধ্যে Noun',
        examples(
          ['Ich habe ein Buch.', 'আমার একটি বই আছে।'],
          ['Das Kind spielt.', 'শিশুটি খেলছে।'],
          ['Die Frau kommt.', 'মহিলাটি আসছেন।'],
        ),
        text('এখানে Buch, Kind ও Frau Noun, তাই প্রথম অক্ষর বড়।'),
      ),
      section(
        '২.৪ সব বড় হাতের অক্ষর কি Noun?',
        text('না! বাক্যের প্রথম শব্দও বড় হাতের অক্ষর দিয়ে শুরু হয়।'),
        examples(['Heute lerne ich Deutsch.', 'আজ আমি জার্মান শিখছি।'], ['Ich lerne Deutsch.', 'আমি জার্মান শিখছি।']),
        text('Heute বাক্যের প্রথম শব্দ বলে বড় হাতের। Deutsch ভাষার নাম বলে বড় হাতের।'),
        text(
          'মনে রাখার কৌশল: জার্মান ভাষায় কোনো শব্দ মানুষ, বস্তু, জায়গা বা ধারণার নাম হলে সেটি Noun কি না দেখবে। Noun হলে প্রথম অক্ষর বড় হবে।',
        ),
      ),
    ],
    test: [
      ['কোনটি সঠিকভাবে লেখা?', ['das haus', 'das Haus', 'Das haus'], 1, 'Haus একটি Noun, তাই প্রথম অক্ষর বড়: das Haus।'],
      [
        'জার্মান ভাষায় Noun-এর প্রথম অক্ষর কেমন হয়?',
        ['সব সময় বড় হাতের', 'সব সময় ছোট হাতের', 'শুধু বাক্যের শুরুতে বড় হাতের'],
        0,
        'জার্মান ভাষায় Noun যেখানেই থাকুক, তার প্রথম অক্ষর সব সময় বড় হাতের।',
      ],
      ['„Das Kind spielt.“ বাক্যে Noun কোনটি?', ['Das', 'spielt', 'Kind'], 2, 'Kind (শিশু) একজন ব্যক্তির নাম, তাই এটি Noun।'],
      [
        '„Heute lerne ich Deutsch.“ বাক্যে Heute বড় হাতের কেন?',
        ['এটি একটি Noun', 'এটি বাক্যের প্রথম শব্দ', 'এটি একটি Verb'],
        1,
        'Heute (আজ) Noun নয়, বাক্যের প্রথম শব্দ বলে বড় হাতের।',
      ],
      [
        'কোন বাক্যটি সঠিক?',
        ['Ich habe ein buch.', 'ich habe ein Buch.', 'Ich habe ein Buch.'],
        2,
        'বাক্যের প্রথম শব্দ Ich বড় হাতের, আর Noun Buch-ও বড় হাতের।',
      ],
      [
        '„Ich lerne Deutsch.“ বাক্যে Deutsch বড় হাতের কেন?',
        ['এটি ভাষার নাম', 'এটি বাক্যের শেষ শব্দ', 'এটি একটি Verb'],
        0,
        'Deutsch এখানে ভাষার নাম, তাই বড় হাতের অক্ষর দিয়ে শুরু।',
      ],
    ],
  }),

  lesson({
    slug: 'artikel',
    topic: 'Artikel',
    de: 'Artikel: der, die, das, ein, eine',
    bn: 'Article: der, die, das, ein, eine',
    summary: 'Noun-এর আগে বসা ছোট শব্দ: the-এর মতো der/die/das, a-এর মতো ein/eine।',
    intro: [
      text('জার্মান ভাষায় কোনো জিনিসের নাম বলার আগে অনেক সময় একটি ছোট শব্দ বসে। একে Article বলে।'),
      text('ইংরেজিতে যেমন:'),
      list('a book', 'the book'),
      text('জার্মান ভাষায়:'),
      examples(['ein Buch', 'একটি বই'], ['das Buch', 'বইটি']),
    ],
    sections: [
      section(
        '৩.১ Definite Article: der, die, das',
        text('এগুলো ইংরেজির the-এর মতো।'),
        table(
          ['Article', 'ব্যবহার', 'উদাহরণ'],
          ['der', 'Masculine', 'der Mann = পুরুষটি'],
          ['die', 'Feminine', 'die Frau = মহিলাটি'],
          ['das', 'Neuter', 'das Kind = শিশুটি'],
          ['die', 'Plural', 'die Kinder = শিশুরা'],
        ),
        text(
          'খুব গুরুত্বপূর্ণ: এখানে Masculine, Feminine ও Neuter বলতে জার্মান ব্যাকরণের শব্দের ধরন বোঝায়। এগুলো সব সময় বাস্তব মানুষের লিঙ্গের সঙ্গে মেলে না।',
        ),
        examples(['der Tisch', 'টেবিল'], ['die Tür', 'দরজা'], ['das Buch', 'বই']),
        text('টেবিল পুরুষ নয়, দরজা নারী নয়, বইও নিরপেক্ষ ব্যক্তি নয়। এগুলো শুধু ব্যাকরণগত শ্রেণি।'),
      ),
      section(
        '৩.২ Indefinite Article: ein, eine',
        text('এগুলো ইংরেজির a বা an-এর মতো।'),
        table(
          ['Definite', 'Indefinite', 'বাংলা'],
          ['der Mann', 'ein Mann', 'একজন পুরুষ'],
          ['die Frau', 'eine Frau', 'একজন মহিলা'],
          ['das Kind', 'ein Kind', 'একটি শিশু'],
        ),
        text('মনে রাখবে:'),
        list('der → ein', 'die → eine', 'das → ein'),
      ),
      section(
        '৩.৩ বাক্যে ব্যবহার',
        examples(
          ['Das ist ein Buch.', 'এটি একটি বই।'],
          ['Das ist eine Tasche.', 'এটি একটি ব্যাগ।'],
          ['Das ist der Tisch.', 'এটি টেবিলটি।'],
          ['Das ist die Tür.', 'এটি দরজাটি।'],
        ),
      ),
      section(
        '৩.৪ Article শেখার সঠিক পদ্ধতি',
        text('শুধু Tisch = টেবিল মুখস্থ করবে না।'),
        text('এভাবে শিখবে:'),
        list('der Tisch', 'die Tür', 'das Buch'),
        text('অর্থাৎ, প্রতিটি Noun-এর সঙ্গে Article-ও মুখস্থ করবে।'),
      ),
    ],
    test: [
      ['___ Mann (পুরুষটি)', ['der', 'die', 'das'], 0, 'Mann Masculine, তাই der Mann।'],
      ['___ Frau (মহিলাটি)', ['das', 'die', 'der'], 1, 'Frau Feminine, তাই die Frau।'],
      ['___ Kind (শিশুটি)', ['der', 'die', 'das'], 2, 'Kind Neuter, তাই das Kind।'],
      ['„das Buch“ থেকে „একটি বই“ হবে:', ['eine Buch', 'ein Buch', 'der Buch'], 1, 'das → ein, তাই ein Buch।'],
      ['Das ist ___ Tasche. (এটি একটি ব্যাগ।)', ['eine', 'ein', 'der'], 0, 'die Tasche, আর die → eine, তাই eine Tasche।'],
      ['বহুবচনে (Plural) Definite Article কোনটি?', ['der', 'das', 'die'], 2, 'Plural-এ সব সময় die, যেমন die Kinder।'],
    ],
  }),

  lesson({
    slug: 'pronomen',
    topic: 'Pronomen',
    de: 'Personalpronomen: ich, du, er, sie, es',
    bn: 'Personal Pronouns: ich, du, er, sie, es',
    summary: 'আমি, তুমি, সে, আমরা, তারা, আপনি: নামের বদলে বসা শব্দ।',
    intro: [
      text('Pronoun হলো এমন শব্দ, যা কোনো নামের পরিবর্তে ব্যবহার করা হয়।'),
      text('বাংলায়:'),
      list('আমি', 'তুমি', 'সে', 'আমরা', 'তারা'),
      text('জার্মান ভাষাতেও একই ধারণা।'),
    ],
    sections: [
      section(
        '৪.১ ব্যক্তিবাচক সর্বনাম',
        table(
          ['German', 'English', 'বাংলা'],
          ['ich', 'I', 'আমি'],
          ['du', 'you', 'তুমি'],
          ['er', 'he', 'সে (পুরুষ)'],
          ['sie', 'she', 'সে (নারী)'],
          ['es', 'it', 'এটি / এটা'],
          ['wir', 'we', 'আমরা'],
          ['ihr', 'you (plural)', 'তোমরা'],
          ['sie', 'they', 'তারা'],
          ['Sie', 'you (formal)', 'আপনি / আপনারা'],
        ),
        text(
          'মনে রাখবে: sie ছোট হাতের হলে সে (নারী) অথবা তারা বোঝাতে পারে। Sie বড় হাতের হলে সাধারণত সম্মানসূচক আপনি বোঝায়, বিশেষ করে বাক্যের শুরু ছাড়া অন্য স্থানে।',
        ),
      ),
      section(
        '৪.২ উদাহরণ',
        examples(
          ['Ich bin Mahid.', 'আমি মাহিদ।'],
          ['Du bist mein Freund.', 'তুমি আমার বন্ধু।'],
          ['Er ist hier.', 'সে এখানে আছে।'],
          ['Sie ist nett.', 'সে ভালো / অমায়িক।'],
          ['Es ist ein Buch.', 'এটি একটি বই।'],
          ['Wir lernen Deutsch.', 'আমরা জার্মান শিখি।'],
          ['Ihr seid Freunde.', 'তোমরা বন্ধু।'],
          ['Sie sind hier.', 'তারা এখানে আছে।'],
          ['Sind Sie Herr Rahman?', 'আপনি কি মি. রহমান?'],
        ),
      ),
      section(
        '৪.৩ নামের পরিবর্তে Pronoun',
        text('ধরো, তোমার একটি বন্ধু আছে। তার নাম Ali।'),
        text('প্রথমবার:'),
        examples(['Ali ist hier.', 'আলি এখানে আছে।']),
        text('এরপর:'),
        examples(['Er ist hier.', 'সে এখানে আছে।']),
        text('এখানে Er আলির পরিবর্তে ব্যবহৃত হয়েছে।'),
      ),
    ],
    test: [
      ['„wir“ মানে কী?', ['আমরা', 'তোমরা', 'তারা'], 0, 'wir = আমরা।'],
      ['সম্মানসূচক „আপনি“ জার্মানে কোনটি?', ['sie', 'Sie', 'du'], 1, 'বড় হাতের Sie = আপনি। ছোট হাতের sie = সে (নারী) বা তারা।'],
      ['„Ali ist hier.“ নামের বদলে Pronoun দিলে:', ['Sie ist hier.', 'Es ist hier.', 'Er ist hier.'], 2, 'Ali একজন পুরুষ, তাই er (সে, পুরুষ)।'],
      ['„ihr“ মানে কী?', ['তুমি', 'তোমরা', 'আমরা'], 1, 'ihr = তোমরা (অনেকজনকে তুমি বলা)।'],
      ['„Es ist ein Buch.“ বাক্যে Es মানে কী?', ['এটি', 'সে (নারী)', 'আমরা'], 0, 'es = এটি / এটা।'],
      [
        '„তুমি আমার বন্ধু।“ জার্মানে কোনটি?',
        ['Er ist mein Freund.', 'Ich bin mein Freund.', 'Du bist mein Freund.'],
        2,
        'du = তুমি, তাই Du bist mein Freund।',
      ],
    ],
  }),

  lesson({
    slug: 'infinitiv',
    topic: 'Verben',
    de: 'Verben und der Infinitiv',
    bn: 'Verb: ক্রিয়া ও Infinitiv',
    summary: 'কাজ বা অবস্থা বোঝানো শব্দ, আর তার মূল রূপ Infinitiv।',
    intro: [
      text('Verb হলো এমন শব্দ, যা কাজ বা অবস্থা বোঝায়।'),
      text('বাংলায়:'),
      list('খাওয়া', 'যাওয়া', 'পড়া', 'থাকা', 'শেখা'),
      text('জার্মান ভাষায়:'),
      table(
        ['Infinitiv', 'বাংলা'],
        ['lernen', 'শেখা'],
        ['machen', 'করা'],
        ['spielen', 'খেলা'],
        ['wohnen', 'বসবাস করা'],
        ['kommen', 'আসা'],
        ['gehen', 'যাওয়া'],
        ['essen', 'খাওয়া'],
        ['trinken', 'পান করা'],
        ['arbeiten', 'কাজ করা'],
        ['schlafen', 'ঘুমানো'],
      ),
    ],
    sections: [
      section(
        '৫.১ Infinitiv কী?',
        text('Infinitiv হলো Verb-এর মূল রূপ। ইংরেজিতে যেমন to learn, to play; জার্মান ভাষায় lernen, spielen।'),
        text('অনেক জার্মান Verb-এর শেষে -en থাকে।'),
        text('যেমন:'),
        list('lernen', 'machen', 'spielen'),
        text('কিছু Verb-এর শেষে শুধু -n থাকে, যেমন sein। তবে sein একটি অনিয়মিত Verb।'),
      ),
      section(
        '৫.২ Verb দিয়ে বাক্য',
        examples(
          ['Ich lerne Deutsch.', 'আমি জার্মান শিখি।'],
          ['Ich spiele Fußball.', 'আমি ফুটবল খেলি।'],
          ['Ich trinke Wasser.', 'আমি পানি পান করি।'],
          ['Ich wohne in Dhaka.', 'আমি ঢাকায় থাকি।'],
        ),
      ),
      section(
        '৫.৩ একটি সহজ সূত্র',
        text('কে + কী করে + কী?'),
        text('Ich + lerne + Deutsch.'),
        list('Ich = আমি', 'lerne = শিখি', 'Deutsch = জার্মান ভাষা'),
        text('তবে জার্মান বাক্যে Verb-এর রূপ এবং অবস্থান বাক্যের ধরন অনুযায়ী পরিবর্তিত হতে পারে।'),
      ),
    ],
    test: [
      [
        'Infinitiv কী?',
        ['Verb-এর মূল রূপ', 'Noun-এর বহুবচন', 'একটি Article'],
        0,
        'Infinitiv হলো Verb-এর মূল রূপ, যেমন lernen, spielen।',
      ],
      ['„trinken“ মানে কী?', ['খাওয়া', 'পান করা', 'ঘুমানো'], 1, 'trinken = পান করা। খাওয়া = essen, ঘুমানো = schlafen।'],
      ['কোনটি Infinitiv?', ['lerne', 'lernt', 'lernen'], 2, 'মূল রূপ lernen; lerne ও lernt হলো Subject অনুযায়ী বদলানো রূপ।'],
      ['„wohnen“ মানে কী?', ['বসবাস করা', 'কাজ করা', 'আসা'], 0, 'wohnen = বসবাস করা। কাজ করা = arbeiten, আসা = kommen।'],
      ['অনেক জার্মান Verb-এর শেষে কী থাকে?', ['-st', '-en', '-e'], 1, 'বেশির ভাগ Infinitiv -en দিয়ে শেষ হয়, যেমন machen।'],
      [
        '„আমি ফুটবল খেলি।“ জার্মানে কোনটি?',
        ['Ich spielen Fußball.', 'Ich Fußball spiele.', 'Ich spiele Fußball.'],
        2,
        'ich-এর সঙ্গে spiele, আর Verb বসে Subject-এর পরেই।',
      ],
    ],
  }),

  lesson({
    slug: 'praesens',
    topic: 'Verben',
    de: 'Das Präsens',
    bn: 'Präsens: বর্তমান কাল',
    summary: 'বর্তমান কাল: Subject অনুযায়ী Verb-এর শেষে -e, -st, -t, -en।',
    intro: [
      text('Präsens হলো জার্মান ভাষার বর্তমান কালের প্রধান রূপ।'),
      text('এটি দিয়ে বলা যায়:'),
      list('আমি পড়ি।', 'আমি পড়ছি।', 'আমি সাধারণত পড়াশোনা করি।'),
      text('ইংরেজির Present Simple ও Present Continuous-এর অনেক অর্থ জার্মান Präsens দিয়েই প্রকাশ করা যায়।'),
    ],
    sections: [
      section(
        '৬.১ নিয়মিত Verb-এর রূপ পরিবর্তন',
        text('ধরো, Verb হলো lernen = শেখা।'),
        text('প্রথমে -en বাদ দাও: lern + …'),
        text('তারপর Subject অনুযায়ী Ending যোগ করো।'),
        table(
          ['Subject', 'Ending', 'lernen-এর রূপ'],
          ['ich', '-e', 'lerne'],
          ['du', '-st', 'lernst'],
          ['er / sie / es', '-t', 'lernt'],
          ['wir', '-en', 'lernen'],
          ['ihr', '-t', 'lernt'],
          ['sie / Sie', '-en', 'lernen'],
        ),
      ),
      section(
        '৬.২ উদাহরণসহ বুঝি',
        examples(
          ['Ich lerne Deutsch.', 'আমি জার্মান শিখি।'],
          ['Du lernst Deutsch.', 'তুমি জার্মান শেখো।'],
          ['Er lernt Deutsch.', 'সে জার্মান শেখে।'],
          ['Wir lernen Deutsch.', 'আমরা জার্মান শিখি।'],
          ['Ihr lernt Deutsch.', 'তোমরা জার্মান শেখো।'],
          ['Sie lernen Deutsch.', 'তারা জার্মান শেখে।'],
        ),
        text('দেখো, Verb lernen থেকে lerne, lernst, lernt ইত্যাদি তৈরি হয়েছে।'),
      ),
      section(
        '৬.৩ আরেকটি উদাহরণ: machen',
        text('machen = করা'),
        examples(
          ['ich mache', 'আমি করি'],
          ['du machst', 'তুমি করো'],
          ['er macht', 'সে করে'],
          ['wir machen', 'আমরা করি'],
          ['ihr macht', 'তোমরা করো'],
          ['sie machen', 'তারা করে'],
        ),
      ),
      section(
        '৬.৪ ছোট্ট নিয়ম',
        text('সাধারণ নিয়মিত Verb-এর ক্ষেত্রে:'),
        list('ich → e', 'du → st', 'er/sie/es → t', 'wir → en', 'ihr → t', 'sie/Sie → en'),
        text('কিছু Verb-এ উচ্চারণ সহজ করার জন্য অতিরিক্ত e যোগ হয়। অনিয়মিত Verb-এর রূপ আলাদা করে শিখতে হবে।'),
      ),
    ],
    test: [
      ['du ___ Deutsch. (lernen)', ['lernt', 'lernst', 'lerne'], 1, 'du-এর সঙ্গে ending -st: du lernst।'],
      ['ich ___ (machen)', ['mache', 'machst', 'macht'], 0, 'ich-এর সঙ্গে ending -e: ich mache।'],
      ['er ___ Deutsch. (lernen)', ['lernen', 'lernst', 'lernt'], 2, 'er/sie/es-এর সঙ্গে ending -t: er lernt।'],
      ['wir ___ (machen)', ['macht', 'machen', 'mache'], 1, 'wir-এর সঙ্গে ending -en: wir machen।'],
      ['ihr ___ Deutsch. (lernen)', ['lernt', 'lernen', 'lernst'], 0, 'ihr-এর সঙ্গে ending -t: ihr lernt।'],
      [
        '„Ich lerne Deutsch.“ এর অর্থ কী হতে পারে?',
        ['শুধু „আমি জার্মান শিখেছিলাম“', '„আমি জার্মান শিখি“ বা „শিখছি“, দুটোই', 'শুধু „আমি জার্মান শিখব“'],
        1,
        'Präsens দিয়ে „শিখি“ ও „শিখছি“ দুটো অর্থই বোঝানো যায়।',
      ],
    ],
  }),

  lesson({
    slug: 'sein-haben',
    topic: 'Verben',
    de: 'Die Verben sein und haben',
    bn: 'sein ও haben Verb',
    summary: 'সবচেয়ে দরকারি দুই Verb: sein (হওয়া/থাকা) ও haben (কিছু থাকা)।',
    intro: [text('এই দুটি Verb খুবই গুরুত্বপূর্ণ। A1 থেকে শুরু করে উচ্চতর স্তর পর্যন্ত এগুলো বারবার ব্যবহার হবে।')],
    sections: [
      section(
        '৭.১ sein = হওয়া / থাকা',
        text('sein অনেক সময় পরিচয়, অবস্থা বা অবস্থান বোঝায়।'),
        table(
          ['Subject', 'sein-এর রূপ', 'বাংলা'],
          ['ich', 'bin', 'আমি হই / আছি'],
          ['du', 'bist', 'তুমি হও / আছ'],
          ['er / sie / es', 'ist', 'সে হয় / আছে'],
          ['wir', 'sind', 'আমরা হই / আছি'],
          ['ihr', 'seid', 'তোমরা হও / আছ'],
          ['sie / Sie', 'sind', 'তারা হয় / আছে; আপনি হন / আছেন'],
        ),
        examples(
          ['Ich bin müde.', 'আমি ক্লান্ত।'],
          ['Du bist nett.', 'তুমি অমায়িক।'],
          ['Er ist Student.', 'সে একজন ছাত্র।'],
          ['Wir sind zu Hause.', 'আমরা বাড়িতে আছি।'],
          ['Sie sind glücklich.', 'তারা সুখী।'],
        ),
        text('খেয়াল করো: sein একটি অনিয়মিত Verb। তাই bin, bist, ist ইত্যাদি রূপ মুখস্থ করতে হবে।'),
      ),
      section(
        '৭.২ haben = থাকা / অধিকার করা',
        text('কোনো কিছু নিজের কাছে আছে বোঝাতে haben ব্যবহার করা হয়।'),
        table(
          ['Subject', 'haben-এর রূপ', 'বাংলা'],
          ['ich', 'habe', 'আমার আছে'],
          ['du', 'hast', 'তোমার আছে'],
          ['er / sie / es', 'hat', 'তার আছে'],
          ['wir', 'haben', 'আমাদের আছে'],
          ['ihr', 'habt', 'তোমাদের আছে'],
          ['sie / Sie', 'haben', 'তাদের / আপনার আছে'],
        ),
        examples(
          ['Ich habe ein Buch.', 'আমার একটি বই আছে।'],
          ['Du hast einen Bruder.', 'তোমার একজন ভাই আছে।'],
          ['Er hat ein Auto.', 'তার একটি গাড়ি আছে।'],
          ['Wir haben Zeit.', 'আমাদের সময় আছে।'],
          ['Sie haben eine Frage.', 'তাদের একটি প্রশ্ন আছে।'],
        ),
      ),
      section(
        '৭.৩ sein ও haben-এর পার্থক্য',
        examples(['Ich bin Student.', 'আমি একজন ছাত্র।'], ['Ich habe ein Buch.', 'আমার একটি বই আছে।']),
        text('প্রথম বাক্যে নিজের পরিচয় বলছি। দ্বিতীয় বাক্যে নিজের কাছে কী আছে বলছি।'),
      ),
      section(
        '৭.৪ খুব গুরুত্বপূর্ণ অনুশীলন',
        text('শূন্যস্থান পূরণ করো:'),
        numbered(
          'Ich ___ müde. (sein)',
          'Du ___ ein Buch. (haben)',
          'Er ___ Student. (sein)',
          'Wir ___ Zeit. (haben)',
          'Ihr ___ nett. (sein)',
        ),
      ),
    ],
    test: [
      ['Ich ___ müde.', ['bin', 'habe', 'ist'], 0, 'অবস্থা বোঝাতে sein, আর ich-এর সঙ্গে bin।'],
      ['Du ___ ein Buch.', ['bist', 'hast', 'hat'], 1, 'কিছু থাকা বোঝাতে haben, আর du-এর সঙ্গে hast।'],
      ['Er ___ Student.', ['hat', 'sind', 'ist'], 2, 'পরিচয় বোঝাতে sein, আর er-এর সঙ্গে ist।'],
      ['Wir ___ Zeit.', ['haben', 'sind', 'habt'], 0, 'সময় „আছে“ মানে haben, আর wir-এর সঙ্গে haben।'],
      ['Ihr ___ nett.', ['sind', 'seid', 'habt'], 1, 'অবস্থা বোঝাতে sein, আর ihr-এর সঙ্গে seid।'],
      [
        '„আমার একটি বই আছে।“ বলতে কোন Verb লাগবে?',
        ['lernen', 'sein', 'haben'],
        2,
        'নিজের কাছে কিছু আছে বোঝাতে haben: Ich habe ein Buch।',
      ],
    ],
  }),

  lesson({
    slug: 'konjugation',
    topic: 'Verben',
    de: 'Konjugation der Verben',
    bn: 'Verb Conjugation: ক্রিয়ার রূপ পরিবর্তন',
    summary: 'Subject অনুযায়ী Verb-এর রূপ বদলানো, নিয়মিত ও অনিয়মিত Verb।',
    intro: [
      text('Conjugation মানে Subject অনুযায়ী Verb-এর রূপ পরিবর্তন করা।'),
      text('বাংলাতেও আমরা বলি:'),
      list('আমি করি', 'তুমি করো', 'সে করে'),
      text('জার্মান ভাষায়ও একই ধরনের পরিবর্তন হয়।'),
    ],
    sections: [
      section(
        '৮.১ নিয়মিত Verb',
        text('ধরো, spielen = খেলা।'),
        table(
          ['Subject', 'Verb', 'বাংলা'],
          ['ich', 'spiele', 'আমি খেলি'],
          ['du', 'spielst', 'তুমি খেলো'],
          ['er', 'spielt', 'সে খেলে'],
          ['wir', 'spielen', 'আমরা খেলি'],
          ['ihr', 'spielt', 'তোমরা খেলো'],
          ['sie', 'spielen', 'তারা খেলে'],
        ),
      ),
      section(
        '৮.২ আরেকটি Verb: wohnen',
        text('wohnen = বসবাস করা।'),
        examples(
          ['Ich wohne in Dhaka.', 'আমি ঢাকায় থাকি।'],
          ['Du wohnst in Dhaka.', 'তুমি ঢাকায় থাকো।'],
          ['Er wohnt in Dhaka.', 'সে ঢাকায় থাকে।'],
          ['Wir wohnen in Dhaka.', 'আমরা ঢাকায় থাকি।'],
        ),
      ),
      section(
        '৮.৩ অনিয়মিত Verb',
        text('সব Verb একই নিয়ম অনুসরণ করে না।'),
        text('উদাহরণ: fahren = যানবাহনে যাওয়া / চালিয়ে যাওয়া।'),
        list('ich fahre', 'du fährst', 'er fährt', 'wir fahren'),
        text('এখানে du ও er-এর সঙ্গে a পরিবর্তিত হয়ে ä হয়েছে।'),
        text('আরেকটি উদাহরণ:'),
        examples(['ich lese', 'আমি পড়ি'], ['du liest', 'তুমি পড়ো'], ['er liest', 'সে পড়ে']),
      ),
      section(
        '৮.৪ কীভাবে শিখবে?',
        text('প্রতিটি Verb শেখার সময় তিনটি কাজ করবে:'),
        numbered(
          'Infinitiv শিখবে: fahren',
          'Subject অনুযায়ী রূপ শিখবে: ich fahre, du fährst',
          'বাক্যে ব্যবহার করবে: Ich fahre nach Hause. = আমি বাড়ি যাচ্ছি।',
        ),
      ),
    ],
    test: [
      ['du ___ (fahren)', ['fahrst', 'fährst', 'fährt'], 1, 'fahren অনিয়মিত: du-এর সঙ্গে a বদলে ä, তাই du fährst।'],
      ['er ___ (lesen)', ['liest', 'lest', 'lesst'], 0, 'lesen অনিয়মিত: er liest।'],
      ['Du ___ in Dhaka. (wohnen)', ['wohnt', 'wohne', 'wohnst'], 2, 'wohnen নিয়মিত: du-এর সঙ্গে -st, তাই du wohnst।'],
      ['wir ___ (spielen)', ['spielen', 'spielt', 'spielst'], 0, 'wir-এর সঙ্গে -en: wir spielen।'],
      ['er ___ (fahren)', ['fahrt', 'fährt', 'fahren'], 1, 'fahren অনিয়মিত: er-এর সঙ্গেও ä, তাই er fährt।'],
      ['ich ___ (lesen)', ['liest', 'lesen', 'lese'], 2, 'ich-এর সঙ্গে স্বর বদলায় না: ich lese।'],
    ],
  }),

  lesson({
    slug: 'satzbau',
    topic: 'Satzbau',
    de: 'Der Satzbau',
    bn: 'বাক্য গঠনের নিয়ম: Satzbau',
    summary: 'Verb দ্বিতীয় স্থানে, শব্দ সাজানো, আর nicht দিয়ে না-বাচক বাক্য।',
    intro: [text('এখন তুমি শব্দ চিনতে পারো, Verb-এর রূপ জানো। এবার সেগুলো দিয়ে বাক্য তৈরি করবে।')],
    sections: [
      section(
        '৯.১ সাধারণ বাক্যের কাঠামো',
        text('জার্মান ভাষার সাধারণ Statement Sentence-এ Conjugated Verb সাধারণত দ্বিতীয় স্থানে থাকে।'),
        text('সহজ সূত্র: Subject + Verb + বাকির অংশ'),
        text('উদাহরণ: Ich lerne Deutsch.'),
        list('Ich = আমি', 'lerne = শিখি', 'Deutsch = জার্মান'),
        text('আরও উদাহরণ:'),
        examples(
          ['Ich spiele Fußball.', 'আমি ফুটবল খেলি।'],
          ['Du trinkst Wasser.', 'তুমি পানি পান করো।'],
          ['Er wohnt in Berlin.', 'সে বার্লিনে থাকে।'],
        ),
      ),
      section(
        '৯.২ Verb দ্বিতীয় স্থানে থাকার অর্থ',
        text('এখানে দ্বিতীয় স্থান মানে দ্বিতীয় শব্দ নয়, বরং বাক্যের দ্বিতীয় অংশ বা অবস্থান।'),
        text('উদাহরণ: Heute lerne ich Deutsch.'),
        list('Heute = আজ', 'lerne = শিখি', 'ich = আমি', 'Deutsch = জার্মান'),
        text('এখানে Heute প্রথম স্থানে এসেছে, তাই Verb lerne দ্বিতীয় স্থানে এবং ich তার পরে এসেছে।'),
      ),
      section(
        '৯.৩ বাক্য সাজানোর অনুশীলন',
        text('এলোমেলো শব্দগুলো সাজাও:'),
        list('Deutsch / Ich / lerne', 'Wasser / trinkst / Du', 'in Dhaka / wohnt / Er', 'heute / Wir / arbeiten'),
        text('সঠিক উত্তর:'),
        numbered('Ich lerne Deutsch.', 'Du trinkst Wasser.', 'Er wohnt in Dhaka.', 'Wir arbeiten heute.'),
      ),
      section(
        '৯.৪ বাক্য নেগেটিভ করা',
        text('সাধারণ বাক্য ও তার নেগেটিভ:'),
        examples(['Ich lerne Deutsch.', 'আমি জার্মান শিখি।'], ['Ich lerne nicht Deutsch.', 'আমি জার্মান শিখি না।']),
        text('আরও একটি উদাহরণ:'),
        examples(['Ich bin müde.', 'আমি ক্লান্ত।'], ['Ich bin nicht müde.', 'আমি ক্লান্ত নই।']),
        text(
          'এখানে nicht বাক্যকে নেগেটিভ করছে। কোথায় nicht বসবে, তা বাক্যের গঠন ও কোন অংশকে নেগেটিভ করা হচ্ছে তার ওপর নির্ভর করে।',
        ),
      ),
    ],
    test: [
      [
        'সাধারণ Statement বাক্যে Conjugated Verb কোথায় বসে?',
        ['প্রথম স্থানে', 'দ্বিতীয় স্থানে', 'একদম শেষে'],
        1,
        'Statement বাক্যে Verb সব সময় দ্বিতীয় স্থানে।',
      ],
      ['কোন বাক্যটি সঠিক?', ['Ich lerne Deutsch.', 'Ich Deutsch lerne.', 'Lerne Deutsch ich.'], 0, 'Subject + Verb + বাকির অংশ: Ich lerne Deutsch।'],
      [
        'Heute দিয়ে শুরু করলে সঠিক বাক্য কোনটি?',
        ['Heute ich lerne Deutsch.', 'Heute lerne ich Deutsch.', 'Heute lerne Deutsch ich.'],
        1,
        'Heute প্রথম স্থানে, তাই Verb lerne দ্বিতীয় স্থানে, তারপর ich।',
      ],
      [
        '„আমি ক্লান্ত নই।“ জার্মানে কোনটি?',
        ['Ich nicht bin müde.', 'Nicht ich bin müde.', 'Ich bin nicht müde.'],
        2,
        'Verb bin দ্বিতীয় স্থানে থাকে, nicht বসে তার পরে: Ich bin nicht müde।',
      ],
      ['„Wasser / trinkst / Du“ সাজালে:', ['Du trinkst Wasser.', 'Trinkst Wasser du.', 'Du Wasser trinkst.'], 0, 'Subject Du, তারপর Verb trinkst, তারপর Wasser।'],
      [
        '„Ich lerne nicht Deutsch.“ এর অর্থ কী?',
        ['আমি জার্মান শিখি।', 'আমি জার্মান শিখি না।', 'আমি কি জার্মান শিখি?'],
        1,
        'nicht বাক্যকে নেগেটিভ করে: শিখি না।',
      ],
    ],
  }),

  lesson({
    slug: 'satzarten',
    topic: 'Satzbau',
    de: 'Aussagesatz, Fragesatz und Imperativ',
    bn: 'Statement, Question ও Imperativ',
    summary: 'সাধারণ বাক্য, হ্যাঁ/না প্রশ্ন, W-প্রশ্ন আর অনুরোধ তৈরি করা।',
    intro: [text('এই অধ্যায়ে শিখবে কীভাবে সাধারণ বাক্য, প্রশ্ন এবং অনুরোধ তৈরি করতে হয়।')],
    sections: [
      section(
        '১০.১ Statement Sentence (Aussagesatz)',
        text('এটি সাধারণ তথ্য বা বক্তব্য প্রকাশ করে।'),
        examples(
          ['Ich bin Mahid.', 'আমি মাহিদ।'],
          ['Ich lerne Deutsch.', 'আমি জার্মান শিখি।'],
          ['Du bist mein Freund.', 'তুমি আমার বন্ধু।'],
        ),
        text('সাধারণ Statement-এ Conjugated Verb দ্বিতীয় স্থানে থাকে।'),
      ),
      section(
        '১০.২ Yes/No Question (Ja/Nein-Frage)',
        text('এমন প্রশ্ন, যার উত্তর সাধারণত হ্যাঁ বা না দিয়ে দেওয়া যায়।'),
        text('Statement:'),
        examples(['Du lernst Deutsch.', 'তুমি জার্মান শিখছ।']),
        text('Question:'),
        examples(['Lernst du Deutsch?', 'তুমি কি জার্মান শিখছ?']),
        text('এখানে Verb lernst প্রথম স্থানে এসেছে।'),
        text('আরও উদাহরণ:'),
        examples(
          ['Bist du müde?', 'তুমি কি ক্লান্ত?'],
          ['Hast du ein Buch?', 'তোমার কি একটি বই আছে?'],
          ['Wohnst du in Dhaka?', 'তুমি কি ঢাকায় থাকো?'],
          ['Spielst du Fußball?', 'তুমি কি ফুটবল খেলো?'],
        ),
        text('সহজ নিয়ম: সাধারণ Yes/No Question-এ Verb প্রথমে, তারপর Subject আসে।'),
      ),
      section(
        '১০.৩ W-Fragen: প্রশ্নবোধক শব্দ',
        text('তথ্য জানতে আমরা W-প্রশ্ন ব্যবহার করি।'),
        table(
          ['শব্দ', 'বাংলা অর্থ', 'উদাহরণ'],
          ['wer', 'কে', 'Wer bist du? = তুমি কে?'],
          ['was', 'কী', 'Was ist das? = এটা কী?'],
          ['wo', 'কোথায়', 'Wo wohnst du? = তুমি কোথায় থাকো?'],
          ['wann', 'কখন', 'Wann kommst du? = তুমি কখন আসবে?'],
          ['warum', 'কেন', 'Warum lernst du Deutsch? = তুমি কেন জার্মান শিখছ?'],
          ['wie', 'কীভাবে / কেমন', 'Wie heißt du? = তোমার নাম কী?'],
          ['woher', 'কোথা থেকে', 'Woher kommst du? = তুমি কোথা থেকে এসেছ?'],
          ['wohin', 'কোথায় / কোন দিকে', 'Wohin gehst du? = তুমি কোথায় যাচ্ছ?'],
        ),
        text('W-Frage-এর সাধারণ কাঠামো: প্রশ্নবোধক শব্দ + Verb + Subject + বাকির অংশ'),
        text('উদাহরণ: Wo wohnst du?'),
        list('Wo = কোথায়', 'wohnst = থাকো', 'du = তুমি'),
      ),
      section(
        '১০.৪ Imperativ (আদেশ ও অনুরোধ)',
        text('Imperativ দিয়ে কাউকে কোনো কাজ করতে বলা হয়।'),
        examples(
          ['Komm!', 'এসো!'],
          ['Geh!', 'যাও!'],
          ['Lern Deutsch!', 'জার্মান শেখো!'],
          ['Hör zu!', 'মন দিয়ে শোনো!'],
          ['Mach die Tür auf!', 'দরজাটা খোলো!'],
        ),
        text('ভদ্রভাবে বলতে:'),
        examples(
          ['Kommen Sie bitte!', 'দয়া করে আসুন।'],
          ['Warten Sie bitte!', 'দয়া করে অপেক্ষা করুন।'],
          ['Sprechen Sie bitte langsam!', 'দয়া করে ধীরে কথা বলুন।'],
        ),
        text('bitte শব্দটি অনুরোধকে আরও ভদ্র করে।'),
      ),
    ],
    test: [
      [
        '„Du lernst Deutsch.“ থেকে হ্যাঁ/না প্রশ্ন কোনটি?',
        ['Du Deutsch lernst?', 'Lernst du Deutsch?', 'Lernst Deutsch du?'],
        1,
        'Yes/No প্রশ্নে Verb প্রথমে, তারপর Subject: Lernst du Deutsch?',
      ],
      ['„কোথায়“ জার্মানে কোনটি?', ['wer', 'was', 'wo'], 2, 'wo = কোথায়। wer = কে, was = কী।'],
      [
        '„Woher kommst du?“ এর অর্থ কী?',
        ['তুমি কোথা থেকে এসেছ?', 'তুমি কোথায় যাচ্ছ?', 'তুমি কখন আসবে?'],
        0,
        'woher = কোথা থেকে।',
      ],
      ['„তোমার নাম কী?“ জার্মানে কোনটি?', ['Was heißt du?', 'Wie heißt du?', 'Wo heißt du?'], 1, 'জার্মানে নাম জিজ্ঞেস করা হয় wie দিয়ে: Wie heißt du?'],
      [
        'ভদ্রভাবে „দয়া করে অপেক্ষা করুন“ কোনটি?',
        ['Warte!', 'Wartest du?', 'Warten Sie bitte!'],
        2,
        'ভদ্র অনুরোধে Verb + Sie + bitte: Warten Sie bitte!',
      ],
      [
        'W-প্রশ্নের সাধারণ কাঠামো কোনটি?',
        ['প্রশ্নবোধক শব্দ + Verb + Subject', 'Subject + প্রশ্নবোধক শব্দ + Verb', 'Verb + Subject + প্রশ্নবোধক শব্দ'],
        0,
        'যেমন Wo wohnst du?: প্রথমে Wo, তারপর Verb wohnst, তারপর du।',
      ],
    ],
  }),
];
