import React, { useState } from 'react';
import { ContentSuggestionGenerator } from '../components/content/ContentSuggestionGenerator';
import { useNavigate } from 'react-router-dom';

interface ContentSuggestion {
  id: string;
  text: string;
  hashtags?: string[];
  platform: string;
  tone: string;
  estimatedEngagement: number;
}

const ContentSuggestionsPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSelectSuggestion = (suggestion: ContentSuggestion) => {
    // In a real app, we would probably save this to a draft or directly to the scheduling system
    // For now, we'll just navigate to the post creation page with the content pre-filled
    navigate('/create-post', { 
      state: { 
        content: suggestion.text,
        hashtags: suggestion.hashtags,
        platform: suggestion.platform
      } 
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">AI Content Suggestions</h1>
      <p className="text-gray-600 mb-8">
        Let our AI help you create engaging content for your social media platforms.
        Specify your preferences and get personalized content suggestions.
      </p>
      
      <ContentSuggestionGenerator onSelectSuggestion={handleSelectSuggestion} />
    </div>
  );
};

export default ContentSuggestionsPage;