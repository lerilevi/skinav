import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { fonts, theme } from '../theme';
import { ModalShell } from './ModalShell';

interface DeleteAccountModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

// Type-to-confirm destructive modal. No API yet — on confirm the prototype just
// routes back to welcome (real teardown comes with the Auth sprint).
export function DeleteAccountModal({ visible, onClose, onConfirm }: DeleteAccountModalProps) {
  const [typed, setTyped] = useState('');
  const canDelete = typed === 'DELETE';

  const close = () => {
    setTyped('');
    onClose();
  };

  return (
    <ModalShell visible={visible} onClose={close}>
      <View style={{ paddingHorizontal: 22, paddingTop: 24, alignItems: 'center' }}>
        <View style={styles.warnCircle}>
          <Text style={{ fontSize: 28 }}>⚠️</Text>
        </View>
        <Text style={{ fontSize: 19, fontFamily: fonts.extrabold, color: theme.white }}>
          Delete Account?
        </Text>
        <Text style={styles.body}>
          This will permanently delete your account, stats, saved resorts, and friends list.{'\n'}
          <Text style={{ color: theme.red, fontFamily: fonts.bold }}>This cannot be undone.</Text>
        </Text>
      </View>

      <View style={{ paddingHorizontal: 22, paddingTop: 18, paddingBottom: 10 }}>
        <Text style={styles.confirmHint}>
          Type <Text style={{ color: theme.red, fontFamily: fonts.black }}>DELETE</Text> to confirm
        </Text>
        <TextInput
          value={typed}
          onChangeText={setTyped}
          placeholder="DELETE"
          placeholderTextColor="rgba(255,59,92,0.45)"
          autoCapitalize="characters"
          style={[styles.input, { borderColor: canDelete ? theme.red : 'rgba(255,59,92,0.25)' }]}
        />
      </View>

      <View style={styles.actions}>
        <Pressable onPress={close} style={[styles.btn, styles.keepBtn]}>
          <Text style={styles.keepText}>Keep my account</Text>
        </Pressable>
        <Pressable
          onPress={canDelete ? onConfirm : undefined}
          disabled={!canDelete}
          style={[
            styles.btn,
            { flex: 1.3, backgroundColor: canDelete ? theme.red : 'rgba(255,59,92,0.15)' },
          ]}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: fonts.extrabold,
              color: canDelete ? 'white' : 'rgba(255,59,92,0.45)',
            }}
          >
            Delete Forever
          </Text>
        </Pressable>
      </View>
    </ModalShell>
  );
}

const styles = StyleSheet.create({
  warnCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,59,92,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255,59,92,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  body: {
    fontSize: 13,
    color: theme.gray,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: fonts.regular,
  },
  confirmHint: {
    fontSize: 11,
    fontFamily: fonts.bold,
    color: theme.gray,
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255,59,92,0.08)',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: theme.white,
    fontSize: 15,
    fontFamily: fonts.bold,
    letterSpacing: 2,
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
  keepBtn: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.15)',
  },
  keepText: {
    color: theme.ice,
    fontSize: 14,
    fontFamily: fonts.bold,
  },
});
