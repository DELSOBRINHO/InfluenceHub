import React from 'react';
import { FollowerStats } from '@/types/followers';

interface FollowersStatsProps {
  stats: FollowerStats;
  loading: boolean;
}

export const FollowersStats: React.FC<FollowersStatsProps> = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 p-4 rounded-lg h-24"></div>
        ))}
      </div>
    );
  }
  
  const statItems = [
    {
      label: 'Total Followers',
      value: stats.total_followers,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      label: 'New Today',
      value: stats.new_followers_today,
      color: 'bg-green-100 text-green-800'
    },
    {
      label: 'This Week',
      value: stats.new_followers_week,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      label: 'This Month',
      value: stats.new_followers_month,
      color: 'bg-pink-100 text-pink-800'
    }
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <div key={index} className={`${item.color} p-4 rounded-lg`}>
          <p className="text-sm font-medium">{item.label}</p>
          <p className="text-2xl font-bold">{item.value}</p>
        </div>
      ))}
    </div>
  );
};