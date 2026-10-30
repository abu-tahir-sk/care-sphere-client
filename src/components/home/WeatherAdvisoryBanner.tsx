'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowRight, Snowflake } from 'lucide-react';

export default function WeatherAdvisoryBanner() {
  return (
    <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white px-4 py-3 border-b border-emerald-500/20 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 shrink-0">
            <Snowflake className="w-4 h-4 animate-spin-slow" />
          </span>
          <p className="font-medium text-slate-200">
            <strong className="text-white font-bold">Active Community Appeal:</strong> Over 1,500 warm blankets & winter relief packages urgently needed for low-income families in Mirpur 10 & Mohammadpur.
          </p>
        </div>

        <Link
          href="/events?eventType=Winter+Relief"
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-bold text-xs bg-white text-emerald-900 hover:bg-emerald-50 transition-colors shadow-sm shrink-0"
        >
          <span>Join Winter Drives</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
