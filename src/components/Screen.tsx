import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '../theme';

interface ScreenProps {
  children: React.ReactNode;
  /** Background override (e.g. Emergency uses a red-tinted gradient feel). */
  backgroundColor?: string;
  edges?: readonly Edge[];
  style?: ViewStyle;
}

// Full-bleed navy screen container with safe-area padding. Every top-level
// screen renders inside one of these so the layout matches the prototype's
// fixed phone frame while respecting real device notches/home indicators.
export function Screen({
  children,
  backgroundColor = theme.navy,
  edges = ['top', 'bottom'] as const,
  style,
}: ScreenProps) {
  return (
    <SafeAreaView style={[styles.root, { backgroundColor }, style]} edges={edges}>
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});
