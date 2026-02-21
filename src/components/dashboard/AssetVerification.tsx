import { AlertTriangle } from "lucide-react";

export function AssetVerification() {
  return (
    <div className="border border-terminal-amber/50 rounded-sm bg-terminal-amber/5">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-terminal-amber" />
          <p className="font-mono text-sm text-terminal-amber font-bold tracking-wide">
            {">"} SYSTEM WARNING: VERIFY ASSET INTEGRITY
          </p>
        </div>

        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
          CLI has analyzed the visual market data, but physical asset integrity remains unverified.
          Hidden financial liabilities such as structural accidents, title washing, and odometer
          rollbacks cannot be detected via image parsing.
        </p>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-mono text-xs font-bold bg-terminal-amber text-primary-foreground rounded-sm px-5 py-2.5 hover:bg-terminal-amber/90 transition-colors"
        >
          [ RUN FULL VIN BACKGROUND CHECK ]
        </a>
      </div>
    </div>
  );
}
