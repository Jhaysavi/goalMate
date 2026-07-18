import { AppShell } from '@/components/layout/app-shell';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { friends } from '@/constants/mock-data';

export default function FriendsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="rounded-[32px] border border-white/10 bg-slate-950/60 p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Community</p>
              <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Friends and rooms that keep the matchday alive.</h1>
            </div>
            <div className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
              3 friends online · 2 active rooms
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="bg-slate-950/50">
            <CardHeader>
              <div>
                <p className="text-sm text-fuchsia-300">Your circle</p>
                <CardTitle>Connected fans</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {friends.map((friend) => (
                <div key={friend.id} className="flex flex-col gap-3 rounded-[20px] border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-white">{friend.name}</p>
                    <p className="text-sm text-slate-400">{friend.handle} • {friend.club}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>{friend.online ? 'Online' : 'Away'}</Badge>
                    <span className="text-sm text-slate-300">LV {friend.level}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-950/50">
            <CardHeader>
              <div>
                <p className="text-sm text-emerald-300">New energy</p>
                <CardTitle>Suggested companions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {['Tactical Tori', 'Matchday Max', 'Ari the Analyst'].map((name) => (
                <div key={name} className="rounded-[20px] border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">{name}</p>
                  <p className="mt-1 text-sm text-slate-400">Shared passion for live explanations and prediction rooms.</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
