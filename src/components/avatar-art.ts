/**
 * Avatar faces drawn as small SVG pictures (about 2 KB each, no image files).
 * Each look is a mix of face shape, skin, hair, eyes, mouth and extras, so
 * no two faces share the same build. A learner's saved avatar is its index in
 * AVATAR_LOOKS, so new faces must only ever be added at the end.
 */

type FaceShape = 'oval' | 'round' | 'long' | 'square' | 'heart';
type HairStyle =
  | 'short'
  | 'sidepart'
  | 'quiff'
  | 'buzz'
  | 'bald'
  | 'curlyShort'
  | 'afro'
  | 'long'
  | 'wavy'
  | 'bob'
  | 'bun'
  | 'manbun'
  | 'ponytail'
  | 'braids'
  | 'curlyLong'
  | 'hijab'
  | 'beanie';
type Eyes = 'almond' | 'round' | 'lash' | 'happy';
type Mouth = 'smile' | 'open' | 'lips' | 'soft';
type Neck = 'crew' | 'vneck' | 'collar' | 'turtle';

export type AvatarLook = {
  bg: [string, string];
  face: FaceShape;
  skin: keyof typeof SKIN;
  hair: HairStyle;
  hairColor: string;
  eyes: Eyes;
  mouth: Mouth;
  shirt: string;
  neck: Neck;
  /** Colour of a hijab or beanie. */
  wrap?: string;
  glasses?: 'round' | 'square' | 'tinted';
  facial?: 'beard' | 'mustache' | 'stubble' | 'goatee';
  earrings?: 'stud' | 'hoop';
  freckles?: boolean;
  /** Laugh lines and crow's feet. */
  older?: boolean;
  headband?: string;
};

/** Skin tone and its shadow colour. */
const SKIN = {
  porcelain: ['#FBE2CF', '#EBC2A6'],
  light: ['#F4CDAE', '#E0AC88'],
  warm: ['#E7B189', '#CC9068'],
  olive: ['#D6A575', '#BB895A'],
  tan: ['#C58A5E', '#A96F46'],
  brown: ['#A5683F', '#88522F'],
  deep: ['#7C4A2B', '#643920'],
  dark: ['#5C3720', '#482A17'],
} as const;

const HAIR = {
  black: '#2A211C',
  darkBrown: '#4A3021',
  brown: '#7A4B2A',
  blond: '#D9AE62',
  red: '#B2532E',
  auburn: '#8C3B24',
  grey: '#A9ADB3',
  white: '#E4E2DE',
  ink: '#34405E',
};

const FACES: Record<FaceShape, { top: number; cheek: number; jaw: number; chin: number; jawY: number; chinY: number }> = {
  oval: { top: 24, cheek: 16, jaw: 13, chin: 5, jawY: 58, chinY: 67 },
  round: { top: 25, cheek: 17.5, jaw: 15.5, chin: 7.5, jawY: 57, chinY: 65 },
  long: { top: 22.5, cheek: 15, jaw: 12.5, chin: 5, jawY: 60, chinY: 69 },
  square: { top: 24, cheek: 16.5, jaw: 16, chin: 8.5, jawY: 59.5, chinY: 66 },
  heart: { top: 24, cheek: 17, jaw: 11.5, chin: 3.5, jawY: 58, chinY: 67 },
};

