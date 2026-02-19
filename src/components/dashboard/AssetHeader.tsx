import type { AnalysisResult } from "@/types/analysis";
import { Badge } from "@/components/ui/badge";

export function AssetHeader({ result }: { result: AnalysisResult }) {
  const verdictColor = {
    Undervalued: "bg-terminal-green/10 text-terminal-green border-terminal-green/30",
    "Fair Market": "bg-terminal-blue/10 text-terminal-blue border-terminal-blue/30",
    Overvalued: "bg-terminal-amber/10 text-terminal-amber border-terminal-amber/30",
    "Deceptive Pricing": "bg-destructive/10 text-destructive border-destructive/30",
  }[result.market_spread_verdict];

  return (
    <div className="border border-border rounded-sm p-6 bg-card">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="font-mono text-xs text-muted-foreground mb-1">ASSET IDENTIFIER</p>
          <h2 className="font-mono text-xl font-bold text-foreground tracking-tight">
            {result.asset_identifier}
          </h2>
          <div className="flex gap-6 mt-3 font-mono text-sm text-muted-foreground">
            <span>ASK: <span className="text-foreground">${result.asking_price.toLocaleString()}</span></span>
            <span>ODO: <span className="text-foreground">{result.mileage_metric.toLocaleString()} km</span></span>
          </div>
        </div>
        <Badge variant="outline" className={`font-mono text-xs px-3 py-1 rounded-sm ${verdictColor}`}>
          {result.market_spread_verdict.toUpperCase()}
        </Badge>
      </div>
    </div>
  );
}
