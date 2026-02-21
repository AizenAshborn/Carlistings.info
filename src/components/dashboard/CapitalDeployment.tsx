import { Landmark, ArrowRight } from "lucide-react";

interface CapitalDeploymentProps {
  askingPrice: number;
}

export function CapitalDeployment({ askingPrice }: CapitalDeploymentProps) {
  return (
    <div className="border border-border rounded-sm p-6 bg-card/50 flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Landmark className="w-4 h-4 text-muted-foreground" />
          <p className="font-mono text-[10px] text-muted-foreground tracking-widest">
            DEPLOY CAPITAL
          </p>
        </div>

        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
          Pre-qualify for asset financing at competitive market rates. This utilizes a soft-pull
          protocol without impacting your credit score.
        </p>

        <div className="flex items-center gap-2 font-mono text-xs text-foreground/70">
          <ArrowRight className="w-3.5 h-3.5" />
          <span>
            ESTIMATED REQUIRED CAPITAL:{" "}
            <span className="text-foreground font-bold">
              ${askingPrice.toLocaleString()}
            </span>
          </span>
        </div>
      </div>

      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block w-full text-center font-mono text-xs font-bold bg-secondary text-secondary-foreground rounded-sm px-5 py-2.5 hover:bg-secondary/80 transition-colors"
      >
        [ INITIALIZE LOAN ENGINE ]
      </a>
    </div>
  );
}
