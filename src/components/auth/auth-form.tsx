'use client';

import { useAuth } from '@/providers/auth-provider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';

export function AuthForm({
  mode,
  onModeChange,
  onDone,
}: {
  mode: 'signin' | 'signup';
  onModeChange: (m: 'signin' | 'signup') => void;
  onDone: () => void;
}) {
  const { login, register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [favoriteTeam, setFavoriteTeam] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setError(null);
        try {
          if (mode === 'signin') {
            await login({ email, password, rememberMe: true });
            onDone();
            return;
          }

          if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
          }

          await register({
            email,
            password,
            name: name || 'GoalMates Fan',
            favoriteTeam: favoriteTeam || undefined,
            country: country || undefined,
          });
          onDone();
        } catch (e) {
          const msg = e instanceof Error ? e.message : 'Authentication failed';
          setError(msg);
        }
      }}
    >
      {mode === 'signup' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-200">
            <span>First name</span>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ava" />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            <span>Favorite national team</span>
            <Input value={favoriteTeam} onChange={(e) => setFavoriteTeam(e.target.value)} placeholder="e.g. Brazil" />
          </label>
        </div>
      )}

      <label className="space-y-2 text-sm text-slate-200">
        <span>Email</span>
        <Input value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      </label>

      <label className="space-y-2 text-sm text-slate-200">
        <span>Password</span>
        <div className="relative">
          <Input
            value={password}
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === 'signup' ? 'Create a secure password' : 'Enter your password'}
          />
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
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-200">
            <span>Confirm password</span>
            <Input
              value={confirmPassword}
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            <span>Country</span>
            <Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="e.g. Portugal" />
          </label>
        </div>
      )}

      {error && <p className="text-sm text-rose-300">{error}</p>}

      <Button className="w-full" size="lg" type="submit">
        {mode === 'signin' ? 'Sign in' : 'Create account'}
        <ArrowRight className="h-4 w-4" />
      </Button>

      <p className="mt-2 text-sm text-slate-400">
        {mode === 'signin' ? 'New here?' : 'Already have an account?'}{' '}
        <button
          type="button"
          onClick={() => onModeChange(mode === 'signin' ? 'signup' : 'signin')}
          className="font-medium text-cyan-300 transition hover:text-cyan-200"
        >
          {mode === 'signin' ? 'Create an account' : 'Sign in instead'}
        </button>
      </p>
    </form>
  );
}

