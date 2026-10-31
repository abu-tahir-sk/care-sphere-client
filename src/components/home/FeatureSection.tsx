'use client';

import React from 'react';
import {
  Compass,
  CalendarCheck,
  UsersRound,
  ShieldCheck,
  FileCheck2,
  SlidersHorizontal,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Heart,
} from 'lucide-react';
import Link from 'next/link';

export default function FeatureSection() {
  return (
    <section className="py-20 bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100/80 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>সামাজিক সেবামূলক সুযোগ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            সমাজের সুবিধাবঞ্চিত মানুষের পাশে দাঁড়ানোর উন্মুক্ত মাধ্যম
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            CareSphere কোনো বাণিজ্যিক সাইট নয়—এটি সাধারণ মানুষ ও তরুণ সমাজসেবীদের স্বেচ্ছাসেবার একটি পরিবার। অসহায়ের মুখে খাবার তুলে দেওয়া থেকে শুরু করে শীতবস্ত্র বিতরণ পর্যন্ত প্রতিটি উদ্যোগকে সহজে সমন্বয় করা যায় এখানে।
          </p>
        </div>

        {/* Modern Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1 (Large 2-column span): Hyperlocal Relief */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  সরাসরি এলাকায় সেবা
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  আপনার মহল্লা ও জেলায় চলমান সেবামূলক কাজ
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-1 max-w-xl">
                  দূর-দূরান্তে যেতে হবে না—মিরপুর, মোহাম্মদপুর, ধানমন্ডি বা আপনার নিজ বিভাগীয় শহরের আশপাশেই শীতার্তদের কম্বল বিতরণ, পরিচ্ছন্নতা ড্রাইভ কিংবা বৃক্ষরোপণে অংশ নিন।
                </p>
              </div>

              {/* Real Local Relief Hub Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">ঢাকা উত্তর</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">মিরপুর ১০</p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">৮টি ত্রাণ ও শীতবস্ত্র ড্রাইভ</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">ঢাকা পশ্চিম</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">মোহাম্মদপুর</p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">৬টি খাবার বিতরণ উদ্যোগ</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">ঢাকা সেন্ট্রাল</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">ধানমন্ডি লেক</p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">৫টি পরিবেশ ও বৃক্ষরোপণ কাজ</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">উপকূলীয় অঞ্চল</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">পতেঙ্গা, চট্টগ্রাম</p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">৩টি ম্যানগ্রোভ রোপণ কাজ</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6 flex items-center justify-between">
              <span className="text-xs text-slate-500">কোনো বাণিজ্যিক ফি নেই • শতভাগ উন্মুক্ত সেবা</span>
              <Link href="/events" className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1">
                <span>সব উদ্যোগ দেখুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento Card 2: A4 Certificate */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                  স্বীকৃতি ও সম্মাননা
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  স্বেচ্ছাসেবকদের অফিসিয়াল সেবা সনদ (A4)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                  সমাজের জন্য আপনার নিঃস্বার্থ শ্রম ও ভালোবাসার স্বীকৃতি হিসেবে প্রতিটি সামাজিক কাজ শেষে একক পৃষ্ঠার ভেরিফাইড প্রিন্টযোগ্য সনদ লাভ করুন।
                </p>
              </div>

              {/* Certificate Preview Badge */}
              <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-600/50 text-center space-y-1">
                <p className="text-[10px] font-extrabold uppercase text-slate-800 dark:text-slate-200 tracking-wider">
                  Certificate of Community Service
                </p>
                <p className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                  ভেরিফাইড আইডি সহ প্রিন্ট উপযোগী (1/1)
                </p>
                <div className="inline-flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> সিভি ও পোর্টফোলিওর জন্য মানসম্মত
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
              যেকোনো সামাজিক কাজের পর ডাউনলোডযোগ্য
            </div>
          </div>

          {/* Bento Card 3: Free Transparent Registration */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <UsersRound className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  সহজ অন্তর্ভুক্তি
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  এক ক্লিকেই স্বেচ্ছাসেবক হিসেবে যোগদান
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                  স্বেচ্ছাসেবী কোটা ট্র্যাকিংয়ের মাধ্যমে অতিরিক্ত ভিড় বা বিশৃঙ্খলা রোধ করা হয়। নাম লিখলেই সরাসরি আপনার ড্যাশবোর্ডে যুক্ত হবে।
                </p>
              </div>

              {/* Progress UI Mockup */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">ফিল্ড টিম সক্ষমতা</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">৪২ / ৫০ জন স্বেচ্ছাসেবী যুক্ত</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '84%' }} />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
              সুশৃঙ্খলভাবে ত্রাণ বিতরণের প্রস্তুতি
            </div>
          </div>

          {/* Bento Card 4: Host Social Work */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  নেতৃত্ব দিন
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  নিজে উদ্যোগ নিয়ে সমাজের পাশে দাঁড়ান
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-1 max-w-xl">
                  আপনিও পারেন নিজ এলাকাকে বদলাতে। শীতবস্ত্র বিতরণ, রক্তের সন্ধান, পরিবেশ সংরক্ষণ কিংবা পথশিশুদের পড়াশোনার জন্য ইভেন্ট তৈরি করে বন্ধুদের আমন্ত্রণ জানান।
                </p>
              </div>

              {/* Status Chips Row */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-semibold">
                  ✓ শতভাগ উন্মুক্ত ও ফ্রি
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 font-semibold">
                  ✓ ভলান্টিয়ার তালিকা ও CSV এক্সপোর্ট
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-semibold">
                  ✓ সরাসরি সেবা সনদ প্রদান
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6 flex items-center justify-between">
              <span className="text-xs text-slate-500">আপনার ছোট উদ্যোগই বদলাতে পারে কারও জীবন</span>
              <Link href="/create-event" className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1">
                <span>নতুন উদ্যোগ শুরু করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
