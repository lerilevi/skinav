import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import { ALERTS } from '../data/alerts';
import { useApp } from '../state/AppContext';
import { fonts, theme } from '../theme';
import type { AlertCategory, AlertSeverity } from '../types';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const FILTERS: { id: 'all' | AlertCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'All', icon: '📡' },
  { id: 'lift', label: 'Lifts', icon: '🚡' },
  { id: 'piste', label: 'Pistes', icon: '⛷' },
  { id: 'weather', label: 'Weather', icon: '❄' },
  { id: 'community', label: 'Community', icon: '👥' },
];

const SEVERITY: Record<AlertSeverity, { color: string; label: string }> = {
  urgent: { color: theme.red, label: 'URGENT' },
  warning: { color: theme.orange, label: 'WARNING' },
  info: { color: theme.cyan, label: 'INFO' },
  good: { color: theme.green, label: 'GOOD NEWS' },
};

// SCREEN 9 — Alerts & resort updates. Reads the shared ALERTS data. "Mark read"
// clears the badge (via app state); dismiss is local to this screen (resets on
// re-entry, matching the prototype).
export function AlertsScreen() {
  const navigation = useNavigation<Nav>();
  const { setAlertsRead, resort } = useApp();
  const resortName = resort?.name ?? 'Zermatt';
  const [filter, setFilter] = useState<'all' | AlertCategory>('all');
  const [dismissed, setDismissed] = useState<number[]>([]);

  const visible = useMemo(() => ALERTS.filter((a) => !dismissed.includes(a.id)), [dismissed]);
  const filtered = useMemo(
    () => visible.filter((a) => filter === 'all' || a.category === filter),
    [visible, filter],
  );

  const countFor = (id: 'all' | AlertCategory) =>
    id === 'all' ? visible.length : visible.filter((a) => a.category === id).length;

  return (
    <Screen edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={8} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Alerts & Updates</Text>
            <View style={styles.liveRow}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Live · {resortName} · Updated 1 min ago</Text>
            </View>
          </View>
          <Pressable onPress={() => setAlertsRead(true)} style={styles.markBtn}>
            <Text style={styles.markText}>MARK READ</Text>
          </Pressable>
        </View>

        {/* Filter tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {FILTERS.map((f) => {
            const active = filter === f.id;
            const count = countFor(f.id);
            return (
              <Pressable
                key={f.id}
                onPress={() => setFilter(f.id)}
                style={[styles.filterChip, active && styles.filterChipActive]}
              >
                <Text style={{ fontSize: 13 }}>{f.icon}</Text>
                <Text style={[styles.filterLabel, { color: active ? theme.white : theme.gray }]}>
                  {f.label}
                </Text>
                {count > 0 ? (
                  <View style={[styles.countPill, active && styles.countPillActive]}>
                    <Text style={[styles.countText, { color: active ? theme.white : theme.ice }]}>
                      {count}
                    </Text>
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* List */}
      <ScrollView contentContainerStyle={styles.list}>
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={{ fontSize: 52, marginBottom: 14 }}>✨</Text>
            <Text style={styles.emptyTitle}>All clear here</Text>
            <Text style={styles.emptyDesc}>No alerts in this category right now</Text>
          </View>
        ) : (
          filtered.map((a) => {
            const sev = SEVERITY[a.severity];
            return (
              <View key={a.id} style={[styles.card, { borderLeftColor: sev.color }]}>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <View style={[styles.icon, { backgroundColor: `${sev.color}22`, borderColor: `${sev.color}55` }]}>
                    <Text style={{ fontSize: 20 }}>{a.icon}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.tagRow}>
                      <View style={[styles.sevTag, { backgroundColor: `${sev.color}22` }]}>
                        <Text style={[styles.sevText, { color: sev.color }]}>{sev.label}</Text>
                      </View>
                      {a.source === 'community' ? (
                        <View style={styles.sourceTagCommunity}>
                          <Text style={styles.sourceTextCommunity}>👥 COMMUNITY</Text>
                        </View>
                      ) : (
                        <View style={styles.sourceTagOfficial}>
                          <Text style={styles.sourceTextOfficial}>🏔 OFFICIAL</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.alertTitle}>{a.title}</Text>
                    <Text style={styles.alertDesc}>{a.desc}</Text>

                    <View style={styles.metaRow}>
                      <Text style={styles.metaText}>
                        📍 {a.location} · {a.time}
                      </Text>
                      {a.reportCount ? (
                        <View style={styles.reportPill}>
                          <Text style={styles.reportPillText}>{a.reportCount} reports</Text>
                        </View>
                      ) : null}
                    </View>

                    {a.actions ? (
                      <View style={styles.actionsRow}>
                        {a.actions.map((act, i) => (
                          <Pressable
                            key={act}
                            style={[
                              styles.actionBtn,
                              i === 0
                                ? { backgroundColor: `${sev.color}22`, borderColor: `${sev.color}66` }
                                : { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(59,158,255,0.15)' },
                            ]}
                          >
                            <Text style={[styles.actionText, { color: i === 0 ? sev.color : theme.ice }]}>
                              {act}
                            </Text>
                          </Pressable>
                        ))}
                        <Pressable
                          onPress={() => setDismissed((d) => [...d, a.id])}
                          style={styles.dismissBtn}
                        >
                          <Text style={styles.dismissText}>Dismiss</Text>
                        </Pressable>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            );
          })
        )}

        {/* Contribute CTA */}
        <Pressable
          onPress={() => navigation.navigate('Main', { screen: 'Report' })}
          style={styles.cta}
        >
          <Text style={{ fontSize: 20 }}>⚠️</Text>
          <View>
            <Text style={styles.ctaTitle}>Seen something?</Text>
            <Text style={styles.ctaDesc}>Report conditions to help other skiers</Text>
          </View>
        </Pressable>

        <View style={styles.trust}>
          <Text style={styles.trustText}>
            Community reports from skiers on the mountain · Official updates direct from Zermatt
            Resort
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(59,158,255,0.1)',
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
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
  liveRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.green },
  liveText: { fontSize: 11, color: theme.gray, fontFamily: fonts.regular },
  markBtn: {
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.25)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  markText: { color: theme.cyan, fontSize: 10, fontFamily: fonts.extrabold, letterSpacing: 0.8 },
  filterRow: { gap: 6, paddingRight: 8 },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.15)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  filterChipActive: { backgroundColor: theme.blue, borderColor: 'transparent' },
  filterLabel: { fontSize: 12, fontFamily: fonts.bold },
  countPill: {
    backgroundColor: 'rgba(59,158,255,0.2)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  countPillActive: { backgroundColor: 'rgba(255,255,255,0.25)' },
  countText: { fontSize: 10, fontFamily: fonts.black },
  list: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 16 },
  empty: { alignItems: 'center', paddingVertical: 50 },
  emptyTitle: { fontSize: 14, fontFamily: fonts.bold, color: theme.ice },
  emptyDesc: { fontSize: 12, color: theme.gray, marginTop: 6, fontFamily: fonts.regular },
  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.1)',
    borderLeftWidth: 4,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 5, flexWrap: 'wrap' },
  sevTag: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 5 },
  sevText: { fontSize: 9, fontFamily: fonts.black, letterSpacing: 1 },
  sourceTagCommunity: {
    backgroundColor: 'rgba(0,212,255,0.08)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  sourceTextCommunity: { fontSize: 9, fontFamily: fonts.bold, color: theme.cyan, letterSpacing: 0.5 },
  sourceTagOfficial: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  sourceTextOfficial: { fontSize: 9, fontFamily: fonts.bold, color: theme.gray, letterSpacing: 0.5 },
  alertTitle: { fontSize: 14, fontFamily: fonts.extrabold, color: theme.white, lineHeight: 18 },
  alertDesc: { fontSize: 12, color: theme.ice, marginTop: 4, lineHeight: 17, fontFamily: fonts.regular },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
    gap: 6,
  },
  metaText: { fontSize: 11, color: theme.gray, fontFamily: fonts.regular },
  reportPill: {
    backgroundColor: 'rgba(255,140,0,0.13)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  reportPillText: { fontSize: 10, fontFamily: fonts.extrabold, color: theme.orange },
  actionsRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 11 },
  actionBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  actionText: { fontSize: 11, fontFamily: fonts.bold },
  dismissBtn: { marginLeft: 'auto', paddingHorizontal: 4, paddingVertical: 7 },
  dismissText: { color: theme.gray, fontSize: 11, fontFamily: fonts.semibold },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 6,
    backgroundColor: 'rgba(59,158,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.25)',
    borderStyle: 'dashed',
    borderRadius: 14,
    padding: 16,
  },
  ctaTitle: { fontSize: 13, fontFamily: fonts.bold, color: theme.white },
  ctaDesc: { fontSize: 11, color: theme.gray, marginTop: 2, fontFamily: fonts.regular },
  trust: {
    marginTop: 12,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 10,
  },
  trustText: { fontSize: 10, color: theme.gray, lineHeight: 15, textAlign: 'center', fontFamily: fonts.regular },
});
