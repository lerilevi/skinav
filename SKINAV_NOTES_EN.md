# SkiNav — Known Limitations & Future Work

A running log of things that are prototyped/stubbed and will need real implementation later. Organized by category so you can tackle them in themed sprints.

> This file is kept identical in content to its Turkish twin, `SKINAV_NOTES_TR.md`. Any addition to one is added to the other.

---

## 🔌 Backend / Persistence

These exist visually but don't persist anywhere. Every one of them will need a real API + storage layer.

- **Account fields** (username, email, password) — state lives in root React state. No auth, no database. A refresh wipes everything.
- **Alert data** is hardcoded inline in `SkiNav` root. The shape (`category`, `severity`, `source`, `reportCount`, `actions`) is already aligned with what a real API would return — wire it up by replacing the inline array with a fetch.
- **Popular Runs data** is hardcoded. Same shape-aligned-for-backend pattern (creator, creatorType, difficulty, rating, reviews).
- **Review counts** on Popular Runs are static numbers. When a real rating backend is added, tapping a star should increment the count and adjust the average.
- **Recent Destinations** is hardcoded in `RoutesScreen`. In reality this should come from a per-user history that gets appended to every time the user navigates to a destination.
- **User ratings** on Popular Runs are local to `RoutesScreen` — they reset if you navigate away and come back. To persist across the session, lift the `userRatings` dict to root state (like `skiType` / `skiLevel` / `prefs`). For persistence across sessions, wire to backend.
- **Photo upload** (Account screen 📷 button) is visual-only. Browser `<input type="file">` works but artifacts in Claude.ai can't persist uploads, so it only works in your real build.
- **Logout** also resets the "alerts read" state, so the next session starts with the alert badge active again. That behavior is fine for the demo but revisit when you have real sessions.

---

## 🔐 Auth

- **Apple / Google signup buttons** go straight to profile onboarding. No real OAuth flow yet. When you wire real auth, these need to trigger the respective OAuth dialog, receive a token, and pre-fill email/name from the response.
- **Sign in link** on welcome skips straight to the resort screen. No actual authentication check.
- **CHANGE password modal** validates locally but doesn't hit an API. Currently there's no "current password is wrong" error path because there's no server to verify against.
- **Delete account confirmation** on success just routes back to welcome. Real implementation needs an API call, loading state, error handling, and session teardown.

---

## 🧭 Navigation Screen (hardcoded steps)

This is the biggest thing to fix when you get serious:

