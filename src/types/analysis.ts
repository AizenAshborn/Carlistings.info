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

  // Deal Score Algorithm
  deal_score?: number; // 0–100
  deal_score_breakdown?: string;

  // Seller Risk Detection
  seller_risk_score?: number; // 0–100
  seller_red_flags?: string[];

  // Vehicle Problem Database
  known_problems?: {
    issue: string;
    frequency: "Very Common" | "Common" | "Uncommon" | "Rare";
    severity: "Critical" | "Major" | "Minor";
    typical_cost: string;
  }[];

  // Rental Solutions
  rental_potential?: {
    daily_rate: number;
    monthly_rate: number;
    annual_revenue: number;
    viability: "Excellent" | "Good" | "Marginal" | "Not Recommended";
    platform_recommendation: string;
  };

  // Input tracking
  input_type?: "screenshot" | "url" | "vin";
}

export interface AnalysisError {
  error: string;
  code?: "TAMPERED_ASSET" | "RATE_LIMITED" | "PROCESSING_ERROR";
  scans_remaining?: number;
  reset_time?: string;
}

export type AppState = "upload" | "processing" | "results" | "error";
export type InputMode = "screenshot" | "url" | "vin";
