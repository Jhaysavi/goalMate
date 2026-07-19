'use client';

import { useQuery } from '@tanstack/react-query';
import type { TxlineFixture } from '@/txline/types/fixture';

export function useFixtures(params: { startEpochDay: number; competitionId: number }) {
  return useQuery<TxlineFixture[]>({
    queryKey: ['txline', 'fixtures', params.competitionId, params.startEpochDay],
    queryFn: async ({ signal }) => {
      const base = '/api/txline/fixtures';
      const url = new URL(base, window.location.origin);
      url.searchParams.set('competitionId', String(params.competitionId));
      url.searchParams.set('startEpochDay', String(params.startEpochDay));

      const res = await fetch(url.toString(), { signal, cache: 'no-store' });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `Failed to load fixtures (${res.status})`);
      }

      const json = (await res.json()) as { fixtures?: TxlineFixture[] };
      return json.fixtures ?? [];
    },
  });
}



