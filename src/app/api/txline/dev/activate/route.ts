import { NextResponse } from 'next/server';
import { setTxlineCredentials } from '@/services/txline/credentials';

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as
      | { jwt?: string; apiToken?: string }
      | null;

    const jwt = body?.jwt;
    const apiToken = body?.apiToken;

    if (!jwt || !apiToken || typeof jwt !== 'string' || typeof apiToken !== 'string') {
      return NextResponse.json(
        { error: 'INVALID_PAYLOAD', message: 'Body must include { jwt, apiToken }' },
        { status: 400 }
      );
    }

    setTxlineCredentials({ jwt, apiToken });

    return NextResponse.json({ ok: true, activated: true });
  } catch (e) {
    return NextResponse.json(
      { error: 'TXLINE_DEV_ACTIVATE_FAILED', message: e instanceof Error ? e.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

