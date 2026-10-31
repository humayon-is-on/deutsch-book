import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps, ReactNode, Ref } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextProps,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { MaxContentWidth, Radius, Spacing, TouchTarget } from '@/constants/theme';
import type { Level } from '@/content/types';
import { useLevelColor, useTheme } from '@/hooks/use-theme';

export type IconName = ComponentProps<typeof Ionicons>['name'];

export function Icon({ name, size = 22, color }: { name: string; size?: number; color?: string }) {
  const { colors } = useTheme();
  return <Ionicons name={name as IconName} size={size} color={color ?? colors.text} />;
}

type TextVariant = 'title' | 'heading' | 'subheading' | 'body' | 'bn' | 'de' | 'caption' | 'label';

export function AppText({
  variant = 'body',
  muted,
  color,
  style,
  ...rest
}: TextProps & { variant?: TextVariant; muted?: boolean; color?: string }) {
  const { colors } = useTheme();
  return (
    <Text
      style={[{ color: color ?? (muted ? colors.textSecondary : colors.text) }, textStyles[variant], style]}
      {...rest}
    />
  );
}

const textStyles = StyleSheet.create({
  title: { fontSize: 28, lineHeight: 36, fontWeight: '700' },
  heading: { fontSize: 20, lineHeight: 30, fontWeight: '700' },
  subheading: { fontSize: 17, lineHeight: 26, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 25 },
  // Bangla script needs extra line height for vowel signs above and below.
  bn: { fontSize: 16, lineHeight: 28 },
  de: { fontSize: 18, lineHeight: 27, fontWeight: '600' },
  caption: { fontSize: 13, lineHeight: 20 },
  label: { fontSize: 13, lineHeight: 18, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase' },
});

export function Screen({
  children,
  scroll = true,
  edges = ['top'],
  contentStyle,
  scrollRef,
  onViewport,
}: {
  children: ReactNode;
  scroll?: boolean;
  edges?: Edge[];
  contentStyle?: StyleProp<ViewStyle>;
  /** The screen's ScrollView, for screens that scroll themselves. */
  scrollRef?: Ref<ScrollView>;
  /** Called with the visible height once it is known. */
  onViewport?: (height: number) => void;
}) {
  const { colors } = useTheme();
  const inner = <View style={[styles.content, contentStyle]}>{children}</View>;
  return (
    <SafeAreaView edges={edges} style={{ flex: 1, backgroundColor: colors.background }}>
      {scroll ? (
        <ScrollView
          ref={scrollRef}
          onLayout={onViewport && ((e) => onViewport(e.nativeEvent.layout.height))}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled">
          {inner}
        </ScrollView>
      ) : (
        inner
      )}
    </SafeAreaView>
  );
}

export function Card({
  children,
  onPress,
  style,
  accessibilityLabel,
}: {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}) {
  const { colors } = useTheme();
  const base = [styles.card, { backgroundColor: colors.surface, borderColor: colors.border }, style];
  if (!onPress) return <View style={base}>{children}</View>;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [base, pressed && { opacity: 0.75 }]}>
      {children}
    </Pressable>
  );
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  icon,
  disabled,
  loading,
  style,
  singleLine,
  large,
  leading,
}: {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  /** Keep the title on one line, cut with … when it is too long. */
  singleLine?: boolean;
  /** A bigger button with heavier text, for a screen's main choices. */
  large?: boolean;
  /** Shown before the title in place of `icon`, e.g. a brand logo. */
  leading?: ReactNode;
}) {
  const { colors } = useTheme();
  const bg =
    variant === 'primary' ? colors.primary : variant === 'secondary' ? colors.surfaceMuted : 'transparent';
  const fg =
    variant === 'primary' ? colors.primaryText : variant === 'danger' ? colors.wrong : colors.text;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: bg, opacity: disabled ? 0.45 : pressed ? 0.8 : 1 },
        variant === 'danger' && { borderWidth: 1, borderColor: colors.wrong },
        large && styles.buttonLarge,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <>
          {leading ?? (icon && <Icon name={icon} size={large ? 24 : 20} color={fg} />)}
          <Text
            style={[styles.buttonText, { color: fg }, large && styles.buttonTextLarge, singleLine && styles.buttonTextSingle]}
            numberOfLines={singleLine ? 1 : undefined}
            ellipsizeMode="tail">
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
}

/** A thick progress bar with the count (like 3/20) beside it on one line. */
export function CountBar({ value, count, color }: { value: number; count: string; color?: string }) {
  return (
    <Row style={{ gap: Spacing.md }}>
      <View style={{ flex: 1 }}>
        <ProgressBar value={value} color={color} height={14} />
      </View>
      <AppText variant="subheading" muted>
        {count}
      </AppText>
    </Row>
  );
}

