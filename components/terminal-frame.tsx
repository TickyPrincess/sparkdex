import { ReactNode } from "react";

interface TerminalFrameProps {
  title: string;
  children: ReactNode;
  rightSlot?: ReactNode;
}

export function TerminalFrame({ title, children, rightSlot }: TerminalFrameProps) {
  return (
    <div className="terminal-glow relative overflow-hidden rounded-2xl border border-emerald-900/70 bg-[#030904]/90 shadow-2xl shadow-black/45">
      <div className="flex items-center justify-between border-b border-emerald-950/90 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-700/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/90" />
          <p className="ml-2 text-xs uppercase tracking-[0.14em] text-emerald-300/65">{title}</p>
        </div>
        {rightSlot}
      </div>
      <div className="scanline-overlay relative p-4 sm:p-5">{children}</div>
    </div>
  );
}
