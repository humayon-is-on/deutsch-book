import { View, type ViewStyle } from 'react-native';

import { Icon } from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';

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
  glasses?: 'normal' | 'sun';
  /** A smile with closed lips instead of an open one. */
  closed?: boolean;
  /** Cap colour; the cap takes the place of the hair on top. */
  cap?: string;
  /** A small beard on the chin, in the hair colour. */
  beard?: boolean;
};

const SKIN = ['#F9D7B5', '#EDB98A', '#D08B5B', '#AE5D29', '#8D4A1F', '#FFE0C7'];
const HAIR = { black: '#2B2118', brown: '#6B3E1F', blond: '#E2B65A', red: '#B5482A', grey: '#9AA0A6', blue: '#3D5AFE' };

export const AVATARS: AvatarLook[] = [
  { bg: '#BBDEFB', skin: SKIN[0], hair: 'short', hairColor: HAIR.brown, shirt: '#1E88E5' },
  { bg: '#F8BBD0', skin: SKIN[1], hair: 'long', hairColor: HAIR.black, shirt: '#D81B60', closed: true },
  { bg: '#C8E6C9', skin: SKIN[2], hair: 'curly', hairColor: HAIR.black, shirt: '#43A047', glasses: 'sun' },
  { bg: '#FFE0B2', skin: SKIN[0], hair: 'bun', hairColor: HAIR.blond, shirt: '#FB8C00', closed: true },
  { bg: '#D1C4E9', skin: SKIN[3], hair: 'short', hairColor: HAIR.black, shirt: '#5E35B1', glasses: 'normal', beard: true },
  { bg: '#B2EBF2', skin: SKIN[5], hair: 'long', hairColor: HAIR.red, shirt: '#00ACC1', glasses: 'sun' },
  { bg: '#FFF9C4', skin: SKIN[4], hair: 'none', hairColor: HAIR.black, shirt: '#F9A825', cap: '#E53935', beard: true },
  { bg: '#FFCDD2', skin: SKIN[1], hair: 'spiky', hairColor: HAIR.brown, shirt: '#E53935', closed: true },
  { bg: '#DCEDC8', skin: SKIN[2], hair: 'bun', hairColor: HAIR.black, shirt: '#7CB342', glasses: 'normal' },
  { bg: '#CFD8DC', skin: SKIN[0], hair: 'short', hairColor: HAIR.grey, shirt: '#546E7A', glasses: 'normal', beard: true, closed: true },
  { bg: '#E1BEE7', skin: SKIN[3], hair: 'curly', hairColor: HAIR.brown, shirt: '#8E24AA', cap: '#1E88E5' },
  { bg: '#B3E5FC', skin: SKIN[1], hair: 'spiky', hairColor: HAIR.blue, shirt: '#039BE5', glasses: 'sun' },
  { bg: '#FFECB3', skin: SKIN[4], hair: 'long', hairColor: HAIR.black, shirt: '#FFB300', closed: true },
  { bg: '#C5CAE9', skin: SKIN[5], hair: 'short', hairColor: HAIR.blond, shirt: '#3949AB', cap: '#43A047', beard: true },
  { bg: '#F0F4C3', skin: SKIN[2], hair: 'none', hairColor: HAIR.black, shirt: '#C0CA33', glasses: 'normal', closed: true },
  { bg: '#FFCCBC', skin: SKIN[0], hair: 'curly', hairColor: HAIR.red, shirt: '#F4511E', closed: true },
  { bg: '#B2DFDB', skin: SKIN[3], hair: 'bun', hairColor: HAIR.brown, shirt: '#00897B', glasses: 'sun' },
  { bg: '#D7CCC8', skin: SKIN[1], hair: 'long', hairColor: HAIR.blond, shirt: '#6D4C41', glasses: 'normal' },
  { bg: '#F8BBD0', skin: SKIN[4], hair: 'spiky', hairColor: HAIR.black, shirt: '#C2185B', cap: '#FDD835' },
  { bg: '#C8E6C9', skin: SKIN[5], hair: 'short', hairColor: HAIR.red, shirt: '#2E7D32', beard: true, closed: true },
];

/** Shown until the learner picks one. */
export const DEFAULT_AVATAR = 0;

const DARK = '#2B2118';
/** Outline drawn around shapes for a cartoon look. */
const LINE = 'rgba(43,33,24,0.85)';

