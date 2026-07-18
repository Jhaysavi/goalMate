'use client';

import type { StorageService } from '@/services/storage/storage-service';

function safeJsonParse<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function createLocalStorageProvider(): StorageService {
  return {
    async getItem<T>(key: string) {
      if (typeof window === 'undefined') return null;
      const raw = window.localStorage.getItem(key);
      if (!raw) return null;
      return safeJsonParse<T>(raw);
    },

    async setItem<T>(key: string, value: T) {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(key, JSON.stringify(value));
    },

    async removeItem(key: string) {
      if (typeof window === 'undefined') return;
      window.localStorage.removeItem(key);
    },
  };
}

