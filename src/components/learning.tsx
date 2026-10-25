import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AppText, Button, Card, Icon, Row } from '@/components/ui';
import { Radius, Spacing, TouchTarget } from '@/constants/theme';
import {
  correctAnswerText,
  isAnswerCorrect,
  normalizeAnswer,
  type Answer,
  type Example,
  GAP_JOIN,
  type GapQuestion,
  type OrderQuestion,
  type Question,
  type Translated,
} from '@/content';
import { useTheme } from '@/hooks/use-theme';
import { useProgress } from '@/state/progress';

/** German text with its Bangla translation, and English when enabled. */
export function Translation({ item, compact }: { item: Translated; compact?: boolean }) {
  const { progress } = useProgress();
  return (
    <View style={{ gap: 2 }}>
      <AppText variant={compact ? 'subheading' : 'de'}>{item.de}</AppText>
      <AppText variant="bn" muted>
        {item.bn}
      </AppText>
      {item.en && progress.settings.showEnglish ? (
        <AppText variant="caption" muted style={{ fontStyle: 'italic' }}>
          {item.en}
        </AppText>
      ) : null}
    </View>
  );
}

export function ExampleCard({ example }: { example: Example }) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <View style={[styles.example, { borderLeftColor: colors.primary, backgroundColor: colors.surfaceMuted }]}>
      <Translation item={example} />
      {example.words?.length ? (
        <>
          <Pressable onPress={() => setOpen(!open)} accessibilityRole="button" style={styles.wordToggle}>
            <Icon name={open ? 'chevron-up' : 'chevron-down'} size={16} color={colors.primary} />
            <AppText variant="caption" color={colors.primary}>
              {open ? 'শব্দে শব্দে ব্যাখ্যা লুকান' : 'শব্দে শব্দে ব্যাখ্যা দেখুন'}
            </AppText>
          </Pressable>
          {open &&
            example.words.map((w, i) => (
              <Row key={i} style={{ alignItems: 'flex-start' }}>
                <AppText variant="body" style={{ fontWeight: '700', minWidth: 90 }}>
                  {w.de}
                </AppText>
                <AppText variant="bn" muted style={{ flex: 1 }}>
                  {w.bn}
                </AppText>
              </Row>
            ))}
        </>
      ) : null}
    </View>
  );
}

export function DataTable({ rows }: { rows: string[][] }) {
  const { colors } = useTheme();
  const [head, ...body] = rows;
  return (
    <View style={[styles.table, { borderColor: colors.border }]}>
      {[head, ...body].map((row, i) => (
        <View
          key={i}
          style={[
            styles.tableRow,
            { borderColor: colors.border, backgroundColor: i === 0 ? colors.surfaceMuted : colors.surface },
          ]}>
          {row.map((cell, j) => (
            <AppText key={j} variant={i === 0 ? 'caption' : 'body'} style={[styles.tableCell, i === 0 && { fontWeight: '700' }]}>
              {cell}
            </AppText>
          ))}
        </View>
      ))}
    </View>
  );
}

/**
 * Renders one MCQ or fill-in-the-blank question with immediate feedback.
 * When `answer` is set the question is locked and shows the result.
 */
