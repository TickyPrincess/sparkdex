import { AlertTriangle, Binary, CandlestickChart, Database, ShieldAlert, Waves } from "lucide-react";

const engineRows = [
  {
    icon: CandlestickChart,
    name: "Price delta",
    detail: "Compares live listing price against 7d and 30d baselines.",
  },
  {
    icon: Waves,
    name: "Sales velocity",
    detail: "Checks how quickly listings convert to sales versus listing depth.",
  },
  {
    icon: Binary,
    name: "Recent sold comps",
    detail: "Weights comp freshness and count before accepting a move as real.",
  },
  {
    icon: Database,
    name: "Liquidity + volatility",
    detail: "Combines depth with volatility so thin pumps are treated as fragile.",
  },
  {
    icon: ShieldAlert,
    name: "Confidence score",
    detail: "0-100 score driven by data quality, not hype. Low confidence = watch mode.",
  },
  {
    icon: AlertTriangle,
    name: "Risk warning",
    detail: "Every buy/hold/sell label includes explicit risk context and uncertainty.",
  },
];

export function SignalEngineSection() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {engineRows.map((row) => (
        <article
          key={row.name}
          className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 transition hover:border-sky-200/35"
        >
          <p className="inline-flex items-center gap-2 text-sm font-medium text-zinc-100">
            <row.icon className="h-4 w-4 text-sky-200" />
            {row.name}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{row.detail}</p>
        </article>
      ))}
    </div>
  );
}
