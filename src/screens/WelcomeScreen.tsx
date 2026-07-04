import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

import { Screen } from '../components/Screen';
import { fonts, theme } from '../theme';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

// SCREEN 1 — Welcome / sign-up entry.
// Email creates a real on-device account. Apple/Google are honest stubs for now
// (real OAuth needs a cloud backend + dev accounts). "Sign in" goes to login.
export function WelcomeScreen() {
  const navigation = useNavigation<Nav>();

  const onSignup = (method: 'apple' | 'google' | 'email') => {
    if (method === 'email') {
      navigation.navigate('EmailSignup');
      return;
    }
    const provider = method === 'apple' ? 'Apple' : 'Google';
    Alert.alert(
      `${provider} sign-in coming soon`,
      'Social login needs a cloud backend and is on the roadmap. For now, sign up with email.',
      [
        { text: 'Not now', style: 'cancel' },
        { text: 'Use email', onPress: () => navigation.navigate('EmailSignup') },
      ],
    );
  };

  return (
    <Screen>
      <View style={styles.root}>
        {/* Hero glow */}
        <LinearGradient
          colors={['rgba(30,111,217,0.35)', 'transparent']}
          start={{ x: 0.6, y: 0 }}
          end={{ x: 0.6, y: 0.65 }}
          style={StyleSheet.absoluteFill}
        />
        {/* Mountain silhouette */}
        <View style={styles.mountainWrap} pointerEvents="none">
          <Svg viewBox="0 0 375 200" width="100%" height="100%" preserveAspectRatio="none">
            <Polygon
              points="0,200 80,60 140,110 200,40 270,90 320,50 375,80 375,200"
              fill={theme.blueLight}
            />
            <Polygon
              points="0,200 60,80 110,120 160,55 220,100 375,70 375,200"
              fill={theme.cyan}
              opacity={0.5}
            />
          </Svg>
        </View>

        <View style={styles.content}>
          {/* Logo */}
          <Text style={styles.tagline}>⛷ NAVIGATE THE MOUNTAIN</Text>
          <Text style={styles.logo}>
            Ski<Text style={{ color: theme.cyan }}>Nav</Text>
          </Text>
          <Text style={styles.sub}>
            Real-time ski resort navigation. Find your route, avoid queues, ski smarter.
          </Text>

          {/* Apple */}
          <Pressable onPress={() => onSignup('apple')} style={[styles.socialBtn, styles.appleBtn]}>
            <Text style={styles.appleText}> Continue with Apple</Text>
          </Pressable>

          {/* Google */}
          <Pressable onPress={() => onSignup('google')} style={[styles.socialBtn, styles.googleBtn]}>
            <Text style={styles.googleText}>Continue with Google</Text>
          </Pressable>

          {/* Email (gradient) */}
          <Pressable onPress={() => onSignup('email')}>
            <LinearGradient
              colors={[theme.blue, theme.cyan]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.socialBtn, styles.emailBtn]}
            >
              <Text style={styles.emailText}>✉ Sign up with Email</Text>
            </LinearGradient>
          </Pressable>

          {/* Sign in */}
          <View style={styles.signinRow}>
            <Text style={styles.signinText}>Already have an account? </Text>
            <Pressable onPress={() => navigation.navigate('SignIn')} hitSlop={8}>
              <Text style={styles.signinLink}>Sign in</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end', overflow: 'hidden' },
  mountainWrap: {
    position: 'absolute',
    bottom: 200,
    left: 0,
    right: 0,
    height: 200,
    opacity: 0.12,
  },
  content: { paddingHorizontal: 26, paddingBottom: 24 },
  tagline: {
    fontSize: 12,
    fontFamily: fonts.bold,
    letterSpacing: 4,
    color: theme.cyan,
    marginBottom: 4,
  },
  logo: {
    fontSize: 52,
    fontFamily: fonts.black,
    letterSpacing: -2,
    color: theme.white,
    lineHeight: 56,
  },
  sub: {
    color: theme.gray,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 26,
    fontFamily: fonts.regular,
  },
  socialBtn: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  appleBtn: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  appleText: { color: 'white', fontSize: 15, fontFamily: fonts.bold },
  googleBtn: { backgroundColor: 'white' },
  googleText: { color: '#1a1a1a', fontSize: 15, fontFamily: fonts.bold },
  emailBtn: { marginBottom: 0 },
  emailText: { color: theme.white, fontSize: 15, fontFamily: fonts.bold, letterSpacing: 0.3 },
  signinRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signinText: { fontSize: 13, color: theme.gray, fontFamily: fonts.regular },
  signinLink: { fontSize: 13, color: theme.cyan, fontFamily: fonts.bold },
});
