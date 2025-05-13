import React from 'react';

interface OverviewCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
}

export const OverviewCard: React.FC<OverviewCardProps> = ({ title, value, change, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd>
              <div className="text-lg font-medium text-gray-900">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
      
      {change !== undefined && (
        <div className="mt-4">
          <div className={`flex items-center text-sm ${
            change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
            </span>
            <span className="ml-1 text-gray-500">from last period</span>
          </div>
        </div>
      )}
    </div>
  );
};