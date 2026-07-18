import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { friends, liveMatches, missions } from '@/constants/mock-data';

const stats = [
  { label: 'XP this week', value: '8,420', hint: '+14%' },
  { label: 'Prediction accuracy', value: '84%', hint: '+6%' },
  { label: 'Active rooms', value: '12', hint: 'Live now' },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(67,56,202,0.24),_transparent_35%),linear-gradient(135deg,_rgba(15,23,42,0.95),_rgba(2,6,23,0.98))] p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Welcome back</p>
              <h1 className="text-2xl font-semibold text-white sm:text-3xl">Your football universe is ready for another matchday.</h1>
              <p className="text-sm leading-7 text-slate-300 sm:text-base">Track live stories, climb rankings, and keep every part of your fan life in one premium experience.</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-sm text-slate-400">Current streak</p>
              <p className="mt-1 text-2xl font-semibold text-white">7 days</p>
              <p className="text-sm text-emerald-300">+320 XP this week</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-slate-950/50">
              <CardContent className="space-y-1">
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="text-sm text-emerald-300">{stat.hint}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <Card className="bg-slate-950/50">
              <CardHeader>
                <div>
                  <p className="text-sm text-cyan-300">Live now</p>
                  <CardTitle>Matchday pulse</CardTitle>
                </div>
                <Link href="/live-matches" className="text-sm font-medium text-cyan-300">Open feed</Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {liveMatches.slice(0, 2).map((match) => (
                  <div key={match.id} className="rounded-[20px] border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm text-slate-400">{match.competition}</p>
                      <Badge className="bg-emerald-500/15 text-emerald-300">{match.status}</Badge>
                    </div>
                    <p className="mt-2 text-lg font-semibold text-white">{match.homeTeam} vs {match.awayTeam}</p>
                    <p className="mt-2 text-sm text-slate-400">{match.minute}' • {match.stadium}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-950/50">
              <CardHeader>
                <div>
                  <p className="text-sm text-fuchsia-300">Today’s challenge</p>
                  <CardTitle>Mission lane</CardTitle>
                </div>
                <Link href="/missions" className="text-sm font-medium text-cyan-300">View all</Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {missions.slice(0, 2).map((mission) => (
                  <div key={mission.id} className="rounded-[20px] border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{mission.title}</p>
                        <p className="mt-1 text-sm text-slate-400">{mission.description}</p>
                      </div>
                      <Badge>{mission.difficulty}</Badge>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-slate-800">
                      <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${mission.progress}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="bg-slate-950/50">
              <CardHeader>
                <div>
                  <p className="text-sm text-emerald-300">Social layer</p>
                  <CardTitle>Friend momentum</CardTitle>
                </div>
                <Link href="/friends" className="text-sm font-medium text-cyan-300">See all</Link>
              </CardHeader>
              <CardContent className="space-y-2">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between rounded-[18px] border border-white/10 bg-white/5 px-3 py-3 text-sm">
                    <div>
                      <p className="font-medium text-white">{friend.name}</p>
                      <p className="text-slate-400">{friend.club}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-300">Lv {friend.level}</p>
                      <p className="text-xs text-emerald-300">{friend.online ? 'Online now' : 'Away'}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-950/50">
              <CardHeader>
                <div>
                  <p className="text-sm text-amber-300">Quick access</p>
                  <CardTitle>Premium tools</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <Link href="/ai-companion" className="rounded-[20px] border border-white/10 bg-white/5 p-4 text-left text-sm text-slate-300 transition hover:bg-white/10">
                  <p className="font-semibold text-white">AI companion</p>
                  <p className="mt-1 text-slate-400">Ask for live insights, predictions, and story summaries.</p>
                </Link>
                <Link href="/accessibility" className="rounded-[20px] border border-white/10 bg-white/5 p-4 text-left text-sm text-slate-300 transition hover:bg-white/10">
                  <p className="font-semibold text-white">Accessibility</p>
                  <p className="mt-1 text-slate-400">Switch to calmer layouts and assistive preferences.</p>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
