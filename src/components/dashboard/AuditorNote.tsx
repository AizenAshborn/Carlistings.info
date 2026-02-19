import type { AnalysisResult } from "@/types/analysis";
import { MessageSquare } from "lucide-react";

export function AuditorNote({ result }: { result: AnalysisResult }) {
  return (
    <div className="border border-terminal-blue/30 rounded-sm p-6 bg-terminal-blue/5">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-terminal-blue" />
        <p className="font-mono text-xs text-terminal-blue">AUDITOR NOTE</p>
      </div>
      <p className="font-mono text-sm text-foreground leading-relaxed">
        "{result.auditor_note}"
      </p>
    </div>
  );
}
