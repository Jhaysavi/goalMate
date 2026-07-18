import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(118,74,255,0.25),_transparent_35%)] px-6">
      <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-8 text-center shadow-glow">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">The page went offline.</h1>
        <p className="mt-2 text-slate-400">Return to the live fan experience and keep following the match.</p>
        <Link href="/" className={cn(buttonVariants({ className: 'mt-6' }))}>
          Back home
        </Link>
      </div>
    </div>
  );
}
