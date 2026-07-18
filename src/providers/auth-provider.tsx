'use client';

import type { AuthSession, AuthUser } from '@/types/auth';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LocalAuthRepository } from '@/repositories/auth/local-auth-repository';

type AuthContextValue = {
  user: AuthUser | null;
  session: AuthSession | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';

  login: (input: { email: string; password: string; rememberMe?: boolean }) => Promise<void>;
  register: (input: { email: string; password: string; name: string; favoriteTeam?: string; country?: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const repo = new LocalAuthRepository();

const LS_KEYS = {
  activeSessionId: 'gm_active_session_id_v1',
};

function readActiveSessionId(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(LS_KEYS.activeSessionId);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [status, setStatus] = useState<AuthContextValue['status']>('loading');

  useEffect(() => {
    let cancelled = false;

    async function restore() {
      try {
        await repo.init();
        const sid = readActiveSessionId();
        if (!sid) {
          if (!cancelled) setStatus('unauthenticated');
          return;
        }

        const restoredUser = await repo.restoreSession(sid);
        if (!cancelled) {
          if (restoredUser) {
            setUser(restoredUser);
            setSession({ id: sid, userId: restoredUser.id, createdAt: new Date().toISOString() });
            setStatus('authenticated');
          } else {
            setStatus('unauthenticated');
          }
        }
      } catch {
        if (!cancelled) setStatus('unauthenticated');
      }
    }

    restore();
    return () => {
      cancelled = true;
    };
  }, []);

  const logout = useCallback(async () => {
    const sid = readActiveSessionId();
    if (sid) await repo.logout(sid);
    setUser(null);
    setSession(null);
    setStatus('unauthenticated');
  }, []);

  const login = useCallback(
    async (input: { email: string; password: string; rememberMe?: boolean }) => {
      const s = await repo.login(input);
      const restoredUser = await repo.restoreSession(s.id);
      setUser(restoredUser);
      setSession(s);
      setStatus('authenticated');
    },
    []
  );

  const register = useCallback(
    async (input: { email: string; password: string; name: string; favoriteTeam?: string; country?: string }) => {
      await repo.init();
      const passwordHash = await (await import('@/repositories/auth/password-hashing')).webcryptoPasswordHash(input.password);

      const user = await repo.createUser(
        {
          email: input.email,
          password: input.password,
          name: input.name,
          favoriteTeam: input.favoriteTeam,
          country: input.country,
          avatarUrl: undefined,
          theme: 'dark',
          accessibilityPreferences: ['high-contrast'],
        },
        passwordHash
      );

      const session = await repo.createSession(user.id, true);
      setUser(user);
      setSession(session);
      setStatus('authenticated');
    },
    []
  );

  const value = useMemo<AuthContextValue>(
    () => ({ user, session, status, login, register, logout }),
    [user, session, status, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

