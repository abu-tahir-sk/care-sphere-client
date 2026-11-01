'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Heart,
  ArrowRight,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Search,
  MapPin,
  Tag,
  Clock,
  CheckCircle,
} from 'lucide-react';

export default function BannerSection() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('search', searchTerm.trim());
    if (selectedType) params.set('eventType', selectedType);
    if (selectedLocation) params.set('location', selectedLocation);
    router.push(`/events?${params.toString()}`);
  };

  const trendingTags = [
    { label: 'Winter Relief – Mirpur 10', query: 'Mirpur 10' },
    { label: 'Blanket Distribution – Mohammadpur', query: 'Mohammadpur' },
    { label: 'Tree Plantation – Dhanmondi', query: 'Plantation' },
    { label: 'Food Drive', query: 'Food' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F7F8F0] dark:bg-[#0A130E] border-b border-[#14532D]/10 dark:border-white/10 pt-12 pb-16 lg:pt-20 lg:pb-24 transition-colors">
      {/* Ambient background glow & blurred meshes */}
      <div className="w-[500px] h-[500px] bg-emerald-200/40 dark:bg-emerald-900/15 rounded-full blur-3xl absolute -top-24 -left-20 pointer-events-none" />
      <div className="w-[450px] h-[450px] bg-teal-200/30 dark:bg-teal-900/15 rounded-full blur-3xl absolute bottom-0 right-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* LEFT COLUMN: Mission, Typography, Actions & Quick Filter */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Elegant Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9F3E5] dark:bg-[#14532D]/50 border border-[#159A70]/30 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#14532D] dark:text-[#D9F3E5] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#159A70] animate-spin-slow" />
              <span>COMMUNITY-DRIVEN SOCIAL WELFARE PLATFORM</span>
            </div>

            {/* Large Bold Headline */}
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-[#101B17] dark:text-white">
              Small Acts of Kindness.{' '}
              <span className="block text-[#159A70] dark:text-emerald-400 mt-1 sm:mt-2">
                Create a World of Impact.
              </span>
            </h1>

            {/* Short Inspiring Description */}
            <p className="text-base sm:text-lg text-[#101B17]/80 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
              CareSphere connects passionate volunteers, youth organizations, and everyday citizens across Bangladesh to create, join, and track vital social service events in their local neighborhoods.
            </p>

            {/* Two Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold text-sm text-white bg-[#14532D] hover:bg-[#0f3f22] dark:bg-[#159A70] dark:hover:bg-[#12825e] shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-1px] group"
              >
                <span>Upcoming Events</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/create-event"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm text-[#101B17] dark:text-white bg-white dark:bg-slate-900 border border-[#14532D]/20 dark:border-slate-700 hover:bg-[#D9F3E5]/40 dark:hover:bg-slate-800 transition-all duration-300 shadow-2xs hover:translate-y-[-1px]"
              >
                <HeartHandshake className="w-4 h-4 text-[#159A70]" />
                <span>Create an Event</span>
              </Link>
            </div>

            {/* Interactive Quick Search & Neighborhood Console */}
            <form
              onSubmit={handleSearchSubmit}
              className="mt-6 p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-[#0F1E16] border border-[#14532D]/15 dark:border-white/10 shadow-lg shadow-emerald-950/5 flex flex-col md:flex-row gap-2 max-w-2xl"
            >
              <div className="flex-1 relative flex items-center min-w-[160px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search events (e.g. Winter clothes, Mirpur 10)..."
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-transparent rounded-xl text-[#101B17] dark:text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="relative min-w-[130px]">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full text-xs py-2.5 pl-3 pr-7 bg-[#F7F8F0] dark:bg-black/30 text-[#101B17] dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="">All Categories</option>
                    <option value="Winter Relief">Winter Relief</option>
                    <option value="Donation">Donation</option>
                    <option value="Plantation">Plantation</option>
                    <option value="Cleanup">Cleanup</option>
                    <option value="Food Drive">Food Drive</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#159A70] hover:bg-[#12825e] shadow-xs transition-colors flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Find Events</span>
                </button>
              </div>
            </form>

            {/* Trending Quick Search Chips */}
            <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
              <span className="text-slate-400 font-semibold flex items-center gap-1 text-[11px]">
                <Tag className="w-3 h-3 text-[#159A70]" />
                Trending:
              </span>
              {trendingTags.map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => router.push(`/events?search=${encodeURIComponent(tag.query)}`)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#D9F3E5]/60 dark:bg-[#14532D]/30 text-[#14532D] dark:text-[#D9F3E5] hover:bg-[#159A70] hover:text-white dark:hover:bg-[#159A70] transition-colors"
                >
                  {tag.label}
                </button>
              ))}
            </div>

            {/* Verified Community Social Proof Ribbon */}
            <div className="flex items-center gap-3 pt-3 text-xs text-[#101B17]/70 dark:text-slate-400 font-medium">
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                <span className="inline-flex h-8 w-8 rounded-full ring-2 ring-[#F7F8F0] dark:ring-[#0A130E] bg-[#14532D] text-[10px] font-bold text-white items-center justify-center shadow-xs">
                  AT
                </span>
                <span className="inline-flex h-8 w-8 rounded-full ring-2 ring-[#F7F8F0] dark:ring-[#0A130E] bg-[#159A70] text-[10px] font-bold text-white items-center justify-center shadow-xs">
                  MR
                </span>
                <span className="inline-flex h-8 w-8 rounded-full ring-2 ring-[#F7F8F0] dark:ring-[#0A130E] bg-teal-600 text-[10px] font-bold text-white items-center justify-center shadow-xs">
                  FH
                </span>
                <span className="inline-flex h-8 w-8 rounded-full ring-2 ring-[#F7F8F0] dark:ring-[#0A130E] bg-emerald-700 text-[10px] font-bold text-white items-center justify-center shadow-xs">
                  SK
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-[#101B17] dark:text-slate-200">5,420+ volunteers</span>
                <span>actively coordinating across Mirpur, Mohammadpur, Dhanmondi & beyond</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Photography with Layered Glassmorphic Badges */}
          <div className="lg:col-span-5 relative">
            {/* Subtle Layered Shape Behind Image */}
            <div className="absolute -inset-3 bg-[#D9F3E5]/70 dark:bg-[#14532D]/30 rounded-[36px] -rotate-1 pointer-events-none" />

            {/* Main Showcase Photograph */}
            <div className="relative rounded-[32px] overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&auto=format&fit=crop&q=85"
                alt="Community volunteers organizing warm blankets and winter supplies in Dhaka"
                className="w-full h-[420px] sm:h-[480px] lg:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

              {/* Floating Pill Top Left: Live Status */}
              <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Live Drives Active</span>
              </div>

              {/* Floating Card Top Right: 18,500+ Lives Touched */}
              <div className="absolute top-5 right-5 p-3.5 sm:p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl border border-black/5 dark:border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D9F3E5] dark:bg-[#14532D]/50 text-[#14532D] dark:text-[#D9F3E5] flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 fill-[#159A70] text-[#159A70]" />
                </div>
                <div>
                  <p className="font-manrope font-extrabold text-sm sm:text-base text-[#101B17] dark:text-white leading-tight">
                    18,500+ Lives
                  </p>
                  <p className="text-[11px] font-medium text-[#101B17]/70 dark:text-slate-400 mt-0.5">
                    Winter aid & relief served
                  </p>
                </div>
              </div>

              {/* Floating Glassmorphic Footer Banner */}
              <div className="absolute bottom-5 inset-x-5 p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl border border-black/5 dark:border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#14532D] dark:text-emerald-400 uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-[#159A70]" />
                    <span>Grassroots Community Care</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#14532D] dark:text-[#D9F3E5] bg-[#D9F3E5] dark:bg-[#14532D]/60 px-2.5 py-0.5 rounded-full border border-[#159A70]/20">
                    100% Non-Profit
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <div>
                    <p className="font-manrope font-extrabold text-sm text-[#101B17] dark:text-white leading-tight">
                      Making Every Helping Hand Count
                    </p>
                    <p className="text-xs text-[#101B17]/70 dark:text-slate-400 mt-0.5">
                      Direct coordination across Mirpur 10, Mohammadpur, and Dhanmondi.
                    </p>
                  </div>
                  <Link
                    href="/events"
                    className="p-2 rounded-xl bg-[#14532D] text-white hover:bg-[#0f3f22] shrink-0 transition-colors"
                    aria-label="Explore upcoming events"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
