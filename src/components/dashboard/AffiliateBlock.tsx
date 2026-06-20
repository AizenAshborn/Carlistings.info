import { ExternalLink, FileSearch, Wrench, Shield } from "lucide-react";

interface AffiliateBlockProps {
  assetIdentifier: string;
}

const affiliates = [
  {
    id: "carfax",
    icon: FileSearch,
    label: "VEHICLE HISTORY REPORT",
    description: "Run a full CARFAX report to verify ownership history, accident records, and odometer fraud.",
    cta: "[ RUN CARFAX REPORT ]",
    // Replace with your CARFAX affiliate link
    href: "https://www.carfax.com/cfm/buy_used_carfax.cfm?partner=yyy_0",
    color: "terminal-blue",
    border: "border-terminal-blue/40",
    bg: "bg-terminal-blue/5",
    ctaClass:
      "text-terminal-blue border border-terminal-blue/50 hover:bg-terminal-blue/10",
  },
  {
    id: "yourmechanic",
    icon: Wrench,
    label: "PRE-PURCHASE INSPECTION",
    description: "A certified mobile mechanic comes to the seller's location and inspects the vehicle before you buy.",
    cta: "[ BOOK INSPECTION — $99 ]",
    // Replace with your YourMechanic affiliate/referral link
    href: "https://www.yourmechanic.com/services/pre-purchase-car-inspection",
    color: "yellow-500",
    border: "border-yellow-500/40",
    bg: "bg-yellow-500/5",
    ctaClass:
      "text-yellow-400 border border-yellow-500/50 hover:bg-yellow-500/10",
  },
  {
    id: "warranty",
    icon: Shield,
    label: "EXTENDED WARRANTY",
    description: "Protect this asset from unexpected repair costs. Get quotes from top-rated warranty providers.",
    cta: "[ GET WARRANTY QUOTES ]",
    // Replace with your warranty affiliate link (e.g. Endurance, CARCHEX)
    href: "https://www.endurancewarranty.com/?coupon=SAVEBIG",
    color: "terminal-green",
    border: "border-terminal-green/40",
    bg: "bg-terminal-green/5",
    ctaClass:
      "text-terminal-green border border-terminal-green/50 hover:bg-terminal-green/10",
  },
];

export function AffiliateBlock({ assetIdentifier }: AffiliateBlockProps) {
  return (
    <div className="space-y-3">
      <p className="font-mono text-[10px] text-muted-foreground tracking-widest">
        ▸ ASSET PROTECTION SERVICES
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {affiliates.map(({ id, icon: Icon, label, description, cta, href, border, bg, ctaClass }) => (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`group flex flex-col gap-3 border ${border} ${bg} rounded-sm p-4 hover:brightness-110 transition-all duration-200`}
          >
            <div className="flex items-center gap-2">
              <Icon className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
                {label}
              </span>
            </div>
            <p className="font-sans text-xs text-muted-foreground leading-relaxed flex-1">
              {description}
            </p>
            <span
              className={`font-mono text-[11px] font-semibold ${ctaClass} rounded-sm px-3 py-1.5 text-center flex items-center justify-center gap-1.5 transition-colors`}
            >
              {cta}
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </span>
          </a>
        ))}
      </div>
      <p className="font-mono text-[9px] text-muted-foreground/50 text-right">
        Sponsored links — CarListings.info may earn a referral fee
      </p>
    </div>
  );
}
