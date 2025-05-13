import React from 'react';
import { Follower } from '@/types/followers';
import { FollowerCard } from './FollowerCard';

interface FollowersListProps {
  followers: Follower[];
  currentUserId: string;
  loading: boolean;
  emptyMessage?: string;
}

export const FollowersList: React.FC<FollowersListProps> = ({ 
  followers, 
  currentUserId, 
  loading, 
  emptyMessage = "No followers yet" 
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (followers.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {emptyMessage}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {followers.map(follower => (
        <FollowerCard 
          key={follower.id} 
          follower={follower} 
          currentUserId={currentUserId} 
        />
      ))}
    </div>
  );
};