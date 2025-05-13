import React from 'react';
import { Link } from 'react-router-dom';
import { ScheduledPost } from '@/types/scheduling';

interface UpcomingPostsProps {
  posts: ScheduledPost[];
  loading?: boolean;
}

export const UpcomingPosts: React.FC<UpcomingPostsProps> = ({ posts, loading = false }) => {
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
        <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Posts</h3>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-10 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Upcoming Posts</h3>
        <Link to="/scheduling" className="text-sm text-blue-600 hover:text-blue-800">
          View all
        </Link>
      </div>
      
      {posts.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500 mb-4">No upcoming posts scheduled.</p>
          <Link
            to="/scheduling"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Schedule a Post
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <span className="mr-1">{getPlatformIcon(post.platform)}</span>
                <span className="capitalize">{post.platform}</span>
                <span className="mx-2">•</span>
                <span>{formatDate(post.scheduled_for)}</span>
              </div>
              <p className="text-gray-800 line-clamp-2">{post.content}</p>
              
              {post.media_urls && post.media_urls.length > 0 && (
                <div className="mt-2 flex space-x-2">
                  {post.media_urls.slice(0, 3).map((url, index) => (
                    <div key={index} className="h-12 w-12 rounded overflow-hidden">
                      <img src={url} alt="Media" className="h-full w-full object-cover" />
                    </div>
                  ))}
                  {post.media_urls.length > 3 && (
                    <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center text-gray-500 text-xs">
                      +{post.media_urls.length - 3}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};