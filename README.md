# SkiNav (React Native)

Native build of the SkiNav prototype — "Google Maps for the mountain." Expo +
TypeScript + React Navigation. This repo ports the **resort-independent** screens
from the React prototype (`skinav.jsx`); the map engine, GPS, routing, and resort
data come in later sprints (see `SKINAV_NOTES_EN.md`).

## Prerequisites

- **Node.js 18+** (LTS recommended) and npm. _Not currently installed on this
  machine_ — install it first (e.g. `winget install OpenJS.NodeJS.LTS`), then
  reopen the terminal.
- For device testing: the **Expo Go** app (iOS/Android), or an emulator.

## Setup

```bash
npm install
# Align native dependency versions to the installed Expo SDK:
npx expo install --fix
```

## Run

```bash
npm start          # Expo dev server + QR code
npm run android    # open on Android emulator/device
npm run ios        # open on iOS simulator (macOS only)
npm run web        # open in browser
npm run typecheck  # tsc --noEmit
```

## What's built (resort-independent)

Per the build order in `SKINAV_NOTES_EN.md` → "Port the prototype UI":

| Screen | File | Notes |
| --- | --- | --- |
| Welcome | `src/screens/WelcomeScreen.tsx` | Apple/Google/email entry (no real OAuth yet) |
| Email Signup | `src/screens/EmailSignupScreen.tsx` | Local validation only |
| Profile Setup | `src/screens/ProfileSetupScreen.tsx` | Onboarding step 1 of 2 |
| Resort Selection | `src/screens/ResortScreen.tsx` | Pickable catalog (no piste data) |
| Account / Profile | `src/screens/AccountScreen.tsx` | Editable lifted state + modals |
| Friends | `src/screens/FriendsScreen.tsx` | Share-location toggle, stubs for add/locate |
| Alerts | `src/screens/AlertsScreen.tsx` | Filter tabs, dismiss, mark-read |
| Report | `src/screens/ReportScreen.tsx` | Issue type grid + submit |
| Emergency | `src/screens/EmergencyScreen.tsx` | Call/share buttons are stubs |

Shared: lifted app state (`src/state/AppContext.tsx` — skiType, skiLevel,
username, email, prefs, startPoint, alertsRead), theme tokens (`src/theme.ts`),
demo data (`src/data/`), and navigation (`src/navigation/`).

## Deferred (resort-DEPENDENT — not built yet)

The **Map** and **Routes** bottom-tabs render placeholder screens explaining
why. These need the parts the task intentionally excludes:

- Map engine (MapLibre GL) + device GPS
- Pulled OSM piste/lift data for a chosen resort
- The routing graph + hub gap-filling ("the moat")
- Turn-by-turn navigation, route options, popular runs

## Architecture

- **Navigation:** a root native-stack (Welcome → EmailSignup → ProfileSetup →
  Resort → Main) with the four-tab `MainTabs` (Map · Routes · Report · Profile)
  as `Main`. Alerts, Emergency, and Friends are pushed over the tabs.
- **State:** single `AppProvider` context. No persistence yet (a refresh resets
  to defaults, exactly like the prototype) — that's the Backend sprint.
- **Fonts:** Exo 2 via `@expo-google-fonts/exo-2`, loaded in `App.tsx`.
- **Theme:** dark-navy / cyan, ported 1:1 from the prototype.
