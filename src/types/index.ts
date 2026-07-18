export type NavItem = {
  label: string;
  href: string;
  icon?: string;
};

export type MatchCardData = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: number;
  competition: string;
  stadium: string;
  status: 'Live' | 'Upcoming' | 'Finished';
  intensity: 'High' | 'Medium' | 'Low';
  accent: string;
};

export type MissionData = {
  id: string;
  title: string;
  description: string;
  xp: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  progress: number;
  reward: string;
  locked?: boolean;
};

export type FriendData = {
  id: string;
  name: string;
  handle: string;
  club: string;
  online: boolean;
  level: number;
};
