"use client";

import { motion } from "framer-motion";

interface MascotProps {
  evolution?: number;
  className?: string;
}

const frames = [
  { body: "#E9FF52", glow: "#D7FF00", eye: "#0B0D12", spark: "#91E5FF" },
  { body: "#F0FF66", glow: "#CEFF22", eye: "#08101F", spark: "#9ADFFF" },
  { body: "#FFF07A", glow: "#F9FF2B", eye: "#0C1228", spark: "#B9EBFF" },
] as const;

export function SparkMascot({ evolution = 0, className }: MascotProps) {
  const form = frames[Math.min(2, Math.floor(evolution / 2))];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <motion.svg
        width="84"
        height="84"
        viewBox="0 0 84 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ y: [0, -2, 0], rotate: [0, 0.8, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.2, ease: "easeInOut" }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="22" y="24" width="40" height="34" rx="6" fill={form.body} filter="url(#glow)" />
        <rect x="32" y="34" width="6" height="6" rx="1" fill={form.eye} />
        <rect x="46" y="34" width="6" height="6" rx="1" fill={form.eye} />
        <rect x="37" y="45" width="10" height="4" rx="1" fill={form.eye} />

        <rect x="16" y="18" width="10" height="12" rx="2" fill={form.glow} />
        <rect x="58" y="18" width="10" height="12" rx="2" fill={form.glow} />

        <rect x="24" y="58" width="8" height="8" rx="2" fill={form.glow} />
        <rect x="52" y="58" width="8" height="8" rx="2" fill={form.glow} />

        <motion.path
          d="M42 8L48 20H40L46 32"
          stroke={form.spark}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ opacity: [0.35, 1, 0.35], y: [0, -1, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.2 }}
        />
      </motion.svg>
    </motion.div>
  );
}
