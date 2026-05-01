"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { codexPetPrompt, hatchCommand } from "@/lib/codex-prompt";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300 transition hover:border-lime-300/40 hover:text-lime-200"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function CodexPetSection() {
  return (
    <div className="space-y-4">
      <article className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Hatch command</p>
          <CopyButton value={hatchCommand} />
        </div>
        <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-black/70 p-3 text-xs text-lime-200">
          <code>{hatchCommand}</code>
        </pre>
      </article>

      <article className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Full pet personality prompt</p>
          <CopyButton value={codexPetPrompt} />
        </div>
        <pre className="max-h-[380px] overflow-auto rounded-lg border border-zinc-800 bg-black/70 p-3 text-xs text-zinc-200">
          <code>{codexPetPrompt}</code>
        </pre>
      </article>
    </div>
  );
}
