import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AppText, Button, Card, Icon, Row } from '@/components/ui';
import { Radius, Spacing, TouchTarget } from '@/constants/theme';
import {
  correctAnswerText,
  isAnswerCorrect,
  type Answer,
  type Example,
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
      <AppText variant="heading">{question.prompt}</AppText>
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
function mixedOrder(q: OrderQuestion): number[] {
  let seed = [...q.id].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);
  const random = () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 2 ** 32);
  const order = q.words.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order.every((w, i) => w === i) ? [...order.slice(1), order[0]] : order;
}

/** Sentence building: tap the mixed-up words in the right order; tap a placed word to take it back. */
function OrderInput({ question, answer, onAnswer }: { question: OrderQuestion; answer?: Answer; onAnswer: (a: Answer) => void }) {
  const { colors } = useTheme();
  const [picked, setPicked] = useState<number[]>([]);
  const answered = answer !== undefined;
  const correct = answered && isAnswerCorrect(question, answer);
  const sentence = answered ? String(answer).split(' ') : picked.map((i) => question.words[i]);
  const lineColor = !answered ? colors.border : correct ? colors.correct : colors.wrong;

  return (
    <View style={{ gap: Spacing.md }}>
      <View
        style={[
          styles.buildLine,
          { borderColor: lineColor, backgroundColor: !answered ? colors.surface : correct ? colors.correctBg : colors.wrongBg },
        ]}>
        {sentence.length === 0 ? (
          <AppText variant="bn" muted>
            নিচের শব্দগুলো সঠিক ক্রমে চাপুন
          </AppText>
        ) : (
          sentence.map((w, n) => (
            <Pressable
              key={`${n}-${w}`}
              disabled={answered}
              onPress={() => setPicked(picked.filter((_, k) => k !== n))}
              accessibilityRole="button"
              accessibilityLabel={`${w} সরান`}
              style={[styles.chip, { backgroundColor: colors.surfaceMuted, borderColor: colors.border }]}>
              <AppText variant="body">{w}</AppText>
            </Pressable>
          ))
        )}
      </View>
      {!answered && (
        <View style={styles.chipWrap}>
          {mixedOrder(question).map((i) => {
            const used = picked.includes(i);
            return (
              <Pressable
                key={i}
                disabled={used}
                onPress={() => setPicked([...picked, i])}
                accessibilityRole="button"
                accessibilityLabel={question.words[i]}
                style={[styles.chip, { backgroundColor: used ? colors.surfaceMuted : colors.surface, borderColor: used ? colors.surfaceMuted : colors.primary }]}>
                <AppText variant="body" color={used ? colors.surfaceMuted : colors.text}>
                  {question.words[i]}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      )}
      {!answered && (
        <Button
          title="উত্তর যাচাই করুন"
          onPress={() => onAnswer(picked.map((i) => question.words[i]).join(' '))}
          disabled={picked.length !== question.words.length}
        />
      )}
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
    borderWidth: 1.5,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  buildLine: {
    minHeight: TouchTarget + 16,
    borderWidth: 1.5,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, justifyContent: 'center' },
  chip: { minHeight: 40, paddingHorizontal: Spacing.md, borderRadius: Radius.md, borderWidth: 1.5, justifyContent: 'center' },
  input: { minHeight: TouchTarget + 4, borderWidth: 1.5, borderRadius: Radius.md, paddingHorizontal: Spacing.lg, fontSize: 18 },
});
