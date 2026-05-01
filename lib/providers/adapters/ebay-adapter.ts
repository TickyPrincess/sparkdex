import { PriceProviderAdapter } from "../types";

/**
 * Placeholder adapter. Implement eBay sold/comparable listing ingestion here.
 * Keep API credentials in env vars only.
 */
export const ebaySoldCompsAdapter: PriceProviderAdapter = {
  id: "ebay-sold-comps",
  label: "eBay Sold/Comps Adapter",
  isMock: false,
  docsUrl: "https://developer.ebay.com/",
  async getCardQuote() {
    return null;
  },
  async searchCards() {
    return [];
  },
  async healthCheck() {
    return {
      ok: false,
      message: "Adapter scaffold only. Add API integration.",
    };
  },
};
