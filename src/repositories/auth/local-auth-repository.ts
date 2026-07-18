'use client';

import type { AuthRepository, LoginInput, RegisterInput } from '@/repositories/auth/auth-repository';
import type { AuthSession, AuthUser } from '@/types/auth';
import { createLocalStorageProvider } from '@/services/storage/local-storage-provider';

import { webcryptoPasswordHash } from './password-hashing';

const storage = createLocalStorageProvider();

const LS_KEYS = {
  users: 'gm_users_v1',
  sessions: 'gm_sessions_v1',
  activeSessionId: 'gm_active_session_id_v1',
  demoProvisioned: 'gm_demo_provisioned_v1',
};

type UsersStore = Record<string, AuthUser>; // id -> user

type SessionsStore = Record<string, AuthSession>; // sessionId -> session

function nowIso() {
  return new Date().toISOString();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function passwordStrength(pw: string) {
  // deterministic + simple: length>=8, contains letters and numbers
  const okLen = pw.length >= 8;
  const hasLetter = /[A-Za-z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  return okLen && hasLetter && hasNumber;
}

export class LocalAuthRepository implements AuthRepository {
  async init(): Promise<void> {
    // Ensure demo account exists
    const provisioned = await storage.getItem<boolean>(LS_KEYS.demoProvisioned);
    if (provisioned) return;

    const existing = await storage.getItem<UsersStore>(LS_KEYS.users);
    const users = existing ?? {};

    const demoEmail = 'admin@goalmates.app';
    const already = Object.values(users).some((u) => u.email.toLowerCase() === demoEmail.toLowerCase());

    if (!already) {
      const demoPassword = 'admin123';
      const passwordHash = await webcryptoPasswordHash(demoPassword);

      const id = crypto.randomUUID();
      users[id] = {
        id,
        name: 'GoalMates Demo',
        email: demoEmail,
        passwordHash,
        favoriteTeam: undefined,
        country: undefined,
        avatarUrl: undefined,
        theme: 'dark',
        accessibilityPreferences: ['high-contrast'],
        footballIQ: { level: 1, xp: 0 },
        achievements: [],
        badges: [],
        predictionHistory: [],
        createdAt: nowIso(),
        lastLoginAt: undefined,
        role: 'Demo User',
      };

      await storage.setItem(LS_KEYS.users, users);
    }

    await storage.setItem(LS_KEYS.demoProvisioned, true);
  }

  async getUserByEmail(email: string): Promise<AuthUser | null> {
    const users = (await storage.getItem<UsersStore>(LS_KEYS.users)) ?? {};
    const match = Object.values(users).find((u) => u.email.toLowerCase() === email.toLowerCase());
    return match ?? null;
  }

  async createUser(input: RegisterInput, passwordHash: string): Promise<AuthUser> {
    const email = input.email.trim();

    if (!isValidEmail(email)) throw new Error('Invalid email format');
    if (!passwordStrength(input.password)) throw new Error('Password must be at least 8 characters and include letters and numbers');

    const users = (await storage.getItem<UsersStore>(LS_KEYS.users)) ?? {};

    const exists = Object.values(users).some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) throw new Error('Email already registered');

    const id = crypto.randomUUID();
    const user: AuthUser = {
      id,
      name: input.name.trim(),
      email,
      passwordHash,
      favoriteTeam: input.favoriteTeam,
      country: input.country,
      avatarUrl: input.avatarUrl,
      theme: input.theme ?? 'dark',
      accessibilityPreferences: input.accessibilityPreferences,
      footballIQ: { level: 1, xp: 0 },
      achievements: [],
      badges: [],
      predictionHistory: [],
      createdAt: nowIso(),
      lastLoginAt: undefined,
      role: 'User',
    };

    users[id] = user;
    await storage.setItem(LS_KEYS.users, users);

    return user;
  }

  async createSession(userId: string, rememberMe?: boolean): Promise<AuthSession> {
    const sessions = (await storage.getItem<SessionsStore>(LS_KEYS.sessions)) ?? {};

    const id = crypto.randomUUID();
    const createdAt = nowIso();
    const expiresAt = rememberMe ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString() : undefined;

    const session: AuthSession = { id, userId, createdAt, expiresAt };
    sessions[id] = session;

    await storage.setItem(LS_KEYS.sessions, sessions);
    await storage.setItem(LS_KEYS.activeSessionId, id);

    return session;
  }

  async restoreSession(sessionId: string): Promise<AuthUser | null> {
    const sessions = (await storage.getItem<SessionsStore>(LS_KEYS.sessions)) ?? {};
    const session = sessions[sessionId];
    if (!session) return null;

    if (session.expiresAt && Date.now() > Date.parse(session.expiresAt)) {
      await this.logout(sessionId);
      return null;
    }

    const users = (await storage.getItem<UsersStore>(LS_KEYS.users)) ?? {};
    return users[session.userId] ?? null;
  }

  async logout(sessionId: string): Promise<void> {
    const sessions = (await storage.getItem<SessionsStore>(LS_KEYS.sessions)) ?? {};
    delete sessions[sessionId];
    await storage.setItem(LS_KEYS.sessions, sessions);

    const active = await storage.getItem<string>(LS_KEYS.activeSessionId);
    if (active === sessionId) {
      await storage.removeItem(LS_KEYS.activeSessionId);
    }
  }

  async updateProfile(userId: string, patch: Partial<AuthUser>): Promise<AuthUser> {
    const users = (await storage.getItem<UsersStore>(LS_KEYS.users)) ?? {};
    const user = users[userId];
    if (!user) throw new Error('User not found');

    users[userId] = {
      ...user,
      ...patch,
      // never allow passwordHash overwrite through profile
      passwordHash: user.passwordHash,
    };

    await storage.setItem(LS_KEYS.users, users);
    return users[userId];
  }

  async deleteAccount(userId: string): Promise<void> {
    const users = (await storage.getItem<UsersStore>(LS_KEYS.users)) ?? {};
    const sessions = (await storage.getItem<SessionsStore>(LS_KEYS.sessions)) ?? {};

    delete users[userId];

    // remove sessions
    for (const [sid, s] of Object.entries(sessions)) {
      if (s.userId === userId) delete sessions[sid];
    }

    await storage.setItem(LS_KEYS.users, users);
    await storage.setItem(LS_KEYS.sessions, sessions);

    const active = await storage.getItem<string>(LS_KEYS.activeSessionId);
    if (active) {
      const restored = await this.restoreSession(active);
      if (restored?.id === userId) await storage.removeItem(LS_KEYS.activeSessionId);
    }
  }

  async updatePassword(userId: string, passwordHash: string): Promise<void> {
    const users = (await storage.getItem<UsersStore>(LS_KEYS.users)) ?? {};
    const user = users[userId];
    if (!user) throw new Error('User not found');

    users[userId] = { ...user, passwordHash };
    await storage.setItem(LS_KEYS.users, users);
  }

  // Convenience helpers used by AuthProvider
  async login(input: LoginInput): Promise<AuthSession> {
    await this.init();

    const user = await this.getUserByEmail(input.email);
    if (!user) throw new Error('Invalid email or password');

    const incomingHash = await webcryptoPasswordHash(input.password);
    if (incomingHash !== user.passwordHash) throw new Error('Invalid email or password');

    const session = await this.createSession(user.id, input.rememberMe);

    // update last login
    const updated = await this.updateProfile(user.id, { lastLoginAt: nowIso() });
    return session;
  }
}

