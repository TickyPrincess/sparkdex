import { RiskLabel } from "@/lib/signal-engine/types";

const riskClass: Record<RiskLabel, string> = {
  Low: "bg-emerald-300/15 text-emerald-200",
  Moderate: "bg-emerald-300/15 text-emerald-300",
  Elevated: "bg-amber-300/15 text-amber-200",
  High: "bg-rose-300/15 text-rose-200",
};

export function RiskPill({ risk }: { risk: RiskLabel }) {
  return <span className={`rounded px-2 py-1 text-xs font-medium ${riskClass[risk]}`}>{risk} risk</span>;
}
