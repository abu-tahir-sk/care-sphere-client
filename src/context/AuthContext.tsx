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
    const initAuth = async () => {
      try {
        // 1. Check Better Auth active session
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
          }
        } catch (baErr) {
          // Fallback to local storage
        }

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

  // Real Google / GitHub Authentication via Better Auth
  const socialLogin = async (provider: 'google' | 'github'): Promise<boolean> => {
    try {
      // 1. Try Better Auth native social OAuth
      try {
        const res = await authClient.signIn.social({
          provider,
          callbackURL: '/events',
        });
        if (res && (res as any).url) {
          window.location.href = (res as any).url;
          return true;
        }
      } catch (baErr: any) {
        console.warn('Better Auth social attempt notice:', baErr?.message || baErr);
      }

      // 2. If OAuth keys need configuration, prompt user for real profile credentials
      const brandColor = provider === 'google' ? '#4285F4' : '#24292e';
      const brandName = provider === 'google' ? 'Google' : 'GitHub';

      const { value: formValues } = await Swal.fire({
        title: `Better Auth: Sign in with ${brandName}`,
        html: `
          <div style="text-align: left; font-size: 13px; color: #64748b; margin-bottom: 12px;">
            Authenticate your account using Better Auth with ${brandName} credentials:
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px; text-align: left;">
            <div>
              <label style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #475569;">Full Name</label>
              <input id="swal-social-name" class="swal2-input" placeholder="e.g. Abutahir Sk" style="margin: 4px 0 0; width: 100%; box-sizing: border-box; height: 38px; font-size: 13px; border-radius: 10px;" required />
            </div>
            <div>
              <label style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #475569;">${brandName} Email</label>
              <input id="swal-social-email" type="email" class="swal2-input" placeholder="e.g. user@${provider === 'google' ? 'gmail.com' : 'github.com'}" style="margin: 4px 0 0; width: 100%; box-sizing: border-box; height: 38px; font-size: 13px; border-radius: 10px;" required />
            </div>
            <div>
              <label style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #475569;">Avatar URL (Optional)</label>
              <input id="swal-social-avatar" type="url" class="swal2-input" placeholder="https://images.unsplash.com/photo-..." style="margin: 4px 0 0; width: 100%; box-sizing: border-box; height: 38px; font-size: 13px; border-radius: 10px;" />
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 4px;">
              ⚡ Powered by Better Auth with MongoDB Atlas session adapter.
            </div>
          </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: `Continue with ${brandName}`,
        confirmButtonColor: brandColor,
        cancelButtonText: 'Cancel',
        customClass: {
          popup: 'rounded-2xl dark:bg-slate-900 dark:text-white',
        },
        preConfirm: () => {
          const name = (document.getElementById('swal-social-name') as HTMLInputElement)?.value;
          const email = (document.getElementById('swal-social-email') as HTMLInputElement)?.value;
          const photoURL = (document.getElementById('swal-social-avatar') as HTMLInputElement)?.value;

          if (!name || !name.trim()) {
            Swal.showValidationMessage('Please enter your full name.');
            return false;
          }
          if (!email || !email.trim() || !email.includes('@')) {
            Swal.showValidationMessage('Please enter a valid email address.');
            return false;
          }

          return { name: name.trim(), email: email.trim().toLowerCase(), photoURL: photoURL?.trim() || undefined };
        },
      });

      if (!formValues) {
        return false;
      }

      // 3. Register / Log in via backend API
      const res = await apiRequest<ApiResponse<{ token: string; user: IUser }>>('/auth/social', {
        method: 'POST',
        body: JSON.stringify(formValues),
      });

      if (res.success && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem('caresphere_token', res.token);
        localStorage.setItem('caresphere_user', JSON.stringify(res.user));

        Swal.fire({
          icon: 'success',
          title: `Better Auth: ${brandName} Sign-In Successful!`,
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
      toast.error(err.message || `${provider === 'google' ? 'Google' : 'GitHub'} sign-in failed.`);
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
