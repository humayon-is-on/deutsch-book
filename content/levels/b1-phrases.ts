import { phraseTopicMaker } from './phrase-helpers';
import type { VocabTopic } from '../../src/content/types';

/**
 * B1 Redewendungen, from the person's list "b1_phrase": seven topics of ten
 * phrases in the list's order (the last one is the list's bonus Goethe B1
 * Sprechen expressions). Same tests as A1/A2: every phrase both ways.
 */

const topic = phraseTopicMaker('B1');

export const b1Phrases: VocabTopic[] = [
  topic('meinungen', 'Meinungen und Argumente', 'মতামত ও যুক্তি', 'Expressing opinions and arguments', 'chatbubbles-outline', [
    ['Meiner Ansicht nach ...', 'আমার দৃষ্টিতে ...', 'In my view ...'],
    ['Ich bin fest davon überzeugt, dass ...', 'আমি দৃঢ়ভাবে বিশ্বাস করি যে ...', 'I am firmly convinced that ...'],
    ['Ich vertrete die Meinung, dass ...', 'আমি এই মত পোষণ করি যে ...', 'I hold the opinion that ...'],
    ['Das sehe ich etwas anders.', 'আমি বিষয়টি একটু ভিন্নভাবে দেখি।', 'I see that a little differently.'],
    ['Ich kann dem nur zustimmen.', 'আমি এতে সম্পূর্ণ একমত।', 'I can only agree with that.'],
    ['Da bin ich anderer Meinung.', 'এ ব্যাপারে আমার মত ভিন্ন।', 'I have a different opinion.'],
    ['Das lässt sich nicht so einfach sagen.', 'এটা এত সহজে বলা যায় না।', "It's not that easy to say."],
    ['Es kommt ganz darauf an.', 'এটা সম্পূর্ণ পরিস্থিতির ওপর নির্ভর করে।', 'It really depends.'],
    ['Ich möchte darauf hinweisen, dass ...', 'আমি এ বিষয়টি উল্লেখ করতে চাই যে ...', "I'd like to point out that ..."],
    ['Man sollte nicht vergessen, dass ...', 'এটা ভুলে যাওয়া উচিত নয় যে ...', "One shouldn't forget that ..."],
  ], [['Meiner Ansicht nach ...', 'Ich vertrete die Meinung, dass ...', 'Ich bin fest davon überzeugt, dass ...'], ['Das sehe ich etwas anders.', 'Da bin ich anderer Meinung.'], ['Das lässt sich nicht so einfach sagen.', 'Es kommt ganz darauf an.'], ['Ich möchte darauf hinweisen, dass ...', 'Man sollte nicht vergessen, dass ...']]),
  topic('gruende', 'Gründe und Folgen', 'কারণ ও ফলাফল', 'Giving reasons and explaining consequences', 'git-branch-outline', [
    ['Aus diesem Grund ...', 'এই কারণে ...', 'For this reason ...'],
    ['Das liegt daran, dass ...', 'এর কারণ হলো ...', "That's because ..."],
    ['Einer der Hauptgründe ist, dass ...', 'প্রধান কারণগুলোর একটি হলো ...', 'One of the main reasons is that ...'],
    ['Das hat zur Folge, dass ...', 'এর ফলে ...', 'This results in ...'],
    ['Aus diesem Grund bin ich der Meinung, dass ...', 'এই কারণে আমার মত হলো যে ...', 'For this reason, I believe that ...'],
    ['Das führt dazu, dass ...', 'এর ফলে এমন হয় যে ...', 'This leads to ...'],
    ['Im Gegensatz dazu ...', 'এর বিপরীতে ...', 'In contrast ...'],
    ['Außerdem sollte man bedenken, dass ...', 'তাছাড়া বিবেচনা করা উচিত যে ...', 'Furthermore, one should consider that ...'],
    ['Nicht nur ..., sondern auch ...', 'শুধু ... নয়, বরং ...ও', 'Not only ..., but also ...'],
    ['Je mehr ..., desto besser ...', 'যত বেশি ..., তত ভালো ...', 'The more ..., the better ...'],
  ], [['Aus diesem Grund ...', 'Aus diesem Grund bin ich der Meinung, dass ...', 'Das liegt daran, dass ...', 'Einer der Hauptgründe ist, dass ...'], ['Das hat zur Folge, dass ...', 'Das führt dazu, dass ...']]),
  topic('zustimmen', 'Zustimmen und Widersprechen', 'ভদ্রভাবে একমত ও দ্বিমত', 'Agreeing and disagreeing politely', 'thumbs-up-outline', [
    ['Da stimme ich dir vollkommen zu.', 'আমি তোমার সঙ্গে সম্পূর্ণ একমত।', 'I completely agree with you.'],
    ['Das sehe ich genauso.', 'আমিও ঠিক একইভাবে দেখি।', 'I see it exactly the same way.'],
    ['Da muss ich dir widersprechen.', 'আমাকে তোমার সঙ্গে দ্বিমত পোষণ করতে হচ্ছে।', 'I have to disagree with you.'],
    ['Ich verstehe deinen Standpunkt, aber ...', 'আমি তোমার দৃষ্টিভঙ্গি বুঝি, কিন্তু ...', 'I understand your point of view, but ...'],
    ['Das mag sein, allerdings ...', 'সেটা সত্যি হতে পারে, তবে ...', 'That may be true, however ...'],
    ['Du hast teilweise recht.', 'তুমি আংশিকভাবে ঠিক।', "You're partly right."],
    ['Damit bin ich nicht ganz einverstanden.', 'আমি এতে পুরোপুরি একমত নই।', "I don't entirely agree with that."],
    ['Das ist ein guter Punkt.', 'এটা একটি ভালো যুক্তি।', "That's a good point."],
    ['Ich sehe deinen Punkt.', 'আমি তোমার বক্তব্য বুঝতে পারছি।', 'I see your point.'],
    ['Da sind wir uns einig.', 'এ ব্যাপারে আমরা একমত।', 'We agree on that.'],
  ], [['Da stimme ich dir vollkommen zu.', 'Das sehe ich genauso.', 'Da sind wir uns einig.'], ['Da muss ich dir widersprechen.', 'Damit bin ich nicht ganz einverstanden.'], ['Ich verstehe deinen Standpunkt, aber ...', 'Ich sehe deinen Punkt.', 'Das ist ein guter Punkt.'], ['Das mag sein, allerdings ...', 'Du hast teilweise recht.']]),
  topic('erfahrungen', 'Erfahrungen', 'অভিজ্ঞতা ও নিজের গল্প', 'Experiences and personal stories', 'time-outline', [
    ['Ich habe die Erfahrung gemacht, dass ...', 'আমার অভিজ্ঞতা হয়েছে যে ...', "I've had the experience that ..."],
    ['Früher habe ich oft ...', 'আগে আমি প্রায়ই ... করতাম।', 'I often used to ...'],
    ['Im Laufe der Zeit ...', 'সময়ের সাথে সাথে ...', 'Over time ...'],
    ['Seitdem hat sich vieles verändert.', 'তারপর থেকে অনেক কিছু পরিবর্তিত হয়েছে।', 'A lot has changed since then.'],
    ['Rückblickend kann ich sagen, dass ...', 'পেছনে ফিরে তাকালে বলতে পারি যে ...', 'Looking back, I can say that ...'],
    ['Das ist mir besonders in Erinnerung geblieben.', 'বিষয়টি আমার বিশেষভাবে মনে আছে।', 'That particularly stayed in my memory.'],
    ['Ich hätte nie gedacht, dass ...', 'আমি কখনো ভাবিনি যে ...', 'I would never have thought that ...'],
    ['Es hat sich herausgestellt, dass ...', 'শেষ পর্যন্ত দেখা গেল যে ...', 'It turned out that ...'],
    ['Das war eine wertvolle Erfahrung.', 'সেটা ছিল একটি মূল্যবান অভিজ্ঞতা।', 'That was a valuable experience.'],
    ['Daraus habe ich viel gelernt.', 'আমি সেখান থেকে অনেক কিছু শিখেছি।', 'I learned a lot from it.'],
  ], [['Im Laufe der Zeit ...', 'Seitdem hat sich vieles verändert.'], ['Rückblickend kann ich sagen, dass ...', 'Das ist mir besonders in Erinnerung geblieben.'], ['Das war eine wertvolle Erfahrung.', 'Daraus habe ich viel gelernt.', 'Ich habe die Erfahrung gemacht, dass ...'], ['Ich hätte nie gedacht, dass ...', 'Es hat sich herausgestellt, dass ...']]),
  topic('vorschlaege', 'Vorschläge und Lösungen', 'প্রস্তাব, পরিকল্পনা ও সমাধান', 'Suggestions, plans and solutions', 'bulb-outline', [
    ['Ich würde vorschlagen, dass ...', 'আমি প্রস্তাব করব যে ...', 'I would suggest that ...'],
    ['Wie wäre es, wenn wir ...?', 'আমরা যদি ... করি, তাহলে কেমন হয়?', 'What about if we ...?'],
    ['Wir könnten stattdessen ...', 'এর পরিবর্তে আমরা ... করতে পারি।', 'We could instead ...'],
    ['Es wäre sinnvoll, ... zu ...', '... করা যুক্তিসংগত হবে।', 'It would make sense to ...'],
    ['Wir sollten eine Lösung finden.', 'আমাদের একটি সমাধান খুঁজে বের করা উচিত।', 'We should find a solution.'],
    ['Das wäre eine gute Möglichkeit.', 'এটা একটি ভালো উপায় হতে পারে।', 'That would be a good possibility.'],
    ['Ich schlage vor, dass wir ...', 'আমি প্রস্তাব করছি যে আমরা ...', 'I suggest that we ...'],
    ['Wir könnten uns darauf einigen, dass ...', 'আমরা এ বিষয়ে একমত হতে পারি যে ...', 'We could agree that ...'],
    ['Es wäre besser, wenn wir ...', 'আমরা যদি ... করি, তাহলে ভালো হবে।', 'It would be better if we ...'],
    ['Lass uns gemeinsam überlegen, wie ...', 'চলো একসঙ্গে ভাবি কীভাবে ...', "Let's think together about how ..."],
  ], [['Ich würde vorschlagen, dass ...', 'Ich schlage vor, dass wir ...', 'Wie wäre es, wenn wir ...?', 'Wir könnten stattdessen ...'], ['Es wäre sinnvoll, ... zu ...', 'Es wäre besser, wenn wir ...', 'Das wäre eine gute Möglichkeit.'], ['Wir sollten eine Lösung finden.', 'Wir könnten uns darauf einigen, dass ...', 'Lass uns gemeinsam überlegen, wie ...']]),
  topic('redewendungen', 'Natürliche Redewendungen', 'স্বাভাবিক B1 অভিব্যক্তি', 'Natural B1 expressions', 'happy-outline', [
    ['Das ist leichter gesagt als getan.', 'বলা সহজ, করা কঠিন।', 'Easier said than done.'],
    ['Das kommt für mich nicht infrage.', 'এটা আমার পক্ষে সম্ভব নয়।', "That's out of the question for me."],
    ['Ich nehme das in Kauf.', 'আমি সেটা মেনে নিচ্ছি।', "I'll accept that / put up with it."],
    ['Das spielt eine wichtige Rolle.', 'এটা গুরুত্বপূর্ণ ভূমিকা পালন করে।', 'That plays an important role.'],
    ['Das steht außer Frage.', 'এটা নিয়ে কোনো প্রশ্ন নেই।', "That's beyond question."],
    ['Das ist nicht zu unterschätzen.', 'এটাকে অবহেলা করা উচিত নয়।', "That shouldn't be underestimated."],
    ['Es lohnt sich, ... zu ...', '... করা সার্থক।', "It's worth ..."],
    ['Das lässt sich nicht vermeiden.', 'এটা এড়ানো সম্ভব নয়।', 'That cannot be avoided.'],
    ['Ich bin davon ausgegangen, dass ...', 'আমি ধরে নিয়েছিলাম যে ...', 'I assumed that ...'],
    ['Letztendlich muss jeder selbst entscheiden.', 'শেষ পর্যন্ত প্রত্যেককে নিজের সিদ্ধান্ত নিতে হবে।', 'Ultimately, everyone must decide for themselves.'],
  ], [['Das steht außer Frage.', 'Das ist nicht zu unterschätzen.', 'Das spielt eine wichtige Rolle.'], ['Das kommt für mich nicht infrage.', 'Das lässt sich nicht vermeiden.', 'Ich nehme das in Kauf.']]),
  topic('sprechen', 'Goethe B1 Sprechen', 'গুরুত্বপূর্ণ অভিব্যক্তি (Goethe B1 Sprechen)', 'Powerful expressions for Goethe B1 Sprechen', 'star-outline', [
    ['Was hältst du davon?', 'এ ব্যাপারে তোমার কী মত?', 'What do you think about it?'],
    ['Ich bin ganz deiner Meinung.', 'আমি তোমার সঙ্গে সম্পূর্ণ একমত।', 'I completely agree with you.'],
    ['Das hört sich interessant an.', 'এটা শুনতে আকর্ষণীয় মনে হচ্ছে।', 'That sounds interesting.'],
    ['Wir müssen auch die Kosten berücksichtigen.', 'আমাদের খরচও বিবেচনা করতে হবে।', 'We also have to consider the costs.'],
    ['Das sollten wir rechtzeitig erledigen.', 'আমাদের এটা সময়মতো সম্পন্ন করা উচিত।', 'We should take care of that in time.'],
    ['Wer könnte uns dabei helfen?', 'এ ব্যাপারে কে আমাদের সাহায্য করতে পারে?', 'Who could help us with that?'],
    ['Ich kümmere mich darum.', 'আমি এটা দেখে নেব।', "I'll take care of it."],
    ['Dann machen wir es so.', 'তাহলে আমরা এভাবেই করি।', "Then let's do it this way."],
    ['Wir haben nicht mehr viel Zeit.', 'আমাদের হাতে আর বেশি সময় নেই।', "We don't have much time left."],
    ['Das klingt nach einem guten Plan.', 'এটা একটি ভালো পরিকল্পনা মনে হচ্ছে।', 'That sounds like a good plan.'],
  ], [['Ich bin ganz deiner Meinung.', 'Dann machen wir es so.', 'Das klingt nach einem guten Plan.', 'Das hört sich interessant an.'], ['Das sollten wir rechtzeitig erledigen.', 'Wir haben nicht mehr viel Zeit.', 'Ich kümmere mich darum.']]),
];
