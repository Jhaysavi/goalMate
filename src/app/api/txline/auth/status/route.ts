import { NextResponse } from 'next/server';
import { getTxlineAuthState } from '../start/route';

export async function GET() {
  const s = getTxlineAuthState();
  return NextResponse.json({
    authenticated: Boolean(s.guestJwt),
    activated: Boolean(s.activatedApiToken),
  });
}

