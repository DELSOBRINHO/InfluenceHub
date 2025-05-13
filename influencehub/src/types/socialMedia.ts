export type SocialPlatform = 'instagram' | 'twitter' | 'tiktok' | 'youtube' | 'facebook';

export interface SocialAccount {
  id: string;
  user_id: string;
  platform: SocialPlatform;
  platform_user_id: string;
  username: string;
  access_token: string;
  refresh_token?: string;
  token_expires_at?: string;
  profile_url?: string;
  avatar_url?: string;
  followers_count?: number;
  following_count?: number;
  created_at: string;
  last_synced_at?: string;
}

export interface SocialMetrics {
  platform: SocialPlatform;
  followers: number;
  engagement_rate: number;
  posts_count: number;
  average_likes: number;
  average_comments: number;
  growth_rate: number;
}

export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  platform_post_id: string;
  content: string;
  media_urls?: string[];
  published_at: string;
  likes_count: number;
  comments_count: number;
  shares_count?: number;
  views_count?: number;
  link?: string;
}