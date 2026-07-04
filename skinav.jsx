import { useState } from "react";

const theme = {
  navy: "#071525",
  navyMid: "#0D2137",
  navyLight: "#132D4A",
  blue: "#1E6FD9",
  blueLight: "#3B9EFF",
  cyan: "#00D4FF",
  ice: "#B8E4FF",
  white: "#F0F8FF",
  gray: "#8AAABF",
  red: "#FF3B5C",
  green: "#00E5A0",
  orange: "#FF8C00",
  yellow: "#FFD600",
};

const styles = {
  app: {
    fontFamily: "'Exo 2', 'Segoe UI', sans-serif",
    background: theme.navy,
    color: theme.white,
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 0",
  },
  phone: {
    width: 375,
    height: 780,
    background: theme.navy,
    borderRadius: 40,
    overflow: "hidden",
    position: "relative",
    boxShadow: "0 0 80px rgba(0,212,255,0.15), 0 40px 80px rgba(0,0,0,0.6)",
    border: `1px solid rgba(59,158,255,0.2)`,
    display: "flex",
    flexDirection: "column",
  },
  statusBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px 6px",
    fontSize: 12,
    fontWeight: 600,
    color: theme.ice,
    flexShrink: 0,
  },
  screen: {
    flex: 1,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
};

const SnowflakeBg = () => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
    {[...Array(18)].map((_, i) => (
      <div key={i} style={{
        position: "absolute",
        width: i % 3 === 0 ? 6 : 3,
        height: i % 3 === 0 ? 6 : 3,
        borderRadius: "50%",
        background: `rgba(184,228,255,${0.05 + (i % 4) * 0.04})`,
        left: `${(i * 37 + 10) % 100}%`,
        top: `${(i * 53 + 5) % 100}%`,
      }} />
    ))}
  </div>
);

