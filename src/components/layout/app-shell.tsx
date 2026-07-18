'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MobileNavigation } from '@/components/layout/mobile-navigation';
import { SideNav } from '@/components/layout/side-nav';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-transparent pb-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-3 py-3 sm:px-4 sm:py-4 lg:px-8 lg:py-6 lg:gap-6">
        <header className="sticky top-3 z-40 flex items-center justify-between rounded-[24px] border border-white/10 bg-slate-950/75 px-3 py-3 shadow-glow backdrop-blur-2xl sm:top-4 sm:px-4 lg:hidden">
          <button type="button" onClick={() => setMobileMenuOpen(true)} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/15" aria-label="Open navigation">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <path d="M4 7h16" strokeLinecap="round" />
              <path d="M4 12h16" strokeLinecap="round" />
              <path d="M4 17h16" strokeLinecap="round" />
            </svg>
          </button>

          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-lg font-semibold text-white shadow-lg shadow-violet-500/20">G</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">GoalMates</p>
              <p className="truncate text-xs text-slate-400">Live fan experience</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-foreground transition hover:bg-white/15" aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                <circle cx="11" cy="11" r="5.5" />
                <path d="m16 16 4 4" strokeLinecap="round" />
              </svg>
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20">JD</div>
          </div>
        </header>

        <div className="flex flex-col gap-4 lg:flex-row">
          <SideNav />

          <div className="flex-1">
            <main className="space-y-6">{children}</main>
          </div>
        </div>
      </div>

      <MobileNavigation isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} pathname={pathname} isAuthenticated={false} />
    </div>
  );
}
