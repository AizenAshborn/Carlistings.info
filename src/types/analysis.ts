export interface AnalysisResult {
  asset_identifier: string;
  asking_price: number;
  mileage_metric: number;
  market_spread_verdict: "Undervalued" | "Fair Market" | "Overvalued" | "Deceptive Pricing";
  risk_disclosures: {
    component: string;
    severity_index: "High" | "Moderate" | "Low";
    technical_summary: string;
  }[];
  projected_monthly_liability: number;
  auditor_note: string;
  cli_market_average?: number;
}

export interface AnalysisError {
  error: string;
  code?: "TAMPERED_ASSET" | "RATE_LIMITED" | "PROCESSING_ERROR";
  scans_remaining?: number;
  reset_time?: string;
}

export type AppState = "upload" | "processing" | "results" | "error";
