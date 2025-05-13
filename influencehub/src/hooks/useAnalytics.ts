import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  AnalyticsTimeframe, 
  FollowerGrowthData, 
  EngagementData, 
  PostPerformance,
  AnalyticsOverview
} from '@/types/analytics';

export const useAnalytics = (userId: string | undefined) => {
  const [timeframe, setTimeframe] = useState<AnalyticsTimeframe>({
    start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
    end_date: new Date().toISOString().split('T')[0], // today
  });
  
  const [overview, setOverview] = useState<AnalyticsOverview>({
    total_followers: 0,
    followers_change: 0,
    total_engagement: 0,
    engagement_change: 0,
    total_reach: 0,
    reach_change: 0,
    total_posts: 0,
    posts_change: 0,
  });
  
  const [followerGrowth, setFollowerGrowth] = useState<FollowerGrowthData[]>([]);
  const [engagementData, setEngagementData] = useState<EngagementData[]>([]);
  const [topPosts, setTopPosts] = useState<PostPerformance[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch analytics data from Supabase
        const { data: analyticsData, error: analyticsError } = await supabase.functions.invoke('get-analytics', {
          body: { userId, timeframe },
        });
        
        if (analyticsError) {
          throw analyticsError;
        }
        
        if (analyticsData) {
          setOverview(analyticsData.overview);
          setFollowerGrowth(analyticsData.followerGrowth);
          setEngagementData(analyticsData.engagementData);
          setTopPosts(analyticsData.topPosts);
        }
      } catch (err: any) {
        console.error('Error fetching analytics data:', err);
        setError(err.message || 'Failed to fetch analytics data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, [userId, timeframe]);
  
  const updateTimeframe = (newTimeframe: AnalyticsTimeframe) => {
    setTimeframe(newTimeframe);
  };
  
  return {
    timeframe,
    overview,
    followerGrowth,
    engagementData,
    topPosts,
    loading,
    error,
    updateTimeframe,
  };
};