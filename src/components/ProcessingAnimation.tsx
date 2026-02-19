import { useEffect, useState } from "react";

const LINES = [
  "> Parsing chassis metadata from image...",
  "> Cross-referencing known failure indices...",
  "> Calculating local market spread...",
  "> Compiling risk disclosure matrix...",
  "> Generating auditor assessment...",
];

export function ProcessingAnimation() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= LINES.length) return prev;
        return prev + 1;
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto space-y-2">
      {LINES.slice(0, visibleLines).map((line, i) => (
        <p key={i} className="font-mono text-sm text-terminal-green animate-in fade-in slide-in-from-left-2 duration-300">
          {line}
        </p>
      ))}
      {visibleLines <= LINES.length && (
        <span className="inline-block w-2 h-4 bg-terminal-green animate-terminal-blink" />
      )}
    </div>
  );
}
