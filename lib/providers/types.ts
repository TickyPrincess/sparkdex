export type ProviderId =
  | "mock-demo"
  | "ebay-sold-comps"
  | "tcg-marketplace"
  | "price-history"
  | "manual-csv";

export interface ProviderCardQuote {
  cardId: string;
  cardName: string;
  currentPrice: number;
  avg30d: number;
  change7d: number;
  sales7d: number;
  listingDepth: number;
  currency: "USD";
  capturedAt: string;
  raw?: unknown;
}

export interface AdapterHealth {
  ok: boolean;
  latencyMs?: number;
  message: string;
}

export interface PriceProviderAdapter {
  id: ProviderId;
  label: string;
  isMock: boolean;
  docsUrl?: string;
  getCardQuote(cardName: string): Promise<ProviderCardQuote | null>;
  searchCards(query: string): Promise<ProviderCardQuote[]>;
  healthCheck(): Promise<AdapterHealth>;
}
