'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  ShieldCheck,
  Calendar,
  Search,
  MapPin,
  CheckCircle,
  Users,
  Package,
} from 'lucide-react';

export default function BannerSection() {
  const router = useRouter();
  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/events?search=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      router.push('/events');
    }
  };

  const quickFilters = [
    { label: 'Mirpur 10', query: 'Mirpur' },
    { label: 'Mohammadpur', query: 'Mohammadpur' },
    { label: 'Winter Relief', query: 'Winter' },
    { label: 'Tree Plantation', query: 'Plantation' },
    { label: 'Free Healthcare', query: 'Health' },
  ];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-slate-50/60 dark:bg-slate-950/40 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Mission, Search & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-500" />
              <span className="font-semibold text-slate-900 dark:text-white">CareSphere Platform</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span>Civic Operations & Grassroots Initiatives</span>
            </div>

            {/* Authoritative, non-AI-cliché Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.18]">
              Grassroots Social Action & Civic Engagement, Organized.
            </h1>

            {/* Clear, realistic description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              CareSphere connects verified NGOs, volunteer organizers, and community members. Coordinate emergency winter relief drives, urban environmental campaigns, and health camps across Dhaka and national divisions.
            </p>

            {/* Microsoft-style Enterprise Search Input */}
            <div className="space-y-3 pt-2">
              <form
                onSubmit={handleHeroSearch}
                className="max-w-xl p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus-within:border-emerald-700 dark:focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-700/20 shadow-xs flex items-center gap-2 transition-all"
              >
                <div className="relative flex-1 flex items-center pl-3">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Search drives by location or keyword (e.g. Mirpur 10, Winter Relief)..."
                    className="w-full pl-2.5 pr-2 py-2 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg font-medium text-xs sm:text-sm text-white bg-emerald-700 hover:bg-emerald-800 shrink-0 transition-colors"
                >
                  Find Drives
                </button>
              </form>

              {/* Quick filter links */}
              <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-400 dark:text-slate-500">Popular:</span>
                {quickFilters.map((q) => (
                  <button
                    key={q.query}
                    type="button"
                    onClick={() => router.push(`/events?search=${encodeURIComponent(q.query)}`)}
                    className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 transition-colors"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/events"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm text-white bg-emerald-700 hover:bg-emerald-800 shadow-xs transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Explore Upcoming Drives</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>
              <Link
                href="/create-event"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs"
              >
                <span>Register as Organizer</span>
              </Link>
            </div>

            {/* Authentic platform metrics */}
            <div className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-200 dark:border-slate-800 max-w-lg">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">5,400+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Verified Volunteers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">350+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Completed Drives</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">8 Divisions</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Nationwide Scope</p>
              </div>
            </div>
          </div>

          {/* Right Column: Microsoft Fluent Field Operations Panel */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
              {/* Card Header Bar */}
              <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/40">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">Active Field Operation</span>
                </div>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  CS-OPS-DH04
                </span>
              </div>

              {/* Live Drive Image Preview */}
              <div className="relative h-56 w-full bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&auto=format&fit=crop&q=80"
                  alt="Volunteers packing food and warm winter packages"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded bg-slate-900/85 backdrop-blur-sm text-white text-[11px] font-medium border border-white/10 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    Mirpur 10 • Dhaka
                  </span>
                </div>
              </div>

              {/* Operation Details & Metrics */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Emergency Winter Warmth & Blanket Distribution
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    Mobilizing insulated fleece blankets, sweaters, and high-nutrition food parcels for low-income street workers.
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Relief Package Distribution Target</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">1,240 / 1,500 (82%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full" style={{ width: '82%' }} />
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-slate-400 text-[10px] uppercase font-semibold">Team Deployed</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">42 Field Volunteers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="text-slate-400 text-[10px] uppercase font-semibold">Validation</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">NGO Partner Verified</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/events?eventType=Winter+Relief"
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 transition-colors"
                  >
                    <span>View Operational Log</span>
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
