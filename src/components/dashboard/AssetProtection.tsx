import type { AnalysisResult } from "@/types/analysis";
import { ShieldCheck, Crosshair } from "lucide-react";

interface AssetProtectionProps {
  riskDisclosures: AnalysisResult["risk_disclosures"];
}

export function AssetProtection({ riskDisclosures }: AssetProtectionProps) {
  const severityOrder = { High: 0, Moderate: 1, Low: 2 } as const;
  const topRisk = [...riskDisclosures].sort(
    (a, b) => severityOrder[a.severity_index] - severityOrder[b.severity_index]
  )[0];

  return (
    <div className="border border-terminal-indigo/30 rounded-sm bg-terminal-indigo/5">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-terminal-indigo" />
          <p className="font-mono text-sm text-terminal-indigo font-bold tracking-wide">
            {">"} ASSET PROTECTION PROTOCOL
          </p>
        </div>

        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
          Based on the structural and mechanical liabilities detected above, this asset qualifies
          for third-party mechanical breakdown hedging. Transfer the repair risk to a corporate
          underwriter.
        </p>

        {topRisk && (
          <div className="flex items-center gap-2 font-mono text-xs text-terminal-indigo/80">
            <Crosshair className="w-3.5 h-3.5" />
            <span>HEDGE TARGET: {topRisk.component}</span>
          </div>
        )}

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-mono text-xs font-bold bg-terminal-indigo text-primary-foreground rounded-sm px-5 py-2.5 hover:bg-terminal-indigo/90 transition-colors"
        >
          [ CALCULATE PROTECTION PLAN ]
        </a>
      </div>
    </div>
  );
}
