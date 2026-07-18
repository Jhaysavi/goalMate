# TXLINE Integration Audit Report

## Symptom
Browser console shows:
- `Failed to load resource: net::ERR_CONNECTION_REFUSED /worldcup/matches`

## Root Cause (confirmed by code inspection)
1. `src/services/api/endpoints.ts` uses placeholder endpoint paths:
   - matches: `/worldcup/matches`

2. `src/services/api/http-client.ts` builds the request URL using:
   - `NEXT_PUBLIC_TXLINE_BASE_URL` as the base
   - if the base env var is empty/falsy, it falls back to `http://localhost`

When `NEXT_PUBLIC_TXLINE_BASE_URL` is not correctly set (or is empty), the browser/Next ends up attempting to reach `http://localhost/worldcup/matches`.
If nothing is listening there, you get `ERR_CONNECTION_REFUSED`.

## Current Data Flow (TxLINE → React)
- UI pages use React Query hooks (ex: `src/app/page.tsx`, `src/app/live-matches/page.tsx`, `src/app/missions/page.tsx`)
- Hooks call repositories (ex: `src/hooks/worldcup/useMatches.ts` → `src/repositories/worldcup/matches-repo.ts`)
- Repository calls TxLINE client (ex: `src/services/api/txline-client.ts`)
- TxLINE client calls HTTP client (ex: `src/services/api/http-client.ts`)
- HTTP client uses `NEXT_PUBLIC_TXLINE_BASE_URL` + endpoint paths from `src/services/api/endpoints.ts`

## Why Mock Data Was Previously Shown
- Hooks originally had an automatic mock fallback (`useWorldCupMocks.ts`).
- This fallback is now gated by `NEXT_PUBLIC_USE_MOCKS === 'true'` so API failures should surface error states instead of fabricated fixtures.

## What Must Be Fixed Next
### A) Environment configuration
Set `NEXT_PUBLIC_TXLINE_BASE_URL` to the real TxLINE host from the official documentation.

### B) Endpoint path correctness
Replace placeholder endpoint paths in `src/services/api/endpoints.ts` with the exact documented TxLINE routes (including version prefixes if any).

## Files Involved
- `src/services/api/http-client.ts`
- `src/services/api/endpoints.ts`
- `src/services/api/txline-client.ts`
- `src/repositories/worldcup/matches-repo.ts`
- `src/hooks/worldcup/useMatches.ts`
- `src/hooks/worldcup/useLiveMatch.ts`

## Verification Checklist
After setting env + endpoints:
1. Confirm Network tab shows requests to the TxLINE host (not `/worldcup/*` on localhost).
2. Verify HTTP 200 responses.
3. Verify rendered matches reflect the returned payload.
4. Ensure no mock fallback occurs unless `NEXT_PUBLIC_USE_MOCKS=true`.

