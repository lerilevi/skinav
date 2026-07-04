import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useApp } from '../state/AppContext';
import { theme } from '../theme';
import { AlertsScreen } from '../screens/AlertsScreen';
import { EmailSignupScreen } from '../screens/EmailSignupScreen';
import { EmergencyScreen } from '../screens/EmergencyScreen';
import { FriendsScreen } from '../screens/FriendsScreen';
import { ProfileSetupScreen } from '../screens/ProfileSetupScreen';
import { ResortScreen } from '../screens/ResortScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { MainTabs } from './MainTabs';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.navy,
    card: theme.navyMid,
    text: theme.white,
    border: 'rgba(59,158,255,0.12)',
    primary: theme.cyan,
  },
};

export function RootNavigator() {
  const { currentUser, onboarded } = useApp();

  // Pick the cold-start screen from the restored session: fully onboarded users
  // land in the app; a signed-in-but-unfinished user resumes onboarding;
  // everyone else starts at Welcome.
  const initialRouteName: keyof RootStackParamList = currentUser
    ? onboarded
      ? 'Main'
      : 'ProfileSetup'
    : 'Welcome';

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.navy },
          animation: 'slide_from_right',
        }}
      >
        {/* Onboarding flow (no bottom tabs) */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="EmailSignup" component={EmailSignupScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="Resort" component={ResortScreen} />

        {/* Main tabbed app */}
        <Stack.Screen name="Main" component={MainTabs} />

        {/* Pushed over the tabs */}
        <Stack.Screen
          name="Alerts"
          component={AlertsScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="Emergency"
          component={EmergencyScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen name="Friends" component={FriendsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
