import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { GradientButton } from '../components/GradientButton';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import { AuthError } from '../services/accounts';
import { useApp } from '../state/AppContext';
import { fonts, theme } from '../theme';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// SCREEN 11 — Email signup. Validates, then creates a real on-device account
// (salted-hash password) and signs the user in before continuing to onboarding.
export function EmailSignupScreen() {
  const navigation = useNavigation<Nav>();
  const { signUp } = useApp();

  const [fullName, setFullName] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const emailValid = EMAIL_RE.test(emailVal);
  const canContinue =
    fullName.trim().length >= 2 && emailValid && password.length >= 8 && agree && !busy;

  const handleNext = async () => {
    setError('');
    if (fullName.trim().length < 2) return setError('Please enter your full name');
    if (!emailValid) return setError('Please enter a valid email address');
    if (password.length < 8) return setError('Password must be at least 8 characters');
    if (!agree) return setError('Please accept the terms to continue');
    setBusy(true);
    try {
      await signUp(fullName, emailVal, password);
      navigation.navigate('ProfileSetup');
    } catch (e) {
      setError(e instanceof AuthError ? e.message : 'Could not create your account. Try again.');
      setBusy(false);
    }
  };

  const fields: {
    label: string;
    value: string;
    set: (v: string) => void;
    placeholder: string;
    secure?: boolean;
    email?: boolean;
  }[] = [
    { label: 'FULL NAME', value: fullName, set: setFullName, placeholder: 'John Smith' },
    { label: 'EMAIL', value: emailVal, set: setEmailVal, placeholder: 'you@example.com', email: true },
    { label: 'PASSWORD', value: password, set: setPassword, placeholder: 'At least 8 characters', secure: true },
  ];

  return (
    <Screen>
      <Header
        title="Sign up with Email"
        eyebrow="Create account"
        onBack={() => navigation.goBack()}
        borderless
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={styles.intro}>
            Just a few details and we&apos;ll tailor the mountain to you.
          </Text>

          {fields.map((f) => (
            <View key={f.label} style={styles.field}>
              <Text style={styles.fieldLabel}>{f.label}</Text>
              <TextInput
                value={f.value}
                onChangeText={f.set}
                placeholder={f.placeholder}
                placeholderTextColor="rgba(138,170,191,0.5)"
                secureTextEntry={f.secure}
                autoCapitalize={f.email ? 'none' : f.secure ? 'none' : 'words'}
                keyboardType={f.email ? 'email-address' : 'default'}
                style={styles.input}
              />
            </View>
          ))}

          {password.length > 0 && password.length < 8 ? (
            <Text style={styles.hint}>
              {8 - password.length} more character{8 - password.length === 1 ? '' : 's'} needed
            </Text>
          ) : null}

          {/* Terms */}
          <Pressable onPress={() => setAgree((a) => !a)} style={styles.termsRow}>
            <View style={[styles.checkbox, agree && styles.checkboxOn]}>
              {agree ? <Text style={styles.checkmark}>✓</Text> : null}
            </View>
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </Pressable>

          {error ? <Text style={styles.error}>⚠ {error}</Text> : null}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <GradientButton
          label={busy ? 'Creating account…' : 'Continue →'}
          onPress={handleNext}
          disabled={!canContinue}
          fontSize={15}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 24 },
  intro: { fontSize: 13, color: theme.gray, lineHeight: 20, marginBottom: 20, fontFamily: fonts.regular },
  field: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(59,158,255,0.12)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
  },
  fieldLabel: { fontSize: 10, color: theme.gray, fontFamily: fonts.bold, letterSpacing: 1.5 },
  input: { color: theme.white, fontSize: 15, fontFamily: fonts.semibold, paddingTop: 3 },
  hint: { fontSize: 11, color: theme.orange, paddingHorizontal: 4, paddingBottom: 8, fontFamily: fonts.regular },
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 12, marginTop: 4 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginTop: 1,
    borderWidth: 1.5,
    borderColor: 'rgba(138,170,191,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: { backgroundColor: theme.cyan, borderColor: theme.cyan },
  checkmark: { color: theme.navy, fontSize: 13, fontFamily: fonts.black },
  termsText: { flex: 1, fontSize: 12, color: theme.gray, lineHeight: 19, fontFamily: fonts.regular },
  termsLink: { color: theme.cyan, fontFamily: fonts.bold },
  error: { fontSize: 12, color: theme.red, paddingVertical: 6, paddingHorizontal: 2, fontFamily: fonts.semibold },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(59,158,255,0.1)',
  },
});
