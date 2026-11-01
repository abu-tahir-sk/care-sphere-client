'use client';

import React from 'react';
import { Award, Users, HeartHandshake, Trees, TrendingUp, Sparkles } from 'lucide-react';

const stats = [
  {
    icon: HeartHandshake,
    value: '18,500+',
    label: 'Relief Packages Distributed',
    detail: 'Warm blankets, jackets, and essential food rations',
    badge: '100% Grassroots',
    iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  },
  {
    icon: Users,
    value: '5,420+',
    label: 'Dedicated Volunteers',
    detail: 'Active citizens and students across all 8 divisions',
    badge: '+24% this winter',
    iconBg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
  },
  {
    icon: Trees,
    value: '6,200+',
    label: 'Trees Planted & Protected',
    detail: 'Lakeside reforestation and walkway green canopy',
    badge: 'Lakes & Walkways',
    iconBg: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  },
  {
    icon: Award,
    value: '350+',
    label: 'Community Drives Completed',
    detail: 'Organized with verified zero intermediary fees',
    badge: 'Zero Fees',
    iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  },
];

export default function ImpactStatsSection() {
  return (
    <section className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-6 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-950/5 hover:-translate-y-1 hover:shadow-2xl hover:border-emerald-500/40 dark:hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-xs transition-transform group-hover:scale-110 duration-300 ${stat.iconBg}`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <Sparkles className="w-3 h-3 text-amber-500" />
                {stat.badge}
              </span>
            </div>

            <div>
              <p className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white font-heading">
                {stat.value}
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mt-1">
                {stat.label}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                {stat.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