export function QuestionView({
  question,
  answer,
  onAnswer,
  showExplanation = true,
}: {
  question: Question;
  answer?: Answer;
  onAnswer: (a: Answer) => void;
  showExplanation?: boolean;
}) {
  const { colors } = useTheme();
  const [text, setText] = useState('');
  const answered = answer !== undefined;
  const correct = answered && isAnswerCorrect(question, answer);

  return (
    <View style={{ gap: Spacing.md }}>
      {/* A gap sentence is drawn with its gaps by GapInput. */}
      {question.type !== 'gap' && <AppText variant="heading">{question.prompt}</AppText>}
      {question.promptBn ? (
        <AppText variant="bn" muted>
          {question.promptBn}
        </AppText>
      ) : null}

      {question.type === 'mcq' ? (
        <View style={{ gap: Spacing.sm }}>
          {question.options.map((opt, i) => {
            const isPicked = answer === i;
            const isRight = i === question.answer;
            const state = !answered ? 'idle' : isRight ? 'right' : isPicked ? 'wrong' : 'idle';
            const bg = state === 'right' ? colors.correctBg : state === 'wrong' ? colors.wrongBg : colors.surface;
            const border = state === 'right' ? colors.correct : state === 'wrong' ? colors.wrong : colors.border;
            return (
              <Pressable
                key={i}
                disabled={answered}
                onPress={() => onAnswer(i)}
                accessibilityRole="button"
                accessibilityState={{ selected: isPicked, disabled: answered }}
                style={({ pressed }) => [styles.option, { backgroundColor: bg, borderColor: border }, pressed && { opacity: 0.7 }]}>
                <AppText variant="body" style={{ flex: 1 }}>
                  {opt}
                </AppText>
                {state === 'right' && <Icon name="checkmark-circle" color={colors.correct} />}
                {state === 'wrong' && <Icon name="close-circle" color={colors.wrong} />}
              </Pressable>
            );
          })}
        </View>
      ) : question.type === 'order' ? (
        <OrderInput key={question.id} question={question} answer={answer} onAnswer={onAnswer} />
      ) : question.type === 'gap' ? (
        <GapInput key={question.id} question={question} answer={answer} onAnswer={onAnswer} />
      ) : (
        <View style={{ gap: Spacing.sm }}>
          <TextInput
            value={answered ? String(answer) : text}
            onChangeText={setText}
            editable={!answered}
            placeholder="উত্তর লিখুন"
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={() => text.trim() && onAnswer(text)}
            returnKeyType="done"
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: !answered ? colors.surface : correct ? colors.correctBg : colors.wrongBg,
                borderColor: !answered ? colors.border : correct ? colors.correct : colors.wrong,
              },
            ]}
          />
          {!answered && <Button title="উত্তর যাচাই করুন" onPress={() => onAnswer(text)} disabled={!text.trim()} />}
        </View>
      )}

      {answered && (
        <Feedback
          correct={correct}
          correctText={correctAnswerText(question)}
          explanation={showExplanation ? question.explanation : undefined}
          wrongNote={
            showExplanation && question.type === 'mcq' && typeof answer === 'number' && !correct
              ? question.wrongNotes?.[answer]
              : undefined
          }
        />
      )}
    </View>
  );
}

/** Mixes a question's words the same way every time, never leaving them in the right order. */
function mixedOrder(q: { id: string }, count: number): number[] {
  let seed = [...q.id].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);
  const random = () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 2 ** 32);
  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order.every((w, i) => w === i) ? [...order.slice(1), order[0]] : order;
}

type Point = { x: number; y: number };

/** How long a tapped word takes to travel into the sentence. */
const FLY_MS = 420;

/** A copy of a tapped word gliding from where it was to where it lands. */
function Flyer({ from, label, find, onDone }: { from: Point; label: string; find: (then: (to: Point | null) => void) => void; onDone: () => void }) {
  const { colors } = useTheme();
  const [travel] = useState(() => new Animated.ValueXY(from));
  useEffect(() => {
    let anim: Animated.CompositeAnimation | undefined;
    const frame = requestAnimationFrame(() =>
      find((to) => {
        if (!to) return onDone();
        anim = Animated.timing(travel, { toValue: to, duration: FLY_MS, easing: Easing.out(Easing.cubic), useNativeDriver: false });
        anim.start(() => onDone());
      }),
    );
    return () => {
      cancelAnimationFrame(frame);
      anim?.stop();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.chip,
        { position: 'absolute', left: 0, top: 0, backgroundColor: colors.surface, borderColor: colors.primary, transform: travel.getTranslateTransform() },
      ]}>
      <AppText variant="body">{label}</AppText>
    </Animated.View>
  );
}

/**
 * Words in flight. Each tap launches its own word at once, so quick taps send
 * several words gliding together. `target` names the place the word lands.
 */
function useFlights() {
  const [flights, setFlights] = useState<{ word: number; target: number; from?: Point }[]>([]);
  const box = useRef<View>(null);
  const sources = useRef(new Map<number, View | null>());
  const targets = useRef(new Map<number, View | null>());

  /** A view's top-left corner relative to the whole input, or null if it can't be measured. */
  const place = (view: View | null | undefined, then: (p: Point | null) => void) => {
    const outer = box.current;
    if (!outer || !view) return then(null);
    outer.measureInWindow((bx, by) => view.measureInWindow((x, y) => then({ x: x - bx, y: y - by })));
  };

  const land = (word: number) => setFlights((all) => all.filter((f) => f.word !== word));
  const launch = (word: number, target: number) => {
    setFlights((all) => [...all.filter((f) => f.word !== word), { word, target }]);
    place(sources.current.get(word), (from) =>
      from ? setFlights((all) => all.map((f) => (f.word === word ? { ...f, from } : f))) : land(word),
    );
  };

  const flyers = (label: (word: number) => string) =>
    flights.map(
      (f) =>
        f.from && (
          <Flyer
            key={f.word}
            from={f.from}
            label={label(f.word)}
            find={(then) => place(targets.current.get(f.target), then)}
            onDone={() => land(f.word)}
          />
        ),
    );

  return { box, sources, targets, flights, launch, flyers };
}

/**
 * Sentence building: tap the mixed-up words in the right order; tap a placed
 * word to take it back. Some extra words don't belong in the sentence. A
 * tapped word glides from its place into the sentence.
 */
