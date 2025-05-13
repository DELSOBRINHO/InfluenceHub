import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ScheduledPost, ScheduleFormData, SchedulePostResponse } from '@/types/scheduling';

export const useScheduling = (userId: string | undefined) => {
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!userId) {
      setScheduledPosts([]);
      setLoading(false);
      return;
    }
    
    const fetchScheduledPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('scheduled_posts')
          .select('*')
          .eq('user_id', userId);
          
        if (error) {
          throw error;
        }
        
        setScheduledPosts(data || []);
      } catch (err: any) {
        console.error('Error fetching scheduled posts:', err);
        setError(err.message || 'Failed to fetch scheduled posts');
      } finally {
        setLoading(false);
      }
    };
    
    fetchScheduledPosts();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('scheduled_posts_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'scheduled_posts',
        filter: `user_id=eq.${userId}`
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setScheduledPosts(prev => [...prev, payload.new as ScheduledPost]);
        } else if (payload.eventType === 'UPDATE') {
          setScheduledPosts(prev => 
            prev.map(post => post.id === payload.new.id ? payload.new as ScheduledPost : post)
          );
        } else if (payload.eventType === 'DELETE') {
          setScheduledPosts(prev => 
            prev.filter(post => post.id !== payload.old.id)
          );
        }
      })
      .subscribe();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);
  
  const schedulePost = async (formData: ScheduleFormData): Promise<SchedulePostResponse> => {
    if (!userId) {
      return { success: false, error: 'User not authenticated' };
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      // Upload media files if any
      let mediaUrls: string[] = [];
      
      if (formData.media_files && formData.media_files.length > 0) {
        for (const file of formData.media_files) {
          const fileName = `${userId}/${Date.now()}-${file.name}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('post-media')
            .upload(fileName, file);
            
          if (uploadError) {
            throw uploadError;
          }
          
          const { data: urlData } = supabase.storage
            .from('post-media')
            .getPublicUrl(fileName);
            
          mediaUrls.push(urlData.publicUrl);
        }
      }
      
      // Create the scheduled post
      const { data, error } = await supabase
        .from('scheduled_posts')
        .insert({
          user_id: userId,
          platform: formData.platform,
          content: formData.content,
          media_urls: mediaUrls.length > 0 ? mediaUrls : null,
          scheduled_for: formData.scheduled_for,
          status: 'scheduled',
        })
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      return { success: true, post: data };
    } catch (err: any) {
      console.error('Error scheduling post:', err);
      setError(err.message || 'Failed to schedule post');
      return { success: false, error: err.message || 'Failed to schedule post' };
    } finally {
      setSubmitting(false);
    }
  };
  
  // Function to update a scheduled post
  const updateScheduledPost = async (postId: string, formData: ScheduleFormData): Promise<SchedulePostResponse> => {
    if (!userId) {
      return { success: false, error: 'User not authenticated' };
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      // Get the existing post to check if we need to update media
      const { data: existingPost, error: fetchError } = await supabase
        .from('scheduled_posts')
        .select('*')
        .eq('id', postId)
        .eq('user_id', userId)
        .single();
        
      if (fetchError) {
        throw fetchError;
      }
      
      // Upload new media files if any
      let mediaUrls = existingPost.media_urls || [];
      
      if (formData.media_files && formData.media_files.length > 0) {
        // Clear existing media if we're uploading new ones
        mediaUrls = [];
        
        for (const file of formData.media_files) {
          const fileName = `${userId}/${Date.now()}-${file.name}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('post-media')
            .upload(fileName, file);
            
          if (uploadError) {
            throw uploadError;
          }
          
          const { data: urlData } = supabase.storage
            .from('post-media')
            .getPublicUrl(fileName);
            
          mediaUrls.push(urlData.publicUrl);
        }
      }
      
      // Update the scheduled post
      const { data, error } = await supabase
        .from('scheduled_posts')
        .update({
          platform: formData.platform,
          content: formData.content,
          media_urls: mediaUrls.length > 0 ? mediaUrls : null,
          scheduled_for: formData.scheduled_for,
          updated_at: new Date().toISOString(),
        })
        .eq('id', postId)
        .eq('user_id', userId)
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      return { success: true, post: data };
    } catch (err: any) {
      console.error('Error updating scheduled post:', err);
      setError(err.message || 'Failed to update scheduled post');
      return { success: false, error: err.message || 'Failed to update scheduled post' };
    } finally {
      setSubmitting(false);
    }
  };
  
  // Function to delete a scheduled post
  const deleteScheduledPost = async (postId: string): Promise<{ success: boolean, error?: string }> => {
    if (!userId) {
      return { success: false, error: 'User not authenticated' };
    }
    
    try {
      setError(null);
      
      const { error } = await supabase
        .from('scheduled_posts')
        .delete()
        .eq('id', postId)
        .eq('user_id', userId);
        
      if (error) {
        throw error;
      }
      
      return { success: true };
    } catch (err: any) {
      console.error('Error deleting scheduled post:', err);
      setError(err.message || 'Failed to delete scheduled post');
      return { success: false, error: err.message || 'Failed to delete scheduled post' };
    }
  };
  
  return {
    scheduledPosts,
    loading,
    submitting,
    error,
    schedulePost,
    updateScheduledPost,
    deleteScheduledPost,
  };
}