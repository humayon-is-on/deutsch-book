import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { TouchTarget } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useT } from '@/i18n';

// Edge on the web adds its own eye button; hide it so only ours shows.
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const css = document.createElement('style');
  css.textContent = 'input::-ms-reveal, input::-ms-clear { display: none; }';
  document.head.appendChild(css);
}

/** A password field with an eye button on the right that shows or hides the password. */
export function PasswordInput({ style, ...props }: Omit<TextInputProps, 'secureTextEntry'>) {
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();
  const t = useT();
  return (
    <View style={styles.wrap}>
      <TextInput {...props} secureTextEntry={!visible} style={[style, styles.input]} />
      <Pressable
        onPress={() => setVisible((v) => !v)}
        hitSlop={6}
        accessibilityRole="button"
        accessibilityLabel={visible ? t('পাসওয়ার্ড লুকান', 'Hide password') : t('পাসওয়ার্ড দেখুন', 'Show password')}
        style={styles.eye}>
        <Ionicons name={visible ? 'eye-off-outline' : 'eye-outline'} size={22} color={colors.textSecondary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { justifyContent: 'center' },
  input: { paddingRight: TouchTarget + 4 },
  eye: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: TouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
