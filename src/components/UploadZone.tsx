import { useCallback, useState } from "react";
import { Upload } from "lucide-react";

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function UploadZone({ onFileSelected, disabled }: UploadZoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback((file: File): boolean => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("INVALID_FORMAT — Accepts JPG, PNG, WEBP only.");
      return false;
    }
    if (file.size > MAX_SIZE) {
      setError("FILE_TOO_LARGE — Maximum 5MB.");
      return false;
    }
    setError(null);
    return true;
  }, []);

  const handleFile = useCallback((file: File) => {
    if (validate(file)) onFileSelected(file);
  }, [validate, onFileSelected]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <label
        className={`
          group relative flex flex-col items-center justify-center
          w-full h-64 border border-border rounded-sm
          cursor-pointer transition-all duration-200
          ${dragOver ? "border-primary bg-primary/5" : "hover:border-muted-foreground"}
          ${disabled ? "opacity-50 pointer-events-none" : ""}
        `}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
      >
        <input
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          disabled={disabled}
        />
        <Upload className="w-8 h-8 text-muted-foreground mb-4 group-hover:text-primary transition-colors" />
        <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
          Upload Listing Screenshot
        </span>
        <span className="font-mono text-xs text-muted-foreground/50 mt-2">
          JPG, PNG, WEBP — max 5MB
        </span>
      </label>
      {error && (
        <p className="font-mono text-xs text-destructive mt-3 text-center">
          {">"} {error}
        </p>
      )}
    </div>
  );
}
