import type { ReactNode } from 'react';

export function WorldCupEmptyState({
  title,
  description,
  actions,
}: {
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-slate-950/50 p-6 text-center">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {description ? <p className="mt-2 text-sm text-slate-400">{description}</p> : null}
      {actions ? <div className="mt-4">{actions}</div> : null}
    </div>
  );
}