// ── SCREEN 1: WELCOME ──────────────────────────────────────────────────
function WelcomeScreen({ onSignup, onSignin }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      <SnowflakeBg />
      {/* Hero gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 60% 30%, rgba(30,111,217,0.35) 0%, transparent 65%),
                     radial-gradient(ellipse at 20% 80%, rgba(0,212,255,0.15) 0%, transparent 50%)`,
        zIndex: 0,
      }} />
      {/* Mountain silhouette */}
      <svg viewBox="0 0 375 200" style={{ position: "absolute", bottom: 180, left: 0, right: 0, zIndex: 1, opacity: 0.12 }} preserveAspectRatio="none">
        <polygon points="0,200 80,60 140,110 200,40 270,90 320,50 375,80 375,200" fill={theme.blueLight} />
        <polygon points="0,200 60,80 110,120 160,55 220,100 375,70 375,200" fill={theme.cyan} opacity="0.5" />
      </svg>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 26px 32px", position: "relative", zIndex: 2 }}>
        {/* Logo */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 6, color: theme.cyan, textTransform: "uppercase", marginBottom: 4 }}>
            ⛷ Navigate the mountain
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: -2, lineHeight: 1, color: theme.white }}>
            Ski<span style={{ color: theme.cyan }}>Nav</span>
          </div>
        </div>
        <p style={{ color: theme.gray, fontSize: 14, lineHeight: 1.55, marginBottom: 26, marginTop: 10 }}>
          Real-time ski resort navigation. Find your route, avoid queues, ski smarter.
        </p>

        {/* Social signup options */}
        <button onClick={() => onSignup("apple")} style={{
          background: "#000", color: "white",
          border: `1px solid rgba(255,255,255,0.15)`,
          borderRadius: 14, padding: "13px 0",
          fontSize: 15, fontWeight: 700, width: "100%", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          fontFamily: "inherit", marginBottom: 10,
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
          Continue with Apple
        </button>

        <button onClick={() => onSignup("google")} style={{
          background: "white", color: "#1a1a1a",
          border: "none", borderRadius: 14, padding: "13px 0",
          fontSize: 15, fontWeight: 700, width: "100%", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          fontFamily: "inherit", marginBottom: 10,
        }}>
          <svg width="17" height="17" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        <button onClick={() => onSignup("email")} style={{
          background: `linear-gradient(135deg, ${theme.blue}, ${theme.cyan})`,
          color: theme.white, border: "none", borderRadius: 14,
          padding: "13px 0", fontSize: 15, fontWeight: 700,
          width: "100%", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          fontFamily: "inherit", letterSpacing: 0.3,
          boxShadow: "0 6px 20px rgba(0,212,255,0.25)",
        }}>
          ✉ Sign up with Email
        </button>

        {/* Sign in link */}
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: theme.gray }}>
          Already have an account?{" "}
          <span onClick={onSignin} style={{ color: theme.cyan, fontWeight: 700, cursor: "pointer" }}>
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 2: PROFILE SETUP ────────────────────────────────────────────
function ProfileScreen({ onNext, type, setType, level, setLevel }) {
  const levels = [
    { id: "beginner", label: "Beginner", desc: "Green runs only", color: "#00C853" },
    { id: "intermediate", label: "Intermediate", desc: "Blue & green runs", color: theme.blueLight },
    { id: "advanced", label: "Advanced", desc: "Red & blue runs", color: theme.red },
    { id: "expert", label: "Expert", desc: "Black runs & off-piste", color: "#1A1A1A" },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid rgba(59,158,255,0.1)` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: theme.cyan, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>Step 1 of 2</div>
        <div style={{ fontSize: 26, fontWeight: 800, color: theme.white }}>Your Profile</div>
        <div style={{ fontSize: 14, color: theme.gray, marginTop: 4 }}>We'll tailor routes to your style</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
        {/* Type selector */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: theme.gray, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>I am a</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {["skier", "snowboarder"].map(t => (
              <button key={t} onClick={() => setType(t)} style={{
                background: type === t ? `linear-gradient(135deg, ${theme.blue}33, ${theme.cyan}22)` : `rgba(255,255,255,0.04)`,
                border: `2px solid ${type === t ? theme.cyan : "rgba(59,158,255,0.15)"}`,
                borderRadius: 16,
                padding: "20px 12px",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s",
              }}>
                <div style={{ fontSize: 32, marginBottom: 6 }}>{t === "skier" ? "⛷" : "🏂"}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: type === t ? theme.white : theme.gray, textTransform: "capitalize" }}>{t}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Level selector */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: theme.gray, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>My Level</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {levels.map(l => (
              <button key={l.id} onClick={() => setLevel(l.id)} style={{
                background: level === l.id ? `rgba(59,158,255,0.12)` : `rgba(255,255,255,0.04)`,
                border: `2px solid ${level === l.id ? theme.blueLight : "rgba(59,158,255,0.12)"}`,
                borderRadius: 14,
                padding: "14px 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: "50%",
                  background: l.color,
                  border: l.id === "expert" ? `2px solid ${theme.gray}` : "none",
                  flexShrink: 0,
                }} />
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: level === l.id ? theme.white : theme.ice }}>{l.label}</div>
                  <div style={{ fontSize: 12, color: theme.gray, marginTop: 1 }}>{l.desc}</div>
                </div>
                {level === l.id && <div style={{ marginLeft: "auto", color: theme.cyan, fontSize: 18 }}>✓</div>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 24px 28px", borderTop: `1px solid rgba(59,158,255,0.1)` }}>
        <button onClick={onNext} style={{
          background: `linear-gradient(135deg, ${theme.blue}, ${theme.cyan})`,
          color: theme.white, border: "none", borderRadius: 16,
          padding: "18px 0", fontSize: 16, fontWeight: 700, width: "100%", cursor: "pointer",
          boxShadow: "0 8px 24px rgba(0,212,255,0.25)",
        }}>
          Continue →
        </button>
      </div>
    </div>
  );
}

// ── SCREEN 3: RESORT SELECTION ─────────────────────────────────────────
function ResortScreen({ onNext }) {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const resorts = [
    { id: 1, name: "Zermatt", country: "🇨🇭 Switzerland", runs: 360, lifts: 52, difficulty: "All levels", downloaded: true },
    { id: 2, name: "Verbier", country: "🇨🇭 Switzerland", runs: 410, lifts: 42, difficulty: "Advanced", downloaded: false },
    { id: 3, name: "Chamonix", country: "🇫🇷 France", runs: 170, lifts: 49, difficulty: "Expert", downloaded: false },
    { id: 4, name: "Cortina d'Ampezzo", country: "🇮🇹 Italy", runs: 140, lifts: 34, difficulty: "All levels", downloaded: false },
    { id: 5, name: "Kitzbühel", country: "🇦🇹 Austria", runs: 200, lifts: 57, difficulty: "All levels", downloaded: false },
  ];

  const filtered = resorts.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "20px 24px 16px" }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: theme.white, marginBottom: 4 }}>Select Resort</div>
        <div style={{ fontSize: 14, color: theme.gray }}>Choose where you're skiing today</div>
        <div style={{ marginTop: 14, background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, border: `1px solid rgba(59,158,255,0.12)` }}>
          <span style={{ color: theme.gray }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search resorts..."
            style={{ background: "none", border: "none", outline: "none", color: theme.white, fontSize: 15, flex: 1, fontFamily: "inherit" }}
          />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "4px 24px 16px" }}>
        {filtered.map(r => (
          <button key={r.id} onClick={() => setSelected(r.id)} style={{
            width: "100%",
            background: selected === r.id ? `rgba(30,111,217,0.2)` : `rgba(255,255,255,0.04)`,
            border: `1.5px solid ${selected === r.id ? theme.blueLight : "rgba(59,158,255,0.1)"}`,
            borderRadius: 16,
            padding: "16px",
            cursor: "pointer",
            marginBottom: 10,
            textAlign: "left",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: theme.white }}>{r.name}</div>
                <div style={{ fontSize: 13, color: theme.gray, marginTop: 2 }}>{r.country}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                {r.downloaded && (
                  <div style={{ background: `${theme.green}22`, color: theme.green, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6, letterSpacing: 1 }}>
                    DOWNLOADED
                  </div>
                )}
                {selected === r.id && <div style={{ color: theme.cyan, fontSize: 18 }}>✓</div>}
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
              <div style={{ fontSize: 12, color: theme.gray }}>
                <span style={{ color: theme.ice, fontWeight: 700 }}>{r.runs}</span> km runs
              </div>
              <div style={{ fontSize: 12, color: theme.gray }}>
                <span style={{ color: theme.ice, fontWeight: 700 }}>{r.lifts}</span> lifts
              </div>
              <div style={{ fontSize: 12, color: theme.gray }}>{r.difficulty}</div>
            </div>
          </button>
        ))}
      </div>

      <div style={{ padding: "16px 24px 28px", borderTop: `1px solid rgba(59,158,255,0.1)` }}>
        <button onClick={() => selected && onNext()} disabled={!selected} style={{
          background: selected ? `linear-gradient(135deg, ${theme.blue}, ${theme.cyan})` : "rgba(255,255,255,0.08)",
          color: selected ? theme.white : theme.gray,
          border: "none", borderRadius: 16, padding: "18px 0",
          fontSize: 16, fontWeight: 700, width: "100%", cursor: selected ? "pointer" : "not-allowed",
          boxShadow: selected ? "0 8px 24px rgba(0,212,255,0.25)" : "none",
          transition: "all 0.2s",
        }}>
          {selected ? "Open Resort Map →" : "Select a resort"}
        </button>
      </div>
    </div>
  );
}

// ── SCREEN 4: MAP ──────────────────────────────────────────────────────
function MapScreen({ onPickDestination, onGoDestination, onReport, onEmergency, onAlerts, alertCount }) {
  const [showSearch, setShowSearch] = useState(false);
  const [weatherOpen, setWeatherOpen] = useState(false);
  const [showLayers, setShowLayers] = useState(false);
  const [layers, setLayers] = useState({ lifts: true, runs: true, amenities: true });
  const [selectedPoi, setSelectedPoi] = useState(null);
  const [recenter, setRecenter] = useState(0); // bump to re-trigger location pulse

  const handleMyLocation = () => {
    setSelectedPoi(null);
    setShowSearch(false);
    setRecenter(n => n + 1);
  };

  const destinations = [
    { icon: "🍽", name: "Altitude Restaurant", location: "Blue 7 · Marker 12" },
    { icon: "🚡", name: "Glacier Express Lift", location: "Top Station · 3,883 m" },
    { icon: "🅿", name: "Main Parking", location: "Zermatt Village" },
    { icon: "🎿", name: "Ski Rental · Base Lodge", location: "Base Station" },
    { icon: "🚑", name: "Medical Center", location: "Base Station" },
    { icon: "🏔", name: "Matterhorn Summit Viewpoint", location: "Klein Matterhorn · 3,883 m" },
    { icon: "☕", name: "Furi Café", location: "Mid-station · 1,867 m" },
    { icon: "🚻", name: "Rest Stop · Blue 5", location: "Blue 5 · Marker 4" },
  ];

  // Tappable points of interest — coords are in the SVG's 375×480 space
  const mapPois = [
    { id: "summit",     x: 168, y: 30,  icon: "🏔", name: "Matterhorn Summit Viewpoint", location: "Klein Matterhorn · 3,883 m", type: "Viewpoint" },
    { id: "lift-top",   x: 200, y: 37,  icon: "🚡", name: "Glacier Express Lift", location: "Top Station · 3,883 m", type: "Cable car" },
    { id: "lift-mid",   x: 252, y: 150, icon: "🚡", name: "Mini Express Lift", location: "Mid-station · 2,650 m", type: "Chairlift" },
    { id: "cafe-furi",  x: 274, y: 168, icon: "☕", name: "Furi Café", location: "Mid-station · 1,867 m", type: "Café" },
    { id: "rest-alt",   x: 182, y: 295, icon: "🍽", name: "Altitude Restaurant", location: "Blue 7 · Marker 12", type: "Restaurant" },
    { id: "patrol",     x: 107, y: 303, icon: "🚑", name: "Ski Patrol Station", location: "Medical & rescue point", type: "Safety" },
    { id: "shelter",    x: 305, y: 310, icon: "🏠", name: "Mountain Shelter", location: "Emergency refuge", type: "Shelter" },
    { id: "lift-base",  x: 130, y: 369, icon: "🚡", name: "Glacier Express Lift", location: "Base Station · 1,620 m", type: "Cable car" },
    { id: "rental",     x: 160, y: 430, icon: "🎿", name: "Ski Rental", location: "Base Lodge", type: "Rental" },
    { id: "parking",    x: 50,  y: 440, icon: "🅿", name: "Main Parking", location: "Zermatt Village", type: "Parking" },
  ];
  const poiDest = selectedPoi ? { icon: selectedPoi.icon, name: selectedPoi.name, location: selectedPoi.location } : null;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      {/* Map SVG */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <svg viewBox="0 0 375 480" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
          <defs>
            <linearGradient id="snowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1B3A66" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#0D2137" stopOpacity="1" />
              <stop offset="100%" stopColor="#071525" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="peakGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B8E4FF" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#1E6FD9" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="treeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a3d2a" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#071525" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="userPulse">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="375" height="480" fill="url(#snowGrad)" />

          {/* Contour lines (elevation hint) */}
          <g stroke="rgba(59,158,255,0.12)" strokeWidth="0.8" fill="none">
            <path d="M0 75 Q80 45 180 60 Q270 72 375 52" />
            <path d="M0 115 Q80 85 180 100 Q270 108 375 90" />
            <path d="M0 158 Q80 130 180 140 Q270 150 375 135" />
            <path d="M0 235 Q100 212 200 218 Q290 223 375 205" strokeDasharray="3,4" />
            <path d="M0 320 Q100 302 200 303 Q290 303 375 288" strokeDasharray="3,4" />
            <path d="M0 410 Q100 396 200 392 Q290 388 375 380" strokeDasharray="3,4" />
          </g>

          {/* Peaks */}
          <polygon points="140,18 200,38 175,108 150,108 125,78" fill="url(#peakGrad)" />
          <polygon points="260,28 330,88 280,118 250,98" fill="url(#peakGrad)" opacity="0.6" />
          <polygon points="30,60 95,105 60,130 35,115" fill="url(#peakGrad)" opacity="0.45" />

          {/* Tree line / forest zones */}
          <path d="M0 365 Q40 345 80 355 Q120 340 160 360 Q200 345 240 363 Q280 345 320 365 Q350 355 375 370 L375 480 L0 480 Z" fill="url(#treeGrad)" />
          <g fill="rgba(0,140,90,0.4)">
            {[[18,378],[52,392],[88,382],[125,395],[170,384],[235,395],[285,382],[320,398],[352,386]].map(([x,y],i)=>(
              <polygon key={i} points={`${x},${y-9} ${x-5},${y} ${x+5},${y}`} />
            ))}
          </g>

          {/* Off-piste zones */}
          <g fill="rgba(184,228,255,0.03)" stroke="rgba(59,158,255,0.1)" strokeWidth="0.6" strokeDasharray="2,3">
            <ellipse cx="75" cy="260" rx="52" ry="38" />
            <ellipse cx="300" cy="230" rx="48" ry="32" />
          </g>

          {/* Pistes */}
          {layers.runs && (
            <g>
              {/* Blue 7 (main route) */}
              <path d="M200 40 Q220 100 190 160 Q170 200 180 260 Q185 310 160 360" stroke="#3B9EFF" strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.75" />
              <path d="M200 40 Q220 100 190 160 Q170 200 180 260 Q185 310 160 360" stroke="rgba(184,228,255,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3,6" />

              {/* Green 3 */}
              <path d="M200 40 Q240 90 260 150 Q270 200 250 260 Q235 310 220 360" stroke="#00C853" strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.7" />

              {/* Red 12 */}
              <path d="M200 40 Q160 80 140 140 Q120 200 130 270 Q140 320 120 370" stroke="#FF3B5C" strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.7" />

              {/* Black 4 (expert) */}
              <path d="M200 40 Q110 70 60 160 Q40 220 55 290" stroke="#1A1A1A" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.85" />
              <path d="M200 40 Q110 70 60 160 Q40 220 55 290" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="2,5" />

              {/* Blue 5 (secondary) */}
              <path d="M260 150 Q310 200 330 275 Q340 330 320 370" stroke="#3B9EFF" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.55" />

              {/* Connectors */}
              <path d="M190 160 Q220 180 250 260" stroke="#3B9EFF" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.4" strokeDasharray="8,6" />
              <path d="M140 140 Q180 155 200 170" stroke="#FF3B5C" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.35" strokeDasharray="6,5" />
            </g>
          )}

          {/* Piste labels */}
          <g fontSize="9" fontWeight="bold" fill="#B8E4FF" opacity="0.85">
            <text x="195" y="215">Blue 7</text>
            <text x="258" y="205">Green 3</text>
            <text x="108" y="205">Red 12</text>
            <text x="38" y="225">Black 4</text>
            <text x="335" y="275">Blue 5</text>
          </g>

          {/* Lifts */}
          {layers.lifts && (
            <g>
              {/* Glacier Express cable */}
              <line x1="130" y1="370" x2="200" y2="40" stroke="#FFD600" strokeWidth="2.5" strokeDasharray="10,5" opacity="0.55" />
              {/* Cabins */}
              {[0.2, 0.45, 0.7].map(t => {
                const x = 130 + (200-130)*t;
                const y = 370 + (40-370)*t;
                return <rect key={t} x={x-3} y={y-3} width="6" height="6" rx="1.5" fill="#FFD600" opacity="0.9" />;
              })}
              <text x="148" y="200" fill="#FFD600" fontSize="8" fontWeight="bold" opacity="0.85" transform="rotate(-65,148,200)">Glacier Express</text>

              {/* Mini Express */}
              <line x1="220" y1="360" x2="260" y2="150" stroke="#FFD600" strokeWidth="2" strokeDasharray="8,4" opacity="0.45" />
              <text x="252" y="255" fill="#FFD600" fontSize="7" fontWeight="bold" opacity="0.8" transform="rotate(-78,252,255)">Mini Express</text>

              {/* Summit T-bar */}
              <line x1="260" y1="150" x2="200" y2="40" stroke="#FFD600" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.35" />

              {/* Lift stations */}
              <rect x="186" y="28" width="28" height="18" rx="5" fill="#FFD600" />
              <text x="200" y="40" fill={theme.navy} fontSize="7" fontWeight="bold" textAnchor="middle">⛰ TOP</text>

              <rect x="116" y="360" width="28" height="18" rx="5" fill="#FFD600" />
              <text x="130" y="372" fill={theme.navy} fontSize="8" fontWeight="bold" textAnchor="middle">BASE</text>

              <rect x="246" y="142" width="28" height="16" rx="4" fill="#FFD600" opacity="0.9" />
              <text x="260" y="153" fill={theme.navy} fontSize="7" fontWeight="bold" textAnchor="middle">MID</text>
            </g>
          )}

          {/* Amenity markers */}
          {layers.amenities && (
            <g>
              {/* Restaurant (destination) */}
              <circle cx="182" cy="295" r="11" fill={theme.orange} stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
              <text x="182" y="300" fill="white" fontSize="10" textAnchor="middle">🍽</text>
              <text x="182" y="316" fill={theme.orange} fontSize="8" textAnchor="middle" fontWeight="bold">Altitude · M12</text>

              {/* Café mid-station */}
              <circle cx="268" cy="165" r="9" fill="#8D6E63" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <text x="268" y="169" fill="white" fontSize="8" textAnchor="middle">☕</text>

              {/* Ski Patrol */}
              <rect x="100" y="296" width="14" height="14" rx="3" fill={theme.red} stroke="white" strokeWidth="1" />
              <text x="107" y="307" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">+</text>

              {/* Shelter */}
              <circle cx="305" cy="310" r="8" fill="#6B7D8F" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <text x="305" y="314" fill="white" fontSize="7" textAnchor="middle">🏠</text>

              {/* Parking */}
              <circle cx="50" cy="440" r="11" fill="#555" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <text x="50" y="445" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">P</text>

              {/* Rental */}
              <circle cx="160" cy="430" r="9" fill={theme.cyan} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <text x="160" y="434" fill={theme.navy} fontSize="8" textAnchor="middle" fontWeight="bold">🎿</text>
            </g>
          )}

          {/* Piste markers (M8–M12 on Blue 7) */}
          {[160, 200, 240, 280, 320].map((y, i) => (
            <g key={i}>
              <rect x="165" y={y - 7} width="20" height="13" rx="3" fill={theme.navyMid} stroke={theme.blueLight} strokeWidth="1" opacity="0.9" />
              <text x="175" y={y + 2} fill={theme.blueLight} fontSize="7" textAnchor="middle" fontWeight="bold">M{i + 8}</text>
            </g>
          ))}

          {/* Live alert markers on-map */}
          <g>
            {/* Icy alert on Black 4 */}
            <circle cx="55" cy="240" r="13" fill="rgba(128,216,255,0.2)">
              <animate attributeName="r" values="11;15;11" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="55" cy="240" r="8" fill="#80D8FF" stroke="white" strokeWidth="1.5" />
            <text x="55" y="244" fontSize="9" textAnchor="middle">🧊</text>

            {/* Queue at Glacier Express base */}
            <circle cx="130" cy="345" r="12" fill="rgba(255,140,0,0.25)">
              <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="130" cy="345" r="7" fill={theme.orange} stroke="white" strokeWidth="1.5" />
            <text x="130" y="349" fontSize="8" textAnchor="middle">⏳</text>
          </g>

          {/* User location */}
          <g>
            {/* One-shot locate burst (re-fires when My Location is pressed) */}
            {recenter > 0 && (
              <circle key={recenter} cx="190" cy="200" r="8" fill="none" stroke={theme.cyan} strokeWidth="3">
                <animate attributeName="r" values="8;55" dur="0.7s" begin="0s" fill="freeze" />
                <animate attributeName="opacity" values="0.9;0" dur="0.7s" begin="0s" fill="freeze" />
                <animate attributeName="stroke-width" values="3;0.5" dur="0.7s" begin="0s" fill="freeze" />
              </circle>
            )}
            <circle cx="190" cy="200" r="22" fill="url(#userPulse)">
              <animate attributeName="r" values="16;26;16" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0.1;0.7" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="190" cy="200" r="10" fill="rgba(0,212,255,0.35)" />
            <circle cx="190" cy="200" r="7" fill={theme.cyan} />
            <circle cx="190" cy="200" r="3.5" fill="white" />
            {/* Heading arrow */}
            <polygon points="190,183 185,192 195,192" fill={theme.cyan} opacity="0.9" />
          </g>

          {/* Falling snow */}
          <g style={{ pointerEvents: "none" }}>
            {[...Array(12)].map((_, i) => {
              const x = (i * 37 + 20) % 375;
              const dur = 4 + (i % 4);
              const delay = (i % 5) * 0.7;
              return (
                <circle key={i} cx={x} cy="-5" r={i % 3 === 0 ? 1.6 : 1} fill="rgba(240,248,255,0.55)">
                  <animate attributeName="cy" values="-5;485" dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
                  <animate attributeName="cx" values={`${x};${x+10};${x-6};${x+3}`} dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
                </circle>
              );
            })}
          </g>

          {/* Tappable POI layer (rendered last so taps register on top) */}
          <g>
            {mapPois.map(poi => {
              const isSel = selectedPoi?.id === poi.id;
              return (
                <g key={poi.id} onClick={() => setSelectedPoi(poi)} style={{ cursor: "pointer" }}>
                  {isSel && (
                    <circle cx={poi.x} cy={poi.y} r="15" fill="none" stroke={theme.cyan} strokeWidth="2.5">
                      <animate attributeName="r" values="13;20;13" dur="1.6s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="1;0.25;1" dur="1.6s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {/* transparent hit target */}
                  <circle cx={poi.x} cy={poi.y} r="15" fill="transparent" />
                </g>
              );
            })}
          </g>
        </svg>

        {/* TOP BAR */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 3,
          background: `linear-gradient(to bottom, ${theme.navyMid}f0, ${theme.navyMid}00)`,
          padding: "14px 14px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
          pointerEvents: "none",
        }}>
          <div style={{ pointerEvents: "auto" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: theme.white, letterSpacing: 0.3 }}>Zermatt</div>
            <div style={{ fontSize: 10, color: theme.green, fontWeight: 600, display: "flex", alignItems: "center", gap: 5, marginTop: 1 }}>
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: theme.green, boxShadow: `0 0 6px ${theme.green}` }} />
              Live GPS · Offline maps
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, pointerEvents: "auto" }}>
            <button onClick={onAlerts} style={{
              position: "relative",
              background: "rgba(255,255,255,0.08)", border: `1px solid rgba(59,158,255,0.25)`,
              borderRadius: 12, width: 38, height: 38, color: theme.ice, cursor: "pointer",
              fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(8px)", fontFamily: "inherit",
            }}>
              🔔
              {alertCount > 0 && (
                <span style={{
                  position: "absolute", top: -4, right: -4,
                  background: theme.red, color: "white",
                  fontSize: 9, fontWeight: 900, padding: "1px 5px",
                  borderRadius: 8, minWidth: 16, textAlign: "center",
                  border: `1.5px solid ${theme.navyMid}`, lineHeight: 1.2,
                }}>
                  {alertCount}
                </span>
              )}
            </button>
            <button onClick={onEmergency} style={{
              background: theme.red, border: "none", borderRadius: 12,
              padding: "8px 12px", color: "white", fontSize: 12,
              fontWeight: 900, cursor: "pointer", letterSpacing: 0.5,
              boxShadow: `0 4px 14px ${theme.red}55`, fontFamily: "inherit",
            }}>
              🆘 SOS
            </button>
          </div>
        </div>

        {/* WEATHER WIDGET */}
        <div style={{
          position: "absolute", top: 66, right: 14, zIndex: 3,
          width: weatherOpen ? 260 : 140,
          transition: "width 0.28s ease",
        }}>
          <div onClick={() => setWeatherOpen(o => !o)} style={{
            background: `${theme.navyMid}ee`,
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: `1px solid rgba(59,158,255,0.25)`,
            borderRadius: 14,
            padding: weatherOpen ? 14 : "9px 11px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            cursor: "pointer",
          }}>
            {!weatherOpen ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ fontSize: 22, lineHeight: 1 }}>🌨</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: theme.white, lineHeight: 1 }}>-8°C</div>
                  <div style={{ fontSize: 9, color: theme.gray, fontWeight: 600, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Light Snow</div>
                </div>
                <div style={{ color: theme.cyan, fontSize: 10, fontWeight: 800 }}>▾</div>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 30, fontWeight: 900, color: theme.white, lineHeight: 1 }}>
                      -8°<span style={{ fontSize: 16, color: theme.gray, fontWeight: 700 }}>C</span>
                    </div>
                    <div style={{ fontSize: 11, color: theme.ice, marginTop: 3 }}>Light Snow · Feels -13°</div>
                  </div>
                  <div style={{ fontSize: 34, lineHeight: 1 }}>🌨</div>
                </div>

                {/* By altitude */}
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "8px 10px", marginBottom: 8 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: theme.gray, letterSpacing: 1.5, marginBottom: 5 }}>BY ALTITUDE</div>
                  {[
                    { label: "Summit · 3883m", temp: "-14°", cond: "Blizzard", warn: true },
                    { label: "Mid · 2939m", temp: "-8°", cond: "Light Snow", warn: false },
                    { label: "Base · 1620m", temp: "-2°", cond: "Flurries", warn: false },
                  ].map(a => (
                    <div key={a.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px 0" }}>
                      <div style={{ fontSize: 10, color: theme.ice }}>{a.label}</div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <span style={{ fontSize: 9, color: a.warn ? theme.red : theme.gray }}>{a.cond}</span>
                        <span style={{ fontSize: 12, fontWeight: 800, color: a.warn ? theme.red : theme.white, width: 30, textAlign: "right" }}>{a.temp}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {[
                    { label: "Wind", value: "18 km/h", sub: "NW", icon: "💨" },
                    { label: "Visibility", value: "2.5 km", sub: "Low", icon: "👁" },
                    { label: "Fresh 24h", value: "12 cm", sub: "Powder", icon: "❄" },
                    { label: "Base", value: "215 cm", sub: "Excellent", icon: "📏" },
                  ].map(s => (
                    <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "6px 8px" }}>
                      <div style={{ fontSize: 9, color: theme.gray, fontWeight: 600 }}>{s.icon} {s.label}</div>
                      <div style={{ fontSize: 12, fontWeight: 800, color: theme.white, marginTop: 1 }}>{s.value}</div>
                      <div style={{ fontSize: 9, color: theme.cyan }}>{s.sub}</div>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize: 9, color: theme.gray, marginTop: 9, textAlign: "center" }}>Tap to collapse · Updated 2 min ago</div>
              </div>
            )}
          </div>
        </div>

        {/* LAYER TOGGLE (floating) */}
        <div style={{ position: "absolute", right: 12, bottom: 180, zIndex: 2, display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
          {showLayers && (
            <div style={{
              background: `${theme.navyMid}ee`, backdropFilter: "blur(14px)",
              border: `1px solid rgba(59,158,255,0.25)`, borderRadius: 12, padding: 8,
              boxShadow: "0 4px 16px rgba(0,0,0,0.4)", display: "flex", flexDirection: "column", gap: 4,
            }}>
              {[
                { id: "runs", label: "Runs", icon: "🛷" },
                { id: "lifts", label: "Lifts", icon: "🚡" },
                { id: "amenities", label: "POIs", icon: "📍" },
              ].map(l => (
                <button key={l.id} onClick={() => setLayers(prev => ({ ...prev, [l.id]: !prev[l.id] }))} style={{
                  background: layers[l.id] ? `${theme.cyan}22` : "transparent",
                  border: `1px solid ${layers[l.id] ? theme.cyan + "55" : "transparent"}`,
                  borderRadius: 8, padding: "6px 10px", fontSize: 11, fontWeight: 700,
                  color: layers[l.id] ? theme.cyan : theme.gray,
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                  fontFamily: "inherit", minWidth: 92,
                }}>
                  <span style={{ fontSize: 13 }}>{l.icon}</span> {l.label}
                </button>
              ))}
            </div>
          )}
          <button onClick={handleMyLocation} title="Center on my location" style={{
            width: 42, height: 42, borderRadius: 12,
            background: `${theme.navyMid}ee`, backdropFilter: "blur(10px)",
            border: `1px solid rgba(0,212,255,0.4)`,
            color: theme.cyan, cursor: "pointer", fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)", fontFamily: "inherit",
          }}>
            ◎
          </button>
          <button onClick={() => setShowLayers(s => !s)} title="Map layers" style={{
            width: 42, height: 42, borderRadius: 12,
            background: showLayers ? `${theme.cyan}22` : `${theme.navyMid}ee`, backdropFilter: "blur(10px)",
            border: `1px solid ${showLayers ? theme.cyan + "66" : "rgba(59,158,255,0.25)"}`,
            color: showLayers ? theme.cyan : theme.ice, cursor: "pointer", fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)", fontFamily: "inherit",
          }}>
            🗺
          </button>
        </div>

        {/* BOTTOM CONTROLS */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3,
          background: `linear-gradient(to top, ${theme.navyMid}ff 12%, ${theme.navyMid}00)`,
          padding: "40px 16px 16px",
          pointerEvents: "none",
        }}>
          {/* Selected location card (popup) */}
          {selectedPoi && (
            <div style={{
              background: theme.navyMid,
              border: `1px solid rgba(59,158,255,0.3)`,
              borderRadius: 16, padding: 14, marginBottom: 10,
              boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
              pointerEvents: "auto",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 13, flexShrink: 0,
                  background: `rgba(0,212,255,0.12)`, border: `1px solid ${theme.cyan}44`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                }}>{selectedPoi.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: theme.cyan, letterSpacing: 1.5 }}>
                    {selectedPoi.type.toUpperCase()}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: theme.white, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {selectedPoi.name}
                  </div>
                  <div style={{ fontSize: 11, color: theme.gray, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    📍 {selectedPoi.location}
                  </div>
                </div>
                <button onClick={() => setSelectedPoi(null)} style={{
                  background: "none", border: "none", color: theme.gray,
                  cursor: "pointer", fontSize: 20, flexShrink: 0, fontFamily: "inherit",
                  padding: 4, alignSelf: "flex-start",
                }}>×</button>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => onPickDestination(poiDest)} style={{
                  flex: 1, background: "rgba(255,255,255,0.06)", border: `1px solid rgba(59,158,255,0.25)`,
                  borderRadius: 12, padding: "12px", color: theme.ice, fontSize: 13,
                  fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}>
                  🧭 Directions
                </button>
                <button onClick={() => onGoDestination(poiDest)} style={{
                  flex: 1, background: `linear-gradient(135deg, ${theme.blue}, ${theme.cyan})`,
                  border: "none", borderRadius: 12, padding: "12px", color: theme.white,
                  fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  boxShadow: "0 4px 14px rgba(0,212,255,0.25)",
                }}>
                  ▶ Go
                </button>
              </div>
            </div>
          )}

          {!showSearch ? (
            <button onClick={() => setShowSearch(true)} style={{
              width: "100%", background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              border: `1px solid rgba(59,158,255,0.3)`,
              borderRadius: 14, padding: "14px 16px",
              color: theme.gray, fontSize: 14, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 10,
              fontFamily: "inherit", pointerEvents: "auto",
            }}>
              <span>🔍</span>
              <span>Search, or tap a spot on the map</span>
            </button>
          ) : (
            <div style={{
              background: theme.navyMid, backdropFilter: "blur(12px)",
              border: `1px solid rgba(59,158,255,0.3)`, borderRadius: 14, overflow: "hidden",
              maxHeight: 280, overflowY: "auto", pointerEvents: "auto",
            }}>
              <div style={{ padding: "12px 16px", borderBottom: `1px solid rgba(59,158,255,0.1)`, display: "flex", gap: 10, alignItems: "center", position: "sticky", top: 0, background: theme.navyMid }}>
                <span>🔍</span>
                <input autoFocus placeholder="Where do you want to go?" style={{
                  background: "none", border: "none", outline: "none",
                  color: theme.white, fontSize: 14, flex: 1, fontFamily: "inherit",
                }} />
                <button onClick={() => setShowSearch(false)} style={{ background: "none", border: "none", color: theme.gray, cursor: "pointer", fontSize: 18 }}>×</button>
              </div>
              {destinations.map((d, i) => (
                <button key={i} onClick={() => { setShowSearch(false); onPickDestination(d); }} style={{
                  width: "100%", background: "none", border: "none",
                  borderBottom: i < destinations.length - 1 ? `1px solid rgba(59,158,255,0.08)` : "none",
                  padding: "10px 16px", textAlign: "left", cursor: "pointer", fontFamily: "inherit",
                  display: "flex", alignItems: "center", gap: 12,
                }}>
                  <span style={{ fontSize: 17 }}>{d.icon}</span>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 13, color: theme.white, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: theme.gray, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.location}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 5a: ROUTES DISCOVERY (Recent / Popular) ─────────────────────
function RoutesScreen({ onPickDestination, onStartRun, userLevel, startPoint, setStartPoint }) {
  const [tab, setTab] = useState("recent");
  const [expanded, setExpanded] = useState(null);
  const [userRatings, setUserRatings] = useState({});
  const [confirmRun, setConfirmRun] = useState(null);
  const [previewRun, setPreviewRun] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const recentDestinations = [
    { id: "d1", icon: "🍽", name: "Altitude Restaurant", location: "Blue 7 · Marker 12", when: "Today, 9:14 AM", lastRoute: "Fastest · 12 min" },
    { id: "d2", icon: "🚡", name: "Glacier Express Lift", location: "Top Station · 3,883 m", when: "Yesterday, 2:40 PM", lastRoute: "Easiest · 18 min" },
    { id: "d3", icon: "☕", name: "Furi Café", location: "Mid-station · 1,867 m", when: "2 days ago", lastRoute: "Fastest · 22 min" },
    { id: "d4", icon: "🎿", name: "Ski Rental · Base Lodge", location: "Base Station", when: "4 days ago", lastRoute: "Most Fun · 35 min" },
    { id: "d5", icon: "🅿", name: "Main Parking", location: "Zermatt Village", when: "Last week", lastRoute: "Easiest · 28 min" },
  ];

  const creatorStyles = {
    official:   { color: theme.cyan,   icon: "🏛", label: "OFFICIAL RESORT" },
    school:     { color: theme.orange, icon: "🏫", label: "SKI SCHOOL" },
    instructor: { color: theme.green,  icon: "🎿", label: "CERTIFIED INSTRUCTOR" },
  };

  const difficultyStyles = {
    green: { color: "#00C853",       label: "Beginner" },
    blue:  { color: theme.blueLight, label: "Intermediate" },
    red:   { color: theme.red,       label: "Advanced" },
    black: { color: "#1A1A1A",       label: "Expert", border: theme.gray },
  };

  const popularRuns = [
    {
      id: "r1", name: "Matterhorn Classic",
      creator: "Zermatt Matterhorn Paradise", creatorType: "official",
      description: "A scenic descent from the summit with iconic Matterhorn views throughout. Great for first-time visitors.",
      difficulty: "red",
      time: "45 min", distance: "8.2 km", vertical: "1,200 m",
      pistes: ["Red 12", "Blue 7", "Blue 5"],
      rating: 4.8, reviews: 342,
      startLocation: { name: "Klein Matterhorn Summit", location: "Top Station · 3,883 m", icon: "🏔" },
      preview: {
        path: "M170 15 Q195 50 165 90 Q135 130 170 165 Q195 185 150 192",
        start: [170, 15], end: [150, 192],
        liftPath: "M55 192 Q115 105 170 15",
        poi: [{ x: 155, y: 120, emoji: "🍽", label: "Altitude" }],
      },
    },
    {
      id: "r2", name: "Powder Playground",
      creator: "Marc Dubois", creatorType: "instructor",
      description: "Off-piste zones and side-country tips for experienced skiers. Includes guide stops at key viewpoints.",
      difficulty: "black",
      time: "1 hr 15 min", distance: "11.5 km", vertical: "1,800 m",
      pistes: ["Black 4", "Off-piste zones", "Red 12"],
      rating: 4.9, reviews: 127,
      startLocation: { name: "Trockener Steg", location: "Upper mid-station · 2,939 m", icon: "🚡" },
      preview: {
        path: "M200 22 Q155 58 195 95 Q235 130 170 155 Q120 180 155 192",
        start: [200, 22], end: [155, 192],
        liftPath: "M55 192 Q130 115 200 22",
        offPiste: [[[160, 65], [190, 95]], [[140, 150], [170, 180]]],
      },
    },
    {
      id: "r3", name: "Family Snowdrift Loop",
      creator: "Swiss Ski School Zermatt", creatorType: "school",
      description: "Gentle loops perfect for beginners and families. Designed by our head instructor team.",
      difficulty: "green",
      time: "30 min", distance: "4.5 km", vertical: "350 m",
      pistes: ["Green 3", "Green 1"],
      rating: 4.6, reviews: 89,
      startLocation: { name: "Zermatt Base Lodge", location: "Base Station · 1,620 m", icon: "🏠" },
      preview: {
        path: "M150 70 Q210 75 235 125 Q245 175 190 190 Q125 195 105 145 Q100 100 150 70",
        start: [150, 70], end: [150, 70], isLoop: true,
      },
    },
    {
      id: "r4", name: "Sunrise Summit Descent",
      creator: "Zermatt Matterhorn Paradise", creatorType: "official",
      description: "Early morning run starting at first lift with 360° panoramic views before the crowds arrive.",
      difficulty: "blue",
      time: "1 hr", distance: "9.8 km", vertical: "950 m",
      pistes: ["Blue 7", "Blue 5", "Blue 3"],
      rating: 4.7, reviews: 215,
      startLocation: { name: "Klein Matterhorn Summit", location: "Top Station · 3,883 m", icon: "🏔" },
      preview: {
        path: "M160 18 Q180 55 160 95 Q140 135 180 165 Q205 185 170 192",
        start: [160, 18], end: [170, 192],
        liftPath: "M55 192 Q110 105 160 18",
      },
    },
    {
      id: "r5", name: "Chocolate & Views Tour",
      creator: "Anna Müller", creatorType: "instructor",
      description: "Scenic intermediate route with stops at three mountain restaurants. Perfect for leisurely days.",
      difficulty: "blue",
      time: "2 hrs", distance: "7.5 km", vertical: "600 m",
      pistes: ["Blue 7", "Blue 5", "Green 3"],
      rating: 4.5, reviews: 178,
      startLocation: { name: "Furi Café", location: "Mid-station · 1,867 m", icon: "☕" },
      preview: {
        path: "M140 28 Q175 52 145 88 Q120 125 165 150 Q195 170 150 192",
        start: [140, 28], end: [150, 192],
        liftPath: "M55 192 Q95 110 140 28",
        poi: [
          { x: 158, y: 85, emoji: "☕", label: "Stop 1" },
          { x: 138, y: 135, emoji: "🍽", label: "Stop 2" },
          { x: 175, y: 170, emoji: "☕", label: "Stop 3" },
        ],
      },
    },
  ];

  const rateRun = (runId, stars) => {
    setUserRatings(r => ({ ...r, [runId]: r[runId] === stars ? 0 : stars }));
  };

  // Star row — fractional for display, interactive for rating
  const StarRow = ({ value, size = 12, interactive = false, onRate }) => {
    const stars = [1, 2, 3, 4, 5];
    return (
      <div style={{ display: "inline-flex", gap: 1, cursor: interactive ? "pointer" : "default" }}>
        {stars.map(s => {
          const filled = value >= s;
          const partial = !filled && value > s - 1 ? (value - (s - 1)) : 0;
          return (
            <span key={s} onClick={interactive ? (e) => { e.stopPropagation(); onRate(s); } : undefined} style={{
              fontSize: size, lineHeight: 1,
              color: filled ? "#FFD600" : partial > 0 ? "#FFD60066" : "rgba(138,170,191,0.3)",
              padding: interactive ? "2px 1px" : 0,
            }}>★</span>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: theme.white }}>Routes</div>
        <div style={{ fontSize: 12, color: theme.gray, marginTop: 2 }}>Zermatt · Find your line</div>
      </div>

      {/* Tabs */}
      <div style={{ padding: "14px 20px 10px", display: "flex", gap: 8 }}>
        {[
          { id: "recent", label: "Recent Destinations", icon: "🕒" },
          { id: "popular", label: "Popular Runs", icon: "🔥" },
        ].map(t => {
          const active = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1,
              background: active ? `linear-gradient(135deg, ${theme.blue}, ${theme.cyan})` : "rgba(255,255,255,0.05)",
              border: `1px solid ${active ? "transparent" : "rgba(59,158,255,0.15)"}`,
              borderRadius: 12, padding: "10px 8px",
              fontSize: 12, fontWeight: 700, color: active ? theme.white : theme.gray,
              cursor: "pointer", fontFamily: "inherit",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              boxShadow: active ? "0 4px 14px rgba(0,212,255,0.22)" : "none",
              transition: "all 0.2s",
            }}>
              <span style={{ fontSize: 14 }}>{t.icon}</span>
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "6px 20px 20px" }}>

        {tab === "recent" && (
          <>
            <div style={{ fontSize: 10, fontWeight: 700, color: theme.gray, letterSpacing: 2, margin: "4px 2px 10px" }}>
              SEARCHED FOR NAVIGATION
            </div>
            {recentDestinations.map(d => (
              <button key={d.id} onClick={() => onPickDestination(d)} style={{
                width: "100%",
                background: "rgba(255,255,255,0.04)",
                border: `1px solid rgba(59,158,255,0.1)`,
                borderRadius: 14, padding: "14px",
                marginBottom: 10, cursor: "pointer", fontFamily: "inherit",
                display: "flex", alignItems: "center", gap: 12, textAlign: "left",
                transition: "all 0.15s",
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: "rgba(59,158,255,0.08)", border: `1px solid rgba(59,158,255,0.15)`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                }}>{d.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: theme.white, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {d.name}
                  </div>
                  <div style={{ fontSize: 11, color: theme.gray, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    📍 {d.location}
                  </div>
                  <div style={{ fontSize: 10, color: theme.cyan, marginTop: 4, fontWeight: 600 }}>
                    {d.when} · {d.lastRoute}
                  </div>
                </div>
                <div style={{ color: theme.gray, fontSize: 18, flexShrink: 0 }}>›</div>
              </button>
            ))}

            {/* Clear history footer */}
            <div style={{ textAlign: "center", padding: "12px 0" }}>
              <button style={{
                background: "transparent", border: "none",
                color: theme.gray, fontSize: 11, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit",
                textDecoration: "underline", textDecorationColor: "rgba(138,170,191,0.3)",
              }}>
                Clear history
              </button>
            </div>
          </>
        )}

        {tab === "popular" && (
          <>
            <div style={{ fontSize: 10, fontWeight: 700, color: theme.gray, letterSpacing: 2, margin: "4px 2px 10px" }}>
              CURATED BY RESORT PROFESSIONALS
            </div>

            {popularRuns.map(r => {
              const cs = creatorStyles[r.creatorType];
              const ds = difficultyStyles[r.difficulty];
              const isExpanded = expanded === r.id;
              const userRating = userRatings[r.id] || 0;

              return (
                <div key={r.id} onClick={() => setPreviewRun(r)} style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${isExpanded ? ds.color + "55" : "rgba(59,158,255,0.1)"}`,
                  borderLeft: `4px solid ${ds.color}`,
                  borderRadius: 14, padding: "14px", marginBottom: 10,
                  transition: "all 0.2s", cursor: "pointer",
                  boxShadow: isExpanded ? `0 4px 20px ${ds.color}22` : "none",
                }}>
                  {/* Top row: name + avg rating */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4, flexWrap: "wrap" }}>
                        <div style={{
                          width: 10, height: 10, borderRadius: "50%", background: ds.color,
                          border: ds.border ? `1.5px solid ${ds.border}` : "none", flexShrink: 0,
                        }} />
                        <div style={{ fontSize: 15, fontWeight: 800, color: theme.white, lineHeight: 1.2 }}>
                          {r.name}
                        </div>
                      </div>
                      <div style={{ fontSize: 10, color: theme.gray, fontWeight: 700, letterSpacing: 0.8 }}>
                        {ds.label.toUpperCase()}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                        <span style={{ fontSize: 14 }}>⭐</span>
                        <span style={{ fontSize: 14, fontWeight: 800, color: theme.white }}>{r.rating}</span>
                      </div>
                      <div style={{ fontSize: 10, color: theme.gray, marginTop: 1 }}>({r.reviews})</div>
                    </div>
                  </div>

                  {/* Creator badge */}
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10, flexWrap: "wrap" }}>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      background: `${cs.color}18`, border: `1px solid ${cs.color}55`,
                      padding: "3px 8px", borderRadius: 8,
                    }}>
                      <span style={{ fontSize: 11 }}>{cs.icon}</span>
                      <span style={{ fontSize: 9, fontWeight: 900, color: cs.color, letterSpacing: 1 }}>
                        {cs.label}
                      </span>
                    </div>
                    <span style={{ fontSize: 11, color: theme.ice, fontWeight: 600 }}>{r.creator}</span>
                  </div>

                  {/* Description */}
                  <div style={{ fontSize: 12, color: theme.ice, lineHeight: 1.5, marginBottom: 10 }}>
                    {r.description}
                  </div>

                  {/* Stats row */}
                  <div style={{ display: "flex", gap: 14, marginBottom: 10 }}>
                    {[
                      { icon: "⏱", value: r.time },
                      { icon: "📏", value: r.distance },
                      { icon: "⬇", value: r.vertical },
                    ].map((s, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ fontSize: 11, opacity: 0.8 }}>{s.icon}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: theme.white }}>{s.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pistes */}
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
                    {r.pistes.map(p => (
                      <span key={p} style={{
                        background: "rgba(255,255,255,0.06)", borderRadius: 6,
                        padding: "3px 8px", fontSize: 11, color: theme.ice, fontWeight: 600,
                      }}>{p}</span>
                    ))}
                  </div>

                  {/* Rate row + Start button */}
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    paddingTop: 10, borderTop: `1px solid rgba(255,255,255,0.06)`, gap: 10,
                  }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: theme.gray, letterSpacing: 1 }}>
                        {userRating > 0 ? "YOUR RATING" : "RATE THIS RUN"}
                      </div>
                      <StarRow value={userRating} size={17} interactive onRate={(s) => rateRun(r.id, s)} />
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setConfirmRun(r); }} style={{
                      background: `linear-gradient(135deg, ${theme.blue}, ${theme.cyan})`,
                      border: "none", borderRadius: 11, padding: "10px 16px",
                      color: theme.white, fontSize: 13, fontWeight: 800,
                      cursor: "pointer", fontFamily: "inherit", flexShrink: 0,
                      boxShadow: "0 4px 14px rgba(0,212,255,0.22)",
                      display: "flex", alignItems: "center", gap: 5,
                    }}>
                      ▶ Start Run
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Footer note */}
            <div style={{
              marginTop: 10, padding: "12px 14px",
              background: "rgba(255,255,255,0.02)", borderRadius: 10, textAlign: "center",
            }}>
              <div style={{ fontSize: 10, color: theme.gray, lineHeight: 1.5 }}>
                Runs are curated by verified resort staff, ski schools, and certified instructors. Rate them to help other skiers.
              </div>
            </div>
          </>
        )}
      </div>

      {previewRun && (
        <RunPreviewModal
          run={previewRun}
          userLevel={userLevel}
          onClose={() => setPreviewRun(null)}
          onStart={() => {
            const r = previewRun;
            setPreviewRun(null);
            setConfirmRun(r);
          }}
        />
      )}
      {confirmRun && (
        <StartRunConfirmModal
          run={confirmRun}
          startPoint={startPoint}
          userLevel={userLevel}
          onClose={() => setConfirmRun(null)}
          onChangeStart={() => setShowPicker(true)}
          onStart={() => {
            // If they're not at the run's starting location, we're just navigating
            // them to the starting point — no level warning needed yet (the run
            // itself hasn't begun). Warning only triggers when they're at start and
            // about to drop into a run above their level.
            const atStart = isAtStartLocation(startPoint, confirmRun.startLocation);
            if (atStart && isAboveLevel(confirmRun.difficulty, userLevel)) {
              setShowWarning(true);
            } else {
              const r = confirmRun;
              setConfirmRun(null);
              onStartRun(r);
            }
          }}
        />
      )}
      {showPicker && (
        <StartPointPickerModal
          current={startPoint}
          onClose={() => setShowPicker(false)}
          onSelect={(sp) => setStartPoint(sp)}
        />
      )}
      {showWarning && confirmRun && (
        <LevelWarningModal
          routeDifficulty={confirmRun.difficulty}
          userLevel={userLevel}
          routeName={confirmRun.name}
          onCancel={() => setShowWarning(false)}
          onContinue={() => {
            const r = confirmRun;
            setShowWarning(false);
            setConfirmRun(null);
            onStartRun(r);
          }}
        />
      )}
    </div>
  );
}

