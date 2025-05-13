import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useScheduling } from '@/hooks/useScheduling';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import { SchedulePostForm } from '@/components/scheduling/SchedulePostForm';
import { ScheduledPostCard } from '@/components/scheduling/ScheduledPostCard';
import { ScheduledPost, ScheduleFormData } from '@/types/scheduling';

export default function SchedulingPage() {
  const { user } = useAuth();
  const userId = user?.id;
  
  const { accounts } = useSocialAccounts(userId);
  const { 
    scheduledPosts, 
    loading, 
    error, 
    submitting, 
    schedulePost, 
    updateScheduledPost, 
    deleteScheduledPost 
  } = useScheduling(userId);
  
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<ScheduledPost | null>(null);
  
  const connectedPlatforms = accounts.map(account => account.platform);
  
  const handleSubmit = async (formData: ScheduleFormData) => {
    let result;
    
    if (editingPost) {
      result = await updateScheduledPost(editingPost.id, formData);
      if (!result.error) {
        setEditingPost(null);
      }
    } else {
      result = await schedulePost(formData);
      if (!result.error) {
        setShowForm(false);
      }
    }
    
    return result;
  };
  
  const handleEdit = (post: ScheduledPost) => {
    setEditingPost(post);
    setShowForm(true);
  };
  
  const handleDelete = async (postId: string) => {
    const result = await deleteScheduledPost(postId);
    if (result.error) {
      alert(`Error deleting post: ${result.error}`);
    }
  };
  
  const handleCancel = () => {
    setShowForm(false);
    setEditingPost(null);
  };
  
  if (!userId) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Please log in to schedule posts</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Content Scheduling</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Schedule New Post
          </button>
        )}
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
          <p>Error: {error}</p>
        </div>
      )}
      
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {editingPost ? 'Edit Scheduled Post' : 'Schedule New Post'}
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
          
          <SchedulePostForm
            onSubmit={handleSubmit}
            initialData={editingPost ? {
              platform: editingPost.platform,
              content: editingPost.content,
              scheduled_for: new Date(editingPost.scheduled_for).toISOString().slice(0, 16)
            } : undefined}
            submitting={submitting}
            connectedPlatforms={connectedPlatforms}
          />
        </div>
      )}
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Upcoming Posts</h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden shadow-sm animate-pulse">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/6"></div>
                  </div>
                  <div className="h-16 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="flex justify-end">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : scheduledPosts.filter(post => post.status === 'scheduled').length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-4">You don't have any upcoming posts scheduled.</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Schedule Your First Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scheduledPosts
              .filter(post => post.status === 'scheduled')
              .sort((a, b) => new Date(a.scheduled_for).getTime() - new Date(b.scheduled_for).getTime())
              .map(post => (
                <ScheduledPostCard
                  key={post.id}
                  post={post}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
          </div>
        )}
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-4">Post History</h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden shadow-sm animate-pulse">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/6"></div>
                  </div>
                  <div className="h-16 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="flex justify-end">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : scheduledPosts.filter(post => post.status !== 'scheduled').length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">No post history yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scheduledPosts
              .filter(post => post.status !== 'scheduled')
              .sort((a, b) => new Date(b.scheduled_for).getTime() - new Date(a.scheduled_for).getTime())
              .map(post => (
                <ScheduledPostCard
                  key={post.id}
                  post={post}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}