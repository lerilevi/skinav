import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { RESORTS } from '../data/resorts';
import {
  AuthError,
  changePassword as authChangePassword,
  DEFAULT_PREFS,
  deleteAccount as authDeleteAccount,
  getSessionAccount,
  signIn as authSignIn,
  signOut as authSignOut,
  signUp as authSignUp,
  updateAccount,
} from '../services/accounts';
import type { SkiLevel } from '../theme';
import type {
  CurrentUser,
  Prefs,
  Resort,
  SkiType,
  StartPoint,
  Stats,
  StoredAccount,
} from '../types';

// ── App-wide state ───────────────────────────────────────────────────────
// Single source of truth for the signed-in user and their profile. Everything
// here is persisted on-device (AsyncStorage) via services/accounts.ts:
//  • auth: real signup/login/logout with salted-hash passwords
//  • profile: skiType, skiLevel, username, email, prefs, resort, stats
// A change to any persisted field is written back to the account (debounced), so
// the app reopens exactly where the user left off. `startPoint` stays in-memory
// only (it's a live-navigation concept). Swaps cleanly for a cloud backend later.

const DEFAULT_STATS: Stats = { days: 0, runs: 0, km: 0, vertM: 0 };

const DEFAULT_START_POINT: StartPoint = {
  name: 'Your current location',
  location: 'Blue 7 · Marker 9',
  altitude: '2,450 m',
  current: true,
};

interface AppState {
  // Auth
  ready: boolean; // false until the persisted session has been loaded
  currentUser: CurrentUser | null;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  /** Resolves to whether the account has completed onboarding (picked a resort). */
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  /** Verify the current password and set a new one. Throws AuthError if wrong. */
  changePassword: (current: string, next: string) => Promise<void>;
  // Whether the signed-in user has finished onboarding (picked a resort).
  onboarded: boolean;

  // Profile
  skiType: SkiType;
  setSkiType: (t: SkiType) => void;
  skiLevel: SkiLevel;
  setSkiLevel: (l: SkiLevel) => void;
  username: string;
  setUsername: (u: string) => void;
  email: string;
  setEmail: (e: string) => void;
  prefs: Prefs;
  setPrefs: React.Dispatch<React.SetStateAction<Prefs>>;
  stats: Stats;
  startPoint: StartPoint;
  setStartPoint: React.Dispatch<React.SetStateAction<StartPoint>>;
  alertsRead: boolean;
  setAlertsRead: (v: boolean) => void;
  resort: Resort | null;
  setResort: (r: Resort | null) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const [skiType, setSkiType] = useState<SkiType>('skier');
  const [skiLevel, setSkiLevel] = useState<SkiLevel>('intermediate');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [prefs, setPrefs] = useState<Prefs>({ ...DEFAULT_PREFS });
  const [stats, setStats] = useState<Stats>({ ...DEFAULT_STATS });
  const [startPoint, setStartPoint] = useState<StartPoint>({ ...DEFAULT_START_POINT });
  const [alertsRead, setAlertsRead] = useState(false);
  const [resort, setResort] = useState<Resort | null>(null);

  // The authoritative stored account (auth fields we don't surface as state).
  const accountRef = useRef<StoredAccount | null>(null);

  // Push a loaded/created account into all the UI state.
  const hydrate = (a: StoredAccount) => {
    accountRef.current = a;
    setCurrentUser({ id: a.id, name: a.name, email: a.email });
    setSkiType(a.skiType);
    setSkiLevel(a.skiLevel);
    setUsername(a.username);
    setEmail(a.email);
    setPrefs({ ...a.prefs });
    setStats({ ...a.stats });
    setAlertsRead(a.alertsRead);
    setResort(a.resortId != null ? (RESORTS.find((r) => r.id === a.resortId) ?? null) : null);
  };

  const resetToDefaults = () => {
    accountRef.current = null;
    setCurrentUser(null);
    setSkiType('skier');
    setSkiLevel('intermediate');
    setUsername('');
    setEmail('');
    setPrefs({ ...DEFAULT_PREFS });
    setStats({ ...DEFAULT_STATS });
    setStartPoint({ ...DEFAULT_START_POINT });
    setAlertsRead(false);
    setResort(null);
  };

  // Boot: restore the persisted session (if any) before the UI renders.
  useEffect(() => {
    (async () => {
      const a = await getSessionAccount();
      if (a) hydrate(a);
      setReady(true);
    })();
  }, []);

  // Persist profile edits back to the signed-in account (debounced to coalesce
  // typing). Runs only after boot and only while signed in.
  useEffect(() => {
    if (!ready || !currentUser || !accountRef.current) return;
    const handle = setTimeout(() => {
      const merged: StoredAccount = {
        ...accountRef.current!,
        username,
        email,
        skiType,
        skiLevel,
        prefs,
        stats,
        alertsRead,
        resortId: resort?.id ?? null,
      };
      accountRef.current = merged;
      void updateAccount(merged);
    }, 350);
    return () => clearTimeout(handle);
  }, [ready, currentUser, username, email, skiType, skiLevel, prefs, stats, alertsRead, resort]);

  const signUp = async (name: string, emailArg: string, password: string) => {
    const a = await authSignUp(name, emailArg, password);
    hydrate(a);
  };

  const signIn = async (emailArg: string, password: string): Promise<boolean> => {
    const a = await authSignIn(emailArg, password);
    hydrate(a);
    return a.resortId != null;
  };

  const signOut = async () => {
    await authSignOut();
    resetToDefaults();
  };

  const deleteAccount = async () => {
    const id = accountRef.current?.id;
    if (id) await authDeleteAccount(id);
    resetToDefaults();
  };

  const changePassword = async (current: string, next: string) => {
    const acct = accountRef.current;
    if (!acct) throw new AuthError('You are not signed in');
    // Keep accountRef in sync so the debounced auto-save doesn't rewrite the old
    // hash back over the new one.
    accountRef.current = await authChangePassword(acct, current, next);
  };

  const value = useMemo<AppState>(
    () => ({
      ready,
      currentUser,
      signUp,
      signIn,
      signOut,
      deleteAccount,
      changePassword,
      onboarded: resort != null,
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
      startPoint,
      setStartPoint,
      alertsRead,
      setAlertsRead,
      resort,
      setResort,
    }),
    [
      ready,
      currentUser,
      skiType,
      skiLevel,
      username,
      email,
      prefs,
      stats,
      startPoint,
      alertsRead,
      resort,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
}
