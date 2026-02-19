import type { AnalysisResult } from "@/types/analysis";
import { DollarSign } from "lucide-react";

export function LiabilityProjection({ result }: { result: AnalysisResult }) {
  return (
    <div className="border border-border rounded-sm p-6 bg-card flex flex-col justify-between">
      <div>
        <p className="font-mono text-xs text-muted-foreground mb-1">PROJECTED MONTHLY LIABILITY</p>
        <p className="font-mono text-xs text-muted-foreground/60">Capital Expenditure Estimate</p>
      </div>
      <div className="flex items-end gap-2 mt-4">
        <DollarSign className="w-5 h-5 text-terminal-amber mb-1" />
        <span className="font-mono text-4xl font-bold text-foreground tracking-tighter">
          {result.projected_monthly_liability.toLocaleString()}
        </span>
        <span className="font-mono text-sm text-muted-foreground mb-1">/mo</span>
      </div>
    </div>
  );
}
