import { ReactNode } from "react";

interface SectionShellProps {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function SectionShell({ id, eyebrow, title, subtitle, children }: SectionShellProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-6 sm:mb-8">
        <p className="text-xs uppercase tracking-[0.24em] text-lime-300/90">{eyebrow}</p>
        <h2 className="mt-3 text-2xl font-semibold text-zinc-100 sm:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-3 max-w-3xl text-sm text-zinc-400 sm:text-base">{subtitle}</p> : null}
      </header>
      {children}
    </section>
  );
}
