import cards from "@/data/cards.json";
import { PriceProviderAdapter, ProviderCardQuote } from "../types";

const rows = cards as Array<{
  id: string;
  name: string;
  currentPrice: number;
  avg30d: number;
  change7d: number;
  sales7d: number;
  listingDepth: number;
}>;

const toQuote = (row: (typeof rows)[number]): ProviderCardQuote => ({
  cardId: row.id,
  cardName: row.name,
  currentPrice: row.currentPrice,
  avg30d: row.avg30d,
  change7d: row.change7d,
  sales7d: row.sales7d,
  listingDepth: row.listingDepth,
  currency: "USD",
  capturedAt: new Date().toISOString(),
  raw: { source: "mock-demo" },
});

export const mockDemoProvider: PriceProviderAdapter = {
  id: "mock-demo",
  label: "Mock Demo Provider",
  isMock: true,
  async getCardQuote(cardName) {
    const match = rows.find((row) => row.name.toLowerCase() === cardName.toLowerCase());
    return match ? toQuote(match) : null;
  },
  async searchCards(query) {
    const normalized = query.trim().toLowerCase();
    return rows
      .filter((row) => row.name.toLowerCase().includes(normalized))
      .map(toQuote)
      .slice(0, 12);
  },
  async healthCheck() {
    return {
      ok: true,
      message: "Mock provider online.",
      latencyMs: 3,
    };
  },
};
