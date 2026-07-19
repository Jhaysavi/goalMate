import type { WorldCupMatch, WorldCupMatchList } from '@/types/worldcup';

// TxLINE schema is not confirmed yet; mapper is intentionally defensive.
// Once official docs are provided, we will replace the placeholders.

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord {
  return (value && typeof value === 'object' ? (value as UnknownRecord) : {}) as UnknownRecord;
}

function toStringOrUndefined(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined;
  return typeof value === 'string' ? value : String(value);
}

function toNumberOrZero(value: unknown): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim() !== '') return Number(value);
  return 0;
}

export function mapTxlineMatchListToDomain(raw: unknown): WorldCupMatchList {
  const r = asRecord(raw);
  const matches = Array.isArray((r as UnknownRecord).matches)
    ? ((r as UnknownRecord).matches as unknown[])
    : Array.isArray(raw)
      ? (raw as unknown[])
      : [];

  return {
    matches: matches.map(mapTxlineSingleMatchToDomain),
  };
}

export function mapTxlineSingleMatchToDomain(raw: unknown): WorldCupMatch {
  const r = asRecord(raw);
  const homeTeam = asRecord(r.homeTeam);
  const awayTeam = asRecord(r.awayTeam);
  const score = asRecord(r.score);

  return {
    id: String(r.id ?? r.matchId ?? ''),
    stage: toStringOrUndefined(r.stage ?? r.round) ?? 'GROUP',
    group: (asRecord(r.group).name ? String(asRecord(r.group).name) : (toStringOrUndefined(r.group) ?? undefined)),
    competition: 'FIFA World Cup',
    kickoffAt: toStringOrUndefined(r.kickoffAt ?? r.kickoff),
    status: toStringOrUndefined(r.status ?? r.state) ?? 'UPCOMING',
    homeTeam: {
      id: String(homeTeam.id ?? ''),
      name: toStringOrUndefined(homeTeam.name ?? homeTeam) ?? '',
      logoUrl: toStringOrUndefined(homeTeam.logoUrl ?? homeTeam.logo),
    },
    awayTeam: {
      id: String(awayTeam.id ?? ''),
      name: toStringOrUndefined(awayTeam.name ?? awayTeam) ?? '',
      logoUrl: toStringOrUndefined(awayTeam.logoUrl ?? awayTeam.logo),
    },
    score: {
      home: toNumberOrZero(score.home ?? r.homeScore),
      away: toNumberOrZero(score.away ?? r.awayScore),
    },
    venue: toStringOrUndefined(asRecord(r.venue).name ?? r.stadium ?? r.venue),
  };
}

// TxLINE fixtures snapshot => GoalMates WorldCupMatch
// Fixture fields per provided doc:
// { FixtureId, Participant1, Participant2, StartTime, Competition, GameState }

export function mapTxlineFixtureToMatch(raw: unknown): WorldCupMatch {
  const r = asRecord(raw);

  const fixtureId = r.FixtureId ?? r.fixtureId ?? r.FixtureID;
  const participant1 = r.Participant1 ?? r.HomeTeam ?? r.participant1;
  const participant2 = r.Participant2 ?? r.AwayTeam ?? r.participant2;

  const startTime = r.StartTime ?? r.startTime;

  const gameState = toStringOrUndefined(r.GameState ?? r.gameState) ?? 'UPCOMING';

  // GoalMates match model uses status 'LIVE' | 'UPCOMING' | 'FINISHED'
  // TxLINE game state mapping is defensive.
  const status =
    gameState.toUpperCase().includes('LIVE') || gameState.toUpperCase().includes('IN_PROGRESS')
      ? 'LIVE'
      : gameState.toUpperCase().includes('FINISH') || gameState.toUpperCase().includes('FULLTIME')
        ? 'FINISHED'
        : 'UPCOMING';

  return {
    id: String(fixtureId ?? ''),
    competition: 'FIFA World Cup',
    stage: 'GROUP',
    group: undefined,
    kickoffAt: typeof startTime === 'string' ? startTime : toStringOrUndefined(startTime),
    status,
    homeTeam: {
      id: String(r.Participant1Id ?? r.Participant1id ?? ''),
      name: toStringOrUndefined(participant1 ?? r.Participant1) ?? '',
      logoUrl: undefined,
    },
    awayTeam: {
      id: String(r.Participant2Id ?? r.Participant2id ?? ''),
      name: toStringOrUndefined(participant2 ?? r.Participant2) ?? '',
      logoUrl: undefined,
    },
    score: {
      home: toNumberOrZero(r.ScoreHome ?? 0),
      away: toNumberOrZero(r.ScoreAway ?? 0),
    },
    venue: undefined,
  };
}

export function mapTxlineFixturesToMatchList(fixtures: unknown[]): WorldCupMatchList {
  return {
    matches: Array.isArray(fixtures) ? fixtures.map(mapTxlineFixtureToMatch) : [],
  };
}



