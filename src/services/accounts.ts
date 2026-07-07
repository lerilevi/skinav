import * as Crypto from 'expo-crypto';

import { getJSON, setJSON } from './storage';
import type { Prefs, StoredAccount } from '../types';

// ── Local account store ──────────────────────────────────────────────────
// A real-ish auth layer backed entirely by the device (AsyncStorage). Accounts
// are kept in a single map keyed by a stable random id; the session record holds
// the id of the currently signed-in account. Passwords are salted + SHA-256
// hashed — never stored in plaintext. This is not server-grade security (no
// rate-limiting, hashing is single-pass) but it's a genuine credential flow that
// persists across app restarts, and swaps cleanly for a cloud backend later.

const ACCOUNTS_KEY = 'skinav:accounts';
const SESSION_KEY = 'skinav:session';

type AccountMap = Record<string, StoredAccount>;

export const DEFAULT_PREFS: Prefs = {
  metric: true,
  voice: true,
  shareLocation: false,
  notifications: true,
};

export class AuthError extends Error {}

async function loadAccounts(): Promise<AccountMap> {
  return (await getJSON<AccountMap>(ACCOUNTS_KEY)) ?? {};
}

async function saveAccounts(map: AccountMap): Promise<void> {
  await setJSON(ACCOUNTS_KEY, map);
}

async function hashPassword(password: string, salt: string): Promise<string> {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `${salt}:${password}`);
}

const normalize = (email: string) => email.trim().toLowerCase();

function deriveUsername(name: string): string {
  return name.trim().split(/\s+/).join('').toLowerCase() || 'skier';
}

// Create a new account and return it. Throws AuthError if the email is taken.
export async function signUp(
  name: string,
  email: string,
  password: string,
): Promise<StoredAccount> {
  const accounts = await loadAccounts();
  const normEmail = normalize(email);
  if (Object.values(accounts).some((a) => normalize(a.email) === normEmail)) {
    throw new AuthError('An account with that email already exists');
  }

  const salt = Crypto.randomUUID();
  const account: StoredAccount = {
    id: Crypto.randomUUID(),
    name: name.trim(),
    email: email.trim(),
    passwordHash: await hashPassword(password, salt),
    salt,
    createdAt: Date.now(),
    username: deriveUsername(name),
    skiType: 'skier',
    skiLevel: 'intermediate',
    prefs: { ...DEFAULT_PREFS },
    stats: { days: 0, runs: 0, km: 0, vertM: 0 },
    resortId: null,
    alertsRead: false,
  };

  accounts[account.id] = account;
  await saveAccounts(accounts);
  await setJSON(SESSION_KEY, account.id);
  return account;
}

// Validate credentials, start a session, and return the account.
export async function signIn(email: string, password: string): Promise<StoredAccount> {
  const accounts = await loadAccounts();
  const normEmail = normalize(email);
  const account = Object.values(accounts).find((a) => normalize(a.email) === normEmail);
  if (!account) {
    throw new AuthError('No account found for that email');
  }
  const hash = await hashPassword(password, account.salt);
  if (hash !== account.passwordHash) {
    throw new AuthError('Incorrect password');
  }
  await setJSON(SESSION_KEY, account.id);
  return account;
}

export async function signOut(): Promise<void> {
  await setJSON(SESSION_KEY, null);
}

// Load the account tied to the active session (or null if signed out).
export async function getSessionAccount(): Promise<StoredAccount | null> {
  const id = await getJSON<string | null>(SESSION_KEY);
  if (!id) return null;
  const accounts = await loadAccounts();
  return accounts[id] ?? null;
}

// Persist edits to an existing account (profile fields, prefs, stats, resort…).
export async function updateAccount(account: StoredAccount): Promise<void> {
  const accounts = await loadAccounts();
  if (!accounts[account.id]) return;
  accounts[account.id] = account;
  await saveAccounts(accounts);
}

// Verify the current password and set a new one (fresh salt + hash). Throws
// AuthError if the current password is wrong. Returns the updated account so the
// caller can keep its in-memory copy in sync.
export async function changePassword(
  account: StoredAccount,
  currentPassword: string,
  newPassword: string,
): Promise<StoredAccount> {
  const currentHash = await hashPassword(currentPassword, account.salt);
  if (currentHash !== account.passwordHash) {
    throw new AuthError('Current password is incorrect');
  }
  const salt = Crypto.randomUUID();
  const updated: StoredAccount = {
    ...account,
    salt,
    passwordHash: await hashPassword(newPassword, salt),
  };
  await updateAccount(updated);
  return updated;
}

// Permanently remove an account and end its session.
export async function deleteAccount(id: string): Promise<void> {
  const accounts = await loadAccounts();
  delete accounts[id];
  await saveAccounts(accounts);
  await setJSON(SESSION_KEY, null);
}
