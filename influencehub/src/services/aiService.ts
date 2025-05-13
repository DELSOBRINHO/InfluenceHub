import axios from 'axios';

import { ContentSuggestionRequest, ContentSuggestion } from '../types/content';

export const aiService = {
  async generateContentSuggestions(
    request: ContentSuggestionRequest
  ): Promise<ContentSuggestion[]> {
    try {
      // In a real implementation, this would call an actual AI API
      // For now, we'll simulate a response with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response based on the platform
      const suggestions: ContentSuggestion[] = [];
      
      const tones = request.tone ? [request.tone] : ['casual', 'professional', 'enthusiastic'];
      const selectedTone = tones[Math.floor(Math.random() * tones.length)];
      
      // Generate 3 suggestions
      for (let i = 0; i < 3; i++) {
        const suggestion: ContentSuggestion = {
          id: `suggestion-${Date.now()}-${i}`,
          text: generateSampleText(request.platform, selectedTone, request.topic),
          platform: request.platform,
          tone: selectedTone,
          estimatedEngagement: 70 + Math.floor(Math.random() * 20)
        };
        
        if (request.includeHashtags) {
          suggestion.hashtags = generateHashtags(request.platform, request.topic);
        }
        
        suggestions.push(suggestion);
      }
      
      return suggestions;
    } catch (error) {
      console.error('Error generating content suggestions:', error);
      throw new Error('Failed to generate content suggestions');
    }
  }
};

// Helper functions to generate sample content
function generateSampleText(platform: string, tone: string, topic?: string): string {
  const topicText = topic || 'your niche';
  
  const templates = {
    casual: [
      `Just sharing some thoughts about ${topicText} today! What's your take?`,
      `Can't believe how much ${topicText} has changed lately. Anyone else notice this?`,
      `Quick update on my journey with ${topicText}. So many lessons learned!`
    ],
    professional: [
      `I've been analyzing trends in ${topicText} and wanted to share my insights with you all.`,
      `Three key strategies I've discovered for success in ${topicText} that might benefit you too.`,
      `The landscape of ${topicText} is evolving rapidly. Here's what you need to know to stay ahead.`
    ],
    enthusiastic: [
      `OMG! Just discovered an AMAZING hack for ${topicText}! You HAVE to try this! 🔥`,
      `I'm OBSESSED with these new developments in ${topicText}! Game-changer alert! ✨`,
      `HUGE news for anyone interested in ${topicText}! This literally changed everything for me! 🚀`
    ]
  };
  
  const platformAdjustments = {
    instagram: ' #instagood',
    twitter: ' (Thread 1/5)',
    tiktok: ' #tiktoktips',
    youtube: ' WATCH TILL THE END!',
    facebook: ''
  };
  
  const selectedTemplate = templates[tone as keyof typeof templates][Math.floor(Math.random() * 3)];
  return selectedTemplate + (platformAdjustments[platform as keyof typeof platformAdjustments] || '');
}

function generateHashtags(platform: string, topic?: string): string[] {
  const topicText = topic || 'content';
  const baseHashtags = ['#influencer', `#${topicText.replace(/\s+/g, '')}`, '#contentcreator'];
  
  const platformSpecificHashtags = {
    instagram: ['#instaworthy', '#instadaily', '#igcommunity'],
    twitter: ['#twittercommunity', '#tweetdeck', '#twittermarketing'],
    tiktok: ['#tiktoktrend', '#fyp', '#tiktokcreator'],
    youtube: ['#youtuber', '#subscribe', '#youtubechannel'],
    facebook: ['#facebooklive', '#facebookmarketing', '#facebookcommunity']
  };
  
  return [
    ...baseHashtags,
    ...(platformSpecificHashtags[platform as keyof typeof platformSpecificHashtags] || [])
  ];
}