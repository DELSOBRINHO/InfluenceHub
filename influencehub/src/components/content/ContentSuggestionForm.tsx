import React, { useState } from 'react';
import { ContentSuggestionRequest } from '../../types/content';

interface ContentSuggestionFormProps {
  onSubmit: (request: ContentSuggestionRequest) => void;
  loading: boolean;
}

export const ContentSuggestionForm: React.FC<ContentSuggestionFormProps> = ({
  onSubmit,
  loading
}) => {
  const [platform, setPlatform] = useState('instagram');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [includeHashtags, setIncludeHashtags] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      platform,
      topic: topic || undefined,
      tone: tone || undefined,
      length,
      includeHashtags
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Generate Content Suggestions</h2>
      
      <div className="mb-4">
        <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-1">
          Platform
        </label>
        <select
          id="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="instagram">Instagram</option>
          <option value="twitter">Twitter</option>
          <option value="tiktok">TikTok</option>
          <option value="youtube">YouTube</option>
          <option value="facebook">Facebook</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
          Topic (optional)
        </label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., fitness, cooking, travel"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-1">
          Tone (optional)
        </label>
        <select
          id="tone"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Any tone</option>
          <option value="casual">Casual</option>
          <option value="professional">Professional</option>
          <option value="enthusiastic">Enthusiastic</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">
          Content Length
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="short"
              checked={length === 'short'}
              onChange={() => setLength('short')}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700">Short</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="medium"
              checked={length === 'medium'}
              onChange={() => setLength('medium')}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700">Medium</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="long"
              checked={length === 'long'}
              onChange={() => setLength('long')}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700">Long</span>
          </label>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={includeHashtags}
            onChange={(e) => setIncludeHashtags(e.target.checked)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="ml-2 text-sm text-gray-700">Include relevant hashtags</span>
        </label>
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
          loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      >
        {loading ? 'Generating...' : 'Generate Suggestions'}
      </button>
    </form>
  );
};