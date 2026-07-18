'use client';

import { useState } from 'react';
import { Accessibility, BrainCircuit, CheckCircle2, ShieldCheck, Sparkles, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import { AuthForm } from '@/components/auth/auth-form';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FC } from 'react';

const accessibilityOptions = [
  { id: 'high-contrast', label: 'High contrast', description: 'Sharper clarity and focus', icon: Accessibility },
  { id: 'audio-support', label: 'Audio cues', description: 'Helpful sound and alerts', icon: Volume2 },
  { id: 'cognitive-support', label: 'Calm mode', description: 'Simpler language and less noise', icon: BrainCircuit },
  { id: 'assistive-support', label: 'Assistive tools', description: 'Better motion and input support', icon: ShieldCheck },
];

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  // Kept for UI parity; AuthForm is responsible for actual auth.
  const [preferences] = useState<string[]>(['high-contrast']);

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.25),_transparent_35%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(2,6,23,0.98))] p-6 shadow-[0_25px_80px_rgba(2,6,23,0.45)] lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(34,211,238,0.16),_transparent_22%),radial-gradient(circle_at_20%_80%,_rgba(244,114,182,0.18),_transparent_25%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-200">
                <Sparkles className="h-4 w-4" />
                Premium FIFA World Cup experience
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Welcome to GoalMates.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  Sign in to follow live matches, complete match-centric missions, and level up your Football IQ.
                </p>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="flex flex-wrap gap-2">
                  {[
                    'Live fan rooms and real-time stories',
                    'Match predictions powered by TxLINE',
                    'Accessibility controls built in from day one',
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-2 text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" /> Secure by design
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-fuchsia-500/10 px-3 py-2 text-fuchsia-300">
                  <ShieldCheck className="h-4 w-4" /> Accessible by default
                </span>
              </div>
            </div>

            <Card className="border border-white/10 bg-slate-900/85 shadow-[0_20px_50px_rgba(2,6,23,0.35)] backdrop-blur">
              <CardHeader className="pb-3">
                <div className="flex rounded-full bg-white/10 p-1">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'signin'}
                    className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'signin' ? 'bg-primary text-primary-foreground shadow-glow' : 'text-slate-300 hover:bg-white/10'}`}
                    onClick={() => setMode('signin')}
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'signup'}
                    className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'signup' ? 'bg-primary text-primary-foreground shadow-glow' : 'text-slate-300 hover:bg-white/10'}`}
                    onClick={() => setMode('signup')}
                  >
                    Create account
                  </button>
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-sm text-slate-400">{mode === 'signin' ? 'Welcome back' : 'Create your profile'}</p>
                  <CardTitle>{mode === 'signin' ? 'Sign in to continue' : 'Set up your account'}</CardTitle>
                </div>
              </CardHeader>

              <CardContent>
                <AuthForm mode={mode} onModeChange={setMode} onDone={() => router.push('/dashboard')} />

                {mode === 'signup' && (
                  <div className="mt-4 rounded-[24px] border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">Accessibility preferences</p>
                        <p className="mt-1 text-sm text-slate-400">Choose the options that make the experience feel calmer and clearer.</p>
                      </div>
                      <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-300">
                        {preferences.length} selected
                      </span>
                    </div>

                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {accessibilityOptions.map((option) => {
                        const Icon = option.icon;
                        const isSelected = preferences.includes(option.id);
                        return (
                          <div
                            key={option.id}
                            className={`rounded-2xl border px-3 py-3 text-left transition ${
                              isSelected
                                ? 'border-cyan-400/40 bg-cyan-500/10 text-white'
                                : 'border-white/10 bg-transparent text-slate-300 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className={`h-4 w-4 ${isSelected ? 'text-cyan-300' : 'text-slate-400'}`} />
                              <span className="text-sm font-semibold">{option.label}</span>
                            </div>
                            <p className="mt-1 text-xs text-slate-400">{option.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {mode === 'signin' && (
                  <p className="mt-4 text-sm text-slate-400">
                    Forgot your password?{' '}
                    <Link href="/" className="font-medium text-cyan-300 transition hover:text-cyan-200">
                      Reset locally (MVP)
                    </Link>
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

