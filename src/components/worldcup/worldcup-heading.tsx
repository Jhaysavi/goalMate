import type { ReactNode } from 'react';

export function WorldCupHeading({
  kicker,
  title,
  right,
}: {
  kicker?: string;
  title: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-1">
        {kicker ? <p className="text-sm text-cyan-300">{kicker}</p> : null}
        <h1 className="text-3xl font-semibold text-white">{title}</h1>
      </div>
      {right ? <div className="mt-1">{right}</div> : null}
    </div>
  );
}

