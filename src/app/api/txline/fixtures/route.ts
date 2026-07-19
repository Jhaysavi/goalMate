import { NextResponse } from 'next/server';

// Server-side fixtures snapshot proxy.
// Browser must call ONLY this route (no tokens/JWT exposed).

export async function GET(req: Request) {
  const txlineApiBase = process.env.TXLINE_API_URL;
  if (!txlineApiBase) {
    return NextResponse.json({ error: 'Missing TXLINE_API_URL' }, { status: 500 });
  }

  const url = new URL(req.url);
  const competitionId = url.searchParams.get('competitionId');
  const startEpochDay = url.searchParams.get('startEpochDay');

  const competitionIdNum = competitionId ? Number(competitionId) : 72;
  const startEpochDayNum = startEpochDay
    ? Number(startEpochDay)
    : Number((new Date().getTime() / 86400000).toFixed(0));

  console.log('[TXLINE] Fetching World Cup fixtures');

  try {
    // TxLINE fixtures often require authentication.
    // We keep all token logic server-side and NEVER expose secrets to the browser.
    // Server-only guest authentication.
    // We never require TXLINE_API_TOKEN to be manually set.

    // Bootstrap credentials must exist server-side.
    const { getTxlineCredentials } = await import('@/services/txline/credentials');
    const c = getTxlineCredentials();

    if (!c.apiToken) {
      return NextResponse.json(
        { error: 'TXLINE_SETUP_REQUIRED', message: 'TxLINE activation credentials are missing' },
        { status: 428 }
      );
    }

    const authorizationHeader = c.jwt ? `Bearer ${c.jwt}` : undefined;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Api-Token': c.apiToken as string,
      ...(authorizationHeader ? { Authorization: authorizationHeader } : {}),
    };






    const upstream = await fetch(
      new URL('/fixtures/snapshot', txlineApiBase).toString() +
        `?competitionId=${competitionIdNum}&startEpochDay=${startEpochDayNum}`,
      {
        method: 'GET',
        headers,
        cache: 'no-store',
      }
    );



    if (!upstream.ok) {
      const text = await upstream.text().catch(() => '');
      return NextResponse.json(
        { error: 'TxLINE fixtures snapshot failed', status: upstream.status, details: text },
        { status: 502 }
      );
    }

    const data = (await upstream.json()) as unknown;

    // Shape is unknown; return raw and let UI mapping handle it for now.
    const maybe = data as { Fixtures?: unknown; fixtures?: unknown } | unknown[];
    const fixturesCandidate = Array.isArray(maybe) ? maybe : maybe?.Fixtures ?? maybe?.fixtures;

    const items = Array.isArray(fixturesCandidate) ? fixturesCandidate : [];

    console.log(`[TXLINE] Received ${items.length} fixtures`);

    return NextResponse.json({ fixtures: items });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: 'TxLINE fixtures proxy failed', details: message }, { status: 500 });
  }
}

