'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IUser, ApiResponse } from '@/types';
import { apiRequest } from '@/lib/api';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, photoURL?: string) => Promise<boolean>;
  socialLogin: (provider: 'google' | 'github') => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUser: Partial<IUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize auth state on mount (avoids redirect on page reload)
  useEffect(() => {
    // 1. Immediately hydrate from localStorage synchronously to eliminate user logo flickering
    let activeToken: string | null = null;
    try {
      activeToken = localStorage.getItem('caresphere_token');
      const storedUser = localStorage.getItem('caresphere_user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (!parsed.photoURL || typeof parsed.photoURL !== 'string' || !parsed.photoURL.trim()) {
          parsed.photoURL =
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
        }
        setUser(parsed);
        if (activeToken) setToken(activeToken);
        setIsLoading(false);
      }
    } catch (e) {
      // ignore
    }

    const initAuth = async () => {
      try {
        // 2. Check Better Auth active session
        if (!activeToken) {
          activeToken = localStorage.getItem('caresphere_token');
        }

        try {
          const session = await authClient.getSession();
          if (session?.data?.user) {
            const baUser = session.data.user;
            const appUser: IUser = {
              id: baUser.id,
              name: baUser.name,
              email: baUser.email,
              photoURL:
                baUser.image ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
              role: 'volunteer',
              createdAt: baUser.createdAt ? new Date(baUser.createdAt).toISOString() : new Date().toISOString(),
            };
            setUser(appUser);
            localStorage.setItem('caresphere_user', JSON.stringify(appUser));

            // Synchronize JWT token with backend if not already stored
            if (!activeToken && baUser.email) {
              try {
                const res = await apiRequest<ApiResponse<{ token: string; user: IUser }>>('/auth/social', {
                  method: 'POST',
                  body: JSON.stringify({
                    name: baUser.name,
                    email: baUser.email,
                    photoURL: baUser.image || undefined,
                  }),
                });
                if (res.success && res.token) {
                  activeToken = res.token;
                  setToken(res.token);
                  localStorage.setItem('caresphere_token', res.token);
                  if (res.user) {
                    setUser(res.user);
                    localStorage.setItem('caresphere_user', JSON.stringify(res.user));
                  }
                }
              } catch (syncErr) {
                console.warn('Backend session token sync notice:', syncErr);
              }
            }
          }
        } catch (baErr) {
          // Fallback to local storage
        }

        const storedToken = activeToken || localStorage.getItem('caresphere_token');
        const storedUser = localStorage.getItem('caresphere_user');

        if (storedToken && storedUser) {
          const parsed = JSON.parse(storedUser);
          if (!parsed.photoURL || typeof parsed.photoURL !== 'string' || !parsed.photoURL.trim()) {
            parsed.photoURL = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
          }
          setToken(storedToken);
          setUser((prev) => (prev ? { ...parsed, photoURL: prev.photoURL || parsed.photoURL } : parsed));

          // Silently re-verify token with backend
          try {
            const res = await apiRequest<ApiResponse<{ user: IUser }>>('/auth/me');
            if (res.success && res.user) {
              const freshUser = {
                ...res.user,
                photoURL: res.user.photoURL || parsed.photoURL,
              };
              setUser(freshUser);
              localStorage.setItem('caresphere_user', JSON.stringify(freshUser));
            }
          } catch (err) {
            console.warn('Session verification fallback to stored user:', err);
          }
        }
      } catch (err) {
        console.error('Error reading auth storage:', err);
        localStorage.removeItem('caresphere_token');
        localStorage.removeItem('caresphere_user');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // 1. Better Auth sign-in
      try {
        await authClient.signIn.email({
          email,
          password,
        });
      } catch (baErr) {
        console.warn('Better Auth client sign in note:', baErr);
      }

      // 2. Synchronize with API token
      const res = await apiRequest<ApiResponse<{ token: string; user: IUser }>>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (res.success && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem('caresphere_token', res.token);
        localStorage.setItem('caresphere_user', JSON.stringify(res.user));

        Swal.fire({
          icon: 'success',
          title: 'Welcome Back!',
          text: `Signed in successfully via Better Auth as ${res.user.name}.`,
          timer: 2200,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-2xl dark:bg-slate-900 dark:text-white',
          },
        });
        return true;
      }
      return false;
    } catch (err: any) {
      toast.error(err.message || 'Login failed. Please check your credentials.');
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    photoURL?: string
  ): Promise<boolean> => {
    try {
      // 1. Better Auth sign-up
      try {
        await authClient.signUp.email({
          name,
          email,
          password,
          image: photoURL,
        });
      } catch (baErr) {
        console.warn('Better Auth sign up note:', baErr);
      }

      // 2. Synchronize with API token
      const res = await apiRequest<ApiResponse<{ token: string; user: IUser }>>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, photoURL }),
      });

      if (res.success && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem('caresphere_token', res.token);
        localStorage.setItem('caresphere_user', JSON.stringify(res.user));

        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'Account created with Better Auth! Welcome to CareSphere.',
          timer: 2500,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-2xl dark:bg-slate-900 dark:text-white',
          },
        });
        return true;
      }
      return false;
    } catch (err: any) {
      toast.error(err.message || 'Registration failed.');
      return false;
    }
  };

  // Direct Native Google / GitHub Authentication via Better Auth
  const socialLogin = async (provider: 'google' | 'github'): Promise<boolean> => {
    try {
      const res: any = await authClient.signIn.social({
        provider,
        callbackURL: '/events',
      });
      if (res?.error) {
        console.error(`${provider} sign-in error:`, res.error);
        toast.error(res.error.message || `Failed to sign in with ${provider}.`);
        return false;
      }
      if (res?.data?.url) {
        window.location.href = res.data.url;
        return true;
      }
      if (res && res.url) {
        window.location.href = res.url;
        return true;
      }
      return true;
    } catch (err: any) {
      console.error(`${provider} sign-in failed:`, err);
      toast.error(err?.message || `Failed to sign in with ${provider}. Check your OAuth configuration.`);
      return false;
    }
  };

  const logout = async () => {
    try {
      await authClient.signOut();
    } catch (err) {
      console.warn('Better Auth sign out notice:', err);
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('caresphere_token');
    localStorage.removeItem('caresphere_user');
    toast.success('Logged out successfully.');
  };

  const updateUser = (updatedUser: Partial<IUser>) => {
    setUser((prev) => {
      if (!prev) return null;
      const merged = { ...prev, ...updatedUser };
      localStorage.setItem('caresphere_user', JSON.stringify(merged));
      return merged;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        socialLogin,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
