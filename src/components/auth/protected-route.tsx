'use client';

import { useAuth } from '@/providers/auth-provider';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace(`/auth?next=${encodeURIComponent(pathname)}`);
    }
  }, [router, pathname, status]);

  if (status === 'loading') return <div className="p-6 text-slate-300">Loading session…</div>;
  if (status === 'unauthenticated') return null;

  return <>{children}</>;
}

