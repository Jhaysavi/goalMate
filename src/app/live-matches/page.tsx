'use client';

import { AppShell } from '@/components/layout/app-shell';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMatches } from '@/hooks/worldcup/useMatches';
import { MatchCard } from '@/components/worldcup/match-card';
import { MatchCardSkeleton } from '@/components/worldcup/match-card-skeleton';
import { WorldCupEmptyState } from '@/components/worldcup/worldcup-empty-state';

export default function LiveMatchesPage() {
  const { data, isLoading, isError, error } = useMatches();
  const matches = data?.matches ?? [];
  const live = matches.filter((m) => m.status === 'LIVE');

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          <div className="rounded-[32px] border border-white/10 bg-slate-950/60 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-300">Live now</p>
                <h1 className="text-3xl font-semibold text-white">FIFA World Cup live matches</h1>
              </div>
              <Badge className="bg-emerald-500/15 text-emerald-300">{live.length} active</Badge>
            </div>
          </div>

          <div className="space-y-3">
            {isLoading ? (
              <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <MatchCardSkeleton key={i} />
                ))}
              </div>
            ) : isError ? (
              <WorldCupEmptyState
                title="Couldn’t load live fixtures"
                description={error instanceof Error ? error.message : 'Please try again.'}
              />
            ) : live.length === 0 ? (
              <WorldCupEmptyState title="No matches live right now" description="TxLINE reports zero LIVE matches." />
            ) : (
              live.map((match) => <MatchCard key={match.id} match={match} />)
            )}
          </div>
        </div>

        <Card className="h-fit bg-slate-950/50">
          <CardHeader>
            <CardTitle>Live Missions (match-centric)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-300">
              Missions will be generated from match events (goals, cards, corners, VAR, subs). This UI slice is wired to World Cup fixtures.
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

