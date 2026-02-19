import type { AnalysisResult } from "@/types/analysis";
import { AlertTriangle } from "lucide-react";

export function AnalystSynthesis({ result }: { result: AnalysisResult }) {
  return (
    <div className="border border-border rounded-sm p-6 bg-muted/30">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-4 h-4 text-terminal-amber" />
        <p className="font-mono text-[10px] text-muted-foreground tracking-widest">SYSTEM SYNTHESIS</p>
      </div>
      <p className="font-sans text-sm text-foreground leading-relaxed">
        {result.analyst_synthesis}
      </p>
    </div>
  );
}
