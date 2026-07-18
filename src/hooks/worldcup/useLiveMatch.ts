'use client';

import { useQuery } from '@tanstack/react-query';
import { getLiveMatch } from '@/repositories/worldcup/matches-repo';
import type { WorldCupMatch } from '@/types/worldcup';
import { getMockWorldCupLiveMatch } from './useWorldCupMocks';

const SHOULD_USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export function useLiveMatch(params: { matchId?: string }) {
  return useQuery<WorldCupMatch>({
    queryKey: ['worldcup', 'liveMatch', params.matchId ?? 'none'],
    enabled: Boolean(params.matchId),
    queryFn: async ({ signal }: { signal?: AbortSignal }) => {
      try {
        return await getLiveMatch({ matchId: params.matchId as string, signal });
      } catch (e) {
        if (SHOULD_USE_MOCKS) {
          return getMockWorldCupLiveMatch({ matchId: params.matchId as string });
        }
        throw e;
      }
    },
  });
}


