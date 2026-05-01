import { MarketSignal } from "./signal-engine/types";

export interface CommandPreset {
  label: string;
  value: string;
}

export const commandPresets: CommandPreset[] = [
  { label: "Wake", value: "/wake" },
  { label: "Watch card", value: "/watch Moon Fox First Edition" },
  { label: "Scan watchlist", value: "/scan" },
  { label: "Hunt value", value: "/hunt" },
  { label: "Buy signal", value: "/buy-signal" },
  { label: "Sell signal", value: "/sell-signal" },
  { label: "Risk check", value: "/risk Crystal Turtle Foil" },
  { label: "Explain move", value: "/explain Ancient Flame Dragon" },
  { label: "Evolve", value: "/evolve" },
];

const pct = (value: number): string => `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;

const findByName = (signals: MarketSignal[], input: string): MarketSignal | undefined =>
  signals.find((card) => card.name.toLowerCase() === input.toLowerCase());

const pulseLines = (signals: MarketSignal[]): string[] => {
  const movers = [...signals]
    .sort((a, b) => Math.abs(b.change7d) - Math.abs(a.change7d))
    .slice(0, 3);

  return [
    "⚡ SparkDex Pet awake.",
    "Market pulse:",
    ...movers.map(
      (card, index) =>
        `${index + 1}. ${card.name} — ${pct(card.change7d)} in 7d — liquidity ${card.liquidity} — signal: ${card.signal.toLowerCase()}`,
    ),
    "Pet note: Do not chase thin markets. Low liquidity can fake momentum.",
  ];
};

export const runTerminalCommand = (
  input: string,
  signals: MarketSignal[],
  evolveStage: number,
): string[] => {
  const normalized = input.trim();

  if (normalized === "/wake") {
    return pulseLines(signals);
  }

  if (normalized.startsWith("/watch ")) {
    const cardName = normalized.replace("/watch ", "").trim();
    return [`⚡ Tracking ${cardName}.`, "Watchlist ping armed. I’ll flag unusual shifts on next scan."];
  }

  if (normalized === "/scan") {
    const interesting = signals
      .filter((card) => card.signal !== "Hold")
      .slice(0, 4)
      .map((card) => `${card.name} → ${card.signal} (${pct(card.change7d)}, conf ${card.confidence}%)`);

    return ["Scanning watchlist…", ...interesting, "Done. Use /risk [card] before entries in thin markets."];
  }

  if (normalized === "/hunt") {
    const candidates = signals.filter((card) => card.signal === "Buy Zone").slice(0, 3);

    if (!candidates.length) {
      return ["No clean mispricing right now.", "Pet rule: if the edge is thin, skip the trade."];
    }

    return [
      "Hunt results:",
      ...candidates.map(
        (card) =>
          `${card.name} — $${card.currentPrice} vs $${card.avg30d} avg — ${Math.abs(card.valuationGap).toFixed(1)}% discount`,
      ),
      "Pet note: Stack liquidity + confidence before sizing up.",
    ];
  }

  if (normalized === "/buy-signal") {
    const picks = signals.filter((card) => card.signal === "Buy Zone").slice(0, 4);
    if (!picks.length) {
      return ["No strong buy-zone cards right now.", "Watch, don’t chase."];
    }

    return [
      "Buy-zone board:",
      ...picks.map((card) => `${card.name} — confidence ${card.confidence}% — ${card.explanation}`),
    ];
  }

  if (normalized === "/sell-signal") {
    const picks = signals.filter((card) => card.signal === "Sell Pressure").slice(0, 4);
    if (!picks.length) {
      return ["No overheated cards detected right now.", "Hold discipline. Wait for stretched setups."];
    }

    return [
      "Sell-pressure board:",
      ...picks.map((card) => `${card.name} — ${pct(card.change7d)} — ${card.explanation}`),
    ];
  }

  if (normalized.startsWith("/risk ")) {
    const cardName = normalized.replace("/risk ", "").trim();
    const match = findByName(signals, cardName);

    if (!match) {
      return [`No card match for “${cardName}”.`, "Try exact watchlist names."];
    }

    return [
      `${match.name} risk profile:`,
      `- liquidity risk: ${match.risk.liquidityRisk}/100`,
      `- volatility risk: ${match.risk.volatilityRisk}/100`,
      `- data confidence risk: ${match.risk.dataConfidenceRisk}/100`,
      `- composite: ${match.risk.composite}/100 (${match.risk.label})`,
      `Pet note: ${match.risk.note}`,
    ];
  }

  if (normalized.startsWith("/explain ")) {
    const cardName = normalized.replace("/explain ", "").trim();
    const match = findByName(signals, cardName);

    if (!match) {
      return [`No card match for “${cardName}”.`, "Run /scan to list active watchlist movers."];
    }

    return [
      `${match.name} movement:`,
      `- current: $${match.currentPrice} | 30d avg: $${match.avg30d}`,
      `- 7d move: ${pct(match.change7d)} | signal: ${match.signal}`,
      `- confidence: ${match.confidence}%`,
      `Reason: ${match.explanation}`,
    ];
  }

  if (normalized === "/evolve") {
    const stage = evolveStage + 1;
    const form = stage < 2 ? "Scout Form" : stage < 4 ? "Arc Form" : "Overcharge Form";
    return [
      `⚡ Evolution pulse accepted.`,
      `SparkDex Pet reached ${form}.`,
      "More scans = stronger instincts.",
    ];
  }

  return ["Unknown command.", "Try /wake, /scan, /hunt, /buy-signal, /sell-signal, /risk, /explain, /evolve."];
};
