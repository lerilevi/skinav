import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ChangePasswordModal } from '../components/ChangePasswordModal';
import { DeleteAccountModal } from '../components/DeleteAccountModal';
import { Toggle } from '../components/Toggle';
import { Screen } from '../components/Screen';
import { useApp } from '../state/AppContext';
import { fonts, theme, type SkiLevel } from '../theme';
import type { Prefs, SkiType } from '../types';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const LEVELS: { id: SkiLevel; label: string; color: string }[] = [
  { id: 'beginner', label: 'Beginner', color: '#00C853' },
  { id: 'intermediate', label: 'Intermediate', color: theme.blueLight },
  { id: 'advanced', label: 'Advanced', color: theme.red },
  { id: 'expert', label: 'Expert', color: '#1A1A1A' },
];

const PREF_ROWS: { key: keyof Prefs; label: string }[] = [
  { key: 'metric', label: 'Metric units (km, °C)' },
  { key: 'voice', label: 'Voice turn-by-turn' },
  { key: 'shareLocation', label: 'Share location with friends' },
  { key: 'notifications', label: 'Alert notifications' },
];

// Compact a large number for the stats strip (e.g. 18200 → "18.2k").
function compact(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

// SCREEN 10 — Account / profile management. Edits persist to the signed-in
// account automatically (via AppContext). Logout ends the session and Delete
// removes the account; both return to Welcome (clearing the nav stack).
export function AccountScreen() {
  const navigation = useNavigation<Nav>();
  const {
    skiType,
    setSkiType,
    skiLevel,
    setSkiLevel,
    username,
    setUsername,
    email,
    setEmail,
    prefs,
    setPrefs,
    stats,
    signOut,
    deleteAccount,
  } = useApp();

  const statCells = [
    { value: compact(stats.days), label: 'DAYS' },
    { value: compact(stats.runs), label: 'RUNS' },
    { value: compact(stats.km), label: 'KM' },
    { value: compact(stats.vertM), label: 'VERT M' },
  ];

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const initials = (username || 'JS').slice(0, 2).toUpperCase();

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    }, 600);
  };

  // This screen lives inside the bottom-tab navigator, so the reset has to go to
  // the PARENT (root stack) where "Welcome" lives — resetting the tab navigator
  // itself would throw (no "Welcome" route there).
  const backToWelcome = () => {
    navigation.getParent()?.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  };

  const handleLogout = async () => {
    await signOut();
    backToWelcome();
  };

  const handleDelete = async () => {
    await deleteAccount();
    backToWelcome();
  };

  const TYPES: SkiType[] = ['skier', 'snowboarder'];

  return (
    <Screen edges={['top']}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Profile</Text>
          <Text style={styles.headerSub}>Account & preferences</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Avatar hero */}
        <View style={styles.hero}>
          <View style={{ marginBottom: 12 }}>
            <LinearGradient colors={[theme.blue, theme.cyan]} style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </LinearGradient>
            <Pressable style={styles.cameraBtn}>
              <Text style={{ fontSize: 13 }}>📷</Text>
            </Pressable>
          </View>
          <Text style={styles.heroName}>{username}</Text>
          <Text style={styles.heroEmail}>{email}</Text>
          <View style={styles.passBadge}>
            <Text style={styles.passBadgeText}>⛷ SEASON PASS · 2026</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsStrip}>
          {statCells.map((s, i) => (
            <View key={s.label} style={[styles.statCell, i < 3 && styles.statCellBorder]}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Account */}
        <Text style={styles.sectionLabel}>ACCOUNT</Text>
        <View style={{ gap: 10, marginBottom: 22 }}>
          <View style={styles.fieldBox}>
            <Text style={styles.fieldLabel}>USERNAME</Text>
            <TextInput value={username} onChangeText={setUsername} style={styles.fieldInput} />
          </View>
          <View style={styles.fieldBox}>
            <Text style={styles.fieldLabel}>EMAIL</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.fieldInput}
            />
          </View>
          <View style={[styles.fieldBox, styles.passRow]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>PASSWORD</Text>
              <Text style={styles.passDots}>••••••••••</Text>
            </View>
            <Pressable onPress={() => setShowPwd(true)} style={styles.changeBtn}>
              <Text style={styles.changeText}>CHANGE</Text>
            </Pressable>
          </View>
        </View>

        {/* Ski profile */}
        <Text style={styles.sectionLabel}>SKI PROFILE</Text>
        <View style={styles.typeGrid}>
          {TYPES.map((t) => {
            const active = skiType === t;
            return (
              <Pressable
                key={t}
                onPress={() => setSkiType(t)}
                style={[styles.typeCard, active && styles.typeCardActive]}
              >
                <Text style={{ fontSize: 22, marginBottom: 2 }}>{t === 'skier' ? '⛷' : '🏂'}</Text>
                <Text style={[styles.typeLabel, { color: active ? theme.white : theme.gray }]}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.levelGrid}>
          {LEVELS.map((l) => {
            const active = skiLevel === l.id;
            return (
              <Pressable
                key={l.id}
                onPress={() => setSkiLevel(l.id)}
                style={[
                  styles.levelChip,
                  { borderColor: active ? l.color : 'rgba(59,158,255,0.12)' },
                  active && { backgroundColor: 'rgba(59,158,255,0.12)' },
                ]}
              >
                <View
                  style={[
                    styles.levelDot,
                    { backgroundColor: l.color },
                    l.id === 'expert' && { borderWidth: 2, borderColor: theme.gray },
                  ]}
                />
                <Text style={[styles.levelLabel, { color: active ? theme.white : theme.ice }]}>
                  {l.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Preferences */}
        <Text style={styles.sectionLabel}>PREFERENCES</Text>
        <View style={styles.prefCard}>
          {PREF_ROWS.map((p, i) => (
            <View
              key={p.key}
              style={[styles.prefRow, i < PREF_ROWS.length - 1 && styles.prefRowBorder]}
            >
              <Text style={styles.prefLabel}>{p.label}</Text>
              <Toggle
                value={prefs[p.key]}
                onToggle={() => setPrefs((x) => ({ ...x, [p.key]: !x[p.key] }))}
              />
            </View>
          ))}
        </View>

        {/* Friends row */}
        <Pressable onPress={() => navigation.navigate('Friends')} style={styles.friendsRow}>
          <View style={styles.friendsIcon}>
            <Text style={{ fontSize: 16 }}>👥</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.friendsTitle}>Manage Friends</Text>
            <Text style={styles.friendsDesc}>See where your crew is on the mountain</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>

        {/* Danger zone */}
        <Pressable onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
        <Pressable onPress={() => setShowDelete(true)} style={styles.deleteLink}>
          <Text style={styles.deleteLinkText}>Delete account</Text>
        </Pressable>
      </ScrollView>

      {/* Sticky save */}
      <View style={styles.saveBar}>
        <Pressable onPress={handleSave} disabled={saving}>
          <LinearGradient
            colors={saved ? ['#00b060', theme.green] : [theme.blue, theme.cyan]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.saveBtn, saving && { opacity: 0.7 }]}
          >
            <Text style={styles.saveText}>
              {saved ? '✓ Saved' : saving ? 'Saving…' : 'Save Changes'}
            </Text>
          </LinearGradient>
        </Pressable>
      </View>

      <ChangePasswordModal visible={showPwd} onClose={() => setShowPwd(false)} />
      <DeleteAccountModal
        visible={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => {
          setShowDelete(false);
          void handleDelete();
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(59,158,255,0.08)',
  },
  headerTitle: { fontSize: 20, fontFamily: fonts.extrabold, color: theme.white },
  headerSub: { fontSize: 11, color: theme.gray, marginTop: 2, fontFamily: fonts.regular },
  scroll: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 24 },
  hero: { alignItems: 'center', paddingTop: 14, paddingBottom: 20 },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: theme.navyMid,
  },
  avatarText: { fontSize: 34, fontFamily: fonts.black, color: theme.white, letterSpacing: -1 },
  cameraBtn: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.navyLight,
    borderWidth: 2,
    borderColor: theme.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroName: { fontSize: 19, fontFamily: fonts.extrabold, color: theme.white },
  heroEmail: { fontSize: 12, color: theme.gray, marginTop: 2, fontFamily: fonts.regular },
  passBadge: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,212,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,212,255,0.2)',
    borderRadius: 8,
  },
  passBadgeText: { fontSize: 10, fontFamily: fonts.extrabold, color: theme.cyan, letterSpacing: 1.5 },
  statsStrip: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.1)',
    borderRadius: 14,
    paddingVertical: 12,
    marginBottom: 22,
    flexDirection: 'row',
  },
  statCell: { flex: 1, alignItems: 'center' },
  statCellBorder: { borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.06)' },
  statValue: { fontSize: 18, fontFamily: fonts.black, color: theme.white },
  statLabel: { fontSize: 9, color: theme.gray, fontFamily: fonts.bold, marginTop: 2, letterSpacing: 1.2 },
  sectionLabel: { fontSize: 10, fontFamily: fonts.extrabold, color: theme.gray, letterSpacing: 2, marginBottom: 10 },
  fieldBox: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.12)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  fieldLabel: { fontSize: 10, color: theme.gray, fontFamily: fonts.bold, letterSpacing: 1 },
  fieldInput: { color: theme.white, fontSize: 15, fontFamily: fonts.semibold, paddingTop: 3, padding: 0 },
  passRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  passDots: { fontSize: 16, color: theme.white, letterSpacing: 4, paddingTop: 3 },
  changeBtn: {
    backgroundColor: 'rgba(0,212,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,212,255,0.27)',
    borderRadius: 9,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  changeText: { color: theme.cyan, fontSize: 10, fontFamily: fonts.extrabold, letterSpacing: 1 },
  typeGrid: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  typeCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 2,
    borderColor: 'rgba(59,158,255,0.12)',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  typeCardActive: { borderColor: theme.cyan, backgroundColor: 'rgba(0,212,255,0.08)' },
  typeLabel: { fontSize: 12, fontFamily: fonts.bold },
  levelGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 22 },
  levelChip: {
    width: '47%',
    flexGrow: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  levelDot: { width: 14, height: 14, borderRadius: 7 },
  levelLabel: { fontSize: 12, fontFamily: fonts.bold },
  prefCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.12)',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 22,
  },
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
  },
  prefRowBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  prefLabel: { fontSize: 13, color: theme.ice, fontFamily: fonts.regular },
  friendsRow: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.12)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  friendsIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(0,212,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,212,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendsTitle: { fontSize: 13, fontFamily: fonts.bold, color: theme.white },
  friendsDesc: { fontSize: 11, color: theme.gray, marginTop: 2, fontFamily: fonts.regular },
  chevron: { color: theme.gray, fontSize: 18 },
  logoutBtn: {
    backgroundColor: 'rgba(255,59,92,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,59,92,0.27)',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 6,
  },
  logoutText: { color: theme.red, fontSize: 14, fontFamily: fonts.extrabold },
  deleteLink: { alignItems: 'center', paddingVertical: 8 },
  deleteLinkText: { color: theme.gray, fontSize: 12, fontFamily: fonts.semibold, textDecorationLine: 'underline' },
  saveBar: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(59,158,255,0.1)',
    backgroundColor: theme.navy,
  },
  saveBtn: { borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  saveText: { color: theme.white, fontSize: 15, fontFamily: fonts.extrabold },
});
