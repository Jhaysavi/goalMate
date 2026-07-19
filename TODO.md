# TODO - FIFA World Cup + TxLINE integration fixes

## Completed
- Added TanStack Query provider (server-side wiring).
- Added World Cup domain skeleton (types/repositories/hooks) with mock fallback.
- Fixed TxLINE guest token normalization in odds-stream proxy.

## Pending (TxLINE Free Tier activation flow)
- [ ] Add TxLINE server-side auth storage + routes:
  - [x] `/api/txline/auth/start`
  - [x] `/api/txline/auth/status`
  - [x] `/api/txline/debug`
- [ ] Fix `/api/txline/fixtures` to require activated API token and return useful error on missing activation.
- [ ] Fix `/api/txline/odds-stream` similarly (Authorization=Bearer JWT, X-Api-Token=activated api token).
- [ ] Add `.env.local` variables (TXLINE_API_URL, TXLINE_JWT_URL, TXLINE_API_TOKEN, TXLINE_TOKEN_MINT, etc.).
- [ ] Verify with curl:
  - `curl localhost:3000/api/txline/debug`
  - `curl localhost:3000/api/txline/fixtures?competitionId=72`
- [ ] Ensure UI does not change; only integration/data-layer adjustments.

