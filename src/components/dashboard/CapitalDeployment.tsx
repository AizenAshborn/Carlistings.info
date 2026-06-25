import { Landmark, ArrowRight, CreditCard, ExternalLink } from "lucide-react";

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

      <div className="flex flex-col gap-2 mt-4">
        <a
          href="https://ratehub.ca/ref/xIzfLi"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block w-full text-center font-mono text-xs font-bold bg-secondary text-secondary-foreground rounded-sm px-5 py-2.5 hover:bg-secondary/80 transition-colors"
        >
          [ INITIALIZE LOAN ENGINE ]
        </a>
        <a
          href="https://ratehub.ca/ref/xIzfLi"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex items-center justify-center gap-1.5 w-full text-center font-mono text-[10px] text-terminal-green border border-terminal-green/40 rounded-sm px-4 py-2 hover:bg-terminal-green/10 transition-colors"
        >
          <CreditCard className="w-3 h-3" />
          COMPARE CREDIT CARDS — RATEHUB
          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
        </a>
      </div>
    </div>
  );
}