- **NavigationScreen** still shows hardcoded Altitude Restaurant steps regardless of which route or run you start. Pass the run/route into `NavigationScreen` as a prop and render its actual `steps` array.
- **Start point** isn't visible on the NavigationScreen header. If you want users to see "From: Altitude Restaurant → To: Matterhorn" during the run, that's a straightforward add once steps are dynamic.
- **Step advancement** is manual (Next Step button). Real navigation would detect GPS proximity to each waypoint and auto-advance.
- **Two-stage "navigate to start then start run" flow** is shown in the confirm modal UI ("Navigate to Starting Point" button label) but isn't actually a two-stage navigation in practice — NavigationScreen just shows its hardcoded steps. Real implementation should: (1) navigate to run's startLocation, (2) detect arrival, (3) prompt "You've arrived at the starting point — begin the run?", (4) then start the run's own step-by-step guidance.
- **"At starting point" detection** currently uses a simple string-match between `startPoint.name` and `run.startLocation.name`. Real GPS would use proximity (e.g., within 50m of the run's start coordinates). String matching means typing a custom start point that differs by even one character will always read as "not at starting point".

---

## 🗺️ Map Screen

- **Map is static SVG art**, not a real map. For production you'd integrate Mapbox GL / Leaflet / MapLibre with real piste map tiles.
- **Tapping points on the map (POI tap)** — coordinates are hand-placed to match the SVG markers. Because the map is static art with `preserveAspectRatio="slice"`, tap targets line up with the drawn markers but aren't derived from real geography. On a real map (Mapbox/MapLibre) you'd get tap→coordinate for free.
- **Location card (popup)** anchors above the search bar (bottom-sheet style) rather than floating exactly at the tapped pin — this is the reliable, Google-Maps-style pattern and avoids fragile SVG→screen coordinate math.
- **`pointer-events: none` on the top bar and bottom gradient containers** (re-enabled on their buttons), so map taps register even underneath those overlays. If you add new overlay UI on the map, remember to give interactive children `pointerEvents: "auto"`.
- **My Location button (◎)** — because the map is static SVG art, it can't literally pan/scroll the view to your position the way a real map would; your dot is at a fixed point. The button does the prototype-honest version: dismisses overlays (selected pin, search) and fires a one-shot pulse ring on your location dot. On a real map engine this button would call something like `map.flyTo(userCoords)` to actually recenter.
- **User location pulse** is at a fixed coordinate (190, 200 in SVG space). Real implementation needs GPS → map-projection math.
- **On-map alert markers** (icy patch, queue) are hardcoded. Should render dynamically from the alerts data.
- **Layer toggles** (Runs/Lifts/POIs) work within the static SVG but there's no "filter by difficulty" or "show only my level" option yet — could be useful given the level-warning feature.
- **Weather widget data** is hardcoded. Needs a weather API (OpenWeather, Meteomatics for mountain-specific data).

---

## 🎨 Layout / UI polish

- **Weather widget** expands to ~260px wide and may overlap the search bar on shorter phone frames. Currently positioned at `top: 66`, stays clear of the top bar and above the bottom controls. If you change the frame height, re-check spacing.
- **Bottom nav** at 4 items is fine. If you add more screens, consider that 5+ items get cramped on 375px.
- **FROM pulse dot** on the FromToBlock is a static `boxShadow` glow, not a real animation. If you want it to pulse, add a CSS `@keyframes` with `box-shadow` scaling.

---

## 📝 Stubs (buttons that don't do anything yet)

- **"Clear history"** link on Recent Destinations tab
- **"Share location with contact"** button on Emergency screen
- **"View status" / "Alt. route" / "View on map" / "Confirm" / "See alternatives"** action buttons on alert cards
- **"Add friend — Invite"** button on Friends screen
- **"QR code"** mention for add-friend flow (no QR generation yet)
- **Call buttons** on Emergency (Ski Patrol 1414, Emergency 112) — would need `tel:` links or native phone API
- **📷 avatar photo upload** on Account
- **🎯 Locate on map** buttons on each friend card (would pan the map to their position)

---

## 🔀 State that should probably be lifted

Currently local-to-component, but might make sense at root when you add persistence:

- **`userRatings`** in `RoutesScreen` (Popular Runs ratings)
- **`dismissed`** alerts in `AlertsScreen` (dismissing then navigating away un-dismisses)
- **`layers`** (Runs/Lifts/POIs toggles) in `MapScreen` — probably fine as local, but a user preference to "always hide amenities" would live at root
- **`weatherOpen`** — fine as local

---

## 🎯 Nice-to-haves that came up in conversation

Ideas discussed but not built yet:

- **Change-password flow with real "current password is wrong" server error** (currently only client-side validation)
- **Email verification step** after email signup (send confirmation email)
- **QR code generation** on Profile for the add-friend flow
- **Friends on the map** — friends' positions shown as markers on the main map screen (friends data already has lat-adjacent info)
- **Filter pistes by difficulty** on the map layer toggle (useful with level warning feature)
- **Navigate to a friend** — tap a friend's 🎯 button → pick route to their current position
- **Save favorite Popular Runs** — heart icon, "My Saved Runs" tab
- **Push notification preferences** — currently just a single toggle, could be granular (urgent only / lift status / weather / etc.)
- **Language / locale** preference in Account preferences
- **Offline map download** — the "DOWNLOADED" badge exists on Zermatt in resort selection but has no real mechanism

---

*Last updated: after adding the My Location button + layers-toggle clarification.*

---

## 🚀 Roadmap / Go-to-Market

How SkiNav moves from prototype to a real, testable product. (Drafted from the map-data + launch-planning discussion.)

### Map data — where the maps come from
- **Source: OpenSnowMap or OpenStreetMap (OSM).** No need to license expensive commercial map data. OSM ski coverage (`piste:type=downhill`, `aerialway=chair_lift`, etc.) is generally very good; OpenSnowMap renders that same OSM piste/lift data specifically for skiing. Both are free and auto-pullable.
- **Alternative: partner with resorts** for their official maps — more accurate, but you must convince each resort one by one. A long-term model; too heavy to start with.
- **Extraction:** pull the target resort's pistes + lifts with **Overpass Turbo** (query by bounding box), export the data.
- **Rendering:** turn it into map tiles (Mapbox) or render OSM data directly in a map engine. **MapLibre GL** is the free/open option; **Mapbox GL** is the paid/managed alternative.
- **Elevation / 3D view:** combine OSM with **NASA SRTM elevation data** for the "three-quarter paper-map view" and to correct one-way lift/piste direction (knowing which end is higher).
- **Caveat:** OSM tags are user-generated and inconsistent — gaps from resort to resort. This is why we start with ONE well-mapped resort.

### The routing brain — our actual differentiator
- OSM gives the map; it does NOT give turn-by-turn routing for free.
- Maps usually have no explicit connection at "hubs" (where many lifts + pistes terminate). The app must **intelligently create artificial connections and fill the gaps** to route across lifts and pistes.
- This gap-filling + routing logic is the real moat — it's what makes SkiNav "Google Maps for the mountain" vs. Slopes being a fitness tracker.

### Which resort to start testing
- Pick **one** small-to-mid resort with excellent OSM coverage that the test team can physically reach.
- Criteria: good OSM data + manageable lift/piste count + real access for testers.
- Current prototype uses Zermatt (big, complex, great data — but a lot to map/test for a first run). Consider a smaller resort for the very first field test.
- (Israel-based founder → realistic field-test window is an Alps trip.)

### Who tests (in order)
1. **You + a few skiing friends** — on-mountain, phones in pockets. Does GPS hold at speed? Does routing make sense?
2. **A friendly ski instructor / ski-school contact** — will immediately flag wrong routing logic.
3. **A small beta group** recruited at the resort.

### Sequenced next steps
1. Pick the launch resort; pull its OSM piste/lift data (Overpass Turbo).
2. Get it rendering in a real map engine (MapLibre).
3. Build the routing graph + hub gap-filling logic (the moat).
4. Wire real GPS to the map (hard part: tracking accuracy at speed).
5. Field test with the tiers above.
- **Handoff point:** this is where the React prototype hands off to native mobile development — GPS-at-speed and offline maps need native.

### Open / to confirm
- **Naming:** there is already an iOS app called "Ski Nav" built on OSM data (an OSM community project). Check trademark/positioning before committing to the name.
### ✅ DECIDED (June 2026) — direction is now set
- **First user: the founder + friends.** → This points to a **B2C** starting path: build something you and your friends use on your next trip, no resort sign-off needed. B2B / resort partnership can come later once there's real usage to show.
- **Which resort: decided by the next actual ski trip.** No need to pick abstractly — whenever the group books a trip, that destination becomes the test resort, provided it has decent OpenStreetMap / OpenSnowMap coverage (most established Alps resorts do).
- **Monetization: deferred (safe).** For a friends-and-family test you don't need a business model yet — it just needs to work on the mountain. Revenue thinking waits until the first real test proves it useful.
- **Net effect: no longer blocked.** The "settle this before building more" item is resolved enough to proceed.

### The 3 questions to settle BEFORE more building (from the Turkish planning chat)
The most valuable thing right now is answering these, because the map/launch decision affects everything — how the app works, how complex it is, and how it makes money. Don't go deeper technically until these are clear:
1. **Which resort to start with?** Somewhere the founder has been / knows well.
2. **Who is the first user?** Friends? A ski community?
3. **How does it make money?** Sell to resorts (B2B)? User subscription (B2C)? — *open, not yet decided.*

### Confirmed in the Turkish chat
- **What SkiNav does (founder's framing):** in your resort, you mark or type your destination and it shows which lift to take and which piste alternatives exist — making wayfinding on the map easy.
- **Target user:** all levels — beginners ("can I handle a red?") and experienced skiers (fastest route, skip lift queues).
- **Map entry:** founder will NOT hand-enter resort data — it must be pulled automatically or requested from resorts.
- **Offline/online split (confirmed):** map downloadable for offline use; alerts (piste closed, lift stopped) need internet. Clean rule: **map offline, live info online.**
- **Process note:** settle the 3 questions above first; that clarifies what to design next and *when to move from the prototype to Claude Code* (native build).


---

## 🛠️ Native Build Brief (for Claude Code)

> The chat interface (where the prototype was built) can't build the native app. Do this work in **Claude Code** — the agentic tool that works in a real file system + terminal. Bring `skinav.jsx` and these notes as the spec.

### ✅ DECIDED: React Native (June 2026)
- **Framework: React Native** (JS/TS). Chosen over Flutter because the prototype is already React — same language, same component/state model, so screens, navigation flow, and state largely carry over instead of being rewritten in Dart.
- Tradeoff accepted: Flutter's self-drawn rendering is marginally smoother for map-heavy/animation apps, but not decisive — React Native runs serious map apps fine, and the continuity wins for a solo founder.

### Build order — resort-independent parts first
These don't need map data or a chosen resort. Safe to build now:
1. **Project setup** — React Native project (Expo is the easiest start), TypeScript, navigation library (React Navigation).
2. **Port the prototype UI** — recreate the screens from `skinav.jsx`: Welcome, Email Signup, Profile Setup, Resort Selection, Account, Friends, Alerts, Report, Emergency. Reuse the dark-navy/cyan theme + Exo 2 font.
3. **State & navigation** — port the lifted state (skiType, skiLevel, username, email, prefs, startPoint) and the screen routing.
4. **Auth** — wire real authentication (Apple / Google / email). This is where the stubbed signup buttons become real.
5. **Map engine + GPS** — get **MapLibre GL** (free/open) rendering *any* base map, and wire real device GPS to show the user's live position. (Can use a generic map here — doesn't need the ski resort yet.)

### Resort-DEPENDENT parts — come after a resort is chosen
Hold these until the next ski trip picks the resort (and its OSM coverage is checked):
6. **Pull resort data** — OSM/OpenSnowMap pistes + lifts via Overpass Turbo for the chosen resort.
7. **Routing engine (the moat)** — build the graph + hub gap-filling so it can route across lifts and pistes. Needs real resort data to test against.
8. **Offline map download** + **live alerts (online)** — the "map offline, info online" split.
9. **Field test** — founder + friends on-mountain.

### Cheap de-risking step (anytime, no code)
- Before committing to a resort, run a piste query in **Overpass Turbo** (overpass-turbo.eu) to check its OSM coverage quality. Patchy data = harder build.
