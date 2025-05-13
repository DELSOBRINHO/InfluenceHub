import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { SocialAccount, ConnectAccountResponse } from '@/types/social';

export const useSocialAccounts = (userId: string | undefined) => {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!userId) {
      setAccounts([]);
      setLoading(false);
      return;
    }
    
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('social_accounts')
          .select('*')
          .eq('user_id', userId);
          
        if (error) {
          throw error;
        }
        
        setAccounts(data || []);
      } catch (err: any) {
        console.error('Error fetching social accounts:', err);
        setError(err.message || 'Failed to fetch social accounts');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAccounts();
  }, [userId]);
  
  const connectAccount = async (platform: string, authCode: string): Promise<ConnectAccountResponse> => {
    if (!userId) {
      return { success: false, error: 'User not authenticated' };
    }
    
    try {
      setError(null);
      
      // In a real app, this would call your backend API to handle OAuth flow
      // For this example, we'll simulate the connection process
      const { data, error } = await supabase.functions.invoke('connect-social-account', {
        body: { platform, authCode, userId },
      });
      
      if (error) {
        throw error;
      }
      
      if (data.account) {
        setAccounts(prev => [...prev, data.account]);
        return { success: true, account: data.account };
      } else {
        throw new Error('Failed to connect account');
      }
    } catch (err: any) {
      console.error('Error connecting account:', err);
      setError(err.message || 'Failed to connect account');
      return { success: false, error: err.message || 'Failed to connect account' };
    }
  };
  
  const disconnectAccount = async (accountId: string): Promise<boolean> => {
    if (!userId) {
      setError('User not authenticated');
      return false;
    }
    
    try {
      setError(null);
      
      const { error } = await supabase
        .from('social_accounts')
        .delete()
        .eq('id', accountId)
        .eq('user_id', userId);
        
      if (error) {
        throw error;
      }
      
      setAccounts(prev => prev.filter(account => account.id !== accountId));
      return true;
    } catch (err: any) {
      console.error('Error disconnecting account:', err);
      setError(err.message || 'Failed to disconnect account');
      return false;
    }
  };
  
  return {
    accounts,
    loading,
    error,
    connectAccount,
    disconnectAccount,
  };
};