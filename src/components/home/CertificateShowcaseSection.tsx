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
    <section className="py-24 bg-[#F7F8F0] dark:bg-[#0A130E] border-b border-[#14532D]/10 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] bg-white dark:bg-[#0F1E16] border border-[#14532D]/10 dark:border-white/10 p-8 sm:p-12 lg:p-16 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Explanatory Copy & Key Features */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9F3E5] dark:bg-[#14532D]/40 border border-[#14532D]/20 text-[#14532D] dark:text-[#D9F3E5] text-xs font-semibold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-[#159A70]" />
                <span>Verifiable Volunteer Recognition</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101B17] dark:text-[#F7F8F0] tracking-tight leading-tight">
                Authentic Single-Page A4 Certificates for Every Dedicated Volunteer.
              </h2>

              <p className="text-base text-[#101B17]/70 dark:text-[#F7F8F0]/70 leading-relaxed">
                Volunteering requires time, empathy, and sweat. CareSphere honors your contribution by generating an official, single-page A4 landscape certificate of community service for every drive you join.
              </p>

              {/* Bullet Features */}
              <div className="space-y-3 pt-2 text-sm text-[#101B17]/80 dark:text-[#F7F8F0]/80">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D9F3E5] dark:bg-[#14532D]/60 text-[#14532D] dark:text-[#D9F3E5] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#159A70]" />
                  </div>
                  <div>
                    <strong className="text-[#101B17] dark:text-[#F7F8F0] font-bold">100% Guaranteed 1-Page A4 Printout:</strong> CSS print rules engineered to prevent awkward 2nd and 3rd page spillover in browser print dialogs.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D9F3E5] dark:bg-[#14532D]/60 text-[#14532D] dark:text-[#D9F3E5] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#159A70]" />
                  </div>
                  <div>
                    <strong className="text-[#101B17] dark:text-[#F7F8F0] font-bold">Unique Verifiable Identifier:</strong> Each certificate receives a cryptographic tracking code (e.g. <span className="font-mono text-[#159A70] dark:text-[#D9F3E5] text-xs font-semibold">CS-VOL-8996</span>) suitable for college and job resumes.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D9F3E5] dark:bg-[#14532D]/60 text-[#14532D] dark:text-[#D9F3E5] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#159A70]" />
                  </div>
                  <div>
                    <strong className="text-[#101B17] dark:text-[#F7F8F0] font-bold">Instant 1-Click Print & PDF Save:</strong> Accessible anytime from your &ldquo;Joined Events&rdquo; dashboard.
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/events"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-[#14532D] hover:bg-[#0F3F22] shadow-md shadow-[#14532D]/20 transition-all hover:translate-y-[-1px]"
                >
                  <span>Join a Drive & Earn Certificate</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/joined-events"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-[#101B17] dark:text-[#F7F8F0] bg-[#F7F8F0] dark:bg-[#0A130E] hover:bg-[#D9F3E5]/40 dark:hover:bg-[#14532D]/30 border border-[#14532D]/15 dark:border-white/10 transition-colors"
                >
                  <Printer className="w-4 h-4 text-[#159A70]" />
                  <span>My Certificates</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Certificate Mockup */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-[28px] bg-[#F7F8F0] dark:bg-[#0A130E] p-6 sm:p-8 border-4 border-[#159A70]/40 shadow-2xl space-y-5 text-center">
                {/* Subtle Watermark Seal */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#159A70]/10 rounded-full blur-2xl pointer-events-none" />

                {/* Header */}
                <div className="space-y-1">
                  <p className="text-[10px] font-black tracking-widest uppercase text-[#14532D] dark:text-[#D9F3E5]">
                    CareSphere Social Development Platform
                  </p>
                  <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-[#101B17] dark:text-[#F7F8F0]">
                    Certificate of Community Service
                  </h3>
                  <p className="text-xs text-[#101B17]/60 dark:text-[#F7F8F0]/60 max-w-sm mx-auto">
                    In recognition of exemplary commitment to grassroots social action and civic compassion.
                  </p>
                </div>

                {/* Recipient */}
                <div className="py-4 border-y border-dashed border-[#14532D]/20 dark:border-white/15 space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#101B17]/60 dark:text-[#F7F8F0]/60">
                    This Certificate is Proudly Presented To
                  </p>
                  <p className="text-2xl font-black text-[#14532D] dark:text-[#D9F3E5]">
                    Abu Tahir Sk
                  </p>
                  <p className="text-xs text-[#101B17]/80 dark:text-[#F7F8F0]/80 font-medium">
                    For active service during: &ldquo;Winter Warmth & Relief Distribution&rdquo;
                  </p>
                  <p className="text-[10px] text-[#101B17]/60 dark:text-[#F7F8F0]/60">
                    Location: Mirpur 10 • Validated on: October 31, 2026
                  </p>
                </div>

                {/* Signatures & Seal */}
                <div className="grid grid-cols-3 gap-2 items-center pt-2 text-xs">
                  <div className="text-center">
                    <p className="font-serif italic text-sm text-[#101B17] dark:text-[#F7F8F0]">Abu Tahir Sk</p>
                    <p className="text-[9px] font-bold text-[#101B17]/60 dark:text-[#F7F8F0]/60 uppercase border-t border-[#14532D]/20 dark:border-white/15 pt-0.5 mt-0.5">
                      Event Organizer
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#D9F3E5] dark:bg-[#14532D]/60 border-2 border-[#159A70] flex items-center justify-center text-[#14532D] dark:text-[#D9F3E5] shadow-sm">
                      <ShieldCheck className="w-5 h-5 text-[#14532D] dark:text-[#D9F3E5]" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#14532D] dark:text-[#D9F3E5] mt-0.5">
                      Verified
                    </span>
                  </div>

                  <div className="text-center">
                    <span className="font-mono text-[10px] font-bold text-[#14532D] dark:text-[#D9F3E5] px-2 py-1 rounded bg-[#D9F3E5]/60 dark:bg-[#14532D]/40 border border-[#14532D]/20 dark:border-white/15">
                      CS-VOL-8996
                    </span>
                    <p className="text-[9px] font-bold text-[#101B17]/60 dark:text-[#F7F8F0]/60 uppercase pt-1">
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

