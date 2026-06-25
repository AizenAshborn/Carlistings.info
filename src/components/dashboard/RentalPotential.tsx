import type { AnalysisResult } from "@/types/analysis";
import { Car, TrendingUp, ExternalLink } from "lucide-react";

export function RentalPotential({ result }: { result: AnalysisResult }) {
  const rental = result.rental_potential;

  if (!rental) return null;

  const viabilityStyle = {
    Excellent: { color: "text-terminal-green", border: "border-terminal-green/40", bg: "bg-terminal-green/5", badge: "bg-terminal-green/10 border-terminal-green/30" },
    Good: { color: "text-terminal-blue", border: "border-terminal-blue/40", bg: "bg-terminal-blue/5", badge: "bg-terminal-blue/10 border-terminal-blue/30" },
    Marginal: { color: "text-terminal-amber", border: "border-terminal-amber/40", bg: "bg-terminal-amber/5", badge: "bg-terminal-amber/10 border-terminal-amber/30" },
    "Not Recommended": { color: "text-destructive", border: "border-destructive/40", bg: "bg-destructive/5", badge: "bg-destructive/10 border-destructive/30" },
  };

  const style = viabilityStyle[rental.viability] ?? viabilityStyle["Marginal"];

  const askingPrice = result.asking_price ?? 0;
  const roi = askingPrice > 0 ? ((rental.annual_revenue / askingPrice) * 100).toFixed(1) : "N/A";

  return (
    <div className={`border ${style.border} rounded-sm ${style.bg}`}>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-muted-foreground" />
            <p className="font-mono text-[10px] text-muted-foreground tracking-widest">RENTAL INCOME POTENTIAL</p>
          </div>
          <span className={`font-mono text-[10px] font-bold px-2 py-1 rounded-sm ${style.color} border ${style.badge}`}>
            {rental.viability.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="font-mono text-[10px] text-muted-foreground tracking-widest">DAILY</p>
            <p className="font-mono text-lg font-bold text-foreground">${rental.daily_rate}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] text-muted-foreground tracking-widest">MONTHLY</p>
            <p className="font-mono text-lg font-bold text-foreground">${rental.monthly_rate.toLocaleString()}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] text-muted-foreground tracking-widest">ANNUAL REV</p>
            <p className="font-mono text-lg font-bold text-foreground">${rental.annual_revenue.toLocaleString()}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] text-muted-foreground tracking-widest">ROI</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-terminal-green" />
              <p className="font-mono text-lg font-bold text-terminal-green">{roi}%</p>
            </div>
          </div>
        </div>

        {rental.platform_recommendation && (
          <p className="font-sans text-xs text-muted-foreground leading-relaxed">
            {rental.platform_recommendation}
          </p>
        )}

        <a
          href="https://turo.com/list-your-car"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold text-terminal-green border border-terminal-green/50 rounded-sm px-4 py-2 hover:bg-terminal-green/10 transition-colors"
        >
          [ LIST ON TURO ]
          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
        </a>
      </div>
    </div>
  );
}
