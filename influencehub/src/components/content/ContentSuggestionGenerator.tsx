import React, { useState } from 'react';
import { ContentSuggestionForm } from './ContentSuggestionForm';
import { ContentSuggestionCard } from './ContentSuggestionCard';
import { useContentSuggestions } from '../../hooks/useContentSuggestions';

interface ContentSuggestion {
  id: string;
  text: string;
  hashtags?: string[];
  platform: string;
  tone: string;
  estimatedEngagement: number;
}

interface ContentSuggestionGeneratorProps {
  onSelectSuggestion: (suggestion: ContentSuggestion) => void;
}

export const ContentSuggestionGenerator: React.FC<ContentSuggestionGeneratorProps> = ({
  onSelectSuggestion
}) => {
  const { suggestions, loading, error, generateSuggestions } = useContentSuggestions();
  
  const handleSubmit = async (request: {
    platform: string;
    topic?: string;
    tone?: string;
    length?: 'short' | 'medium' | 'long';
    includeHashtags?: boolean;
  }) => {
    await generateSuggestions(request);
  };
  
  const handleUseSuggestion = (suggestion: ContentSuggestion) => {
    onSelectSuggestion(suggestion);
  };
  
  return (
    <div className="space-y-6">
      <ContentSuggestionForm onSubmit={handleSubmit} loading={loading} />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {!loading && suggestions.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">AI-Generated Suggestions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestions.map((suggestion) => (
              <ContentSuggestionCard
                key={suggestion.id}
                suggestion={suggestion}
                onUse={handleUseSuggestion}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};