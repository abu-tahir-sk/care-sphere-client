'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, HeartHandshake, Users, ShieldCheck, Calendar } from 'lucide-react';

export default function BannerSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-emerald-50/60 via-white to-slate-50/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950">
      {/* Background ambient decorative blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-teal-400/10 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Community-Driven Social Action Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.15]">
              Empowering Neighbors to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Transform Lives
              </span>{' '}
              Together
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Join grassroots volunteers across Dhaka and beyond. Mobilize relief for the needy,
              clean local parks, plant trees, and run winter distribution drives right in your community.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/events"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/25 transition-all transform active:scale-95"
              >
                <Calendar className="w-5 h-5" />
                <span>Explore Upcoming Events</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/create-event"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 shadow-sm transition-all"
              >
                <HeartHandshake className="w-5 h-5 text-emerald-500" />
                <span>Organize an Event</span>
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">100%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Grassroots Driven</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">5,400+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Volunteers</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">350+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Drives Completed</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&auto=format&fit=crop&q=80"
                alt="Community volunteers packing food and winter relief packages"
                className="w-full h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wide w-fit mb-2">
                  Live Drive
                </span>
                <h3 className="text-xl font-bold leading-snug">
                  Winter Warmth & Meal Relief Drive
                </h3>
                <p className="text-xs text-slate-200 mt-1">
                  Mirpur & Mohammadpur Districts • Over 1,200 beneficiaries served
                </p>
              </div>
            </div>

            {/* Floating Info Card */}
            <div className="absolute -bottom-6 -left-6 sm:bottom-6 sm:-left-8 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex items-center gap-3 backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Platform</p>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">Community Validated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
