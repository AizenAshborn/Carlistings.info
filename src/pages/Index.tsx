import { useState, useEffect } from "react";
import { UploadZone } from "@/components/UploadZone";
import { URLInput } from "@/components/URLInput";
import { VINInput } from "@/components/VINInput";
import { ProcessingAnimation } from "@/components/ProcessingAnimation";
import { ResultsDashboard } from "@/components/ResultsDashboard";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { useAnalysis } from "@/hooks/useAnalysis";
import type { InputMode } from "@/types/analysis";
import { Camera, Link2, Hash } from "lucide-react";

const MAX_FREE_SCANS = 3;
const STORAGE_KEY = "cli_scan_count";
const STORAGE_RESET_KEY = "cli_scan_reset";

function getScanCount(): number {
  try {
    const reset = localStorage.getItem(STORAGE_RESET_KEY);
    if (reset && Date.now() > parseInt(reset)) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_RESET_KEY);
      return 0;
    }
    return parseInt(localStorage.getItem(STORAGE_KEY) ?? "0") || 0;
  } catch {
    return 0;
  }
}

function incrementScanCount() {
  try {
    const current = getScanCount();
    localStorage.setItem(STORAGE_KEY, String(current + 1));
    if (!localStorage.getItem(STORAGE_RESET_KEY)) {
      localStorage.setItem(STORAGE_RESET_KEY, String(Date.now() + 24 * 60 * 60 * 1000));
    }
  } catch {}
}

const INPUT_TABS: { mode: InputMode; label: string; icon: typeof Camera }[] = [
  { mode: "screenshot", label: "Screenshot", icon: Camera },
  { mode: "url", label: "URL", icon: Link2 },
  { mode: "vin", label: "VIN", icon: Hash },
];

const Index = () => {
  const { state, result, error, analyze, analyzeUrl, analyzeVin, reset } = useAnalysis();
  const [scanCount, setScanCount] = useState(getScanCount);
  const [inputMode, setInputMode] = useState<InputMode>("screenshot");

  const scansRemaining = Math.max(0, MAX_FREE_SCANS - scanCount);
  const isLimitReached = scansRemaining === 0;

  const handleAnalyzeScreenshot = (file: File) => {
    if (isLimitReached) return;
    incrementScanCount();
    setScanCount((c) => c + 1);
    analyze(file);
  };

  const handleAnalyzeUrl = (url: string) => {
    if (isLimitReached) return;
    incrementScanCount();
    setScanCount((c) => c + 1);
    analyzeUrl(url);
  };

  const handleAnalyzeVin = (vin: string) => {
    if (isLimitReached) return;
    incrementScanCount();
    setScanCount((c) => c + 1);
    analyzeVin(vin);
  };

  // Sync scan count from error responses (server-side rate limiting)
  useEffect(() => {
    if (error?.code === "RATE_LIMITED") {
      setScanCount(MAX_FREE_SCANS);
      localStorage.setItem(STORAGE_KEY, String(MAX_FREE_SCANS));
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="CarListings.info Logo" className="h-8 w-auto select-none" />
          </div>
          <span className="font-mono text-[10px] text-muted-foreground hidden sm:block tracking-widest">
            AUTOMOTIVE RISK INTELLIGENCE
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-start justify-center px-6 py-12">
        {state === "upload" && (
          <div className="text-center space-y-8 mt-16 w-full max-w-lg">
            <div>
              <h1 className="font-mono text-lg font-bold text-foreground mb-2">
                {">"} Analyze Any Vehicle Listing
              </h1>
              <p className="font-mono text-xs text-muted-foreground">
                Facebook Marketplace · AutoTrader · Kijiji · Any platform
              </p>
            </div>

            {isLimitReached ? (
              <div className="border border-destructive/40 rounded-sm bg-destructive/5 p-8 max-w-md mx-auto space-y-4">
                <p className="font-mono text-sm text-destructive">
                  {">"} SCAN LIMIT REACHED — 3/3 USED
                </p>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                  You've used all 3 free scans for today. Upgrade to Inspector for 30 scans/day, or wait 24 hours for your limit to reset.
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="mailto:hello@carlistings.info?subject=Inspector%20Plan%20Upgrade"
                    className="font-mono text-xs font-bold bg-primary text-primary-foreground rounded-sm px-5 py-2.5 hover:bg-primary/90 transition-colors"
                  >
                    [ UPGRADE TO INSPECTOR — $9/MO ]
                  </a>
                  <p className="font-mono text-[9px] text-muted-foreground">
                    30 scans/day · PDF export · Scan history
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Input Mode Tabs */}
                <div className="flex items-center justify-center gap-1 border border-border rounded-sm p-1 mx-auto w-fit">
                  {INPUT_TABS.map(({ mode, label, icon: Icon }) => (
                    <button
                      key={mode}
                      onClick={() => setInputMode(mode)}
                      className={`flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-sm transition-colors ${
                        inputMode === mode
                          ? "bg-primary text-primary-foreground font-bold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </button>
                  ))}
                </div>

                {/* Input Area */}
                {inputMode === "screenshot" && (
                  <UploadZone onFileSelected={handleAnalyzeScreenshot} />
                )}
                {inputMode === "url" && (
                  <URLInput onUrlSubmitted={handleAnalyzeUrl} />
                )}
                {inputMode === "vin" && (
                  <VINInput onVinSubmitted={handleAnalyzeVin} />
                )}
              </>
            )}
          </div>
        )}

        {state === "processing" && (
          <div className="text-center space-y-8 mt-24">
            <p className="font-mono text-xs text-muted-foreground tracking-widest">ANALYZING ASSET...</p>
            <ProcessingAnimation />
          </div>
        )}

        {state === "results" && result && (
          <ResultsDashboard result={result} onReset={reset} />
        )}

        {state === "error" && error && (
          <ErrorDisplay error={error} onRetry={reset} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="font-mono text-[10px] text-muted-foreground">
            CLI v2.0
          </span>
          <span
            className={`font-mono text-[10px] ${
              isLimitReached
                ? "text-destructive"
                : scansRemaining === 1
                ? "text-yellow-500"
                : "text-muted-foreground"
            }`}
          >
            {isLimitReached
              ? "⚠ LIMIT REACHED — UPGRADE"
              : `${scansRemaining} FREE SCAN${scansRemaining !== 1 ? "S" : ""} REMAINING / 24H`}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
