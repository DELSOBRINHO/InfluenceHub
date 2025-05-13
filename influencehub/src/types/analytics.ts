export interface AnalyticsTimeframe {
  start_date: string;
  end_date: string;
}

export interface AnalyticsMetric {
  date: string;
  value: number;
}

export interface FollowerGrowthData {
  platform: string;
  data: AnalyticsMetric[];
}

export interface EngagementData {
  platform: string;
  data: AnalyticsMetric[];
}

export interface PostPerformance {
  id: string;
  platform: string;
  content: string;
  media_url?: string;
  published_at: string;
  likes: number;
  comments: number;
  shares: number;
  impressions: number;
  engagement_rate: number;
}

export interface AnalyticsOverview {
  total_followers: number;
  followers_change: number;
  total_engagement: number;
  engagement_change: number;
  total_reach: number;
  reach_change: number;
  total_posts: number;
  posts_change: number;
}