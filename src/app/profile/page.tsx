'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/lib/api';
import { ApiResponse, IUser } from '@/types';
import {
  User,
  Mail,
  Image as ImageIcon,
  ShieldCheck,
  Save,
  CheckCircle2,
  Calendar,
  Sparkles,
  Award,
  Clock,
  HeartHandshake,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

function ProfileContent() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Display name cannot be empty.');
      return;
    }

    setIsSaving(true);
    try {
      const res = await apiRequest<ApiResponse<{ user: IUser }>>('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify({
          name: name.trim(),
          photoURL: photoURL.trim(),
          bio: bio.trim(),
        }),
      });

      if (res.success && res.user) {
        updateUser(res.user);
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: 'Your profile details and avatar have been saved successfully.',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-2xl dark:bg-slate-900 dark:text-white',
          },
        });
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] transition-colors">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D9F3E5] dark:bg-[#14532D]/40 text-[#14532D] dark:text-[#D9F3E5] border border-[#14532D]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#159A70]" />
            <span>Volunteer Dashboard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101B17] dark:text-[#F7F8F0] tracking-tight">
            My Profile & Impact Card
          </h1>
          <p className="text-sm text-[#101B17]/60 dark:text-[#F7F8F0]/60">
            Track your volunteer standing, verified certificate status, and update your personal details.
          </p>
        </div>

        {/* Profile Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Avatar & Badges */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white dark:bg-[#0F1E16] p-6 rounded-[32px] border border-[#14532D]/15 dark:border-white/10 shadow-sm text-center space-y-4">
              <div className="relative inline-block mx-auto">
                <img
                  src={photoURL || user?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                  alt={user?.name || 'User Profile'}
                  referrerPolicy="no-referrer"
                  className="w-28 h-28 rounded-3xl object-cover shadow-md border-4 border-[#14532D]/20"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';
                  }}
                />
                <span className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-[#14532D] text-white shadow-md">
                  <ShieldCheck className="w-4 h-4 text-[#D9F3E5]" />
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#101B17] dark:text-[#F7F8F0]">
                  {user?.name}
                </h3>
                <p className="text-xs text-[#101B17]/60 dark:text-[#F7F8F0]/60">
                  {user?.email}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#D9F3E5] text-[#14532D] dark:bg-[#14532D]/50 dark:text-[#D9F3E5] border border-[#14532D]/20">
                  <Award className="w-3.5 h-3.5 text-[#159A70]" />
                  <span>Level 2: Community Changemaker</span>
                </div>
              </div>

              {/* Volunteer Impact Badges */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#14532D]/10 dark:border-white/10 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#F7F8F0] dark:bg-[#0A130E] border border-[#14532D]/10 text-left">
                  <p className="font-extrabold text-[#101B17] dark:text-[#F7F8F0] text-base">24 hrs</p>
                  <p className="text-[11px] text-[#101B17]/50 dark:text-[#F7F8F0]/50">Volunteered</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F7F8F0] dark:bg-[#0A130E] border border-[#14532D]/10 text-left">
                  <p className="font-extrabold text-[#101B17] dark:text-[#F7F8F0] text-base">98 pts</p>
                  <p className="text-[11px] text-[#101B17]/50 dark:text-[#F7F8F0]/50">Civic Karma</p>
                </div>
              </div>

              <div className="pt-2 text-left space-y-1.5 text-xs text-[#101B17]/70 dark:text-[#F7F8F0]/70">
                <p className="font-bold text-[#101B17] dark:text-[#F7F8F0]">About Me:</p>
                <p className="italic">{bio || 'Community volunteer passionate about making a difference in local drives.'}</p>
              </div>

              {/* Quick links to certificates & registrations */}
              <div className="pt-2 border-t border-[#14532D]/10 dark:border-white/10">
                <Link
                  href="/joined-events"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-bold text-white bg-[#14532D] hover:bg-[#0F3F22] shadow-sm transition-colors"
                >
                  <Award className="w-4 h-4 text-[#D9F3E5]" />
                  <span>View Joined Events & Certificates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Update Profile Form */}
          <div className="md:col-span-7 bg-white dark:bg-[#0F1E16] p-8 rounded-[32px] border border-[#14532D]/15 dark:border-white/10 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#101B17] dark:text-[#F7F8F0]">
                Personal & Public Info
              </h3>
              <p className="text-xs text-[#101B17]/60 dark:text-[#F7F8F0]/60">
                Update how your name and avatar appear on event organizer rosters and volunteer rosters.
              </p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#101B17] dark:text-[#F7F8F0] flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#159A70]" />
                  Full Display Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#14532D]/15 dark:border-white/10 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] text-sm focus:outline-none focus:border-[#14532D]"
                />
              </div>

              {/* Email (Readonly) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#101B17]/60 dark:text-[#F7F8F0]/60 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-[#101B17]/40 dark:text-[#F7F8F0]/40" />
                  Email Address <span className="text-[10px] text-[#101B17]/40 dark:text-[#F7F8F0]/40">(Linked account - Readonly)</span>
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full px-4 py-3 rounded-2xl border border-[#14532D]/10 dark:border-white/10 bg-[#F7F8F0]/50 dark:bg-white/5 text-[#101B17]/50 dark:text-[#F7F8F0]/50 text-sm cursor-not-allowed"
                />
              </div>

              {/* Photo URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#101B17] dark:text-[#F7F8F0] flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#159A70]" />
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 rounded-2xl border border-[#14532D]/15 dark:border-white/10 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] text-sm focus:outline-none focus:border-[#14532D]"
                />
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#101B17] dark:text-[#F7F8F0]">
                  Community Bio & Interests
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share your volunteering background, preferred drives (tree planting, clothing distribution, medical camps)..."
                  className="w-full px-4 py-3 rounded-2xl border border-[#14532D]/15 dark:border-white/10 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] text-sm focus:outline-none focus:border-[#14532D]"
                />
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-3.5 px-4 rounded-2xl font-bold text-white bg-[#14532D] hover:bg-[#0F3F22] shadow-md shadow-[#14532D]/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4 text-[#D9F3E5]" />
                <span>{isSaving ? 'Updating...' : 'Save Profile Changes'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
