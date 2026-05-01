export type Liquidity = "high" | "medium" | "low";

export type SignalState = "Watch" | "Buy Zone" | "Hold" | "Sell Pressure";

export type RiskLabel = "Low" | "Moderate" | "Elevated" | "High";

export interface CardRecord {
  id: string;
  name: string;
  set: string;
  edition: string;
  currentPrice: number;
  avg30d: number;
  change7d: number;
  liquidity: Liquidity;
  sales7d: number;
  listingDepth: number;
  volatility30d: number;
  recentSoldComps: number[];
}

export interface RiskProfile {
  liquidityRisk: number;
  volatilityRisk: number;
  dataConfidenceRisk: number;
  composite: number;
  label: RiskLabel;
  note: string;
}

export interface MarketSignal extends CardRecord {
  valuationGap: number;
  confidence: number;
  signal: SignalState;
  risk: RiskProfile;
  explanation: string;
}

export interface WatchItem {
  cardId: string;
  alert: string;
  targetPrice: number;
  petNote: string;
}
