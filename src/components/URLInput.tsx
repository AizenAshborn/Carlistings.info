import { useState } from "react";
import { Link2, ArrowRight } from "lucide-react";

interface URLInputProps {
  onUrlSubmitted: (url: string) => void;
  disabled?: boolean;
}

const SUPPORTED_PLATFORMS = [
  "Facebook Marketplace",
  "AutoTrader",
  "Kijiji",
  "Craigslist",
  "Cars.com",
  "CarGurus",
];

export function URLInput({ onUrlSubmitted, disabled }: URLInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    setError(null);
    const trimmed = url.trim();
    if (!trimmed) {
      setError("URL_REQUIRED — Paste a listing URL to analyze.");
      return;
    }
    try {
      new URL(trimmed);
    } catch {
      setError("INVALID_URL — Must be a valid URL starting with http:// or https://");
      return;
    }
    onUrlSubmitted(trimmed);
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      <div className="border border-border rounded-sm p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Link2 className="w-4 h-4 text-terminal-blue" />
          <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
            LISTING URL
          </span>
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="https://www.facebook.com/marketplace/item/..."
          disabled={disabled}
          className="w-full bg-muted border border-border rounded-sm px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-terminal-blue disabled:opacity-50"
        />
        <p className="font-mono text-[10px] text-muted-foreground/50">
          {SUPPORTED_PLATFORMS.join(" · ")}
        </p>
        <button
          onClick={handleSubmit}
          disabled={disabled || !url.trim()}
          className="w-full font-mono text-xs font-bold bg-terminal-blue text-white rounded-sm px-5 py-3 hover:bg-terminal-blue/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          [ ANALYZE LISTING ]
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
      {error && (
        <p className="font-mono text-xs text-destructive text-center">
          {">"} {error}
        </p>
      )}
    </div>
  );
}
