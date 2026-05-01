"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { SparkMascot } from "@/components/mascot";
import { TerminalFrame } from "@/components/terminal-frame";

const scriptedLines = [
  "/wake",
  "/scan Thunder Lizard Holo #004",
  "/hunt underpriced vintage foils",
  "/risk low-liquidity slabs",
];

const pulseOutput = [
  "⚡ SparkDex Pet awake. 3 unstable movers detected.",
  "Moon Fox First Edition: listing drift below 30d average.",
  "Crystal Turtle Foil: spike detected, but sales depth is thin.",
  "Ancient Flame Dragon: overheated range. trim-alert armed.",
];

export function HeroSection() {
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % scriptedLines.length);
    }, 1800);

    return () => clearInterval(timer);
  }, []);

  const visibleCommands = useMemo(
    () => scriptedLines.slice(0, activeLine + 1),
    [activeLine],
  );

  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-8 pt-14 sm:px-6 sm:pt-20">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          <motion.p
            className="text-xs uppercase tracking-[0.25em] text-lime-300"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Terminal-native card market scout
          </motion.p>
          <motion.h1
            className="mt-4 text-4xl font-semibold leading-tight text-zinc-100 sm:text-5xl"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            Wake your pet. Track the market. Catch the mispriced cards.
          </motion.h1>
          <motion.p
            className="mt-4 max-w-xl text-sm text-zinc-300 sm:text-base"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
          >
            SparkDex is a terminal-native AI pet that watches collectible card prices, scans market
            shifts, and turns noisy listings into clear buy, hold, sell, and risk signals.
          </motion.p>
          <motion.div
            className="mt-6 inline-flex rounded-full border border-lime-300/35 bg-lime-300/10 px-4 py-2 text-xs text-lime-200"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Built for underground traders, not dashboard tourists.
          </motion.div>
        </div>

        <TerminalFrame title="sparkdex://hero-terminal" rightSlot={<SparkMascot className="h-11 w-11" />}>
          <div className="space-y-3 font-mono text-sm text-zinc-200">
            {visibleCommands.map((line, index) => (
              <motion.p
                key={`${line}-${index}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className={index === activeLine ? "text-lime-200" : "text-zinc-300"}
              >
                <span className="text-zinc-500">&gt;</span> {line}
                {index === activeLine ? <span className="ml-1 animate-pulse text-lime-300">▋</span> : null}
              </motion.p>
            ))}

            <div className="mt-5 space-y-2 border-t border-zinc-800 pt-4 text-xs text-sky-100/90">
              {pulseOutput.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </TerminalFrame>
      </div>
    </section>
  );
}
