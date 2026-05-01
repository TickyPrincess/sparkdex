import { signedPercent } from "@/lib/format";
import { MarketSignal } from "@/lib/signal-engine/types";

export function MarketTicker({ signals }: { signals: MarketSignal[] }) {
  const items = signals.slice(0, 10);

  return (
    <div className="border-y border-zinc-800/80 bg-black/35 py-2">
      <div className="ticker-track">
        {[...items, ...items].map((card, index) => (
          <p key={`${card.id}-${index}`} className="ticker-item">
            <span className="text-zinc-200">{card.name}</span>
            <span className={card.change7d >= 0 ? "text-lime-300" : "text-rose-300"}>
              {signedPercent(card.change7d)}
            </span>
            <span className="text-zinc-500">{card.signal}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
