import { txline } from '@/services/api/txline-client';
import type { WorldCupMatch, WorldCupMatchList } from '@/types/worldcup';
import { mapTxlineMatchListToDomain, mapTxlineSingleMatchToDomain } from './mappers';


// Repositories are the only place that talks to the API layer.

export async function getMatches(params: { date?: string; signal?: AbortSignal }): Promise<WorldCupMatchList> {
  const raw = await txline.getMatches({ date: params.date, signal: params.signal });
  return mapTxlineMatchListToDomain(raw);
}

export async function getLiveMatch(params: { matchId: string; signal?: AbortSignal }): Promise<WorldCupMatch> {
  const raw = await txline.getLiveMatch({ matchId: params.matchId, signal: params.signal });
  return mapTxlineSingleMatchToDomain(raw);
}

