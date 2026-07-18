'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Accessibility, ArrowRight, BrainCircuit, CheckCircle2, Eye, EyeOff, ShieldCheck, Sparkles, Volume2 } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const accessibilityOptions = [
  { id: 'high-contrast', label: 'High contrast', description: 'Sharper clarity and focus', icon: Accessibility },
  { id: 'audio-support', label: 'Audio cues', description: 'Helpful sound and alerts', icon: Volume2 },
  { id: 'cognitive-support', label: 'Calm mode', description: 'Simpler language and less noise', icon: BrainCircuit },
  { id: 'assistive-support', label: 'Assistive tools', description: 'Better motion and input support', icon: ShieldCheck },
];

const highlights = [
  'Live fan rooms and real-time stories',
  'AI insights that stay clear and simple',
  'Accessibility controls built in from day one',
];

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [preferences, setPreferences] = useState<string[]>(['high-contrast']);

  const togglePreference = (id: string) => {
    setPreferences((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.25),_transparent_35%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(2,6,23,0.98))] p-6 shadow-[0_25px_80px_rgba(2,6,23,0.45)] lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(34,211,238,0.16),_transparent_22%),radial-gradient(circle_at_20%_80%,_rgba(244,114,182,0.18),_transparent_25%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-200">
                <Sparkles className="h-4 w-4" />
                Premium football experience
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Welcome to a football experience designed around you.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  Sign in to follow live stories, join fan rooms, and personalize every matchday moment with a calm and accessible experience.
                </p>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="flex flex-wrap gap-2">
                  {highlights.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-200">
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
                <form
                  className="space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    router.push('/dashboard');
                  }}
                >
                  {mode === 'signup' && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="space-y-2 text-sm text-slate-200">
                        <span>First name</span>
                        <Input placeholder="Ava" />
                      </label>
                      <label className="space-y-2 text-sm text-slate-200">
                        <span>Last name</span>
                        <Input placeholder="Mendes" />
                      </label>
                    </div>
                  )}

                  <label className="space-y-2 text-sm text-slate-200">
                    <span>Email</span>
                    <Input type="email" placeholder="you@example.com" />
                  </label>

                  <label className="space-y-2 text-sm text-slate-200">
                    <span>Password</span>
                    <div className="relative">
                      <Input type={showPassword ? 'text' : 'password'} placeholder={mode === 'signup' ? 'Create a secure password' : 'Enter your password'} />
                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </label>

                  {mode === 'signup' && (
                    <label className="space-y-2 text-sm text-slate-200">
                      <span>Confirm password</span>
                      <Input type="password" placeholder="Re-enter your password" />
                    </label>
                  )}

                  <div className="flex items-center justify-between gap-3 text-sm">
                    <label className="flex items-center gap-2 text-slate-400">
                      <input type="checkbox" className="h-4 w-4 rounded border-white/15 bg-white/10" defaultChecked />
                      Keep me signed in
                    </label>
                    {mode === 'signin' && (
                      <Link href="/" className="font-medium text-cyan-300 transition hover:text-cyan-200">
                        Forgot password?
                      </Link>
                    )}
                  </div>

                  {mode === 'signup' && (
                    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-white">Accessibility preferences</p>
                          <p className="mt-1 text-sm text-slate-400">Choose the options that make the experience feel calmer and clearer.</p>
                        </div>
                        <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-300">{preferences.length} selected</span>
                      </div>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {accessibilityOptions.map((option) => {
                          const Icon = option.icon;
                          const isSelected = preferences.includes(option.id);
                          return (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => togglePreference(option.id)}
                              className={`rounded-2xl border px-3 py-3 text-left transition ${isSelected ? 'border-cyan-400/40 bg-cyan-500/10 text-white' : 'border-white/10 bg-transparent text-slate-300 hover:bg-white/10'}`}
                            >
                              <div className="flex items-center gap-2">
                                <Icon className={`h-4 w-4 ${isSelected ? 'text-cyan-300' : 'text-slate-400'}`} />
                                <span className="text-sm font-semibold">{option.label}</span>
                              </div>
                              <p className="mt-1 text-xs text-slate-400">{option.description}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <Button className="w-full" size="lg">
                    {mode === 'signin' ? 'Sign in' : 'Create account'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>

                <p className="mt-4 text-sm text-slate-400">
                  {mode === 'signin' ? 'New here?' : 'Already have an account?'}{' '}
                  <button type="button" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')} className="font-medium text-cyan-300 transition hover:text-cyan-200">
                    {mode === 'signin' ? 'Create an account' : 'Sign in instead'}
                  </button>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
