import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import { Header } from '../components/Header';
import { useApp } from '../state/AppContext';
import { fonts, theme } from '../theme';

// PLACEHOLDER. Routes (Recent Destinations + Popular Runs, route options,
// turn-by-turn) all depend on the routing engine and real resort data — the
// "moat" sprint. Deferred until a resort is chosen and its OSM data is pulled.
export function RoutesPlaceholderScreen() {
  const { resort } = useApp();
  const resortName = resort?.name ?? 'Zermatt';
  return (
    <Screen edges={['top']}>
      <Header title="Routes" subtitle={`${resortName} · Find your line`} borderless />
      <View style={styles.body}>
        <Text style={{ fontSize: 56, marginBottom: 16 }}>🧭</Text>
        <Text style={styles.title}>Routing comes later</Text>
        <Text style={styles.desc}>
          Popular runs, route options, and turn-by-turn guidance all run on the routing
          graph + hub gap-filling logic — the core differentiator. It needs real piste/lift
          data to build and test against, so it waits until a resort is picked.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: { fontSize: 22, fontFamily: fonts.extrabold, color: theme.white, marginBottom: 8 },
  desc: {
    fontSize: 14,
    color: theme.gray,
    textAlign: 'center',
    lineHeight: 21,
    fontFamily: fonts.regular,
  },
});
