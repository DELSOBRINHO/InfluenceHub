import React, { createContext, useState, useEffect, useContext } from "react";
import { getCurrentUser, signIn, signOut, signUp } from "@/lib/auth";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for user on mount
    const checkUser = async () => {
      try {
        setLoading(true);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err: any) {
        console.error("Error checking authentication:", err.message);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { user } = await signIn(email, password);
      setUser(user);
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { user } = await signUp(email, password);
      setUser(user);
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      setError(null);
      await signOut();
      setUser(null);
    } catch (err: any) {
      setError(err.message || "Failed to sign out");
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;