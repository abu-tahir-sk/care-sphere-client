'use client';

import React from 'react';
import {
  Compass,
  UsersRound,
  ShieldCheck,
  FileCheck2,
  HeartHandshake,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Award,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function FeatureSection() {
  return (
    <section className="py-20 lg:py-24 bg-[#F7F8F0] dark:bg-[#0A130E] border-b border-[#14532D]/10 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D9F3E5] dark:bg-[#14532D]/50 text-[#14532D] dark:text-[#D9F3E5] border border-[#159A70]/30">
            <HeartHandshake className="w-3.5 h-3.5 text-[#159A70]" />
            <span>How CareSphere Serves Communities</span>
          </div>
          <h2 className="font-manrope text-3xl sm:text-4xl font-extrabold text-[#101B17] dark:text-white tracking-tight">
            Turning Compassion into Real, Organized Grassroots Action
          </h2>
          <p className="text-base text-[#101B17]/75 dark:text-slate-300 leading-relaxed">
            CareSphere provides transparent, neighborhood-first tools to connect everyday citizens with local relief initiatives, tree plantation drives, and social welfare programs.
          </p>
        </div>

        {/* Modern Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1 (Large 2-column span): Hyperlocal Community Discovery */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-white dark:bg-[#0F1E16] border border-[#14532D]/10 dark:border-white/10 shadow-sm flex flex-col justify-between hover:border-[#159A70]/40 dark:hover:border-[#159A70]/30 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-[#D9F3E5] dark:bg-[#14532D]/50 border border-[#159A70]/20 text-[#14532D] dark:text-[#D9F3E5] flex items-center justify-center shadow-2xs">
                  <Compass className="w-5 h-5 text-[#159A70]" />
                </div>
                <span className="text-xs font-bold text-[#14532D] dark:text-[#D9F3E5] bg-[#D9F3E5] dark:bg-[#14532D]/50 px-3 py-1 rounded-full border border-[#159A70]/20">
                  Hyperlocal Action
                </span>
              </div>

              <div>
                <h3 className="font-manrope text-xl sm:text-2xl font-bold text-[#101B17] dark:text-white">
                  Discover Relief Drives Right in Your Neighborhood
                </h3>
                <p className="text-sm text-[#101B17]/75 dark:text-slate-400 leading-relaxed mt-1.5 max-w-xl">
                  Find where your help is needed most. Explore verified volunteer causes happening down your street—from winter blanket drives in Mirpur to lake cleanups in Dhanmondi.
                </p>
              </div>

              {/* District Cause Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                <div className="p-3.5 rounded-xl bg-[#F7F8F0] dark:bg-black/20 border border-[#14532D]/10 dark:border-white/10 text-left">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Dhaka North</p>
                  <p className="text-xs font-bold text-[#101B17] dark:text-white mt-0.5">Mirpur 10</p>
                  <p className="text-xs text-[#159A70] dark:text-emerald-400 font-bold mt-1">Winter Relief</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F7F8F0] dark:bg-black/20 border border-[#14532D]/10 dark:border-white/10 text-left">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Dhaka West</p>
                  <p className="text-xs font-bold text-[#101B17] dark:text-white mt-0.5">Mohammadpur</p>
                  <p className="text-xs text-[#159A70] dark:text-emerald-400 font-bold mt-1">Food Distribution</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F7F8F0] dark:bg-black/20 border border-[#14532D]/10 dark:border-white/10 text-left">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Dhaka Central</p>
                  <p className="text-xs font-bold text-[#101B17] dark:text-white mt-0.5">Dhanmondi Lake</p>
                  <p className="text-xs text-[#159A70] dark:text-emerald-400 font-bold mt-1">Tree Plantation</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F7F8F0] dark:bg-black/20 border border-[#14532D]/10 dark:border-white/10 text-left">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Coastal Zone</p>
                  <p className="text-xs font-bold text-[#101B17] dark:text-white mt-0.5">Chattogram</p>
                  <p className="text-xs text-[#159A70] dark:text-emerald-400 font-bold mt-1">Beach Cleanup</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#14532D]/10 dark:border-white/10 mt-6 flex items-center justify-between">
              <span className="text-xs text-slate-500">Active volunteer initiatives across all 8 divisions</span>
              <Link href="/events" className="text-xs font-bold text-[#14532D] dark:text-emerald-400 hover:underline flex items-center gap-1.5">
                <span>Explore All Causes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento Card 2 (Col span 1): A4 Certificate Engine */}
          <div className="p-8 rounded-3xl bg-white dark:bg-[#0F1E16] border border-[#14532D]/10 dark:border-white/10 shadow-sm flex flex-col justify-between hover:border-[#159A70]/40 dark:hover:border-[#159A70]/30 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shadow-2xs">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Recognition
                </span>
              </div>

              <div>
                <h3 className="font-manrope text-xl font-bold text-[#101B17] dark:text-white">
                  Official Volunteer Service Certificate
                </h3>
                <p className="text-xs sm:text-sm text-[#101B17]/75 dark:text-slate-400 leading-relaxed mt-1.5">
                  Every selfless hour is recognized. Generate an official, single-page printable certificate with a verified record ID for your academic and career portfolio.
                </p>
              </div>

              {/* Certificate Preview Badge */}
              <div className="p-4 rounded-2xl bg-[#F7F8F0] dark:bg-black/20 border border-amber-400/40 text-center space-y-1.5 shadow-2xs">
                <p className="text-[10px] font-extrabold uppercase text-[#101B17] dark:text-slate-200 tracking-wider">
                  Certificate of Community Service
                </p>
                <p className="text-xs font-bold text-[#159A70] dark:text-emerald-400 font-mono">
                  CS-VOL-8996 • 100% Single Page (1/1)
                </p>
                <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300 font-medium pt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#159A70]" /> Print-ready A4 landscape format
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#14532D]/10 dark:border-white/10 text-xs text-slate-500">
              Honoring dedication to humanitarian service
            </div>
          </div>

          {/* Bento Card 3 (Col span 1): Real-Time Quota RSVP */}
          <div className="p-8 rounded-3xl bg-white dark:bg-[#0F1E16] border border-[#14532D]/10 dark:border-white/10 shadow-sm flex flex-col justify-between hover:border-[#159A70]/40 dark:hover:border-[#159A70]/30 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-[#D9F3E5] dark:bg-[#14532D]/50 border border-[#159A70]/20 text-[#14532D] dark:text-[#D9F3E5] flex items-center justify-center shadow-2xs">
                  <UsersRound className="w-5 h-5 text-[#159A70]" />
                </div>
                <span className="text-xs font-bold text-[#14532D] dark:text-[#D9F3E5] bg-[#D9F3E5] dark:bg-[#14532D]/50 px-3 py-1 rounded-full border border-[#159A70]/20">
                  Coordination
                </span>
              </div>

              <div>
                <h3 className="font-manrope text-xl font-bold text-[#101B17] dark:text-white">
                  Organized & Safe Field Coordination
                </h3>
                <p className="text-xs sm:text-sm text-[#101B17]/75 dark:text-slate-400 leading-relaxed mt-1.5">
                  Real-time volunteer quotas ensure relief efforts are smooth, safe, and well-organized without overcrowded distribution points.
                </p>
              </div>

              {/* Progress UI Mockup */}
              <div className="space-y-2 p-3.5 rounded-xl bg-[#F7F8F0] dark:bg-black/20 border border-[#14532D]/10 dark:border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">Volunteers Needed</span>
                  <span className="text-[#14532D] dark:text-emerald-400 font-bold">42 / 50 Joined</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#159A70] rounded-full" style={{ width: '84%' }} />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#14532D]/10 dark:border-white/10 text-xs text-slate-500">
              One-click volunteer enrollment
            </div>
          </div>

          {/* Bento Card 4 (Large 2-column span): Organizer Command Center */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-white dark:bg-[#0F1E16] border border-[#14532D]/10 dark:border-white/10 shadow-sm flex flex-col justify-between hover:border-[#159A70]/40 dark:hover:border-[#159A70]/30 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-[#D9F3E5] dark:bg-[#14532D]/50 border border-[#159A70]/20 text-[#14532D] dark:text-[#D9F3E5] flex items-center justify-center shadow-2xs">
                  <HeartHandshake className="w-5 h-5 text-[#159A70]" />
                </div>
                <span className="text-xs font-bold text-[#14532D] dark:text-[#D9F3E5] bg-[#D9F3E5] dark:bg-[#14532D]/50 px-3 py-1 rounded-full border border-[#159A70]/20">
                  Leadership
                </span>
              </div>

              <div>
                <h3 className="font-manrope text-xl sm:text-2xl font-bold text-[#101B17] dark:text-white">
                  Empowering Local Youth & Community Leaders
                </h3>
                <p className="text-sm text-[#101B17]/75 dark:text-slate-400 leading-relaxed mt-1.5 max-w-xl">
                  Anyone with a caring heart can mobilize an initiative. Easily create drives, coordinate volunteer rosters, send relief updates, and manage schedules with zero red tape.
                </p>
              </div>

              {/* Status Chips Row */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs">
                <span className="px-3.5 py-1.5 rounded-xl bg-[#D9F3E5] dark:bg-[#14532D]/40 border border-[#159A70]/20 text-[#14532D] dark:text-[#D9F3E5] font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#159A70]" /> Direct Volunteer Rosters
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-[#F7F8F0] dark:bg-black/20 border border-[#14532D]/10 dark:border-white/10 text-[#101B17] dark:text-white font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#159A70]" /> Real-Time Community Updates
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-[#F7F8F0] dark:bg-black/20 border border-[#14532D]/10 dark:border-white/10 text-[#101B17] dark:text-white font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#159A70]" /> 100% Non-Profit & Open
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-[#14532D]/10 dark:border-white/10 mt-6 flex items-center justify-between">
              <span className="text-xs text-slate-500">Completely free for volunteers and community groups</span>
              <Link href="/create-event" className="text-xs font-bold text-[#14532D] dark:text-emerald-400 hover:underline flex items-center gap-1.5">
                <span>Start a Local Drive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
