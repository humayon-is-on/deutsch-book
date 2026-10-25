import { Platform } from 'react-native';

/**
 * A hidden testing aid for the web build, so the owner can try the end of the
 * practice ladder without playing every card. Opening the site with
 * `?test=ladder` treats every practice card as starred; `?test=ladder60` also
 * counts the Learn modules as 60% done. Nothing is saved to progress, and the
 * mode lasts only until the browser tab is closed. Phones never use it.
 */
export type LadderTest = 'off' | 'ladder' | 'ladder60';

const KEY = 'deutschbook.test';

function read(): LadderTest {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return 'off';
  try {
    const asked = new URLSearchParams(window.location.search).get('test');
    if (asked === 'ladder' || asked === 'ladder60') window.sessionStorage.setItem(KEY, asked);
    if (asked === 'off') window.sessionStorage.removeItem(KEY);
    const saved = window.sessionStorage.getItem(KEY);
    return saved === 'ladder' || saved === 'ladder60' ? saved : 'off';
  } catch {
    return 'off';
  }
}

export const ladderTest: LadderTest = read();
