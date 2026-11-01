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
    <section className="py-24 bg-[#F7F8F0] dark:bg-[#0A130E] border-b border-[#14532D]/10 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9F3E5] dark:bg-[#14532D]/40 border border-[#14532D]/20 text-[#14532D] dark:text-[#D9F3E5] text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#159A70]" />
            <span>Neighborhood Chapters</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101B17] dark:text-[#F7F8F0] tracking-tight">
            Explore Community Initiatives by Neighborhood
          </h2>
          <p className="text-sm sm:text-base text-[#101B17]/70 dark:text-[#F7F8F0]/70">
            Select a community chapter below to discover active volunteer teams, emergency relief drives, and local impact milestones.
          </p>
        </div>

        {/* Segmented Filter Bar */}
        <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-[#0F1E16] border border-[#14532D]/15 dark:border-white/10 flex-wrap gap-1.5 mb-8 max-w-full shadow-xs">
          {hubs.map((hub) => (
            <button
              key={hub.id}
              type="button"
              onClick={() => setActiveHub(hub)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeHub.id === hub.id
                  ? 'bg-[#14532D] text-white shadow-sm'
                  : 'text-[#101B17]/70 dark:text-[#F7F8F0]/70 hover:text-[#101B17] dark:hover:text-white hover:bg-[#D9F3E5]/40 dark:hover:bg-[#14532D]/30'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${activeHub.id === hub.id ? 'text-[#D9F3E5]' : 'text-[#159A70]'}`} />
              <span>{hub.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Hub Interactive Showcase Card */}
        <div className="bg-white dark:bg-[#0F1E16] rounded-[32px] p-6 sm:p-10 border border-[#14532D]/15 dark:border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
          {/* Left Column: Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-[#D9F3E5] dark:bg-[#14532D]/50 text-[#14532D] dark:text-[#D9F3E5] border border-[#14532D]/20">
                  {activeHub.zone} Division
                </span>
                <span className="text-xs text-[#101B17]/30 dark:text-[#F7F8F0]/30">•</span>
                <span className="text-xs text-[#159A70] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active Volunteer Chapter
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#101B17] dark:text-[#F7F8F0]">
                {activeHub.name} Community Chapter
              </h3>
              <p className="text-sm text-[#101B17]/70 dark:text-[#F7F8F0]/70 leading-relaxed">
                {activeHub.description}
              </p>
            </div>

            {/* Featured Drive Information */}
            <div className="p-5 rounded-2xl bg-[#F7F8F0] dark:bg-[#0A130E] border border-[#14532D]/10 dark:border-white/10 space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#159A70]">
                Current Priority Initiative
              </p>
              <p className="font-extrabold text-sm text-[#101B17] dark:text-[#F7F8F0]">
                {activeHub.featuredInitiative}
              </p>
            </div>

            {/* CTA to view events in this hub */}
            <div className="pt-2">
              <Link
                href={`/events?search=${encodeURIComponent(activeHub.queryParam)}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-white bg-[#14532D] hover:bg-[#0F3F22] transition-all shadow-md shadow-[#14532D]/20 hover:translate-y-[-1px]"
              >
                <span>View All Initiatives in {activeHub.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Photo & Live Hub Metrics */}
          <div className="lg:col-span-5 space-y-4">
            {/* Hub Photo Card */}
            <div className="relative h-48 rounded-[24px] overflow-hidden border border-[#14532D]/15 dark:border-white/10 shadow-sm">
              <img
                src={activeHub.image}
                alt={activeHub.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101B17]/90 via-transparent to-transparent" />
              <div className="absolute bottom-3.5 left-4 text-white">
                <p className="text-xs font-bold text-[#F7F8F0]">{activeHub.name} Field Headquarters</p>
                <p className="text-[11px] text-[#D9F3E5]">Active Volunteer Corps</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-[#F7F8F0] dark:bg-[#0A130E] border border-[#14532D]/10 dark:border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-[#101B17]/60 dark:text-[#F7F8F0]/60">Volunteers</p>
                  <Users className="w-4 h-4 text-[#159A70]" />
                </div>
                <p className="text-2xl font-black text-[#101B17] dark:text-[#F7F8F0]">
                  {activeHub.volunteersEnrolled}+
                </p>
                <p className="text-[10px] text-[#101B17]/40 dark:text-[#F7F8F0]/40">Enrolled members</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F8F0] dark:bg-[#0A130E] border border-[#14532D]/10 dark:border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-[#101B17]/60 dark:text-[#F7F8F0]/60">Active Drives</p>
                  <HeartHandshake className="w-4 h-4 text-[#159A70]" />
                </div>
                <p className="text-2xl font-black text-[#101B17] dark:text-[#F7F8F0]">
                  {activeHub.activeDrives}
                </p>
                <p className="text-[10px] text-[#101B17]/40 dark:text-[#F7F8F0]/40">Open for RSVP</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#14532D] text-white border border-[#159A70]/30 space-y-1 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs text-[#D9F3E5]">
                <ShieldCheck className="w-4 h-4 text-[#D9F3E5]" />
                <span className="font-bold uppercase tracking-wider text-[10px]">Verified Field Milestone</span>
              </div>
              <p className="text-base font-extrabold text-white">
                {activeHub.highlightStat}
              </p>
              <p className="text-[11px] text-[#D9F3E5]/80">
                Monitored and confirmed by CareSphere regional coordinators.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
