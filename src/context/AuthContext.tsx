'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IUser, ApiResponse } from '@/types';
import { apiRequest } from '@/lib/api';
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
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem('caresphere_token');
        const storedUser = localStorage.getItem('caresphere_user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));

          // Silently re-verify token with backend
          try {
            const res = await apiRequest<ApiResponse<{ user: IUser }>>('/auth/me');
            if (res.success && res.user) {
              setUser(res.user);
              localStorage.setItem('caresphere_user', JSON.stringify(res.user));
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
          text: `Signed in successfully as ${res.user.name}.`,
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
          text: 'Welcome to CareSphere! Together we can empower our community.',
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

  // Google / GitHub login simulation
  const socialLogin = async (provider: 'google' | 'github'): Promise<boolean> => {
    try {
      const mockSocialProfile =
        provider === 'google'
          ? {
              name: 'Dr. Shahriar Alam (Google)',
              email: 'shahriar.care@gmail.com',
              photoURL:
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
            }
          : {
              name: 'Farhana Akter (GitHub)',
              email: 'farhana.dev@github.com',
              photoURL:
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
            };

      const res = await apiRequest<ApiResponse<{ token: string; user: IUser }>>('/auth/social', {
        method: 'POST',
        body: JSON.stringify(mockSocialProfile),
      });

      if (res.success && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem('caresphere_token', res.token);
        localStorage.setItem('caresphere_user', JSON.stringify(res.user));

        Swal.fire({
          icon: 'success',
          title: `${provider.toUpperCase()} Login Successful!`,
          text: `Welcome to CareSphere, ${res.user.name}!`,
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
      toast.error(err.message || 'Social sign-in failed.');
      return false;
    }
  };

  const logout = () => {
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
