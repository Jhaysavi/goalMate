import { AppShell } from '@/components/layout/app-shell';

export default function AccessibilityPage() {
  return (
    <AppShell>
      <div className="space-y-4 rounded-[32px] border border-white/10 bg-slate-950/60 p-6">
        <div>
          <p className="text-sm text-cyan-300">Accessibility controls</p>
          <h1 className="text-3xl font-semibold text-white">Every experience can be shaped for how you enjoy football.</h1>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {['Vision Mode', 'Easy Mode', 'Deaf Mode', 'Neuro Mode', 'Font scaling', 'Color blind palettes'].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 p-3 text-sm text-slate-300">{item}</div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-foreground">High contrast</span>
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-foreground">Reduced motion</span>
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-foreground">Voice narration</span>
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-foreground">Live captions</span>
        </div>
      </div>
    </AppShell>
  );
}
