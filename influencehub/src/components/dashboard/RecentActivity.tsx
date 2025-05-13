import React from 'react';

export interface Activity {
  id: string;
  type: 'post' | 'engagement' | 'follower' | 'mention';
  platform: string;
  message: string;
  timestamp: string;
}

interface RecentActivityProps {
  activities: Activity[];
  loading?: boolean;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities, loading = false }) => {
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return '📸';
      case 'twitter': return '🐦';
      case 'tiktok': return '🎵';
      case 'youtube': return '📹';
      case 'facebook': return '👍';
      default: return '🌐';
    }
  };
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'post': return '📝';
      case 'engagement': return '👍';
      case 'follower': return '👤';
      case 'mention': return '🔔';
      default: return '📌';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start animate-pulse">
              <div className="h-8 w-8 rounded-full bg-gray-200"></div>
              <div className="ml-3 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
      
      {activities.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500">No recent activity to display.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span>{getActivityIcon(activity.type)}</span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm text-gray-800">
                  <span className="mr-1">{getPlatformIcon(activity.platform)}</span>
                  {activity.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(activity.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};