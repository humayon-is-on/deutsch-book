import type { Level, Question, Skill } from './types';

export type PlacementQuestion = Question & { level: Level; skill: Skill };

/**
 * Placement test: a short mix of MCQ and fill-in-the-blank questions that
 * get harder from A1 to B1. Results are guidance only, not certification.
 */
export const placementQuestions: PlacementQuestion[] = [
  // A1
  { id: 'p-1', level: 'A1', skill: 'grammar', type: 'mcq', prompt: 'Ich ___ Studentin.', options: ['bin', 'ist', 'bist', 'sind'], answer: 0 },
  { id: 'p-2', level: 'A1', skill: 'vocabulary', type: 'mcq', prompt: '„Danke“ bedeutet …', promptBn: '„Danke“ মানে …', options: ['বিদায়', 'ধন্যবাদ', 'সুপ্রভাত', 'দুঃখিত'], answer: 1 },
  { id: 'p-3', level: 'A1', skill: 'grammar', type: 'fill', prompt: 'Wie ___ du? – Ich heiße Sumi.', accept: ['heißt', 'heisst'] },
  { id: 'p-4', level: 'A1', skill: 'sentence', type: 'mcq', prompt: 'Welcher Satz ist richtig?', options: ['Morgen ich gehe ins Kino.', 'Morgen gehe ich ins Kino.', 'Ich morgen gehe ins Kino.', 'Gehe morgen ich ins Kino.'], answer: 1 },
  // A2
  { id: 'p-5', level: 'A2', skill: 'grammar', type: 'mcq', prompt: 'Letzte Woche ___ wir nach München gefahren.', options: ['haben', 'sind', 'waren', 'hatten'], answer: 1 },
  { id: 'p-6', level: 'A2', skill: 'grammar', type: 'fill', prompt: 'Du ___ heute nicht arbeiten. Es ist Sonntag! (müssen)', accept: ['musst'] },
  { id: 'p-7', level: 'A2', skill: 'vocabulary', type: 'mcq', prompt: 'Ich bin krank. Ich brauche einen ___ beim Arzt.', options: ['Termin', 'Urlaub', 'Fahrschein', 'Kuchen'], answer: 0 },
  { id: 'p-8', level: 'A2', skill: 'reading', type: 'mcq', prompt: '„Die Praxis ist mittwochs nur vormittags geöffnet.“ – Wann kann man am Mittwoch kommen?', options: ['Am Abend', 'Am Vormittag', 'Den ganzen Tag', 'Gar nicht'], answer: 1 },
  // B1
  { id: 'p-9', level: 'B1', skill: 'sentence', type: 'mcq', prompt: 'Ich lerne Deutsch, weil ich in Deutschland ___.', options: ['studieren möchte', 'möchte studieren', 'studiere möchte', 'möchten studieren'], answer: 0 },
  { id: 'p-10', level: 'B1', skill: 'grammar', type: 'fill', prompt: 'Wenn ich Zeit ___, würde ich dir helfen. (haben)', accept: ['hätte', 'haette'] },
  { id: 'p-11', level: 'B1', skill: 'grammar', type: 'mcq', prompt: '___ es regnet, gehen wir spazieren.', options: ['Weil', 'Obwohl', 'Dass', 'Denn'], answer: 1 },
  { id: 'p-12', level: 'B1', skill: 'reading', type: 'mcq', prompt: '„Bewerbungen werden nur online entgegengenommen.“ – Was bedeutet das?', options: ['Man kann sich nur per Post bewerben.', 'Man muss sich im Internet bewerben.', 'Man muss persönlich kommen.', 'Es gibt keine Stelle.'], answer: 1 },
];

export type PlacementResult = {
  correct: number;
  total: number;
  byLevel: Record<Level, { correct: number; total: number }>;
  recommended: Level;
};

const PASS_RATIO = 0.75;

/**
 * Recommends the first level the learner has not yet mastered.
 * A learner who passes A1 and A2 is recommended B1.
 */
export function scorePlacement(isCorrect: Record<string, boolean>): PlacementResult {
  const byLevel: PlacementResult['byLevel'] = {
    A1: { correct: 0, total: 0 },
    A2: { correct: 0, total: 0 },
    B1: { correct: 0, total: 0 },
  };
  for (const q of placementQuestions) {
    byLevel[q.level].total += 1;
    if (isCorrect[q.id]) byLevel[q.level].correct += 1;
  }
  const passed = (l: Level) => byLevel[l].correct / byLevel[l].total >= PASS_RATIO;
  const recommended: Level = !passed('A1') ? 'A1' : !passed('A2') ? 'A2' : 'B1';
  const correct = Object.values(byLevel).reduce((s, v) => s + v.correct, 0);
  return { correct, total: placementQuestions.length, byLevel, recommended };
}
