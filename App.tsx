import {
  Exo2_400Regular,
  Exo2_600SemiBold,
  Exo2_700Bold,
  Exo2_800ExtraBold,
  Exo2_900Black,
  useFonts,
} from '@expo-google-fonts/exo-2';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from './src/navigation/RootNavigator';
import { AppProvider, useApp } from './src/state/AppContext';
import { theme } from './src/theme';

function Loading() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.navy, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator color={theme.cyan} />
    </View>
  );
}

// Holds rendering until the persisted session has been restored, so we can pick
// the correct initial screen (logged-in users skip the welcome flow).
function Gate() {
  const { ready } = useApp();
  if (!ready) return <Loading />;
  return <RootNavigator />;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Exo2_400Regular,
    Exo2_600SemiBold,
    Exo2_700Bold,
    Exo2_800ExtraBold,
    Exo2_900Black,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="light" />
        <Gate />
      </AppProvider>
    </SafeAreaProvider>
  );
}
