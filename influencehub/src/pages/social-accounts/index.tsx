import React from 'react';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import { useAuth } from '@/context/AuthContext';
import { SocialAccountCard } from '@/components/social/SocialAccountCard';
import { ConnectSocialButton } from '@/components/social/ConnectSocialButton';
import { SocialPlatform } from '@/types/socialMedia';

export default function SocialAccountsPage() {
  const { user } = useAuth();
  const userId = user?.id;
  const { 
    accounts, 
    loading, 
    error, 
    connectAccount, 
    disconnectAccount,
    hasPlatform
  } = useSocialAccounts(userId);
  
  const platforms: SocialPlatform[] = ['instagram', 'twitter', 'tiktok', 'youtube', 'facebook'];
  
  if (!userId) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Please log in to manage your social accounts</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 text-red-800 p-4 rounded-lg">
        <p>Error loading social accounts: {error}</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Social Media Accounts</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Connect Your Accounts</h2>
        <p className="text-gray-600 mb-6">
          Connect your social media accounts to analyze your performance, schedule posts, and grow your audience.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map(platform => (
            <ConnectSocialButton
              key={platform}
              platform={platform}
              onConnect={connectAccount}
              isConnected={hasPlatform(platform)}
            />
          ))}
        </div>
      </div>
      
      <h2 className="text-lg font-semibold mb-4">Connected Accounts</h2>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden shadow-sm animate-pulse">
              <div className="bg-gray-300 h-20"></div>
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : accounts.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">You haven't connected any social media accounts yet.</p>
          <p className="text-gray-600">Connect your accounts above to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map(account => (
            <SocialAccountCard
              key={account.id}
              account={account}
              onDisconnect={disconnectAccount}
            />
          ))}
        </div>
      )}
    </div>
  );
}