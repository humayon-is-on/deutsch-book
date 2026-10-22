import { Platform } from 'react-native';

import type { Level } from '@/content/types';

export const Colors = {
  light: {
    text: '#1A1C22',
    textSecondary: '#5B6170',
    background: '#F7F7F4',
    surface: '#FFFFFF',
    surfaceMuted: '#EFEFEA',
    border: '#E2E2DC',
    primary: '#1F5FD1',
    primaryText: '#FFFFFF',
    correct: '#1E7F4F',
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
    primary: '#7AA5FF',
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

export const Radius = { sm: 8, md: 12, lg: 16, pill: 999 } as const;

/** Minimum comfortable touch target. */
export const TouchTarget = 48;

export const MaxContentWidth = 720;

export const Fonts = {
  // System fonts on Android (Noto Sans Bengali) and iOS (Bangla Sangam MN) render Bangla well.
  sans: Platform.select({ ios: 'System', default: undefined }),
};
