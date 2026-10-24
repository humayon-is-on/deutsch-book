import { router, type Href } from 'expo-router';
import { useState } from 'react';
import { Pressable, View, type LayoutChangeEvent } from 'react-native';

import { AppText, Icon, Row } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import type { PracticeCard } from '@/content/topics';
import type { Level, PracticeKind } from '@/content/types';
import { useTheme } from '@/hooks/use-theme';

export const PRACTICE_KIND: Record<PracticeKind, { bn: string; icon: string }> = {
  build: { bn: 'বাক্য গঠন', icon: 'shuffle-outline' },
  mcq: { bn: 'MCQ', icon: 'list-outline' },
  fill: { bn: 'শূন্যস্থান', icon: 'create-outline' },
  exam: { bn: 'লেভেল টেস্ট', icon: 'speedometer-outline' },
};

const CARD = 92;
/** Vertical distance between card centres. */
const STEP = 150;
/** How far cards swing left and right of the middle. */
const SWING = 70;
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

export type LadderCard = PracticeCard & { open: boolean; stars: number };

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
          return (
            <View key={card.id}>
              <Pressable
                disabled={!card.open}
                onPress={() => router.push(card.href as Href)}
                accessibilityRole="button"
                accessibilityState={{ disabled: !card.open }}
                accessibilityLabel={`${i + 1}. ${kind.bn}${card.open ? `, ${card.stars}টি তারা` : ', বন্ধ'}`}
                style={({ pressed }) => ({
                  position: 'absolute',
                  left: c.x - CARD / 2,
                  top: c.y - CARD / 2,
                  width: CARD,
                  height: CARD,
                  borderRadius: 24,
                  backgroundColor: bg,
                  borderWidth: isCurrent ? 4 : 2,
                  borderColor: !card.open ? colors.border : isCurrent ? colors.gold : colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  opacity: pressed ? 0.8 : 1,
                  shadowColor: isCurrent ? colors.gold : '#000',
                  shadowOpacity: card.open ? 0.25 : 0,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 3 },
                  elevation: card.open ? 4 : 0,
                })}>
                <Icon name={card.open ? kind.icon : 'lock-closed'} size={30} color={fg} />
                {card.kind !== 'exam' && (
                  <AppText variant="caption" color={fg} style={{ fontWeight: '700' }}>
                    {i + 1}
                  </AppText>
                )}
              </Pressable>
              {/* The card's name and stars, on whichever side of it has more room. */}
              <View
                style={{
                  position: 'absolute',
                  top: c.y - 22,
                  ...(c.x <= width / 2
                    ? { left: c.x + CARD / 2 + LABEL_GAP, right: 0, alignItems: 'flex-start' }
                    : { left: 0, width: c.x - CARD / 2 - LABEL_GAP, alignItems: 'flex-end' }),
                  gap: 2,
                }}>
                <AppText variant="caption" numberOfLines={1} color={card.open ? colors.text : colors.textSecondary} style={{ fontWeight: '700' }}>
                  {kind.bn}
                </AppText>
                {card.open && card.stars > 0 && <Stars count={card.stars} size={16} />}
              </View>
            </View>
          );
        })}
    </View>
  );
}

/** The next level, locked, joined to the last card by a faded line. */
function NextLevel({ level, from, top, width }: { level: Level; from: { x: number; y: number }; top: number; width: number }) {
  const { colors } = useTheme();
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
        accessibilityLabel={`${level} লেভেল, বন্ধ। লেভেল টেস্ট পাশ করলে খুলবে।`}
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
            {level} লেভেল
          </AppText>
          <AppText variant="caption" muted>
            লেভেল টেস্ট পাশ করলে খুলবে
          </AppText>
        </View>
      </View>
    </>
  );
}

export function Stars({ count, size = 20 }: { count: number; size?: number }) {
  const { colors } = useTheme();
  return (
    <Row style={{ gap: 2 }}>
      {[1, 2, 3].map((n) => (
        <Icon key={n} name={n <= count ? 'star' : 'star-outline'} size={size} color={n <= count ? colors.gold : colors.textSecondary} />
      ))}
    </Row>
  );
}
