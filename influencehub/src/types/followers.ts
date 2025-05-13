export interface Follower {
  id: string;
  created_at: string;
  influencer_id: string;
  follower_id: string;
  status: 'pending' | 'active' | 'blocked';
  follower_profile?: Profile;
}

export interface Profile {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  created_at: string;
}

export interface FollowerStats {
  total_followers: number;
  new_followers_today: number;
  new_followers_week: number;
  new_followers_month: number;
}