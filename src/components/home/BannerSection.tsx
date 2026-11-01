'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Heart,
  Search,
  ArrowRight,
  MapPin,
  Users,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Calendar,
} from 'lucide-react';

export default function BannerSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/events');
    }
  };

  const causeCategories = [
    { label: 'Winter Blankets', query: 'Winter', icon: '🧥' },
    { label: 'Hot Food Relief', query: 'Food', icon: '🍲' },
    { label: 'Tree Planting', query: 'Plantation', icon: '🌳' },
    { label: 'Free Health Camps', query: 'Health', icon: '🩺' },
    { label: 'Clean Cities', query: 'Cleanup', icon: '🧹' },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-emerald-50/50 via-teal-50/20 to-white dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-24 right-10 w-80 h-80 bg-teal-400/10 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Mission, Search & Causes */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Live Community Beacon Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-emerald-500/30 dark:border-emerald-500/30 shadow-xs text-xs text-slate-700 dark:text-slate-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                100% Non-Profit Community Platform
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                18,500+ Lives Touched
              </span>
            </div>

            {/* Inspiring Headline with Gradient Accent */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.12]">
              Small acts of kindness.{' '}
              <span className="block mt-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-200 bg-clip-text text-transparent">
                Deep community impact.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              CareSphere brings volunteers, students, and neighborhood organizers together across Bangladesh. Join hands to distribute winter blankets, share meals with the hungry, plant trees, and run free medical camps.
            </p>

            {/* Interactive Search Bar */}
            <div className="pt-1 max-w-xl space-y-3">
              <form
                onSubmit={handleSearch}
                className="p-1.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-500/40 dark:border-emerald-500/30 focus-within:border-emerald-600 shadow-md shadow-emerald-950/5 flex items-center gap-2 transition-all"
              >
                <div className="relative flex-1 flex items-center pl-3">
                  <Search className="w-4 h-4 text-emerald-600 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search drives by neighborhood or cause (e.g. Mirpur, Winter, Food)..."
                    className="w-full pl-2.5 pr-2 py-2 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shrink-0 shadow-xs transition-all"
                >
                  Find Drives
                </button>
              </form>

              {/* Quick Causes Pills */}
              <div className="flex items-center gap-1.5 flex-wrap text-xs pt-1">
                <span className="font-semibold text-slate-400 text-[11px]">Primary Causes:</span>
                {causeCategories.map((c) => (
                  <button
                    key={c.query}
                    type="button"
                    onClick={() => router.push(`/events?search=${encodeURIComponent(c.query)}`)}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors shadow-2xs flex items-center gap-1"
                  >
                    <span>{c.icon}</span>
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5">
              <Link
                href="/events"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/20 transition-all hover:translate-y-[-1px]"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Join an Upcoming Drive</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/create-event"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs"
              >
                <span>Start a Community Drive</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Layered Community Story Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&auto=format&fit=crop&q=80"
                alt="Community volunteers organizing winter blankets and food relief packages"
                className="w-full h-84 sm:h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

              {/* Floating Top Badge: Urgent Field Initiative */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 dark:bg-slate-900/95 text-rose-700 dark:text-rose-400 backdrop-blur-md shadow-md border border-rose-500/20">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  Active Winter Appeal
                </span>
              </div>

              {/* Floating Top Right: Open Non-Profit Seal */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-950/80 text-emerald-300 backdrop-blur-md border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  100% Free & Open
                </span>
              </div>

              {/* Overlapping Glass Card at Bottom */}
              <div className="absolute bottom-4 inset-x-4 p-5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-white space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    Mirpur 10 & Mohammadpur Hub
                  </span>
                  <span className="text-[11px] text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-md font-medium">
                    Dhaka Division
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    Winter Warmth & Blanket Distribution Drive
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 italic">
                    &ldquo;Even the smallest act of kindness brings warmth to someone on cold winter nights.&rdquo;
                  </p>
                </div>

                {/* Progress Meter */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Volunteer Goal: 50 people</span>
                    <span className="text-emerald-400 font-bold">42 Enrolled (84%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: '84%' }} />
                  </div>
                </div>

                {/* Action & Volunteer Stack */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      <span className="inline-flex h-6 w-6 rounded-full ring-2 ring-slate-950 bg-emerald-600 text-[10px] font-bold text-white items-center justify-center">
                        AT
                      </span>
                      <span className="inline-flex h-6 w-6 rounded-full ring-2 ring-slate-950 bg-teal-600 text-[10px] font-bold text-white items-center justify-center">
                        MR
                      </span>
                      <span className="inline-flex h-6 w-6 rounded-full ring-2 ring-slate-950 bg-blue-600 text-[10px] font-bold text-white items-center justify-center">
                        FH
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-200 font-medium">
                      +39 local volunteers
                    </span>
                  </div>

                  <Link
                    href="/events?eventType=Winter+Relief"
                    className="inline-flex items-center gap-1 font-bold text-emerald-400 hover:text-emerald-300 text-xs hover:underline"
                  >
                    <span>View Drive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
