import { View, type ViewStyle } from 'react-native';

/**
 * Round character avatars drawn from plain shapes, so they need no image
 * files and look the same everywhere. Learners pick one by its id; the id is
 * what's saved, so new avatars can be added at the end without moving others.
 */

type Hair = 'short' | 'long' | 'bun' | 'curly' | 'spiky' | 'none';

type AvatarLook = {
  bg: string;
  skin: string;
  hair: Hair;
  hairColor: string;
  shirt: string;
  glasses?: boolean;
};

const SKIN = ['#F9D7B5', '#EDB98A', '#D08B5B', '#AE5D29', '#8D4A1F', '#FFE0C7'];
const HAIR = { black: '#2B2118', brown: '#6B3E1F', blond: '#E2B65A', red: '#B5482A', grey: '#9AA0A6', blue: '#3D5AFE' };

export const AVATARS: AvatarLook[] = [
  { bg: '#BBDEFB', skin: SKIN[0], hair: 'short', hairColor: HAIR.brown, shirt: '#1E88E5' },
  { bg: '#F8BBD0', skin: SKIN[1], hair: 'long', hairColor: HAIR.black, shirt: '#D81B60' },
  { bg: '#C8E6C9', skin: SKIN[2], hair: 'curly', hairColor: HAIR.black, shirt: '#43A047' },
  { bg: '#FFE0B2', skin: SKIN[0], hair: 'bun', hairColor: HAIR.blond, shirt: '#FB8C00' },
  { bg: '#D1C4E9', skin: SKIN[3], hair: 'short', hairColor: HAIR.black, shirt: '#5E35B1', glasses: true },
  { bg: '#B2EBF2', skin: SKIN[5], hair: 'long', hairColor: HAIR.red, shirt: '#00ACC1' },
  { bg: '#FFF9C4', skin: SKIN[4], hair: 'none', hairColor: HAIR.black, shirt: '#F9A825' },
  { bg: '#FFCDD2', skin: SKIN[1], hair: 'spiky', hairColor: HAIR.brown, shirt: '#E53935' },
  { bg: '#DCEDC8', skin: SKIN[2], hair: 'bun', hairColor: HAIR.black, shirt: '#7CB342', glasses: true },
  { bg: '#CFD8DC', skin: SKIN[0], hair: 'short', hairColor: HAIR.grey, shirt: '#546E7A', glasses: true },
  { bg: '#E1BEE7', skin: SKIN[3], hair: 'curly', hairColor: HAIR.brown, shirt: '#8E24AA' },
  { bg: '#B3E5FC', skin: SKIN[1], hair: 'spiky', hairColor: HAIR.blue, shirt: '#039BE5' },
  { bg: '#FFECB3', skin: SKIN[4], hair: 'long', hairColor: HAIR.black, shirt: '#FFB300' },
  { bg: '#C5CAE9', skin: SKIN[5], hair: 'short', hairColor: HAIR.blond, shirt: '#3949AB' },
  { bg: '#F0F4C3', skin: SKIN[2], hair: 'none', hairColor: HAIR.black, shirt: '#C0CA33', glasses: true },
  { bg: '#FFCCBC', skin: SKIN[0], hair: 'curly', hairColor: HAIR.red, shirt: '#F4511E' },
  { bg: '#B2DFDB', skin: SKIN[3], hair: 'bun', hairColor: HAIR.brown, shirt: '#00897B' },
  { bg: '#D7CCC8', skin: SKIN[1], hair: 'long', hairColor: HAIR.blond, shirt: '#6D4C41', glasses: true },
  { bg: '#F8BBD0', skin: SKIN[4], hair: 'spiky', hairColor: HAIR.black, shirt: '#C2185B' },
  { bg: '#C8E6C9', skin: SKIN[5], hair: 'short', hairColor: HAIR.red, shirt: '#2E7D32' },
];

/** Shown until the learner picks one. */
export const DEFAULT_AVATAR = 0;

const DARK = '#2B2118';

