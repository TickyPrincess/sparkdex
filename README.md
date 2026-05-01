# SparkDex ⚡

Wake. Scan. Signal.

SparkDex is a terminal-native AI pet for collectible card market tracking.
It helps you monitor prices, scan watchlists, detect unusual movement, hunt for potential mispricing, and review risk-aware buy/hold/sell signals.

> **IP-safe by design:** SparkDex uses original mascot art, original card names, and mock market data. No copyrighted character names, logos, or card art are used.

---

## What SparkDex does

- `/wake` daily pulse in terminal style
- watchlist scanning for price shifts
- underpricing hunts and overheated-card flags
- confidence + risk context (liquidity, volatility, data quality)
- compact explanations for every signal

---

## Quick start

```bash
git clone https://github.com/your-org/sparkdex.git
cd sparkdex
npm install
cp .env.example .env.local
npm run dev
```

Open: `http://localhost:3000`

---

## Commands

- `/wake`
- `/watch [card name]`
- `/scan`
- `/hunt`
- `/buy-signal`
- `/sell-signal`
- `/explain [card name]`
- `/risk [card name]`
- `/evolve`

See `docs/COMMANDS.md`.

---

## Architecture

```txt
app/
  page.tsx                 # Landing page + demo sections
  layout.tsx               # Metadata + global shell
components/
  sections/                # Hero, live terminal, watchlist, providers, safety
  ui/                      # Section shell, badges, pills
lib/
  signal-engine/           # signal + risk scoring logic
  providers/               # adapter interfaces + provider placeholders
  terminal-engine.ts       # command simulation logic
data/
  cards.json               # fictional market fixtures
  watchlist.json           # watchlist fixtures
prompts/
  hatch-command.md
  codex-pet-prompt.md
docs/
  INSTALLATION.md
  COMMANDS.md
  DATA_PROVIDERS.md
  SIGNAL_ENGINE.md
  CODEX_PET.md
  SAFETY.md
```

---

## Data providers

SparkDex runs on **mock data by default**.

Adapters are scaffolded for:

- eBay sold/comparable listings
- TCG marketplace provider
- Price history provider
- Manual CSV import
- Mock demo provider

See `docs/DATA_PROVIDERS.md` and `lib/providers/`.

---

## Signal engine

The engine combines:

- price delta vs 30d baseline
- sales velocity
- listing depth
- recent sold comps
- liquidity
- volatility
- confidence score
- risk warning

See `docs/SIGNAL_ENGINE.md`.

---

## Codex pet setup

Use hatch command from:

- `prompts/hatch-command.md`

Use personality prompt from:

- `prompts/codex-pet-prompt.md`

Also documented in `docs/CODEX_PET.md`.

---

## Screenshots (placeholders)

- `docs/screenshots/hero-terminal.png`
- `docs/screenshots/live-demo-terminal.png`
- `docs/screenshots/watchlist-signals.png`

---

## Roadmap

- [ ] Real provider adapter implementations
- [ ] Backtest view for signal quality by card segment
- [ ] Saved alerts + notifications
- [ ] Portfolio mode with exposure/risk bands
- [ ] CLI package (`sparkdex` command)

---

## Risk disclaimer

SparkDex is **not financial advice**.
It is a market research assistant for collectible cards.
Signals are probabilistic and depend on data quality.

## License

MIT
