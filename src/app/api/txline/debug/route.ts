import { NextResponse } from 'next/server';

import { getTxlineCredentials } from '@/services/txline/credentials';

export async function GET() {
  const c = getTxlineCredentials();

  return NextResponse.json({
    apiConfigured: Boolean(process.env.TXLINE_API_URL),
    jwtConfigured: Boolean(c.jwt),
    tokenConfigured: Boolean(c.apiToken),
    baseUrl: process.env.TXLINE_API_URL ?? null,
  });
}


