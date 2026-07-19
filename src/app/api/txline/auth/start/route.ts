import { NextResponse } from 'next/server';

// Starts a guest session and activates the World Cup API token.
// Server-side only: stores credentials in memory for the current server process.

type CredentialState = {
  guestJwt?: string;
  activatedApiToken?: string;
  activatedAt?: number;
  guestJwtAt?: number;
};

let state: CredentialState = {};

function requireEnv(name: string, value: string | undefined) {
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

async function startGuest(): Promise<string> {
  const jwtBase = requireEnv('TXLINE_JWT_URL', process.env.TXLINE_JWT_URL);
  const tokenMint = requireEnv('TXLINE_TOKEN_MINT', process.env.TXLINE_TOKEN_MINT);

  const res = await fetch(new URL('/auth/guest/start', jwtBase).toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tokenMint }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`TxLINE guest start failed (${res.status}): ${text}`);
  }

  const json = (await res.json().catch(() => ({}))) as unknown;
  const obj = (json ?? {}) as Record<string, unknown>;

  const jwtCandidate =
    (typeof obj?.jwt === 'string' ? obj.jwt : undefined) ??
    (typeof obj?.token === 'string' ? obj.token : undefined);

  if (!jwtCandidate) {
    throw new Error('TxLINE guest start returned no jwt/token');
  }

  return jwtCandidate;
}

async function activateApi(guestJwt: string): Promise<string> {
  const apiBase = requireEnv('TXLINE_API_URL', process.env.TXLINE_API_URL);

  // Docs require Solana subscription activation flow. For Free Tier devnet,
  // this endpoint may accept preconfigured activation parameters.
  // We keep the payload shape aligned with provided docs.
  // If TxLINE requires additional fields (txSig/walletSignature/leagues),
  // they should be supplied via env in a later iteration.

  const txSig = process.env.TXLINE_TXSIG;
  const walletSignature = process.env.TXLINE_WALLET_SIGNATURE;
  const leaguesRaw = process.env.TXLINE_LEAGUES; // comma-separated numeric ids

  const leagues = leaguesRaw
    ? leaguesRaw.split(',').map((s) => Number(s.trim())).filter((n) => Number.isFinite(n))
    : [];

  if (!txSig || !walletSignature) {
    // Do not silently fail; return a useful message.
    throw new Error('TxLINE activation missing TXLINE_TXSIG and/or TXLINE_WALLET_SIGNATURE env');
  }

  const res = await fetch(new URL('/token/activate', apiBase).toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${guestJwt}`,
    },
    body: JSON.stringify({
      txSig,
      walletSignature,
      leagues,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`TxLINE token/activate failed (${res.status}): ${text}`);
  }

  const json = (await res.json().catch(() => ({}))) as unknown;
  const obj = (json ?? {}) as Record<string, unknown>;

  const apiTokenCandidate =
    (typeof obj?.apiToken === 'string' ? obj.apiToken : undefined) ??
    (typeof obj?.token === 'string' ? obj.token : undefined) ??
    (typeof obj?.activatedApiToken === 'string' ? obj.activatedApiToken : undefined);

  if (!apiTokenCandidate) {
    throw new Error('TxLINE token/activate returned no apiToken/token');
  }

  return apiTokenCandidate;
}

export async function POST() {
  try {
    const now = Date.now();
    const guestJwt = await startGuest();
    const activatedApiToken = await activateApi(guestJwt);

    state = {
      guestJwt,
      guestJwtAt: now,
      activatedApiToken,
      activatedAt: now,
    };

    return NextResponse.json({
      authenticated: true,
      activated: true,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown activation error';
    return NextResponse.json(
      {
        authenticated: false,
        activated: false,
        error: 'TXLINE_ACTIVATION_FAILED',
        message,
      },
      { status: 400 }
    );
  }
}

// Expose state for sibling route via module-level variable (server-only).
export function getTxlineAuthState() {
  return state;
}

