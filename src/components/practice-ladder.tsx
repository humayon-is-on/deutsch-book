import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router, type Href } from 'expo-router';
import { useState } from 'react';
import { Pressable, View, type LayoutChangeEvent } from 'react-native';

import { AppText, Icon, Row } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { reachLines, type PracticeCard } from '@/content/topics';
import type { Level, PracticeKind } from '@/content/types';
import { useTheme } from '@/hooks/use-theme';
import { useT } from '@/i18n';

export const PRACTICE_KIND: Record<PracticeKind, { bn: string; en: string; icon: string }> = {
  build: { bn: 'বাক্য গঠন', en: 'Sentence building', icon: 'shuffle-outline' },
  mcq: { bn: 'বহুনির্বাচনি', en: 'Multiple choice', icon: 'list-outline' },
  fill: { bn: 'শূন্যস্থান', en: 'Fill in the blanks', icon: 'create-outline' },
  exam: { bn: 'লেভেল টেস্ট', en: 'Level test', icon: 'speedometer-outline' },
};

const CARD = 92;
/** Vertical distance between card centres. */
const STEP = 150;
/** How far cards swing left and right of the middle. */
const SWING = 70;
/** Height of the solid ledge under each card that makes it look like a raised button. */
const DEPTH = 6;
/** Space between a card and its name. */
const LABEL_GAP = 12;
/** The locked header of the next level, below the last card. */
const NEXT_GAP = 70;
const NEXT_HEIGHT = 72;

/** A card's centre: down the screen, a little off the middle in a gentle wave. */
const centre = (i: number, width: number) => ({
  x: width / 2 + Math.sin(i * 1.4) * Math.min(SWING, width / 2 - CARD),
  y: CARD / 2 + Spacing.md + i * STEP,
});

export type LadderCard = PracticeCard & {
  open: boolean;
  stars: number;
  /** Whether the Learn topics the card needs are all finished. */
  learned?: boolean;
  /** Whether the card has been practised and has a result; its topic label is then hidden. */
  practised?: boolean;
  /** For a locked card that explains itself when tapped (the level test waiting for Learn progress). */
  onLockedPress?: () => void;
};

/**
 * The practice ladder: rounded square cards placed slightly off line, joined
 * by a line that is coloured up to the newest open card and faded after it.
 * With `nextLevel`, a locked header for that level waits below the last card.
 * Reports where the newest open card sits so the screen can centre it.
 */
