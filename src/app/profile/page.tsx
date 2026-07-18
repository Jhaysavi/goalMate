import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { friends } from '@/constants/mock-data';

export default function ProfilePage() {
  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="bg-slate-950/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200&q=80" alt="Profile" />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Alicia Moore</CardTitle>
                <p className="text-sm text-slate-400">@alicia_football</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 p-3 text-sm text-slate-300">Favorite club: Arsenal</div>
              <div className="rounded-2xl border border-white/10 p-3 text-sm text-slate-300">Football DNA: tactical storyteller</div>
              <div className="flex flex-wrap gap-2">
                <Badge>Legendary badge</Badge>
                <Badge>Story mode</Badge>
                <Badge>Accessibility pro</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card className="bg-slate-950/50">
            <CardHeader>
              <CardTitle>Friends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between rounded-2xl border border-white/10 px-3 py-3 text-sm text-slate-300">
                    <span>{friend.name}</span>
                    <span>{friend.club}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-950/50">
            <CardHeader>
              <CardTitle>Recent stories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border border-white/10 p-3 text-sm text-slate-300">A late tactical shift turned the match on its head.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
