'use client';

import React from 'react';
import {
  Compass,
  CalendarCheck,
  UsersRound,
  ShieldCheck,
  FileCheck2,
  SlidersHorizontal,
  MapPin,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';

export default function FeatureSection() {
  return (
    <section className="py-20 bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            Platform Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            Engineered for High-Trust Community Coordination
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            CareSphere provides verified digital workflows to transition community empathy into transparent, verifiable grassroots action.
          </p>
        </div>

        {/* Modern Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1 (Large 2-column span): Hyperlocal Discovery */}
          <div className="md:col-span-2 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Module 01 • Geospatial
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Hyperlocal Geofiltering & Area Routing
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-1 max-w-xl">
                  Locate upcoming relief drives, cleanups, and medical camps happening directly in your neighborhood. Real-time filtering across Mirpur, Mohammadpur, Dhanmondi, and nationwide divisions.
                </p>
              </div>

              {/* Interactive Zone Badges Mockup */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-left">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Dhaka North</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Mirpur 10</p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">8 Active Drives</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-left">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Dhaka West</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Mohammadpur</p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">6 Active Drives</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-left">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Dhaka Central</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Dhanmondi</p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">5 Active Drives</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-left">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Coastal Zone</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Chattogram</p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">3 Active Drives</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6 flex items-center justify-between">
              <span className="text-xs text-slate-500">Fast parameter-indexed MongoDB geo-queries</span>
              <Link href="/events" className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1">
                <span>Explore Map Hubs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento Card 2 (Col span 1): A4 Certificate Engine */}
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Module 02
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  A4 Landscape Printable Certificates
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                  Volunteers generate verified, single-page A4 landscape service records with cryptographic IDs to validate civic service hours for CVs and applications.
                </p>
              </div>

              {/* Certificate Preview Badge */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-amber-300/60 dark:border-amber-600/40 text-center space-y-1.5">
                <p className="text-[10px] font-extrabold uppercase text-slate-800 dark:text-slate-200 tracking-wider">
                  Certificate of Community Service
                </p>
                <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                  CS-VOL-8996 • 100% Single Page (1/1)
                </p>
                <div className="inline-flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Print-ready @media print CSS
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
              Zero multi-page spillover guarantee
            </div>
          </div>

          {/* Bento Card 3 (Col span 1): Real-Time Quota RSVP */}
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <UsersRound className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Module 03
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Capacity Meter & Instant RSVP
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                  Enforce strict volunteer headcounts. Automatic quota tracking prevents logistical crowding at relief distribution centers.
                </p>
              </div>

              {/* Progress UI Mockup */}
              <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">Field Capacity</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">42 / 50 Enrolled</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '84%' }} />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
              Synchronized to personal schedule
            </div>
          </div>

          {/* Bento Card 4 (Large 2-column span): Organizer Command Center */}
          <div className="md:col-span-2 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Module 04 • Governance
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Organizer Console with Future-Date Integrity
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-1 max-w-xl">
                  Robust administrative suite for drive organizers. Update event dates, modify relief supply targets, monitor volunteer rosters, and enforce that dates cannot be set in the past.
                </p>
              </div>

              {/* Status Chips Row */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-medium">
                  ✓ Strict Date &gt; Date.now() Validation
                </span>
                <span className="px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 font-medium">
                  ✓ Ownership & RBAC Token Security
                </span>
                <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                  ✓ SweetAlert2 Confirmation Dialogs
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6 flex items-center justify-between">
              <span className="text-xs text-slate-500">Zero default browser alerts (`alert()`, `confirm()`)</span>
              <Link href="/create-event" className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1">
                <span>Create Drive as Host</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
