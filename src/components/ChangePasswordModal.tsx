import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AuthError } from '../services/accounts';
import { useApp } from '../state/AppContext';
import { fonts, theme } from '../theme';
import { ModalShell } from './ModalShell';

interface ChangePasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

// Real password change: client-side validation, then the current password is
// verified against the stored salted hash and a new hash is saved to the
// account (see services/accounts.ts). A wrong current password now surfaces a
// real error — the path the prototype couldn't have.
export function ChangePasswordModal({ visible, onClose }: ChangePasswordModalProps) {
  const { changePassword } = useApp();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const reset = () => {
    setCurrent('');
    setNext('');
    setConfirm('');
    setSubmitted(false);
    setError('');
    setBusy(false);
  };

  const close = () => {
    reset();
    onClose();
  };

  const handleUpdate = async () => {
    if (busy) return;
    setError('');
    if (!current) return setError('Enter your current password');
    if (next.length < 8) return setError('New password must be at least 8 characters');
    if (next !== confirm) return setError("New passwords don't match");
    if (next === current) return setError('New password must be different');
    setBusy(true);
    try {
      await changePassword(current, next);
      setSubmitted(true);
      setTimeout(close, 1400);
    } catch (e) {
      setError(e instanceof AuthError ? e.message : 'Could not update password. Try again.');
      setBusy(false);
    }
  };

  const fields: { label: string; value: string; set: (v: string) => void; placeholder: string }[] = [
    { label: 'CURRENT PASSWORD', value: current, set: setCurrent, placeholder: 'Enter current password' },
    { label: 'NEW PASSWORD', value: next, set: setNext, placeholder: 'At least 8 characters' },
    { label: 'CONFIRM NEW PASSWORD', value: confirm, set: setConfirm, placeholder: 'Retype new password' },
  ];

  return (
    <ModalShell visible={visible} onClose={close}>
      {submitted ? (
        <View style={{ padding: 30, alignItems: 'center' }}>
          <Text style={{ fontSize: 50, marginBottom: 12 }}>✅</Text>
          <Text style={{ fontSize: 18, fontFamily: fonts.extrabold, color: theme.white }}>
            Password updated
          </Text>
          <Text style={{ fontSize: 13, color: theme.gray, marginTop: 4, fontFamily: fonts.regular }}>
            You&apos;re all set
          </Text>
        </View>
      ) : (
        <>
          <View style={{ paddingHorizontal: 22, paddingTop: 20, paddingBottom: 6 }}>
            <Text style={{ fontSize: 18, fontFamily: fonts.extrabold, color: theme.white }}>
              Change Password
            </Text>
            <Text style={{ fontSize: 12, color: theme.gray, marginTop: 4, fontFamily: fonts.regular }}>
              Use at least 8 characters
            </Text>
          </View>
          <View style={{ paddingHorizontal: 22, paddingVertical: 14 }}>
            {fields.map((f) => (
              <View key={f.label} style={styles.field}>
                <Text style={styles.fieldLabel}>{f.label}</Text>
                <TextInput
                  secureTextEntry
                  value={f.value}
                  onChangeText={f.set}
                  placeholder={f.placeholder}
                  placeholderTextColor="rgba(138,170,191,0.5)"
                  style={styles.input}
                />
              </View>
            ))}
            {error ? <Text style={styles.error}>⚠ {error}</Text> : null}
          </View>
          <View style={styles.actions}>
            <Pressable onPress={close} style={[styles.btn, styles.cancelBtn]}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={handleUpdate} disabled={busy} style={{ flex: 1.3 }}>
              <LinearGradient
                colors={[theme.blue, theme.cyan]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.btn, styles.confirmBtn, busy && { opacity: 0.7 }]}
              >
                <Text style={styles.confirmText}>{busy ? 'Updating…' : 'Update Password'}</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </>
      )}
    </ModalShell>
  );
}

const styles = StyleSheet.create({
  field: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.12)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 9,
    color: theme.gray,
    fontFamily: fonts.bold,
    letterSpacing: 1.5,
  },
  input: {
    color: theme.white,
    fontSize: 14,
    fontFamily: fonts.semibold,
    paddingTop: 3,
  },
  error: {
    fontSize: 12,
    color: theme.red,
    paddingVertical: 4,
    paddingHorizontal: 2,
    fontFamily: fonts.semibold,
  },
  actions: {
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.15)',
  },
  cancelText: {
    color: theme.ice,
    fontSize: 14,
    fontFamily: fonts.bold,
  },
  confirmBtn: {
    flex: undefined,
  },
  confirmText: {
    color: theme.white,
    fontSize: 14,
    fontFamily: fonts.extrabold,
  },
});
