import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { fonts, theme } from '../theme';
import { AccountScreen } from '../screens/AccountScreen';
import { ReportScreen } from '../screens/ReportScreen';
import { MapPlaceholderScreen } from '../screens/MapPlaceholderScreen';
import { RoutesPlaceholderScreen } from '../screens/RoutesPlaceholderScreen';
import type { MainTabsParamList } from './types';

const Tab = createBottomTabNavigator<MainTabsParamList>();

const ICONS: Record<keyof MainTabsParamList, string> = {
  Map: '🗺',
  Routes: '⚡',
  Report: '⚠️',
  Profile: '👤',
};

function TabIcon({ name, focused }: { name: keyof MainTabsParamList; focused: boolean }) {
  return (
    <View style={styles.tabItem}>
      <Text style={styles.tabIcon}>{ICONS[name]}</Text>
      <Text style={[styles.tabLabel, { color: focused ? theme.cyan : theme.gray }]}>
        {name === 'Profile' ? 'Profile' : name}
      </Text>
    </View>
  );
}

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        sceneStyle: { backgroundColor: theme.navy },
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: theme.cyan,
        tabBarInactiveTintColor: theme.gray,
      }}
    >
      <Tab.Screen
        name="Map"
        component={MapPlaceholderScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon name="Map" focused={focused} /> }}
      />
      <Tab.Screen
        name="Routes"
        component={RoutesPlaceholderScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon name="Routes" focused={focused} /> }}
      />
      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon name="Report" focused={focused} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={AccountScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon name="Profile" focused={focused} /> }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.navyMid,
    borderTopWidth: 1,
    borderTopColor: 'rgba(59,158,255,0.12)',
    height: 64,
    paddingTop: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    width: 64,
  },
  tabIcon: {
    fontSize: 18,
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: fonts.bold,
    letterSpacing: 0.5,
  },
});
