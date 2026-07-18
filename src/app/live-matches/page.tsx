import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { liveMatches } from '@/constants/mock-data';

export default function LiveMatchesPage() {
  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          <div className="rounded-[32px] border border-white/10 bg-slate-950/60 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-300">Live now</p>
                <h1 className="text-3xl font-semibold text-white">The heartbeat of football</h1>
              </div>
              <Badge className="bg-emerald-500/15 text-emerald-300">12 active rooms</Badge>
            </div>
          </div>
          <div className="space-y-3">
            {liveMatches.map((match) => (
              <Card key={match.id} className="bg-slate-950/50">
                <CardHeader>
                  <div>
                    <p className="text-sm text-slate-400">{match.competition}</p>
                    <CardTitle>{match.homeTeam} vs {match.awayTeam}</CardTitle>
                  </div>
                  <Badge>{match.status}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>{match.homeScore} - {match.awayScore}</span>
                    <span>{match.minute}'</span>
                  </div>
                  <p className="text-sm text-slate-400">{match.stadium}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Card className="h-fit bg-slate-950/50">
          <CardHeader>
            <CardTitle>Mission sidebar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-300">
              Join the live prediction challenge and climb the room leaderboard.
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
