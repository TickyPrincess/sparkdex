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
        eyebrow="Live Demo Terminal"
        title="Click commands. Watch SparkDex answer like a real market scout."
        subtitle="Short, useful, risk-aware output — no fake certainty, no overhype."
      >
        <LiveDemoTerminal signals={signals} />
      </SectionShell>

      <SectionShell
        id="signals"
        eyebrow="Market Signal Cards"
        title="Price, liquidity, confidence, and signal state in one board."
        subtitle="Structured mock data today, adapter-ready for real providers tomorrow."
      >
        <MarketSignals signals={signals} />
      </SectionShell>

      <SectionShell
        id="watchlist"
        eyebrow="Watchlist"
        title="Track the cards you care about, with alert context and pet commentary."
      >
        <WatchlistSection items={watchlist} />
      </SectionShell>

      <SectionShell
        id="engine"
        eyebrow="Signal Engine"
        title="How SparkDex thinks before calling a buy, hold, sell, or watch."
      >
        <SignalEngineSection />
      </SectionShell>

      <SectionShell
        id="codex"
        eyebrow="Codex Pet Integration"
        title="Run SparkDex as your terminal companion inside Codex."
        subtitle="Use the hatch command, then paste the full personality prompt as your base behavior profile."
      >
        <CodexPetSection />
      </SectionShell>

      <SectionShell
        id="install"
        eyebrow="GitHub Installation"
        title="Clone, install, configure env, and boot the dev server."
      >
        <GithubInstallSection />
      </SectionShell>

      <SectionShell
        id="providers"
        eyebrow="Data Providers"
        title="Mock by default. Adapter architecture for real market data."
      >
        <DataProvidersSection />
      </SectionShell>

      <SectionShell
        id="safety"
        eyebrow="Risk"
        title="Always treat signals as probabilistic market research."
      >
        <RiskDisclaimerSection />
      </SectionShell>

      <FooterSection />
    </main>
  );
}
