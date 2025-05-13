import React from 'react';
import { SocialPlatform } from '@/types/socialMedia';

interface ConnectSocialButtonProps {
  platform: SocialPlatform;
  onConnect: (platform: SocialPlatform) => Promise<{ success?: boolean, message?: string, error?: string }>;
  isConnected: boolean;
}

export const ConnectSocialButton: React.FC<ConnectSocialButtonProps> = ({ 
  platform, 
  onConnect, 
  isConnected 
}) => {
  const [isConnecting, setIsConnecting] = React.useState(false);
  
  const handleConnect = async () => {
    setIsConnecting(true);
    const result = await onConnect(platform);
    setIsConnecting(false);
    
    if (result.error) {
      alert(`Error connecting to ${platform}: ${result.error}`);
    } else if (result.message) {
      alert(result.message);
    }
  };
  
  const getPlatformColor = (platform: SocialPlatform) => {
    switch (platform) {
      case 'instagram': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'twitter': return 'bg-blue-400 hover:bg-blue-500';
      case 'tiktok': return 'bg-black hover:bg-gray-800';
      case 'youtube': return 'bg-red-600 hover:bg-red-700';
      case 'facebook': return 'bg-blue-600 hover:bg-blue-700';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };
  
  const getPlatformIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case 'instagram': return '📸';
      case 'twitter': return '🐦';
      case 'tiktok': return '🎵';
      case 'youtube': return '📹';
      case 'facebook': return '👍';
      default: return '🌐';
    }
  };
  
  return (
    <button
      onClick={handleConnect}
      disabled={isConnected || isConnecting}
      className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-white transition-colors ${
        isConnected 
          ? 'bg-gray-300 cursor-not-allowed' 
          : getPlatformColor(platform)
      }`}
    >
      <span className="text-xl">{getPlatformIcon(platform)}</span>
      <span>
        {isConnected 
          ? `Connected to ${platform}` 
          : isConnecting 
            ? `Connecting to ${platform}...` 
            : `Connect ${platform}`
        }
      </span>
    </button>
  );
};