'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function WeatherAdvisoryBanner() {
  return (
    <aside
      aria-label="Community Relief Appeal"
      className="bg-[#14532D] dark:bg-[#0b2816] text-[#D9F3E5] px-4 py-2 border-b border-white/10 text-xs sm:text-sm font-medium transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
        <div className="flex items-center gap-2.5 text-center sm:text-left flex-wrap justify-center sm:justify-start">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-white/15 text-white border border-white/20 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Urgent Need
          </span>
          <p className="text-white/95 text-xs sm:text-sm">
            Winter Blanket Distribution &ndash; Help bring warmth to families in need.
          </p>
        </div>

        <Link
          href="/events?eventType=Winter+Relief"
          className="inline-flex items-center gap-1 text-xs font-semibold text-white/90 hover:text-white hover:underline shrink-0 group transition-colors"
        >
          <span>Support the Drive</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </aside>
  );
}
