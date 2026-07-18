'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { useAuth } from '@/providers/auth-provider';

export default function ProtectedPage() {
  const { user } = useAuth();
  return (
    <ProtectedRoute>
      <div className="p-6 text-slate-100">
        Protected content for {user?.name ?? 'user'}.
      </div>
    </ProtectedRoute>
  );
}

