import { FooterSection } from "@/components/sections/footer";
import { GithubInstallSection } from "@/components/sections/github-install";
import { HeroSection } from "@/components/sections/hero";
import { LiveDemoTerminal } from "@/components/sections/live-demo-terminal";
import { MarketSignals } from "@/components/sections/market-signals";
import { MarketTicker } from "@/components/sections/market-ticker";
import { WatchlistSection } from "@/components/sections/watchlist";
import { SignalEngineSection } from "@/components/sections/signal-engine";
import { CodexPetSection } from "@/components/sections/codex-pet";
import { DataProvidersSection } from "@/components/sections/data-providers";
import { RiskDisclaimerSection } from "@/components/sections/risk-disclaimer";
import { SectionShell } from "@/components/ui/section-shell";
import { getSignals, getWatchlistSignals } from "@/lib/signal-engine";

export default function HomePage() {
  const signals = getSignals();
  const watchlist = getWatchlistSignals();

  return (
    <main className="relative overflow-x-hidden pb-8">
      <HeroSection />
      <MarketTicker signals={signals} />

      <SectionShell
        id="demo"
        eyebrow="Command Console"
        title="Run commands. Get crisp signals. Skip the noise."
        subtitle="SparkDex speaks like a trading terminal: short output, clear risk, zero fantasy alpha."
      >
        <LiveDemoTerminal signals={signals} />
      </SectionShell>

      <SectionShell
        id="signals"
        eyebrow="Signal Board"
        title="Every card line includes price, pressure, confidence, and risk context."
        subtitle="Mock feed by default. Provider adapters ready when you wire real market data."
      >
        <MarketSignals signals={signals} />
      </SectionShell>

      <SectionShell
        id="watchlist"
        eyebrow="Watchlist Feed"
        title="Keep targets hot. Get alerts before the market shifts too far."
      >
        <WatchlistSection items={watchlist} />
      </SectionShell>

      <SectionShell
        id="engine"
        eyebrow="Signal Engine"
        title="How SparkDex scores opportunities before saying buy, hold, sell, or watch."
      >
        <SignalEngineSection />
      </SectionShell>

      <SectionShell
        id="codex"
        eyebrow="Codex Integration"
        title="Drop SparkDex into Codex as a terminal companion."
        subtitle="Use hatch command, paste the personality prompt, and run market scans in chat."
      >
        <CodexPetSection />
      </SectionShell>

      <SectionShell
        id="install"
        eyebrow="GitHub Install"
        title="Clone. Install. Configure env. Boot."
      >
        <GithubInstallSection />
      </SectionShell>

      <SectionShell
        id="providers"
        eyebrow="Providers"
        title="Adapter-first data layer: mock now, real feeds later."
      >
        <DataProvidersSection />
      </SectionShell>

      <SectionShell
        id="safety"
        eyebrow="Risk Notice"
        title="Treat every signal as probabilistic research, never guaranteed outcome."
      >
        <RiskDisclaimerSection />
      </SectionShell>

      <FooterSection />
    </main>
  );
}
