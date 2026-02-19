import type { AnalysisResult } from "@/types/analysis";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from "recharts";

export function MarketSpreadChart({ result }: { result: AnalysisResult }) {
  const marketAvg = result.cli_market_average || Math.round(result.asking_price * (
    result.market_spread_verdict === "Undervalued" ? 1.15 :
    result.market_spread_verdict === "Overvalued" ? 0.85 :
    result.market_spread_verdict === "Deceptive Pricing" ? 0.7 : 1.0
  ));

  const data = [
    { name: "Listing Price", value: result.asking_price },
    { name: "CLI Market Avg", value: marketAvg },
  ];

  const colors = [
    result.market_spread_verdict === "Undervalued" ? "hsl(145, 100%, 50%)" :
    result.market_spread_verdict === "Fair Market" ? "hsl(217, 100%, 50%)" :
    "hsl(345, 100%, 60%)",
    "hsl(240, 5%, 55%)",
  ];

  return (
    <div className="border border-border rounded-sm p-6 bg-card">
      <p className="font-mono text-xs text-muted-foreground mb-4">MARKET SPREAD</p>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 0, right: 60 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={110}
              tick={{ fill: "hsl(240, 5%, 55%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="value" radius={[0, 2, 2, 0]} barSize={24}>
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i]} />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                formatter={(v: number) => `$${v.toLocaleString()}`}
                style={{ fill: "hsl(0, 0%, 90%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
