'use client';

import { useQuery } from '@tanstack/react-query';
import { getLiveMatch } from '@/repositories/worldcup/matches-repo';
import type { WorldCupMatch } from '@/types/worldcup';
import { getMockWorldCupLiveMatch } from './useWorldCupMocks';

export function useLiveMatch(params: { matchId?: string }) {
  return useQuery<WorldCupMatch>({
    queryKey: ['worldcup', 'liveMatch', params.matchId ?? 'none'],
    enabled: Boolean(params.matchId),
    queryFn: async ({ signal }) => {
      try {
        return await getLiveMatch({ matchId: params.matchId as string, signal });
      } catch {
        return getMockWorldCupLiveMatch({ matchId: params.matchId as string });
      }
    },
  });
}

