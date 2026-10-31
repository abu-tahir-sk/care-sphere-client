'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';

export default function WeatherAdvisoryBanner() {
  return (
    <aside
      aria-label="Humanitarian Appeal"
      className="bg-emerald-950 text-emerald-100 px-4 py-2.5 border-b border-emerald-800/60 text-xs sm:text-sm font-normal"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0">
            <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
            জরুরি মানবিক আবেদন
          </span>
          <p className="text-emerald-200/90 text-xs sm:text-sm">
            <strong className="text-white font-semibold">শীতবস্ত্র ও কম্বল বিতরণ:</strong> মিরপুর ১০ ও মোহাম্মদপুর এলাকায় ছিন্নমূল অসহায় মানুষদের জন্য ১,৫০০টি কম্বল ও গরম কাপড় প্রয়োজন।
          </p>
        </div>

        <Link
          href="/events?eventType=Winter+Relief"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-white hover:underline shrink-0 group"
        >
          <span>শীতবস্ত্র কার্যক্রমে যোগ দিন</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </aside>
  );
}
