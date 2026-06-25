import { useRef } from "react";
import type { AnalysisResult } from "@/types/analysis";
import { AssetHeader } from "./dashboard/AssetHeader";
import { DealScore } from "./dashboard/DealScore";
import { MarketSpreadChart } from "./dashboard/MarketSpreadChart";
import { AnalystSynthesis } from "./dashboard/AnalystSynthesis";
import { AssetVerification } from "./dashboard/AssetVerification";
import { SellerRiskPanel } from "./dashboard/SellerRiskPanel";
import { RiskDisclosures } from "./dashboard/RiskDisclosures";
import { KnownProblems } from "./dashboard/KnownProblems";
import { AssetProtection } from "./dashboard/AssetProtection";
import { LiabilityProjection } from "./dashboard/LiabilityProjection";
import { CapitalDeployment } from "./dashboard/CapitalDeployment";
import { RentalPotential } from "./dashboard/RentalPotential";
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
  const dashboardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Header + Export */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <AssetHeader result={result} />
        </div>
        <ExportReportButton result={result} dashboardRef={dashboardRef} />
      </div>

      {/* Printable content */}
      <div ref={dashboardRef} className="space-y-4">
        {/* Deal Score — prominent placement */}
        <DealScore result={result} />

        {/* Market Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MarketSpreadChart result={result} />
          <div className="grid grid-cols-1 gap-4">
            <LiabilityProjection result={result} />
            <CapitalDeployment askingPrice={result.asking_price} />
          </div>
        </div>

        {/* Seller Risk */}
        <SellerRiskPanel result={result} />

        {/* Risk Disclosures */}
        <RiskDisclosures result={result} />

        {/* Known Problems Database */}
        <KnownProblems result={result} />

        {/* Analyst Synthesis */}
        <AnalystSynthesis result={result} />

        {/* Asset Protection */}
        <AssetProtection riskDisclosures={result.risk_disclosures} />

        {/* Rental Potential */}
        <RentalPotential result={result} />

        {/* Insurance Lead Generation */}
        <InsuranceLeadForm assetIdentifier={result.asset_identifier ?? "this asset"} />

        {/* Affiliate Partner Network */}
        <AffiliateBlock assetIdentifier={result.asset_identifier ?? "this asset"} />

        {/* Auditor Note */}
        <AuditorNote result={result} />

        {/* Safe Asset Redirect */}
        <SafeAssetRedirect
          assetIdentifier={result.asset_identifier}
          marketSpreadVerdict={result.market_spread_verdict}
          riskDisclosures={result.risk_disclosures}
        />

        {/* Asset Verification */}
        <AssetVerification />
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-center pt-4 print:hidden">
        <Button variant="outline" onClick={onReset} className="font-mono text-xs gap-2">
          <RotateCcw className="w-3.5 h-3.5" />
          Scan New Listing
        </Button>
      </div>
    </div>
  );
}
