import { listProviders } from "@/lib/providers";

export function DataProvidersSection() {
  const providers = listProviders();

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-300">
        SparkDex ships with a mock provider by default. Real integrations plug in through adapters, so you
        can swap data sources without rewriting the signal engine.
      </p>

      <div className="grid gap-3 md:grid-cols-2">
        {providers.map((provider) => (
          <article
            key={provider.id}
            className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 text-sm text-zinc-300"
          >
            <p className="font-medium text-zinc-100">{provider.label}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-zinc-500">ID: {provider.id}</p>
            <p className="mt-2 text-xs text-zinc-400">
              {provider.isMock
                ? "Demo-ready adapter with local JSON fixtures."
                : "Scaffolded adapter. Add API client, mapping, and auth in env vars."}
            </p>
            {provider.docsUrl ? (
              <a
                href={provider.docsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex text-xs text-sky-200 underline decoration-dotted underline-offset-4"
              >
                Provider docs
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
