import { AppShell } from '@/components/layout/app-shell';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const notifications = [
  { title: 'New room invite', detail: 'Mina invited you to the Clutch Room', time: '2m ago' },
  { title: 'Mission updated', detail: 'Your Tactical Decoder mission is 38% complete', time: '15m ago' },
  { title: 'Ranking shift', detail: 'You moved up 2 places in weekly rankings', time: '1h ago' },
];

export default function NotificationsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="rounded-[32px] border border-white/10 bg-slate-950/60 p-5 sm:p-6">
          <h1 className="text-2xl font-semibold text-white">Notifications</h1>
          <p className="mt-2 text-sm text-slate-400">Stay on top of invites, missions, and ranking changes without noise.</p>
        </section>

        <Card className="bg-slate-950/50">
          <CardHeader>
            <div>
              <p className="text-sm text-cyan-300">Inbox</p>
              <CardTitle>Recent activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((item) => (
              <div key={item.title} className="rounded-[20px] border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-white">{item.title}</p>
                  <Badge>{item.time}</Badge>
                </div>
                <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
