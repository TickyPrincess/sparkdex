"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SparkMascot } from "@/components/mascot";
import { TerminalFrame } from "@/components/terminal-frame";

const scriptedLines = [
  "/wake",
  "/scan Thunder Lizard Holo #004",
  "/hunt underpriced vintage foils",
  "/risk Crystal Turtle Foil",
];

const pulseOutput = [
  "[sparkdex] pet online :: 3 unstable movers",
  "Moon Fox First Edition :: listing drift below 30d average",
  "Crystal Turtle Foil :: breakout printed on thin liquidity",
  "Ancient Flame Dragon :: heat spike detected, caution flag raised",
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
            className="text-xs uppercase tracking-[0.25em] text-emerald-300"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Terminal-native collectible card scanner
          </motion.p>
          <motion.h1
            className="mt-4 text-4xl font-semibold leading-tight text-emerald-100 sm:text-5xl"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            Boot the pet. Parse the market. Tag mispriced cards.
          </motion.h1>
          <motion.p
            className="mt-4 max-w-xl text-sm text-emerald-200/85 sm:text-base"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
          >
            SparkDex is a green-screen style AI market scout for collectible cards. It monitors listings,
            compares sold comps, and emits compact buy/hold/sell + risk signals with uncertainty included.
          </motion.p>
          <motion.div
            className="mt-6 inline-flex rounded-full border border-emerald-400/35 bg-emerald-400/10 px-4 py-2 text-xs text-emerald-200"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            No hype mode: if confidence is weak, SparkDex says “watch, don’t chase.”
          </motion.div>

          <motion.a
            href="https://x.com/PikachuPet1"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-md border border-emerald-400/45 bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.12em] text-emerald-100 transition hover:bg-emerald-500/20"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
          >
            Follow updates on X <ArrowUpRight className="h-3.5 w-3.5" />
          </motion.a>
        </div>

        <TerminalFrame title="sparkdex://green-console" rightSlot={<SparkMascot className="h-11 w-11" />}>
          <div className="space-y-3 font-mono text-sm text-emerald-100/95">
            {visibleCommands.map((line, index) => (
              <motion.p
                key={`${line}-${index}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className={index === activeLine ? "text-emerald-200" : "text-emerald-200/65"}
              >
                <span className="text-emerald-500">&gt;</span> {line}
                {index === activeLine ? <span className="ml-1 animate-pulse text-emerald-300">▋</span> : null}
              </motion.p>
            ))}

            <div className="mt-5 space-y-2 border-t border-emerald-950/70 pt-4 text-xs text-emerald-200/90">
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
