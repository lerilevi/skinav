import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { GradientButton } from '../components/GradientButton';
import { Screen } from '../components/Screen';
import { useApp } from '../state/AppContext';
import { fonts, theme, type SkiLevel } from '../theme';
import type { SkiType } from '../types';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const LEVELS: { id: SkiLevel; label: string; desc: string; color: string }[] = [
  { id: 'beginner', label: 'Beginner', desc: 'Green runs only', color: '#00C853' },
  { id: 'intermediate', label: 'Intermediate', desc: 'Blue & green runs', color: theme.blueLight },
  { id: 'advanced', label: 'Advanced', desc: 'Red & blue runs', color: theme.red },
  { id: 'expert', label: 'Expert', desc: 'Black runs & off-piste', color: '#1A1A1A' },
];

const TYPES: { id: SkiType; emoji: string }[] = [
  { id: 'skier', emoji: '⛷' },
  { id: 'snowboarder', emoji: '🏂' },
];

// SCREEN 2 — Profile setup. Edits the same lifted skiType / skiLevel that the
// Account screen later edits.
export function ProfileSetupScreen() {
  const navigation = useNavigation<Nav>();
  const { skiType, setSkiType, skiLevel, setSkiLevel } = useApp();

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.step}>STEP 1 OF 2</Text>
        <Text style={styles.title}>Your Profile</Text>
        <Text style={styles.subtitle}>We&apos;ll tailor routes to your style</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Type */}
        <Text style={styles.sectionLabel}>I AM A</Text>
        <View style={styles.typeRow}>
          {TYPES.map((t) => {
            const active = skiType === t.id;
            return (
              <Pressable
                key={t.id}
                onPress={() => setSkiType(t.id)}
                style={[styles.typeCard, active && styles.typeCardActive]}
              >
                <Text style={styles.typeEmoji}>{t.emoji}</Text>
                <Text style={[styles.typeLabel, { color: active ? theme.white : theme.gray }]}>
                  {t.id.charAt(0).toUpperCase() + t.id.slice(1)}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Level */}
        <Text style={[styles.sectionLabel, { marginTop: 28 }]}>MY LEVEL</Text>
        <View style={{ gap: 10 }}>
          {LEVELS.map((l) => {
            const active = skiLevel === l.id;
            return (
              <Pressable
                key={l.id}
                onPress={() => setSkiLevel(l.id)}
                style={[styles.levelCard, active && styles.levelCardActive]}
              >
                <View
                  style={[
                    styles.levelDot,
                    { backgroundColor: l.color },
                    l.id === 'expert' && { borderWidth: 2, borderColor: theme.gray },
                  ]}
                />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.levelLabel, { color: active ? theme.white : theme.ice }]}>
                    {l.label}
                  </Text>
                  <Text style={styles.levelDesc}>{l.desc}</Text>
                </View>
                {active ? <Text style={styles.check}>✓</Text> : null}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <GradientButton label="Continue →" onPress={() => navigation.navigate('Resort')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(59,158,255,0.1)',
  },
  step: { fontSize: 11, fontFamily: fonts.bold, color: theme.cyan, letterSpacing: 3 },
  title: { fontSize: 26, fontFamily: fonts.extrabold, color: theme.white, marginTop: 6 },
  subtitle: { fontSize: 14, color: theme.gray, marginTop: 4, fontFamily: fonts.regular },
  scroll: { paddingHorizontal: 24, paddingVertical: 20 },
  sectionLabel: { fontSize: 12, fontFamily: fonts.bold, color: theme.gray, letterSpacing: 2, marginBottom: 12 },
  typeRow: { flexDirection: 'row', gap: 12 },
  typeCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 2,
    borderColor: 'rgba(59,158,255,0.15)',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },
  typeCardActive: { borderColor: theme.cyan, backgroundColor: 'rgba(0,212,255,0.08)' },
  typeEmoji: { fontSize: 32, marginBottom: 6 },
  typeLabel: { fontSize: 14, fontFamily: fonts.bold },
  levelCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 2,
    borderColor: 'rgba(59,158,255,0.12)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  levelCardActive: { borderColor: theme.blueLight, backgroundColor: 'rgba(59,158,255,0.12)' },
  levelDot: { width: 18, height: 18, borderRadius: 9 },
  levelLabel: { fontSize: 15, fontFamily: fonts.bold },
  levelDesc: { fontSize: 12, color: theme.gray, marginTop: 1, fontFamily: fonts.regular },
  check: { color: theme.cyan, fontSize: 18 },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(59,158,255,0.1)',
  },
});
