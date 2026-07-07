import type { NavigatorScreenParams } from '@react-navigation/native';

// Bottom-tab routes. Map & Routes are resort-DEPENDENT (deferred) and render
// placeholders for now; Report & Profile are fully ported.
export type MainTabsParamList = {
  Map: undefined;
  Routes: undefined;
  Report: undefined;
  Profile: undefined;
};

// Root stack. Onboarding screens (Welcome → EmailSignup → Profile → Resort)
// stack before the main tabbed app. Alerts / Emergency / Friends are pushed on
// top of the tabs.
export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  EmailSignup: undefined;
  ProfileSetup: undefined;
  // 'onboarding' (default): part of signup, resets into the app on confirm.
  // 'change': reached from Account to switch resort, returns back on confirm.
  Resort: { mode?: 'onboarding' | 'change' } | undefined;
  Main: NavigatorScreenParams<MainTabsParamList> | undefined;
  Alerts: undefined;
  Emergency: undefined;
  Friends: undefined;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
