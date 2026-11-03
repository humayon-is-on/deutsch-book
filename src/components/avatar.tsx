import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { AVATAR_LOOKS, avatarSvg } from '@/components/avatar-art';
import { Icon } from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';

/**
 * Round face avatars, drawn as small SVG pictures (see avatar-art), so they
 * need no image files. Learners pick one by its id; the id is what's saved,
 * so new avatars can be added at the end without moving others.
 */
export const AVATARS = AVATAR_LOOKS;

/** Shown until the learner picks one. */
export const DEFAULT_AVATAR = 0;

const cache = new Map<number, string>();
function svgFor(id: number): string {
  const key = AVATAR_LOOKS[id] ? id : DEFAULT_AVATAR;
  let xml = cache.get(key);
  if (!xml) {
    xml = avatarSvg(key);
    cache.set(key, xml);
  }
  return xml;
}

/** A learner's avatar; with no id yet (none picked), the plain account icon. */
export function Avatar({ id, size = 48 }: { id?: number; size?: number }) {
  const { colors } = useTheme();
  if (id === undefined) return <Icon name="person-circle-outline" size={size} color={colors.textSecondary} />;
  return (
    <View
      style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden' }}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      <SvgXml xml={svgFor(id)} width={size} height={size} />
    </View>
  );
}
