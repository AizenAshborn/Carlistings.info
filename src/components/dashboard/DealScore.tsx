import type { AnalysisResult } from "@/types/analysis";
import { Target } from "lucide-react";

export function DealScore({ result }: { result: AnalysisResult }) {
  const score = result.deal_score ?? 50;
  const breakdown = result.deal_score_breakdown ?? "Score based on market spread, mileage, risk factors, and listing context.";

  const getLabel = (s: number) => {
    if (s >= 81) return "STEAL";
    if (s >= 61) return "GOOD DEAL";
    if (s >= 41) return "FAIR DEAL";
    if (s >= 21) return "BAD DEAL";
    return "TERRIBLE DEAL";
  };

  const getColor = (s: number) => {
    if (s >= 81) return { stroke: "hsl(145, 100%, 50%)", text: "text-terminal-green", bg: "bg-terminal-green" };
    if (s >= 61) return { stroke: "hsl(145, 80%, 45%)", text: "text-terminal-green", bg: "bg-terminal-green" };
    if (s >= 41) return { stroke: "hsl(38, 100%, 50%)", text: "text-terminal-amber", bg: "bg-terminal-amber" };
    if (s >= 21) return { stroke: "hsl(345, 100%, 60%)", text: "text-destructive", bg: "bg-destructive" };
    return { stroke: "hsl(345, 100%, 45%)", text: "text-destructive", bg: "bg-destructive" };
  };

  const label = getLabel(score);
  const colors = getColor(score);

  // SVG arc calculation
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const arcLength = (score / 100) * circumference * 0.75; // 270-degree arc
  const dashOffset = circumference * 0.75 - arcLength;

  return (
    <div className="border border-border rounded-sm p-6 bg-card">
      <div className="flex items-center gap-2 mb-6">
        <Target className="w-4 h-4 text-muted-foreground" />
        <p className="font-mono text-[10px] text-muted-foreground tracking-widest">DEAL SCORE</p>
      </div>

      <div className="flex items-center gap-8">
        {/* Radial Gauge */}
        <div className="relative w-44 h-44 shrink-0">
          <svg viewBox="0 0 180 180" className="w-full h-full -rotate-[135deg]">
            {/* Background arc */}
            <circle
              cx="90" cy="90" r={radius}
              fill="none"
              stroke="hsl(240, 4%, 16%)"
              strokeWidth="10"
              strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
              strokeLinecap="round"
            />
            {/* Score arc */}
            <circle
              cx="90" cy="90" r={radius}
              fill="none"
              stroke={colors.stroke}
              strokeWidth="10"
              strokeDasharray={`${arcLength} ${circumference - arcLength}`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`font-mono text-4xl font-bold ${colors.text}`}>
              {score}
            </span>
            <span className="font-mono text-[9px] text-muted-foreground tracking-widest mt-1">
              / 100
            </span>
          </div>
        </div>

        {/* Label + Breakdown */}
        <div className="flex-1 min-w-0 space-y-3">
          <div className={`inline-block font-mono text-xs font-bold px-3 py-1.5 rounded-sm ${colors.bg}/10 ${colors.text} border border-current/30`}>
            {label}
          </div>
          <p className="font-sans text-xs text-muted-foreground leading-relaxed">
            {breakdown}
          </p>
        </div>
      </div>
    </div>
  );
}
