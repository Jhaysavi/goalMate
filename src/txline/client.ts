import { txlineGet } from '@/services/api/txline-client';
import type { TxlineFixture } from './types/fixture';
import type { OddsUpdate } from './types/odds';

export type TxlineFixturesSnapshot = {
  Fixtures?: TxlineFixture[];
  fixtures?: TxlineFixture[];
  matches?: TxlineFixture[];
  Items?: TxlineFixture[];
};

export async function fetchFixturesSnapshot(params: {
  competitionId: number;
  startEpochDay: number;
  signal?: AbortSignal;
}): Promise<TxlineFixture[]> {
  const data = await txlineGet<TxlineFixturesSnapshot>({
    path: `/fixtures/snapshot`,
    query: {
      competitionId: params.competitionId,
      startEpochDay: params.startEpochDay,
    },
    signal: params.signal,
  });

  const fixtures =
    data?.Fixtures ?? data?.fixtures ?? data?.matches ?? data?.Items ?? [];

  return Array.isArray(fixtures) ? (fixtures as TxlineFixture[]) : [];
}

export async function fetchOddsSnapshot(params: {
  fixtureId: number;
  signal?: AbortSignal;
}): Promise<unknown> {
  return txlineGet<unknown>({
    path: `/odds/snapshot/${params.fixtureId}`,
    signal: params.signal,
  });
}

export async function fetchLiveOddsOnce(params: {
  token: string;
  signal?: AbortSignal;
}): Promise<unknown> {
  // SSE is handled by server/client stream hook.
  return { tokenProvided: Boolean(params.token) };
}

export async function fetchLiveOddsStreamUrl(): Promise<string> {
  return `/odds/stream`;
}

export type TxlineOddsStreamPayload = OddsUpdate;

