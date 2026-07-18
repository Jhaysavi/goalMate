export type WorldCupTeam = {
  id: string;
  name: string;
  logoUrl?: string;
};

export type WorldCupScore = {
  home: number;
  away: number;
};

export type WorldCupMatch = {
  id: string;
  competition: 'FIFA World Cup';
  stage: string; // e.g. GROUP, ROUND_OF_16, QUARTER_FINAL, FINAL
  group?: string; // group letter/name
  kickoffAt?: string; // ISO
  status: string; // UPCOMING | LIVE | FINISHED etc
  homeTeam: WorldCupTeam;
  awayTeam: WorldCupTeam;
  score: WorldCupScore;
  venue?: string;
};

export type WorldCupMatchList = {
  matches: WorldCupMatch[];
};

export type WorldCupEvent = {
  id: string;
  matchId: string;
  type: string; // GOAL|CARD|CORNER|VAR|SUBSTITUTION|KICKOFF|HALFTIME|FULLTIME|EXTRA_TIME|PENALTIES
  minute?: number;
  teamId?: string;
  playerName?: string;
  payload?: Record<string, unknown>;

  occurredAt?: string;
};

