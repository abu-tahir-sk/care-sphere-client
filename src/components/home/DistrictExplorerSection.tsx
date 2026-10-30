'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Users, HeartHandshake, ArrowRight, Sparkles, Compass } from 'lucide-react';

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
}

const hubs: DistrictHub[] = [
  {
    id: 'mirpur',
    name: 'Mirpur 10',
    zone: 'Dhaka North',
    activeDrives: 8,
    volunteersEnrolled: 420,
    featuredInitiative: 'Winter Clothes Distribution & Hot Khichuri Distribution',
    description: 'Supporting daily-wage rickshaw pullers, garment workers, and underprivileged families near the Mirpur 10 roundabout.',
    highlightStat: '1,400+ Warm Sweaters Delivered',
    queryParam: 'Mirpur',
  },
  {
    id: 'mohammadpur',
    name: 'Mohammadpur',
    zone: 'Dhaka West',
    activeDrives: 6,
    volunteersEnrolled: 380,
    featuredInitiative: 'Blanket Distribution for the Needy & Town Hall Food Drive',
    description: 'Mobilizing emergency insulated fleece blankets and nutritious meals for elderly citizens living in temporary shelters.',
    highlightStat: '500+ Thermal Blankets Distributed',
    queryParam: 'Mohammadpur',
  },
  {
    id: 'dhanmondi',
    name: 'Dhanmondi Lake',
    zone: 'Dhaka Central',
    activeDrives: 5,
    volunteersEnrolled: 610,
    featuredInitiative: 'Lakeside Urban Tree Plantation & Environmental Walkway Care',
    description: 'Restoring green tree canopy and fruit saplings with protective bamboo enclosures along the pedestrian walkways.',
    highlightStat: '850+ Indigenous Saplings Planted',
    queryParam: 'Dhanmondi',
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
  },
  {
    id: 'farmgate',
    name: 'Farmgate & Tejgaon',
    zone: 'Dhaka Central',
    activeDrives: 4,
    volunteersEnrolled: 230,
    featuredInitiative: 'Education for All: Children Storybook & Stationery Giveaway',
    description: 'Supplying notebooks, school bags, and primary readers to underprivileged children attending open-air street schools.',
    highlightStat: '1,100+ Books & Geometry Sets Handed Out',
    queryParam: 'Farmgate',
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
  },
];

export default function DistrictExplorerSection() {
  const [activeHub, setActiveHub] = useState<DistrictHub>(hubs[0]);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Hyperlocal Impact Zones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Explore Active Grassroots Hubs in Your District
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            CareSphere connects neighborhoods across Dhaka and beyond. Click through local zones to discover active relief efforts and volunteer statistics.
          </p>
        </div>

        {/* District Selector Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {hubs.map((hub) => (
            <button
              key={hub.id}
              type="button"
              onClick={() => setActiveHub(hub)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                activeHub.id === hub.id
                  ? 'bg-emerald-600 text-white shadow-emerald-500/25 scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>{hub.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Hub Interactive Showcase Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                {activeHub.zone} Region
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
                {activeHub.name} Community Hub
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeHub.description}
              </p>
            </div>

            {/* Featured Drive Card */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Flagship Initiative
              </p>
              <p className="font-bold text-sm text-slate-900 dark:text-white">
                {activeHub.featuredInitiative}
              </p>
            </div>

            {/* CTA to view events in this hub */}
            <div className="pt-2">
              <Link
                href={`/events?search=${encodeURIComponent(activeHub.queryParam)}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-500/25 transition-all transform active:scale-95"
              >
                <span>View All Drives in {activeHub.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Live Hub Metrics */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white">
                {activeHub.volunteersEnrolled}+
              </p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Active Local Volunteers
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white">
                {activeHub.activeDrives}
              </p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Scheduled Drives
              </p>
            </div>

            <div className="sm:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                Demonstrated Community Milestone
              </p>
              <p className="text-xl font-black text-white">
                {activeHub.highlightStat}
              </p>
              <p className="text-[11px] text-emerald-100">
                Audited & verified by CareSphere field monitors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
