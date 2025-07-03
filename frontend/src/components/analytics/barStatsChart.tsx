
import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer as RadarResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
  
  type BarChartItem = {
    category: string;
    value: number;
  };
  
  type Props = {
    data: BarChartItem[];
    color?: string;         // Optional: bar color
    height?: number;        // Optional: chart height
  };
  
const BarStatsChart: React.FC<Props & { gradient?: boolean }> = ({ data, color, height = 250, gradient = false }) => {
    const gradientId = `barGradient-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 shadow-lg border border-emerald-200">
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#10b981" opacity={0.3} />
            <XAxis 
              dataKey="category" 
              tick={{ fontSize: 11, fill: '#047857', fontWeight: 'bold' }}
              axisLine={{ stroke: '#10b981', strokeWidth: 2 }}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#047857', fontWeight: 'bold' }}
              axisLine={{ stroke: '#10b981', strokeWidth: 2 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Bar 
              dataKey="value" 
              fill={gradient ? `url(#${gradientId})` : color}
              radius={[4, 4, 0, 0]}
            />
            {gradient && (
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={color} />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
              </defs>
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

export default BarStatsChart;