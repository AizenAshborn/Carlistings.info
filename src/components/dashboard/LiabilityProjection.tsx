import type { AnalysisResult } from "@/types/analysis";
import { DollarSign } from "lucide-react";

export function LiabilityProjection({ result }: { result: AnalysisResult }) {
  const liability = typeof result.projected_monthly_liability === "object"
    ? result.projected_monthly_liability
    : { total: result.projected_monthly_liability as unknown as number ?? 0, breakdown: "" };

  return (
    <div className="border border-border rounded-sm p-6 bg-card flex flex-col justify-between">
      <p className="font-mono text-[10px] text-muted-foreground tracking-widest mb-6">PROJECTED MONTHLY LIABILITY</p>
      <div className="flex items-end gap-2">
        <DollarSign className="w-6 h-6 text-terminal-amber mb-1" />
        <span className="font-mono text-5xl font-bold text-foreground tracking-tighter">
          {(liability.total ?? 0).toLocaleString()}
        </span>
        <span className="font-mono text-sm text-muted-foreground mb-2">/mo</span>
      </div>
      {liability.breakdown && (
        <p className="font-sans text-xs text-muted-foreground mt-4 leading-relaxed">
          {liability.breakdown}
        </p>
      )}
    </div>
  );
}
