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
        <p className="font-mono text-[10px] text-muted-foreground tracking-widest">RISK DISCLOSURES</p>
      </div>
      <div className="space-y-3">
        {result.risk_disclosures.map((risk, i) => (
          <div key={i} className="border border-border rounded-sm p-4 bg-background">
            <div className="flex flex-col gap-2 mb-3">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={`font-mono text-[10px] px-2 py-0.5 rounded-sm shrink-0 ${severityStyle[risk.severity_index]}`}>
                  {risk.severity_index.toUpperCase()}
                </Badge>
                <p className="font-mono text-sm text-foreground font-medium">{risk.component}</p>
              </div>
              <p className="font-mono text-sm font-bold text-destructive break-words">
                {risk.estimated_repair_cost}
              </p>
            </div>
            <p className="font-sans text-xs text-muted-foreground leading-relaxed">
              {risk.technical_summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