export const AVATAR_LOOKS: AvatarLook[] = [
  { bg: ['#EAF2FC', '#D3E3F6'], face: 'oval', skin: 'light', hair: 'sidepart', hairColor: HAIR.brown, eyes: 'almond', mouth: 'smile', shirt: '#3E7CC9', neck: 'crew' },
  { bg: ['#FCEDF2', '#F5D5E0'], face: 'heart', skin: 'warm', hair: 'long', hairColor: HAIR.black, eyes: 'lash', mouth: 'lips', shirt: '#C2577A', neck: 'vneck', earrings: 'stud' },
  { bg: ['#E9F6EF', '#CFE9DA'], face: 'round', skin: 'tan', hair: 'curlyShort', hairColor: HAIR.black, eyes: 'round', mouth: 'open', shirt: '#4E9A6B', neck: 'crew', glasses: 'round' },
  { bg: ['#FDF1E6', '#F7DDC6'], face: 'oval', skin: 'porcelain', hair: 'bun', hairColor: HAIR.blond, eyes: 'lash', mouth: 'lips', shirt: '#E08A3C', neck: 'turtle', freckles: true },
  { bg: ['#EFECFA', '#DCD5F2'], face: 'square', skin: 'brown', hair: 'short', hairColor: HAIR.black, eyes: 'almond', mouth: 'smile', shirt: '#6E56B0', neck: 'collar', glasses: 'square', facial: 'beard' },
  { bg: ['#E6F6F7', '#CBEAEC'], face: 'long', skin: 'porcelain', hair: 'wavy', hairColor: HAIR.red, eyes: 'lash', mouth: 'soft', shirt: '#2E9AA6', neck: 'crew', freckles: true },
  { bg: ['#FAF3E3', '#F1E2C2'], face: 'square', skin: 'deep', hair: 'beanie', hairColor: HAIR.black, wrap: '#C8483E', eyes: 'round', mouth: 'open', shirt: '#D7A13A', neck: 'crew', facial: 'beard' },
  { bg: ['#FCEBEA', '#F5D2CF'], face: 'round', skin: 'warm', hair: 'quiff', hairColor: HAIR.darkBrown, eyes: 'happy', mouth: 'open', shirt: '#D0504A', neck: 'crew' },
  { bg: ['#F1F7E6', '#DDEBC7'], face: 'heart', skin: 'tan', hair: 'ponytail', hairColor: HAIR.black, eyes: 'lash', mouth: 'smile', shirt: '#7FA845', neck: 'vneck', glasses: 'square' },
  { bg: ['#EDF1F5', '#D8E0E8'], face: 'long', skin: 'light', hair: 'bald', hairColor: HAIR.grey, eyes: 'happy', mouth: 'smile', shirt: '#5B6E7E', neck: 'collar', glasses: 'round', facial: 'beard', older: true },
  { bg: ['#F5ECF8', '#E8D6EE'], face: 'round', skin: 'brown', hair: 'afro', hairColor: HAIR.darkBrown, eyes: 'lash', mouth: 'open', shirt: '#8D4FA8', neck: 'crew', earrings: 'hoop' },
  { bg: ['#E8F3FB', '#CDE5F5'], face: 'oval', skin: 'warm', hair: 'quiff', hairColor: HAIR.ink, eyes: 'almond', mouth: 'soft', shirt: '#2F8FCB', neck: 'crew', glasses: 'tinted' },
  { bg: ['#FCF3E2', '#F5E1BC'], face: 'long', skin: 'dark', hair: 'braids', hairColor: HAIR.black, eyes: 'lash', mouth: 'lips', shirt: '#D9952E', neck: 'vneck', earrings: 'hoop' },
  { bg: ['#EBEEF9', '#D5DBF1'], face: 'square', skin: 'porcelain', hair: 'short', hairColor: HAIR.blond, eyes: 'round', mouth: 'smile', shirt: '#3F51A5', neck: 'collar', facial: 'stubble' },
  { bg: ['#F4F5E4', '#E5E8C6'], face: 'oval', skin: 'olive', hair: 'bald', hairColor: HAIR.darkBrown, eyes: 'almond', mouth: 'smile', shirt: '#8F9636', neck: 'collar', glasses: 'round', facial: 'mustache' },
  { bg: ['#FDEDE7', '#F8D6CA'], face: 'round', skin: 'light', hair: 'bob', hairColor: HAIR.auburn, eyes: 'round', mouth: 'open', shirt: '#E06A4E', neck: 'crew', freckles: true },
  { bg: ['#E5F4F1', '#C9E7E1'], face: 'heart', skin: 'brown', hair: 'bun', hairColor: HAIR.darkBrown, headband: '#F2C14E', eyes: 'almond', mouth: 'lips', shirt: '#2A8C7E', neck: 'crew', earrings: 'stud' },
  { bg: ['#F7EFE9', '#EBDACD'], face: 'long', skin: 'warm', hair: 'long', hairColor: HAIR.blond, eyes: 'almond', mouth: 'soft', shirt: '#8A5A44', neck: 'turtle', glasses: 'square' },
  { bg: ['#FBEAF1', '#F2D0DF'], face: 'square', skin: 'dark', hair: 'buzz', hairColor: HAIR.black, eyes: 'round', mouth: 'smile', shirt: '#C24D7C', neck: 'crew', facial: 'goatee' },
  { bg: ['#EAF5EC', '#D0E8D5'], face: 'oval', skin: 'porcelain', hair: 'sidepart', hairColor: HAIR.red, eyes: 'happy', mouth: 'smile', shirt: '#3E8E4E', neck: 'crew', facial: 'beard' },
  { bg: ['#ECF1F8', '#D6E1EF'], face: 'oval', skin: 'tan', hair: 'hijab', hairColor: HAIR.black, wrap: '#6283AB', eyes: 'lash', mouth: 'lips', shirt: '#6283AB', neck: 'crew' },
  { bg: ['#FBEEF0', '#F1D7DC'], face: 'round', skin: 'light', hair: 'curlyShort', hairColor: HAIR.white, eyes: 'happy', mouth: 'smile', shirt: '#B5677A', neck: 'vneck', glasses: 'round', older: true, earrings: 'stud' },
  { bg: ['#EEF0F3', '#DADEE4'], face: 'long', skin: 'olive', hair: 'manbun', hairColor: HAIR.black, eyes: 'almond', mouth: 'smile', shirt: '#4A5563', neck: 'crew', facial: 'stubble' },
  { bg: ['#FCF5E0', '#F4E6B8'], face: 'heart', skin: 'deep', hair: 'curlyLong', hairColor: HAIR.black, eyes: 'lash', mouth: 'open', shirt: '#E0B43A', neck: 'vneck', earrings: 'stud' },
  { bg: ['#E9EEF6', '#D0DAEA'], face: 'square', skin: 'warm', hair: 'sidepart', hairColor: HAIR.white, eyes: 'round', mouth: 'smile', shirt: '#34507A', neck: 'collar', facial: 'mustache', older: true },
];

