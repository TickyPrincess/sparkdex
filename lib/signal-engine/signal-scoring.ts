import { scoreRisk } from "./risk-scoring";
import { CardRecord, MarketSignal, SignalState } from "./types";

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const signalExplanation = (
  signal: SignalState,
  valuationGap: number,
  change7d: number,
  confidence: number,
): string => {
  if (signal === "Buy Zone") {
    return `Trading ${Math.abs(valuationGap).toFixed(1)}% below 30d mean with usable liquidity. Confidence ${confidence}%.`;
  }

  if (signal === "Sell Pressure") {
    return `Price is extended ${Math.abs(valuationGap).toFixed(1)}% above mean with a ${change7d.toFixed(1)}% weekly burst.`;
  }

  if (signal === "Hold") {
    return `Structure is balanced: no major dislocation, confidence ${confidence}% and trend is orderly.`;
  }

  return `Signal quality is limited. Confidence ${confidence}% — watch, don’t chase.`;
};

export const scoreSignal = (card: CardRecord): MarketSignal => {
  const valuationGap = ((card.currentPrice - card.avg30d) / card.avg30d) * 100;
  const discount = -valuationGap;
  const premium = valuationGap;

  const velocityRatio = card.sales7d / Math.max(card.listingDepth, 1);
  const velocityScore = clamp((velocityRatio / 0.42) * 100, 8, 96);

  const risk = scoreRisk(card);

  const compDensity = clamp((card.recentSoldComps.length / 8) * 100, 20, 100);
  const confidence = Math.round(clamp(100 - risk.composite * 0.62 + velocityScore * 0.18 + compDensity * 0.2, 24, 95));

  const bullishSetup = discount >= 9 && velocityScore >= 32 && confidence >= 58 && card.liquidity !== "low";
  const overheatedSetup = premium >= 12 && card.change7d >= 10;
  const weakData = confidence < 48 || (card.liquidity === "low" && Math.abs(card.change7d) > 12);

  let signal: SignalState = "Hold";

  if (bullishSetup) {
    signal = "Buy Zone";
  } else if (overheatedSetup) {
    signal = "Sell Pressure";
  } else if (weakData) {
    signal = "Watch";
  }

  return {
    ...card,
    valuationGap: Number(valuationGap.toFixed(1)),
    confidence,
    signal,
    risk,
    explanation: signalExplanation(signal, valuationGap, card.change7d, confidence),
  };
};

export const scoreMarket = (cards: CardRecord[]): MarketSignal[] =>
  cards
    .map(scoreSignal)
    .sort(
      (a, b) =>
        Math.abs(b.valuationGap) + b.change7d * 0.45 - (Math.abs(a.valuationGap) + a.change7d * 0.45),
    );
