# Signal Engine

SparkDex computes card signals from market structure, not hype.

## Inputs

- current listing price
- 30d average price
- 7d percent move
- sales velocity (`sales7d / listingDepth`)
- liquidity bucket (`high`, `medium`, `low`)
- volatility (30d)
- recent sold comp count

## Outputs

- signal state: `Watch | Buy Zone | Hold | Sell Pressure`
- confidence score (0-100)
- risk profile:
  - liquidity risk
  - volatility risk
  - data-confidence risk
  - composite + label

## Files

- `lib/signal-engine/signal-scoring.ts`
- `lib/signal-engine/risk-scoring.ts`
- `lib/signal-engine/types.ts`

## Safety behavior

If confidence is weak or liquidity is thin, SparkDex defaults to **watch, don’t chase**.
