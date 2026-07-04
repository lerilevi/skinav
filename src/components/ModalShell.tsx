import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { theme } from '../theme';

interface ModalShellProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// Centered card on a blurred-dark scrim. Tapping the scrim closes; tapping the
// card does not. Mirrors the prototype's ModalShell.
export function ModalShell({ visible, onClose, children }: ModalShellProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.scrim} onPress={onClose}>
        <Pressable style={styles.card} onPress={() => {}}>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(4,10,20,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.navyMid,
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.2)',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 24 },
    shadowRadius: 60,
    elevation: 24,
  },
});
