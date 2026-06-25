import type { AnalysisResult } from "@/types/analysis";
import { Badge } from "@/components/ui/badge";
import { Database, AlertTriangle } from "lucide-react";

export function KnownProblems({ result }: { result: AnalysisResult }) {
  const problems = result.known_problems ?? [];

  if (problems.length === 0) return null;

  const severityStyle = {
    Critical: "bg-destructive/10 text-destructive border-destructive/30",
    Major: "bg-terminal-amber/10 text-terminal-amber border-terminal-amber/30",
    Minor: "bg-terminal-blue/10 text-terminal-blue border-terminal-blue/30",
  };

  const frequencyStyle = {
    "Very Common": "text-destructive",
    Common: "text-terminal-amber",
    Uncommon: "text-muted-foreground",
    Rare: "text-muted-foreground/50",
  };

  return (
    <div className="border border-border rounded-sm p-6 bg-card">
      <div className="flex items-center gap-2 mb-4">
        <Database className="w-4 h-4 text-muted-foreground" />
        <p className="font-mono text-[10px] text-muted-foreground tracking-widest">
          KNOWN PROBLEMS — THIS GENERATION
        </p>
      </div>

      <div className="space-y-3">
        {problems.map((problem, i) => (
          <div key={i} className="border border-border rounded-sm p-4 bg-background">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <AlertTriangle className="w-3 h-3 text-muted-foreground shrink-0" />
                <p className="font-mono text-sm text-foreground font-medium truncate">{problem.issue}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="outline" className={`font-mono text-[10px] px-2 py-0.5 rounded-sm ${severityStyle[problem.severity]}`}>
                  {problem.severity.toUpperCase()}
                </Badge>
                <span className={`font-mono text-[10px] ${frequencyStyle[problem.frequency]}`}>
                  {problem.frequency}
                </span>
              </div>
            </div>
            <p className="font-mono text-xs font-bold text-destructive">
              {problem.typical_cost}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
