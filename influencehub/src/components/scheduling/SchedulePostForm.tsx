import React, { useState } from 'react';
import { ScheduleFormData } from '@/types/scheduling';

interface SchedulePostFormProps {
  onSubmit: (formData: ScheduleFormData) => Promise<{ data?: any, error?: string }>;
  initialData?: Partial<ScheduleFormData>;
  submitting: boolean;
  connectedPlatforms: string[];
}

export const SchedulePostForm: React.FC<SchedulePostFormProps> = ({
  onSubmit,
  initialData,
  submitting,
  connectedPlatforms
}) => {
  const [formData, setFormData] = useState<ScheduleFormData>({
    platform: initialData?.platform || (connectedPlatforms.length > 0 ? connectedPlatforms[0] : ''),
    content: initialData?.content || '',
    scheduled_for: initialData?.scheduled_for || new Date(Date.now() + 3600000).toISOString().slice(0, 16), // 1 hour from now
    media_files: []
  });
  
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      
      // Create preview URLs
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
      
      // Update form data
      setFormData(prev => ({
        ...prev,
        media_files: [...(prev.media_files || []), ...files]
      }));
    }
  };
  
  const removeFile = (index: number) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      media_files: prev.media_files?.filter((_, i) => i !== index)
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.platform) {
      setError('Please select a platform');
      return;
    }
    
    if (!formData.content && (!formData.media_files || formData.media_files.length === 0)) {
      setError('Please add content or media to your post');
      return;
    }
    
    if (!formData.scheduled_for) {
      setError('Please select a date and time for your post');
      return;
    }
    
    const result = await onSubmit(formData);
    
    if (result.error) {
      setError(result.error);
    }
  };
  
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
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-1">
          Platform
        </label>
        <select
          id="platform"
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          disabled={submitting || connectedPlatforms.length === 0}
        >
          {connectedPlatforms.length === 0 ? (
            <option value="">No platforms connected</option>
          ) : (
            connectedPlatforms.map(platform => (
              <option key={platform} value={platform}>
                {getPlatformIcon(platform)} {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </option>
            ))
          )}
        </select>
        {connectedPlatforms.length === 0 && (
          <p className="mt-1 text-sm text-red-500">
            Please connect at least one social media platform first.
          </p>
        )}
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="What's on your mind?"
          disabled={submitting}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Media
        </label>
        
        {previewUrls.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img 
                  src={url} 
                  alt={`Preview ${index + 1}`} 
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={submitting}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="media-upload"
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
              submitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
            <input
              id="media-upload"
              type="file"
              className="hidden"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
              disabled={submitting}
            />
          </label>
        </div>
      </div>
      
      <div>
        <label htmlFor="scheduled_for" className="block text-sm font-medium text-gray-700 mb-1">
          Schedule for
        </label>
        <input
          id="scheduled_for"
          name="scheduled_for"
          type="datetime-local"
          value={formData.scheduled_for}
          onChange={handleChange}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          min={new Date().toISOString().slice(0, 16)}
          disabled={submitting}
        />
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            submitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={submitting || connectedPlatforms.length === 0}
        >
          {submitting ? 'Scheduling...' : initialData ? 'Update Post' : 'Schedule Post'}
        </button>
      </div>
    </form>
  );
};