export function ProgressBar({ value, color, height = 8 }: { value: number; color?: string; height?: number }) {
  const { colors } = useTheme();
  const pct = Math.max(0, Math.min(1, value));
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(pct * 100) }}
      style={{ height, borderRadius: height, backgroundColor: colors.surfaceMuted, overflow: 'hidden' }}>
      <View style={{ width: `${pct * 100}%`, height: '100%', backgroundColor: color ?? colors.primary }} />
    </View>
  );
}

/** Screen options that put the level badge in the header, opposite the back button. */
export const levelHeader = (level: Level) => ({
  headerRight: () => (
    <View style={{ justifyContent: 'center', paddingRight: Spacing.lg }}>
      <LevelBadge level={level} />
    </View>
  ),
});

export function LevelBadge({ level, size = 'md' }: { level: Level; size?: 'sm' | 'md' }) {
  const { fg, bg } = useLevelColor(level);
  return (
    <View style={[styles.badge, { backgroundColor: bg }, size === 'sm' && { paddingHorizontal: 8, paddingVertical: 2 }]}>
      <Text style={{ color: fg, fontWeight: '800', fontSize: size === 'sm' ? 12 : 14 }}>{level}</Text>
    </View>
  );
}

export function Row({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }, style]}>{children}</View>;
}

export function Section({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <View style={{ gap: Spacing.sm }}>
      <Row style={{ justifyContent: 'space-between' }}>
        <AppText variant="subheading">{title}</AppText>
        {action}
      </Row>
      {children}
    </View>
  );
}

export function ListItem({
  icon,
  title,
  subtitle,
  right,
  onPress,
  iconColor,
}: {
  icon?: string;
  title: string;
  subtitle?: string;
  right?: ReactNode;
  onPress?: () => void;
  iconColor?: string;
}) {
  const { colors } = useTheme();
  return (
    <Card onPress={onPress} accessibilityLabel={title}>
      <Row style={{ gap: Spacing.md }}>
        {icon && <Icon name={icon} color={iconColor ?? colors.primary} />}
        <View style={{ flex: 1 }}>
          <AppText variant="subheading">{title}</AppText>
          {subtitle ? (
            <AppText variant="caption" muted>
              {subtitle}
            </AppText>
          ) : null}
        </View>
        {right ?? (onPress ? <Icon name="chevron-forward" size={18} color={colors.textSecondary} /> : null)}
      </Row>
    </Card>
  );
}

export function Notice({ tone = 'info', children }: { tone?: 'info' | 'warning'; children: ReactNode }) {
  const { colors } = useTheme();
  const bg = tone === 'warning' ? colors.warningBg : colors.surfaceMuted;
  const fg = tone === 'warning' ? colors.warning : colors.textSecondary;
  return (
    <View style={[styles.notice, { backgroundColor: bg }]}>
      <Icon name={tone === 'warning' ? 'alert-circle-outline' : 'information-circle-outline'} size={20} color={fg} />
      <AppText variant="caption" color={fg} style={{ flex: 1 }}>
        {children}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, paddingBottom: Spacing.xxl },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    padding: Spacing.lg,
    gap: Spacing.lg,
    flexGrow: 1,
  },
  card: { borderRadius: Radius.lg, borderWidth: StyleSheet.hairlineWidth, padding: Spacing.lg, gap: Spacing.sm },
  button: {
    minHeight: TouchTarget,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  // Long titles wrap onto more lines and the button grows, instead of running out of it.
  buttonText: { fontSize: 16, fontWeight: '700', flexShrink: 1, textAlign: 'center' },
  buttonLarge: { minHeight: 58, borderRadius: Radius.lg },
  buttonTextLarge: { fontSize: 19, fontWeight: '800' },
  // Android only cuts the line when the text can't take more than the row's width.
  buttonTextSingle: { minWidth: 0, maxWidth: '100%' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: Radius.pill, alignSelf: 'flex-start' },
  notice: { flexDirection: 'row', gap: Spacing.sm, padding: Spacing.md, borderRadius: Radius.md, alignItems: 'flex-start' },
});

/**
 * The dimmed backdrop behind a popup. The popup sits in the middle, and
 * scrolls when it is taller than the screen (small or landscape phones).
 */
export function PopupBackdrop({
  children,
  padding = Spacing.lg,
  dim = 0.55,
}: {
  children: ReactNode;
  padding?: number;
  dim?: number;
}) {
  return (
    <View style={{ flex: 1, backgroundColor: `rgba(0,0,0,${dim})` }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
}
