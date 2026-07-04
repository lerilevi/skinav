// SkiNav design tokens — ported 1:1 from the React prototype (skinav.jsx).
// Dark-navy / cyan ski theme.

export const theme = {
  navy: '#071525',
  navyMid: '#0D2137',
  navyLight: '#132D4A',
  blue: '#1E6FD9',
  blueLight: '#3B9EFF',
  cyan: '#00D4FF',
  ice: '#B8E4FF',
  white: '#F0F8FF',
  gray: '#8AAABF',
  red: '#FF3B5C',
  green: '#00E5A0',
  orange: '#FF8C00',
  yellow: '#FFD600',
} as const;

// Exo 2 weights loaded via @expo-google-fonts/exo-2. Use these family names
// in `fontFamily` so weight renders correctly on both iOS and Android (RN does
// not derive bold from numeric fontWeight for custom fonts).
export const fonts = {
  regular: 'Exo2_400Regular',
  semibold: 'Exo2_600SemiBold',
  bold: 'Exo2_700Bold',
  extrabold: 'Exo2_800ExtraBold',
  black: 'Exo2_900Black',
} as const;

// ── Shared difficulty / level metadata (from prototype) ──────────────────
export type Difficulty = 'green' | 'blue' | 'red' | 'black';
export type SkiLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export const difficultyRank: Record<Difficulty, number> = {
  green: 0,
  blue: 1,
  red: 2,
  black: 3,
};

export const levelRank: Record<SkiLevel, number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
  expert: 3,
};

export const difficultyMeta: Record<
  Difficulty,
  { label: string; color: string; borderColor?: string }
> = {
  green: { label: 'Beginner', color: '#00C853' },
  blue: { label: 'Intermediate', color: '#3B9EFF' },
  red: { label: 'Advanced', color: '#FF3B5C' },
  black: { label: 'Expert', color: '#1A1A1A', borderColor: '#8AAABF' },
};

export const levelMeta: Record<
  SkiLevel,
  { label: string; color: string; borderColor?: string }
> = {
  beginner: { label: 'Beginner', color: '#00C853' },
  intermediate: { label: 'Intermediate', color: '#3B9EFF' },
  advanced: { label: 'Advanced', color: '#FF3B5C' },
  expert: { label: 'Expert', color: '#1A1A1A', borderColor: '#8AAABF' },
};

export function isAboveLevel(routeDifficulty: Difficulty, userLevel: SkiLevel): boolean {
  return difficultyRank[routeDifficulty] > levelRank[userLevel];
}
