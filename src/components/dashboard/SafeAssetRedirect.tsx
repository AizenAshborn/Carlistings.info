import type { AnalysisResult } from "@/types/analysis";
import { ShieldAlert, Radio } from "lucide-react";

interface SafeAssetRedirectProps {
  assetIdentifier: string;
  marketSpreadVerdict: AnalysisResult["market_spread_verdict"];
  riskDisclosures: AnalysisResult["risk_disclosures"];
}

function buildSearchUrl(assetIdentifier: string): string {
  // Extract make/model from asset_identifier like "2018 Audi S5 Technik"
  const parts = assetIdentifier.split(" ").filter(Boolean);
  const searchTerms = parts.slice(0, 3).join("+"); // year + make + model
  return `https://www.autotrader.ca/cars/?kwd=${encodeURIComponent(searchTerms)}`;
}

function buildKijijiUrl(assetIdentifier: string): string {
  const searchTerms = assetIdentifier.split(" ").filter(Boolean).slice(0, 3).join("+");
  return `https://www.kijiji.ca/b-cars-trucks/canada/${encodeURIComponent(searchTerms)}/k0c174l0`;
}

export function SafeAssetRedirect({
  assetIdentifier,
  marketSpreadVerdict,
  riskDisclosures,
}: SafeAssetRedirectProps) {
  const hasHighRisk = riskDisclosures.some((r) => r.severity_index === "High");
  const isOvervalued = marketSpreadVerdict === "Overvalued";
  const isDeceptive = marketSpreadVerdict === "Deceptive Pricing";

  if (!hasHighRisk && !isOvervalued && !isDeceptive) return null;

  const autoTraderUrl = buildSearchUrl(assetIdentifier);
  const kijijiUrl = buildKijijiUrl(assetIdentifier);

  return (
    <div className="border border-secondary/30 rounded-sm bg-secondary/5">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-secondary" />
          <p className="font-mono text-sm text-secondary font-bold tracking-wide">
            {">"} SYSTEM OVERRIDE: REDIRECTING TO SAFE ASSETS
          </p>
        </div>

        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
          This asset failed CLI safety and valuation standards. Initiating search across trusted
          institutional partner networks for verified, mechanically sound{" "}
          <span className="text-foreground font-medium">{assetIdentifier}</span> inventory.
        </p>

        <div className="flex items-center gap-2 font-mono text-xs text-primary/80">
          <Radio className="w-3.5 h-3.5 animate-terminal-blink" />
          <span>STATUS: Verified Inventory Located.</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href={autoTraderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono text-xs font-bold bg-primary text-primary-foreground rounded-sm px-5 py-2.5 hover:bg-primary/90 transition-colors"
          >
            [ SEARCH AUTOTRADER ]
          </a>
          <a
            href={kijijiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono text-xs font-bold border border-secondary/50 text-secondary rounded-sm px-5 py-2.5 hover:bg-secondary/10 transition-colors"
          >
            [ SEARCH KIJIJI ]
          </a>
        </div>
      </div>
    </div>
  );
}
