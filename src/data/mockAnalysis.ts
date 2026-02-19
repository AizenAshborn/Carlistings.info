import type { AnalysisResult } from "@/types/analysis";

export const MOCK_RESULT: AnalysisResult = {
  asset_identifier: "2016 Audi A5 Technik S Line",
  asking_price: 12000,
  mileage_metric: 164597,
  market_spread_verdict: "Undervalued",
  market_spread_data: {
    listing_price: 12000,
    cli_market_avg: 15500,
  },
  analyst_synthesis:
    "CRITICAL WARNING: Asset is priced roughly $3,500 below the CLI Market Average but has been sitting active for 27 weeks in Vaughan, a high-velocity car market. The seller's claim that it is 'priced to sell' directly contradicts this half-year market exposure. This heavily discounted stagnation strongly indicates severe, unlisted mechanical failures that previous prospective buyers have discovered during independent inspections.",
  risk_disclosures: [
    {
      component: "EA888 Timing Chain & Tensioner",
      severity_index: "High",
      technical_summary:
        "The 2.0 TFSI engine is notorious for timing chain stretch and tensioner failure. If it skips timing, the pistons will impact the valves, requiring complete engine replacement.",
      estimated_repair_cost: "$2,500 - $3,500",
    },
    {
      component: "Water Pump & Thermostat Housing",
      severity_index: "Moderate",
      technical_summary:
        "The plastic housing is highly susceptible to heat cycling, causing warping and chronic coolant leaks leading to overheating.",
      estimated_repair_cost: "$900 - $1,400",
    },
  ],
  projected_monthly_liability: {
    total: 480,
    breakdown:
      "Includes ~$280/mo Vaughan-area risk-adjusted insurance premium and a mandatory $200/mo allocation to a catastrophic maintenance fund.",
  },
  auditor_note:
    "Do not ask if it is available. Ask: 'Since this asset has been listed for over 6 months at a heavy discount, what specific mechanical issues did previous buyers find during their inspections that caused them to walk away?'",
};
