import { endpoints } from './endpoints';
import { httpRequest } from './http-client';

// DTO types kept minimal until TxLINE schemas are confirmed.
// Repositories will provide typed domain conversion.

export async function txlineGet<T>(params: {
  path: string;
  query?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
}) {
  return httpRequest<T>({
    path: params.path,
    method: 'GET',
    query: params.query,
    signal: params.signal,
  });
}

type TxlineUnknown = Record<string, unknown>;

export type TxlineAnyResponse = TxlineUnknown | unknown[] | string | number | boolean | null;

export const txline = {
  // Matches
  getMatches: async (params: { date?: string; signal?: AbortSignal }) =>
    txlineGet<TxlineAnyResponse>({
      path: endpoints.matches({ date: params.date }),
      query: { date: params.date },
      signal: params.signal,
    }),

  getLiveMatch: async (params: { matchId: string; signal?: AbortSignal }) =>
    txlineGet<TxlineAnyResponse>({
      path: endpoints.liveMatch({ matchId: params.matchId }),
      signal: params.signal,
    }),

  getMatchEvents: async (params: { matchId: string; signal?: AbortSignal }) =>
    txlineGet<TxlineAnyResponse>({
      path: endpoints.matchEvents({ matchId: params.matchId }),
      signal: params.signal,
    }),

  getMatchTimeline: async (params: { matchId: string; signal?: AbortSignal }) =>
    txlineGet<TxlineAnyResponse>({
      path: endpoints.matchTimeline({ matchId: params.matchId }),
      signal: params.signal,
    }),

  getMatchStatistics: async (params: { matchId: string; signal?: AbortSignal }) =>
    txlineGet<TxlineAnyResponse>({
      path: endpoints.matchStatistics({ matchId: params.matchId }),
      signal: params.signal,
    }),

  // Standings / Groups
  getStandings: async (params: { groupId?: string; signal?: AbortSignal }) =>
    txlineGet<TxlineAnyResponse>({
      path: endpoints.standings({ groupId: params.groupId }),
      query: { groupId: params.groupId },
      signal: params.signal,
    }),

  // Predictions
  getPredictions: async (params: { matchId?: string; signal?: AbortSignal }) =>
    txlineGet<TxlineAnyResponse>({
      path: endpoints.predictions({ matchId: params.matchId }),
      query: { matchId: params.matchId },
      signal: params.signal,
    }),

  // Fixtures
  getFixtures: async (params: { signal?: AbortSignal }) =>
    txlineGet<TxlineAnyResponse>({
      path: endpoints.fixtures(),
      signal: params.signal,
    }),
};