export function PracticeLadder({
  cards,
  nextLevel,
  onCurrentLayout,
}: {
  cards: LadderCard[];
  nextLevel?: Level | null;
  onCurrentLayout: (y: number) => void;
}) {
  const { colors } = useTheme();
  const t = useT();
  const [width, setWidth] = useState(0);
  const current = Math.max(0, cards.findLastIndex((c) => c.open));
  const last = cards.length ? centre(cards.length - 1, width) : null;
  const nextTop = last ? last.y + CARD / 2 + NEXT_GAP : 0;
  const height = !last ? 0 : nextLevel ? nextTop + NEXT_HEIGHT + 24 : last.y + CARD / 2 + 40;

  const measure = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    setWidth(w);
    onCurrentLayout(e.nativeEvent.layout.y + centre(current, w).y);
  };

  return (
    <View onLayout={measure} style={{ height }}>
      {width > 0 &&
        cards.slice(1).map((card, n) => {
          const a = centre(n, width);
          const b = centre(n + 1, width);
          const length = Math.hypot(b.x - a.x, b.y - a.y);
          const angle = Math.atan2(b.y - a.y, b.x - a.x);
          return (
            <View
              key={`line-${card.id}`}
              style={{
                position: 'absolute',
                left: (a.x + b.x) / 2 - length / 2,
                top: (a.y + b.y) / 2 - 3,
                width: length,
                height: 6,
                borderRadius: 3,
                backgroundColor: card.open ? colors.primary : colors.border,
                opacity: card.open ? 1 : 0.6,
                transform: [{ rotate: `${angle}rad` }],
              }}
            />
          );
        })}
      {width > 0 && last && nextLevel && (
        <NextLevel level={nextLevel} from={last} top={nextTop} width={width} />
      )}
      {width > 0 &&
        cards.map((card, i) => {
          const c = centre(i, width);
          const kind = PRACTICE_KIND[card.kind];
          const isCurrent = i === current && card.stars === 0;
          const bg = !card.open ? colors.surfaceMuted : card.stars ? colors.surface : colors.primary;
          const fg = !card.open ? colors.textSecondary : card.stars ? colors.primary : colors.primaryText;
          const edge = !card.open ? colors.border : isCurrent ? colors.gold : colors.primary;
          // The ledge is a darker copy of the card's edge, peeking out below it.
          const ledge = !card.open ? colors.border : isCurrent ? '#B8650A' : card.stars ? colors.primary : '#123E8C';
          // Stars and the topics to finish first sit on whichever side of the card has more room.
          const side =
            c.x <= width / 2
              ? ({ left: c.x + CARD / 2 + LABEL_GAP, right: 0, alignItems: 'flex-start' } as const)
              : ({ left: 0, width: c.x - CARD / 2 - LABEL_GAP, alignItems: 'flex-end' } as const);
          const starred = card.open && card.stars > 0;
          return (
            <View key={card.id}>
              <View
                style={{
                  position: 'absolute',
                  left: c.x - CARD / 2,
                  top: c.y - CARD / 2 + DEPTH,
                  width: CARD,
                  height: CARD,
                  borderRadius: 26,
                  backgroundColor: ledge,
                  opacity: card.open ? 1 : 0.7,
                }}
              />
              <Pressable
                disabled={!card.open && !card.onLockedPress}
                onPress={card.open ? () => router.push(card.href as Href) : card.onLockedPress}
                accessibilityRole="button"
                accessibilityState={{ disabled: !card.open }}
                accessibilityLabel={`${i + 1}. ${t(kind.bn, kind.en)}${card.open ? t(`, ${card.stars}টি তারা`, `, ${card.stars} stars`) : t(', বন্ধ', ', locked')}`}
                style={({ pressed }) => ({
                  position: 'absolute',
                  left: c.x - CARD / 2,
                  top: c.y - CARD / 2,
                  width: CARD,
                  height: CARD,
                  borderRadius: 26,
                  backgroundColor: bg,
                  borderWidth: isCurrent ? 4 : 3,
                  borderColor: edge,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  overflow: 'hidden',
                  // Pressing pushes the card down onto its ledge.
                  transform: [{ translateY: pressed ? DEPTH - 1 : 0 }],
                })}>
                {/* A soft shine in the top corner. */}
                {card.open && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 7,
                      left: 10,
                      width: 26,
                      height: 9,
                      borderRadius: 9,
                      backgroundColor: card.stars ? colors.primary : '#FFFFFF',
                      opacity: card.stars ? 0.12 : 0.3,
                      transform: [{ rotate: '-20deg' }],
                    }}
                  />
                )}
                <Icon name={card.open ? kind.icon : 'lock-closed'} size={26} color={fg} />
                <AppText
                  variant="caption"
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  color={fg}
                  style={{ fontWeight: '700', fontSize: 12, lineHeight: 15, paddingHorizontal: 4, textAlign: 'center' }}>
                  {t(kind.bn, kind.en)}
                </AppText>
                {card.kind !== 'exam' && (
                  <AppText variant="caption" color={fg} style={{ fontWeight: '700', fontSize: 11, lineHeight: 14, opacity: 0.8 }}>
                    {i + 1}
                  </AppText>
                )}
              </Pressable>
              {starred && (
                <View style={{ position: 'absolute', top: c.y - 34, ...side }}>
                  <Stars count={card.stars} size={30} />
                </View>
              )}
              {/* The Learn topics to finish first, ticked once they are done, until the card has a result. */}
              {card.requires && !card.practised && (
                <View style={{ position: 'absolute', top: starred ? c.y + 8 : c.y - 16, ...side }}>
                  {reachLines(card.requires).map((line, n) => (
                    <Row key={line} style={{ gap: 4 }}>
                      {n === 0 && card.learned && <Icon name="checkmark-circle" size={14} color={colors.correct} />}
                      <AppText variant="caption" muted style={{ fontSize: 11, lineHeight: 15 }}>
                        {line}
                      </AppText>
                    </Row>
                  ))}
                </View>
              )}
            </View>
          );
        })}
    </View>
  );
}

