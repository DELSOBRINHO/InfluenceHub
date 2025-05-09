export type Follower = {
  id: string;
  social_media_id: string;
  username: string;
  name?: string;
  location?: string;
  follower_count?: number;
  engagement_score: number;
  is_vip: boolean;
  created_at: string;
};

export type Comment = {
  id: string;
  follower_id: string;
  post_id: string;
  content: string;
  sentiment?: string;
  is_responded: boolean;
  response?: string;
  created_at: string;
};

export type Interaction = {
  id: string;
  follower_id: string;
  post_id?: string;
  type: string;
  created_at: string;
};

export type Gamification = {
  id: string;
  user_id: string;
  points: number;
  rewards?: any;
  last_updated: string;
};

export type CommunityPost = {
  id: string;
  user_id: string;
  content: string;
  type: string;
  created_at: string;
};

export type ContentSchedule = {
  id: string;
  user_id: string;
  platform: string;
  content?: string;
  media_url?: string;
  scheduled_at: string;
  status: string;
  created_at: string;
};