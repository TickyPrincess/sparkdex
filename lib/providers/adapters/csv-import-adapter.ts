import { PriceProviderAdapter, ProviderCardQuote } from "../types";

/**
 * CSV adapter supports manual uploads in this column format:
 * cardId,cardName,currentPrice,avg30d,change7d,sales7d,listingDepth
 */
const parseCsv = (csvText: string): ProviderCardQuote[] => {
  const [headerLine, ...lines] = csvText.trim().split(/\r?\n/);
  if (!headerLine) return [];

  const headers = headerLine.split(",").map((col) => col.trim());
  const required = [
    "cardId",
    "cardName",
    "currentPrice",
    "avg30d",
    "change7d",
    "sales7d",
    "listingDepth",
  ];

  if (required.some((field) => !headers.includes(field))) {
    return [];
  }

  return lines
    .filter(Boolean)
    .map((line) => {
      const values = line.split(",").map((cell) => cell.trim());
      const row = Object.fromEntries(headers.map((header, idx) => [header, values[idx] ?? ""]));

      return {
        cardId: row.cardId,
        cardName: row.cardName,
        currentPrice: Number(row.currentPrice),
        avg30d: Number(row.avg30d),
        change7d: Number(row.change7d),
        sales7d: Number(row.sales7d),
        listingDepth: Number(row.listingDepth),
        currency: "USD" as const,
        capturedAt: new Date().toISOString(),
        raw: row,
      };
    })
    .filter((row) => row.cardId && row.cardName);
};

let cachedManualRows: ProviderCardQuote[] = [];

export const hydrateCsvCache = (csvText: string): void => {
  cachedManualRows = parseCsv(csvText);
};

export const manualCsvAdapter: PriceProviderAdapter = {
  id: "manual-csv",
  label: "Manual CSV Import Adapter",
  isMock: false,
  async getCardQuote(cardName) {
    const match = cachedManualRows.find(
      (row) => row.cardName.toLowerCase() === cardName.toLowerCase(),
    );
    return match ?? null;
  },
  async searchCards(query) {
    const normalized = query.toLowerCase();
    return cachedManualRows.filter((row) => row.cardName.toLowerCase().includes(normalized));
  },
  async healthCheck() {
    return {
      ok: cachedManualRows.length > 0,
      message:
        cachedManualRows.length > 0
          ? `Manual CSV loaded (${cachedManualRows.length} rows).`
          : "No CSV imported yet.",
    };
  },
};
