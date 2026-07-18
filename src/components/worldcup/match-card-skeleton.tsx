import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function MatchCardSkeleton() {
  return (
    <Card className="bg-slate-950/50 animate-pulse">
      <CardHeader>
        <div className="flex w-full items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="h-3 w-40 rounded bg-white/10" />
            <CardTitle>
              <div className="h-5 w-64 rounded bg-white/10" />
            </CardTitle>
            <div className="mt-1 h-3 w-24 rounded bg-white/10" />
          </div>
          <Badge className="bg-white/10 text-white/70">Loading</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-slate-300">
          <div className="flex items-center gap-3">
            <div className="h-6 w-24 rounded bg-white/10" />
          </div>
          <div className="h-6 w-20 rounded bg-white/10" />
        </div>
      </CardContent>
    </Card>
  );
}

