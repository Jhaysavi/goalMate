import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import type { Route } from 'next';
import { useEffect, useRef } from 'react';
import { NavigationItem } from '@/components/layout/navigation-item';
import { navigationItems } from '@/constants/mock-data';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  isAuthenticated?: boolean;
}

function isActiveLink(pathname: string, href: string) {
  return pathname === href || (href !== '/' && pathname.startsWith(href));
}

export function MobileNavigation({ isOpen, onClose, pathname, isAuthenticated = false }: MobileNavigationProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            ref={drawerRef}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="fixed inset-y-0 left-0 z-[60] flex w-[88%] max-w-[340px] flex-col border-r border-white/10 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm font-semibold text-white">Navigate</p>
                <p className="text-xs text-slate-400">GoalMates product areas</p>
              </div>
              <button type="button" onClick={onClose} className="rounded-full border border-white/10 bg-white/10 p-2 text-slate-300 transition hover:bg-white/15" aria-label="Close navigation">✕</button>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {!isAuthenticated ? (
                <div className="flex flex-col gap-2 rounded-[20px] border border-white/10 bg-white/5 p-3">
                  <Link href="/auth" onClick={onClose} className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-3 text-sm font-semibold text-primary-foreground">Sign In</Link>
                  <Link href="/live-matches" onClick={onClose} className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/10 px-3 text-sm font-semibold text-foreground">Join Live</Link>
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-white/5 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 text-sm font-semibold text-white">JD</div>
                  <div>
                    <p className="text-sm font-semibold text-white">Jordan</p>
                    <p className="text-xs text-slate-400">Premium fan</p>
                  </div>
                </div>
              )}

              <nav className="flex flex-col gap-1 overflow-y-auto pb-2">
                {navigationItems.map((item) => (
                  <NavigationItem
                    key={item.href}
                    label={item.label}
                    href={item.href as Route}
                    isActive={isActiveLink(pathname, item.href)}
                    onNavigate={onClose}
                    className="rounded-2xl px-3 py-3"
                  />
                ))}
                {isAuthenticated ? (
                  <button type="button" className="mt-2 flex items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 shrink-0"><path d="M10 17 5 12l5-5" strokeLinecap="round" strokeLinejoin="round" /><path d="M19 12H5" strokeLinecap="round" /></svg>
                    <span>Logout</span>
                  </button>
                ) : null}
              </nav>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
