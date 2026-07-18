import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { missions } from '@/constants/mock-data';

export default function MissionsPage() {
  return (
    <AppShell>
      <div className="space-y-4">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/60 p-6">
          <h1 className="text-3xl font-semibold text-white">Daily missions</h1>
          <p className="mt-2 text-slate-400">Complete progressive challenges to unlock story rewards and XP boosts.</p>
        </div>
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
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>XP {mission.xp}</span>
                  <span>{mission.reward}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
