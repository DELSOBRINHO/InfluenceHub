import React from 'react';
import { AnalyticsChartData } from '@/types/analytics';

// Note: In a real application, you would use a charting library like Chart.js or Recharts
// For this example, we'll create a simplified chart component

interface FollowersChartProps {
  data: AnalyticsChartData;
  loading: boolean;
}

export const FollowersChart: React.FC<FollowersChartProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 h-80 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-64 bg-gray-100 rounded"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Followers Growth</h3>
      
      <div className="h-64 relative">
        {/* This is a placeholder for a real chart */}
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
          <p className="text-gray-500 text-center">
            Chart visualization would go here.<br />
            In a real application, use a library like Chart.js or Recharts.
          </p>
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-6 py-2">
          {data.datasets.map((dataset, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: dataset.color }}
              ></div>
              <span className="text-sm text-gray-600">{dataset.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};