import React from 'react';
import { SocialAccount } from '@/types/socialMedia';

interface SocialAccountCardProps {
  account: SocialAccount;
  onDisconnect: (accountId: string) => Promise<{ success?: boolean, error?: string }>;
}

export const SocialAccountCard: React.FC<SocialAccountCardProps> = ({ account, onDisconnect }) => {
  const [isDisconnecting, setIsDisconnecting] = React.useState(false);
  
  const handleDisconnect = async () => {
    if (confirm(`Are you sure you want to disconnect your ${account.platform} account?`)) {
      setIsDisconnecting(true);
      const result = await onDisconnect(account.id);
      setIsDisconnecting(false);
      
      if (result.error) {
        alert(`Error disconnecting account: ${result.error}`);
      }
    }
  };
  
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'twitter': return 'bg-blue-400';
      case 'tiktok': return 'bg-black';
      case 'youtube': return 'bg-red-600';
      case 'facebook': return 'bg-blue-600';
      default: return 'bg-gray-500';
    }
  };
  
  const getPlatformIcon = (platform: string) => {
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
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className={`${getPlatformColor(account.platform)} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getPlatformIcon(account.platform)}</span>
            <h3 className="font-bold capitalize">{account.platform}</h3>
          </div>
          <button
            onClick={handleDisconnect}
            disabled={isDisconnecting}
            className="text-sm bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full transition-colors"
          >
            {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          {account.avatar_url ? (
            <img 
              src={account.avatar_url} 
              alt={account.username} 
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">{account.username.charAt(0).toUpperCase()}</span>
            </div>
          )}
          <div>
            <p className="font-medium">@{account.username}</p>
            <p className="text-sm text-gray-500">
              Connected on {new Date(account.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <div>
            <p className="font-medium">{account.followers_count?.toLocaleString() || '0'}</p>
            <p>Followers</p>
          </div>
          <div>
            <p className="font-medium">{account.following_count?.toLocaleString() || '0'}</p>
            <p>Following</p>
          </div>
          <div>
            <p className="font-medium">
              {account.last_synced_at 
                ? new Date(account.last_synced_at).toLocaleDateString() 
                : 'Never'}
            </p>
            <p>Last Synced</p>
          </div>
        </div>
      </div>
    </div>
  );
};