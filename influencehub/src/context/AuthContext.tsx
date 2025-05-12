import React, { createContext, useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { getCurrentUser, signIn, signOut, signUp } from '../services/authService';
import type { SignInCredentials, SignUpCredentials } from '../services/authService';

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser || null);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleSignIn = async (credentials: SignInCredentials) => {
    const { user } = await signIn(credentials);
    setUser(user);
  };

  const handleSignUp = async (credentials: SignUpCredentials) => {
    const { user } = await signUp(credentials);
    setUser(user);
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
