'use client';

import { useQuery } from '@tanstack/react-query';
import { getMatches } from '@/repositories/worldcup/matches-repo';
import type { WorldCupMatchList } from '@/types/worldcup';
import { getMockWorldCupMatches } from './useWorldCupMocks';


export function useMatches(params: { date?: string } = {}) {
  return useQuery<WorldCupMatchList>({
    queryKey: ['worldcup', 'matches', params.date ?? 'today'],
    queryFn: async ({ signal }) => {
      try {
        return await getMatches({ date: params.date, signal });
      } catch {
        // Offline/early integration fallback
        return getMockWorldCupMatches({ date: params.date });
      }
    },
  });
}

