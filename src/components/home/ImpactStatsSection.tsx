'use client';

import React from 'react';
import { Award, Users, HeartHandshake, Trees, ShieldAlert } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '5,420+',
    label: 'Dedicated Volunteers',
    detail: 'Active members registered across Bangladesh',
  },
  {
    icon: HeartHandshake,
    value: '18,500+',
    label: 'Relief Packages Distributed',
    detail: 'Winter jackets, blankets, and essential dry food',
  },
  {
    icon: Trees,
    value: '6,200+',
    label: 'Saplings Planted',
    detail: 'Restoring urban forestry and lakeside walkways',
  },
  {
    icon: Award,
    value: '350+',
    label: 'Successful Events',
    detail: 'Hosted transparently by local grassroots organizers',
  },
];

export default function ImpactStatsSection() {
  return (
    <section className="py-16 bg-emerald-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-emerald-800/60 border border-emerald-700/60 backdrop-blur-sm flex flex-col justify-between space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-3xl font-black tracking-tight text-white">{stat.value}</p>
                <p className="text-sm font-bold text-emerald-200 mt-1">{stat.label}</p>
                <p className="text-xs text-emerald-300/80 mt-1">{stat.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
