import type { AnalysisResult } from "@/types/analysis";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

export function RiskDisclosures({ result }: { result: AnalysisResult }) {
  const severityStyle = {
    High: "bg-destructive/10 text-destructive border-destructive/30",
    Moderate: "bg-terminal-amber/10 text-terminal-amber border-terminal-amber/30",
    Low: "bg-terminal-green/10 text-terminal-green border-terminal-green/30",
  };

  return (
    <div className="border border-border rounded-sm p-6 bg-card">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-4 h-4 text-muted-foreground" />
        <p className="font-mono text-xs text-muted-foreground">RISK DISCLOSURES</p>
      </div>
      <div className="space-y-3">
        {result.risk_disclosures.map((risk, i) => (
          <div key={i} className="flex items-start gap-3 p-3 border border-border rounded-sm bg-background">
            <Badge variant="outline" className={`font-mono text-[10px] px-2 py-0.5 rounded-sm shrink-0 ${severityStyle[risk.severity_index]}`}>
              {risk.severity_index.toUpperCase()}
            </Badge>
            <div>
              <p className="font-mono text-sm text-foreground font-medium">{risk.component}</p>
              <p className="font-mono text-xs text-muted-foreground mt-1">{risk.technical_summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
