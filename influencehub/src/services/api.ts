import { supabase } from '@/lib/supabase';

// Base API URL for external services
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.influencehub.example.com';

// Generic fetch wrapper with error handling
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('No active session');
    }
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
      ...options.headers,
    };
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Social accounts API
export const socialAccountsApi = {
  getAuthUrl: async (platform: string) => {
    return fetchWithAuth(`/social/auth-url?platform=${platform}`);
  },
  
  completeAuth: async (platform: string, code: string) => {
    return fetchWithAuth('/social/complete-auth', {
      method: 'POST',
      body: JSON.stringify({ platform, code }),
    });
  },
  
  disconnect: async (accountId: string) => {
    return fetchWithAuth(`/social/disconnect/${accountId}`, {
      method: 'DELETE',
    });
  },
  
  getAccountStats: async (accountId: string) => {
    return fetchWithAuth(`/social/stats/${accountId}`);
  },
};

// Scheduling API
export const schedulingApi = {
  createPost: async (postData: FormData) => {
    return fetchWithAuth('/scheduling/create', {
      method: 'POST',
      body: postData,
      headers: {}, // Let browser set content-type with boundary for FormData
    });
  },
  
  updatePost: async (postId: string, postData: FormData) => {
    return fetchWithAuth(`/scheduling/update/${postId}`, {
      method: 'PUT',
      body: postData,
      headers: {}, // Let browser set content-type with boundary for FormData
    });
  },
  
  deletePost: async (postId: string) => {
    return fetchWithAuth(`/scheduling/delete/${postId}`, {
      method: 'DELETE',
    });
  },
};

// Analytics API
export const analyticsApi = {
  getOverview: async (timeframe: { start_date: string, end_date: string }) => {
    return fetchWithAuth(`/analytics/overview?start_date=${timeframe.start_date}&end_date=${timeframe.end_date}`);
  },
  
  getFollowerGrowth: async (timeframe: { start_date: string, end_date: string }) => {
    return fetchWithAuth(`/analytics/followers?start_date=${timeframe.start_date}&end_date=${timeframe.end_date}`);
  },
  
  getEngagement: async (timeframe: { start_date: string, end_date: string }) => {
    return fetchWithAuth(`/analytics/engagement?start_date=${timeframe.start_date}&end_date=${timeframe.end_date}`);
  },
  
  getTopPosts: async (timeframe: { start_date: string, end_date: string }, limit: number = 10) => {
    return fetchWithAuth(`/analytics/top-posts?start_date=${timeframe.start_date}&end_date=${timeframe.end_date}&limit=${limit}`);
  },
};