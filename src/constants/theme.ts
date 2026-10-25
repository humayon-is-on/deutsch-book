import { Platform } from 'react-native';

import type { Level } from '@/content/types';

export const Colors = {
  light: {
    text: '#2A2840',
    textSecondary: '#6A6680',
    background: '#FFF8EC',
    surface: '#FFFFFF',
    surfaceMuted: '#F7EFDF',
    border: '#EDE2CC',
    // The darker bottom rim that makes cards and buttons look chunky, like stickers.
    edge: '#DCCDAE',
    primary: '#2F6FE4',
    primaryEdge: '#1D4FB3',
    primaryText: '#FFFFFF',
    correct: '#1E8A4F',
    correctBg: '#E3F4EA',
    wrong: '#B3261E',
    wrongBg: '#FBE7E5',
    warning: '#8A5A00',
    warningBg: '#FFF3D6',
    gold: '#C9971C',
    goldBg: '#FFF8E1',
  },
  dark: {
    text: '#F1F2F5',
    textSecondary: '#A9AEBB',
    background: '#111317',
    surface: '#1B1E24',
    surfaceMuted: '#252932',
    border: '#2F343E',
    edge: '#0A0C10',
    primary: '#7AA5FF',
    primaryEdge: '#4C77D6',
    primaryText: '#0B1630',
    correct: '#6FD39C',
    correctBg: '#163223',
    wrong: '#FF8A80',
    wrongBg: '#3A1A18',
    warning: '#F5C46B',
    warningBg: '#3A2D10',
    gold: '#F2C94C',
    goldBg: '#2E2610',
  },
} as const;

export type Palette = { [K in keyof typeof Colors.light]: string };

/** Each level has its own colour so the learner always knows where they are. */
export const LevelColors: Record<Level, { light: string; dark: string; bgLight: string; bgDark: string }> = {
  A1: { light: '#1E7F4F', dark: '#6FD39C', bgLight: '#E3F4EA', bgDark: '#163223' },
  A2: { light: '#1F5FD1', dark: '#7AA5FF', bgLight: '#E4ECFB', bgDark: '#17243F' },
  B1: { light: '#7A3FC2', dark: '#C39BFF', bgLight: '#F0E7FB', bgDark: '#2A1C3F' },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const Radius = { sm: 10, md: 16, lg: 22, pill: 999 } as const;

/** Minimum comfortable touch target. */
export const TouchTarget = 48;

export const MaxContentWidth = 720;

export const Fonts = {
  // System fonts on Android (Noto Sans Bengali) and iOS (Bangla Sangam MN) render Bangla well.
  sans: Platform.select({ ios: 'System', default: undefined }),
  // Round, friendly font for titles and buttons. Has both Latin and Bangla letters.
  // Loaded in the root layout; it has one weight, so text using it sets no fontWeight.
  display: 'BalooDa2_700Bold',
};
