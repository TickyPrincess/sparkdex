const installScript = `git clone https://github.com/your-org/sparkdex.git
cd sparkdex
npm install
cp .env.example .env.local
npm run dev`;

export function GithubInstallSection() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
      <p className="mb-2 text-xs uppercase tracking-[0.14em] text-zinc-500">Terminal install</p>
      <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-black/80 p-3 text-xs text-lime-200">
        <code>{installScript}</code>
      </pre>
      <p className="mt-3 text-xs text-zinc-500">
        Keep provider secrets in <code>.env.local</code>. Never commit keys.
      </p>
    </div>
  );
}
