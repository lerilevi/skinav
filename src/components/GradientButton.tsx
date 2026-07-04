import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

import { fonts, theme } from '../theme';

interface GradientButtonProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  /** Two-stop gradient. Defaults to the brand blue→cyan. */
  colors?: [string, string];
  /** Render a flat disabled style instead of the gradient. */
  variant?: 'gradient' | 'disabled';
  style?: ViewStyle;
  textStyle?: TextStyle;
  fontSize?: number;
}

// The primary call-to-action button. The prototype uses a 135° blue→cyan
// gradient on nearly every "Continue / Start / Save" button; this centralizes it.
export function GradientButton({
  label,
  onPress,
  disabled = false,
  colors = [theme.blue, theme.cyan],
  variant = 'gradient',
  style,
  textStyle,
  fontSize = 16,
}: GradientButtonProps) {
  const isFlat = disabled || variant === 'disabled';

  if (isFlat) {
    return (
      <Pressable
        onPress={disabled ? undefined : onPress}
        disabled={disabled}
        style={[styles.flat, style]}
      >
        <Text style={[styles.text, { color: theme.gray, fontSize }, textStyle]}>{label}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={style}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={[styles.text, { fontSize }, textStyle]}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flat: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  text: {
    color: theme.white,
    fontFamily: fonts.extrabold,
  },
});
