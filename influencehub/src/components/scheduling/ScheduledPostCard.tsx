import React from 'react';
import { ScheduledPost } from '@/types/scheduling';

interface ScheduledPostCardProps {
  post: ScheduledPost;
  onEdit: (post: ScheduledPost) => void;
  onDelete: (postId: string) => void;
}

export const ScheduledPostCard: React.FC<ScheduledPostCardProps> = ({ post, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this scheduled post?')) {
      onDelete(post.id);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
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
  
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <span className="text-xl mr-2">{getPlatformIcon(post.platform)}</span>
            <span className="font-medium capitalize">{post.platform}</span>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(post.status)}`}>
            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
          </span>
        </div>
        
        <p className="text-gray-800 mb-4 line-clamp-3">{post.content}</p>
        
        {post.media_urls && post.media_urls.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-2">
              {post.media_urls.slice(0, 4).map((url, index) => (
                <div key={index} className="relative">
                  <img 
                    src={url} 
                    alt={`Media ${index + 1}`} 
                    className="w-full h-20 object-cover rounded"
                  />
                  {post.media_urls && post.media_urls.length > 4 && index === 3 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                      <span className="text-white font-medium">+{post.media_urls.length - 4}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Scheduled for {formatDate(post.scheduled_for)}</span>
        </div>
        
        {post.status === 'failed' && post.error_message && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4">
            <strong>Error:</strong> {post.error_message}
          </div>
        )}
        
        <div className="flex justify-end space-x-2">
          {post.status === 'scheduled' && (
            <>
              <button
                onClick={() => onEdit(post)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
              >
                Delete
              </button>
            </>
          )}
          {post.status === 'published' && post.platform_post_id && (
            <a
              href="#" // In a real app, this would link to the published post
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
            >
              View Post
            </a>
          )}
        </div>
      </div>
    </div>
  );
};