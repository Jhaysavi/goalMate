import Link from 'next/link';
import type { Route } from 'next';
import { NavigationItem } from '@/components/layout/navigation-item';
import { navigationItems } from '@/constants/mock-data';

interface DesktopNavigationProps {
  pathname: string;
  isAuthenticated?: boolean;
}

function isActiveLink(pathname: string, href: string) {
  return pathname === href || (href !== '/' && pathname.startsWith(href));
}

export function DesktopNavigation({ pathname, isAuthenticated = false }: DesktopNavigationProps) {
  const visibleItems = navigationItems.filter((item) => !['Story Mode', 'Logout'].includes(item.label));
  const primaryItems = visibleItems.slice(0, 5);
  const secondaryItems = visibleItems.slice(5, 9);

  return (
    <div className="hidden min-w-0 md:flex md:w-full md:items-center md:justify-between md:gap-3 lg:gap-4">
      <div className="flex min-w-0 items-center gap-3 xl:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-lg font-semibold text-white shadow-lg shadow-violet-500/20">G</div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">GoalMates</p>
          <p className="truncate text-xs text-slate-400">Live fan experience</p>
        </div>
      </div>

      <div className="hidden flex-1 items-center gap-2 xl:flex">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4"><circle cx="11" cy="11" r="5.5" /><path d="m16 16 4 4" strokeLinecap="round" /></svg>
          </span>
          <input placeholder="Search matches, rooms, stories" className="flex h-10 w-full rounded-2xl border border-white/10 bg-white/5 pl-9 pr-4 text-sm text-foreground outline-none transition focus:border-cyan-400/40 focus:bg-white/10" />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto whitespace-nowrap lg:gap-2">
        {primaryItems.map((item) => (
          <NavigationItem key={item.href} label={item.label} href={item.href as Route} isActive={isActiveLink(pathname, item.href)} className="rounded-full px-2.5 py-2 text-sm" />
        ))}
        {secondaryItems.map((item) => (
          <NavigationItem key={item.href} label={item.label} href={item.href as Route} isActive={isActiveLink(pathname, item.href)} className="hidden rounded-full px-2.5 py-2 text-sm lg:flex" />
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button className="hidden h-9 items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 text-sm text-foreground transition hover:bg-white/10 lg:inline-flex">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4"><path d="M8 17h8" strokeLinecap="round" /><path d="M9 17V10a3 3 0 1 1 6 0v7" strokeLinecap="round" /><path d="M7 17h10" strokeLinecap="round" /></svg>
        </button>
        {isAuthenticated ? (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20">JD</div>
        ) : (
          <>
            <Link href="/auth" className="inline-flex h-9 items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 text-sm font-semibold text-foreground transition hover:bg-white/10">Sign in</Link>
            <Link href="/live-matches" className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-3 text-sm font-semibold text-primary-foreground transition hover:shadow-glow">Join live</Link>
          </>
        )}
      </div>
    </div>
  );
}
