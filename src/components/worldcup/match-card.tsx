import type { WorldCupMatch } from '@/types/worldcup';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

function stageLabel(match: WorldCupMatch) {
  switch (match.stage) {
    case 'ROUND_OF_16':
      return 'Round of 16';
    case 'QUARTER_FINAL':
      return 'Quarter Finals';
    case 'SEMI_FINAL':
      return 'Semi Finals';
    case 'THIRD_PLACE':
      return 'Third Place';
    case 'FINAL':
      return 'Final';
    default:
      return match.stage?.toString().replaceAll('_', ' ') ?? 'Group';
  }
}

export function MatchCard({ match }: { match: WorldCupMatch }) {
  const statusBadgeClass =
    match.status === 'LIVE'
      ? 'bg-emerald-500/15 text-emerald-300'
      : match.status === 'FINISHED'
        ? 'bg-slate-500/20 text-slate-200'
        : 'bg-cyan-500/15 text-cyan-200';

  const kickoff = match.kickoffAt ? new Date(match.kickoffAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;

  return (
    <Card className="bg-slate-950/50">
      <CardHeader>
        <div className="flex w-full items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm text-slate-400">{stageLabel(match)} • FIFA World Cup</p>
            <CardTitle className="truncate">{match.homeTeam.name} vs {match.awayTeam.name}</CardTitle>
            {match.group ? <p className="mt-1 text-xs text-slate-500">Group {match.group}</p> : null}
          </div>
          <Badge className={statusBadgeClass}>{match.status === 'UPCOMING' ? 'Upcoming' : match.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-slate-300">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {match.homeTeam.logoUrl ? (
                <Image src={match.homeTeam.logoUrl} alt="" width={22} height={22} className="h-[22px] w-[22px] rounded" />
              ) : (
                <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded bg-white/10 text-[10px] text-white">{match.homeTeam.name.slice(0, 2)}</span>
              )}
              <span>{match.score.home}</span>
            </div>
            <span className="text-slate-500">-</span>
            <div className="flex items-center gap-2">
              <span>{match.score.away}</span>
              {match.awayTeam.logoUrl ? (
                <Image src={match.awayTeam.logoUrl} alt="" width={22} height={22} className="h-[22px] w-[22px] rounded" />
              ) : (
                <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded bg-white/10 text-[10px] text-white">{match.awayTeam.name.slice(0, 2)}</span>
              )}
            </div>
          </div>
          <div className="text-right">
            {kickoff ? <span className="text-slate-300">{kickoff}</span> : <span className="text-slate-500">—</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

