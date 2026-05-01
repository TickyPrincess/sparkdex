# Data Providers

SparkDex uses an adapter architecture (`lib/providers/`) so new data sources can be added without touching UI code.

## Included adapters

1. **Mock demo provider** (`mock-demo`) — local JSON data for deterministic demos.
2. **eBay sold/comps adapter** (`ebay-sold-comps`) — scaffold only.
3. **TCG marketplace adapter** (`tcg-marketplace`) — scaffold only.
4. **Price history adapter** (`price-history`) — scaffold only.
5. **Manual CSV adapter** (`manual-csv`) — import local rows.

## Provider contract

Every adapter implements:

- `getCardQuote(cardName)`
- `searchCards(query)`
- `healthCheck()`

See `lib/providers/types.ts`.

## Environment

All secrets must come from env vars (`.env.local`).
