import { useState } from 'react';
import { aiService } from '../services/aiService';
import { ContentSuggestionRequest, ContentSuggestion } from '../types/content';

export const useContentSuggestions = () => {
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSuggestions = async (request: ContentSuggestionRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const newSuggestions = await aiService.generateContentSuggestions(request);
      setSuggestions(newSuggestions);
      return newSuggestions;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate content suggestions';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const clearSuggestions = () => {
    setSuggestions([]);
  };

  return {
    suggestions,
    loading,
    error,
    generateSuggestions,
    clearSuggestions
  };
};