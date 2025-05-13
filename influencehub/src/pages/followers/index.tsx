import React, { useState } from 'react';
import { useFollowers } from '@/hooks/useFollowers';
import { FollowersList } from '@/components/followers/FollowersList';
import { FollowersStats } from '@/components/followers/FollowersStats';
import { useAuth } from '@/context/AuthContext'; // Assumindo que você tem um hook de autenticação

export default function FollowersPage() {
  const { user } = useAuth();
  const userId = user?.id;
  const { followers, following, stats, loading, error } = useFollowers(userId);
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>('followers');
  
  if (!userId) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Please log in to view your followers</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 text-red-800 p-4 rounded-lg">
        <p>Error loading followers: {error}</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Network</h1>
      
      <FollowersStats stats={stats} loading={loading} />
      
      <div className="mt-8">
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('followers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'followers'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Followers ({stats.total_followers})
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'following'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Following ({following.length})
            </button>
          </nav>
        </div>
        
        {activeTab === 'followers' ? (
          <FollowersList 
            followers={followers} 
            currentUserId={userId} 
            loading={loading} 
            emptyMessage="You don't have any followers yet. Share your profile to get started!"
          />
        ) : (
          <FollowersList 
            followers={following} 
            currentUserId={userId} 
            loading={loading} 
            emptyMessage="You're not following anyone yet. Discover creators to follow!"
          />
        )}
      </div>
    </div>
  )
}              Followers ({stats.total_followers})