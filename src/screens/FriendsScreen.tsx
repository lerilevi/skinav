import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Screen } from '../components/Screen';
import { Toggle } from '../components/Toggle';
import { useApp } from '../state/AppContext';
import { fonts, theme } from '../theme';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

type FriendStatus = 'online' | 'rest' | 'offline';

interface Friend {
  id: number;
  name: string;
  initials: string;
  color: string;
  status: FriendStatus;
  location: string;
  altitude: string;
  last: string;
  speed?: string;
}

const FRIENDS: Friend[] = [
  { id: 1, name: 'Emma Larsson', initials: 'EL', color: '#FF6B9D', status: 'online', location: 'Blue 7 · M10', altitude: '2,660m', last: 'Now', speed: '42 km/h' },
  { id: 2, name: 'Marco Bianchi', initials: 'MB', color: '#FFD600', status: 'online', location: 'Glacier Express (lift)', altitude: '2,870m', last: '1 min ago' },
  { id: 3, name: 'Sofia Chen', initials: 'SC', color: '#00E5A0', status: 'rest', location: 'Altitude Restaurant', altitude: '2,520m', last: '12 min ago' },
  { id: 4, name: 'Tom Novak', initials: 'TN', color: '#A78BFA', status: 'offline', location: 'Offline · Base Lodge', altitude: '1,620m', last: '2 hr ago' },
];

const STATUS: Record<FriendStatus, { dot: string; label: string }> = {
  online: { dot: theme.green, label: 'Skiing' },
  rest: { dot: theme.orange, label: 'On break' },
  offline: { dot: theme.gray, label: 'Offline' },
};

