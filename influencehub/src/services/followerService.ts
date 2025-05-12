import { supabase } from '../lib/supabase';
import { type Follower } from '../types/supabase';

export const getFollowers = async (): Promise<Follower[]> => {
  const { data, error } = await supabase
    .from('followers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching followers:', error);
    throw error;
  }

  return data || [];
};

export const getFollowerById = async (id: string): Promise<Follower | null> => {
  const { data, error } = await supabase
    .from('followers')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching follower with id ${id}:`, error);
    throw error;
  }

  return data;
};

export const updateFollowerVipStatus = async (id: string, isVip: boolean): Promise<void> => {
  const { error } = await supabase
    .from('followers')
    .update({ is_vip: isVip })
    .eq('id', id);

  if (error) {
    console.error(`Error updating VIP status for follower ${id}:`, error);
    throw error;
  }
};
