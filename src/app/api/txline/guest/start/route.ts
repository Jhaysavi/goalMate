import { NextResponse } from 'next/server';

// Server-side guest start. Returns JWT only if the upstream returns one.
// This is intentionally server-only; no tokens in browser.

export async function POST() {
  const baseUrl = process.env.TXLINE_JWT_URL;
  if (!baseUrl) {
    return NextResponse.json({ error: 'Missing TXLINE_JWT_URL' }, { status: 500 });
  }

  const tokenMint = process.env.TXLINE_TOKEN_MINT;
  if (!tokenMint) {
    return NextResponse.json({ error: 'Missing TXLINE_TOKEN_MINT' }, { status: 500 });
  }

  // Upstream auth contract: /auth/guest/start (per provided docs)
  // Body is unknown; we only forward tokenMint as a safe placeholder.
  // Replace with exact contract once confirmed.
  const upstreamRes = await fetch(new URL('/auth/guest/start', baseUrl).toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tokenMint }),
  });

  if (!upstreamRes.ok) {
    const text = await upstreamRes.text().catch(() => '');
    return NextResponse.json(
      { error: 'TxLINE guest start failed', status: upstreamRes.status, details: text },
      { status: 502 }
    );
  }

  const data = await upstreamRes.json().catch(() => ({}));
  // expected: { jwt: string }
  return NextResponse.json(data);
}

