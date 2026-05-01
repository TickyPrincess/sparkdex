import { BarChart3, Gauge, Layers, TrendingDown, TrendingUp } from "lucide-react";
import { currency, signedPercent } from "@/lib/format";
import { MarketSignal } from "@/lib/signal-engine/types";
import { RiskPill } from "@/components/ui/risk-pill";
import { SignalBadge } from "@/components/ui/signal-badge";

export function MarketSignals({ signals }: { signals: MarketSignal[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {signals.slice(0, 9).map((card) => (
        <article
          key={card.id}
          className="group rounded-xl border border-zinc-800/90 bg-zinc-950/70 p-4 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:border-lime-300/35"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">{card.name}</h3>
              <p className="mt-1 text-xs text-zinc-500">
                {card.set} · {card.edition}
              </p>
            </div>
            <SignalBadge signal={card.signal} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-zinc-300">
            <div>
              <p className="text-zinc-500">Current</p>
              <p className="mt-1 text-base font-semibold text-zinc-100">{currency(card.currentPrice)}</p>
            </div>
            <div>
              <p className="text-zinc-500">30d average</p>
              <p className="mt-1 text-base font-semibold text-zinc-100">{currency(card.avg30d)}</p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-center justify-between text-zinc-300">
              <span className="inline-flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-sky-200" /> 7d change
              </span>
              <span className={card.change7d >= 0 ? "text-lime-300" : "text-rose-300"}>
                {signedPercent(card.change7d)}
              </span>
            </div>
            <div className="flex items-center justify-between text-zinc-300">
              <span className="inline-flex items-center gap-1">
                <Layers className="h-3.5 w-3.5 text-sky-200" /> Liquidity
              </span>
              <span className="capitalize">{card.liquidity}</span>
            </div>
            <div className="flex items-center justify-between text-zinc-300">
              <span className="inline-flex items-center gap-1">
                <Gauge className="h-3.5 w-3.5 text-sky-200" /> Confidence
              </span>
              <span>{card.confidence}%</span>
            </div>
            <div className="flex items-center justify-between text-zinc-300">
              <span className="inline-flex items-center gap-1">
                <BarChart3 className="h-3.5 w-3.5 text-sky-200" /> Valuation gap
              </span>
              <span className={card.valuationGap <= 0 ? "text-lime-300" : "text-rose-300"}>
                {signedPercent(card.valuationGap)}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <RiskPill risk={card.risk.label} />
            {card.signal === "Sell Pressure" ? (
              <TrendingDown className="h-4 w-4 text-rose-300" />
            ) : (
              <TrendingUp className="h-4 w-4 text-lime-300" />
            )}
          </div>

          <p className="mt-3 text-xs leading-relaxed text-zinc-400">{card.explanation}</p>
        </article>
      ))}
    </div>
  );
}
