import React from 'react';
import { AnalyticsTimeframe } from '@/types/analytics';

interface TimeframeSelectorProps {
  timeframes: AnalyticsTimeframe[];
  currentTimeframe: AnalyticsTimeframe;
  onChange: (timeframe: AnalyticsTimeframe) => void;
}

export const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ 
  timeframes, 
  currentTimeframe, 
  onChange 
}) => {
  return (
    <div className="flex space-x-2">
      {timeframes.map((timeframe) => (
        <button
          key={timeframe.label}
          onClick={() => onChange(timeframe)}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            timeframe.label === currentTimeframe.label
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {timeframe.label}
        </button>
      ))}
    </div>
  );
};