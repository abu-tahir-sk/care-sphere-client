'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Heart,
  Search,
  ArrowRight,
  MapPin,
  Users,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export default function BannerSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/events');
    }
  };

  const causes = [
    { label: 'শীতবস্ত্র বিতরণ (Winter Relief)', query: 'Winter', emoji: '🧥' },
    { label: 'খাদ্য সহায়তা (Food Drive)', query: 'Food', emoji: '🍲' },
    { label: 'বৃক্ষরোপণ (Tree Plantation)', query: 'Plantation', emoji: '🌳' },
    { label: 'ফ্রি স্বাস্থ্যসেবা (Medical Camp)', query: 'Health', emoji: '🩺' },
    { label: 'পরিচ্ছন্নতা অভিযান (Cleanup)', query: 'Cleanup', emoji: '🧹' },
  ];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-amber-50/40 via-white to-emerald-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Authentic Social Welfare Mission */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Social Service Non-Profit Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/70 border border-emerald-300/80 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 font-medium shadow-2xs">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span className="font-semibold">১০০% অলাভজনক সামাজিক প্ল্যাটফর্ম</span>
              <span className="text-emerald-400">•</span>
              <span>মানুষের পাশে, মানবিক সহায়তায়</span>
            </div>

            {/* Heartfelt Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.18]">
                মানুষের পাশে, ভালোবাসার হাত বাড়িয়ে।
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-emerald-800 dark:text-emerald-400">
                Together, We Bring Warmth, Care, and Hope to Every Corner.
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              CareSphere কোনো বাণিজ্যিক সাইট নয়—এটি সাধারণ নাগরিক ও তরুণ স্বেচ্ছাসেবীদের একটি উন্মুক্ত সামাজিক পরিবার। তীব্র শীতে ছিন্নমূল মানুষের কাছে উষ্ণ কম্বল পৌঁছে দেওয়া, ক্ষুধার্তকে খাদ্য সহায়তা দেওয়া এবং সবুজ বাংলাদেশ গড়তে এক ক্লিকেই অংশ নিন।
            </p>

            {/* Search for Social Drives */}
            <div className="pt-1 max-w-lg space-y-3">
              <form
                onSubmit={handleSearch}
                className="p-1.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-500/30 dark:border-emerald-500/20 focus-within:border-emerald-600 shadow-md flex items-center gap-2 transition-all"
              >
                <div className="relative flex-1 flex items-center pl-3">
                  <Search className="w-4 h-4 text-emerald-600 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="আপনার এলাকায় সামাজিক কাজ খুঁজুন (যেমন: Mirpur, Winter Relief)..."
                    className="w-full pl-2.5 pr-2 py-2 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-700 hover:bg-emerald-800 shrink-0 shadow-sm transition-all"
                >
                  খুঁজুন
                </button>
              </form>

              {/* Quick Causes Tags */}
              <div className="flex items-center gap-1.5 flex-wrap text-xs pt-1">
                <span className="font-bold text-slate-500 text-[11px]">মূল সামাজিক কাজ:</span>
                {causes.map((c) => (
                  <button
                    key={c.query}
                    type="button"
                    onClick={() => router.push(`/events?search=${encodeURIComponent(c.query)}`)}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors shadow-2xs"
                  >
                    <span>{c.emoji} {c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/events"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm transition-colors"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>আসন্ন সেবামূলক উদ্যোগে যোগ দিন</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/create-event"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs"
              >
                <span>নতুন সামাজিক কাজ শুরু করুন</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Authentic Social Impact Showcase */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/20 shadow-xl bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&auto=format&fit=crop&q=80"
                alt="Volunteers handing food and warm winter blankets to underprivileged families"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

              {/* Heart Badge Top */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-900/90 text-emerald-800 dark:text-emerald-300 backdrop-blur-md shadow-sm">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  চলমান মানবিক সেবা
                </span>
              </div>

              {/* Emotional Humanitarian Caption on Image Bottom */}
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-white space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    মিরপুর ১০ ও মোহাম্মদপুর এলাকা
                  </span>
                  <span className="text-[11px] text-slate-300 bg-white/10 px-2 py-0.5 rounded-md">
                    ঢাকা
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  তীব্র শীতে অসহায় মানুষের পাশে উষ্ণ কম্বল ও খাদ্য বিতরণ
                </h3>

                <p className="text-xs text-slate-300 italic">
                  &ldquo;আপনার দেওয়া একটি কম্বল ফুটপাতে রাত কাটানো একটি শিশুর মুখে প্রশান্তির হাসি ফোটাতে পারে।&rdquo;
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span>৪২ জন তরুণ স্বেচ্ছাসেবী যুক্ত হয়েছেন</span>
                  </div>
                  <Link
                    href="/events?eventType=Winter+Relief"
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 underline"
                  >
                    বিস্তারিত দেখুন
                  </Link>
                </div>
              </div>
            </div>

            {/* Non-Profit Trust Guarantee Note */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-center gap-3 text-xs text-emerald-950 dark:text-emerald-200">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold">১০০% স্বচ্ছ ও অবাণিজ্যিক সেবা</p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  স্বেচ্ছাসেবী অংশগ্রহণে কোনো প্ল্যাটফর্ম ফি নেই। প্রতিটি সামাজিক কাজের হিসাব ও তালিকা উন্মুক্ত।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