export function Avatar({ id, size = 48 }: { id?: number; size?: number }) {
  const look = AVATARS[id ?? DEFAULT_AVATAR] ?? AVATARS[DEFAULT_AVATAR];
  const s = (n: number) => n * size;
  const head = s(0.46);
  const headTop = s(0.24);
  const headLeft = (size - head) / 2;
  const abs = (style: ViewStyle): ViewStyle => ({ position: 'absolute', ...style });
  const eyeTop = headTop + head * 0.45;

  return (
    <View
      style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: look.bg, overflow: 'hidden' }}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      {/* Hair that falls behind the head. */}
      {look.hair === 'long' && (
        <View
          style={abs({
            left: headLeft - s(0.05),
            top: headTop - s(0.03),
            width: head + s(0.1),
            height: head + s(0.18),
            borderTopLeftRadius: head,
            borderTopRightRadius: head,
            backgroundColor: look.hairColor,
          })}
        />
      )}
      {look.hair === 'bun' && (
        <View style={abs({ left: (size - s(0.2)) / 2, top: headTop - s(0.12), width: s(0.2), height: s(0.2), borderRadius: s(0.1), backgroundColor: look.hairColor })} />
      )}
      {/* Shoulders. */}
      <View
        style={abs({ left: s(0.14), top: s(0.72), width: s(0.72), height: s(0.5), borderRadius: s(0.36), backgroundColor: look.shirt })}
      />
      {/* Neck and head. */}
      <View style={abs({ left: (size - s(0.16)) / 2, top: headTop + head - s(0.06), width: s(0.16), height: s(0.12), backgroundColor: look.skin })} />
      <View style={abs({ left: headLeft, top: headTop, width: head, height: head, borderRadius: head / 2, backgroundColor: look.skin })} />
      {/* Hair on top of the head. */}
      {(look.hair === 'short' || look.hair === 'long' || look.hair === 'bun') && (
        <View
          style={abs({
            left: headLeft - s(0.01),
            top: headTop - s(0.02),
            width: head + s(0.02),
            height: head * 0.42,
            borderTopLeftRadius: head,
            borderTopRightRadius: head,
            borderBottomLeftRadius: look.hair === 'short' ? s(0.02) : head * 0.3,
            borderBottomRightRadius: s(0.02),
            backgroundColor: look.hairColor,
          })}
        />
      )}
      {look.hair === 'curly' &&
        [-0.17, -0.06, 0.06, 0.17, -0.22, 0.22].map((dx, i) => (
          <View
            key={i}
            style={abs({
              left: size / 2 + s(dx) - s(0.08),
              top: headTop - s(0.05) + (Math.abs(dx) > 0.2 ? s(0.07) : 0),
              width: s(0.16),
              height: s(0.16),
              borderRadius: s(0.08),
              backgroundColor: look.hairColor,
            })}
          />
        ))}
      {look.hair === 'spiky' &&
        [-0.14, -0.05, 0.05, 0.14].map((dx, i) => (
          <View
            key={i}
            style={abs({
              left: size / 2 + s(dx) - s(0.06),
              top: headTop - s(0.04),
              width: s(0.12),
              height: s(0.14),
              borderTopLeftRadius: s(0.06),
              borderTopRightRadius: s(0.06),
              transform: [{ rotate: `${dx * 120}deg` }],
              backgroundColor: look.hairColor,
            })}
          />
        ))}
      {/* Eyes, glasses and smile. */}
      {[-1, 1].map((side) => (
        <View
          key={side}
          style={abs({ left: size / 2 + side * s(0.09) - s(0.03), top: eyeTop, width: s(0.06), height: s(0.06), borderRadius: s(0.03), backgroundColor: DARK })}
        />
      ))}
      {look.glasses &&
        [-1, 1].map((side) => (
          <View
            key={side}
            style={abs({
              left: size / 2 + side * s(0.09) - s(0.075),
              top: eyeTop - s(0.045),
              width: s(0.15),
              height: s(0.15),
              borderRadius: s(0.075),
              borderWidth: Math.max(1, s(0.02)),
              borderColor: DARK,
            })}
          />
        ))}
      <View
        style={abs({
          left: (size - s(0.16)) / 2,
          top: eyeTop + s(0.07),
          width: s(0.16),
          height: s(0.08),
          borderBottomWidth: Math.max(1, s(0.025)),
          borderLeftWidth: Math.max(1, s(0.012)),
          borderRightWidth: Math.max(1, s(0.012)),
          borderColor: 'transparent',
          borderBottomColor: DARK,
          borderBottomLeftRadius: s(0.08),
          borderBottomRightRadius: s(0.08),
        })}
      />
    </View>
  );
}
