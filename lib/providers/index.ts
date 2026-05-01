import { ebaySoldCompsAdapter } from "./adapters/ebay-adapter";
import { manualCsvAdapter } from "./adapters/csv-import-adapter";
import { mockDemoProvider } from "./adapters/mock-demo-provider";
import { priceHistoryAdapter } from "./adapters/price-history-adapter";
import { tcgMarketplaceAdapter } from "./adapters/tcg-marketplace-adapter";
import { PriceProviderAdapter, ProviderId } from "./types";

export const providerRegistry: Record<ProviderId, PriceProviderAdapter> = {
  "mock-demo": mockDemoProvider,
  "ebay-sold-comps": ebaySoldCompsAdapter,
  "tcg-marketplace": tcgMarketplaceAdapter,
  "price-history": priceHistoryAdapter,
  "manual-csv": manualCsvAdapter,
};

export const getProvider = (id: ProviderId): PriceProviderAdapter => providerRegistry[id];

export const listProviders = (): PriceProviderAdapter[] => Object.values(providerRegistry);
