'use client';

import React from 'react';
import { Award, Users, HeartHandshake, Trees, Heart, ShieldCheck } from 'lucide-react';

const stats = [
  {
    icon: HeartHandshake,
    value: '১৮,৫০০+',
    label: 'শীতবস্ত্র ও খাদ্য সহায়তা পৌঁছে দেওয়া হয়েছে',
    detail: 'তীব্র শীতে অসহায় পরিবারের মাঝে কম্বল, জ্যাকেট ও পুষ্টিকর খাবার',
    badge: 'মানবিক সেবা',
  },
  {
    icon: Users,
    value: '৫,৪২০+',
    label: 'নিবেদিতপ্রাণ তরুণ সমাজসেবী',
    detail: 'দেশের ৮টি প্রশাসনিক বিভাগ জুড়ে মাঠে সক্রিয় মানবিক সদস্য',
    badge: 'স্বেচ্ছাসেবক পরিবার',
  },
  {
    icon: Trees,
    value: '৬,২০০+',
    label: 'সবুজ চারা রোপণ ও পরিচর্যা',
    detail: 'লেকপার ও উন্মুক্ত ফুটপাতে ফলজ ও বনজ বৃক্ষ রোপণ কর্মসূচি',
    badge: 'পরিবেশ রক্ষা',
  },
  {
    icon: Award,
    value: '৩৫০+',
    label: 'সফল সামাজিক কার্যক্রম সম্পন্ন',
    detail: 'কোনো বাণিজ্যিক ফি ছাড়া শতভাগ স্থানীয় মানুষের ভালোবাসায় আয়োজিত',
    badge: '১০০% অলাভজনক',
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
              className="p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-850 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-emerald-500/40 transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100/70 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                  <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> {stat.badge}
                </span>
              </div>

              <div>
                <p className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
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
