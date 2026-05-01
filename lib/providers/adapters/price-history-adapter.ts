import { PriceProviderAdapter } from "../types";

/**
 * Placeholder adapter for historical chart/time-series providers.
 */
export const priceHistoryAdapter: PriceProviderAdapter = {
  id: "price-history",
  label: "Price History Adapter",
  isMock: false,
  docsUrl: "https://example.com/history-provider-docs",
  async getCardQuote() {
    return null;
  },
  async searchCards() {
    return [];
  },
  async healthCheck() {
    return {
      ok: false,
      message: "Adapter scaffold only. Wire your historical endpoint.",
    };
  },
};
