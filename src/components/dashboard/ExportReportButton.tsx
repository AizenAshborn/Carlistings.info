import { Printer } from "lucide-react";

export function ExportReportButton() {
  return (
    <button
      onClick={() => window.print()}
      className="print:hidden inline-flex items-center gap-2 font-mono text-sm text-muted-foreground border border-border rounded-sm px-4 py-2 bg-transparent hover:bg-muted hover:text-foreground transition-colors"
    >
      <Printer className="w-3.5 h-3.5" />
      [ EXPORT .INFO REPORT ]
    </button>
  );
}
