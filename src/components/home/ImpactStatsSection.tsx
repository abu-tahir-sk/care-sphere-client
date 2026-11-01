'use client';

import React from 'react';
import { Award, Users, HeartHandshake, Trees, Sparkles } from 'lucide-react';

const stats = [
  {
    icon: HeartHandshake,
    value: '18,500+',
    label: 'Relief Packages Distributed',
    detail: 'Warm blankets, jackets, and essential food rations',
    badge: '100% Grassroots',
  },
  {
    icon: Users,
    value: '5,420+',
    label: 'Dedicated Volunteers',
    detail: 'Active citizens and students across all 8 divisions',
    badge: '+24% this winter',
  },
  {
    icon: Trees,
    value: '6,200+',
    label: 'Trees Planted & Protected',
    detail: 'Lakeside reforestation and walkway green canopy',
    badge: 'Lakes & Walkways',
  },
  {
    icon: Award,
    value: '350+',
    label: 'Community Drives Completed',
    detail: 'Organized with verified zero intermediary fees',
    badge: 'Zero Fees',
  },
];

export default function ImpactStatsSection() {
  return (
    <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-6 rounded-[28px] bg-white/95 dark:bg-[#0F1E16]/95 backdrop-blur-xl border border-[#14532D]/15 dark:border-white/10 shadow-lg shadow-[#101B17]/5 hover:-translate-y-1 hover:shadow-xl hover:border-[#159A70] transition-all duration-300 flex flex-col justify-between space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#D9F3E5] dark:bg-[#14532D]/50 border border-[#14532D]/20 text-[#14532D] dark:text-[#D9F3E5] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 duration-300">
                <stat.icon className="w-6 h-6 text-[#14532D] dark:text-[#D9F3E5]" />
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#D9F3E5] dark:bg-[#14532D]/40 text-[#14532D] dark:text-[#D9F3E5] border border-[#14532D]/20">
                <Sparkles className="w-3 h-3 text-[#159A70]" />
                {stat.badge}
              </span>
            </div>

            <div>
              <p className="text-3xl sm:text-4xl font-black tracking-tight text-[#101B17] dark:text-[#F7F8F0]">
                {stat.value}
              </p>
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#14532D] dark:text-[#D9F3E5] mt-1">
                {stat.label}
              </p>
              <p className="text-xs text-[#101B17]/60 dark:text-[#F7F8F0]/60 mt-1.5 leading-relaxed">
                {stat.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
