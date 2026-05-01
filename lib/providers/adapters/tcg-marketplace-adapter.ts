import { PriceProviderAdapter } from "../types";

/**
 * Placeholder adapter for a TCG marketplace provider.
 */
export const tcgMarketplaceAdapter: PriceProviderAdapter = {
  id: "tcg-marketplace",
  label: "TCG Marketplace Adapter",
  isMock: false,
  docsUrl: "https://docs.tcgplayer.com/",
  async getCardQuote() {
    return null;
  },
  async searchCards() {
    return [];
  },
  async healthCheck() {
    return {
      ok: false,
      message: "Adapter scaffold only. Add marketplace API calls.",
    };
  },
};
