import type { AnalysisResult } from "@/types/analysis";
import { DollarSign } from "lucide-react";

export function LiabilityProjection({ result }: { result: AnalysisResult }) {
  if (!result) return null;

  const totalLiability = result?.projected_monthly_liability?.total
    ?? (typeof result?.projected_monthly_liability === "number" ? (result.projected_monthly_liability as unknown as number) : 0);
  const liabilityBreakdown = result?.projected_monthly_liability?.breakdown ?? "Awaiting breakdown details.";

  return (
    <div className="border border-border rounded-sm p-6 bg-card flex flex-col justify-between">
      <p className="font-mono text-[10px] text-muted-foreground tracking-widest mb-6">PROJECTED MONTHLY LIABILITY</p>
      <div className="flex items-end gap-2">
        <DollarSign className="w-6 h-6 text-terminal-amber mb-1" />
        <span className="font-mono text-5xl font-bold text-foreground tracking-tighter">
          {totalLiability != null ? totalLiability.toLocaleString() : "0"}
        </span>
        <span className="font-mono text-sm text-muted-foreground mb-2">/mo</span>
      </div>
      <p className="font-sans text-xs text-muted-foreground mt-4 leading-relaxed">
        {liabilityBreakdown}
      </p>
    </div>
  );
}
