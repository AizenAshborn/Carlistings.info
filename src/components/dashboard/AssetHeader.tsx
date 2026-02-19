import type { AnalysisResult } from "@/types/analysis";
import { Badge } from "@/components/ui/badge";

export function AssetHeader({ result }: { result: AnalysisResult }) {
  if (!result) return null;

  const verdictStyle = {
    Undervalued: "bg-terminal-green/10 text-terminal-green border-terminal-green/30",
    "Fair Market": "bg-terminal-blue/10 text-terminal-blue border-terminal-blue/30",
    Overvalued: "bg-terminal-amber/10 text-terminal-amber border-terminal-amber/30",
    "Deceptive Pricing": "bg-destructive/10 text-destructive border-destructive/30",
  }[result.market_spread_verdict] ?? "";

  return (
    <div className="border border-border rounded-sm p-6 bg-card">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="font-mono text-[10px] text-muted-foreground tracking-widest mb-1">ASSET IDENTIFIER</p>
          <h2 className="font-mono text-xl font-bold text-foreground tracking-tight">
            {result.asset_identifier ?? "Unknown Asset"}
          </h2>
          <div className="flex gap-8 mt-4">
            <div>
              <p className="font-mono text-[10px] text-muted-foreground tracking-widest">ASKING PRICE</p>
              <p className="font-mono text-lg font-bold text-foreground">
                {result.asking_price != null ? `$${result.asking_price.toLocaleString()}` : "Price Unlisted"}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-muted-foreground tracking-widest">ODOMETER</p>
              <p className="font-mono text-lg font-bold text-foreground">
                {result.mileage_metric != null ? `${result.mileage_metric.toLocaleString()} km` : "Mileage Unlisted"}
              </p>
            </div>
          </div>
        </div>
        {result.market_spread_verdict && (
          <Badge variant="outline" className={`font-mono text-xs px-3 py-1.5 rounded-sm ${verdictStyle}`}>
            {result.market_spread_verdict.toUpperCase()}
          </Badge>
        )}
      </div>
    </div>
  );
}
