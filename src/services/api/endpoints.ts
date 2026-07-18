// Centralized endpoint registry (placeholders until TxLINE docs are confirmed).

export const endpoints = {
  // Matches
  matches: (params: { date?: string }) => {
    const base = '/worldcup/matches';
    if (!params.date) return base;
    return `${base}`; // date will be passed via query
  },

  liveMatch: (params: { matchId: string }) => `/worldcup/matches/${params.matchId}`,

  matchEvents: (params: { matchId: string }) => `/worldcup/matches/${params.matchId}/events`,

  matchTimeline: (params: { matchId: string }) => `/worldcup/matches/${params.matchId}/timeline`,

  matchStatistics: (params: { matchId: string }) => `/worldcup/matches/${params.matchId}/statistics`,

  // Standings / Groups
  standings: (params: { groupId?: string }) => {
    const base = '/worldcup/standings';
    if (!params.groupId) return base;
    return base;
  },

  // Predictions
  predictions: (params: { matchId?: string }) => {
    const base = '/worldcup/predictions';
    if (!params.matchId) return base;
    return base;
  },

  // Fixtures
  fixtures: () => '/worldcup/fixtures',

  // Live feed (stream)
  liveFeed: (params: { matchId: string }) => `/worldcup/matches/${params.matchId}/live-feed`,
};

