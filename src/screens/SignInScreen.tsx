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

// Real login against the on-device account store. On success it reset-navigates
// into the app (onboarded) or resumes onboarding, so the back button can't
// return to the login form.
export function SignInScreen() {
  const navigation = useNavigation<Nav>();
  const { signIn } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const canSubmit = email.trim().length > 0 && password.length > 0 && !busy;

  const handleSignIn = async () => {
    if (busy) return;
    setError('');
    setBusy(true);
    try {
      const onboarded = await signIn(email, password);
      navigation.reset({
        index: 0,
        routes: [{ name: onboarded ? 'Main' : 'ProfileSetup' }],
      });
    } catch (e) {
      setError(e instanceof AuthError ? e.message : 'Could not sign in. Please try again.');
      setBusy(false);
    }
  };

  return (
    <Screen>
      <Header
        title="Sign in"
        eyebrow="Welcome back"
        onBack={() => navigation.goBack()}
        borderless
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={styles.intro}>Sign in to pick up where you left off.</Text>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>EMAIL</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor="rgba(138,170,191,0.5)"
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>PASSWORD</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Your password"
              placeholderTextColor="rgba(138,170,191,0.5)"
              secureTextEntry
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          {error ? <Text style={styles.error}>⚠ {error}</Text> : null}

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>New here? </Text>
            <Pressable onPress={() => navigation.navigate('EmailSignup')} hitSlop={8}>
              <Text style={styles.signupLink}>Create an account</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <GradientButton
          label={busy ? 'Signing in…' : 'Sign in →'}
          onPress={handleSignIn}
          disabled={!canSubmit}
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
  input: { color: theme.white, fontSize: 15, fontFamily: fonts.semibold, paddingTop: 3, padding: 0 },
  error: { fontSize: 12, color: theme.red, paddingVertical: 6, paddingHorizontal: 2, fontFamily: fonts.semibold },
  signupRow: { flexDirection: 'row', marginTop: 8, paddingHorizontal: 2 },
  signupText: { fontSize: 13, color: theme.gray, fontFamily: fonts.regular },
  signupLink: { fontSize: 13, color: theme.cyan, fontFamily: fonts.bold },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(59,158,255,0.1)',
  },
});
