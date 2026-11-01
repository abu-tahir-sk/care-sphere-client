'use client';

import React from 'react';
import Link from 'next/link';
import {
  Heart,
  ArrowRight,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export default function BannerSection() {
  return (
    <section className="relative overflow-hidden bg-[#F7F8F0] dark:bg-[#0A130E] border-b border-[#14532D]/10 dark:border-white/10 pt-14 pb-16 lg:pt-20 lg:pb-24 transition-colors">
      {/* Nature-inspired Scandinavian Decorative Blur */}
      <div className="w-96 h-96 bg-[#D9F3E5]/60 dark:bg-[#14532D]/20 rounded-full blur-3xl absolute -top-16 -left-16 pointer-events-none" />
      <div className="w-80 h-80 bg-[#159A70]/10 dark:bg-[#159A70]/10 rounded-full blur-3xl absolute bottom-0 right-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* LEFT COLUMN: Editorial Mission, Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Small Elegant Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9F3E5] dark:bg-[#14532D]/50 border border-[#159A70]/30 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#14532D] dark:text-[#D9F3E5] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#159A70]" />
              <span>TOGETHER FOR A BETTER TOMORROW</span>
            </div>

            {/* Large Bold Headline */}
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-[#101B17] dark:text-white">
              Small Acts of Kindness.{' '}
              <span className="block text-[#159A70] dark:text-emerald-400 mt-1 sm:mt-2">
                Create a World of Impact.
              </span>
            </h1>

            {/* Short Emotional Description */}
            <p className="text-base sm:text-lg text-[#101B17]/80 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
              CareSphere empowers everyday citizens and youth coalitions across Bangladesh to bring immediate warmth and relief to vulnerable communities. Join local winter blanket distributions, emergency food relief drives, and urban tree planting initiatives.
            </p>

            {/* Two Beautiful CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold text-sm text-white bg-[#14532D] hover:bg-[#0f3f22] dark:bg-[#159A70] dark:hover:bg-[#12825e] shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-1px] group"
              >
                <span>Explore Events</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/create-event"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm text-[#101B17] dark:text-white bg-white dark:bg-slate-900 border border-[#14532D]/20 dark:border-slate-700 hover:bg-[#D9F3E5]/40 dark:hover:bg-slate-800 transition-all duration-300 shadow-2xs hover:translate-y-[-1px]"
              >
                <HeartHandshake className="w-4 h-4 text-[#159A70]" />
                <span>Host a Drive</span>
              </Link>
            </div>

            {/* Small Trust Indicator */}
            <div className="flex items-center gap-3 pt-4 text-xs text-[#101B17]/70 dark:text-slate-400 font-medium">
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                <span className="inline-flex h-7 w-7 rounded-full ring-2 ring-[#F7F8F0] dark:ring-[#0A130E] bg-[#14532D] text-[10px] font-bold text-white items-center justify-center shadow-2xs">
                  AT
                </span>
                <span className="inline-flex h-7 w-7 rounded-full ring-2 ring-[#F7F8F0] dark:ring-[#0A130E] bg-[#159A70] text-[10px] font-bold text-white items-center justify-center shadow-2xs">
                  MR
                </span>
                <span className="inline-flex h-7 w-7 rounded-full ring-2 ring-[#F7F8F0] dark:ring-[#0A130E] bg-teal-600 text-[10px] font-bold text-white items-center justify-center shadow-2xs">
                  FH
                </span>
                <span className="inline-flex h-7 w-7 rounded-full ring-2 ring-[#F7F8F0] dark:ring-[#0A130E] bg-emerald-700 text-[10px] font-bold text-white items-center justify-center shadow-2xs">
                  SK
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-[#101B17] dark:text-slate-200">5,420+ volunteers</span>
                <span>active across Dhaka and 8 regional divisions</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Photography with Subtle Decorative Shape & Floating Cards */}
          <div className="lg:col-span-5 relative">
            {/* Subtle Decorative Shapes Behind Image */}
            <div className="absolute -inset-3 bg-[#D9F3E5]/70 dark:bg-[#14532D]/30 rounded-[36px] -rotate-1 pointer-events-none" />

            {/* Main Photograph Card */}
            <div className="relative rounded-[32px] overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&auto=format&fit=crop&q=85"
                alt="Community volunteers packing warm winter blankets and relief supplies for underprivileged families"
                className="w-full h-[400px] sm:h-[460px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Subtle Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />

              {/* Floating Info Card 1: 18,500+ Lives Touched */}
              <div className="absolute top-5 right-5 p-3.5 sm:p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl border border-black/5 dark:border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D9F3E5] dark:bg-[#14532D]/50 text-[#14532D] dark:text-[#D9F3E5] flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 fill-[#159A70] text-[#159A70]" />
                </div>
                <div>
                  <p className="font-manrope font-extrabold text-sm sm:text-base text-[#101B17] dark:text-white leading-tight">
                    18,500+ Lives Touched
                  </p>
                  <p className="text-[11px] font-medium text-[#101B17]/70 dark:text-slate-400 mt-0.5">
                    Emergency relief & winter aid
                  </p>
                </div>
              </div>

              {/* Floating Info Card 2: Making Every Helping Hand Count */}
              <div className="absolute bottom-5 inset-x-5 p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl border border-black/5 dark:border-white/10 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#14532D] dark:text-emerald-400 uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-[#159A70]" />
                    <span>Grassroots Community Care</span>
                  </div>
                  <p className="font-manrope font-extrabold text-sm sm:text-base text-[#101B17] dark:text-white leading-tight">
                    Making Every Helping Hand Count
                  </p>
                  <p className="text-xs text-[#101B17]/70 dark:text-slate-400">
                    Direct neighborhood coordination with verified volunteer service records.
                  </p>
                </div>
                <div className="hidden sm:flex flex-col items-end shrink-0">
                  <span className="text-xs font-bold text-[#14532D] dark:text-[#D9F3E5] bg-[#D9F3E5] dark:bg-[#14532D]/60 px-3 py-1 rounded-full border border-[#159A70]/20">
                    100% Non-Profit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
