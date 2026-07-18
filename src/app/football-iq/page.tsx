import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { missions } from '@/constants/mock-data';

export default function FootballIQPage() {
  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-4">
          <Card className="bg-slate-950/50">
            <CardHeader>
              <div>
                <p className="text-sm text-violet-300">Current rank</p>
                <CardTitle>Elite Predictor • Level 14</CardTitle>
              </div>
              <Badge>XP 8,420</Badge>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 p-4 text-sm text-slate-300">
                Prediction accuracy 83% across the last 28 matches.
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            {missions.map((mission) => (
              <Card key={mission.id} className="bg-slate-950/50">
                <CardHeader>
                  <CardTitle>{mission.title}</CardTitle>
                  <Badge>{mission.category}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400">{mission.description}</p>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${mission.progress}%` }} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Card className="bg-slate-950/50">
          <CardHeader>
            <CardTitle>Season stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 p-3">Wins: 17</div>
              <div className="rounded-2xl border border-white/10 p-3">Perfect calls: 6</div>
              <div className="rounded-2xl border border-white/10 p-3">Streak: 4</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
