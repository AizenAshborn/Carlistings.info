import type { AnalysisResult } from "@/types/analysis";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from "recharts";

export function MarketSpreadChart({ result }: { result: AnalysisResult }) {
  const data = [
    { name: "Listing Price", value: result.market_spread_data.listing_price },
    { name: "CLI Market Avg", value: result.market_spread_data.cli_market_avg },
  ];

  const listingColor =
    result.market_spread_verdict === "Undervalued" ? "hsl(145, 100%, 50%)" :
    result.market_spread_verdict === "Fair Market" ? "hsl(217, 100%, 50%)" :
    "hsl(345, 100%, 60%)";

  const colors = [listingColor, "hsl(240, 5%, 35%)"];

  return (
    <div className="border border-border rounded-sm p-6 bg-card">
      <p className="font-mono text-[10px] text-muted-foreground tracking-widest mb-6">MARKET SPREAD VISUALIZER</p>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 0, right: 70 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={120}
              tick={{ fill: "hsl(240, 5%, 55%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="value" radius={[0, 2, 2, 0]} barSize={28}>
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i]} />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                formatter={(v: number) => `$${v.toLocaleString()}`}
                style={{ fill: "hsl(0, 0%, 90%)", fontSize: 12, fontFamily: "JetBrains Mono", fontWeight: 600 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
