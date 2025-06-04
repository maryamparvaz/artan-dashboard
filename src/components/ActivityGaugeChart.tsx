"use client"
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Text } from 'recharts';

interface ActivityGaugeChartProps {
  added: number;
  deleted: number;
  title?: string;
  description?: string;
}

const ActivityGaugeChart: React.FC<ActivityGaugeChartProps> = ({
  added,
  deleted,
  title = "Today's Activity Progress",
  description = "Shows the ratio of content added vs deleted"
}) => {
  // Calculate total and percentages
  const total = added + deleted || 1; // Avoid division by zero
  const addedPercentage = Math.round((added / total) * 100);
  const deletedPercentage = Math.round((deleted / total) * 100);
  
  // Create data for the gauge
  const data = [
    { value: addedPercentage, fill: '#22d3ee', name: 'Added' }, // Cyan for added
    { value: deletedPercentage, fill: '#ef4444', name: 'Deleted' } // Red for deleted
  ];

  return (
    <div className="w-full bg-slate-800/50 rounded-lg p-6">
      <div className="relative h-[200px] mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            {/* Center text */}
            <Text
              x="50%"
              y="85%"
              textAnchor="middle"
              fill="#e2e8f0"
              fontSize={24}
              fontWeight="bold"
            >
              {`${addedPercentage}%`}
            </Text>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-medium text-slate-200 mb-2">{title}</h3>
        <p className="text-sm text-slate-400">{description}</p>
        <div className="mt-2 flex justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
            <span className="text-sm text-slate-300">Added: {added}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <span className="text-sm text-slate-300">Deleted: {deleted}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityGaugeChart; 