'use client';

import React from 'react';
import Link from 'next/link';
import {
  Award,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
  Printer,
  ExternalLink,
  ArrowRight,
  Download,
} from 'lucide-react';

export default function CertificateShowcaseSection() {
  return (
    <section className="py-20 bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 lg:p-16 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Explanatory Copy & Key Features */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Verifiable Volunteer Recognition</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
                Authentic Single-Page A4 Certificates for Every Dedicated Volunteer.
              </h2>

              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Volunteering requires time, empathy, and sweat. CareSphere honors your contribution by generating an official, single-page A4 landscape certificate of community service for every drive you join.
              </p>

              {/* Bullet Features */}
              <div className="space-y-3 pt-2 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white font-bold">100% Guaranteed 1-Page A4 Printout:</strong> CSS print rules engineered to prevent awkward 2nd and 3rd page spillover in browser print dialogs.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white font-bold">Unique Verifiable Identifier:</strong> Each certificate receives a cryptographic tracking code (e.g. <span className="font-mono text-emerald-700 dark:text-emerald-400 text-xs font-semibold">CS-VOL-8996</span>) suitable for college and job resumes.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white font-bold">Instant 1-Click Print & PDF Save:</strong> Accessible anytime from your &ldquo;Joined Events&rdquo; dashboard.
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/events"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-emerald-700 hover:bg-emerald-800 shadow-xs transition-colors"
                >
                  <span>Join a Drive & Earn Certificate</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/joined-events"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>My Certificates</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Certificate Mockup */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl bg-white dark:bg-slate-950 p-6 sm:p-8 border-4 border-amber-300 dark:border-amber-600/60 shadow-2xl space-y-5 text-center">
                {/* Subtle Watermark Seal */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />

                {/* Header */}
                <div className="space-y-1">
                  <p className="text-[10px] font-black tracking-widest uppercase text-emerald-700 dark:text-emerald-400">
                    CareSphere Social Development Platform
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-slate-950 dark:text-white">
                    Certificate of Community Service
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    In recognition of exemplary commitment to grassroots social action and civic compassion.
                  </p>
                </div>

                {/* Recipient */}
                <div className="py-4 border-y border-dashed border-slate-200 dark:border-slate-800 space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    This Certificate is Proudly Presented To
                  </p>
                  <p className="text-2xl font-black text-emerald-800 dark:text-emerald-300">
                    Abu Tahir Sk
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    For active service during: &ldquo;Winter Warmth & Relief Distribution&rdquo;
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Location: Mirpur 10 • Validated on: October 31, 2026
                  </p>
                </div>

                {/* Signatures & Seal */}
                <div className="grid grid-cols-3 gap-2 items-center pt-2 text-xs">
                  <div className="text-center">
                    <p className="font-serif italic text-sm text-slate-800 dark:text-slate-200">Abu Tahir Sk</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase border-t border-slate-200 dark:border-slate-700 pt-0.5 mt-0.5">
                      Event Organizer
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/80 border-2 border-amber-400 flex items-center justify-center text-amber-600 shadow-sm">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-600 mt-0.5">
                      Verified
                    </span>
                  </div>

                  <div className="text-center">
                    <span className="font-mono text-[10px] font-bold text-slate-600 dark:text-slate-300 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      CS-VOL-8996
                    </span>
                    <p className="text-[9px] font-bold text-slate-400 uppercase pt-1">
                      Certificate ID
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

