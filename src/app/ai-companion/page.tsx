import { AppShell } from '@/components/layout/app-shell';

export default function AICompanionPage() {
  return (
    <AppShell>
      <div className="grid gap-6 rounded-[32px] border border-white/10 bg-slate-950/60 p-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4 rounded-[24px] border border-white/10 bg-white/10 p-5">
          <p className="text-sm text-fuchsia-300">AI companion</p>
          <h1 className="text-2xl font-semibold text-white">Smart match storytelling</h1>
          <p className="text-sm text-slate-300">Live context cards, voice narration placeholders, and personalized match insights.</p>
          <div className="space-y-2">
            <div className="rounded-2xl border border-white/10 p-3 text-sm text-slate-300">Why is the defence pressing higher?</div>
            <div className="rounded-2xl border border-white/10 p-3 text-sm text-slate-300">Show me the best story arc.</div>
          </div>
        </div>
        <div className="space-y-4 rounded-[24px] border border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-5">
          <p className="text-sm text-cyan-300">Conversation</p>
          <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p>AI: The match is swinging because the full-back is overlapping into the half-space, creating a 2v1.</p>
            <p>You: Give me a fan-friendly summary.</p>
            <p>AI: The home side is racing with a fresh wave of energy, and every touch now feels like it could decide the night.</p>
          </div>
          <button className="w-full rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Ask AI</button>
        </div>
      </div>
    </AppShell>
  );
}
