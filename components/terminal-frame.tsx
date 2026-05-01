import { ReactNode } from "react";

interface TerminalFrameProps {
  title: string;
  children: ReactNode;
  rightSlot?: ReactNode;
}

export function TerminalFrame({ title, children, rightSlot }: TerminalFrameProps) {
  return (
    <div className="terminal-glow relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/80 shadow-2xl shadow-black/35">
      <div className="flex items-center justify-between border-b border-zinc-800/90 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-lime-300/70" />
          <p className="ml-2 text-xs uppercase tracking-[0.14em] text-zinc-400">{title}</p>
        </div>
        {rightSlot}
      </div>
      <div className="scanline-overlay relative p-4 sm:p-5">{children}</div>
    </div>
  );
}
