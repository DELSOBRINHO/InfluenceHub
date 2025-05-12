import { createClient } from '@supabase/supabase-js';

// Use environment variables or fallback to hardcoded values for development
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://kawibcwprsqxyundxbmp.supabase.co';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imthd2liY3dwcnNxeHl1bmR4Ym1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3Njk4OTIsImV4cCI6MjA2MjM0NTg5Mn0.dxCAtfBZLVI18YoKUkLU5Fbzb63qQ5mKOmtB0eGivRc';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