// ── SCREEN 5: ROUTE OPTIONS (pick fastest / easiest / most fun) ────────
function RouteOptionsScreen({ onNext, onBack, destination, userLevel, startPoint, setStartPoint }) {
  const [selected, setSelected] = useState("fastest");
  const [showPicker, setShowPicker] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const dest = destination || { icon: "🍽", name: "Altitude Restaurant" };
  const routes = [
    {
      id: "fastest", label: "Fastest", icon: "⚡",
      time: "12 min", distance: "3.2 km", lifts: 1,
      pistes: ["Blue 7", "Green 3"], difficulty: "blue",
      color: theme.blueLight,
      steps: ["Take Glacier Express Lift", "Continue on Blue 7", "Turn right at intersection", "Stop near Marker 12"],
    },
    {
      id: "easiest", label: "Easiest", icon: "🟢",
      time: "18 min", distance: "4.8 km", lifts: 1,
      pistes: ["Green 3", "Green 1"], difficulty: "green",
      color: "#00C853",
      steps: ["Take Glacier Express Lift", "Take Green 3 (gentle slope)", "Continue to Green 1", "Restaurant on your right"],
    },
    {
      id: "longest", label: "Most Fun", icon: "🎿",
      time: "28 min", distance: "7.1 km", lifts: 2,
      pistes: ["Red 12", "Blue 7"], difficulty: "red",
      color: theme.red,
      steps: ["Take Glacier Express", "Descend Red 12 (challenging)", "Take Mini Express Lift", "Finish on Blue 7 to restaurant"],
    },
  ];

  const activeRoute = routes.find(r => r.id === selected);
  const tooHard = activeRoute && isAboveLevel(activeRoute.difficulty, userLevel);

  const handleStart = () => {
    if (tooHard) setShowWarning(true);
    else onNext();
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "16px 24px 12px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, width: 36, height: 36, color: theme.white, cursor: "pointer", fontSize: 16 }}>←</button>
        <div>
          <div style={{ fontSize: 11, color: theme.cyan, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>Plan route</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: theme.white }}>{dest.icon} {dest.name}</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "4px 20px 16px" }}>
        {/* From / To */}
        <div style={{ marginBottom: 14 }}>
          <FromToBlock
            startPoint={startPoint}
            destination={{ icon: dest.icon, name: dest.name, location: dest.location }}
            onChangeStart={() => setShowPicker(true)}
          />
        </div>

        {/* Level warning banner (inline) */}
        {tooHard && (
          <div style={{
            background: `rgba(255,140,0,0.1)`, border: `1px solid ${theme.orange}55`,
            borderRadius: 12, padding: "10px 12px", marginBottom: 14,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: theme.orange }}>Above your level</div>
              <div style={{ fontSize: 11, color: theme.ice, marginTop: 2 }}>
                This route includes {difficultyMeta[activeRoute.difficulty].label} pistes. You're at {levelMeta[userLevel].label} level.
              </div>
            </div>
          </div>
        )}

        <div style={{ fontSize: 10, fontWeight: 700, color: theme.gray, letterSpacing: 2, marginBottom: 10 }}>ROUTE OPTIONS</div>

        {routes.map(r => {
          const rAbove = isAboveLevel(r.difficulty, userLevel);
          const dm = difficultyMeta[r.difficulty];
          return (
            <button key={r.id} onClick={() => setSelected(r.id)} style={{
              width: "100%",
              background: selected === r.id ? `rgba(30,111,217,0.15)` : "rgba(255,255,255,0.04)",
              border: `2px solid ${selected === r.id ? r.color : "rgba(59,158,255,0.1)"}`,
              borderRadius: 18, padding: "14px", marginBottom: 12, cursor: "pointer", textAlign: "left",
              transition: "all 0.2s", fontFamily: "inherit",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{r.icon}</span>
                  <div style={{ fontSize: 16, fontWeight: 800, color: selected === r.id ? theme.white : theme.ice }}>{r.label}</div>
                  {/* Difficulty pill */}
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    background: `${dm.color}22`, border: `1px solid ${dm.color}55`,
                    padding: "2px 7px", borderRadius: 6,
                    fontSize: 9, fontWeight: 800, color: dm.color, letterSpacing: 0.5,
                  }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: "50%", background: dm.color,
                      border: dm.borderColor ? `1px solid ${dm.borderColor}` : "none",
                    }} />
                    {dm.label.toUpperCase()}
                  </span>
                  {rAbove && (
                    <span style={{ fontSize: 14, color: theme.orange }} title="Above your level">⚠️</span>
                  )}
                </div>
                {selected === r.id && <div style={{ color: r.color, fontSize: 20 }}>✓</div>}
              </div>
              <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 19, fontWeight: 900, color: r.color }}>{r.time}</div>
                  <div style={{ fontSize: 9, color: theme.gray, fontWeight: 700, letterSpacing: 1 }}>TIME</div>
                </div>
                <div style={{ width: 1, background: "rgba(255,255,255,0.08)" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 19, fontWeight: 900, color: theme.ice }}>{r.distance}</div>
                  <div style={{ fontSize: 9, color: theme.gray, fontWeight: 700, letterSpacing: 1 }}>DISTANCE</div>
                </div>
                <div style={{ width: 1, background: "rgba(255,255,255,0.08)" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 19, fontWeight: 900, color: "#FFD600" }}>{r.lifts}</div>
                  <div style={{ fontSize: 9, color: theme.gray, fontWeight: 700, letterSpacing: 1 }}>LIFT{r.lifts > 1 ? "S" : ""}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {r.pistes.map(p => (
                  <span key={p} style={{
                    background: "rgba(255,255,255,0.08)", borderRadius: 6,
                    padding: "3px 8px", fontSize: 11, color: theme.gray, fontWeight: 600,
                  }}>
                    {p}
                  </span>
                ))}
              </div>
            </button>
          );
        })}

        {/* Route preview steps */}
        {activeRoute && (
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "14px", marginBottom: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: theme.gray, letterSpacing: 2, marginBottom: 12 }}>ROUTE PREVIEW</div>
            {activeRoute.steps.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: `${activeRoute.color}33`, border: `1.5px solid ${activeRoute.color}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 800, color: activeRoute.color, flexShrink: 0,
                }}>{i + 1}</div>
                <div style={{ fontSize: 13, color: theme.ice, paddingTop: 2, lineHeight: 1.4 }}>{s}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: "12px 20px 20px", borderTop: `1px solid rgba(59,158,255,0.1)` }}>
        <button onClick={handleStart} style={{
          background: tooHard
            ? `linear-gradient(135deg, ${theme.orange}, #FFB347)`
            : `linear-gradient(135deg, ${theme.blue}, ${theme.cyan})`,
          color: theme.white, border: "none", borderRadius: 14, padding: "15px 0",
          fontSize: 15, fontWeight: 800, width: "100%", cursor: "pointer",
          boxShadow: tooHard ? "0 6px 20px rgba(255,140,0,0.3)" : "0 6px 20px rgba(0,212,255,0.25)",
          fontFamily: "inherit", transition: "all 0.2s",
        }}>
          Start Navigation ▶
        </button>
      </div>

      {showPicker && (
        <StartPointPickerModal
          current={startPoint}
          onClose={() => setShowPicker(false)}
          onSelect={(sp) => setStartPoint(sp)}
        />
      )}
      {showWarning && activeRoute && (
        <LevelWarningModal
          routeDifficulty={activeRoute.difficulty}
          userLevel={userLevel}
          routeName={`${activeRoute.label} route`}
          onCancel={() => setShowWarning(false)}
          onContinue={() => { setShowWarning(false); onNext(); }}
        />
      )}
    </div>
  );
}

