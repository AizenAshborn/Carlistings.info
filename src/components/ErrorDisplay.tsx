import type { AnalysisError } from "@/types/analysis";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorDisplayProps {
  error: AnalysisError;
  onRetry: () => void;
}

export function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  return (
    <div className="w-full max-w-lg mx-auto text-center space-y-6">
      <div className="border border-destructive/30 rounded-sm p-8 bg-destructive/5">
        <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-4" />
        <p className="font-mono text-sm text-destructive mb-2">
          {">"} PROCESSING ERROR — {error.code || "UNKNOWN"}
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          {error.error}
        </p>
        {error.code === "RATE_LIMITED" && error.reset_time && (
          <p className="font-mono text-xs text-muted-foreground mt-2">
            Resets at: {error.reset_time}
          </p>
        )}
      </div>
      <Button variant="outline" onClick={onRetry} className="font-mono text-xs">
        {">"} Scan New Listing
      </Button>
    </div>
  );
}
