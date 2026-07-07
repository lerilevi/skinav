import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { GradientButton } from '../components/GradientButton';
import { Screen } from '../components/Screen';
import { RESORTS } from '../data/resorts';
import { useApp } from '../state/AppContext';
import { fonts, theme } from '../theme';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

// SCREEN 3 — Resort selection. Shared by two flows via the `mode` param:
//  • 'onboarding' (default) — part of signup; confirming resets into the app.
//  • 'change' — reached from Account; preselects the current resort and returns
//    back on confirm. Either way the choice is stored in AppContext so headers
//    (and the future map's top-left label) read the same state.
export function ResortScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<RouteProp<RootStackParamList, 'Resort'>>();
  const isChange = route.params?.mode === 'change';
  const { resort, setResort } = useApp();
  const [selected, setSelected] = useState<number | null>(isChange ? (resort?.id ?? null) : null);
  const [search, setSearch] = useState('');

  const openResort = () => {
    const chosen = RESORTS.find((r) => r.id === selected);
    if (!chosen) return;
    setResort(chosen);
    if (isChange) {
      navigation.goBack();
    } else {
      // Onboarding: reset so the signup screens aren't left in the back stack.
      navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
    }
  };

  const filtered = useMemo(
    () => RESORTS.filter((r) => r.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  return (
    <Screen>
      <View style={styles.header}>
        {isChange ? (
          <View style={styles.titleRow}>
            <Pressable onPress={() => navigation.goBack()} hitSlop={8} style={styles.backBtn}>
              <Text style={styles.backArrow}>←</Text>
            </Pressable>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Change Resort</Text>
              <Text style={styles.subtitle}>Switch to a different resort</Text>
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.title}>Select Resort</Text>
            <Text style={styles.subtitle}>Choose where you&apos;re skiing today</Text>
          </>
        )}
        <View style={styles.searchBox}>
          <Text style={{ color: theme.gray }}>🔍</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search resorts..."
            placeholderTextColor={theme.gray}
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {filtered.map((r) => {
          const active = selected === r.id;
          return (
            <Pressable
              key={r.id}
              onPress={() => setSelected(r.id)}
              style={[styles.card, active && styles.cardActive]}
            >
              <View style={styles.cardTop}>
                <View>
                  <Text style={styles.resortName}>{r.name}</Text>
                  <Text style={styles.resortCountry}>{r.country}</Text>
                </View>
                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                  {r.downloaded ? (
                    <View style={styles.dlBadge}>
                      <Text style={styles.dlText}>DOWNLOADED</Text>
                    </View>
                  ) : null}
                  {active ? <Text style={styles.check}>✓</Text> : null}
                </View>
              </View>
              <View style={styles.statsRow}>
                <Text style={styles.stat}>
                  <Text style={styles.statNum}>{r.runs}</Text> km runs
                </Text>
                <Text style={styles.stat}>
                  <Text style={styles.statNum}>{r.lifts}</Text> lifts
                </Text>
                <Text style={styles.stat}>{r.difficulty}</Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <GradientButton
          label={
            selected
              ? isChange
                ? 'Save Resort'
                : 'Open Resort Map →'
              : 'Select a resort'
          }
          onPress={openResort}
          disabled={!selected}
          fontSize={16}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 16 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: { color: theme.white, fontSize: 18 },
  title: { fontSize: 26, fontFamily: fonts.extrabold, color: theme.white, marginBottom: 4 },
  subtitle: { fontSize: 14, color: theme.gray, fontFamily: fonts.regular },
  searchBox: {
    marginTop: 14,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.12)',
  },
  searchInput: { flex: 1, color: theme.white, fontSize: 15, fontFamily: fonts.regular, padding: 0 },
  scroll: { paddingHorizontal: 24, paddingTop: 4, paddingBottom: 16 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1.5,
    borderColor: 'rgba(59,158,255,0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  cardActive: { borderColor: theme.blueLight, backgroundColor: 'rgba(30,111,217,0.2)' },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  resortName: { fontSize: 16, fontFamily: fonts.bold, color: theme.white },
  resortCountry: { fontSize: 13, color: theme.gray, marginTop: 2, fontFamily: fonts.regular },
  dlBadge: {
    backgroundColor: 'rgba(0,229,160,0.13)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  dlText: { color: theme.green, fontSize: 10, fontFamily: fonts.bold, letterSpacing: 1 },
  check: { color: theme.cyan, fontSize: 18 },
  statsRow: { flexDirection: 'row', gap: 16, marginTop: 12 },
  stat: { fontSize: 12, color: theme.gray, fontFamily: fonts.regular },
  statNum: { color: theme.ice, fontFamily: fonts.bold },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(59,158,255,0.1)',
  },
});