/** A learner's avatar; with no id yet (none picked), the plain account icon. */
export function Avatar({ id, size = 48 }: { id?: number; size?: number }) {
  const { colors } = useTheme();
  if (id === undefined) return <Icon name="person-circle-outline" size={size} color={colors.textSecondary} />;
  const look = AVATARS[id] ?? AVATARS[DEFAULT_AVATAR];
  const s = (n: number) => n * size;
  const line = Math.max(1, s(0.025));
  const head = s(0.54);
  const headTop = s(0.2);
  const headLeft = (size - head) / 2;
  const abs = (style: ViewStyle): ViewStyle => ({ position: 'absolute', ...style });
  const eyeTop = headTop + head * 0.42;
  const eye = s(0.15);

  return (
    <View
      style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: look.bg, overflow: 'hidden', borderWidth: line, borderColor: LINE }}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      {/* Hair that falls behind the head. */}
      {look.hair === 'long' && (
        <View
          style={abs({
            left: headLeft - s(0.05),
            top: headTop - s(0.03),
            width: head + s(0.1),
            height: head + s(0.2),
            borderTopLeftRadius: head,
            borderTopRightRadius: head,
            borderBottomLeftRadius: s(0.06),
            borderBottomRightRadius: s(0.06),
            backgroundColor: look.hairColor,
            borderWidth: line,
            borderColor: LINE,
          })}
        />
      )}
      {look.hair === 'bun' && (
        <View
          style={abs({
            left: (size - s(0.22)) / 2,
            top: headTop - s(0.13),
            width: s(0.22),
            height: s(0.22),
            borderRadius: s(0.11),
            backgroundColor: look.hairColor,
            borderWidth: line,
            borderColor: LINE,
          })}
        />
      )}
      {/* Shoulders. */}
      <View
        style={abs({
          left: s(0.12),
          top: s(0.76),
          width: s(0.76),
          height: s(0.5),
          borderRadius: s(0.38),
          backgroundColor: look.shirt,
          borderWidth: line,
          borderColor: LINE,
        })}
      />
      {/* Ears, neck and head. */}
      {[-1, 1].map((side) => (
        <View
          key={side}
          style={abs({
            left: size / 2 + side * (head / 2) - s(0.06),
            top: eyeTop - s(0.01),
            width: s(0.12),
            height: s(0.14),
            borderRadius: s(0.07),
            backgroundColor: look.skin,
            borderWidth: line,
            borderColor: LINE,
          })}
        />
      ))}
      <View style={abs({ left: (size - s(0.16)) / 2, top: headTop + head - s(0.06), width: s(0.16), height: s(0.12), backgroundColor: look.skin })} />
      <View
        style={abs({
          left: headLeft,
          top: headTop,
          width: head,
          height: head,
          borderRadius: head / 2,
          backgroundColor: look.skin,
          borderWidth: line,
          borderColor: LINE,
        })}
      />
      {/* Hair on top of the head. */}
      {!look.cap && (look.hair === 'short' || look.hair === 'long' || look.hair === 'bun') && (
        <View
          style={abs({
            left: headLeft - s(0.01),
            top: headTop - s(0.02),
            width: head + s(0.02),
            height: head * 0.4,
            borderTopLeftRadius: head,
            borderTopRightRadius: head,
            borderBottomLeftRadius: look.hair === 'short' ? s(0.03) : head * 0.3,
            borderBottomRightRadius: s(0.03),
            backgroundColor: look.hairColor,
            borderWidth: line,
            borderColor: LINE,
          })}
        />
      )}
      {!look.cap &&
        look.hair === 'curly' &&
        [-0.2, -0.07, 0.07, 0.2, -0.26, 0.26].map((dx, i) => (
          <View
            key={i}
            style={abs({
              left: size / 2 + s(dx) - s(0.09),
              top: headTop - s(0.06) + (Math.abs(dx) > 0.22 ? s(0.08) : 0),
              width: s(0.18),
              height: s(0.18),
              borderRadius: s(0.09),
              backgroundColor: look.hairColor,
              borderWidth: line,
              borderColor: LINE,
            })}
          />
        ))}
      {!look.cap &&
        look.hair === 'spiky' &&
        [-0.16, -0.055, 0.055, 0.16].map((dx, i) => (
          <View
            key={i}
            style={abs({
              left: size / 2 + s(dx) - s(0.07),
              top: headTop - s(0.05),
              width: s(0.14),
              height: s(0.16),
              borderTopLeftRadius: s(0.07),
              borderTopRightRadius: s(0.07),
              transform: [{ rotate: `${dx * 120}deg` }],
              backgroundColor: look.hairColor,
              borderWidth: line,
              borderColor: LINE,
            })}
          />
        ))}
      {/* A cap: a dome over the head with its peak sticking out to one side. */}
      {look.cap && (
        <>
          <View
            style={abs({
              left: headLeft + head * 0.55,
              top: headTop + head * 0.25,
              width: head * 0.62,
              height: s(0.07),
              borderRadius: s(0.035),
              backgroundColor: look.cap,
              borderWidth: line,
              borderColor: LINE,
            })}
          />
          <View
            style={abs({
              left: headLeft - s(0.015),
              top: headTop - s(0.04),
              width: head + s(0.03),
              height: head * 0.36,
              borderTopLeftRadius: head,
              borderTopRightRadius: head,
              borderBottomLeftRadius: s(0.02),
              borderBottomRightRadius: s(0.02),
              backgroundColor: look.cap,
              borderWidth: line,
              borderColor: LINE,
            })}
          />
          <View style={abs({ left: size / 2 - s(0.025), top: headTop - s(0.06), width: s(0.05), height: s(0.04), borderRadius: s(0.02), backgroundColor: look.cap, borderWidth: line, borderColor: LINE })} />
        </>
      )}
      {/* A small beard around the chin. */}
      {look.beard && (
        <View
          style={abs({
            left: (size - head * 0.56) / 2,
            top: headTop + head * 0.72,
            width: head * 0.56,
            height: head * 0.3,
            borderBottomLeftRadius: head * 0.3,
            borderBottomRightRadius: head * 0.3,
            borderTopLeftRadius: s(0.04),
            borderTopRightRadius: s(0.04),
            backgroundColor: look.hairColor,
            borderWidth: line,
            borderColor: LINE,
          })}
        />
      )}
      {/* Big round eyes with a shine and rosy cheeks. */}
      {[-1, 1].map((side) => (
        <View
          key={side}
          style={abs({
            left: size / 2 + side * s(0.12) - eye / 2,
            top: eyeTop,
            width: eye,
            height: eye,
            borderRadius: eye / 2,
            backgroundColor: '#FFFFFF',
            borderWidth: line,
            borderColor: LINE,
            alignItems: 'center',
            justifyContent: 'center',
          })}>
          <View style={{ width: eye * 0.55, height: eye * 0.55, borderRadius: eye, backgroundColor: DARK }} />
          <View style={abs({ top: eye * 0.2, left: eye * 0.42, width: eye * 0.2, height: eye * 0.2, borderRadius: eye, backgroundColor: '#FFFFFF' })} />
        </View>
      ))}
      {[-1, 1].map((side) => (
        <View
          key={side}
          style={abs({
            left: size / 2 + side * s(0.17) - s(0.045),
            top: eyeTop + eye + s(0.02),
            width: s(0.09),
            height: s(0.05),
            borderRadius: s(0.05),
            backgroundColor: '#FF8A80',
            opacity: 0.6,
          })}
        />
      ))}
      {/* Glasses: rounded frames joined by a bridge; sunglasses have dark lenses. */}
      {look.glasses && (
        <>
          {[-1, 1].map((side) => (
            <View
              key={side}
              style={abs({
                left: size / 2 + side * s(0.12) - s(0.105),
                top: eyeTop + eye / 2 - s(0.075),
                width: s(0.21),
                height: s(0.15),
                borderRadius: s(0.045),
                borderWidth: Math.max(1, s(0.022)),
                borderColor: DARK,
                backgroundColor: look.glasses === 'sun' ? '#1F1F2B' : 'rgba(255,255,255,0.25)',
              })}>
              {look.glasses === 'sun' && (
                <View style={abs({ top: s(0.02), left: s(0.03), width: s(0.06), height: s(0.025), borderRadius: s(0.02), backgroundColor: 'rgba(255,255,255,0.45)' })} />
              )}
            </View>
          ))}
          <View style={abs({ left: size / 2 - s(0.02), top: eyeTop + eye / 2 - s(0.02), width: s(0.04), height: Math.max(1, s(0.022)), backgroundColor: DARK })} />
        </>
      )}
      {look.closed ? (
        <View
          style={abs({
            left: (size - s(0.16)) / 2,
            top: eyeTop + eye + s(0.02),
            width: s(0.16),
            height: s(0.07),
            borderBottomWidth: Math.max(1.5, s(0.028)),
            borderColor: DARK,
            borderBottomLeftRadius: s(0.08),
            borderBottomRightRadius: s(0.08),
          })}
        />
      ) : (
        <View
          style={abs({
            left: (size - s(0.18)) / 2,
            top: eyeTop + eye + s(0.03),
            width: s(0.18),
            height: s(0.09),
            backgroundColor: '#B23A3A',
            borderWidth: line,
            borderColor: LINE,
            borderBottomLeftRadius: s(0.09),
            borderBottomRightRadius: s(0.09),
            borderTopLeftRadius: s(0.02),
            borderTopRightRadius: s(0.02),
          })}
        />
      )}
    </View>
  );
}