const f = (n: number) => Math.round(n * 10) / 10;

/** Darkens (amount < 0) or lightens a #RRGGBB colour. */
function shade(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c: number) => Math.round(amount < 0 ? c * (1 + amount) : c + (255 - c) * amount);
  const r = mix(n >> 16);
  const g = mix((n >> 8) & 255);
  const b = mix(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

/** A bumpy (curly) outline along an ellipse, from angle a0 to a1 in degrees. */
function curls(cx: number, cy: number, rx: number, ry: number, a0: number, a1: number, n: number, amp: number, start = true): string {
  const pt = (a: number, grow: number) => {
    const rad = (a * Math.PI) / 180;
    return `${f(cx + (rx + grow) * Math.cos(rad))} ${f(cy + (ry + grow) * Math.sin(rad))}`;
  };
  let d = start ? `M ${pt(a0, 0)}` : `L ${pt(a0, 0)}`;
  const step = (a1 - a0) / n;
  for (let i = 0; i < n; i++) {
    const a = a0 + step * i;
    d += ` Q ${pt(a + step / 2, amp * 2)} ${pt(a + step, 0)}`;
  }
  return d;
}

function facePath(shape: FaceShape): string {
  const { top, cheek: c, jaw: j, chin: ch, jawY, chinY } = FACES[shape];
  const cy = 45;
  return [
    `M 50 ${top}`,
    `C ${f(50 + c * 0.62)} ${top} ${50 + c} ${top + 8} ${50 + c} ${cy}`,
    `C ${50 + c} ${cy + 5} ${50 + j + 1} ${jawY - 5} ${50 + j} ${jawY}`,
    `C ${50 + j - 1} ${jawY + 4} ${50 + ch + 3} ${chinY} ${50 + ch} ${chinY}`,
    `Q 50 ${chinY + 1.2} ${50 - ch} ${chinY}`,
    `C ${50 - ch - 3} ${chinY} ${50 - j + 1} ${jawY + 4} ${50 - j} ${jawY}`,
    `C ${50 - j - 1} ${jawY - 5} ${50 - c} ${cy + 5} ${50 - c} ${cy}`,
    `C ${50 - c} ${top + 8} ${f(50 - c * 0.62)} ${top} 50 ${top} Z`,
  ].join(' ');
}

/** Hair drawn behind the head (and over the shoulders). */
function hairBack(look: AvatarLook, c: number, color: string): string {
  const L = 50 - c;
  const R = 50 + c;
  const p = (d: string, fill = color) => `<path d="${d}" fill="${fill}"/>`;
  switch (look.hair) {
    case 'long':
      return p(`M ${L - 4} 82 C ${L - 6} 60 ${L - 7} 22 50 19 C ${R + 7} 22 ${R + 6} 60 ${R + 4} 82 Q 50 86 ${L - 4} 82 Z`);
    case 'wavy':
      return p(
        `M ${L - 3} 30 C ${L - 8} 45 ${L - 2} 60 ${L - 7} 78 Q ${L - 3} 82 ${L + 1} 79 Q ${L + 4} 83 ${L + 8} 79 L ${R - 8} 79 Q ${R - 4} 83 ${R - 1} 79 Q ${R + 3} 82 ${R + 7} 78 C ${R + 2} 60 ${R + 8} 45 ${R + 3} 30 C ${R} 17 ${L} 17 ${L - 3} 30 Z`,
      );
    case 'bob':
      return p(`M ${L - 4} 62 C ${L - 6} 40 ${L - 4} 19 50 19 C ${R + 4} 19 ${R + 6} 40 ${R + 4} 62 Q ${R + 1} 65 ${R - 3} 63 L ${L + 3} 63 Q ${L - 1} 65 ${L - 4} 62 Z`);
    case 'afro':
      return p(`${curls(50, 40, 26, 24, 0, 360, 18, 1.8)} Z`);
    case 'curlyLong':
      return p(`${curls(50, 52, 25, 31, -90, 270, 20, 1.6)} Z`);
    case 'bun':
      return p(`${curls(50, 17, 7, 6.5, 0, 360, 9, 0.5)} Z`);
    case 'manbun':
      return `<circle cx="50" cy="18" r="5.5" fill="${color}"/>`;
    case 'ponytail':
      return p(`M 58 24 C 72 24 78 36 76 50 C 75 62 73 72 66 82 C 68 70 68 56 63 44 C 61 38 60 32 58 24 Z`);
    case 'braids': {
      let d = '';
      for (const side of [-1, 1]) {
        for (let y = 50; y <= 86; y += 5.2) {
          d += `<ellipse cx="${f(50 + side * (c + 1.6))}" cy="${f(y)}" rx="3.3" ry="3.2" fill="${color}"/>`;
          d += `<path d="M ${f(50 + side * (c + 1.6) - 2.4)} ${f(y + 0.6)} Q ${f(50 + side * (c + 1.6))} ${f(y + 2.6)} ${f(50 + side * (c + 1.6) + 2.4)} ${f(y + 0.6)}" stroke="${shade(color, 0.25)}" stroke-width="0.6" fill="none" opacity="0.5"/>`;
        }
      }
      return p(`M ${L - 2} 52 C ${L - 4} 30 ${L + 2} 20 50 20 C ${R - 2} 20 ${R + 4} 30 ${R + 2} 52 Z`) + d;
    }
    case 'hijab':
      return p(`M 50 14.5 C 27 14.5 23 34 25 56 C 26 70 21 82 18 100 L 82 100 C 79 82 74 70 75 56 C 77 34 73 14.5 50 14.5 Z`, look.wrap) +
        `<path d="M 30 70 C 38 79 62 79 70 70" stroke="${shade(look.wrap ?? color, -0.15)}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
    default:
      return '';
  }
}

/** Hair drawn over the top of the head. */
function hairFront(look: AvatarLook, c: number, color: string): string {
  const L = 50 - c;
  const R = 50 + c;
  const p = (d: string, fill = color, extra = '') => `<path d="${d}" fill="${fill}"${extra}/>`;
  const dark = shade(color, -0.25);
  switch (look.hair) {
    case 'short':
      return p(`M ${L - 0.5} 46 C ${L - 2} 28 40 20.5 50 20.5 C 60 20.5 ${R + 2} 28 ${R + 0.5} 46 C ${R - 1} 39 ${R - 2.5} 34 ${R - 4} 32.5 C 56 34.5 44 34.5 ${L + 4} 32.5 C ${L + 2.5} 34 ${L + 1} 39 ${L - 0.5} 46 Z`);
    case 'sidepart':
      return (
        p(`M ${L - 0.5} 46 C ${L - 2} 27 40 19.5 51 19.5 C 62 19.5 ${R + 2} 27 ${R + 0.5} 46 C ${R - 1} 38 ${R - 2.5} 33 ${R - 4.5} 31 C 56 33.5 46 33 ${L + 7} 29 C ${L + 3} 33 ${L + 1} 39 ${L - 0.5} 46 Z`) +
        `<path d="M ${L + 7} 29 C ${L + 8} 25 ${L + 10} 22.5 ${L + 12} 21.5" stroke="${dark}" stroke-width="0.9" fill="none" stroke-linecap="round"/>`
      );
    case 'quiff':
      return p(`M ${L - 0.5} 45 C ${L - 2} 30 38 18 52 15.5 C 64 14.5 ${R + 2.5} 24 ${R + 0.5} 45 C ${R - 1} 37 ${R - 3} 32 ${R - 6} 30.5 C 50 31 43 31.5 ${L + 2.5} 37 C ${L + 1} 40 ${L} 43 ${L - 0.5} 45 Z`) +
        `<path d="M 44 22 C 48 18.5 55 17.5 61 19.5" stroke="${shade(color, 0.25)}" stroke-width="1" fill="none" stroke-linecap="round" opacity="0.7"/>`;
    case 'buzz':
      return p(`M ${L + 0.3} 41 C ${L - 0.5} 29 41 23 50 23 C 59 23 ${R + 0.5} 29 ${R - 0.3} 41 C ${R - 2.5} 34 57 30.5 50 30.5 C 43 30.5 ${L + 2.5} 34 ${L + 0.3} 41 Z`, color, ' opacity="0.85"');
    case 'bald':
      return [-1, 1]
        .map((s) => p(`M ${50 + s * (c + 0.6)} 49 C ${50 + s * (c + 1)} 42 ${50 + s * (c - 0.5)} 37 ${50 + s * (c - 3.5)} 35 C ${50 + s * (c - 2.5)} 40 ${50 + s * (c - 2)} 45 ${50 + s * (c - 2.2)} 49 Z`))
        .join('');
    case 'curlyShort':
      return p(`${curls(50, 39, c + 2, 18, 172, 368, 9, 1.3)} C ${R + 0.5} 41 ${R - 1} 37 ${R - 4} 35 Q 50 31 ${L + 4} 35 C ${L + 1} 37 ${L - 0.5} 41 ${L - 1} 43 Z`);
    case 'afro':
    case 'curlyLong':
      return p(`${curls(50, 40, c + 1.5, 16, 180, 360, 8, 1.2)} C ${R} 40 ${R - 2} 35 ${R - 5} 33.5 Q 50 30.5 ${L + 5} 33.5 C ${L + 2} 35 ${L} 40 ${L - 0.5} 40 Z`);
    case 'long':
      return p(`M 50 20 C 38 20 ${L - 2.5} 30 ${L - 2} 56 L ${L + 1.5} 56 C ${L + 1.5} 40 44 30 50 26.5 C 56 30 ${R - 1.5} 40 ${R - 1.5} 56 L ${R + 2} 56 C ${R + 2.5} 30 62 20 50 20 Z`);
    case 'wavy':
      return p(`M ${L - 2} 54 C ${L - 3} 28 38 19 52 20 C 64 21 ${R + 2} 30 ${R + 1.5} 54 L ${R - 1.5} 52 C ${R - 1} 41 ${R - 4} 33 56 29.5 C 50 35 43 36.5 ${L + 2} 45 L ${L + 1.5} 54 Z`);
    case 'bob':
      return p(`M ${L - 2.5} 52 C ${L - 3} 28 40 19.5 50 19.5 C 60 19.5 ${R + 3} 28 ${R + 2.5} 52 L ${R - 0.5} 52 C ${R - 0.5} 44 ${R - 1} 40 ${R - 3} 37 Q 50 40.5 ${L + 3} 37 C ${L + 1} 40 ${L + 0.5} 44 ${L + 0.5} 52 Z`);
    case 'bun':
    case 'ponytail':
    case 'braids':
    case 'manbun': {
      const part = look.hair === 'braids' || look.hair === 'bun';
      const hair = part
        ? p(`M 50 20.5 C 38 20.5 ${L - 1.5} 30 ${L - 1} 47 C ${L + 0.5} 39 43 33 50 31 C 57 33 ${R - 0.5} 39 ${R + 1} 47 C ${R + 1.5} 30 62 20.5 50 20.5 Z`)
        : p(`M ${L - 0.5} 46 C ${L - 1.5} 28 40 20.5 52 20.5 C 63 21 ${R + 1.5} 30 ${R + 0.5} 46 C ${R - 1} 38 ${R - 3} 33 ${R - 6} 31 C 50 30 42 31.5 ${L + 2} 40 Z`);
      const band = look.headband
        ? `<path d="M ${L - 0.8} 36 C ${L + 2} 25 ${R - 2} 25 ${R + 0.8} 36" stroke="${look.headband}" stroke-width="3" fill="none" stroke-linecap="round"/>`
        : '';
      return hair + band;
    }
    case 'hijab':
      return p(`M ${L - 3.5} 62 C ${L - 5} 30 40 19.5 50 19.5 C 60 19.5 ${R + 5} 30 ${R + 3.5} 62 L ${R - 0.5} 56 C ${R + 0.5} 42 ${R - 2} 31.5 50 30.5 C ${L + 2} 31.5 ${L - 0.5} 42 ${L + 0.5} 56 Z`, look.wrap) +
        `<path d="M ${L + 2} 33 C 42 27 58 27 ${R - 2} 33" stroke="${shade(look.wrap ?? color, 0.2)}" stroke-width="1" fill="none" opacity="0.7"/>`;
    case 'beanie': {
      const w = look.wrap ?? '#888888';
      let ribs = '';
      for (let x = L + 1; x <= R - 1; x += 3) ribs += `<line x1="${f(x)}" y1="33.5" x2="${f(x)}" y2="39" stroke="${shade(w, -0.2)}" stroke-width="0.7"/>`;
      return (
        p(`M ${L - 2} 38 C ${L - 3} 22 40 16 50 16 C 60 16 ${R + 3} 22 ${R + 2} 38 Z`, w) +
        p(`M ${L - 2.5} 33 Q 50 30 ${R + 2.5} 33 L ${R + 2.5} 39 Q 50 36.5 ${L - 2.5} 39 Z`, shade(w, -0.1)) +
        ribs
      );
    }
  }
}

function facialHair(look: AvatarLook, c: number, color: string, chinY: number, jaw: number): string {
  const L = 50 - c;
  const R = 50 + c;
  const beard = `M ${L + 0.3} 48 C ${L + 0.5} 58 ${50 - jaw + 1} 65 50 ${chinY + 3} C ${50 + jaw - 1} 65 ${R - 0.5} 58 ${R - 0.3} 48 C ${R - 2.5} 53 ${R - 4} 56.5 56 57 C 53 56.2 47 56.2 44 57 C ${L + 4} 56.5 ${L + 2.5} 53 ${L + 0.3} 48 Z`;
  const mustache = `M 44 59.4 C 45.5 56.4 48.7 56.4 50 57.8 C 51.3 56.4 54.5 56.4 56 59.4 C 54 58.6 51.5 59.4 50 59.1 C 48.5 59.4 46 58.6 44 59.4 Z`;
  switch (look.facial) {
    case 'beard':
      return `<path d="${beard}" fill="${color}"/><path d="${mustache}" fill="${color}"/>`;
    case 'stubble':
      return `<path d="${beard}" fill="${color}" opacity="0.2"/><path d="${mustache}" fill="${color}" opacity="0.25"/>`;
    case 'mustache':
      return `<path d="${mustache}" fill="${color}"/>`;
    case 'goatee':
      return `<path d="M 45 62.5 C 46 ${chinY + 2.5} 54 ${chinY + 2.5} 55 62.5 C 53 63.6 47 63.6 45 62.5 Z" fill="${color}"/><path d="${mustache}" fill="${color}"/>`;
    default:
      return '';
  }
}

function eyes(look: AvatarLook, dark: string, lid: string): string {
  return [-1, 1]
    .map((s) => {
      const x = 50 + s * 7;
      const y = 46.5;
      switch (look.eyes) {
        case 'happy':
          return `<path d="M ${x - 2.6} ${y + 0.6} Q ${x} ${y - 2} ${x + 2.6} ${y + 0.6}" stroke="${dark}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
        case 'round':
          return `<ellipse cx="${x}" cy="${y}" rx="1.7" ry="2" fill="${dark}"/><circle cx="${x + 0.6}" cy="${y - 0.7}" r="0.5" fill="#FFFFFF"/>`;
        case 'lash':
        case 'almond':
          return (
            `<path d="M ${x - 3} ${y} Q ${x} ${y - 2.6} ${x + 3} ${y} Q ${x} ${y + 2.2} ${x - 3} ${y} Z" fill="#FFFFFF"/>` +
            `<circle cx="${x}" cy="${y - 0.1}" r="1.55" fill="${dark}"/><circle cx="${x + 0.5}" cy="${y - 0.7}" r="0.45" fill="#FFFFFF"/>` +
            `<path d="M ${x - 3.1} ${y} Q ${x} ${y - 2.8} ${x + 3.1} ${y}" stroke="${lid}" stroke-width="${look.eyes === 'lash' ? 1.2 : 0.8}" fill="none" stroke-linecap="round"/>` +
            (look.eyes === 'lash' ? `<path d="M ${x + s * 3} ${y - 0.2} l ${s * 1.2} -0.9" stroke="${lid}" stroke-width="0.8" stroke-linecap="round"/>` : '')
          );
      }
    })
    .join('');
}

