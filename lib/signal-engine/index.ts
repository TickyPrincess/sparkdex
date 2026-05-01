import rawCards from "@/data/cards.json";
import watchlistRaw from "@/data/watchlist.json";
import { scoreMarket } from "./signal-scoring";
import { CardRecord, MarketSignal, WatchItem } from "./types";

const cards = rawCards as CardRecord[];
const watchlist = watchlistRaw as WatchItem[];

export const getSignals = (): MarketSignal[] => scoreMarket(cards);

export const getWatchlistSignals = (): Array<WatchItem & { card: MarketSignal }> => {
  const signalMap = new Map(getSignals().map((card) => [card.id, card]));

  return watchlist
    .map((item) => {
      const card = signalMap.get(item.cardId);
      if (!card) return null;
      return { ...item, card };
    })
    .filter((item): item is WatchItem & { card: MarketSignal } => Boolean(item));
};
