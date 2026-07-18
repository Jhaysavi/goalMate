import type { Route } from 'next';
import { FriendData, MatchCardData, MissionData } from '@/types';

export const navigationItems: Array<{ label: string; href: Route }> = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Story Mode', href: '/story-mode' },
  { label: 'Friends', href: '/friends' },
  { label: 'Friends Rankings', href: '/friends-rankings' },
  { label: 'Rooms', href: '/rooms' },
  { label: 'Live Matches', href: '/live-matches' },
  { label: 'Football IQ', href: '/football-iq' },
  { label: 'Missions', href: '/missions' },
  { label: 'AI Companion', href: '/ai-companion' },
  { label: 'Profile', href: '/profile' },
  { label: 'Notifications', href: '/notifications' },
  { label: 'Settings', href: '/settings' },
  { label: 'Accessibility', href: '/accessibility' },
];

export const liveMatches: MatchCardData[] = [
  {
    id: '1',
    homeTeam: 'Real Madrid',
    awayTeam: 'Inter Milan',
    homeScore: 2,
    awayScore: 1,
    minute: 67,
    competition: 'Champions League',
    stadium: 'Bernabéu',
    status: 'Live',
    intensity: 'High',
    accent: 'from-violet-500/30 to-cyan-500/20',
  },
  {
    id: '2',
    homeTeam: 'Bayern',
    awayTeam: 'Dortmund',
    homeScore: 1,
    awayScore: 2,
    minute: 83,
    competition: 'Bundesliga',
    stadium: 'Allianz Arena',
    status: 'Live',
    intensity: 'High',
    accent: 'from-amber-400/20 to-rose-500/20',
  },
  {
    id: '3',
    homeTeam: 'Arsenal',
    awayTeam: 'City',
    homeScore: 0,
    awayScore: 0,
    minute: 12,
    competition: 'Premier League',
    stadium: 'Emirates',
    status: 'Live',
    intensity: 'Medium',
    accent: 'from-emerald-500/20 to-sky-500/20',
  },
];

export const missions: MissionData[] = [
  {
    id: 'm1',
    title: 'Clutch Predictor',
    description: 'Forecast the final scorer in the next five minutes.',
    xp: 180,
    difficulty: 'Medium',
    category: 'Prediction',
    progress: 72,
    reward: 'Legendary badge',
  },
  {
    id: 'm2',
    title: 'Tactical Decoder',
    description: 'Read the build-up and identify the next attacking pattern.',
    xp: 240,
    difficulty: 'Hard',
    category: 'IQ',
    progress: 38,
    reward: 'Boost token',
    locked: false,
  },
  {
    id: 'm3',
    title: 'Accessibility Sprint',
    description: 'Enable a new assistive experience mode for the room.',
    xp: 320,
    difficulty: 'Easy',
    category: 'Community',
    progress: 100,
    reward: 'Profile glow',
  },
];

export const friends: FriendData[] = [
  { id: 'f1', name: 'Mina', handle: '@mina_fc', club: 'Barcelona', online: true, level: 41 },
  { id: 'f2', name: 'Devon', handle: '@devonx', club: 'Liverpool', online: true, level: 37 },
  { id: 'f3', name: 'Noah', handle: '@noah17', club: 'Inter', online: false, level: 29 },
];
