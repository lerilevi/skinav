import type { SkiLevel } from './theme';

export type SkiType = 'skier' | 'snowboarder';

export interface Prefs {
  metric: boolean;
  voice: boolean;
  shareLocation: boolean;
  notifications: boolean;
}

export interface StartPoint {
  name: string;
  location: string;
  altitude?: string;
  icon?: string;
  current?: boolean;
}

// Shape aligned with what a real alerts API would return (per planning notes).
export type AlertCategory = 'lift' | 'piste' | 'weather' | 'community';
export type AlertSeverity = 'urgent' | 'warning' | 'info' | 'good';
export type AlertSource = 'official' | 'community';

export interface Alert {
  id: number;
  category: AlertCategory;
  severity: AlertSeverity;
  icon: string;
  title: string;
  desc: string;
  location: string;
  time: string;
  source: AlertSource;
  reportCount?: number;
  actions?: string[];
}

export interface Resort {
  id: number;
  name: string;
  country: string;
  runs: number;
  lifts: number;
  difficulty: string;
  downloaded: boolean;
}

// Season stats shown on the Account screen. Real accounts start at zero; these
// grow as runs are recorded (future sprint). No longer hardcoded demo numbers.
export interface Stats {
  days: number;
  runs: number;
  km: number;
  vertM: number;
}

// A locally-stored account. Passwords are never stored in plaintext — only a
// salted SHA-256 digest (see services/accounts.ts). `id` is a stable key so the
// display email can be edited without breaking the storage record.
export interface StoredAccount {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  createdAt: number;
  username: string;
  skiType: SkiType;
  skiLevel: SkiLevel;
  prefs: Prefs;
  stats: Stats;
  resortId: number | null;
  alertsRead: boolean;
}

// The subset of the account exposed to the UI as "the signed-in user".
export interface CurrentUser {
  id: string;
  name: string;
  email: string;
}

// Re-export for convenience so screens can import everything from one place.
export type { SkiLevel };
