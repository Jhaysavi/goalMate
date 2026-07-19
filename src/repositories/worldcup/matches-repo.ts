import type { WorldCupMatch, WorldCupMatchList } from '@/types/worldcup';
import { mapTxlineFixtureToMatch, mapTxlineFixturesToMatchList } from './mappers';

// Repositories are the only place that talks to the API layer.
// IMPORTANT: fixtures must be loaded via our server-side proxies (no NEXT_PUBLIC_* config).

export async function getMatches(params: { date?: string; signal?: AbortSignal }): Promise<WorldCupMatchList> {
  const date = params.date ?? new Date().toISOString().slice(0, 10);

  const start = new Date(date + 'T00:00:00.000Z');
  const startEpochDay = Math.floor(start.getTime() / 86400000);

  const res = await fetch(
    `/api/txline/fixtures?competitionId=72&startEpochDay=${startEpochDay}`,
    {
      signal: params.signal,
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Failed to load fixtures (${res.status})`);
  }

  const json = (await res.json()) as { fixtures?: unknown[] };
  return mapTxlineFixturesToMatchList(json.fixtures ?? []);
}

export async function getLiveMatch(params: { matchId: string; signal?: AbortSignal }): Promise<WorldCupMatch> {
  // Live match can be wired to another proxy later.
  // For now, keep existing defensive behavior.
  const res = await fetch(`/api/txline/odds-snapshot?matchId=${encodeURIComponent(params.matchId)}`, {
    signal: params.signal,
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Failed to load live match (${res.status})`);
  }

  const json = (await res.json()) as { match?: WorldCupMatch } | { [key: string]: unknown };
  if (typeof 'match' in json && (json as { match?: WorldCupMatch }).match) {
    return (json as { match: WorldCupMatch }).match;
  }

  // Fallback: if backend returns a match directly, attempt to treat it as WorldCupMatch.
  return mapTxlineFixtureToMatch(json as unknown);
}


