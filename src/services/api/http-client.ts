/*
  HTTP client for TxLINE + any future FIFA World Cup endpoints.
  Components MUST NOT call fetch/axios directly; use repositories.
*/

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const API_BASE_URL = process.env.NEXT_PUBLIC_TXLINE_BASE_URL ?? '';

function getRequiredTxlineBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error(
      'TxLINE base URL is not configured. Set NEXT_PUBLIC_TXLINE_BASE_URL to the official TxLINE API host (from docs).'
    );
  }
  return API_BASE_URL;
}


export async function httpRequest<T>(params: {
  path: string;
  method: HttpMethod;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}): Promise<T> {
  const url = new URL(params.path, getRequiredTxlineBaseUrl());


  if (params.query) {
    for (const [k, v] of Object.entries(params.query)) {
      if (v === undefined) continue;
      url.searchParams.set(k, String(v));
    }
  }

  const res = await fetch(url.toString(), {
    method: params.method,
    headers: {
      'Content-Type': 'application/json',
      ...(params.headers ?? {}),
    },
    body: params.body ? JSON.stringify(params.body) : undefined,
    signal: params.signal,
    // NOTE: Next.js will polyfill fetch; keep this deterministic.
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`TxLINE request failed: ${res.status} ${res.statusText}${text ? ` - ${text}` : ''}`);
  }

  return (await res.json()) as T;
}

