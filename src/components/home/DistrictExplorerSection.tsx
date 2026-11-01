'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Users, HeartHandshake, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface DistrictHub {
  id: string;
  name: string;
  zone: string;
  activeDrives: number;
  volunteersEnrolled: number;
  featuredInitiative: string;
  description: string;
  highlightStat: string;
  queryParam: string;
  image: string;
}

const hubs: DistrictHub[] = [
  {
    id: 'mirpur',
    name: 'Mirpur 10',
    zone: 'Dhaka North',
    activeDrives: 8,
    volunteersEnrolled: 420,
    featuredInitiative: 'Winter Clothes Distribution & Hot Meal Packaging Drive',
    description: 'Supporting daily-wage rickshaw pullers, garment workers, and underprivileged families near the Mirpur 10 roundabout.',
    highlightStat: '1,400+ Warm Sweaters & Jackets Delivered',
    queryParam: 'Mirpur',
    image: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'mohammadpur',
    name: 'Mohammadpur',
    zone: 'Dhaka West',
    activeDrives: 6,
    volunteersEnrolled: 380,
    featuredInitiative: 'Blanket Distribution & Community Kitchen Aid at Town Hall',
    description: 'Mobilizing emergency insulated fleece blankets and nutritious meals for elderly citizens in temporary informal shelters.',
    highlightStat: '500+ Thermal Fleece Blankets Handed Out',
    queryParam: 'Mohammadpur',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'dhanmondi',
    name: 'Dhanmondi Lake',
    zone: 'Dhaka Central',
    activeDrives: 5,
    volunteersEnrolled: 610,
    featuredInitiative: 'Lakeside Urban Tree Plantation & Environmental Walkway Care',
    description: 'Restoring green tree canopy and fruit saplings with protective bamboo enclosures along pedestrian walkways.',
    highlightStat: '850+ Indigenous Saplings Planted',
    queryParam: 'Dhanmondi',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'uttara',
    name: 'Uttara',
    zone: 'Dhaka North',
    activeDrives: 4,
    volunteersEnrolled: 290,
    featuredInitiative: 'Free Health Screening, Blood Glucose & Medicine Camp',
    description: 'Volunteer doctors and medical interns providing general diagnosis, prescription drugs, and hygiene counseling.',
    highlightStat: '620+ Free Patient Consultations',
    queryParam: 'Uttara',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'farmgate',
    name: 'Farmgate & Tejgaon',
    zone: 'Dhaka Central',
    activeDrives: 4,
    volunteersEnrolled: 230,
    featuredInitiative: 'Education for All: Children Storybook & Stationery Giveaway',
    description: 'Supplying notebooks, school bags, and primary readers to underprivileged children attending open-air street schools.',
    highlightStat: '1,100+ Books & Geometry Sets Distributed',
    queryParam: 'Farmgate',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'chattogram',
    name: 'Chattogram Coast',
    zone: 'Chattogram Division',
    activeDrives: 3,
    volunteersEnrolled: 310,
    featuredInitiative: 'Coastal Mangrove Restoration & Beach Cleanup',
    description: 'Preventing tidal soil erosion and plastic debris accumulation along vulnerable coastal estuaries and Patenga beach.',
    highlightStat: '2,200+ Mangrove Seedlings Rooted',
    queryParam: 'Chattogram',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80',
  },
];

export default function DistrictExplorerSection() {
  const [activeHub, setActiveHub] = useState<DistrictHub>(hubs[0]);

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Neighborhood Chapters
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            Explore Community Initiatives by Neighborhood
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Select a community chapter below to discover active volunteer teams, emergency relief drives, and local impact milestones.
          </p>
        </div>

        {/* Microsoft Fluent-style Segmented Filter Bar */}
        <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex-wrap gap-1 mb-8 max-w-full">
          {hubs.map((hub) => (
            <button
              key={hub.id}
              type="button"
              onClick={() => setActiveHub(hub)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeHub.id === hub.id
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold shadow-xs border border-slate-200/60 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{hub.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Hub Interactive Showcase Card */}
        <div className="bg-slate-50/70 dark:bg-slate-950/60 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
          {/* Left Column: Details */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                  {activeHub.zone} Division
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active Volunteer Chapter
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {activeHub.name} Community Chapter
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeHub.description}
              </p>
            </div>

            {/* Featured Drive Information */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-2xs">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Current Priority Initiative
              </p>
              <p className="font-bold text-sm text-slate-900 dark:text-white">
                {activeHub.featuredInitiative}
              </p>
            </div>

            {/* CTA to view events in this hub */}
            <div className="pt-2">
              <Link
                href={`/events?search=${encodeURIComponent(activeHub.queryParam)}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md shadow-emerald-700/15 hover:translate-y-[-1px]"
              >
                <span>View All Initiatives in {activeHub.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Photo & Live Hub Metrics */}
          <div className="lg:col-span-5 space-y-4">
            {/* Hub Photo Card */}
            <div className="relative h-44 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-2xs">
              <img
                src={activeHub.image}
                alt={activeHub.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-xs font-bold">{activeHub.name} Field Headquarters</p>
                <p className="text-[11px] text-emerald-300">Active Volunteer Corps</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-2xs">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Volunteers</p>
                  <Users className="w-4 h-4 text-slate-400" />
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  {activeHub.volunteersEnrolled}+
                </p>
                <p className="text-[10px] text-slate-400">Enrolled members</p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-2xs">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Active Drives</p>
                  <HeartHandshake className="w-4 h-4 text-slate-400" />
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  {activeHub.activeDrives}
                </p>
                <p className="text-[10px] text-slate-400">Open for RSVP</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold uppercase tracking-wider text-[10px]">Verified Field Milestone</span>
              </div>
              <p className="text-base font-bold text-white">
                {activeHub.highlightStat}
              </p>
              <p className="text-[11px] text-slate-400">
                Monitored and confirmed by CareSphere regional coordinators.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
