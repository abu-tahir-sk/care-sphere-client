'use client';

import React from 'react';
import { Award, Users, HeartHandshake, Trees, TrendingUp, ShieldCheck } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '5,420+',
    label: 'Registered Volunteers',
    detail: 'Field-verified members active across all 8 divisions',
    metric: '+24% YoY',
  },
  {
    icon: HeartHandshake,
    value: '18,500+',
    label: 'Relief Packages Distributed',
    detail: 'Insulated blankets, jackets, and emergency dry food rations',
    metric: '100% Grassroots',
  },
  {
    icon: Trees,
    value: '6,200+',
    label: 'Urban Saplings Rooted',
    detail: 'Lakeside reforestation and walkway canopy protection',
    metric: 'Verified Living',
  },
  {
    icon: Award,
    value: '350+',
    label: 'Completed Operations',
    detail: 'Organized and executed with zero platform intermediary fees',
    metric: 'Zero Fees',
  },
];

export default function ImpactStatsSection() {
  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-850 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100/70 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                  <TrendingUp className="w-3 h-3" /> {stat.metric}
                </span>
              </div>

              <div>
                <p className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mt-1">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {stat.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
