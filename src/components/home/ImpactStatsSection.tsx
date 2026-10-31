'use client';

import React from 'react';
import { Award, Users, HeartHandshake, Trees, ShieldCheck } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '5,420+',
    label: 'Registered Volunteers',
    detail: 'Field-verified members active across Bangladesh',
  },
  {
    icon: HeartHandshake,
    value: '18,500+',
    label: 'Relief Packages Distributed',
    detail: 'Insulated blankets, jackets, and emergency rations',
  },
  {
    icon: Trees,
    value: '6,200+',
    label: 'Urban Saplings Rooted',
    detail: 'Lakeside reforestation and pedestrian walkway greenery',
  },
  {
    icon: Award,
    value: '350+',
    label: 'Completed Operations',
    detail: 'Public social initiatives organized without commercial fees',
  },
];

export default function ImpactStatsSection() {
  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`pt-6 sm:pt-0 ${i !== 0 ? 'sm:pl-6' : ''} flex flex-col justify-between space-y-3`}
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <stat.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mt-1">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
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
