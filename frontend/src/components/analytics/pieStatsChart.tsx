import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type PieChartItem = {
  category: string;
  value: number;
};

type Props = {
  data?: PieChartItem[]; // <- make data optional to avoid hard crash
};

export function PieStatsChart({ data }: Props): JSX.Element {
  const COLORS = [
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#96ceb4",
    "#feca57",
    "#ff9ff3",
    "#54a0ff",
  ];

  // Handle undefined or empty data
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-lg text-center text-gray-500">
        No data available for Pie Chart
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 shadow-lg border border-cyan-200">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={30}
            paddingAngle={2}
            dataKey="value"
            label={({ category, value }) => `${category}: ${value}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value}%`, name]}
            labelFormatter={(label) => `Category: ${label}`}
            contentStyle={{
              backgroundColor: "pink",
              border: "none",
              borderRadius: "8px",
              color: "white",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
