import React from 'react';
import { Follower } from '@/types/followers';
import { useFollowers } from '@/hooks/useFollowers';

interface FollowerCardProps {
  follower: Follower;
  currentUserId: string;
}

export const FollowerCard: React.FC<FollowerCardProps> = ({ follower, currentUserId }) => {
  const { followUser, unfollowUser, isFollowing } = useFollowers(currentUserId);
  const profile = follower.follower_profile;
  
  if (!profile) return null;
  
  const handleFollowToggle = async () => {
    if (isFollowing(profile.id)) {
      await unfollowUser(profile.id);
    } else {
      await followUser(profile.id);
    }
  };
  
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          {profile.avatar_url ? (
            <img 
              src={profile.avatar_url} 
              alt={profile.username} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xl">
              {profile.username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{profile.username}</h3>
          {profile.full_name && (
            <p className="text-sm text-gray-500">{profile.full_name}</p>
          )}
        </div>
      </div>
      
      {currentUserId !== profile.id && (
        <button
          onClick={handleFollowToggle}
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            isFollowing(profile.id)
              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isFollowing(profile.id) ? 'Unfollow' : 'Follow'}
        </button>
      )}
    </div>
  );
};