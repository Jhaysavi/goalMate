import { AppShell } from '@/components/layout/app-shell';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StoryModePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="rounded-[32px] border border-white/10 bg-slate-950/60 p-5 sm:p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Story Mode</p>
          <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Step into the matchday narrative with guided fan stories.</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-400">Follow immersive football moments, unlock new perspectives, and share your favorite scenes with your crew.</p>
        </section>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="bg-slate-950/50">
            <CardHeader>
              <div>
                <p className="text-sm text-cyan-300">Featured</p>
                <CardTitle>Last-minute drama</CardTitle>
              </div>
              <Badge>New</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400">Experience a cinematic recap of the match turning on a single decisive moment.</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-950/50">
            <CardHeader>
              <div>
                <p className="text-sm text-cyan-300">Community</p>
                <CardTitle>Shared reactions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400">Collect story reactions from friends and build a matchday narrative together.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
