import React from 'react';
import { ContentSuggestion } from '../../types/content';

interface ContentSuggestionCardProps {
  suggestion: ContentSuggestion;
  onUse: (suggestion: ContentSuggestion) => void;
}

export const ContentSuggestionCard: React.FC<ContentSuggestionCardProps> = ({
  suggestion,
  onUse
}) => {
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return '📸';
      case 'twitter': return '🐦';
      case 'tiktok': return '🎵';
      case 'youtube': return '📹';
      case 'facebook': return '👍';
      default: return '🌐';
    }
  };
  
  const getEngagementColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    return 'text-yellow-600';
  };
  
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <span className="text-xl mr-2">{getPlatformIcon(suggestion.platform)}</span>
            <span className="font-medium capitalize">{suggestion.platform}</span>
          </div>
          <div className="flex items-center">
            <span className="text-xs font-medium mr-1">Tone:</span>
            <span className="text-xs capitalize">{suggestion.tone}</span>
          </div>
        </div>
        
        <p className="text-gray-800 mb-3">{suggestion.text}</p>
       
        
        {suggestion.hashtags && suggestion.hashtags.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {suggestion.hashtags.map((hashtag, index) => (
                <span 
                  key={index} 
                  className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-medium text-gray-800"
                >
                  {hashtag}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <span className="text-xs font-medium mr-1">Est. Engagement:</span>
            <span className={`text-xs font-bold ${getEngagementColor(suggestion.estimatedEngagement)}`}>
              {suggestion.estimatedEngagement}%
            </span>
          </div>
          
          <button
            onClick={() => onUse(suggestion)}
            className="px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
          >
            Use This
          </button>
        </div>
      </div>
    </div>
  );
};