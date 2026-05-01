"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { SparkMascot } from "@/components/mascot";
import { TerminalFrame } from "@/components/terminal-frame";
import { commandPresets, runTerminalCommand } from "@/lib/terminal-engine";
import { MarketSignal } from "@/lib/signal-engine/types";

type TerminalLine = { kind: "cmd" | "out"; text: string };

const seedLog = (signals: MarketSignal[]): TerminalLine[] => {
  const output = runTerminalCommand("/wake", signals, 0);
  return [{ kind: "cmd", text: "/wake" }, ...output.map((line) => ({ kind: "out" as const, text: line }))];
};

export function LiveDemoTerminal({ signals }: { signals: MarketSignal[] }) {
  const [evolution, setEvolution] = useState(0);
  const [activeInput, setActiveInput] = useState("/wake");
  const [log, setLog] = useState<TerminalLine[]>(() => seedLog(signals));

  const formLabel = useMemo(() => {
    if (evolution < 2) return "Scout Form";
    if (evolution < 4) return "Arc Form";
    return "Overcharge Form";
  }, [evolution]);

  const execute = (command: string) => {
    const trimmed = command.trim();
    if (!trimmed) return;

    const output = runTerminalCommand(trimmed, signals, evolution);
    const outputLines: TerminalLine[] = output.map((text): TerminalLine => ({ kind: "out", text }));

    const nextLog = ([...log, { kind: "cmd" as const, text: trimmed }, ...outputLines] as TerminalLine[]).slice(-42);

    if (trimmed === "/evolve") {
      setEvolution((value) => value + 1);
    }

    setLog(nextLog);
    setActiveInput(trimmed);
  };

  return (
    <TerminalFrame
      title="sparkdex://live-demo"
      rightSlot={
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-zinc-400">
          <span>{formLabel}</span>
          <SparkMascot evolution={evolution} className="h-10 w-10" />
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Commands</p>
          {commandPresets.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => execute(preset.value)}
              className="block w-full rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-left text-xs text-zinc-200 transition hover:border-lime-300/40 hover:text-lime-200"
            >
              <span className="block text-[10px] uppercase tracking-[0.12em] text-zinc-500">{preset.label}</span>
              <span className="mt-1 block font-mono">{preset.value}</span>
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-zinc-800/80 bg-black/65 p-3">
          <div className="max-h-[360px] space-y-1.5 overflow-y-auto pr-2 font-mono text-xs sm:text-sm">
            {log.map((line, index) => (
              <motion.p
                key={`${line.kind}-${index}-${line.text}`}
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                className={line.kind === "cmd" ? "text-lime-200" : "text-zinc-200"}
              >
                {line.kind === "cmd" ? <span className="text-zinc-500">&gt; </span> : null}
                {line.text}
              </motion.p>
            ))}
          </div>

          <button
            type="button"
            onClick={() => execute(activeInput)}
            className="mt-3 flex w-full items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-left text-xs text-zinc-300 transition hover:border-lime-300/40"
          >
            <span className="font-mono">{`> ${activeInput}`}</span>
            <span className="animate-pulse text-lime-300">run ↵</span>
          </button>
        </div>
      </div>
    </TerminalFrame>
  );
}