/** The next level, locked, joined to the last card by a faded line. */
function NextLevel({ level, from, top, width }: { level: Level; from: { x: number; y: number }; top: number; width: number }) {
  const { colors } = useTheme();
  const t = useT();
  const box = Math.min(300, width - Spacing.md * 2);
  const to = { x: width / 2, y: top + NEXT_HEIGHT / 2 };
  const length = Math.hypot(to.x - from.x, to.y - from.y);
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  return (
    <>
      <View
        style={{
          position: 'absolute',
          left: (from.x + to.x) / 2 - length / 2,
          top: (from.y + to.y) / 2 - 3,
          width: length,
          height: 6,
          borderRadius: 3,
          backgroundColor: colors.border,
          opacity: 0.6,
          transform: [{ rotate: `${angle}rad` }],
        }}
      />
      <View
        accessibilityLabel={t(`${level} লেভেল, বন্ধ। লেভেল টেস্ট পাশ করলে খুলবে।`, `Level ${level}, locked. Opens when you pass the level test.`)}
        style={{
          position: 'absolute',
          left: (width - box) / 2,
          top,
          width: box,
          height: NEXT_HEIGHT,
          borderRadius: 24,
          borderWidth: 2,
          borderColor: colors.border,
          backgroundColor: colors.surfaceMuted,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: Spacing.md,
        }}>
        <Icon name="lock-closed" size={28} color={colors.textSecondary} />
        <View>
          <AppText variant="heading" color={colors.textSecondary}>
            {t(`${level} লেভেল`, `Level ${level}`)}
          </AppText>
          <AppText variant="caption" muted>
            {t('লেভেল টেস্ট পাশ করলে খুলবে', 'Opens when you pass the level test')}
          </AppText>
        </View>
      </View>
    </>
  );
}

/** Stars in a small arch, the middle one raised and a little bigger. */
export function Stars({ count, size = 20 }: { count: number; size?: number }) {
  return (
    <Row style={{ gap: 0, alignItems: 'flex-end' }}>
      {[1, 2, 3].map((n) => (
        <View key={n} style={{ transform: [{ translateY: n === 2 ? -size * 0.25 : 0 }, { rotate: `${(n - 2) * 12}deg` }] }}>
          <CartoonStar earned={n <= count} size={n === 2 ? size * 1.15 : size} />
        </View>
      ))}
    </Row>
  );
}

/** A chunky, soft-cornered star: a dark rim, a bright fill and a small shine. */
function CartoonStar({ earned, size }: { earned: boolean; size: number }) {
  const { colors } = useTheme();
  const rim = earned ? '#B8650A' : colors.border;
  const fill = earned ? '#FFC93C' : colors.surfaceMuted;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Font Awesome's star has rounded points, softer than the icon set's. */}
      <View style={{ position: 'absolute' }}>
        <FontAwesome6 name="star" solid size={size * 0.92} color={rim} />
      </View>
      <View style={{ position: 'absolute' }}>
        <FontAwesome6 name="star" solid size={size * 0.62} color={fill} />
      </View>
      {earned && (
        <View
          style={{
            position: 'absolute',
            top: size * 0.3,
            left: size * 0.38,
            width: size * 0.1,
            height: size * 0.16,
            borderRadius: size,
            backgroundColor: '#FFF6D6',
            transform: [{ rotate: '25deg' }],
          }}
        />
      )}
    </View>
  );
}
