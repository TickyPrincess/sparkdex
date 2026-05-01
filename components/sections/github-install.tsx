const installScript = `git clone https://github.com/your-org/sparkdex.git
cd sparkdex
npm install
cp .env.example .env.local
npm run dev`;

export function GithubInstallSection() {
  return (
    <div className="rounded-xl border border-emerald-950 bg-emerald-950/20 p-4">
      <p className="mb-2 text-xs uppercase tracking-[0.14em] text-emerald-300/65">Terminal install</p>
      <pre className="overflow-x-auto rounded-lg border border-emerald-950 bg-black/80 p-3 text-xs text-emerald-200">
        <code>{installScript}</code>
      </pre>
      <p className="mt-3 text-xs text-emerald-300/60">
        Keep provider secrets in <code>.env.local</code>. Never commit keys.
      </p>
    </div>
  );
}
