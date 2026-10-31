'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowRight, Snowflake } from 'lucide-react';

export default function WeatherAdvisoryBanner() {
  return (
    <aside
      aria-label="Community Relief Dispatch"
      className="bg-slate-900 text-slate-100 px-4 py-2.5 border-b border-slate-800 text-xs sm:text-sm font-normal"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Field Dispatch
          </span>
          <p className="text-slate-300">
            <strong className="text-white font-semibold">Urgent Winter Relief:</strong> Over 1,500 warm blankets & thermal jackets needed across Mirpur 10 & Mohammadpur low-income zones.
          </p>
        </div>

        <Link
          href="/events?eventType=Winter+Relief"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline shrink-0 group"
        >
          <span>View Winter Drives</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </aside>
  );
}
