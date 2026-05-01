import { AlertTriangle } from "lucide-react";

export function RiskDisclaimerSection() {
  return (
    <div className="rounded-xl border border-amber-300/25 bg-amber-300/8 p-4 text-sm text-amber-100">
      <p className="inline-flex items-center gap-2 font-medium text-amber-200">
        <AlertTriangle className="h-4 w-4" /> Risk disclaimer
      </p>
      <p className="mt-2 leading-relaxed text-amber-50/90">
        SparkDex is not financial advice. It is a market research assistant for collectible cards.
        Signals are probabilistic and depend on data quality, liquidity, and recent market behavior.
      </p>
    </div>
  );
}
