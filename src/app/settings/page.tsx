import { AppShell } from '@/components/layout/app-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="rounded-[32px] border border-white/10 bg-slate-950/60 p-5 sm:p-6">
          <h1 className="text-2xl font-semibold text-white">Settings</h1>
          <p className="mt-2 text-sm text-slate-400">Fine-tune your experience, accessibility, and notification preferences.</p>
        </section>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="bg-slate-950/50">
            <CardHeader>
              <div>
                <p className="text-sm text-cyan-300">Preferences</p>
                <CardTitle>Personalize your flow</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-[18px] border border-white/10 bg-white/5 p-3">
                <span className="text-sm text-slate-300">Dark mode</span>
                <Badge>Enabled</Badge>
              </div>
              <div className="flex items-center justify-between rounded-[18px] border border-white/10 bg-white/5 p-3">
                <span className="text-sm text-slate-300">Live match updates</span>
                <Badge>On</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-950/50">
            <CardHeader>
              <div>
                <p className="text-sm text-cyan-300">Accessibility</p>
                <CardTitle>Supportive defaults</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-[18px] border border-white/10 bg-white/5 p-3 text-sm text-slate-300">Larger text contrast and keyboard-friendly navigation are built in.</div>
              <Button variant="outline" className="w-full justify-center">Review accessibility options</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
