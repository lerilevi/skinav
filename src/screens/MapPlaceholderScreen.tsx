import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import { useApp } from '../state/AppContext';
import { fonts, theme } from '../theme';
import { unreadCount } from '../data/alerts';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

// PLACEHOLDER. The real map is resort-DEPENDENT: it needs the MapLibre GL engine,
// device GPS, and pulled OSM piste/lift data — all later sprints per the build
// order. This stub keeps the Map tab navigable and wires the top-bar entry
// points (Alerts / Emergency) that already exist as standalone screens.
export function MapPlaceholderScreen() {
  const navigation = useNavigation<Nav>();
  const { alertsRead, resort } = useApp();
  const count = unreadCount(alertsRead);
  const resortName = resort?.name ?? 'Zermatt';

  return (
    <Screen edges={['top']}>
      {/* Top bar mirrors the prototype's map header */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.resort}>{resortName}</Text>
          <View style={styles.liveRow}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live GPS · Offline maps</Text>
          </View>
        </View>
        <View style={styles.topActions}>
          <Pressable onPress={() => navigation.navigate('Alerts')} style={styles.bellBtn}>
            <Text style={{ fontSize: 15 }}>🔔</Text>
            {count > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{count}</Text>
              </View>
            ) : null}
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Emergency')} style={styles.sosBtn}>
            <Text style={styles.sosText}>🆘 SOS</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={{ fontSize: 56, marginBottom: 16 }}>🗺️</Text>
        <Text style={styles.title}>Map coming next</Text>
        <Text style={styles.desc}>
          The live piste map needs the map engine (MapLibre GL), device GPS, and the
          chosen resort&apos;s OSM data. Those are the next sprints — this build covers the
          resort-independent screens.
        </Text>
        <View style={styles.pillRow}>
          <Text style={styles.pill}>MapLibre GL</Text>
          <Text style={styles.pill}>Device GPS</Text>
          <Text style={styles.pill}>OSM pistes</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resort: { fontSize: 13, fontFamily: fonts.extrabold, color: theme.white, letterSpacing: 0.3 },
  liveRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 1 },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.green,
  },
  liveText: { fontSize: 10, color: theme.green, fontFamily: fonts.semibold },
  topActions: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  bellBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.25)',
    borderRadius: 12,
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: theme.red,
    borderRadius: 8,
    minWidth: 16,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderWidth: 1.5,
    borderColor: theme.navyMid,
    alignItems: 'center',
  },
  badgeText: { color: 'white', fontSize: 9, fontFamily: fonts.black },
  sosBtn: {
    backgroundColor: theme.red,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sosText: { color: 'white', fontSize: 12, fontFamily: fonts.black, letterSpacing: 0.5 },
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
  pillRow: { flexDirection: 'row', gap: 8, marginTop: 20, flexWrap: 'wrap', justifyContent: 'center' },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 11,
    color: theme.ice,
    fontFamily: fonts.semibold,
    overflow: 'hidden',
  },
});
