import { useColorScheme } from 'react-native';

import { Colors, LevelColors } from '@/constants/theme';
import type { Level } from '@/content/types';

export function useTheme() {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  return { colors: Colors[scheme], scheme } as const;
}

export function useLevelColor(level: Level) {
  const { scheme } = useTheme();
  const c = LevelColors[level];
  return scheme === 'dark' ? { fg: c.dark, bg: c.bgDark } : { fg: c.light, bg: c.bgLight };
}
