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
    "⚡ sparkdex.online :: pet_awake=true",
    "market.pulse:",
    ...movers.map(
      (card, index) =>
        `${index + 1}. ${card.name} | ${pct(card.change7d)} 7d | liq:${card.liquidity} | signal:${card.signal.toLowerCase()}`,
    ),
    "note> thin liquidity can print fake momentum. watch, don’t chase.",
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
    return [`tracker.add(${cardName}) :: ok`, "alert hook armed. next /scan will include this card."];
  }

  if (normalized === "/scan") {
    const interesting = signals
      .filter((card) => card.signal !== "Hold")
      .slice(0, 4)
      .map((card) => `${card.name} -> ${card.signal} (${pct(card.change7d)}, conf ${card.confidence}%)`);

    return ["scan.watchlist() :: running", ...interesting, "done. run /risk [card] before entries."];
  }

  if (normalized === "/hunt") {
    const candidates = signals.filter((card) => card.signal === "Buy Zone").slice(0, 3);

    if (!candidates.length) {
      return ["hunt.mispricing() :: no clean setups", "edge too thin right now. skip and wait."];
    }

    return [
      "hunt.mispricing() ->",
      ...candidates.map(
        (card) =>
          `${card.name} | $${card.currentPrice} vs $${card.avg30d} avg | ${Math.abs(card.valuationGap).toFixed(1)}% discount`,
      ),
      "note> prioritize liquidity + confidence before size.",
    ];
  }

  if (normalized === "/buy-signal") {
    const picks = signals.filter((card) => card.signal === "Buy Zone").slice(0, 4);
    if (!picks.length) {
      return ["buy.signal() :: none", "watch, don’t chase."];
    }

    return ["buy.signal() ->", ...picks.map((card) => `${card.name} | conf ${card.confidence}% | ${card.explanation}`)];
  }

  if (normalized === "/sell-signal") {
    const picks = signals.filter((card) => card.signal === "Sell Pressure").slice(0, 4);
    if (!picks.length) {
      return ["sell.signal() :: none", "no overheated setups detected."];
    }

    return ["sell.signal() ->", ...picks.map((card) => `${card.name} | ${pct(card.change7d)} | ${card.explanation}`)];
  }

  if (normalized.startsWith("/risk ")) {
    const cardName = normalized.replace("/risk ", "").trim();
    const match = findByName(signals, cardName);

    if (!match) {
      return [`lookup error: “${cardName}” not found`, "tip> use exact watchlist card name."];
    }

    return [
      `${match.name} :: risk.profile`,
      `- liquidity risk: ${match.risk.liquidityRisk}/100`,
      `- volatility risk: ${match.risk.volatilityRisk}/100`,
      `- data confidence risk: ${match.risk.dataConfidenceRisk}/100`,
      `- composite: ${match.risk.composite}/100 (${match.risk.label})`,
      `note> ${match.risk.note}`,
    ];
  }

  if (normalized.startsWith("/explain ")) {
    const cardName = normalized.replace("/explain ", "").trim();
    const match = findByName(signals, cardName);

    if (!match) {
      return [`lookup error: “${cardName}” not found`, "run /scan to inspect active movers."];
    }

    return [
      `${match.name} :: move.explain`,
      `- current: $${match.currentPrice} | 30d avg: $${match.avg30d}`,
      `- 7d move: ${pct(match.change7d)} | signal: ${match.signal}`,
      `- confidence: ${match.confidence}%`,
      `reason> ${match.explanation}`,
    ];
  }

  if (normalized === "/evolve") {
    const stage = evolveStage + 1;
    const form = stage < 2 ? "Scout Form" : stage < 4 ? "Arc Form" : "Overcharge Form";
    return ["evolution.pulse() :: accepted", `sparkdex.form = ${form}`, "more scans => sharper instincts."];
  }

  return ["command error: unknown input", "try /wake /scan /hunt /buy-signal /sell-signal /risk /explain /evolve"];
};
