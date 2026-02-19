export interface AnalysisResult {
  asset_identifier: string;
  asking_price: number;
  mileage_metric: number;
  market_spread_verdict: "Undervalued" | "Fair Market" | "Overvalued" | "Deceptive Pricing";
  market_spread_data: {
    listing_price: number;
    cli_market_avg: number;
  };
  analyst_synthesis: string;
  risk_disclosures: {
    component: string;
    severity_index: "High" | "Moderate" | "Low";
    technical_summary: string;
    estimated_repair_cost: string;
  }[];
  projected_monthly_liability: {
    total: number;
    breakdown: string;
  };
  auditor_note: string;
}

export interface AnalysisError {
  error: string;
  code?: "TAMPERED_ASSET" | "RATE_LIMITED" | "PROCESSING_ERROR";
  scans_remaining?: number;
  reset_time?: string;
}

export type AppState = "upload" | "processing" | "results" | "error";