// ── SCREEN 6: ACTIVE NAVIGATION ────────────────────────────────────────
function NavigationScreen({ onBack, onReport, onEmergency }) {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: "🚡", main: "Take Glacier Express Lift", sub: "Lift is 80m ahead on your left", type: "lift", color: "#FFD600" },
    { icon: "⛷", main: "Exit lift, take Blue 7", sub: "Turn right as you exit the lift station", type: "run", color: theme.blueLight },
    { icon: "↗️", main: "At intersection, go right", sub: "Continue on Blue 7 towards markers 8–12", type: "turn", color: theme.cyan },
    { icon: "🛑", main: "Slow down in 300m", sub: "Approaching marker 12 on Blue 7", type: "slow", color: theme.orange },
    { icon: "🍽", main: "Stop near Marker 12", sub: "Altitude Restaurant will be on your right", type: "dest", color: theme.green },
  ];

  const current = steps[step];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      {/* Mini map */}
      <div style={{ height: 200, position: "relative", overflow: "hidden" }}>
        <svg viewBox="0 0 375 200" style={{ width: "100%", height: "100%", position: "absolute" }}>
          <rect width="375" height="200" fill={theme.navyMid} />
          <path d="M200 0 Q215 50 200 100 Q190 140 195 200" stroke="#3B9EFF" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.5" />
          <path d="M200 0 Q215 50 200 100 Q190 140 195 200" stroke="#00D4FF" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="16,8" opacity="0.9" />
          <circle cx="200" cy="100" r="10" fill="rgba(0,212,255,0.2)" />
          <circle cx="200" cy="100" r="6" fill={theme.cyan} />
          <circle cx="200" cy="100" r="3" fill="white" />
          <circle cx="195" cy="190" r="8" fill={theme.orange} opacity="0.9" />
          <text x="195" y="194" fill="white" fontSize="7" textAnchor="middle">🍽</text>
          {[40, 80, 120, 160].map((y, i) => (
            <g key={i}>
              <rect x="184" y={y - 6} width="14" height="10" rx="2" fill={theme.navyMid} stroke={theme.blueLight} strokeWidth="1" opacity="0.8" />
              <text x="191" y={y + 2} fill={theme.blueLight} fontSize="7" textAnchor="middle" fontWeight="bold">{i + 9}</text>
            </g>
          ))}
        </svg>
        {/* Top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: `linear-gradient(to bottom, ${theme.navyMid}cc, transparent)` }}>
          <button onClick={onBack} style={{ background: "rgba(0,0,0,0.4)", border: "none", borderRadius: 10, padding: "6px 12px", color: theme.white, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}>
            ← End
          </button>
          <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 10, padding: "6px 12px", fontSize: 12, color: theme.ice, fontWeight: 600 }}>
            Step {step + 1}/{steps.length}
          </div>
          <button onClick={onEmergency} style={{ background: theme.red, border: "none", borderRadius: 10, padding: "6px 12px", color: "white", fontSize: 11, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
            🆘
          </button>
        </div>
      </div>

      {/* Current instruction card */}
      <div style={{ margin: "0 16px", marginTop: -20, position: "relative", zIndex: 2 }}>
        <div style={{
          background: theme.navyLight,
          border: `2px solid ${current.color}44`,
          borderRadius: 20, padding: "16px",
          boxShadow: `0 0 32px ${current.color}22`,
        }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{
              width: 54, height: 54, borderRadius: 16,
              background: `${current.color}22`, border: `2px solid ${current.color}55`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, flexShrink: 0,
            }}>
              {current.icon}
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: theme.white, lineHeight: 1.2 }}>{current.main}</div>
              <div style={{ fontSize: 13, color: theme.gray, marginTop: 4, lineHeight: 1.4 }}>{current.sub}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress steps */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 0" }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            display: "flex", gap: 12, alignItems: "flex-start",
            marginBottom: 12, opacity: i < step ? 0.4 : i === step ? 1 : 0.6,
          }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: i < step ? "rgba(0,229,160,0.2)" : i === step ? `${s.color}33` : "rgba(255,255,255,0.06)",
                border: `2px solid ${i < step ? theme.green : i === step ? s.color : "rgba(255,255,255,0.1)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12,
              }}>
                {i < step ? "✓" : <span style={{ fontSize: 10, fontWeight: 800, color: i === step ? s.color : theme.gray }}>{i + 1}</span>}
              </div>
              {i < steps.length - 1 && <div style={{ width: 2, height: 20, background: "rgba(255,255,255,0.06)", marginTop: 4 }} />}
            </div>
            <div style={{ paddingTop: 4 }}>
              <div style={{ fontSize: 14, fontWeight: i === step ? 700 : 600, color: i === step ? theme.white : theme.gray }}>{s.main}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Next step button */}
      <div style={{ padding: "12px 16px 20px", display: "flex", gap: 10 }}>
        <button onClick={onReport} style={{
          background: "rgba(255,140,0,0.15)", border: `1px solid ${theme.orange}55`,
          borderRadius: 14, padding: "14px", color: theme.orange,
          fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
        }}>
          ⚠️ Report
        </button>
        <button onClick={() => setStep(s => Math.min(s + 1, steps.length - 1))} style={{
          flex: 1,
          background: step === steps.length - 1
            ? `linear-gradient(135deg, #00b060, ${theme.green})`
            : `linear-gradient(135deg, ${theme.blue}, ${theme.cyan})`,
          color: theme.white, border: "none", borderRadius: 14, padding: "14px",
          fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          boxShadow: "0 4px 16px rgba(0,212,255,0.2)",
        }}>
          {step === steps.length - 1 ? "🎿 Arrived!" : "Next Step →"}
        </button>
      </div>
    </div>
  );
}

// ── SCREEN 7: REPORT ISSUE ─────────────────────────────────────────────
function ReportScreen({ onBack }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const types = [
    { id: "queue", icon: "⏳", label: "Long Queue", color: theme.orange },
    { id: "fog", icon: "🌫", label: "Fog", color: theme.gray },
    { id: "icy", icon: "🧊", label: "Icy Piste", color: "#80D8FF" },
    { id: "groom", icon: "🚜", label: "Needs Grooming", color: "#A0522D" },
    { id: "closed", icon: "🚫", label: "Closed Area", color: theme.red },
    { id: "lift", icon: "🚡", label: "Lift Issue", color: "#FFD600" },
  ];

  if (submitted) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: theme.white, marginBottom: 8 }}>Report Submitted</div>
        <div style={{ fontSize: 14, color: theme.gray, textAlign: "center", marginBottom: 32 }}>
          Thanks! Other skiers and resort staff have been notified.
        </div>
        <button onClick={onBack} style={{
          background: `linear-gradient(135deg, ${theme.blue}, ${theme.cyan})`,
          color: theme.white, border: "none", borderRadius: 16, padding: "16px 40px",
          fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
        }}>
          Back to Map
        </button>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "16px 24px 12px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, width: 36, height: 36, color: theme.white, cursor: "pointer", fontSize: 16 }}>←</button>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: theme.white }}>Report Issue</div>
          <div style={{ fontSize: 13, color: theme.gray }}>Blue 7 · Marker 9 · Zermatt</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px 24px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: theme.gray, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>What's the issue?</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {types.map(t => (
            <button key={t.id} onClick={() => setSelected(t.id)} style={{
              background: selected === t.id ? `${t.color}22` : "rgba(255,255,255,0.05)",
              border: `2px solid ${selected === t.id ? t.color : "rgba(59,158,255,0.12)"}`,
              borderRadius: 16, padding: "18px 12px",
              cursor: "pointer", textAlign: "center", transition: "all 0.2s",
            }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{t.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: selected === t.id ? theme.white : theme.gray }}>{t.label}</div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: theme.gray, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Additional note (optional)</div>
          <textarea placeholder="Describe the issue..." style={{
            width: "100%", background: "rgba(255,255,255,0.05)",
            border: `1px solid rgba(59,158,255,0.2)`, borderRadius: 12,
            padding: "12px", color: theme.white, fontSize: 14, resize: "none",
            height: 80, fontFamily: "inherit", outline: "none", boxSizing: "border-box",
          }} />
        </div>
      </div>

      <div style={{ padding: "16px 24px 28px", borderTop: `1px solid rgba(59,158,255,0.1)` }}>
        <button onClick={() => selected && setSubmitted(true)} disabled={!selected} style={{
          background: selected ? `linear-gradient(135deg, ${theme.orange}, #FFD600)` : "rgba(255,255,255,0.08)",
          color: selected ? theme.navy : theme.gray,
          border: "none", borderRadius: 16, padding: "18px 0",
          fontSize: 16, fontWeight: 800, width: "100%", cursor: selected ? "pointer" : "not-allowed",
          fontFamily: "inherit", transition: "all 0.2s",
        }}>
          {selected ? "Submit Report ⚠️" : "Select an issue type"}
        </button>
      </div>
    </div>
  );
}

// ── SCREEN 8: EMERGENCY ────────────────────────────────────────────────
function EmergencyScreen({ onBack }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: `linear-gradient(180deg, #1a0000 0%, ${theme.navy} 100%)` }}>
      <div style={{ background: theme.red, padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 10, width: 36, height: 36, color: "white", cursor: "pointer", fontSize: 16 }}>←</button>
        <div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "white", letterSpacing: 1 }}>🆘 EMERGENCY</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>Ski Patrol & Emergency Services</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px" }}>
        {/* Location */}
        <div style={{ background: "rgba(255,59,92,0.1)", border: `1px solid rgba(255,59,92,0.3)`, borderRadius: 16, padding: "16px", marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: theme.red, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Your Current Location</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: theme.white }}>📍 Blue 7 · Near Marker 9</div>
          <div style={{ fontSize: 13, color: theme.gray, marginTop: 4 }}>Zermatt Ski Resort · Altitude ~2,450m</div>
          <div style={{ fontSize: 12, color: theme.green, marginTop: 6 }}>● GPS Lock Active · Sharing with resort</div>
        </div>

        {/* Emergency actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          <button style={{
            background: theme.red, border: "none", borderRadius: 16, padding: "20px",
            color: "white", fontSize: 16, fontWeight: 900, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
            fontFamily: "inherit", boxShadow: "0 8px 24px rgba(255,59,92,0.4)",
          }}>
            📞 Call Ski Patrol — 1414
          </button>
          <button style={{
            background: "rgba(255,59,92,0.15)", border: `2px solid ${theme.red}55`,
            borderRadius: 16, padding: "18px",
            color: theme.white, fontSize: 15, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
            fontFamily: "inherit",
          }}>
            📱 Call Emergency — 112
          </button>
          <button style={{
            background: "rgba(59,158,255,0.1)", border: `1px solid rgba(59,158,255,0.3)`,
            borderRadius: 16, padding: "18px",
            color: theme.white, fontSize: 15, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
            fontFamily: "inherit",
          }}>
            📤 Share Location with Contact
          </button>
        </div>

        {/* Nearby references */}
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "16px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: theme.gray, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Nearest References</div>
          {[
            { icon: "🚑", label: "Medical Center", dist: "1.2 km", dir: "Base station" },
            { icon: "🚡", label: "Glacier Express (bottom)", dist: "600m", dir: "Downhill" },
            { icon: "🏠", label: "Altitude Restaurant", dist: "300m", dir: "Blue 7 downhill" },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? `1px solid rgba(255,255,255,0.06)` : "none" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 18 }}>{r.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: theme.white }}>{r.label}</div>
                  <div style={{ fontSize: 11, color: theme.gray }}>{r.dir}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: theme.cyan }}>{r.dist}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 9: ALERTS & RESORT UPDATES ──────────────────────────────────
