import { NextResponse } from 'next/server';

// SSE proxy.
// Keeps all auth server-side.

let cachedGuestApiToken: { token: string; expiresAt: number } | null = null;

async function getOrCreateGuestApiToken(): Promise<string> {
  // Simple in-memory cache to avoid minting on every stream request.
  const now = Date.now();
  if (cachedGuestApiToken && cachedGuestApiToken.expiresAt > now + 60_000) {
    return cachedGuestApiToken.token;
  }

  const txlineJwtUrl = process.env.TXLINE_JWT_URL;
  const tokenMint = process.env.TXLINE_TOKEN_MINT;
  if (!txlineJwtUrl) throw new Error('Missing TXLINE_JWT_URL');
  if (!tokenMint) throw new Error('Missing TXLINE_TOKEN_MINT');

  // Create guest token (server-only).
  const jwtRes = await fetch(new URL('/auth/guest/start', txlineJwtUrl).toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tokenMint }),
  });

  if (!jwtRes.ok) {
    const text = await jwtRes.text().catch(() => '');
    throw new Error(`TxLINE guest start failed: ${jwtRes.status} ${text}`);
  }

  const json = (await jwtRes.json().catch(() => ({}))) as unknown;

  // Upstream response key varies. Normalize to a single token string.
  // Observed in this environment: { token: "<jwt>" }
  const obj = (json ?? {}) as Record<string, unknown>;
  const tokenCandidate =
    (typeof obj?.token === 'string' ? obj.token : undefined) ??
    (typeof obj?.jwt === 'string' ? obj.jwt : undefined) ??
    (typeof json === 'string' ? json : undefined);

  if (!tokenCandidate) throw new Error('TxLINE guest start returned no token');

  const token = tokenCandidate;
  cachedGuestApiToken = { token, expiresAt: now + 15 * 60_000 };
  return token;
}

export async function GET(req: Request) {
  const txlineApiBase = process.env.TXLINE_API_URL;
  if (!txlineApiBase) {
    return NextResponse.json({ error: 'Missing TXLINE_API_URL' }, { status: 500 });
  }

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
    'Content-Type': 'text/event-stream',
    'X-Api-Token': c.apiToken as string,
    ...(authorizationHeader ? { Authorization: authorizationHeader } : {}),
  };




  const upstream = await fetch(new URL('/odds/stream', txlineApiBase).toString(), {
    method: 'GET',
    headers,
  });

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => '');
    return NextResponse.json({ error: 'TxLINE stream failed', status: upstream.status, details: text }, { status: 502 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: d } = await reader.read();
        done = d;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          controller.enqueue(new TextEncoder().encode(chunk));
        }
      }
      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}

