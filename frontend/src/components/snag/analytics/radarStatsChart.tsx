import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer as RadarResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface RadarStatsChartProps {
  data: { category: string; value: number }[];
}
export const RadarStatsChart: React.FC<RadarStatsChartProps> = ({ data }) => {
  return (
<div className="bg-gradient-to-br text-[10px] md:text-[15px] lg:text-[18px] from-purple-50 to-indigo-50 rounded-xl shadow-lg border border-purple-200">
  <RadarResponsiveContainer width="100%" height={280}>
    <RadarChart data={data}>
      <PolarGrid stroke="#8b5cf6" strokeWidth={1.5} />
      
      <PolarAngleAxis
  dataKey="category"
  tick={({ x, y, payload }) => (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={30} // 👈 smaller font size
      fill="#6b46c1"
      fontWeight="500"
    >
      {payload.value}
    </text>
  )}
/>

<PolarRadiusAxis
  angle={0}
  domain={[0, 5]}
  tick={({ x, y, payload }) => (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize={30} // 👈 smaller font size
      fill="#8b5cf6"
    >
      {payload.value}
    </text>
  )}
/>
      
      <Radar
        name="Value"
        dataKey="value"
        stroke="#8b5cf6"
        fill="url(#radarGradient)"
        fillOpacity={0.4}
        strokeWidth={3}
      />
      
      <Tooltip
        contentStyle={{
          backgroundColor: "#1f2937",
          border: "none",
          borderRadius: "8px",
          color: "white",
        }}
        labelStyle={{ color: "#cbd5e1" }}
        itemStyle={{ color: "#f3f4f6" }}
      />
      
      <defs>
        <linearGradient
          id="radarGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </RadarChart>
  </RadarResponsiveContainer>
</div>

  );
};
