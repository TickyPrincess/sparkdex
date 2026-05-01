import { CardRecord, Liquidity, RiskLabel, RiskProfile } from "./types";

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const liquidityRiskScale: Record<Liquidity, number> = {
  high: 22,
  medium: 46,
  low: 78,
};

const riskLabelFromScore = (score: number): RiskLabel => {
  if (score <= 34) return "Low";
  if (score <= 54) return "Moderate";
  if (score <= 74) return "Elevated";
  return "High";
};

const riskNote = (label: RiskLabel): string => {
  switch (label) {
    case "Low":
      return "Healthy market depth and stable comp flow.";
    case "Moderate":
      return "Tradable setup, but entries still need discipline.";
    case "Elevated":
      return "Fast moves can reverse. Use tighter risk controls.";
    case "High":
      return "Thin or noisy data. Watch, don’t chase.";
  }
};

export const scoreRisk = (card: CardRecord): RiskProfile => {
  const liquidityRisk = liquidityRiskScale[card.liquidity];

  const volatilityRisk = clamp((card.volatility30d / 35) * 100, 12, 95);

  const salesCoverage = clamp((card.sales7d / 50) * 100, 0, 100);
  const compCoverage = clamp((card.recentSoldComps.length / 8) * 100, 0, 100);
  const listingCoverage = clamp((card.listingDepth / 180) * 100, 0, 100);

  const dataConfidence = salesCoverage * 0.45 + compCoverage * 0.35 + listingCoverage * 0.2;
  const dataConfidenceRisk = clamp(100 - dataConfidence, 8, 92);

  const composite = clamp(
    liquidityRisk * 0.34 + volatilityRisk * 0.34 + dataConfidenceRisk * 0.32,
    0,
    100,
  );

  const label = riskLabelFromScore(composite);

  return {
    liquidityRisk: Math.round(liquidityRisk),
    volatilityRisk: Math.round(volatilityRisk),
    dataConfidenceRisk: Math.round(dataConfidenceRisk),
    composite: Math.round(composite),
    label,
    note: riskNote(label),
  };
};
