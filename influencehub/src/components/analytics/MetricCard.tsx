import React from 'react';
import { AnalyticsMetric } from '@/types/analytics';

interface MetricCardProps {
  metric: AnalyticsMetric;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-gray-500 text-sm font-medium">{metric.name}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-semibold text-gray-900">
          {metric.name.includes('Rate') ? `${metric.value}%` : metric.value.toLocaleString()}
        </p>
        <span className={`ml-2 text-sm font-medium ${
          metric.trend === 'up' 
            ? 'text-green-600' 
            : metric.trend === 'down' 
              ? 'text-red-600' 
              : 'text-gray-500'
        }`}>
          {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
          {' '}
          {Math.abs(metric.change).toFixed(1)}%
        </span>
      </div>
    </div>
  );
};