import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';

export default function LandingPage() {
  return (
    <AppShell>
      <section className="rounded-[32px] border border-white/10 bg-slate-950/60 p-6 shadow-glow lg:p-10">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Live football • AI • Social</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Experience football like your match is happening around you.
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            GoalMates turns every real-time event into a premium fan experience with AI stories, live missions, predictions and accessibility-first rooms.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/live-matches" className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground">
              Start watching live
            </Link>
            <Link href="/auth" className="inline-flex h-12 items-center justify-center rounded-full bg-white/10 px-6 text-base font-semibold text-foreground">
              Create account
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {['Live fan social', 'AI companion', 'Accessibility by default'].map((item) => (
          <div key={item} className="rounded-[24px] border border-white/10 bg-slate-950/50 p-5">
            <h2 className="text-lg font-semibold text-white">{item}</h2>
            <p className="mt-2 text-sm text-slate-400">A premium experience for every matchday moment.</p>
          </div>
        ))}
      </section>
    </AppShell>
  );
}
