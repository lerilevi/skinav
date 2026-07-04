import type { Alert } from '../types';

// Demo alert data — hardcoded for now (per planning notes, the shape is already
// aligned with what a real alerts API would return: category / severity /
// source / reportCount / actions). Swap this constant for a fetch when the
// backend lands.
export const ALERTS: Alert[] = [
  {
    id: 1,
    category: 'lift',
    severity: 'urgent',
    icon: '🚡',
    title: 'Matterhorn Glacier Ride closed',
    desc: 'High winds at summit (gusts 68 km/h). Status reassessed every 15 min.',
    location: 'Trockener Steg → Klein Matterhorn',
    time: '8 min ago',
    source: 'official',
    actions: ['View status', 'Alt. route'],
  },
  {
    id: 2,
    category: 'weather',
    severity: 'warning',
    icon: '🌫',
    title: 'Fog advisory · Upper mountain',
    desc: 'Visibility under 50m above 2800m. Stay on marked pistes, avoid off-piste.',
    location: 'Above Trockener Steg',
    time: '22 min ago',
    source: 'official',
    actions: ['View on map'],
  },
  {
    id: 3,
    category: 'piste',
    severity: 'warning',
    icon: '🧊',
    title: 'Icy patches on Black 4',
    desc: 'Refrozen surface reported near markers 3–5. Ski with caution.',
    location: 'Black 4 · M3–M5',
    time: '14 min ago',
    source: 'community',
    reportCount: 5,
    actions: ['View on map', 'Confirm'],
  },
  {
    id: 4,
    category: 'lift',
    severity: 'warning',
    icon: '⏳',
    title: 'Long queue at Glacier Express',
    desc: 'Estimated 15 minute wait. Sunnegga Express is currently clear.',
    location: 'Glacier Express · Base',
    time: '3 min ago',
    source: 'community',
    reportCount: 12,
    actions: ['See alternatives'],
  },
  {
    id: 5,
    category: 'piste',
    severity: 'good',
    icon: '✨',
    title: 'Red 12 freshly groomed',
    desc: 'Perfect corduroy conditions. Groomed at 07:20 this morning.',
    location: 'Red 12',
    time: '1 hr ago',
    source: 'official',
  },
  {
    id: 6,
    category: 'weather',
    severity: 'good',
    icon: '❄',
    title: '10 cm fresh snow overnight',
    desc: 'Powder conditions in off-piste zones. Base depth now 215 cm.',
    location: 'Resort-wide',
    time: '3 hr ago',
    source: 'official',
  },
  {
    id: 7,
    category: 'community',
    severity: 'info',
    icon: '🏫',
    title: 'Ski school on Green 3',
    desc: 'Groups of young skiers practicing between markers 2–4. Pass with care.',
    location: 'Green 3 · M2–M4',
    time: '30 min ago',
    source: 'community',
    reportCount: 2,
  },
  {
    id: 8,
    category: 'lift',
    severity: 'info',
    icon: '🔧',
    title: 'Furi Gondola: reduced capacity',
    desc: 'Every other cabin running for scheduled maintenance until 14:00.',
    location: 'Zermatt → Furi',
    time: '45 min ago',
    source: 'official',
  },
];

// Badge count reflects only unread urgent + warning alerts.
export function unreadCount(alertsRead: boolean): number {
  if (alertsRead) return 0;
  return ALERTS.filter((a) => a.severity === 'urgent' || a.severity === 'warning').length;
}
