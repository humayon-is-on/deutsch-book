import { phraseTopicMaker } from './phrase-helpers';
import type { VocabTopic } from '../../src/content/types';

/**
 * A2 Alltagsausdrücke, from the person's list "German A2 phrases": six topics
 * of ten phrases in the list's order, then the list's ten important
 * expressions as a seventh topic. Same tests as A1: every phrase both ways.
 */

const topic = phraseTopicMaker('A2');

export const a2Phrases: VocabTopic[] = [
  topic('alltag', 'Alltag', 'দৈনন্দিন কথাবার্তা', 'Daily conversations', 'sunny-outline', [
    ['Das macht nichts.', 'এতে কিছু যায় আসে না।', "It doesn't matter."],
    ['Das ist mir egal.', 'এটা নিয়ে আমার কিছু যায় আসে না।', "I don't mind."],
    ['Ich bin mir nicht sicher.', 'আমি নিশ্চিত নই।', "I'm not sure."],
    ['Das kann sein.', 'এটা হতে পারে।', 'That might be true.'],
    ['Auf keinen Fall!', 'কোনোভাবেই না!', 'Absolutely not!'],
    ['Das ist doch klar!', 'এটা তো পরিষ্কার!', "That's obvious!"],
    ['Ich habe es eilig.', 'আমার তাড়া আছে।', "I'm in a hurry."],
    ['Keine Panik!', 'ঘাবড়িও না!', "Don't panic!"],
    ['Das passt mir gut.', 'এটা আমার জন্য সুবিধাজনক।', 'That suits me well.'],
    ['Ich bin gleich zurück.', 'আমি এখনই ফিরে আসছি।', "I'll be right back."],
  ], [['Das macht nichts.', 'Das ist mir egal.'], ['Ich bin mir nicht sicher.', 'Das kann sein.']]),
  topic('meinungen', 'Meinungen', 'মতামত ও প্রতিক্রিয়া', 'Opinions and reactions', 'chatbubbles-outline', [
    ['Meiner Meinung nach ...', 'আমার মতে ...', 'In my opinion ...'],
    ['Ich bin damit einverstanden.', 'আমি এতে একমত।', 'I agree with that.'],
    ['Ich bin anderer Meinung.', 'আমার মত ভিন্ন।', 'I have a different opinion.'],
    ['Das sehe ich genauso.', 'আমিও ঠিক একইভাবে দেখি।', 'I see it the same way.'],
    ['Da hast du recht.', 'এ ব্যাপারে তুমি ঠিক।', "You're right about that."],
    ['Ich glaube schon.', 'আমার মনে হয় তাই।', 'I think so.'],
    ['Ich glaube eher nicht.', 'আমার তা মনে হয় না।', "I don't think so."],
    ['Das kommt darauf an.', 'এটা পরিস্থিতির ওপর নির্ভর করে।', 'It depends.'],
    ['Das finde ich interessant.', 'আমার কাছে এটা আকর্ষণীয় মনে হয়।', 'I find that interesting.'],
    ['Ich kann das verstehen.', 'আমি এটা বুঝতে পারছি।', 'I can understand that.'],
  ], [['Ich bin damit einverstanden.', 'Das sehe ich genauso.', 'Da hast du recht.', 'Ich glaube schon.'], ['Ich bin anderer Meinung.', 'Ich glaube eher nicht.']]),
  topic('gefuehle', 'Gefühle', 'অনুভূতি ও পরিস্থিতি', 'Feelings and situations', 'heart-outline', [
    ['Ich freue mich darauf.', 'আমি এটার জন্য অপেক্ষা করছি।', "I'm looking forward to it."],
    ['Ich habe Angst davor.', 'আমি এটা নিয়ে ভয় পাচ্ছি।', "I'm afraid of it."],
    ['Das tut mir leid.', 'আমি দুঃখিত।', "I'm sorry."],
    ['Ich bin enttäuscht.', 'আমি হতাশ।', "I'm disappointed."],
    ['Ich bin zufrieden damit.', 'আমি এতে সন্তুষ্ট।', "I'm satisfied with it."],
    ['Ich fühle mich wohl.', 'আমি স্বাচ্ছন্দ্য বোধ করছি।', 'I feel comfortable.'],
    ['Ich bin total überrascht.', 'আমি পুরোপুরি অবাক।', "I'm completely surprised."],
    ['Das macht mich glücklich.', 'এটা আমাকে খুশি করে।', 'That makes me happy.'],
    ['Ich habe keine Lust darauf.', 'আমার এটা করতে ইচ্ছা করছে না।', "I don't feel like it."],
    ['Ich bin daran gewöhnt.', 'আমি এতে অভ্যস্ত।', "I'm used to it."],
  ], [['Ich bin zufrieden damit.', 'Ich fühle mich wohl.', 'Das macht mich glücklich.'], ['Das tut mir leid.', 'Ich bin enttäuscht.']]),
  topic('arbeit', 'Arbeit und Lernen', 'কাজ, পড়াশোনা ও দায়িত্ব', 'Work, study and responsibilities', 'briefcase-outline', [
    ['Ich muss mich beeilen.', 'আমাকে তাড়াতাড়ি করতে হবে।', 'I have to hurry.'],
    ['Ich kümmere mich darum.', 'আমি এটা দেখে নেব।', "I'll take care of it."],
    ['Ich bin damit beschäftigt.', 'আমি এটা নিয়ে ব্যস্ত।', "I'm busy with it."],
    ['Ich habe viel zu tun.', 'আমার অনেক কাজ আছে।', 'I have a lot to do.'],
    ['Ich komme damit klar.', 'আমি এটা সামলাতে পারি।', 'I can manage it.'],
    ['Das hängt davon ab.', 'এটা সেটার ওপর নির্ভর করে।', 'That depends on it.'],
    ['Ich habe mich daran gewöhnt.', 'আমি এতে অভ্যস্ত হয়ে গেছি।', "I've got used to it."],
    ['Das habe ich vergessen.', 'আমি সেটা ভুলে গেছি।', 'I forgot that.'],
    ['Ich bin dafür verantwortlich.', 'আমি এর জন্য দায়ী।', "I'm responsible for that."],
    ['Ich gebe mein Bestes.', 'আমি আমার সর্বোচ্চ চেষ্টা করব।', "I'll do my best."],
  ], [['Ich kümmere mich darum.', 'Ich komme damit klar.', 'Ich gebe mein Bestes.', 'Ich bin dafür verantwortlich.'], ['Ich muss mich beeilen.', 'Ich habe viel zu tun.', 'Ich bin damit beschäftigt.']]),
  topic('probleme', 'Probleme und Lösungen', 'সমস্যা ও সমাধান', 'Problems and solutions', 'construct-outline', [
    ['Was ist passiert?', 'কী ঘটেছে?', 'What happened?'],
    ['Das ist kein Problem für mich.', 'এটা আমার জন্য সমস্যা নয়।', "That's not a problem for me."],
    ['Wir finden schon eine Lösung.', 'আমরা একটা সমাধান খুঁজে পাব।', "We'll find a solution."],
    ['Das funktioniert leider nicht.', 'দুর্ভাগ্যবশত এটা কাজ করছে না।', "Unfortunately, that doesn't work."],
    ['Ich habe mich geirrt.', 'আমার ভুল হয়েছিল।', 'I was mistaken.'],
    ['Das ist nicht meine Schuld.', 'এটা আমার দোষ নয়।', "It's not my fault."],
    ['Kannst du das erklären?', 'তুমি কি এটা ব্যাখ্যা করতে পারো?', 'Can you explain that?'],
    ['Ich habe es nicht geschafft.', 'আমি এটা করতে পারিনি।', "I couldn't manage it."],
    ['Das lässt sich ändern.', 'এটা পরিবর্তন করা সম্ভব।', 'That can be changed.'],
    ['Wir müssen darüber sprechen.', 'আমাদের এটা নিয়ে কথা বলতে হবে।', 'We have to talk about it.'],
  ], [['Ich habe mich geirrt.', 'Das ist nicht meine Schuld.'], ['Das funktioniert leider nicht.', 'Ich habe es nicht geschafft.'], ['Wir finden schon eine Lösung.', 'Das lässt sich ändern.']]),
  topic('ausdruecke', 'Natürliche Ausdrücke', 'স্বাভাবিক জার্মান অভিব্যক্তি', 'Natural German expressions', 'happy-outline', [
    ['Das ist ja unglaublich!', 'এটা তো অবিশ্বাস্য!', "That's unbelievable!"],
    ['Na, und?', 'তাতে কী?', 'So what?'],
    ['Von mir aus!', 'আমার কোনো আপত্তি নেই!', "As far as I'm concerned! / Fine by me!"],
    ['So ein Pech!', 'কী দুর্ভাগ্য!', 'What bad luck!'],
    ['Das ist mir aufgefallen.', 'বিষয়টি আমার চোখে পড়েছে।', 'I noticed that.'],
    ['Lass mich in Ruhe!', 'আমাকে একা থাকতে দাও!', 'Leave me alone!'],
    ['Ich bin gespannt.', 'আমি জানার জন্য আগ্রহী।', "I'm curious / excited to see."],
    ['Das ist doch nicht wahr!', 'এটা তো সত্যি হতে পারে না!', "That can't be true!"],
    ['Es ist mir gelungen.', 'আমি এটা করতে পেরেছি।', 'I managed to do it.'],
    ['Wir werden sehen.', 'দেখা যাবে।', "We'll see."],
  ], [['Das ist ja unglaublich!', 'Das ist doch nicht wahr!'], ['Na, und?', 'Von mir aus!'], ['Ich bin gespannt.', 'Wir werden sehen.']]),
  topic('wichtig', 'Wichtige Ausdrücke', 'গুরুত্বপূর্ণ অভিব্যক্তি (B1 প্রস্তুতি)', 'Important expressions', 'star-outline', [
    ['Es hängt davon ab.', 'এটা নির্ভর করে।', 'It depends.'],
    ['Ich bin der Meinung, dass ...', 'আমার মত হলো যে ...', 'I am of the opinion that ...'],
    ['Einerseits ..., andererseits ...', 'একদিকে ..., অন্যদিকে ...', 'On one hand ..., on the other hand ...'],
    ['Im Vergleich zu ...', '... এর তুলনায়', 'Compared to ...'],
    ['Das hat Vorteile und Nachteile.', 'এর সুবিধা ও অসুবিধা দুটোই আছে।', 'That has advantages and disadvantages.'],
    ['Ich würde vorschlagen, dass ...', 'আমি প্রস্তাব করব যে ...', 'I would suggest that ...'],
    ['Es wäre besser, wenn ...', 'ভালো হতো যদি ...', 'It would be better if ...'],
    ['Ich habe vor, ... zu ...', 'আমি ... করার পরিকল্পনা করছি।', 'I intend to ...'],
    ['Das ist eine gute Gelegenheit.', 'এটা একটা ভালো সুযোগ।', "That's a good opportunity."],
    ['Wir sollten darüber nachdenken.', 'আমাদের এটা নিয়ে ভেবে দেখা উচিত।', 'We should think about it.'],
  ], [['Ich würde vorschlagen, dass ...', 'Es wäre besser, wenn ...', 'Wir sollten darüber nachdenken.'], ['Es hängt davon ab.', 'Einerseits ..., andererseits ...', 'Das hat Vorteile und Nachteile.']]),
];