function mouth(look: AvatarLook, lip: string, line: string): string {
  switch (look.mouth) {
    case 'smile':
      return `<path d="M 45.5 60 Q 50 63.6 54.5 60" stroke="${line}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
    case 'soft':
      return `<path d="M 46.8 60.5 Q 50 62.4 53.2 60.5" stroke="${line}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`;
    case 'open':
      return (
        `<path d="M 45 59.6 Q 50 60.6 55 59.6 Q 54 65.2 50 65.2 Q 46 65.2 45 59.6 Z" fill="#7A2E2E"/>` +
        `<path d="M 45.6 59.9 Q 50 60.9 54.4 59.9 L 54.1 61.2 Q 50 62 45.9 61.2 Z" fill="#FFFFFF"/>` +
        `<path d="M 47.3 63.9 Q 50 62.6 52.7 63.9 Q 50 65.2 47.3 63.9 Z" fill="#D86A6A"/>`
      );
    case 'lips':
      return (
        `<path d="M 45.8 60.3 Q 48 58.6 50 59.4 Q 52 58.6 54.2 60.3 Q 50 61 45.8 60.3 Z" fill="${lip}"/>` +
        `<path d="M 45.8 60.3 Q 50 61 54.2 60.3 Q 52.5 63.4 50 63.4 Q 47.5 63.4 45.8 60.3 Z" fill="${shade(lip, 0.12)}"/>`
      );
  }
}

