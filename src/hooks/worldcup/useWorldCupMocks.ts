import type { WorldCupMatch, WorldCupMatchList } from '@/types/worldcup';

function mockMatchBase(overrides: Partial<WorldCupMatch>): WorldCupMatch {
  return {
    id: overrides.id ?? 'wc-mock-1',
    competition: 'FIFA World Cup',
    stage: overrides.stage ?? 'GROUP',
    group: overrides.group ?? 'A',
    kickoffAt: overrides.kickoffAt ?? new Date().toISOString(),
    status: overrides.status ?? 'LIVE',
    homeTeam: overrides.homeTeam ?? { id: 'home', name: 'Brazil', logoUrl: undefined },
    awayTeam: overrides.awayTeam ?? { id: 'away', name: 'France', logoUrl: undefined },
    score: overrides.score ?? { home: 1, away: 0 },
    venue: overrides.venue ?? 'Stadium (Mock)',
  };
}

export function getMockWorldCupMatches(params: { date?: string }): WorldCupMatchList {
  const date = params.date ?? new Date().toISOString().slice(0, 10);
  return {
    matches: [
      mockMatchBase({
        id: 'wc-1',
        stage: 'GROUP',
        group: 'A',
        kickoffAt: `${date}T18:00:00.000Z`,
        status: 'LIVE',
        homeTeam: { id: 'br', name: 'Brazil' },
        awayTeam: { id: 'fr', name: 'France' },
        score: { home: 2, away: 1 },
        venue: 'Mock Arena',
      }),
      mockMatchBase({
        id: 'wc-2',
        stage: 'GROUP',
        group: 'B',
        kickoffAt: `${date}T21:00:00.000Z`,
        status: 'UPCOMING',
        homeTeam: { id: 'ar', name: 'Argentina' },
        awayTeam: { id: 'ng', name: 'Nigeria' },
        score: { home: 0, away: 0 },
        venue: 'Mock Stadium',
      }),
    ],
  };
}

export function getMockWorldCupLiveMatch(params: { matchId: string }): WorldCupMatch {
  return mockMatchBase({
    id: params.matchId,
    status: 'LIVE',
    score: { home: 1, away: 0 },
  });
}

