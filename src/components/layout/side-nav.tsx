'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { usePathname } from 'next/navigation';
import { navigationItems } from '@/constants/mock-data';
import { cn } from '@/lib/utils';

function IconNav({ label }: { label: string }) {
  const baseClassName = 'h-4 w-4 shrink-0';
  switch (label) {
    case 'Home':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={baseClassName}><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" /></svg>;
    case 'Dashboard':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={baseClassName}><rect x="4" y="4" width="7" height="7" rx="2" /><rect x="13" y="4" width="7" height="7" rx="2" /><rect x="4" y="13" width="7" height="7" rx="2" /><rect x="13" y="13" width="7" height="7" rx="2" /></svg>;
    case 'Live Matches':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={baseClassName}><path d="M5 12h14" strokeLinecap="round" /><path d="M12 5v14" strokeLinecap="round" /></svg>;
    case 'Football IQ':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={baseClassName}><path d="M12 3l7 4v5c0 5-3 7-7 9-4-2-7-4-7-9V7l7-4Z" /></svg>;
    case 'Missions':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={baseClassName}><path d="M12 4v16" strokeLinecap="round" /><path d="M4 8l8 4 8-4" strokeLinecap="round" /><path d="M4 16l8-4 8 4" strokeLinecap="round" /></svg>;
    case 'AI Companion':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={baseClassName}><path d="M7 7h10v10H7z" /><path d="M10 10h4v4h-4z" /></svg>;
    case 'Friends':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={baseClassName}><path d="M7 19a3 3 0 1 1 6 0" /><path d="M11 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6" /><path d="M16 19a3 3 0 1 1 4 0" /></svg>;
    case 'Friends Rankings':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={baseClassName}><path d="M5 19V9" strokeLinecap="round" /><path d="M12 19V5" strokeLinecap="round" /><path d="M19 19v-7" strokeLinecap="round" /></svg>;
    case 'Rooms':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={baseClassName}><rect x="4" y="5" width="16" height="14" rx="3" /><path d="M8 9h8" strokeLinecap="round" /><path d="M8 13h5" strokeLinecap="round" /></svg>;
    case 'Story Mode':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={baseClassName}><path d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" /><path d="M9 8h6" strokeLinecap="round" /><path d="M9 12h6" strokeLinecap="round" /></svg>;
    case 'Profile':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={baseClassName}><circle cx="12" cy="8" r="4" /><path d="M5 20a7 7 0 1 1 14 0" strokeLinecap="round" /></svg>;
    case 'Notifications':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={baseClassName}><path d="M8 17h8" strokeLinecap="round" /><path d="M9 17V10a3 3 0 1 1 6 0v7" strokeLinecap="round" /><path d="M7 17h10" strokeLinecap="round" /></svg>;
    case 'Settings':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={baseClassName}><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1.1l2-1.5-2-3.5-2.4 1a7 7 0 0 0-1.9-1.1L14 2h-4l-.6 2.8a7 7 0 0 0-1.9 1.1l-2.4-1-2 3.5 2 1.5A7 7 0 0 0 5 12a7 7 0 0 0 .1 1.1l-2 1.5 2 3.5 2.4-1c.6.5 1.2.8 1.9 1.1L10 22h4l.6-2.8c.7-.3 1.3-.6 1.9-1.1l2.4 1 2-3.5-2-1.5c.1-.4.1-.7.1-1.1Z" /></svg>;
    case 'Accessibility':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={baseClassName}><circle cx="12" cy="12" r="7" /><path d="M12 3v18" strokeLinecap="round" /><path d="M3 12h18" strokeLinecap="round" /></svg>;
    default:
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={baseClassName}><rect x="4" y="4" width="16" height="16" rx="3" /></svg>;
  }
}

export function SideNav() {
  const pathname = usePathname();
  const isActiveLink = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-4 flex h-[calc(100vh-2rem)] flex-col rounded-[28px] border border-white/10 bg-slate-950/70 p-4 shadow-glow backdrop-blur-2xl">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-lg font-semibold text-white">G</div>
          <div>
            <p className="text-sm font-semibold text-white">GoalMates</p>
            <p className="text-xs text-slate-400">Live fan experience</p>
          </div>
        </div>

        <nav className="mt-4 flex-1 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href as Route} className={cn('flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-200', isActiveLink(item.href) ? 'bg-primary/20 text-white ring-1 ring-primary/20' : 'text-slate-300 hover:bg-white/10 hover:text-white')}>
              <IconNav label={item.label} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-4 rounded-[20px] border border-white/10 bg-white/5 p-3">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Status</p>
          <p className="mt-2 text-sm font-semibold text-white">All systems live</p>
          <p className="mt-1 text-xs text-slate-400">Matchday updates on time</p>
        </div>
      </div>
    </aside>
  );
}
