import type { AnalysisResult } from "@/types/analysis";
import { ShieldAlert, Radio } from "lucide-react";

interface SafeAssetRedirectProps {
  assetIdentifier: string;
  marketSpreadVerdict: AnalysisResult["market_spread_verdict"];
  riskDisclosures: AnalysisResult["risk_disclosures"];
}

export function SafeAssetRedirect({
  assetIdentifier,
  marketSpreadVerdict,
  riskDisclosures,
}: SafeAssetRedirectProps) {
  const hasHighRisk = riskDisclosures.some((r) => r.severity_index === "High");
  const isOvervalued = marketSpreadVerdict === "Overvalued";

  if (!hasHighRisk && !isOvervalued) return null;

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
          <span>STATUS: 3 Verified Assets Located.</span>
        </div>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-mono text-xs font-bold bg-primary text-primary-foreground rounded-sm px-5 py-2.5 hover:bg-primary/90 transition-colors"
        >
          [ VIEW VERIFIED ALTERNATIVES ]
        </a>
      </div>
    </div>
  );
}
