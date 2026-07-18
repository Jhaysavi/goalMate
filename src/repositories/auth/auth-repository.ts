import type { AuthSession, AuthUser } from '@/types/auth';

export type RegisterInput = {
  email: string;
  password: string;
  name: string;
  favoriteTeam?: string;
  country?: string;
  avatarUrl?: string;
  theme?: 'dark' | 'light';
  accessibilityPreferences?: string[];
};

export type LoginInput = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type AuthRepository = {
  init(): Promise<void>;

  getUserByEmail(email: string): Promise<AuthUser | null>;
  createUser(input: RegisterInput, passwordHash: string): Promise<AuthUser>;

  createSession(userId: string, rememberMe?: boolean): Promise<AuthSession>;
  restoreSession(sessionId: string): Promise<AuthUser | null>;

  logout(sessionId: string): Promise<void>;

  updateProfile(userId: string, patch: Partial<AuthUser>): Promise<AuthUser>;
  deleteAccount(userId: string): Promise<void>;

  updatePassword(userId: string, passwordHash: string): Promise<void>;
};

