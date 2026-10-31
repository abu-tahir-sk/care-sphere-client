'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowRight, Snowflake } from 'lucide-react';

export default function WeatherAdvisoryBanner() {
  return (
    <aside
      aria-label="Community Relief Appeal"
      className="bg-emerald-950 text-emerald-100 px-4 py-2.5 border-b border-emerald-800/60 text-xs sm:text-sm font-normal"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            Urgent Appeal
          </span>
          <p className="text-emerald-100/90 text-xs sm:text-sm">
            <strong className="text-white font-semibold">Winter Blanket Distribution:</strong> Over 1,500 warm blankets & jackets needed for underprivileged families in Mirpur 10 & Mohammadpur.
          </p>
        </div>

        <Link
          href="/events?eventType=Winter+Relief"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-white hover:underline shrink-0 group"
        >
          <span>Support Winter Drives</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </aside>
  );
}
