import type { AnalysisResult } from "@/types/analysis";
import { MessageSquare } from "lucide-react";

export function AuditorNote({ result }: { result: AnalysisResult }) {
  return (
    <div className="border-2 border-terminal-blue/40 rounded-sm p-6 bg-terminal-blue/5">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-terminal-blue" />
        <p className="font-mono text-[10px] text-terminal-blue tracking-widest">AUDITOR NOTE — ACTION REQUIRED</p>
      </div>
      <p className="font-sans text-sm text-foreground leading-relaxed">
        "{result.auditor_note}"
      </p>
    </div>
  );
}
