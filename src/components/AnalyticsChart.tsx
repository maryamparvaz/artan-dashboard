"use client"
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts'
import { ContentActivity } from '@/store/contentStore'

interface ChartDataPoint {
  date: string;
  added: number;
  deleted: number;
}

interface AnalyticsChartProps {
  data: ChartDataPoint[];
  title?: string;
}

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/95 backdrop-blur-sm p-4 border border-slate-600 rounded-lg shadow-xl">
        <p className="font-medium text-slate-100 mb-2">{`Date: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.dataKey === 'added' ? 'Added' : 'Deleted'}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data, title }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[300px] bg-slate-800/50 rounded-lg flex items-center justify-center">
        <p className="text-slate-400">No data available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] bg-slate-800/50 rounded-lg p-4">
      <h3 className="text-lg font-medium text-slate-200 mb-4">{title || 'Content Activity'}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis 
            dataKey="date" 
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
          />
          <YAxis 
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="added" 
            stackId="1" 
            stroke="#22d3ee" 
            fill="#22d3ee" 
            fillOpacity={0.3} 
          />
          <Area 
            type="monotone" 
            dataKey="deleted" 
            stackId="1" 
            stroke="#ef4444" 
            fill="#ef4444" 
            fillOpacity={0.3} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart
