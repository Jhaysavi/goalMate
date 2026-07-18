import { AppShell } from '@/components/layout/app-shell';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const rankings = [
  { name: 'Mina', club: 'Barcelona', xp: 18240, accuracy: '91%', change: '+3', streak: 6, tier: 'Legend' },
  { name: 'Devon', club: 'Liverpool', xp: 17680, accuracy: '88%', change: '+1', streak: 5, tier: 'Elite' },
  { name: 'Noah', club: 'Inter', xp: 16420, accuracy: '85%', change: '-2', streak: 4, tier: 'Pro' },
  { name: 'Alicia', club: 'Arsenal', xp: 15350, accuracy: '82%', change: '+2', streak: 3, tier: 'Rising' },
];

export default function FriendsRankingsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.25),_transparent_30%),linear-gradient(135deg,_rgba(15,23,42,0.95),_rgba(2,6,23,0.98))] p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Gamified rankings</p>
              <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Friends rankings, Football IQ leaders, and weekly momentum in one place.</h1>
              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">Follow the podium, track your rise, and compare your prediction accuracy with the most active fans.</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              <p className="font-semibold text-white">Current leaderboard</p>
              <p className="mt-1">Weekly • Monthly • All-time</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {['Weekly rankings', 'Monthly rankings', 'All-time rankings'].map((title) => (
            <Card key={title} className="bg-slate-950/50">
              <CardContent className="space-y-2">
                <p className="text-sm text-slate-400">{title}</p>
                <p className="text-2xl font-semibold text-white">Top 20</p>
                <p className="text-sm text-emerald-300">Live updates</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <Card className="bg-slate-950/50">
            <CardHeader>
              <div>
                <p className="text-sm text-fuchsia-300">Podium</p>
                <CardTitle>Top performers</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {rankings.slice(0, 3).map((entry, index) => (
                <div key={entry.name} className="rounded-[20px] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">#{index + 1} {entry.name}</p>
                      <p className="text-sm text-slate-400">{entry.club}</p>
                    </div>
                    <Badge>{entry.tier}</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-300">
                    <span>XP {entry.xp}</span>
                    <span>Accuracy {entry.accuracy}</span>
                    <span>Streak {entry.streak}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-950/50">
            <CardHeader>
              <div>
                <p className="text-sm text-cyan-300">Ranking movement</p>
                <CardTitle>Recent position changes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {rankings.map((entry) => (
                <div key={entry.name} className="flex flex-col gap-3 rounded-[20px] border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-white">{entry.name}</p>
                    <p className="text-sm text-slate-400">{entry.club}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`rounded-full px-2 py-1 ${entry.change.startsWith('+') ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'}`}>
                      {entry.change}
                    </span>
                    <span className="text-slate-300">{entry.accuracy} accuracy</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
