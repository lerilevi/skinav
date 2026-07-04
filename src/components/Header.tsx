import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { fonts, theme } from '../theme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  /** Optional element rendered on the right (e.g. "MARK READ" button). */
  right?: React.ReactNode;
  /** Eyebrow label above the title (e.g. "CREATE ACCOUNT"). */
  eyebrow?: string;
  borderless?: boolean;
}

// Back-arrow header shared by the inner screens (Report, Emergency overrides its
// own colors, Account, Friends, Alerts, EmailSignup).
export function Header({ title, subtitle, onBack, right, eyebrow, borderless }: HeaderProps) {
  return (
    <View style={[styles.row, borderless ? null : styles.border]}>
      {onBack ? (
        <Pressable onPress={onBack} hitSlop={8} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
      ) : null}
      <View style={styles.titleWrap}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right ? <View>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(59,158,255,0.08)',
  },
  backBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: theme.white,
    fontSize: 18,
  },
  titleWrap: {
    flex: 1,
  },
  eyebrow: {
    fontSize: 11,
    fontFamily: fonts.bold,
    color: theme.cyan,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.extrabold,
    color: theme.white,
  },
  subtitle: {
    fontSize: 12,
    color: theme.gray,
    marginTop: 2,
    fontFamily: fonts.regular,
  },
});