// SCREEN 12 — Friends / share location. The share toggle drives the same
// prefs.shareLocation as the Account screen. Add-friend / locate / invite are
// stubs (no backend / map yet).
export function FriendsScreen() {
  const navigation = useNavigation<Nav>();
  const { prefs, setPrefs } = useApp();
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const sharing = prefs.shareLocation;
  const filtered = useMemo(
    () => FRIENDS.filter((f) => f.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  );
  const onMountain = FRIENDS.filter((f) => f.status !== 'offline').length;

  return (
    <Screen edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Friends</Text>
          <Text style={styles.subtitle}>{onMountain} on the mountain now</Text>
        </View>
        <Pressable onPress={() => setShowAdd((s) => !s)} style={styles.addBtn}>
          <Text style={styles.addText}>+ ADD</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Share banner */}
        <View
          style={[
            styles.shareBanner,
            {
              backgroundColor: sharing ? 'rgba(0,229,160,0.08)' : 'rgba(255,140,0,0.08)',
              borderColor: sharing ? `${theme.green}44` : `${theme.orange}44`,
            },
          ]}
        >
          <Text style={{ fontSize: 22 }}>{sharing ? '📡' : '🔒'}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.shareTitle}>
              {sharing ? "You're sharing your location" : 'Location not shared'}
            </Text>
            <Text style={styles.shareDesc}>
              {sharing
                ? 'Friends can see where you are on the mountain'
                : 'Enable sharing to let friends find you'}
            </Text>
          </View>
          <Toggle
            value={sharing}
            onToggle={() => setPrefs((p) => ({ ...p, shareLocation: !p.shareLocation }))}
            onColor={theme.green}
          />
        </View>

        {/* Add friend */}
        {showAdd ? (
          <View style={styles.addCard}>
            <Text style={styles.addCardLabel}>ADD A FRIEND</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
              <TextInput
                placeholder="Username or email"
                placeholderTextColor="rgba(138,170,191,0.5)"
                style={styles.addInput}
              />
              <Pressable>
                <LinearGradient
                  colors={[theme.blue, theme.cyan]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.inviteBtn}
                >
                  <Text style={styles.inviteText}>Invite</Text>
                </LinearGradient>
              </Pressable>
            </View>
            <Text style={styles.qrHint}>Or share your QR code from your profile</Text>
          </View>
        ) : null}

        {/* Search */}
        <View style={styles.searchWrap}>
          <View style={styles.searchBox}>
            <Text style={{ color: theme.gray, fontSize: 13 }}>🔍</Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search friends"
              placeholderTextColor={theme.gray}
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* List */}
        <View style={{ paddingHorizontal: 20 }}>
          {filtered.map((f) => {
            const s = STATUS[f.status];
            return (
              <View key={f.id} style={[styles.friendCard, f.status === 'offline' && { opacity: 0.65 }]}>
                <View>
                  <LinearGradient
                    colors={[f.color, `${f.color}88`]}
                    style={styles.avatar}
                  >
                    <Text style={styles.avatarText}>{f.initials}</Text>
                  </LinearGradient>
                  <View style={[styles.statusDot, { backgroundColor: s.dot }]} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.friendNameRow}>
                    <Text style={styles.friendName}>{f.name}</Text>
                    <Text style={[styles.friendStatus, { color: s.dot }]}>
                      {s.label.toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.friendLoc}>📍 {f.location}</Text>
                  <Text style={styles.friendMeta}>
                    {f.altitude}
                    {f.speed ? ` · ${f.speed}` : ''} · {f.last}
                  </Text>
                </View>
                {f.status !== 'offline' ? (
                  <Pressable style={styles.locateBtn}>
                    <Text style={{ color: theme.cyan, fontSize: 14 }}>🎯</Text>
                  </Pressable>
                ) : null}
              </View>
            );
          })}

          {filtered.length === 0 ? (
            <View style={styles.empty}>
              <Text style={{ fontSize: 40, marginBottom: 10 }}>🔍</Text>
              <Text style={styles.emptyTitle}>No friends found</Text>
              <Text style={styles.emptyDesc}>Try a different search</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
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
  backArrow: { color: theme.white, fontSize: 18 },
  title: { fontSize: 20, fontFamily: fonts.extrabold, color: theme.white },
  subtitle: { fontSize: 11, color: theme.gray, marginTop: 2, fontFamily: fonts.regular },
  addBtn: {
    backgroundColor: 'rgba(0,212,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0,212,255,0.27)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addText: { color: theme.cyan, fontSize: 12, fontFamily: fonts.extrabold, letterSpacing: 0.5 },
  shareBanner: {
    marginHorizontal: 20,
    marginTop: 14,
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  shareTitle: { fontSize: 13, fontFamily: fonts.bold, color: theme.white },
  shareDesc: { fontSize: 11, color: theme.gray, marginTop: 2, fontFamily: fonts.regular },
  addCard: {
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 14,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.15)',
    borderRadius: 12,
  },
  addCardLabel: { fontSize: 10, fontFamily: fonts.bold, color: theme.gray, letterSpacing: 1.5, marginBottom: 8 },
  addInput: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.15)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: theme.white,
    fontSize: 13,
    fontFamily: fonts.regular,
  },
  inviteBtn: { borderRadius: 10, paddingHorizontal: 14, paddingVertical: 11, justifyContent: 'center' },
  inviteText: { color: theme.white, fontSize: 12, fontFamily: fonts.extrabold },
  qrHint: { fontSize: 11, color: theme.gray, fontFamily: fonts.regular },
  searchWrap: { paddingHorizontal: 20, paddingBottom: 10 },
  searchBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.1)',
  },
  searchInput: { flex: 1, color: theme.white, fontSize: 13, fontFamily: fonts.regular, padding: 0 },
  friendCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.1)',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.navyMid,
  },
  avatarText: { fontSize: 14, fontFamily: fonts.black, color: 'white' },
  statusDot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 13,
    height: 13,
    borderRadius: 6.5,
    borderWidth: 2.5,
    borderColor: theme.navyMid,
  },
  friendNameRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 2 },
  friendName: { fontSize: 14, fontFamily: fonts.bold, color: theme.white, flexShrink: 1 },
  friendStatus: { fontSize: 9, fontFamily: fonts.extrabold, letterSpacing: 1 },
  friendLoc: { fontSize: 12, color: theme.ice, marginBottom: 3, fontFamily: fonts.regular },
  friendMeta: { fontSize: 10, color: theme.gray, fontFamily: fonts.regular },
  locateBtn: {
    backgroundColor: 'rgba(0,212,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,212,255,0.2)',
    borderRadius: 10,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: { alignItems: 'center', paddingVertical: 40 },
  emptyTitle: { fontSize: 13, color: theme.ice, fontFamily: fonts.bold },
  emptyDesc: { fontSize: 11, color: theme.gray, marginTop: 4, fontFamily: fonts.regular },
});
