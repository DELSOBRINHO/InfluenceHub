export type SocialPlatform = 'instagram' | 'twitter' | 'facebook' | 'tiktok' | 'youtube';

export interface SocialAccount {
  id: string;
  user_id: string;
  platform: SocialPlatform;
  platform_account_id: string;
  username: string;
  profile_picture_url?: string;
  access_token: string;
  refresh_token?: string;
  token_expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface SocialAccountStats {
  followers: number;
  following: number;
  posts: number;
  engagement_rate: number;
}

export interface ConnectAccountResponse {
  success: boolean;
  account?: SocialAccount;
  error?: string;
}