function AlertsScreen({ onBack, onMarkAllRead, alerts, onGoToReport }) {
  const [filter, setFilter] = useState("all");
  const [dismissed, setDismissed] = useState([]);

  const filters = [
    { id: "all", label: "All", icon: "📡" },
    { id: "lift", label: "Lifts", icon: "🚡" },
    { id: "piste", label: "Pistes", icon: "⛷" },
    { id: "weather", label: "Weather", icon: "❄" },
    { id: "community", label: "Community", icon: "👥" },
  ];

  const severityMap = {
    urgent: { color: theme.red, label: "URGENT" },
    warning: { color: theme.orange, label: "WARNING" },
    info: { color: theme.cyan, label: "INFO" },
    good: { color: theme.green, label: "GOOD NEWS" },
  };

  const visible = alerts.filter(a => !dismissed.includes(a.id));
  const filtered = visible.filter(a => filter === "all" || a.category === filter);

  // Count per tab based on still-visible (not dismissed) alerts
  const countFor = (id) => id === "all" ? visible.length : visible.filter(a => a.category === id).length;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 12px", borderBottom: `1px solid rgba(59,158,255,0.1)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <button onClick={onBack} style={{
            background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10,
            width: 36, height: 36, color: theme.white, cursor: "pointer", fontSize: 16, fontFamily: "inherit",
          }}>←</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: theme.white }}>Alerts & Updates</div>
            <div style={{ fontSize: 11, color: theme.gray, display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: theme.green, boxShadow: `0 0 6px ${theme.green}` }} />
              Live · Zermatt · Updated 1 min ago
            </div>
          </div>
          <button onClick={onMarkAllRead} style={{
            background: "transparent", border: `1px solid rgba(59,158,255,0.25)`, borderRadius: 10,
            padding: "7px 10px", color: theme.cyan, fontSize: 10, fontWeight: 800, cursor: "pointer",
            letterSpacing: 0.8, fontFamily: "inherit",
          }}>
            MARK READ
          </button>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 2, margin: "0 -4px", scrollbarWidth: "none" }}>
          {filters.map(f => {
            const count = countFor(f.id);
            const active = filter === f.id;
            return (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{
                background: active ? `linear-gradient(135deg, ${theme.blue}, ${theme.cyan})` : "rgba(255,255,255,0.05)",
                border: `1px solid ${active ? "transparent" : "rgba(59,158,255,0.15)"}`,
                borderRadius: 20, padding: "7px 12px",
                fontSize: 12, fontWeight: 700, color: active ? theme.white : theme.gray,
                cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit",
                display: "flex", alignItems: "center", gap: 5, flexShrink: 0,
                boxShadow: active ? "0 4px 12px rgba(0,212,255,0.25)" : "none",
              }}>
                <span style={{ fontSize: 13 }}>{f.icon}</span>{f.label}
                {count > 0 && (
                  <span style={{
                    background: active ? "rgba(255,255,255,0.25)" : "rgba(59,158,255,0.2)",
                    color: active ? theme.white : theme.ice,
                    padding: "1px 6px", borderRadius: 8, fontSize: 10, fontWeight: 900, marginLeft: 2,
                  }}>{count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Alerts list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px 16px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px 20px", color: theme.gray }}>
            <div style={{ fontSize: 52, marginBottom: 14, opacity: 0.8 }}>✨</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: theme.ice }}>All clear here</div>
            <div style={{ fontSize: 12, marginTop: 6 }}>No alerts in this category right now</div>
          </div>
        ) : filtered.map(a => {
          const sev = severityMap[a.severity];
          return (
            <div key={a.id} style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid rgba(59,158,255,0.1)`,
              borderLeft: `4px solid ${sev.color}`,
              borderRadius: 14, padding: "14px", marginBottom: 10,
              boxShadow: a.severity === "urgent" ? `0 0 24px ${sev.color}22` : "none",
            }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: `${sev.color}22`, border: `1.5px solid ${sev.color}55`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                }}>{a.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5, flexWrap: "wrap" }}>
                    <span style={{
                      background: `${sev.color}22`, color: sev.color, fontSize: 9, fontWeight: 900,
                      padding: "2px 7px", borderRadius: 5, letterSpacing: 1,
                    }}>{sev.label}</span>
                    {a.source === "community" && (
                      <span style={{ fontSize: 9, fontWeight: 700, color: theme.cyan, background: `${theme.cyan}15`, padding: "2px 6px", borderRadius: 5, letterSpacing: 0.5 }}>
                        👥 COMMUNITY
                      </span>
                    )}
                    {a.source === "official" && (
                      <span style={{ fontSize: 9, fontWeight: 700, color: theme.gray, background: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: 5, letterSpacing: 0.5 }}>
                        🏔 OFFICIAL
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: theme.white, lineHeight: 1.25 }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: theme.ice, marginTop: 4, lineHeight: 1.45 }}>{a.desc}</div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, flexWrap: "wrap", gap: 6 }}>
                    <div style={{ fontSize: 11, color: theme.gray, display: "flex", gap: 8, alignItems: "center" }}>
                      <span>📍 {a.location}</span>
                      <span style={{ opacity: 0.5 }}>·</span>
                      <span>{a.time}</span>
                    </div>
                    {a.reportCount && (
                      <span style={{ fontSize: 10, fontWeight: 800, color: theme.orange, background: `${theme.orange}15`, padding: "2px 7px", borderRadius: 6 }}>
                        {a.reportCount} reports
                      </span>
                    )}
                  </div>

                  {a.actions && (
                    <div style={{ display: "flex", gap: 8, marginTop: 11, alignItems: "center" }}>
                      {a.actions.map((act, i) => (
                        <button key={i} style={{
                          background: i === 0 ? `${sev.color}22` : "rgba(255,255,255,0.05)",
                          border: `1px solid ${i === 0 ? sev.color + "66" : "rgba(59,158,255,0.15)"}`,
                          borderRadius: 10, padding: "7px 12px",
                          fontSize: 11, fontWeight: 700, color: i === 0 ? sev.color : theme.ice,
                          cursor: "pointer", fontFamily: "inherit",
                        }}>
                          {act}
                        </button>
                      ))}
                      <button onClick={() => setDismissed(d => [...d, a.id])} style={{
                        background: "transparent", border: "none", color: theme.gray,
                        fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", marginLeft: "auto",
                        padding: "7px 4px",
                      }}>
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Contribute CTA */}
        <button onClick={onGoToReport} style={{
          width: "100%", marginTop: 6,
          background: "rgba(59,158,255,0.06)", border: `1px dashed rgba(59,158,255,0.25)`,
          borderRadius: 14, padding: "16px", cursor: "pointer", fontFamily: "inherit",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        }}>
          <span style={{ fontSize: 20 }}>⚠️</span>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: theme.white }}>Seen something?</div>
            <div style={{ fontSize: 11, color: theme.gray, marginTop: 2 }}>Report conditions to help other skiers</div>
          </div>
        </button>

        {/* Trust footer */}
        <div style={{ marginTop: 12, padding: "12px 14px", background: "rgba(255,255,255,0.02)", borderRadius: 10, textAlign: "center" }}>
          <div style={{ fontSize: 10, color: theme.gray, lineHeight: 1.5 }}>
            Community reports from skiers on the mountain · Official updates direct from Zermatt Resort
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 10: ACCOUNT / PROFILE MANAGEMENT ────────────────────────────
function AccountScreen({ onBack, onLogout, onDelete, onFriends,
                        type, setType, level, setLevel,
                        username, setUsername, email, setEmail,
                        prefs, setPrefs }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const levels = [
    { id: "beginner", label: "Beginner", color: "#00C853" },
    { id: "intermediate", label: "Intermediate", color: theme.blueLight },
    { id: "advanced", label: "Advanced", color: theme.red },
    { id: "expert", label: "Expert", color: "#1A1A1A" },
  ];

  // Initials from username (fallback to JS)
  const initials = (username || "JS").slice(0, 2).toUpperCase();

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    }, 600);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid rgba(59,158,255,0.08)` }}>
        <button onClick={onBack} style={{
          background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10,
          width: 36, height: 36, color: theme.white, cursor: "pointer", fontSize: 16, fontFamily: "inherit",
        }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: theme.white }}>Profile</div>
          <div style={{ fontSize: 11, color: theme.gray, marginTop: 2 }}>Account & preferences</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px" }}>
        {/* Avatar hero */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "14px 0 20px" }}>
          <div style={{ position: "relative", marginBottom: 12 }}>
            <div style={{
              width: 92, height: 92, borderRadius: "50%",
              background: `linear-gradient(135deg, ${theme.blue}, ${theme.cyan})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 34, fontWeight: 900, color: theme.white,
              boxShadow: `0 8px 28px rgba(0,212,255,0.35)`,
              border: `3px solid ${theme.navyMid}`,
              letterSpacing: -1,
            }}>{initials}</div>
            <button style={{
              position: "absolute", bottom: -2, right: -2,
              width: 30, height: 30, borderRadius: "50%",
              background: theme.navyLight, border: `2px solid ${theme.navy}`,
              color: theme.cyan, cursor: "pointer", fontSize: 13,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "inherit",
            }}>📷</button>
          </div>
          <div style={{ fontSize: 19, fontWeight: 800, color: theme.white }}>{username}</div>
          <div style={{ fontSize: 12, color: theme.gray, marginTop: 2 }}>{email}</div>
          <div style={{
            marginTop: 10, padding: "4px 10px",
            background: `rgba(0,212,255,0.1)`, border: `1px solid ${theme.cyan}33`,
            borderRadius: 8, fontSize: 10, fontWeight: 800,
            color: theme.cyan, letterSpacing: 1.5,
          }}>
            ⛷ SEASON PASS · 2026
          </div>
        </div>

        {/* Stats strip */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid rgba(59,158,255,0.1)`,
          borderRadius: 14, padding: "12px 4px", marginBottom: 22,
          display: "flex",
        }}>
          {[
            { value: "12", label: "DAYS" },
            { value: "47", label: "RUNS" },
            { value: "128", label: "KM" },
            { value: "18.2k", label: "VERT M" },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, textAlign: "center",
              borderRight: i < 3 ? `1px solid rgba(255,255,255,0.06)` : "none",
            }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: theme.white }}>{s.value}</div>
              <div style={{ fontSize: 9, color: theme.gray, fontWeight: 700, marginTop: 2, letterSpacing: 1.2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Account fields */}
        <div style={{ fontSize: 10, fontWeight: 800, color: theme.gray, letterSpacing: 2, marginBottom: 10 }}>ACCOUNT</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
          <div style={{
            background: "rgba(255,255,255,0.04)", border: `1px solid rgba(59,158,255,0.12)`,
            borderRadius: 12, padding: "10px 14px",
          }}>
            <div style={{ fontSize: 10, color: theme.gray, fontWeight: 700, letterSpacing: 1 }}>USERNAME</div>
            <input value={username} onChange={e => setUsername(e.target.value)} style={{
              background: "none", border: "none", outline: "none",
              color: theme.white, fontSize: 15, fontWeight: 600,
              fontFamily: "inherit", width: "100%", padding: "3px 0 0",
            }} />
          </div>
          <div style={{
            background: "rgba(255,255,255,0.04)", border: `1px solid rgba(59,158,255,0.12)`,
            borderRadius: 12, padding: "10px 14px",
          }}>
            <div style={{ fontSize: 10, color: theme.gray, fontWeight: 700, letterSpacing: 1 }}>EMAIL</div>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{
              background: "none", border: "none", outline: "none",
              color: theme.white, fontSize: 15, fontWeight: 600,
              fontFamily: "inherit", width: "100%", padding: "3px 0 0",
            }} />
          </div>
          <div style={{
            background: "rgba(255,255,255,0.04)", border: `1px solid rgba(59,158,255,0.12)`,
            borderRadius: 12, padding: "10px 14px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, color: theme.gray, fontWeight: 700, letterSpacing: 1 }}>PASSWORD</div>
              <div style={{ fontSize: 16, color: theme.white, letterSpacing: 4, paddingTop: 3 }}>••••••••••</div>
            </div>
            <button onClick={() => setShowPwdModal(true)} style={{
              background: `rgba(0,212,255,0.1)`, border: `1px solid ${theme.cyan}44`,
              color: theme.cyan, fontSize: 10, fontWeight: 800, letterSpacing: 1,
              padding: "7px 11px", borderRadius: 9,
              cursor: "pointer", fontFamily: "inherit", flexShrink: 0,
            }}>CHANGE</button>
          </div>
        </div>

        {/* Ski profile */}
        <div style={{ fontSize: 10, fontWeight: 800, color: theme.gray, letterSpacing: 2, marginBottom: 10 }}>SKI PROFILE</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
          {["skier", "snowboarder"].map(t => (
            <button key={t} onClick={() => setType(t)} style={{
              background: type === t ? `linear-gradient(135deg, ${theme.blue}33, ${theme.cyan}22)` : `rgba(255,255,255,0.04)`,
              border: `2px solid ${type === t ? theme.cyan : "rgba(59,158,255,0.12)"}`,
              borderRadius: 12, padding: "12px",
              cursor: "pointer", textAlign: "center", fontFamily: "inherit",
            }}>
              <div style={{ fontSize: 22, marginBottom: 2 }}>{t === "skier" ? "⛷" : "🏂"}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: type === t ? theme.white : theme.gray, textTransform: "capitalize" }}>{t}</div>
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 22 }}>
          {levels.map(l => (
            <button key={l.id} onClick={() => setLevel(l.id)} style={{
              background: level === l.id ? `rgba(59,158,255,0.12)` : `rgba(255,255,255,0.04)`,
              border: `2px solid ${level === l.id ? l.color : "rgba(59,158,255,0.12)"}`,
              borderRadius: 12, padding: "10px 12px",
              cursor: "pointer", textAlign: "left",
              display: "flex", alignItems: "center", gap: 8, fontFamily: "inherit",
            }}>
              <div style={{
                width: 14, height: 14, borderRadius: "50%",
                background: l.color,
                border: l.id === "expert" ? `2px solid ${theme.gray}` : "none",
                flexShrink: 0,
              }} />
              <div style={{ fontSize: 12, fontWeight: 700, color: level === l.id ? theme.white : theme.ice }}>{l.label}</div>
            </button>
          ))}
        </div>

        {/* Preferences */}
        <div style={{ fontSize: 10, fontWeight: 800, color: theme.gray, letterSpacing: 2, marginBottom: 10 }}>PREFERENCES</div>
        <div style={{
          background: "rgba(255,255,255,0.04)", border: `1px solid rgba(59,158,255,0.12)`,
          borderRadius: 12, padding: "4px 14px", marginBottom: 22,
        }}>
          {[
            { key: "metric", label: "Metric units (km, °C)" },
            { key: "voice", label: "Voice turn-by-turn" },
            { key: "shareLocation", label: "Share location with friends" },
            { key: "notifications", label: "Alert notifications" },
          ].map((p, i) => (
            <div key={p.key} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "11px 0",
              borderBottom: i < 3 ? `1px solid rgba(255,255,255,0.05)` : "none",
            }}>
              <div style={{ fontSize: 13, color: theme.ice }}>{p.label}</div>
              <div onClick={() => setPrefs(x => ({ ...x, [p.key]: !x[p.key] }))} style={{
                width: 38, height: 22, borderRadius: 11,
                background: prefs[p.key] ? theme.cyan : "rgba(255,255,255,0.12)",
                position: "relative", transition: "all 0.2s",
                cursor: "pointer", flexShrink: 0,
              }}>
                <div style={{
                  position: "absolute", top: 2,
                  left: prefs[p.key] ? 18 : 2,
                  width: 18, height: 18, borderRadius: "50%",
                  background: "white", transition: "left 0.2s",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Friends nav row */}
        <button onClick={onFriends} style={{
          width: "100%",
          background: "rgba(255,255,255,0.04)", border: `1px solid rgba(59,158,255,0.12)`,
          borderRadius: 12, padding: "14px", marginBottom: 22,
          display: "flex", alignItems: "center", gap: 12,
          cursor: "pointer", fontFamily: "inherit",
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: `rgba(0,212,255,0.1)`, border: `1px solid ${theme.cyan}33`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, flexShrink: 0,
          }}>👥</div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: theme.white }}>Manage Friends</div>
            <div style={{ fontSize: 11, color: theme.gray, marginTop: 2 }}>See where your crew is on the mountain</div>
          </div>
          <div style={{ color: theme.gray, fontSize: 18 }}>›</div>
        </button>

        {/* Danger zone */}
        <button onClick={onLogout} style={{
          width: "100%",
          background: "rgba(255,59,92,0.08)", border: `1px solid ${theme.red}44`,
          color: theme.red, borderRadius: 14, padding: "13px",
          fontSize: 14, fontWeight: 800,
          cursor: "pointer", fontFamily: "inherit", marginBottom: 6,
        }}>
          Log Out
        </button>
        <button onClick={() => setShowDeleteModal(true)} style={{
          width: "100%", background: "transparent", border: "none",
          color: theme.gray, fontSize: 12, fontWeight: 600,
          cursor: "pointer", fontFamily: "inherit", padding: "8px 0",
          textDecoration: "underline", textDecorationColor: "rgba(138,170,191,0.3)",
        }}>
          Delete account
        </button>
      </div>

      {/* Sticky Save Changes */}
      <div style={{ padding: "12px 20px 16px", borderTop: `1px solid rgba(59,158,255,0.1)`, background: theme.navy }}>
        <button onClick={handleSave} disabled={saving} style={{
          width: "100%",
          background: saved
            ? `linear-gradient(135deg, #00b060, ${theme.green})`
            : `linear-gradient(135deg, ${theme.blue}, ${theme.cyan})`,
          color: theme.white, border: "none", borderRadius: 14,
          padding: "14px", fontSize: 15, fontWeight: 800,
          cursor: saving ? "wait" : "pointer", fontFamily: "inherit",
          boxShadow: "0 6px 20px rgba(0,212,255,0.22)",
          transition: "all 0.25s",
          opacity: saving ? 0.7 : 1,
        }}>
          {saved ? "✓ Saved" : saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      {showPwdModal && <ChangePasswordModal onClose={() => setShowPwdModal(false)} />}
      {showDeleteModal && <DeleteAccountModal onClose={() => setShowDeleteModal(false)} onConfirm={onDelete} />}
    </div>
  );
}

// ── MODAL: CHANGE PASSWORD ─────────────────────────────────────────────
function ChangePasswordModal({ onClose }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = () => {
    setError("");
    if (!current) return setError("Enter your current password");
    if (next.length < 8) return setError("New password must be at least 8 characters");
    if (next !== confirm) return setError("New passwords don't match");
    if (next === current) return setError("New password must be different");
    setSubmitted(true);
    setTimeout(onClose, 1400);
  };

  return (
    <ModalShell onClose={onClose}>
      {submitted ? (
        <div style={{ padding: "30px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 50, marginBottom: 12 }}>✅</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: theme.white }}>Password updated</div>
          <div style={{ fontSize: 13, color: theme.gray, marginTop: 4 }}>You're all set</div>
        </div>
      ) : (
        <>
          <div style={{ padding: "20px 22px 6px" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: theme.white }}>Change Password</div>
            <div style={{ fontSize: 12, color: theme.gray, marginTop: 4 }}>Use at least 8 characters</div>
          </div>
          <div style={{ padding: "14px 22px" }}>
            {[
              { label: "CURRENT PASSWORD", value: current, set: setCurrent, placeholder: "Enter current password" },
              { label: "NEW PASSWORD", value: next, set: setNext, placeholder: "At least 8 characters" },
              { label: "CONFIRM NEW PASSWORD", value: confirm, set: setConfirm, placeholder: "Retype new password" },
            ].map((f, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.04)", border: `1px solid rgba(59,158,255,0.12)`,
                borderRadius: 12, padding: "10px 14px", marginBottom: 10,
              }}>
                <div style={{ fontSize: 9, color: theme.gray, fontWeight: 700, letterSpacing: 1.5 }}>{f.label}</div>
                <input type="password" value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder} style={{
                  background: "none", border: "none", outline: "none",
                  color: theme.white, fontSize: 14, fontWeight: 600,
                  fontFamily: "inherit", width: "100%", padding: "3px 0 0",
                }} />
              </div>
            ))}
            {error && (
              <div style={{ fontSize: 12, color: theme.red, padding: "4px 2px", fontWeight: 600 }}>
                ⚠ {error}
              </div>
            )}
          </div>
          <div style={{ padding: "10px 22px 20px", display: "flex", gap: 10 }}>
            <button onClick={onClose} style={{
              flex: 1, background: "rgba(255,255,255,0.05)", border: `1px solid rgba(59,158,255,0.15)`,
              borderRadius: 12, padding: "13px", color: theme.ice,
              fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
            }}>Cancel</button>
            <button onClick={handleUpdate} style={{
              flex: 1.3, background: `linear-gradient(135deg, ${theme.blue}, ${theme.cyan})`,
              border: "none", borderRadius: 12, padding: "13px", color: theme.white,
              fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
              boxShadow: "0 6px 16px rgba(0,212,255,0.25)",
            }}>Update Password</button>
          </div>
        </>
      )}
    </ModalShell>
  );
}

