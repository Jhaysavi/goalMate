import { AppShell } from '@/components/layout/app-shell';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const rooms = [
  { name: 'Clutch Room', members: '128 members', mood: 'High energy' },
  { name: 'Tactical Forum', members: '74 members', mood: 'Strategy focus' },
  { name: 'Accessibility Lounge', members: '39 members', mood: 'Calm and clear' },
];

export default function RoomsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="rounded-[32px] border border-white/10 bg-slate-950/60 p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Rooms</p>
              <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Join the room that matches your matchday energy.</h1>
            </div>
            <div className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">Live rooms updated every minute</div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {rooms.map((room) => (
            <Card key={room.name} className="bg-slate-950/50">
              <CardHeader>
                <div>
                  <p className="text-sm text-cyan-300">Featured</p>
                  <CardTitle>{room.name}</CardTitle>
                </div>
                <Badge>{room.mood}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400">{room.members}</p>
                <div className="mt-3 rounded-[18px] border border-white/10 bg-white/5 p-3 text-sm text-slate-300">Perfect for chat, predictions, and live reactions.</div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
