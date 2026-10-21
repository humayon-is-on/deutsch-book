import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AppText, Button, Card, Icon, Row } from '@/components/ui';
import { Radius, Spacing, TouchTarget } from '@/constants/theme';
import {
  correctAnswerText,
  isAnswerCorrect,
  LEVELS,
  type Answer,
  type Example,
  type Level,
  type Question,
  type Translated,
} from '@/content';
import { useLevelColor, useTheme } from '@/hooks/use-theme';
import { useProgress } from '@/state/progress';

/** Segmented control that keeps A1, A2 and B1 visually distinct. */
export function LevelSwitcher({ value, onChange }: { value: Level; onChange: (l: Level) => void }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.segment, { backgroundColor: colors.surfaceMuted }]} accessibilityRole="tablist">
      {LEVELS.map((l) => (
        <LevelTab key={l} level={l} selected={l === value} onPress={() => onChange(l)} />
      ))}
    </View>
  );
}

function LevelTab({ level, selected, onPress }: { level: Level; selected: boolean; onPress: () => void }) {
  const { fg } = useLevelColor(level);
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected }}
      style={[styles.segmentItem, selected && { backgroundColor: colors.surface, borderColor: fg, borderWidth: 2 }]}>
      <AppText variant="subheading" color={selected ? fg : colors.textSecondary}>
        {level}
      </AppText>
    </Pressable>
  );
}

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
  segment: { flexDirection: 'row', padding: 4, borderRadius: Radius.md, gap: 4 },
  segmentItem: {
    flex: 1,
    minHeight: TouchTarget - 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
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
  input: { minHeight: TouchTarget + 4, borderWidth: 1.5, borderRadius: Radius.md, paddingHorizontal: Spacing.lg, fontSize: 18 },
});
