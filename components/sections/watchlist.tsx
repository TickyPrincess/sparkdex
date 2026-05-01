import { Bell, Radar } from "lucide-react";
import { currency, signedPercent } from "@/lib/format";
import { MarketSignal, WatchItem } from "@/lib/signal-engine/types";
import { SignalBadge } from "@/components/ui/signal-badge";

export function WatchlistSection({
  items,
}: {
  items: Array<WatchItem & { card: MarketSignal }>;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-950 bg-emerald-950/20">
      <div className="hidden grid-cols-[1.7fr_1fr_1fr_1fr_2fr] border-b border-emerald-950 px-4 py-3 text-[11px] uppercase tracking-[0.14em] text-emerald-300/55 md:grid">
        <p>Card</p>
        <p>Price</p>
        <p>7d</p>
        <p>Alert</p>
        <p>Pet comment</p>
      </div>

      <div className="divide-y divide-emerald-950/70">
        {items.map((item) => (
          <div
            key={item.cardId}
            className="grid gap-2 px-4 py-4 md:grid-cols-[1.7fr_1fr_1fr_1fr_2fr] md:items-center"
          >
            <div>
              <p className="text-sm font-medium text-emerald-100">{item.card.name}</p>
              <p className="mt-1 text-xs text-emerald-400/60">
                {item.card.set} · target {currency(item.targetPrice)}
              </p>
              <div className="mt-2 md:hidden">
                <SignalBadge signal={item.card.signal} />
              </div>
            </div>

            <p className="text-sm text-emerald-100">{currency(item.card.currentPrice)}</p>
            <p className={item.card.change7d >= 0 ? "text-sm text-lime-300" : "text-sm text-rose-300"}>
              {signedPercent(item.card.change7d)}
            </p>
            <p className="inline-flex w-fit items-center gap-1 rounded-md border border-emerald-950 bg-emerald-950/45 px-2 py-1 text-xs text-emerald-200/85">
              <Bell className="h-3.5 w-3.5 text-yellow-200" /> {item.alert}
            </p>
            <p className="text-xs leading-relaxed text-emerald-300/70">
              <span className="mr-1 inline-flex items-center gap-1 text-emerald-300">
                <Radar className="h-3.5 w-3.5" /> SparkDex:
              </span>
              {item.petNote}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
