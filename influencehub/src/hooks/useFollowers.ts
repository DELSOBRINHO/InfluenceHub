import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Follower, FollowerStats } from '@/types/followers';

export function useFollowers(userId: string | undefined) {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [following, setFollowing] = useState<Follower[]>([]);
  const [stats, setStats] = useState<FollowerStats>({
    total_followers: 0,
    new_followers_today: 0,
    new_followers_week: 0,
    new_followers_month: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    
    async function fetchFollowers() {
      try {
        setLoading(true);
        
        // Fetch followers
        const { data: followerData, error: followerError } = await supabase
          .from('followers')
          .select(`
            *,
            follower_profile:profiles!follower_id(id, username, full_name, avatar_url)
          `)
          .eq('influencer_id', userId)
          .eq('status', 'active');
          
        if (followerError) throw followerError;
        
        // Fetch following
        const { data: followingData, error: followingError } = await supabase
          .from('followers')
          .select(`
            *,
            follower_profile:profiles!influencer_id(id, username, full_name, avatar_url)
          `)
          .eq('follower_id', userId)
          .eq('status', 'active');
          
        if (followingError) throw followingError;
        
        // Calculate stats
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
        const weekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toISOString();
        const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).toISOString();
        
        const newFollowersToday = followerData.filter(f => new Date(f.created_at) >= new Date(today)).length;
        const newFollowersWeek = followerData.filter(f => new Date(f.created_at) >= new Date(weekAgo)).length;
        const newFollowersMonth = followerData.filter(f => new Date(f.created_at) >= new Date(monthAgo)).length;
        
        setFollowers(followerData);
        setFollowing(followingData);
        setStats({
          total_followers: followerData.length,
          new_followers_today: newFollowersToday,
          new_followers_week: newFollowersWeek,
          new_followers_month: newFollowersMonth
        });
      } catch (err) {
        console.error('Error fetching followers:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }
    
    fetchFollowers();
    
    // Set up real-time subscription for new followers
    const subscription = supabase
      .channel('followers_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'followers',
        filter: `influencer_id=eq.${userId}`
      }, (payload) => {
        // Refresh followers when changes occur
        fetchFollowers();
      })
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);
  
  // Function to follow a user
  const followUser = async (influencerId: string) => {
    if (!userId) return { error: 'User not authenticated' };
    
    try {
      const { data, error } = await supabase
        .from('followers')
        .insert([
          { 
            influencer_id: influencerId, 
            follower_id: userId,
            status: 'active'
          }
        ]);
        
      if (error) throw error;
      return { data };
    } catch (err) {
      console.error('Error following user:', err);
      return { error: err instanceof Error ? err.message : 'Unknown error occurred' };
    }
  };
  
  // Function to unfollow a user
  const unfollowUser = async (influencerId: string) => {
    if (!userId) return { error: 'User not authenticated' };
    
    try {
      const { data, error } = await supabase
        .from('followers')
        .delete()
        .match({ 
          influencer_id: influencerId, 
          follower_id: userId 
        });
        
      if (error) throw error;
      return { data };
    } catch (err) {
      console.error('Error unfollowing user:', err);
      return { error: err instanceof Error ? err.message : 'Unknown error occurred' };
    }
  };
  
  // Function to check if user is following another user
  const isFollowing = (influencerId: string) => {
    return following.some(f => f.influencer_id === influencerId);
  };
  
  return { 
    followers, 
    following, 
    stats, 
    loading, 
    error,
    followUser,
    unfollowUser,
    isFollowing
  };
}