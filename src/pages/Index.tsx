import { useState } from "react";
import { UploadZone } from "@/components/UploadZone";
import { ProcessingAnimation } from "@/components/ProcessingAnimation";
import { ResultsDashboard } from "@/components/ResultsDashboard";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { useAnalysis } from "@/hooks/useAnalysis";

const Index = () => {
  const { state, result, error, analyze, reset } = useAnalysis();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-foreground tracking-tight">
              CarListings<span className="text-primary">.info</span>
            </span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground hidden sm:block tracking-widest">
            AUTOMOTIVE RISK INTELLIGENCE
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-start justify-center px-6 py-12">
        {state === "upload" && (
          <div className="text-center space-y-8 mt-24">
            <div>
              <h1 className="font-mono text-lg font-bold text-foreground mb-2">
                {">"} Upload Asset Listing (Screenshot)
              </h1>
              <p className="font-mono text-xs text-muted-foreground">
                Facebook Marketplace · AutoTrader · Kijiji · Any platform
              </p>
            </div>
            <UploadZone onFileSelected={analyze} />
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
            CLI v1.0
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            3 FREE SCANS / 24H
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
