'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, MapPin, Users, HeartHandshake } from 'lucide-react';

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

  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      {/* Subtle Dot Pattern with Soft Radial Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_20%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Clean, confident typography with plenty of whitespace */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Minimal Platform Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
              <span className="font-medium">Civic Action & Social Welfare</span>
            </div>

            {/* Clean, Human-Centric Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.12]">
              Where community empathy meets grassroots action.
            </h1>

            {/* Clear, breathable subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Discover local volunteer drives, coordinate winter relief and tree planting, and track verified civic service hours across Bangladesh.
            </p>

            {/* Unified, elegant search input */}
            <div className="pt-2 max-w-lg space-y-3">
              <form
                onSubmit={handleSearch}
                className="p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus-within:border-emerald-600 dark:focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-600/20 shadow-sm flex items-center gap-2 transition-all"
              >
                <div className="relative flex-1 flex items-center pl-3">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search drives (e.g. Mirpur 10, Winter Relief)..."
                    className="w-full pl-2.5 pr-2 py-2 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-sm text-white bg-emerald-700 hover:bg-emerald-800 shrink-0 transition-colors"
                >
                  Find Drives
                </button>
              </form>

              {/* Minimal Action Links */}
              <div className="flex items-center justify-between text-xs pt-1 px-1">
                <Link
                  href="/events"
                  className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Explore all upcoming events</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/create-event"
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Organize an initiative →
                </Link>
              </div>
            </div>

            {/* Clean, single-line trust note */}
            <div className="pt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Joined by <strong>5,400+ volunteers</strong> across Dhaka, Chattogram, and 8 divisions.</span>
            </div>
          </div>

          {/* Right Column: Clean, magazine-grade visual card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&auto=format&fit=crop&q=80"
                alt="Volunteers packing food and warm winter relief supplies for low-income families"
                className="w-full h-[420px] object-cover group-hover:scale-102 transition-transform duration-500"
              />

              {/* Soft Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

              {/* Clean Glassmorphic Information Card on Image Bottom */}
              <div className="absolute bottom-5 inset-x-5 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-white space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    Featured Relief Initiative
                  </span>
                  <span className="flex items-center gap-1 text-slate-300 text-[11px]">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    Mirpur 10, Dhaka
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                  Winter Warmth & Blanket Distribution Drive
                </h3>

                <div className="flex items-center justify-between pt-1 border-t border-white/10 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      <span className="inline-flex h-5 w-5 rounded-full ring-2 ring-slate-900 bg-emerald-600 text-[9px] font-bold text-white items-center justify-center">
                        AT
                      </span>
                      <span className="inline-flex h-5 w-5 rounded-full ring-2 ring-slate-900 bg-teal-600 text-[9px] font-bold text-white items-center justify-center">
                        MR
                      </span>
                      <span className="inline-flex h-5 w-5 rounded-full ring-2 ring-slate-900 bg-blue-600 text-[9px] font-bold text-white items-center justify-center">
                        FH
                      </span>
                    </div>
                    <span className="text-[11px]">42 volunteers enrolled</span>
                  </div>

                  <Link
                    href="/events?eventType=Winter+Relief"
                    className="font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
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
