import { useState } from "react";
import { Hash, ArrowRight } from "lucide-react";

interface VINInputProps {
  onVinSubmitted: (vin: string) => void;
  disabled?: boolean;
}

const VIN_REGEX = /^[A-HJ-NPR-Z0-9]{17}$/i;

export function VINInput({ onVinSubmitted, disabled }: VINInputProps) {
  const [vin, setVin] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (value: string) => {
    // Auto-uppercase, strip spaces/dashes
    const cleaned = value.replace(/[\s-]/g, "").toUpperCase().slice(0, 17);
    setVin(cleaned);
    setError(null);
  };

  const handleSubmit = () => {
    setError(null);
    const trimmed = vin.trim().toUpperCase();
    if (!trimmed) {
      setError("VIN_REQUIRED — Enter a 17-character Vehicle Identification Number.");
      return;
    }
    if (trimmed.length !== 17) {
      setError(`VIN_INCOMPLETE — ${trimmed.length}/17 characters entered.`);
      return;
    }
    if (!VIN_REGEX.test(trimmed)) {
      setError("VIN_INVALID — Contains invalid characters (I, O, Q not allowed).");
      return;
    }
    onVinSubmitted(trimmed);
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      <div className="border border-border rounded-sm p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Hash className="w-4 h-4 text-terminal-green" />
          <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
            VEHICLE IDENTIFICATION NUMBER
          </span>
        </div>
        <input
          type="text"
          value={vin}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="1HGBH41JXMN109186"
          maxLength={17}
          disabled={disabled}
          className="w-full bg-muted border border-border rounded-sm px-4 py-3 font-mono text-lg tracking-[0.2em] text-foreground text-center placeholder:text-muted-foreground/40 placeholder:tracking-[0.2em] focus:outline-none focus:ring-1 focus:ring-terminal-green disabled:opacity-50 uppercase"
        />
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] text-muted-foreground/50">
            Found on driver's door jamb, windshield, or registration
          </p>
          <span className={`font-mono text-[10px] ${vin.length === 17 ? "text-terminal-green" : "text-muted-foreground/50"}`}>
            {vin.length}/17
          </span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={disabled || vin.length !== 17}
          className="w-full font-mono text-xs font-bold bg-terminal-green text-primary-foreground rounded-sm px-5 py-3 hover:bg-terminal-green/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          [ RUN VIN INTELLIGENCE ]
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
