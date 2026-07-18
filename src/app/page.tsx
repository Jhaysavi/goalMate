'use client';

import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import { useMatches } from '@/hooks/worldcup/useMatches';
import { MatchCard } from '@/components/worldcup/match-card';
import { MatchCardSkeleton } from '@/components/worldcup/match-card-skeleton';
import { Badge } from '@/components/ui/badge';
import { WorldCupEmptyState } from '@/components/worldcup/worldcup-empty-state';

export default function LandingPage() {
  const { data, isLoading, isError, error } = useMatches();

  const matches = data?.matches ?? [];
  const live = matches.filter((m) => m.status === 'LIVE');
  const upcoming = matches.filter((m) => m.status === 'UPCOMING');

  return (
    <AppShell>
      <section className="rounded-[32px] border border-white/10 bg-slate-950/60 p-6 shadow-glow lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">FIFA World Cup • Live • AI • Social</p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Your official-style World Cup companion—powered by TxLINE.
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              Get match-centric live score, timeline events, countdowns, missions, predictions and AI commentary—right when it matters.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/live-matches"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground"
              >
                View live matches
              </Link>
              <Link
                href="/auth"
                className="inline-flex h-12 items-center justify-center rounded-full bg-white/10 px-6 text-base font-semibold text-foreground"
              >
                Create account
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="bg-emerald-500/15 text-emerald-300">{live.length} live</Badge>
            <Badge className="bg-cyan-500/15 text-cyan-200">{upcoming.length} upcoming</Badge>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-4">
          <div className="rounded-[32px] border border-white/10 bg-slate-950/50 p-6">
            <p className="text-sm text-cyan-300">Today’s matches</p>
            <div className="mt-3 space-y-3">
              {isLoading ? (
                <div className="space-y-3">
                  {[0, 1].map((i) => (
                    <MatchCardSkeleton key={i} />
                  ))}
                </div>
              ) : isError ? (
                <WorldCupEmptyState
                  title="Couldn’t load World Cup fixtures"
                  description={error instanceof Error ? error.message : 'Please try again.'}
                />
              ) : matches.length === 0 ? (
                <WorldCupEmptyState title="No fixtures found" description="TxLINE returned an empty response for today." />
              ) : (
                <>
                  {[...live, ...upcoming].slice(0, 6).map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[32px] border border-white/10 bg-slate-950/50 p-6">
            <h2 className="text-lg font-semibold text-white">Match-centric experience</h2>
            <p className="mt-2 text-sm text-slate-400">
              Football IQ, Missions, AI Companion and Rooms are generated for the match you’re watching.
            </p>
            <div className="mt-4 grid gap-3">
              {['Live timeline', 'Predictions & missions', 'Accessibility controls'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