function neckline(look: AvatarLook, skin: string): string {
  const s = look.shirt;
  switch (look.neck) {
    case 'crew':
      return `<path d="M 41.5 76 Q 50 83.5 58.5 76" stroke="${shade(s, -0.18)}" stroke-width="2.2" fill="none"/>`;
    case 'vneck':
      return `<path d="M 41.8 75.6 L 50 87 L 58.2 75.6 Z" fill="${skin}"/><path d="M 41.8 75.6 L 50 87 L 58.2 75.6" stroke="${shade(s, -0.18)}" stroke-width="1.6" fill="none"/>`;
    case 'collar':
      return (
        `<path d="M 42 75.5 L 50 84 L 58 75.5 Z" fill="${skin}"/>` +
        `<path d="M 41 74.5 L 50 84 L 44 87.5 L 38.5 78 Z" fill="#FFFFFF"/><path d="M 59 74.5 L 50 84 L 56 87.5 L 61.5 78 Z" fill="#F1F1F1"/>`
      );
    case 'turtle':
      return `<path d="M 42.5 70 Q 50 72.5 57.5 70 Q 60 74 60 79 Q 50 83 40 79 Q 40 74 42.5 70 Z" fill="${shade(s, -0.1)}"/><path d="M 41 75 Q 50 78.5 59 75" stroke="${shade(s, -0.22)}" stroke-width="0.7" fill="none"/>`;
  }
}

