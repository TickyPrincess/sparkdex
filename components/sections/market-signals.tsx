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
          className="group rounded-xl border border-emerald-950 bg-emerald-950/20 p-4 shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:border-emerald-400/45"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-emerald-100">{card.name}</h3>
              <p className="mt-1 text-xs text-emerald-400/60">
                {card.set} · {card.edition}
              </p>
            </div>
            <SignalBadge signal={card.signal} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-emerald-200/75">
            <div>
              <p className="text-emerald-400/60">Current</p>
              <p className="mt-1 text-base font-semibold text-emerald-100">{currency(card.currentPrice)}</p>
            </div>
            <div>
              <p className="text-emerald-400/60">30d average</p>
              <p className="mt-1 text-base font-semibold text-emerald-100">{currency(card.avg30d)}</p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-center justify-between text-emerald-200/75">
              <span className="inline-flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-300" /> 7d change
              </span>
              <span className={card.change7d >= 0 ? "text-lime-300" : "text-rose-300"}>
                {signedPercent(card.change7d)}
              </span>
            </div>
            <div className="flex items-center justify-between text-emerald-200/75">
              <span className="inline-flex items-center gap-1">
                <Layers className="h-3.5 w-3.5 text-emerald-300" /> Liquidity
              </span>
              <span className="capitalize">{card.liquidity}</span>
            </div>
            <div className="flex items-center justify-between text-emerald-200/75">
              <span className="inline-flex items-center gap-1">
                <Gauge className="h-3.5 w-3.5 text-emerald-300" /> Confidence
              </span>
              <span>{card.confidence}%</span>
            </div>
            <div className="flex items-center justify-between text-emerald-200/75">
              <span className="inline-flex items-center gap-1">
                <BarChart3 className="h-3.5 w-3.5 text-emerald-300" /> Valuation gap
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

          <p className="mt-3 text-xs leading-relaxed text-emerald-300/70">{card.explanation}</p>
        </article>
      ))}
    </div>
  );
}
