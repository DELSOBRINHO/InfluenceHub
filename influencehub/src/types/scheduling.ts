export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export interface ScheduledPost {
  id: string;
  user_id: string;
  platform: string;
  content: string;
  media_urls?: string[];
  scheduled_for: string;
  published_at?: string;
  status: PostStatus;
  platform_post_id?: string;
  error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface ScheduleFormData {
  platform: string;
  content: string;
  media_files?: File[];
  scheduled_for: string;
}

export interface SchedulePostResponse {
  success: boolean;
  post?: ScheduledPost;
  error?: string;
}