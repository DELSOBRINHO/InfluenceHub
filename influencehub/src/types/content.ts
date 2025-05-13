export interface ContentSuggestionRequest {
    platform: string;
    topic?: string;
    tone?: string;
    length?: 'short' | 'medium' | 'long';
    includeHashtags?: boolean;
  }
  
  export interface ContentSuggestion {
    id: string;
    text: string;
    hashtags?: string[];
    platform: string;
    tone: string;
    estimatedEngagement: number;
  }