// ── MODAL: DELETE ACCOUNT ──────────────────────────────────────────────
function DeleteAccountModal({ onClose, onConfirm }) {
  const [typed, setTyped] = useState("");
  const canDelete = typed === "DELETE";

  return (
    <ModalShell onClose={onClose}>
      <div style={{ padding: "24px 22px 0", textAlign: "center" }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: `rgba(255,59,92,0.15)`, border: `2px solid ${theme.red}66`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, margin: "0 auto 14px",
        }}>⚠️</div>
        <div style={{ fontSize: 19, fontWeight: 800, color: theme.white }}>Delete Account?</div>
        <div style={{ fontSize: 13, color: theme.gray, marginTop: 8, lineHeight: 1.5 }}>
          This will permanently delete your account, stats, saved resorts, and friends list.
          <br />
          <strong style={{ color: theme.red }}>This cannot be undone.</strong>
        </div>
      </div>
      <div style={{ padding: "18px 22px 10px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: theme.gray, letterSpacing: 1, marginBottom: 8 }}>
          Type <span style={{ color: theme.red, fontWeight: 900 }}>DELETE</span> to confirm
        </div>
        <input value={typed} onChange={e => setTyped(e.target.value)} placeholder="DELETE" style={{
          width: "100%", background: "rgba(255,59,92,0.08)",
          border: `1px solid ${canDelete ? theme.red : "rgba(255,59,92,0.25)"}`,
          borderRadius: 12, padding: "12px 14px",
          color: theme.white, fontSize: 15, fontWeight: 700,
          outline: "none", fontFamily: "inherit", letterSpacing: 2,
        }} />
      </div>
      <div style={{ padding: "10px 22px 20px", display: "flex", gap: 10 }}>
        <button onClick={onClose} style={{
          flex: 1, background: "rgba(255,255,255,0.06)", border: `1px solid rgba(59,158,255,0.15)`,
          borderRadius: 12, padding: "13px", color: theme.ice,
          fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
        }}>Keep my account</button>
        <button onClick={canDelete ? onConfirm : undefined} disabled={!canDelete} style={{
          flex: 1.3, background: canDelete ? theme.red : "rgba(255,59,92,0.15)",
          color: canDelete ? "white" : "rgba(255,59,92,0.45)",
          border: "none", borderRadius: 12, padding: "13px",
          fontSize: 14, fontWeight: 800, cursor: canDelete ? "pointer" : "not-allowed",
          fontFamily: "inherit",
          boxShadow: canDelete ? "0 6px 16px rgba(255,59,92,0.35)" : "none",
          transition: "all 0.2s",
        }}>
          Delete Forever
        </button>
      </div>
    </ModalShell>
  );
}

// ── MODAL SHELL (shared) ───────────────────────────────────────────────
function ModalShell({ children, onClose, z = 50 }) {
  return (
    <div onClick={onClose} style={{
      position: "absolute", inset: 0, zIndex: z,
      background: "rgba(4,10,20,0.75)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 330,
        background: theme.navyMid,
        border: `1px solid rgba(59,158,255,0.2)`,
        borderRadius: 20, overflow: "hidden",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
      }}>
        {children}
      </div>
    </div>
  );
}

// ── SHARED: DIFFICULTY / LEVEL HELPERS ─────────────────────────────────
const difficultyRank = { green: 0, blue: 1, red: 2, black: 3 };
const levelRank = { beginner: 0, intermediate: 1, advanced: 2, expert: 3 };
const difficultyMeta = {
  green: { label: "Beginner", color: "#00C853" },
  blue:  { label: "Intermediate", color: "#3B9EFF" },
  red:   { label: "Advanced", color: "#FF3B5C" },
  black: { label: "Expert", color: "#1A1A1A", borderColor: "#8AAABF" },
};
const levelMeta = {
  beginner:     { label: "Beginner",     color: "#00C853" },
  intermediate: { label: "Intermediate", color: "#3B9EFF" },
  advanced:     { label: "Advanced",     color: "#FF3B5C" },
  expert:       { label: "Expert",       color: "#1A1A1A", borderColor: "#8AAABF" },
};
function isAboveLevel(routeDifficulty, userLevel) {
  return difficultyRank[routeDifficulty] > levelRank[userLevel];
}

// True when the user's chosen start point matches the run's actual start location
function isAtStartLocation(startPoint, runStart) {
  if (!startPoint || !runStart) return false;
  return startPoint.name.trim().toLowerCase() === runStart.name.trim().toLowerCase();
}

// ── SHARED: RUN MAP PREVIEW (small inline SVG) ─────────────────────────
function RunMapPreview({ run, showUserLocation = false, userAtStart = true }) {
  const dm = difficultyMeta[run.difficulty];
  const p = run.preview;
  // Fixed "user is on the mountain base" position for the approach path visualization
  const userPos = [45, 175];
  const gid = `rmp-${run.id}`;

  return (
    <svg viewBox="0 0 300 210" preserveAspectRatio="xMidYMid slice" style={{
      width: "100%", height: "auto", display: "block", borderRadius: 12, overflow: "hidden",
    }}>
      <defs>
        <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B3A66" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#0D2137" stopOpacity="1" />
          <stop offset="100%" stopColor="#071525" stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`${gid}-peak`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8E4FF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#1E6FD9" stopOpacity="0.02" />
        </linearGradient>
        <radialGradient id={`${gid}-pulse`}>
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="300" height="210" fill={`url(#${gid}-bg)`} />

      {/* Contour lines */}
      <g stroke="rgba(59,158,255,0.1)" strokeWidth="0.6" fill="none">
        <path d="M0 55 Q100 45 200 55 Q280 60 300 50" />
        <path d="M0 105 Q100 95 200 105 Q280 110 300 100" strokeDasharray="3,4" />
        <path d="M0 155 Q100 145 200 155 Q280 160 300 150" strokeDasharray="3,4" />
      </g>

      {/* Mountain peaks */}
      <polygon points="130,10 175,38 145,85 115,65" fill={`url(#${gid}-peak)`} />
      <polygon points="210,25 255,60 225,95 200,75" fill={`url(#${gid}-peak)`} opacity="0.5" />

      {/* Tree line near base */}
      <g fill="rgba(0,140,90,0.35)">
        {[[15,198],[45,201],[72,199],[100,202],[130,199],[165,201],[200,199],[232,202],[260,200],[285,202]].map(([x,y],i)=>(
          <polygon key={i} points={`${x},${y-7} ${x-4},${y} ${x+4},${y}`} />
        ))}
      </g>

      {/* Off-piste zones (run 2 only) */}
      {p.offPiste && p.offPiste.map(([[x1,y1],[x2,y2]], i) => (
        <ellipse key={i} cx={(x1+x2)/2} cy={(y1+y2)/2} rx={Math.abs(x2-x1)/2+5} ry={Math.abs(y2-y1)/2+5}
          fill="rgba(184,228,255,0.04)" stroke="rgba(59,158,255,0.2)" strokeWidth="0.6" strokeDasharray="2,3" />
      ))}

      {/* Lift to get to start (if run's start isn't at base) */}
      {p.liftPath && (
        <>
          <path d={p.liftPath} stroke="#FFD600" strokeWidth="1.8" strokeDasharray="5,4" fill="none" opacity="0.55" />
          {[0.3, 0.6].map(t => {
            // crude cabin position along a quadratic curve approximation (endpoints only)
            // we use two end-anchored dots for a "cabins on cable" look
            return null;
          })}
        </>
      )}

      {/* Run path with glow */}
      <path d={p.path} stroke={dm.color} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.4" />
      <path d={p.path} stroke={dm.color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d={p.path} stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" fill="none"
        strokeDasharray="4,5" strokeLinecap="round" />

      {/* POI stops (restaurants, cafés, etc.) */}
      {p.poi && p.poi.map((m, i) => (
        <g key={i}>
          <circle cx={m.x} cy={m.y} r="8" fill={theme.orange} stroke="white" strokeWidth="1.2" />
          <text x={m.x} y={m.y + 2.8} fontSize="9" textAnchor="middle">{m.emoji}</text>
        </g>
      ))}

      {/* Approach path (dashed) from user to run start */}
      {showUserLocation && !userAtStart && (
        <path d={`M${userPos[0]} ${userPos[1]} Q${(userPos[0]+p.start[0])/2} ${Math.min(userPos[1], p.start[1])-20} ${p.start[0]} ${p.start[1]}`}
          stroke={theme.cyan} strokeWidth="1.5" strokeDasharray="3,4" fill="none" opacity="0.7" />
      )}

      {/* Start marker */}
      <circle cx={p.start[0]} cy={p.start[1]} r="11" fill={theme.green} stroke="white" strokeWidth="2" />
      <text x={p.start[0]} y={p.start[1] + 3.5} fill="white" fontSize="11" textAnchor="middle" fontWeight="900">S</text>

      {/* End marker (skipped if loop) */}
      {!p.isLoop && (
        <>
          <circle cx={p.end[0]} cy={p.end[1]} r="11" fill={theme.red} stroke="white" strokeWidth="2" />
          <text x={p.end[0]} y={p.end[1] + 3.5} fill="white" fontSize="11" textAnchor="middle" fontWeight="900">F</text>
        </>
      )}

      {/* Loop indicator */}
      {p.isLoop && (
        <text x={p.start[0]} y={p.start[1] - 16} fill={theme.white} fontSize="8" textAnchor="middle" fontWeight="700" opacity="0.8">
          ◌ LOOP
        </text>
      )}

      {/* User location (when approach path is visible) */}
      {showUserLocation && !userAtStart && (
        <g>
          <circle cx={userPos[0]} cy={userPos[1]} r="14" fill={`url(#${gid}-pulse)`}>
            <animate attributeName="r" values="10;18;10" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0.1;0.7" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx={userPos[0]} cy={userPos[1]} r="6" fill={theme.cyan} />
          <circle cx={userPos[0]} cy={userPos[1]} r="3" fill="white" />
        </g>
      )}

      {/* Legend pill (bottom-left) */}
      <g>
        <rect x="8" y="8" width="84" height="18" rx="5" fill="rgba(4,10,20,0.65)" />
        <circle cx="18" cy="17" r="4" fill={dm.color}
          stroke={dm.borderColor || "none"} strokeWidth={dm.borderColor ? "1" : "0"} />
        <text x="27" y="21" fill="white" fontSize="10" fontWeight="700">{dm.label}</text>
      </g>

      {/* Distance/time pill (bottom-right) */}
      <g>
        <rect x="178" y="186" width="115" height="18" rx="5" fill="rgba(4,10,20,0.65)" />
        <text x="186" y="199" fill="white" fontSize="10" fontWeight="700">
          ⏱ {run.time} · {run.distance}
        </text>
      </g>
    </svg>
  );
}

// ── MODAL: RUN PREVIEW (opens on card tap) ─────────────────────────────
function RunPreviewModal({ run, userLevel, onClose, onStart }) {
  const dm = difficultyMeta[run.difficulty];
  const above = isAboveLevel(run.difficulty, userLevel);
  const creatorStyles = {
    official:   { color: theme.cyan,   icon: "🏛", label: "OFFICIAL RESORT" },
    school:     { color: theme.orange, icon: "🏫", label: "SKI SCHOOL" },
    instructor: { color: theme.green,  icon: "🎿", label: "CERTIFIED INSTRUCTOR" },
  };
  const cs = creatorStyles[run.creatorType];

  return (
    <ModalShell onClose={onClose}>
      <div style={{ maxHeight: 640, display: "flex", flexDirection: "column" }}>
        {/* Map preview at top, edge-to-edge */}
        <div style={{ position: "relative" }}>
          <RunMapPreview run={run} />
          {/* Close button overlay */}
          <button onClick={onClose} style={{
            position: "absolute", top: 10, right: 10,
            width: 30, height: 30, borderRadius: "50%",
            background: "rgba(4,10,20,0.75)", border: "none",
            color: theme.white, cursor: "pointer", fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "inherit", backdropFilter: "blur(6px)",
          }}>×</button>
        </div>

        {/* Scrollable details */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 0" }}>
          {/* Title + rating */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: theme.white, lineHeight: 1.2 }}>{run.name}</div>
              <div style={{ fontSize: 10, color: theme.gray, fontWeight: 700, letterSpacing: 0.8, marginTop: 3 }}>
                {dm.label.toUpperCase()}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                <span style={{ fontSize: 14 }}>⭐</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: theme.white }}>{run.rating}</span>
              </div>
              <div style={{ fontSize: 10, color: theme.gray, marginTop: 1 }}>({run.reviews})</div>
            </div>
          </div>

          {/* Creator */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12, flexWrap: "wrap" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: `${cs.color}18`, border: `1px solid ${cs.color}55`,
              padding: "3px 8px", borderRadius: 8,
            }}>
              <span style={{ fontSize: 11 }}>{cs.icon}</span>
              <span style={{ fontSize: 9, fontWeight: 900, color: cs.color, letterSpacing: 1 }}>{cs.label}</span>
            </div>
            <span style={{ fontSize: 11, color: theme.ice, fontWeight: 600 }}>{run.creator}</span>
          </div>

          {/* Description */}
          <div style={{ fontSize: 12, color: theme.ice, lineHeight: 1.5, marginBottom: 14 }}>
            {run.description}
          </div>

          {/* Stats */}
          <div style={{
            background: "rgba(255,255,255,0.04)", border: `1px solid rgba(59,158,255,0.1)`,
            borderRadius: 12, padding: "10px 4px", marginBottom: 12, display: "flex",
          }}>
            {[
              { icon: "⏱", label: "TIME", value: run.time },
              { icon: "📏", label: "DISTANCE", value: run.distance },
              { icon: "⬇", label: "VERTICAL", value: run.vertical },
            ].map((s, i) => (
              <div key={i} style={{
                flex: 1, textAlign: "center",
                borderRight: i < 2 ? `1px solid rgba(255,255,255,0.06)` : "none",
              }}>
                <div style={{ fontSize: 12, opacity: 0.8 }}>{s.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: theme.white, marginTop: 2 }}>{s.value}</div>
                <div style={{ fontSize: 8, color: theme.gray, fontWeight: 700, letterSpacing: 1, marginTop: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Starts at */}
          <div style={{
            background: "rgba(0,229,160,0.06)", border: `1px solid ${theme.green}33`,
            borderRadius: 10, padding: "8px 12px", marginBottom: 10,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{ fontSize: 15 }}>{run.startLocation.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 9, color: theme.green, fontWeight: 800, letterSpacing: 1 }}>STARTS AT</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: theme.white, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {run.startLocation.name}
              </div>
              <div style={{ fontSize: 10, color: theme.gray, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {run.startLocation.location}
              </div>
            </div>
          </div>

          {/* Pistes */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: theme.gray, letterSpacing: 1.5, marginBottom: 6 }}>PISTES</div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {run.pistes.map(p => (
                <span key={p} style={{
                  background: "rgba(255,255,255,0.06)", borderRadius: 6,
                  padding: "3px 8px", fontSize: 11, color: theme.ice, fontWeight: 600,
                }}>{p}</span>
              ))}
            </div>
          </div>

          {/* Level warning */}
          {above && (
            <div style={{
              background: `rgba(255,140,0,0.1)`, border: `1px solid ${theme.orange}55`,
              borderRadius: 10, padding: "10px 12px", marginBottom: 12,
              display: "flex", alignItems: "flex-start", gap: 10,
            }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>⚠️</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: theme.orange }}>Above your level</div>
                <div style={{ fontSize: 11, color: theme.ice, marginTop: 2, lineHeight: 1.5 }}>
                  This run is rated {dm.label}. Your level is {levelMeta[userLevel].label}.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Start button */}
        <div style={{ padding: "12px 20px 16px", borderTop: `1px solid rgba(59,158,255,0.08)` }}>
          <button onClick={onStart} style={{
            width: "100%",
            background: above
              ? `linear-gradient(135deg, ${theme.orange}, #FFB347)`
              : `linear-gradient(135deg, ${theme.blue}, ${theme.cyan})`,
            border: "none", borderRadius: 12, padding: "13px",
            color: theme.white, fontSize: 14, fontWeight: 800,
            cursor: "pointer", fontFamily: "inherit",
            boxShadow: above ? "0 4px 14px rgba(255,140,0,0.3)" : "0 4px 14px rgba(0,212,255,0.25)",
          }}>
            ▶ Start Run
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

// ── MODAL: LEVEL WARNING ───────────────────────────────────────────────
function LevelWarningModal({ routeDifficulty, userLevel, routeName, onCancel, onContinue }) {
  const dm = difficultyMeta[routeDifficulty];
  const lm = levelMeta[userLevel];

  return (
    <ModalShell onClose={onCancel} z={55}>
      <div style={{ padding: "24px 22px 4px", textAlign: "center" }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: `rgba(255,140,0,0.15)`, border: `2px solid ${theme.orange}66`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, margin: "0 auto 14px",
        }}>⚠️</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: theme.white }}>
          This may be too challenging
        </div>
        {routeName && (
          <div style={{ fontSize: 13, color: theme.gray, marginTop: 4 }}>
            {routeName}
          </div>
        )}
      </div>

      <div style={{ padding: "14px 22px 4px" }}>
        <div style={{
          background: "rgba(255,255,255,0.04)", border: `1px solid rgba(59,158,255,0.12)`,
          borderRadius: 12, padding: "12px 14px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
            <div style={{ fontSize: 11, color: theme.gray, fontWeight: 700, letterSpacing: 1 }}>RUN DIFFICULTY</div>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{
                width: 10, height: 10, borderRadius: "50%", background: dm.color,
                border: dm.borderColor ? `1.5px solid ${dm.borderColor}` : "none",
              }} />
              <div style={{ fontSize: 13, fontWeight: 800, color: theme.white }}>{dm.label}</div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}>
            <div style={{ fontSize: 11, color: theme.gray, fontWeight: 700, letterSpacing: 1 }}>YOUR LEVEL</div>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{
                width: 10, height: 10, borderRadius: "50%", background: lm.color,
                border: lm.borderColor ? `1.5px solid ${lm.borderColor}` : "none",
              }} />
              <div style={{ fontSize: 13, fontWeight: 800, color: theme.white }}>{lm.label}</div>
            </div>
          </div>
        </div>

        <div style={{ fontSize: 12, color: theme.ice, lineHeight: 1.5, marginTop: 12, padding: "0 2px" }}>
          This route includes <strong style={{ color: dm.color }}>{dm.label}</strong> pistes which may be beyond your current skill. You can update your level from the Profile tab.
        </div>
      </div>

      <div style={{ padding: "16px 22px 20px", display: "flex", gap: 10 }}>
        <button onClick={onCancel} style={{
          flex: 1.2, background: `linear-gradient(135deg, ${theme.blue}, ${theme.cyan})`,
          border: "none", borderRadius: 12, padding: "13px",
          color: theme.white, fontSize: 13, fontWeight: 800,
          cursor: "pointer", fontFamily: "inherit",
          boxShadow: "0 4px 14px rgba(0,212,255,0.25)",
        }}>
          Pick easier route
        </button>
        <button onClick={onContinue} style={{
          flex: 1, background: "rgba(255,140,0,0.1)", border: `1px solid ${theme.orange}66`,
          borderRadius: 12, padding: "13px",
          color: theme.orange, fontSize: 12, fontWeight: 800,
          cursor: "pointer", fontFamily: "inherit",
        }}>
          Start anyway
        </button>
      </div>
    </ModalShell>
  );
}

// ── MODAL: START POINT PICKER ──────────────────────────────────────────
function StartPointPickerModal({ current, onClose, onSelect }) {
  const [search, setSearch] = useState("");

  const liveStart = { name: "Your current location", location: "Blue 7 · Marker 9", altitude: "2,450 m", current: true };
  const quickPlaces = [
    { icon: "🚡", name: "Glacier Express (Base)", location: "Base Station · 1,620 m" },
    { icon: "🚡", name: "Glacier Express (Top)", location: "Top Station · 3,883 m" },
    { icon: "🚡", name: "Mini Express", location: "Mid-station · 2,650 m" },
    { icon: "🍽", name: "Altitude Restaurant", location: "Blue 7 · Marker 12" },
    { icon: "☕", name: "Furi Café", location: "Mid-station · 1,867 m" },
    { icon: "🅿", name: "Main Parking", location: "Zermatt Village" },
    { icon: "🎿", name: "Ski Rental · Base Lodge", location: "Base Station" },
    { icon: "🏠", name: "Base Lodge", location: "Zermatt Village" },
  ];

  const filtered = search.trim() === ""
    ? quickPlaces
    : quickPlaces.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const pickCurrent = () => { onSelect(liveStart); onClose(); };
  const pickPlace = (p) => { onSelect({ ...p, current: false }); onClose(); };
  const pickCustomTyped = () => {
    if (search.trim() === "") return;
    onSelect({ icon: "📍", name: search.trim(), location: "Custom location", current: false });
    onClose();
  };

  return (
    <ModalShell onClose={onClose} z={60}>
      <div style={{ padding: "18px 20px 4px" }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: theme.white }}>Change Starting Point</div>
        <div style={{ fontSize: 11, color: theme.gray, marginTop: 3 }}>Where are you starting from?</div>
      </div>

      {/* Current location (always pinned at top) */}
      <div style={{ padding: "10px 20px 6px" }}>
        <button onClick={pickCurrent} style={{
          width: "100%",
          background: current.current ? `rgba(0,212,255,0.1)` : `rgba(255,255,255,0.04)`,
          border: `1.5px solid ${current.current ? theme.cyan : "rgba(59,158,255,0.12)"}`,
          borderRadius: 12, padding: "11px 14px",
          display: "flex", alignItems: "center", gap: 10,
          cursor: "pointer", fontFamily: "inherit", textAlign: "left",
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10, flexShrink: 0,
            background: `rgba(0,212,255,0.15)`, border: `1px solid ${theme.cyan}44`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: theme.cyan, boxShadow: `0 0 8px ${theme.cyan}` }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: theme.white }}>Your current location</div>
            <div style={{ fontSize: 11, color: theme.gray, marginTop: 1 }}>Blue 7 · Marker 9 · Live GPS</div>
          </div>
          {current.current && <div style={{ color: theme.cyan, fontSize: 16, flexShrink: 0 }}>✓</div>}
        </button>
      </div>

      {/* Search input */}
      <div style={{ padding: "6px 20px 8px" }}>
        <div style={{
          background: "rgba(255,255,255,0.05)", border: `1px solid rgba(59,158,255,0.12)`,
          borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ color: theme.gray, fontSize: 13 }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") pickCustomTyped(); }}
            placeholder="Type any place (e.g. Summit, ATM, hotel)"
            style={{ background: "none", border: "none", outline: "none",
              color: theme.white, fontSize: 13, flex: 1, fontFamily: "inherit" }}
          />
          {search.length > 0 && (
            <button onClick={() => setSearch("")} style={{
              background: "none", border: "none", color: theme.gray,
              cursor: "pointer", fontSize: 14, fontFamily: "inherit",
            }}>×</button>
          )}
        </div>
        {search.trim() !== "" && filtered.length === 0 && (
          <button onClick={pickCustomTyped} style={{
            width: "100%", marginTop: 8,
            background: `rgba(0,212,255,0.08)`, border: `1px dashed ${theme.cyan}44`,
            borderRadius: 10, padding: "10px 12px",
            color: theme.cyan, fontSize: 12, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
          }}>
            Use "{search.trim()}" as starting point
          </button>
        )}
      </div>

      {/* Quick places */}
      <div style={{ padding: "0 20px 4px" }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: theme.gray, letterSpacing: 1.5, margin: "4px 2px 6px" }}>
          QUICK PLACES
        </div>
        <div style={{ maxHeight: 220, overflowY: "auto", marginRight: -6, paddingRight: 6 }}>
          {filtered.map((p, i) => (
            <button key={i} onClick={() => pickPlace(p)} style={{
              width: "100%", background: "rgba(255,255,255,0.04)",
              border: `1px solid rgba(59,158,255,0.08)`,
              borderRadius: 10, padding: "9px 12px", marginBottom: 6,
              display: "flex", alignItems: "center", gap: 10,
              cursor: "pointer", fontFamily: "inherit", textAlign: "left",
            }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{p.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: theme.white, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                <div style={{ fontSize: 10, color: theme.gray, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.location}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "6px 20px 16px" }}>
        <button onClick={onClose} style={{
          width: "100%", background: "rgba(255,255,255,0.05)", border: `1px solid rgba(59,158,255,0.15)`,
          borderRadius: 10, padding: "11px", color: theme.ice,
          fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
        }}>
          Cancel
        </button>
      </div>
    </ModalShell>
  );
}

// ── MODAL: START RUN CONFIRM (used for Popular Runs) ───────────────────
function StartRunConfirmModal({ run, startPoint, userLevel, onClose, onChangeStart, onStart }) {
  const dm = difficultyMeta[run.difficulty];
  const above = isAboveLevel(run.difficulty, userLevel);
  const atStart = isAtStartLocation(startPoint, run.startLocation);

  // Button label/color logic
  let btnLabel, btnStyle;
  if (!atStart) {
    // Priority 1: user needs to get to the run's starting location first
    btnLabel = "Navigate to Starting Point";
    btnStyle = `linear-gradient(135deg, ${theme.blue}, ${theme.cyan})`;
  } else if (above) {
    // At start but above level — warning-styled
    btnLabel = "Start Anyway";
    btnStyle = `linear-gradient(135deg, ${theme.orange}, #FFB347)`;
  } else {
    // At start, within level — go
    btnLabel = "Start Navigation";
    btnStyle = `linear-gradient(135deg, ${theme.blue}, ${theme.cyan})`;
  }

  return (
    <ModalShell onClose={onClose}>
      <div style={{ maxHeight: 640, display: "flex", flexDirection: "column" }}>
        {/* Map preview at top */}
        <div style={{ position: "relative" }}>
          <RunMapPreview run={run} showUserLocation userAtStart={atStart} />
          <button onClick={onClose} style={{
            position: "absolute", top: 10, right: 10,
            width: 30, height: 30, borderRadius: "50%",
            background: "rgba(4,10,20,0.75)", border: "none",
            color: theme.white, cursor: "pointer", fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "inherit", backdropFilter: "blur(6px)",
          }}>×</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {/* Title */}
          <div style={{ padding: "14px 20px 4px" }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: theme.cyan, letterSpacing: 2, marginBottom: 4 }}>START RUN</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: theme.white, lineHeight: 1.25 }}>{run.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
              <div style={{
                width: 10, height: 10, borderRadius: "50%", background: dm.color,
                border: dm.borderColor ? `1.5px solid ${dm.borderColor}` : "none",
              }} />
              <div style={{ fontSize: 11, fontWeight: 700, color: theme.gray, letterSpacing: 0.5 }}>
                {dm.label.toUpperCase()} · {run.time} · {run.distance}
              </div>
            </div>
          </div>

          {/* "Not at starting point" info banner */}
          {!atStart && (
            <div style={{ padding: "12px 20px 0" }}>
              <div style={{
                background: `rgba(0,212,255,0.08)`, border: `1px solid ${theme.cyan}33`,
                borderRadius: 12, padding: "10px 12px",
                display: "flex", alignItems: "flex-start", gap: 10,
              }}>
                <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>🧭</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: theme.cyan }}>Not at the starting point</div>
                  <div style={{ fontSize: 11, color: theme.ice, marginTop: 2, lineHeight: 1.5 }}>
                    We'll guide you to <strong>{run.startLocation.name}</strong> first, then start the run.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* From / To rows */}
          <div style={{ padding: "12px 20px 0" }}>
            <FromToBlock
              startPoint={startPoint}
              destination={{
                icon: run.startLocation.icon,
                name: atStart ? run.name : run.startLocation.name,
                location: atStart ? `${dm.label} run · ${run.distance}` : run.startLocation.location,
              }}
              onChangeStart={onChangeStart}
            />
          </div>

          {/* Level warning banner */}
          {above && (
            <div style={{ padding: "10px 20px 0" }}>
              <div style={{
                background: `rgba(255,140,0,0.1)`, border: `1px solid ${theme.orange}55`,
                borderRadius: 12, padding: "10px 12px",
                display: "flex", alignItems: "flex-start", gap: 10,
              }}>
                <span style={{ fontSize: 17, flexShrink: 0, lineHeight: 1.2 }}>⚠️</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: theme.orange }}>Above your level</div>
                  <div style={{ fontSize: 11, color: theme.ice, marginTop: 2, lineHeight: 1.5 }}>
                    This run is rated {dm.label}. Your level is {levelMeta[userLevel].label}.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: "14px 20px 18px", display: "flex", gap: 10, borderTop: `1px solid rgba(59,158,255,0.08)` }}>
          <button onClick={onClose} style={{
            flex: 1, background: "rgba(255,255,255,0.06)", border: `1px solid rgba(59,158,255,0.15)`,
            borderRadius: 12, padding: "13px", color: theme.ice,
            fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}>
            Cancel
          </button>
          <button onClick={onStart} style={{
            flex: 1.6, background: btnStyle,
            border: "none", borderRadius: 12, padding: "13px",
            color: theme.white, fontSize: 13, fontWeight: 800,
            cursor: "pointer", fontFamily: "inherit",
            boxShadow: above && atStart
              ? "0 4px 14px rgba(255,140,0,0.35)"
              : "0 4px 14px rgba(0,212,255,0.25)",
          }}>
            {atStart ? "▶ " : "🧭 "}{btnLabel}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

// ── SHARED: FROM / TO BLOCK ────────────────────────────────────────────
function FromToBlock({ startPoint, destination, onChangeStart }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)", border: `1px solid rgba(59,158,255,0.12)`,
      borderRadius: 14, padding: "10px 12px",
    }}>
      {/* FROM */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 2px" }}>
        <div style={{
          width: 28, height: 28, borderRadius: 9, flexShrink: 0,
          background: startPoint.current ? `rgba(0,212,255,0.15)` : `rgba(59,158,255,0.08)`,
          border: `1px solid ${startPoint.current ? theme.cyan + "44" : "rgba(59,158,255,0.2)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {startPoint.current ? (
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: theme.cyan, boxShadow: `0 0 6px ${theme.cyan}` }} />
          ) : (
            <span style={{ fontSize: 13 }}>{startPoint.icon || "📍"}</span>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: theme.gray, letterSpacing: 1.2 }}>FROM</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: theme.white, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {startPoint.name}
          </div>
          <div style={{ fontSize: 10, color: theme.gray, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {startPoint.location}
          </div>
        </div>
        <button onClick={onChangeStart} style={{
          background: `rgba(0,212,255,0.1)`, border: `1px solid ${theme.cyan}44`,
          color: theme.cyan, fontSize: 10, fontWeight: 800, letterSpacing: 1,
          padding: "6px 10px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", flexShrink: 0,
        }}>CHANGE</button>
      </div>

      {/* Connector line */}
      <div style={{
        marginLeft: 14, paddingLeft: 0,
        height: 14, width: 2, background: `linear-gradient(to bottom, rgba(59,158,255,0.4), rgba(59,158,255,0.15))`,
      }} />

      {/* TO */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 2px" }}>
        <div style={{
          width: 28, height: 28, borderRadius: 9, flexShrink: 0,
          background: `rgba(0,229,160,0.12)`, border: `1px solid ${theme.green}55`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
        }}>{destination.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: theme.gray, letterSpacing: 1.2 }}>TO</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: theme.white, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {destination.name}
          </div>
          {destination.location && (
            <div style={{ fontSize: 10, color: theme.gray, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {destination.location}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 11: EMAIL SIGNUP ────────────────────────────────────────────
function EmailSignupScreen({ onBack, onNext, setUsername, setEmail }) {
  const [fullName, setFullName] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
  const canContinue = fullName.trim().length >= 2 && emailValid && password.length >= 8 && agree;

  const handleNext = () => {
    setError("");
    if (fullName.trim().length < 2) return setError("Please enter your full name");
    if (!emailValid) return setError("Please enter a valid email address");
    if (password.length < 8) return setError("Password must be at least 8 characters");
    if (!agree) return setError("Please accept the terms to continue");
    // Derive a clean username from the name for first-run (user can edit later on Profile)
    setUsername(fullName.trim().split(/\s+/).join("").toLowerCase());
    setEmail(emailVal.trim());
    onNext();
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{
          background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10,
          width: 36, height: 36, color: theme.white, cursor: "pointer", fontSize: 16, fontFamily: "inherit",
        }}>←</button>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: theme.cyan, letterSpacing: 2.5, textTransform: "uppercase" }}>Create account</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: theme.white }}>Sign up with Email</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "12px 24px" }}>
        <div style={{ fontSize: 13, color: theme.gray, lineHeight: 1.5, marginBottom: 20 }}>
          Just a few details and we'll tailor the mountain to you.
        </div>

        {[
          { label: "FULL NAME", value: fullName, set: setFullName, placeholder: "John Smith", type: "text" },
          { label: "EMAIL", value: emailVal, set: setEmailVal, placeholder: "you@example.com", type: "email" },
          { label: "PASSWORD", value: password, set: setPassword, placeholder: "At least 8 characters", type: "password" },
        ].map((f, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.04)", border: `1px solid rgba(59,158,255,0.12)`,
            borderRadius: 12, padding: "10px 14px", marginBottom: 12,
          }}>
            <div style={{ fontSize: 10, color: theme.gray, fontWeight: 700, letterSpacing: 1.5 }}>{f.label}</div>
            <input type={f.type} value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
              autoCapitalize={f.type === "email" ? "none" : undefined}
              style={{
                background: "none", border: "none", outline: "none",
                color: theme.white, fontSize: 15, fontWeight: 600,
                fontFamily: "inherit", width: "100%", padding: "3px 0 0",
              }}
            />
          </div>
        ))}

        {/* Password strength hint */}
        {password.length > 0 && password.length < 8 && (
          <div style={{ fontSize: 11, color: theme.orange, padding: "0 4px 8px" }}>
            {8 - password.length} more character{8 - password.length === 1 ? "" : "s"} needed
          </div>
        )}

        {/* Terms */}
        <div onClick={() => setAgree(a => !a)} style={{
          display: "flex", alignItems: "flex-start", gap: 10,
          padding: "12px 2px", marginTop: 4, cursor: "pointer",
        }}>
          <div style={{
            width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 1,
            border: `1.5px solid ${agree ? theme.cyan : "rgba(138,170,191,0.35)"}`,
            background: agree ? theme.cyan : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: theme.navy, fontSize: 13, fontWeight: 900,
            transition: "all 0.15s",
          }}>
            {agree && "✓"}
          </div>
          <div style={{ fontSize: 12, color: theme.gray, lineHeight: 1.5 }}>
            I agree to the <span style={{ color: theme.cyan, fontWeight: 700 }}>Terms of Service</span> and <span style={{ color: theme.cyan, fontWeight: 700 }}>Privacy Policy</span>
          </div>
        </div>

        {error && (
          <div style={{ fontSize: 12, color: theme.red, padding: "6px 2px", fontWeight: 600 }}>
            ⚠ {error}
          </div>
        )}
      </div>

      <div style={{ padding: "14px 24px 22px", borderTop: `1px solid rgba(59,158,255,0.1)` }}>
        <button onClick={handleNext} disabled={!canContinue} style={{
          width: "100%",
          background: canContinue
            ? `linear-gradient(135deg, ${theme.blue}, ${theme.cyan})`
            : "rgba(255,255,255,0.06)",
          color: canContinue ? theme.white : theme.gray,
          border: "none", borderRadius: 14, padding: "15px",
          fontSize: 15, fontWeight: 800,
          cursor: canContinue ? "pointer" : "not-allowed", fontFamily: "inherit",
          boxShadow: canContinue ? "0 6px 20px rgba(0,212,255,0.22)" : "none",
          transition: "all 0.2s",
        }}>
          Continue →
        </button>
      </div>
    </div>
  );
}

// ── SCREEN 12: FRIENDS / SHARE LOCATION ────────────────────────────────
function FriendsScreen({ onBack, prefs, setPrefs }) {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const friends = [
    { id: 1, name: "Emma Larsson", initials: "EL", color: "#FF6B9D", status: "online", location: "Blue 7 · M10", altitude: "2,660m", last: "Now", speed: "42 km/h" },
    { id: 2, name: "Marco Bianchi", initials: "MB", color: "#FFD600", status: "online", location: "Glacier Express (lift)", altitude: "2,870m", last: "1 min ago" },
    { id: 3, name: "Sofia Chen", initials: "SC", color: "#00E5A0", status: "rest", location: "Altitude Restaurant", altitude: "2,520m", last: "12 min ago" },
    { id: 4, name: "Tom Novak", initials: "TN", color: "#A78BFA", status: "offline", location: "Offline · Base Lodge", altitude: "1,620m", last: "2 hr ago" },
  ];

  const filtered = friends.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));
  const sharing = prefs.shareLocation;

  const statusStyles = {
    online: { dot: theme.green, label: "Skiing" },
    rest: { dot: theme.orange, label: "On break" },
    offline: { dot: theme.gray, label: "Offline" },
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid rgba(59,158,255,0.08)` }}>
        <button onClick={onBack} style={{
          background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10,
          width: 36, height: 36, color: theme.white, cursor: "pointer", fontSize: 16, fontFamily: "inherit",
        }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: theme.white }}>Friends</div>
          <div style={{ fontSize: 11, color: theme.gray, marginTop: 2 }}>
            {friends.filter(f => f.status !== "offline").length} on the mountain now
          </div>
        </div>
        <button onClick={() => setShowAdd(s => !s)} style={{
          background: `rgba(0,212,255,0.12)`, border: `1px solid ${theme.cyan}44`,
          borderRadius: 10, padding: "8px 12px",
          color: theme.cyan, fontSize: 12, fontWeight: 800,
          cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5,
        }}>+ ADD</button>
      </div>

      {/* Share location banner */}
      <div style={{
        margin: "14px 20px 10px", padding: "12px 14px",
        background: sharing ? `rgba(0,229,160,0.08)` : `rgba(255,140,0,0.08)`,
        border: `1px solid ${sharing ? theme.green + "44" : theme.orange + "44"}`,
        borderRadius: 12,
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{ fontSize: 22 }}>{sharing ? "📡" : "🔒"}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: theme.white }}>
            {sharing ? "You're sharing your location" : "Location not shared"}
          </div>
          <div style={{ fontSize: 11, color: theme.gray, marginTop: 2 }}>
            {sharing ? "Friends can see where you are on the mountain" : "Enable sharing to let friends find you"}
          </div>
        </div>
        <div onClick={() => setPrefs(p => ({ ...p, shareLocation: !p.shareLocation }))} style={{
          width: 38, height: 22, borderRadius: 11,
          background: sharing ? theme.green : "rgba(255,255,255,0.12)",
          position: "relative", transition: "all 0.2s",
          cursor: "pointer", flexShrink: 0,
        }}>
          <div style={{
            position: "absolute", top: 2,
            left: sharing ? 18 : 2,
            width: 18, height: 18, borderRadius: "50%",
            background: "white", transition: "left 0.2s",
            boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
          }} />
        </div>
      </div>

      {/* Add friend (collapsed search) */}
      {showAdd && (
        <div style={{ margin: "0 20px 10px", padding: "14px", background: "rgba(255,255,255,0.04)", border: `1px solid rgba(59,158,255,0.15)`, borderRadius: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: theme.gray, letterSpacing: 1.5, marginBottom: 8 }}>ADD A FRIEND</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input placeholder="Username or email" style={{
              flex: 1, background: "rgba(0,0,0,0.25)", border: `1px solid rgba(59,158,255,0.15)`,
              borderRadius: 10, padding: "10px 12px", color: theme.white,
              fontSize: 13, fontFamily: "inherit", outline: "none",
            }} />
            <button style={{
              background: `linear-gradient(135deg, ${theme.blue}, ${theme.cyan})`,
              border: "none", borderRadius: 10, padding: "10px 14px",
              color: theme.white, fontSize: 12, fontWeight: 800,
              cursor: "pointer", fontFamily: "inherit",
            }}>Invite</button>
          </div>
          <div style={{ fontSize: 11, color: theme.gray }}>Or share your QR code from your profile</div>
        </div>
      )}

      {/* Search existing */}
      <div style={{ padding: "0 20px 10px" }}>
        <div style={{
          background: "rgba(255,255,255,0.05)", borderRadius: 10,
          padding: "9px 12px", display: "flex", alignItems: "center", gap: 8,
          border: `1px solid rgba(59,158,255,0.1)`,
        }}>
          <span style={{ color: theme.gray, fontSize: 13 }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search friends"
            style={{ background: "none", border: "none", outline: "none",
              color: theme.white, fontSize: 13, flex: 1, fontFamily: "inherit" }}
          />
        </div>
      </div>

      {/* Friends list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "4px 20px 20px" }}>
        {filtered.map(f => {
          const s = statusStyles[f.status];
          return (
            <div key={f.id} style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid rgba(59,158,255,0.1)`,
              borderRadius: 14, padding: "12px", marginBottom: 10,
              display: "flex", alignItems: "center", gap: 12,
              opacity: f.status === "offline" ? 0.65 : 1,
            }}>
              {/* Avatar */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div style={{
                  width: 46, height: 46, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${f.color}, ${f.color}88)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 900, color: "white",
                  border: `2px solid ${theme.navyMid}`,
                }}>{f.initials}</div>
                <div style={{
                  position: "absolute", bottom: -1, right: -1,
                  width: 13, height: 13, borderRadius: "50%",
                  background: s.dot, border: `2.5px solid ${theme.navyMid}`,
                }} />
              </div>

              {/* Details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: theme.white, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.name}</div>
                  <div style={{ fontSize: 9, fontWeight: 800, color: s.dot, letterSpacing: 1 }}>{s.label.toUpperCase()}</div>
                </div>
                <div style={{ fontSize: 12, color: theme.ice, marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  📍 {f.location}
                </div>
                <div style={{ fontSize: 10, color: theme.gray, display: "flex", gap: 7 }}>
                  <span>{f.altitude}</span>
                  {f.speed && <><span style={{ opacity: 0.5 }}>·</span><span>{f.speed}</span></>}
                  <span style={{ opacity: 0.5 }}>·</span>
                  <span>{f.last}</span>
                </div>
              </div>

              {/* Locate button */}
              {f.status !== "offline" && (
                <button style={{
                  background: `rgba(0,212,255,0.1)`, border: `1px solid ${theme.cyan}33`,
                  borderRadius: 10, width: 36, height: 36, cursor: "pointer",
                  color: theme.cyan, fontSize: 14, flexShrink: 0, fontFamily: "inherit",
                }} title="Locate on map">🎯</button>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: theme.gray }}>
            <div style={{ fontSize: 40, marginBottom: 10, opacity: 0.8 }}>🔍</div>
            <div style={{ fontSize: 13, color: theme.ice, fontWeight: 700 }}>No friends found</div>
            <div style={{ fontSize: 11, marginTop: 4 }}>Try a different search</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── MAIN APP ───────────────────────────────────────────────────────────
export default function SkiNav() {
  const [screen, setScreen] = useState("welcome");
  const [prevScreen, setPrevScreen] = useState(null);
  const [alertsRead, setAlertsRead] = useState(false);

  // Lifted profile state — shared between ProfileScreen (onboarding) and AccountScreen
  const [skiType, setSkiType] = useState("skier");
  const [skiLevel, setSkiLevel] = useState("intermediate");
  const [username, setUsername] = useState("johnski23");
  const [email, setEmail] = useState("john.smith@example.com");
  const [prefs, setPrefs] = useState({
    metric: true,
    voice: true,
    shareLocation: false,
    notifications: true,
  });

  // Live alerts — demo data. Severity drives color bar (red/orange/cyan/green).
  const alerts = [
    {
      id: 1, category: "lift", severity: "urgent",
      icon: "🚡", title: "Matterhorn Glacier Ride closed",
      desc: "High winds at summit (gusts 68 km/h). Status reassessed every 15 min.",
      location: "Trockener Steg → Klein Matterhorn",
      time: "8 min ago", source: "official",
      actions: ["View status", "Alt. route"],
    },
    {
      id: 2, category: "weather", severity: "warning",
      icon: "🌫", title: "Fog advisory · Upper mountain",
      desc: "Visibility under 50m above 2800m. Stay on marked pistes, avoid off-piste.",
      location: "Above Trockener Steg",
      time: "22 min ago", source: "official",
      actions: ["View on map"],
    },
    {
      id: 3, category: "piste", severity: "warning",
      icon: "🧊", title: "Icy patches on Black 4",
      desc: "Refrozen surface reported near markers 3–5. Ski with caution.",
      location: "Black 4 · M3–M5",
      time: "14 min ago", source: "community", reportCount: 5,
      actions: ["View on map", "Confirm"],
    },
    {
      id: 4, category: "lift", severity: "warning",
      icon: "⏳", title: "Long queue at Glacier Express",
      desc: "Estimated 15 minute wait. Sunnegga Express is currently clear.",
      location: "Glacier Express · Base",
      time: "3 min ago", source: "community", reportCount: 12,
      actions: ["See alternatives"],
    },
    {
      id: 5, category: "piste", severity: "good",
      icon: "✨", title: "Red 12 freshly groomed",
      desc: "Perfect corduroy conditions. Groomed at 07:20 this morning.",
      location: "Red 12",
      time: "1 hr ago", source: "official",
    },
    {
      id: 6, category: "weather", severity: "good",
      icon: "❄", title: "10 cm fresh snow overnight",
      desc: "Powder conditions in off-piste zones. Base depth now 215 cm.",
      location: "Resort-wide",
      time: "3 hr ago", source: "official",
    },
    {
      id: 7, category: "community", severity: "info",
      icon: "🏫", title: "Ski school on Green 3",
      desc: "Groups of young skiers practicing between markers 2–4. Pass with care.",
      location: "Green 3 · M2–M4",
      time: "30 min ago", source: "community", reportCount: 2,
    },
    {
      id: 8, category: "lift", severity: "info",
      icon: "🔧", title: "Furi Gondola: reduced capacity",
      desc: "Every other cabin running for scheduled maintenance until 14:00.",
      location: "Zermatt → Furi",
      time: "45 min ago", source: "official",
    },
  ];

  // Badge count reflects only unread urgent + warning alerts
  const alertCount = alertsRead ? 0 : alerts.filter(a => a.severity === "urgent" || a.severity === "warning").length;

  // Destination currently being navigated to (picked from map search, recent list, or popular run)
  const [activeDestination, setActiveDestination] = useState(null);

  // Starting point for navigation (default: live GPS / current location)
  const [startPoint, setStartPoint] = useState({
    name: "Your current location",
    location: "Blue 7 · Marker 9",
    altitude: "2,450 m",
    current: true,
  });

  const go = (s) => { setPrevScreen(screen); setScreen(s); };
  const back = () => go(prevScreen || "map");

  const pickDestination = (dest) => { setActiveDestination(dest); go("routeOptions"); };
  const goDestination = (dest) => { setActiveDestination(dest); go("navigation"); };
  const startRun = (run) => { setActiveDestination({ icon: "⛷", name: run.name, run }); go("navigation"); };

  const renderScreen = () => {
    switch (screen) {
      case "welcome":   return <WelcomeScreen
                                  onSignup={(method) => go(method === "email" ? "emailSignup" : "profile")}
                                  onSignin={() => go("resort")} />;
      case "emailSignup": return <EmailSignupScreen onBack={() => go("welcome")} onNext={() => go("profile")}
                                  setUsername={setUsername} setEmail={setEmail} />;
      case "profile":   return <ProfileScreen onNext={() => go("resort")}
                                  type={skiType} setType={setSkiType} level={skiLevel} setLevel={setSkiLevel} />;
      case "resort":    return <ResortScreen onNext={() => go("map")} />;
      case "map":       return <MapScreen
                                  onPickDestination={pickDestination}
                                  onGoDestination={goDestination}
                                  onReport={() => go("report")}
                                  onEmergency={() => go("emergency")}
                                  onAlerts={() => go("alerts")}
                                  alertCount={alertCount} />;
      case "routes":    return <RoutesScreen
                                  onPickDestination={pickDestination}
                                  onStartRun={startRun}
                                  userLevel={skiLevel}
                                  startPoint={startPoint}
                                  setStartPoint={setStartPoint} />;
      case "routeOptions": return <RouteOptionsScreen
                                  onNext={() => go("navigation")}
                                  onBack={back}
                                  destination={activeDestination}
                                  userLevel={skiLevel}
                                  startPoint={startPoint}
                                  setStartPoint={setStartPoint} />;
      case "navigation":return <NavigationScreen onBack={() => go("map")} onReport={() => go("report")} onEmergency={() => go("emergency")} />;
      case "report":    return <ReportScreen onBack={back} />;
      case "emergency": return <EmergencyScreen onBack={back} />;
      case "alerts":    return <AlertsScreen onBack={back} onMarkAllRead={() => setAlertsRead(true)} alerts={alerts} onGoToReport={() => go("report")} />;
      case "account":   return <AccountScreen onBack={back}
                                  onLogout={() => { setAlertsRead(false); go("welcome"); }}
                                  onDelete={() => { setAlertsRead(false); go("welcome"); }}
                                  onFriends={() => go("friends")}
                                  type={skiType} setType={setSkiType}
                                  level={skiLevel} setLevel={setSkiLevel}
                                  username={username} setUsername={setUsername}
                                  email={email} setEmail={setEmail}
                                  prefs={prefs} setPrefs={setPrefs} />;
      case "friends":   return <FriendsScreen onBack={() => go("account")} prefs={prefs} setPrefs={setPrefs} />;
      default:          return <WelcomeScreen
                                  onSignup={(method) => go(method === "email" ? "emailSignup" : "profile")}
                                  onSignin={() => go("resort")} />;
    }
  };

  const navItems = [
    { id: "map", icon: "🗺", label: "Map" },
    { id: "routes", icon: "⚡", label: "Routes" },
    { id: "report", icon: "⚠️", label: "Report" },
    { id: "account", icon: "👤", label: "Profile" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(59,158,255,0.3); border-radius: 4px; }
        button { font-family: 'Exo 2', sans-serif; }
        input, textarea { font-family: 'Exo 2', sans-serif; }
      `}</style>
      <div style={styles.app}>
        <div style={styles.phone}>
          {/* Status bar */}
          <div style={styles.statusBar}>
            <span>9:41</span>
            <span style={{ fontSize: 16, letterSpacing: 1, color: theme.cyan }}>⛷ SkiNav</span>
            <span>● 4G</span>
          </div>

          {/* Screen */}
          <div style={styles.screen}>
            {renderScreen()}
          </div>

          {/* Bottom nav (hidden during onboarding flows) */}
          {!["welcome", "emailSignup", "profile", "resort"].includes(screen) && (
            <div style={{
              display: "flex", borderTop: `1px solid rgba(59,158,255,0.12)`,
              background: theme.navyMid, flexShrink: 0,
            }}>
              {navItems.map(n => (
                <button key={n.id} onClick={() => go(n.id)} style={{
                  flex: 1, background: "none", border: "none", padding: "10px 0 12px",
                  cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                  borderTop: screen === n.id ? `2px solid ${theme.cyan}` : "2px solid transparent",
                  position: "relative",
                }}>
                  <span style={{ fontSize: 18, position: "relative" }}>
                    {n.icon}
                    {n.badge > 0 && (
                      <span style={{
                        position: "absolute", top: -4, right: -10,
                        background: theme.red, color: "white",
                        fontSize: 9, fontWeight: 900, padding: "1px 5px",
                        borderRadius: 8, minWidth: 15, textAlign: "center",
                        border: `1.5px solid ${theme.navyMid}`, lineHeight: 1.2,
                      }}>{n.badge}</span>
                    )}
                  </span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: screen === n.id ? theme.cyan : theme.gray, letterSpacing: 0.5 }}>
                    {n.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
