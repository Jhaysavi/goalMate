'use client';

import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WorldCupEmptyState } from '@/components/worldcup/worldcup-empty-state';
import { useMatches } from '@/hooks/worldcup/useMatches';
import { useMemo } from 'react';

type MissionPlaceholder = {
  id: string;
  title: string;
  description: string;
  xp: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  reward: string;
  category: string;
};

export default function MissionsPage() {
  const { data, isLoading, isError, error } = useMatches();
  const matches = data?.matches ?? [];

  // TEMP UI-only placeholder until we implement match-event mission generation.
  // Still World Cup-focused and tied to an active/upcoming match.
  const missions: MissionPlaceholder[] = useMemo(() => {
    const target = (matches.find((m) => m.status === 'LIVE') ?? matches.find((m) => m.status === 'UPCOMING'));
    if (!target) return [];


    return [
      {
        id: 'm-wc-1',
        title: 'Predict the next yellow card',
        description: `Will a yellow card be shown during ${target.homeTeam.name} vs ${target.awayTeam.name}?`,
        xp: 180,
        difficulty: 'Medium',
        reward: 'World Cup Badge',
        category: `Match • ${target.stage}`,
      },
      {
        id: 'm-wc-2',
        title: 'Predict next corner',
        description: `Will there be a corner before halftime in ${target.homeTeam.name} vs ${target.awayTeam.name}?`,
        xp: 240,
        difficulty: 'Hard',
        reward: 'Corner Master',
        category: `Match • ${target.stage}`,
      },
      {
        id: 'm-wc-3',
        title: 'Predict the final score',
        description: `Choose the final score for ${target.homeTeam.name} vs ${target.awayTeam.name}.`,
        xp: 320,
        difficulty: 'Easy',
        reward: 'Matchday Token',
        category: `Match • ${target.stage}`,
      },
    ];
  }, [matches]);

  return (
    <AppShell>
      <div className="space-y-4">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/60 p-6">
          <h1 className="text-3xl font-semibold text-white">Live Missions (World Cup)</h1>
          <p className="mt-2 text-slate-400">Generated for the active or upcoming match. Complete predictions and earn match-centric XP.</p>
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Card key={i} className="bg-slate-950/50 animate-pulse">
                <CardHeader>
                  <div className="h-5 w-56 rounded bg-white/10" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 w-72 rounded bg-white/10" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isError ? (
          <WorldCupEmptyState
            title="Couldn’t load World Cup missions"
            description={error instanceof Error ? error.message : 'Please try again.'}
          />
        ) : missions.length === 0 ? (
          <WorldCupEmptyState title="No match context yet" description="TxLINE didn’t return any LIVE or UPCOMING matches to anchor missions." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {missions.map((mission) => (
              <Card key={mission.id} className="bg-slate-950/50">
                <CardHeader>
                  <div>
                    <CardTitle>{mission.title}</CardTitle>
                    <p className="text-sm text-slate-400">{mission.category}</p>
                  </div>
                  <Badge>{mission.difficulty}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-300">{mission.description}</p>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
                    <span>XP {mission.xp}</span>
                    <span>{mission.reward}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

