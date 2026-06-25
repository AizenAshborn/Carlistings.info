import type { AnalysisResult } from "@/types/analysis";
import { UserX, AlertOctagon } from "lucide-react";

export function SellerRiskPanel({ result }: { result: AnalysisResult }) {
  const score = result.seller_risk_score ?? 0;
  const flags = result.seller_red_flags ?? [];

  if (score === 0 && flags.length === 0) return null;

  const getLevel = (s: number) => {
    if (s >= 70) return { label: "HIGH RISK SELLER", color: "text-destructive", border: "border-destructive/40", bg: "bg-destructive/5" };
    if (s >= 40) return { label: "MODERATE RISK", color: "text-terminal-amber", border: "border-terminal-amber/40", bg: "bg-terminal-amber/5" };
    return { label: "LOW RISK", color: "text-terminal-green", border: "border-terminal-green/40", bg: "bg-terminal-green/5" };
  };

  const level = getLevel(score);

  return (
    <div className={`border ${level.border} rounded-sm ${level.bg}`}>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserX className="w-4 h-4 text-muted-foreground" />
            <p className="font-mono text-[10px] text-muted-foreground tracking-widest">SELLER RISK DETECTION</p>
          </div>
          <div className={`font-mono text-xs font-bold px-3 py-1 rounded-sm ${level.color} border border-current/30`}>
            {score}/100 — {level.label}
          </div>
        </div>

        {flags.length > 0 && (
          <div className="space-y-2">
            <p className="font-mono text-[10px] text-muted-foreground tracking-widest">RED FLAGS DETECTED</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {flags.map((flag, i) => (
                <div key={i} className="flex items-start gap-2 font-mono text-xs text-foreground/80">
                  <AlertOctagon className="w-3 h-3 text-destructive shrink-0 mt-0.5" />
                  <span>{flag}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
