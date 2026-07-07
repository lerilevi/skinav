import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, Linking, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fonts, theme } from '../theme';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const REFERENCES = [
  { icon: '🚑', label: 'Medical Center', dist: '1.2 km', dir: 'Base station' },
  { icon: '🚡', label: 'Glacier Express (bottom)', dist: '600m', dir: 'Downhill' },
  { icon: '🏠', label: 'Altitude Restaurant', dist: '300m', dir: 'Blue 7 downhill' },
];

// Hardcoded demo location (real GPS comes with the tracking sprint).
const LOCATION_LINE = 'Blue 7 · Near Marker 9';
const LOCATION_DETAIL = 'Zermatt Ski Resort · Altitude ~2,450m';

// SCREEN 8 — Emergency. Call buttons open the phone dialer via tel: links (the
// user still taps to dial — no auto-call); Share opens the OS share sheet with
// the current location. Location block is hardcoded demo data.
export function EmergencyScreen() {
  const navigation = useNavigation<Nav>();

  // Open the dialer for a number. tel: links don't auto-dial — they just prefill
  // the dialer — but we guard for devices/simulators with no phone app.
  const callNumber = async (label: string, number: string) => {
    const url = `tel:${number}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert('Can’t place the call', `This device can’t dial ${label} (${number}).`);
        return;
      }
      await Linking.openURL(url);
    } catch {
      Alert.alert('Can’t place the call', `Something went wrong dialing ${label} (${number}).`);
    }
  };

  const shareLocation = async () => {
    try {
      await Share.share({
        message: `🆘 SkiNav — I need help. My location: ${LOCATION_LINE}, ${LOCATION_DETAIL}.`,
      });
    } catch {
      // User dismissed the share sheet or it failed — nothing to do.
    }
  };

  return (
    <LinearGradient colors={['#1a0000', theme.navy]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        {/* Red header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={8} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </Pressable>
          <View>
            <Text style={styles.headerTitle}>🆘 EMERGENCY</Text>
            <Text style={styles.headerSub}>Ski Patrol & Emergency Services</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Location */}
          <View style={styles.locationCard}>
            <Text style={styles.locationLabel}>YOUR CURRENT LOCATION</Text>
            <Text style={styles.locationMain}>📍 {LOCATION_LINE}</Text>
            <Text style={styles.locationSub}>{LOCATION_DETAIL}</Text>
            <Text style={styles.gpsText}>● GPS Lock Active · Sharing with resort</Text>
          </View>

          {/* Actions */}
          <View style={{ gap: 12, marginBottom: 20 }}>
            <Pressable style={styles.callPrimary} onPress={() => callNumber('Ski Patrol', '1414')}>
              <Text style={styles.callPrimaryText}>📞 Call Ski Patrol — 1414</Text>
            </Pressable>
            <Pressable style={styles.callSecondary} onPress={() => callNumber('Emergency', '112')}>
              <Text style={styles.callSecondaryText}>📱 Call Emergency — 112</Text>
            </Pressable>
            <Pressable style={styles.shareBtn} onPress={shareLocation}>
              <Text style={styles.shareText}>📤 Share Location with Contact</Text>
            </Pressable>
          </View>

          {/* References */}
          <View style={styles.refCard}>
            <Text style={styles.refHeading}>NEAREST REFERENCES</Text>
            {REFERENCES.map((r, i) => (
              <View
                key={r.label}
                style={[styles.refRow, i < REFERENCES.length - 1 && styles.refRowBorder]}
              >
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', flex: 1 }}>
                  <Text style={{ fontSize: 18 }}>{r.icon}</Text>
                  <View>
                    <Text style={styles.refLabel}>{r.label}</Text>
                    <Text style={styles.refDir}>{r.dir}</Text>
                  </View>
                </View>
                <Text style={styles.refDist}>{r.dist}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.red,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: { color: 'white', fontSize: 18 },
  headerTitle: { fontSize: 20, fontFamily: fonts.black, color: 'white', letterSpacing: 1 },
  headerSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', fontFamily: fonts.regular },
  scroll: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 20 },
  locationCard: {
    backgroundColor: 'rgba(255,59,92,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,59,92,0.3)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  locationLabel: {
    fontSize: 11,
    fontFamily: fonts.bold,
    color: theme.red,
    letterSpacing: 2,
    marginBottom: 8,
  },
  locationMain: { fontSize: 15, fontFamily: fonts.bold, color: theme.white },
  locationSub: { fontSize: 13, color: theme.gray, marginTop: 4, fontFamily: fonts.regular },
  gpsText: { fontSize: 12, color: theme.green, marginTop: 6, fontFamily: fonts.regular },
  callPrimary: {
    backgroundColor: theme.red,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  callPrimaryText: { color: 'white', fontSize: 16, fontFamily: fonts.black },
  callSecondary: {
    backgroundColor: 'rgba(255,59,92,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255,59,92,0.33)',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  callSecondaryText: { color: theme.white, fontSize: 15, fontFamily: fonts.bold },
  shareBtn: {
    backgroundColor: 'rgba(59,158,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.3)',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  shareText: { color: theme.white, fontSize: 15, fontFamily: fonts.bold },
  refCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    padding: 16,
  },
  refHeading: {
    fontSize: 11,
    fontFamily: fonts.bold,
    color: theme.gray,
    letterSpacing: 2,
    marginBottom: 12,
  },
  refRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  refRowBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  refLabel: { fontSize: 13, fontFamily: fonts.bold, color: theme.white },
  refDir: { fontSize: 11, color: theme.gray, fontFamily: fonts.regular },
  refDist: { fontSize: 13, fontFamily: fonts.bold, color: theme.cyan },
});
