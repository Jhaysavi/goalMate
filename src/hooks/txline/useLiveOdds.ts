'use client';

import { useEffect, useRef, useState } from 'react';
import type { OddsUpdate } from '@/txline/types/odds';

export function useLiveOdds() {
  const [updates, setUpdates] = useState<OddsUpdate[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sourceRef = useRef<EventSource | null>(null);
  const retryRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    async function connect() {
      if (cancelled) return;

      try {
        setError(null);
        setConnected(false);

        // Client connects to our server proxy. No tokens exposed.
        const es = new EventSource('/api/txline/odds-stream');
        sourceRef.current = es;

        es.onopen = () => {
          if (cancelled) return;
          setConnected(true);
          retryRef.current = 0;
        };

        es.onerror = () => {
          if (cancelled) return;
          setConnected(false);
          setError('Live odds disconnected. Reconnecting...');
          retryRef.current += 1;
          es.close();

          const backoffMs = Math.min(5000, 500 * retryRef.current);
          setTimeout(() => {
            connect();
          }, backoffMs);
        };

        es.onmessage = (evt) => {
          if (cancelled) return;
          try {
            const parsed = JSON.parse(evt.data) as OddsUpdate;
            setUpdates((prev) => {
              const next = [parsed, ...prev];
              return next.slice(0, 200);
            });
          } catch {
            // ignore malformed payload
          }
        };
      } catch (e: unknown) {
        if (cancelled) return;
        const message = e instanceof Error ? e.message : undefined;
        setError(message ?? 'Failed to connect');
        setConnected(false);
      }

    }

    connect();

    return () => {
      cancelled = true;
      sourceRef.current?.close();
      sourceRef.current = null;
    };
  }, []);

  return { updates, connected, error };
}