/** The finished SVG picture for one avatar. */
export function avatarSvg(id: number): string {
  const look = AVATAR_LOOKS[id] ?? AVATAR_LOOKS[0];
  const [skin, skinShade] = SKIN[look.skin];
  const shape = FACES[look.face];
  const c = shape.cheek;
  const deepSkin = look.skin === 'deep' || look.skin === 'dark' || look.skin === 'brown';
  const line = deepSkin ? '#3A1C10' : '#6E3B2E';
  const lip = deepSkin ? '#A0574A' : '#C9706A';
  const eyeDark = '#2B211C';
  const hair = look.hairColor;
  const covered = look.hair === 'hijab';
  const brow = look.hair === 'bald' || look.hair === 'beanie' || covered ? shade(hair, look.older ? 0 : -0.1) : shade(hair, -0.2);
  const gid = `ag${id}`;

  const parts: string[] = [];
  parts.push(
    `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${look.bg[0]}"/><stop offset="1" stop-color="${look.bg[1]}"/></linearGradient>` +
      `<clipPath id="${gid}c"><circle cx="50" cy="50" r="50"/></clipPath></defs>`,
  );
  parts.push(`<g clip-path="url(#${gid}c)"><rect width="100" height="100" fill="url(#${gid})"/><g transform="translate(50 54) scale(1.12) translate(-50 -54)">`);
  // Shoulders, then hair falling behind, then neck.
  parts.push(`<path d="M 12 102 C 12 86 25 77.5 39 75 L 61 75 C 75 77.5 88 86 88 102 Z" fill="${look.shirt}"/>`);
  parts.push(hairBack(look, c, look.hair === 'bun' || look.hair === 'manbun' ? hair : shade(hair, -0.12)));
  if (!covered) {
    parts.push(`<rect x="43.5" y="58" width="13" height="19" rx="4" fill="${skin}"/>`);
    parts.push(`<path d="M 43.5 62 Q 50 69.5 56.5 62 L 56.5 66 Q 50 71.5 43.5 66 Z" fill="${skinShade}"/>`);
  }
  parts.push(neckline(look, skin));
  // Ears and earrings, then the face.
  if (!covered) {
    for (const s of [-1, 1]) {
      parts.push(`<ellipse cx="${50 + s * c}" cy="48" rx="3.2" ry="4.8" fill="${skin}"/><ellipse cx="${50 + s * c}" cy="48" rx="1.6" ry="2.8" fill="${skinShade}"/>`);
      if (look.earrings === 'stud') parts.push(`<circle cx="${50 + s * c}" cy="52.6" r="1.2" fill="#E8C15A"/>`);
      if (look.earrings === 'hoop') parts.push(`<circle cx="${50 + s * c}" cy="55" r="2.4" stroke="#E2B547" stroke-width="0.9" fill="none"/>`);
    }
  }
  parts.push(`<path d="${facePath(look.face)}" fill="${skin}"/>`);
  // Soft shadow under the hairline and on the cheeks.
  parts.push(`<ellipse cx="${50 - 10.5}" cy="55" rx="3" ry="1.7" fill="#F08A7E" opacity="${deepSkin ? 0.18 : 0.28}"/><ellipse cx="${50 + 10.5}" cy="55" rx="3" ry="1.7" fill="#F08A7E" opacity="${deepSkin ? 0.18 : 0.28}"/>`);
  if (look.freckles) {
    for (const [x, y] of [[-10, 52], [-8, 53.6], [-11.6, 54], [10, 52], [8, 53.6], [11.6, 54]]) parts.push(`<circle cx="${50 + x}" cy="${y}" r="0.45" fill="${skinShade}"/>`);
  }
  if (look.older) {
    for (const s of [-1, 1]) {
      parts.push(`<path d="M ${50 + s * 11.2} 45 l ${s * 1.6} -0.8 M ${50 + s * 11.4} 47 l ${s * 1.7} 0.4" stroke="${skinShade}" stroke-width="0.6" stroke-linecap="round"/>`);
      parts.push(`<path d="M ${50 + s * 6.5} 55.5 Q ${50 + s * 8} 58.5 ${50 + s * 6.8} 61.5" stroke="${skinShade}" stroke-width="0.7" fill="none" stroke-linecap="round"/>`);
    }
  }
  parts.push(facialHair(look, c, shade(hair, look.older ? 0 : -0.05), shape.chinY, shape.jaw));
  // Nose.
  parts.push(`<path d="M 50.6 49 Q 48.6 53.6 49.4 55 Q 50.5 56 52.2 55.2" stroke="${skinShade}" stroke-width="1.1" fill="none" stroke-linecap="round"/>`);
  parts.push(eyes(look, eyeDark, line));
  // Brows.
  const browW = look.facial === 'beard' || look.face === 'square' ? 1.7 : 1.2;
  for (const s of [-1, 1]) {
    const arch = look.eyes === 'lash' ? -1.6 : -1;
    parts.push(`<path d="M ${50 + s * 4} 41.6 Q ${50 + s * 7} ${41.6 + arch - 0.4} ${50 + s * 10.2} 41.8" stroke="${brow}" stroke-width="${browW}" fill="none" stroke-linecap="round"/>`);
  }
  parts.push(mouth(look, lip, line));
  parts.push(hairFront(look, c, hair));
  if (look.glasses) {
    const frame = look.glasses === 'tinted' ? '#2E2E3A' : look.older ? '#8A6A4A' : '#2E2E3A';
    const lens = look.glasses === 'tinted' ? 'fill="#3A4660" fill-opacity="0.55"' : 'fill="#FFFFFF" fill-opacity="0.18"';
    for (const s of [-1, 1]) {
      const x = 50 + s * 7;
      parts.push(
        look.glasses === 'round'
          ? `<circle cx="${x}" cy="46.5" r="4.4" ${lens} stroke="${frame}" stroke-width="1"/>`
          : `<rect x="${x - 4.8}" y="43" width="9.6" height="7" rx="2" ${lens} stroke="${frame}" stroke-width="1"/>`,
      );
      parts.push(`<path d="M ${50 + s * 11.4} 46 L ${50 + s * c} 45.4" stroke="${frame}" stroke-width="0.9"/>`);
    }
    parts.push(`<path d="M 47.4 46 Q 50 44.6 52.6 46" stroke="${frame}" stroke-width="0.9" fill="none"/>`);
  }
  parts.push('</g></g>');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${parts.join('')}</svg>`;
}
