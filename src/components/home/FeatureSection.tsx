'use client';

import React from 'react';
import {
  Compass,
  CalendarCheck,
  UsersRound,
  ShieldCheck,
  Sparkles,
  BarChart3,
} from 'lucide-react';

const features = [
  {
    icon: Compass,
    title: 'Hyperlocal Event Discovery',
    description:
      'Search and filter social service drives happening directly in your neighborhood, from Mirpur to Mohammadpur and across all major divisions.',
    badge: 'Discovery',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: CalendarCheck,
    title: 'Seamless Event Creation',
    description:
      'Publish volunteer drives in under two minutes with intuitive date validation, categorized tags, location pins, and custom event descriptions.',
    badge: 'Organization',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: UsersRound,
    title: 'One-Click Volunteer Participation',
    description:
      'Register for upcoming causes with a single click. Keep track of all joined events in your personal schedule sorted chronologically.',
    badge: 'Engagement',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: BarChart3,
    title: 'Organizer Event Management',
    description:
      'Take complete control over your initiatives. Safely modify event dates, descriptions, and details, or remove obsolete listings with full ownership checks.',
    badge: 'Control',
    color: 'from-purple-500 to-pink-600',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Grassroots Impact',
    description:
      'Ensure high transparency. Only legitimate community volunteers and verified local organizers host events focused on authentic social welfare.',
    badge: 'Trust',
    color: 'from-teal-500 to-emerald-700',
  },
  {
    icon: Sparkles,
    title: 'Adaptive Light & Dark Theme',
    description:
      'Comfortable browsing day or night with a seamless theme toggler designed with high-contrast accessibility standards.',
    badge: 'Accessibility',
    color: 'from-rose-500 to-red-600',
  },
];

export default function FeatureSection() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900/60 border-y border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Platform Capabilities
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Built for Grassroots Action and Measurable Social Good
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            CareSphere equips every volunteer and organizer with the essential digital tools needed to turn community empathy into tangible, real-world impact.
          </p>
        </div>

        {/* Feature Cards Grid (Equal height and width) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-7 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Empowering Change</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

