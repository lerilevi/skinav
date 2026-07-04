import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { GradientButton } from '../components/GradientButton';
import { Screen } from '../components/Screen';
import { Header } from '../components/Header';
import { fonts, theme } from '../theme';
import type { MainTabsParamList } from '../navigation/types';

type Nav = BottomTabNavigationProp<MainTabsParamList>;

const TYPES = [
  { id: 'queue', icon: '⏳', label: 'Long Queue', color: theme.orange },
  { id: 'fog', icon: '🌫', label: 'Fog', color: theme.gray },
  { id: 'icy', icon: '🧊', label: 'Icy Piste', color: '#80D8FF' },
  { id: 'groom', icon: '🚜', label: 'Needs Grooming', color: '#A0522D' },
  { id: 'closed', icon: '🚫', label: 'Closed Area', color: theme.red },
  { id: 'lift', icon: '🚡', label: 'Lift Issue', color: theme.yellow },
] as const;

// SCREEN 7 — Report a condition. Resort-independent UI; submission is local-only
// (no backend yet). Reachable as a bottom-tab.
export function ReportScreen() {
  const navigation = useNavigation<Nav>();
  const [selected, setSelected] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const reset = () => {
    setSelected(null);
    setNote('');
    setSubmitted(false);
  };

  const backToMap = () => {
    reset();
    navigation.navigate('Map');
  };

  if (submitted) {
    return (
      <Screen edges={['top']}>
        <View style={styles.successWrap}>
          <Text style={{ fontSize: 64, marginBottom: 16 }}>✅</Text>
          <Text style={styles.successTitle}>Report Submitted</Text>
          <Text style={styles.successDesc}>
            Thanks! Other skiers and resort staff have been notified.
          </Text>
          <GradientButton label="Back to Map" onPress={backToMap} style={{ paddingHorizontal: 0 }} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen edges={['top']}>
      <Header title="Report Issue" subtitle="Blue 7 · Marker 9 · Zermatt" borderless />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionLabel}>WHAT&apos;S THE ISSUE?</Text>
        <View style={styles.grid}>
          {TYPES.map((t) => {
            const active = selected === t.id;
            return (
              <Pressable
                key={t.id}
                onPress={() => setSelected(t.id)}
                style={[
                  styles.typeCard,
                  {
                    borderColor: active ? t.color : 'rgba(59,158,255,0.12)',
                    backgroundColor: active ? `${t.color}22` : 'rgba(255,255,255,0.05)',
                  },
                ]}
              >
                <Text style={{ fontSize: 28, marginBottom: 6 }}>{t.icon}</Text>
                <Text style={[styles.typeLabel, { color: active ? theme.white : theme.gray }]}>
                  {t.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={[styles.sectionLabel, { marginTop: 20 }]}>ADDITIONAL NOTE (OPTIONAL)</Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Describe the issue..."
          placeholderTextColor="rgba(138,170,191,0.5)"
          multiline
          style={styles.textarea}
        />
      </ScrollView>

      <View style={styles.footer}>
        <GradientButton
          label={selected ? 'Submit Report ⚠️' : 'Select an issue type'}
          onPress={() => selected && setSubmitted(true)}
          disabled={!selected}
          colors={[theme.orange, theme.yellow]}
          textStyle={{ color: theme.navy }}
          fontSize={16}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 16 },
  sectionLabel: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: theme.gray,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  typeCard: {
    width: '47%',
    flexGrow: 1,
    borderWidth: 2,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  typeLabel: { fontSize: 13, fontFamily: fonts.bold, textAlign: 'center' },
  textarea: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.2)',
    borderRadius: 12,
    padding: 12,
    color: theme.white,
    fontSize: 14,
    height: 90,
    textAlignVertical: 'top',
    fontFamily: fonts.regular,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(59,158,255,0.1)',
  },
  successWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  successTitle: { fontSize: 22, fontFamily: fonts.extrabold, color: theme.white, marginBottom: 8 },
  successDesc: {
    fontSize: 14,
    color: theme.gray,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 21,
    fontFamily: fonts.regular,
  },
});