function OrderInput({ question, answer, onAnswer }: { question: OrderQuestion; answer?: Answer; onAnswer: (a: Answer) => void }) {
  const { colors } = useTheme();
  const words = [...question.words, ...(question.extra ?? [])];
  const [picked, setPicked] = useState<number[]>([]);
  const { box, sources, targets, flights, launch, flyers } = useFlights();
  const answered = answer !== undefined;
  const correct = answered && isAnswerCorrect(question, answer);
  const lineColor = !answered ? colors.border : correct ? colors.correct : colors.wrong;
  const inFlight = (i: number) => flights.some((f) => f.word === i);

  const pick = (i: number) => {
    launch(i, i);
    setPicked((p) => [...p, i]);
  };

  const chip = (w: string) => <AppText variant="body">{w}</AppText>;

  return (
    <View ref={box} style={{ gap: Spacing.md }}>
      <View
        style={[
          styles.buildLine,
          { borderColor: lineColor, backgroundColor: !answered ? colors.surface : correct ? colors.correctBg : colors.wrongBg },
        ]}>
        {answered ? (
          String(answer)
            .split(' ')
            .map((w, n) => (
              <View key={`${n}-${w}`} style={[styles.chip, { backgroundColor: colors.surfaceMuted, borderColor: colors.border }]}>
                {chip(w)}
              </View>
            ))
        ) : picked.length === 0 ? (
          <AppText variant="bn" muted>
            নিচের শব্দগুলো সঠিক ক্রমে চাপুন
          </AppText>
        ) : (
          picked.map((i) => (
            <Pressable
              key={i}
              ref={(v) => {
                targets.current.set(i, v as unknown as View | null);
              }}
              disabled={inFlight(i)}
              onPress={() => setPicked((p) => p.filter((k) => k !== i))}
              accessibilityRole="button"
              accessibilityLabel={`${words[i]} সরান`}
              style={[styles.chip, { backgroundColor: colors.surfaceMuted, borderColor: colors.border, opacity: inFlight(i) ? 0 : 1 }]}>
              {chip(words[i])}
            </Pressable>
          ))
        )}
      </View>
      {!answered && (
        <View style={styles.chipWrap}>
          {mixedOrder(question, words.length).map((i) => {
            const used = picked.includes(i);
            return (
              <Pressable
                key={i}
                ref={(v) => {
                  sources.current.set(i, v as unknown as View | null);
                }}
                disabled={used}
                onPress={() => pick(i)}
                accessibilityRole="button"
                accessibilityLabel={words[i]}
                style={[styles.chip, used ? styles.usedChip : { backgroundColor: colors.surface, borderColor: colors.primary }]}>
                <AppText variant="body" color={used ? 'transparent' : colors.text}>
                  {words[i]}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      )}
      {!answered && (
        <Button
          title="উত্তর যাচাই করুন"
          onPress={() => onAnswer(picked.map((i) => words[i]).join(' '))}
          disabled={picked.length !== question.words.length || flights.length > 0}
        />
      )}
      {!answered && flyers((i) => words[i])}
    </View>
  );
}

/**
 * Fill the gaps by choosing words: a tapped word glides into the next empty
 * gap (tap a filled gap to take its word back). When every gap is filled the
 * answer is checked.
 */
function GapInput({ question, answer, onAnswer }: { question: GapQuestion; answer?: Answer; onAnswer: (a: Answer) => void }) {
  const { colors } = useTheme();
  const gaps = question.answers.length;
  // Option index chosen for each gap, or -1 while empty.
  const [chosen, setChosen] = useState<number[]>(() => Array(gaps).fill(-1));
  const { box, sources, targets, flights, launch, flyers } = useFlights();
  const answered = answer !== undefined;
  const given = answered ? String(answer).split(GAP_JOIN) : [];
  const parts = question.prompt.split('___').map((p) => p.split(' ').filter(Boolean));

  const pick = (option: number) => {
    const gap = chosen.indexOf(-1);
    if (gap < 0) return;
    launch(option, gap);
    setChosen(chosen.map((c, g) => (g === gap ? option : c)));
  };

  // Once every gap is filled and every word has landed, check the answer.
  const ready = !answered && flights.length === 0 && !chosen.includes(-1);
  useEffect(() => {
    if (ready) onAnswer(chosen.map((c) => question.options[c]).join(GAP_JOIN));
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  const gapBox = (g: number) => {
    const word = answered ? given[g] : chosen[g] >= 0 ? question.options[chosen[g]] : '';
    const right = answered && normalizeAnswer(given[g] ?? '') === normalizeAnswer(question.answers[g]);
    const border = !answered ? (word ? colors.primary : colors.textSecondary) : right ? colors.correct : colors.wrong;
    const bg = !answered ? colors.surface : right ? colors.correctBg : colors.wrongBg;
    const landing = flights.some((f) => f.target === g);
    return (
      <Pressable
        ref={(v) => {
          targets.current.set(g, v as unknown as View | null);
        }}
        disabled={answered || !word || landing}
        onPress={() => setChosen(chosen.map((c, k) => (k === g ? -1 : c)))}
        accessibilityRole="button"
        accessibilityLabel={word ? `${word} সরান` : 'খালি ঘর'}
        style={[
          styles.chip,
          {
            minWidth: 64,
            alignItems: 'center',
            backgroundColor: bg,
            borderColor: border,
            borderStyle: word ? 'solid' : 'dashed',
            opacity: landing ? 0 : 1,
          },
        ]}>
        <AppText variant="body">{word || ' '}</AppText>
      </Pressable>
    );
  };

  return (
    <View ref={box} style={{ gap: Spacing.lg }}>
      <View style={[styles.chipWrap, { justifyContent: 'flex-start', alignItems: 'center', rowGap: Spacing.sm }]}>
        {parts.flatMap((words, n) => {
          // Punctuation right after a gap stays next to it: „___.“
          const after = parts[n + 1]?.[0];
          const stuck = after && /^[.,!?;:]/.test(after) ? after : undefined;
          return [
            ...words.slice(n > 0 && /^[.,!?;:]/.test(words[0] ?? '') ? 1 : 0).map((w, k) => (
              <AppText key={`w-${n}-${k}`} variant="heading">
                {w}
              </AppText>
            )),
            ...(n < parts.length - 1
              ? [
                  <View key={`gap-${n}`} style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                    {gapBox(n)}
                    {stuck && <AppText variant="heading">{stuck}</AppText>}
                  </View>,
                ]
              : []),
          ];
        })}
      </View>
      {!answered && (
        <View style={styles.chipWrap}>
          {mixedOrder(question, question.options.length).map((i) => {
            const used = chosen.includes(i);
            return (
              <Pressable
                key={i}
                ref={(v) => {
                  sources.current.set(i, v as unknown as View | null);
                }}
                disabled={used || !chosen.includes(-1)}
                onPress={() => pick(i)}
                accessibilityRole="button"
                accessibilityLabel={question.options[i]}
                style={[styles.chip, used ? styles.usedChip : { backgroundColor: colors.surface, borderColor: colors.primary }]}>
                <AppText variant="body" color={used ? 'transparent' : colors.text}>
                  {question.options[i]}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      )}
      {!answered && flyers((i) => question.options[i])}
    </View>
  );
}

function Feedback({
  correct,
  correctText,
  explanation,
  wrongNote,
}: {
  correct: boolean;
  correctText: string;
  explanation?: string;
  wrongNote?: string;
}) {
  const { colors } = useTheme();
  const fg = correct ? colors.correct : colors.wrong;
  return (
    <Card style={{ backgroundColor: correct ? colors.correctBg : colors.wrongBg, borderColor: fg }}>
      <Row>
        <Icon name={correct ? 'checkmark-circle' : 'close-circle'} color={fg} />
        <AppText variant="subheading" color={fg}>
          {correct ? 'সঠিক!' : 'ভুল হয়েছে'}
        </AppText>
      </Row>
      {!correct && <AppText variant="bn">সঠিক উত্তর: {correctText}</AppText>}
      {wrongNote ? <AppText variant="bn">{wrongNote}</AppText> : null}
      {explanation ? <AppText variant="bn">{explanation}</AppText> : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  example: { borderLeftWidth: 4, padding: Spacing.md, borderRadius: Radius.sm, gap: Spacing.xs },
  wordToggle: { flexDirection: 'row', alignItems: 'center', gap: 4, minHeight: 36 },
  table: { borderWidth: 1, borderRadius: Radius.sm, overflow: 'hidden' },
  tableRow: { flexDirection: 'row', borderTopWidth: StyleSheet.hairlineWidth },
  tableCell: { flex: 1, padding: Spacing.sm },
  option: {
    minHeight: TouchTarget + 4,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  buildLine: {
    minHeight: TouchTarget + 16,
    borderWidth: 2,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  // A used word leaves no mark behind: its place stays, but blank like the page.
  usedChip: { backgroundColor: 'transparent', borderColor: 'transparent' },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, justifyContent: 'center' },
  chip: { minHeight: 48, paddingHorizontal: Spacing.md, borderRadius: Radius.md, borderWidth: 2, borderBottomWidth: 4, justifyContent: 'center' },
  input: { minHeight: TouchTarget + 4, borderWidth: 2, borderRadius: Radius.md, paddingHorizontal: Spacing.lg, fontSize: 18 },
});
