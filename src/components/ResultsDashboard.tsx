import type { AnalysisResult } from "@/types/analysis";
import { AssetHeader } from "./dashboard/AssetHeader";
import { MarketSpreadChart } from "./dashboard/MarketSpreadChart";
import { AnalystSynthesis } from "./dashboard/AnalystSynthesis";
import { AssetVerification } from "./dashboard/AssetVerification";
import { RiskDisclosures } from "./dashboard/RiskDisclosures";
import { AssetProtection } from "./dashboard/AssetProtection";
import { LiabilityProjection } from "./dashboard/LiabilityProjection";
import { CapitalDeployment } from "./dashboard/CapitalDeployment";
import { InsuranceLeadForm } from "./dashboard/InsuranceLeadForm";
import { AffiliateBlock } from "./dashboard/AffiliateBlock";
import { AuditorNote } from "./dashboard/AuditorNote";
import { SafeAssetRedirect } from "./dashboard/SafeAssetRedirect";
import { ExportReportButton } from "./dashboard/ExportReportButton";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ResultsDashboardProps {
  result: AnalysisResult;
  onReset: () => void;
}

export function ResultsDashboard({ result, onReset }: ResultsDashboardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <AssetHeader result={result} />
        </div>
        <ExportReportButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MarketSpreadChart result={result} />
        <div className="grid grid-cols-1 gap-4">
          <LiabilityProjection result={result} />
          <CapitalDeployment askingPrice={result.asking_price} />
        </div>
      </div>

      <InsuranceLeadForm assetIdentifier={result.asset_identifier ?? "this asset"} />
      <AffiliateBlock assetIdentifier={result.asset_identifier ?? "this asset"} />
      <AnalystSynthesis result={result} />
      <AssetVerification />
      <RiskDisclosures result={result} />
      <AssetProtection riskDisclosures={result.risk_disclosures} />
      <AuditorNote result={result} />
      <SafeAssetRedirect
        assetIdentifier={result.asset_identifier}
        marketSpreadVerdict={result.market_spread_verdict}
        riskDisclosures={result.risk_disclosures}
      />

      <div className="flex gap-3 justify-center pt-4 print:hidden">
        <Button variant="outline" onClick={onReset} className="font-mono text-xs gap-2">
          <RotateCcw className="w-3.5 h-3.5" />
          Scan New Listing
        </Button>
      </div>
    </div>
  );
}
