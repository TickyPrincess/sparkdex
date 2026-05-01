import { SignalState } from "@/lib/signal-engine/types";

const signalClass: Record<SignalState, string> = {
  "Buy Zone": "bg-lime-300/15 text-lime-300 border-lime-300/40",
  Hold: "bg-emerald-300/10 text-emerald-300 border-emerald-300/30",
  Watch: "bg-yellow-300/12 text-yellow-200 border-yellow-300/35",
  "Sell Pressure": "bg-rose-300/12 text-rose-200 border-rose-300/30",
};

export function SignalBadge({ signal }: { signal: SignalState }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${signalClass[signal]}`}>
      {signal}
    </span>
  );
}
