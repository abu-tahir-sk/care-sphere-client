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
    { label: 'Winter Relief', query: 'Winter', icon: '🧥' },
    { label: 'Food Drives', query: 'Food', icon: '🍲' },
    { label: 'Tree Plantation', query: 'Plantation', icon: '🌳' },
    { label: 'Free Health Camps', query: 'Health', icon: '🩺' },
    { label: 'Clean Cities', query: 'Cleanup', icon: '🧹' },
  ];

  return (
    <section className="relative overflow-hidden pt-14 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-emerald-50/50 via-white to-slate-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-emerald-200/30 via-emerald-100/10 to-transparent dark:from-emerald-900/15 dark:via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Humanitarian Mission, Search & Causes */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Non-Profit Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 font-semibold shadow-xs">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>100% Non-Profit Grassroots Platform</span>
              <span className="text-emerald-400">•</span>
              <span>People Helping People</span>
            </div>

            {/* Inspiring Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.12]">
              Bring warmth, hope, and care to your neighborhood.
            </h1>

            {/* Compassionate Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              CareSphere is a grassroots community connecting compassionate citizens and youth across Bangladesh. Mobilize emergency winter blankets, share meals with the hungry, and plant trees where shade is needed most.
            </p>

            {/* Clean Single Search Bar */}
            <div className="pt-2 max-w-xl space-y-3">
              <form
                onSubmit={handleSearch}
                className="p-1.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-600/30 dark:border-emerald-500/30 focus-within:border-emerald-600 shadow-md shadow-emerald-900/5 flex items-center gap-2 transition-all"
              >
                <div className="relative flex-1 flex items-center pl-3">
                  <Search className="w-4 h-4 text-emerald-600 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search volunteer causes (e.g. Mirpur, Winter Relief, Food)..."
                    className="w-full pl-2.5 pr-2 py-2 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-700 hover:bg-emerald-800 shrink-0 shadow-sm transition-colors"
                >
                  Find Causes
                </button>
              </form>

              {/* Quick Causes Pills */}
              <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
                <span className="font-semibold text-slate-400 text-xs">Primary Causes:</span>
                {causeCategories.map((c) => (
                  <button
                    key={c.query}
                    type="button"
                    onClick={() => router.push(`/events?search=${encodeURIComponent(c.query)}`)}
                    className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors shadow-2xs flex items-center gap-1.5"
                  >
                    <span>{c.icon}</span>
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-3.5">
              <Link
                href="/events"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm transition-all"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Join an Upcoming Drive</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/create-event"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs"
              >
                <span>Start a Community Drive</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Heartwarming Community Service Showcase */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&auto=format&fit=crop&q=80"
                alt="Volunteers distributing warm winter relief supplies to low-income families"
                className="w-full h-84 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent pointer-events-none" />

              {/* Heart Badge Top */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 dark:bg-slate-900/95 text-emerald-800 dark:text-emerald-300 backdrop-blur-md shadow-sm border border-emerald-500/20">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  Active Field Cause
                </span>
              </div>

              {/* Caring Humanitarian Caption on Image Bottom */}
              <div className="absolute bottom-4 inset-x-4 p-5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-white space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    Mirpur 10 & Mohammadpur Hub
                  </span>
                  <span className="text-[11px] text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-md">
                    Dhaka Division
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  Winter Warmth & Blanket Distribution Drive
                </h3>

                <p className="text-xs text-slate-300 italic">
                  &ldquo;Even the smallest act of kindness brings warmth to someone on cold winter nights.&rdquo;
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span>42 local volunteers enrolled</span>
                  </div>
                  <Link
                    href="/events?eventType=Winter+Relief"
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>

            {/* Non-Profit Trust Guarantee */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-center gap-3.5 text-xs text-emerald-950 dark:text-emerald-200 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">100% Open & Grassroots Driven</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Zero platform fees for volunteers or organizers. Completely transparent community service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
