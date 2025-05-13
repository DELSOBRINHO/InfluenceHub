import React from 'react';
import { ContentPerformance } from '@/types/analytics';

interface TopContentListProps {
  content: ContentPerformance[];
  loading: boolean;
}

export const TopContentList: React.FC<TopContentListProps> = ({ content, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="mb-4 pb-4 border-b last:border-0 last:mb-0 last:pb-0">
            <div className="flex">
              <div className="w-16 h-16 bg-gray-200 rounded mr-4"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (content.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Content</h3>
        <p className="text-gray-500 text-center py-8">No content data available for the selected timeframe.</p>
      </div>
    );
  }
  
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return '📸';
      case 'twitter': return '🐦';
      case 'tiktok': return '🎵';
      case 'youtube': return '📹';
      case 'facebook': return '👍';
      default: return '🌐';
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return '🖼️';
      case 'video': return '🎬';
      case 'text': return '📝';
      case 'link': return '🔗';
      default: return '📄';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Content</h3>
      
      <div className="space-y-4">
        {content.map((item) => (
          <div key={item.id} className="flex border-b pb-4 last:border-0 last:pb-0">
            {item.thumbnail ? (
              <div className="w-16 h-16 rounded overflow-hidden mr-4 flex-shrink-0">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-2xl">{getTypeIcon(item.type)}</span>
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <span className="mr-1">{getPlatformIcon(item.platform)}</span>
                <span className="text-xs text-gray-500 capitalize">{item.platform}</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-xs text-gray-500">
                  {new Date(item.published_at).toLocaleDateString()}
                </span>
              </div>
              
              <p className="font-medium text-gray-800 mb-2 line-clamp-2">{item.title}</p>
              
              <div className="flex space-x-4 text-xs text-gray-600">
                <div>
                  <span className="font-medium">{item.likes.toLocaleString()}</span> likes
                </div>
                <div>
                  <span className="font-medium">{item.comments.toLocaleString()}</span> comments
                </div>
                {item.shares && (
                  <div>
                    <span className="font-medium">{item.shares.toLocaleString()}</span> shares
                  </div>
                )}
                {item.views && (
                  <div>
                    <span className="font-medium">{item.views.toLocaleString()}</span> views
                  </div>
                )}
                <div className="text-blue-600">
                  <span className="font-medium">{item.engagement_rate.toFixed(1)}%</span> engagement
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};