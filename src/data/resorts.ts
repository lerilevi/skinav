import type { Resort } from '../types';

// Hardcoded resort list for the selection screen. Resort data (pistes/lifts) is
// resort-DEPENDENT and pulled from OSM later — this is just the pickable catalog.
export const RESORTS: Resort[] = [
  { id: 1, name: 'Zermatt', country: '🇨🇭 Switzerland', runs: 360, lifts: 52, difficulty: 'All levels', downloaded: true },
  { id: 2, name: 'Verbier', country: '🇨🇭 Switzerland', runs: 410, lifts: 42, difficulty: 'Advanced', downloaded: false },
  { id: 3, name: 'Chamonix', country: '🇫🇷 France', runs: 170, lifts: 49, difficulty: 'Expert', downloaded: false },
  { id: 4, name: "Cortina d'Ampezzo", country: '🇮🇹 Italy', runs: 140, lifts: 34, difficulty: 'All levels', downloaded: false },
  { id: 5, name: 'Kitzbühel', country: '🇦🇹 Austria', runs: 200, lifts: 57, difficulty: 'All levels', downloaded: false },
];
