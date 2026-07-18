export type AuthRole = 'Demo User' | 'User' | 'Admin';

export type AccessibilityPreferences = {
  highContrast?: boolean;
  audioCues?: boolean;
  cognitiveSupport?: boolean;
  assistiveTools?: boolean;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // never expose to UI

  favoriteTeam?: string;
  country?: string;
  avatarUrl?: string;

  theme?: 'dark' | 'light';
  accessibilityPreferences?: string[];

  footballIQ: {
    level: number;
    xp: number;
  };

  achievements: string[];
  badges: string[];
  predictionHistory: Array<{ matchId: string; createdAt: string }>;

  createdAt: string;
  lastLoginAt?: string;

  role: AuthRole;
};

export type AuthSession = {
  id: string;
  userId: string;
  createdAt: string;
  expiresAt?: string;
};

