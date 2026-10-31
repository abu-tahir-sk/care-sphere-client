'use client';

import React from 'react';
import {
  Compass,
  CalendarCheck,
  UsersRound,
  ShieldCheck,
  FileCheck2,
  SlidersHorizontal,
} from 'lucide-react';

const features = [
  {
    icon: Compass,
    title: 'Hyperlocal Geofiltering & Discovery',
    description:
      'Locate and participate in neighborhood relief drives and civic cleanups across Mirpur, Mohammadpur, Dhanmondi, and nationwide divisions.',
    category: 'Discovery',
  },
  {
    icon: CalendarCheck,
    title: 'Validated Initiative Publishing',
    description:
      'Organizers publish drives with future-date constraints, volunteer quotas, categorical tagging, and explicit venue coordinates.',
    category: 'Coordination',
  },
  {
    icon: UsersRound,
    title: 'Real-Time RSVP & Capacity Tracking',
    description:
      'Community members enroll in a single click. Automated quota meters prevent oversubscription and sync to personal schedules.',
    category: 'Engagement',
  },
  {
    icon: SlidersHorizontal,
    title: 'Organizer Management Console',
    description:
      'Complete administrative controls for initiative hosts to update drive details, adjust dates, and manage listings securely.',
    category: 'Management',
  },
  {
    icon: FileCheck2,
    title: 'Official Community Service Certificates',
    description:
      'Volunteers print verified single-page A4 landscape service records with unique tracking IDs to substantiate civic hours.',
    category: 'Verification',
  },
  {
    icon: ShieldCheck,
    title: 'High-Contrast Multi-Theme Standard',
    description:
      'Accessible, WCAG-compliant design with high-contrast light and dark modes optimized for outdoor mobile use and desktop consoles.',
    category: 'Standards',
  },
];

export default function FeatureSection() {
  return (
    <section className="py-16 bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Platform Capabilities
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight">
            Engineered for Civic Action & Transparent Field Operations
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            CareSphere equips grassroots organizers and active citizens with reliable digital workflows to turn community empathy into verifiable social good.
          </p>
        </div>

        {/* Feature Cards Grid (Microsoft Fluent clean cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs transition-all duration-200 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {item.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-1.5">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono">Module 0{index + 1}</span>
                <span className="font-medium text-emerald-700 dark:text-emerald-400">Operational</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
