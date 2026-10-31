'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  ShieldCheck,
  Calendar,
  Search,
  MapPin,
  CheckCircle2,
  Users,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function BannerSection() {
  const router = useRouter();
  const [heroSearch, setHeroSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'operation' | 'certificate'>('operation');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/events?search=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      router.push('/events');
    }
  };

  const quickFilters = [
    { label: 'Mirpur 10', query: 'Mirpur' },
    { label: 'Mohammadpur', query: 'Mohammadpur' },
    { label: 'Winter Relief', query: 'Winter' },
    { label: 'Tree Plantation', query: 'Plantation' },
    { label: 'Free Healthcare', query: 'Health' },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      {/* Engineered Dot Grid Mesh Background with Smooth Radial Fade */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Subtle Ambient Emerald Accent Flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Mission, Quick Search & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-slate-800 dark:text-slate-200 text-xs font-medium shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-500" />
              </span>
              <span className="font-semibold text-emerald-800 dark:text-emerald-300">CareSphere Civic Network</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">Dhaka & 8 Divisions</span>
            </div>

            {/* High-Impact Executive Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.12]">
              Mobilizing Community Empathy into{' '}
              <span className="text-emerald-700 dark:text-emerald-400 underline decoration-emerald-500/30 decoration-wavy underline-offset-8">
                Measurable
              </span>{' '}
              Social Action.
            </h1>

            {/* Clear, Professional Mission Statement */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              CareSphere connects verified NGOs, volunteer societies, and citizens to coordinate emergency winter relief, urban tree plantation, and free medical camps across Bangladesh with authenticated service records.
            </p>

            {/* Professional Search Input Bar */}
            <div className="space-y-3 pt-2">
              <form
                onSubmit={handleHeroSearch}
                className="max-w-xl p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus-within:border-emerald-700 dark:focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-700/20 shadow-sm flex items-center gap-2 transition-all"
              >
                <div className="relative flex-1 flex items-center pl-3">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Search drives by area or cause (e.g. Mirpur 10, Winter Relief)..."
                    className="w-full pl-2.5 pr-2 py-2 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-sm text-white bg-emerald-700 hover:bg-emerald-800 shadow-xs shrink-0 transition-colors flex items-center gap-1.5"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Quick Filter Tag Links */}
              <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-400 dark:text-slate-500">Suggested:</span>
                {quickFilters.map((q) => (
                  <button
                    key={q.query}
                    type="button"
                    onClick={() => router.push(`/events?search=${encodeURIComponent(q.query)}`)}
                    className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-400 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/70 transition-colors"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/events"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm text-white bg-emerald-700 hover:bg-emerald-800 shadow-xs transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Explore Upcoming Drives</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>
              <Link
                href="/create-event"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs"
              >
                <span>Host an Initiative</span>
              </Link>
            </div>

            {/* Credibility & Impact Metrics Bar */}
            <div className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-200 dark:border-slate-800 max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">5,400+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Enrolled Volunteers</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">350+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Completed Drives</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">100%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Verified Grassroots</p>
              </div>
            </div>
          </div>

          {/* Right Column: Microsoft Fluent Civic Operations Console Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
              {/* Window Header Frame with Controls & Tabs */}
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-850">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 ml-1.5 font-medium">
                    caresphere-console.v2
                  </span>
                </div>

                {/* Switcher Tabs */}
                <div className="flex items-center p-0.5 rounded-md bg-slate-200/70 dark:bg-slate-800 text-[11px] font-medium">
                  <button
                    type="button"
                    onClick={() => setActiveTab('operation')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeTab === 'operation'
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Live Drive
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('certificate')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeTab === 'certificate'
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Certificate
                  </button>
                </div>
              </div>

              {/* Tab 1: Live Field Operation Preview */}
              {activeTab === 'operation' ? (
                <div>
                  <div className="relative h-52 w-full bg-slate-900">
                    <img
                      src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&auto=format&fit=crop&q=80"
                      alt="Volunteers packing food and warm winter relief supplies"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-slate-900/85 backdrop-blur-sm text-emerald-300 text-[11px] font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        Mirpur 10 • Dhaka North
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white">
                        Active Priority Drive
                      </span>
                      <h3 className="text-base font-bold text-white mt-1">
                        Emergency Winter Warmth & Blanket Distribution
                      </h3>
                    </div>
                  </div>

                  {/* Operation Metrics & Volunteer Stack */}
                  <div className="p-5 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Relief Package Distribution Quota</span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">1,240 / 1,500 (82%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full" style={{ width: '82%' }} />
                      </div>
                    </div>

                    {/* Volunteer Avatars Stack */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2 overflow-hidden">
                          <span className="inline-flex h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 bg-emerald-600 text-white text-xs font-bold items-center justify-center">
                            AT
                          </span>
                          <span className="inline-flex h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 bg-teal-600 text-white text-xs font-bold items-center justify-center">
                            MR
                          </span>
                          <span className="inline-flex h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 bg-blue-600 text-white text-xs font-bold items-center justify-center">
                            FH
                          </span>
                        </div>
                        <div className="text-xs">
                          <p className="font-semibold text-slate-800 dark:text-slate-200">42 Field Volunteers</p>
                          <p className="text-[11px] text-slate-400">Deployed at Mirpur 10</p>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800">
                        <ShieldCheck className="w-3.5 h-3.5" /> NGO Verified
                      </span>
                    </div>

                    <Link
                      href="/events?eventType=Winter+Relief"
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-2xs"
                    >
                      <span>Join This Winter Drive</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                /* Tab 2: Authentic Certificate of Service Preview */
                <div className="p-6 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="p-5 rounded-xl bg-white dark:bg-slate-950 border-2 border-amber-300 dark:border-amber-600/60 shadow-md text-center space-y-3 relative overflow-hidden">
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                        CareSphere Social Development Platform
                      </p>
                      <h4 className="text-sm font-extrabold uppercase text-slate-900 dark:text-white tracking-wide">
                        Certificate of Community Service
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        Presented for exemplary volunteer commitment in grassroots civic welfare.
                      </p>
                    </div>

                    <div className="py-2 border-y border-dashed border-slate-200 dark:border-slate-800">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Awarded To</p>
                      <p className="text-base font-extrabold text-emerald-800 dark:text-emerald-300">
                        Abu Tahir Sk
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Initiative: &ldquo;Winter Warmth & Relief Distribution&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1">
                      <span className="font-mono text-slate-400">ID: CS-VOL-8996</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" /> Authenticated Record
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                    All participants receive verified, single-page A4 landscape printable certificates with a unique tracking code.
                  </p>
                </div>
              )}
            </div>

            {/* Floating Live Badge (Glassmorphic Accent) */}
            <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Verifiable Credentials</p>
                <p className="text-xs font-bold text-slate-900 dark:text-white">A4 Printable Certificates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
