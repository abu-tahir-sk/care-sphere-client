'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IEvent, ApiResponse } from '@/types';
import { apiRequest } from '@/lib/api';
import EventCard from '@/components/EventCard';
import { EventGridSkeleton } from '@/components/EventSkeleton';
import { Calendar, ArrowRight, Sparkles, Filter } from 'lucide-react';

const categories = [
  'All',
  'Winter Relief',
  'Donation',
  'Plantation',
  'Cleanup',
  'Food Drive',
  'Healthcare',
];

export default function RecentEventsSection() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        setIsLoading(true);
        // Using MongoDB .limit(6) operator via backend query
        const res = await apiRequest<ApiResponse<IEvent[]>>('/events/upcoming?limit=6');
        if (res.success && res.data) {
          setEvents(res.data);
        }
      } catch (err: any) {
        console.error('Failed to load recent events:', err);
        setError('Unable to load upcoming initiatives right now. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentEvents();
  }, []);

  const filteredEvents = activeCategory === 'All'
    ? events
    : events.filter(e => e.eventType.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className="py-20 bg-[#F7F8F0] dark:bg-[#0A130E] border-b border-[#14532D]/10 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#D9F3E5] dark:bg-[#14532D]/50 text-[#14532D] dark:text-[#D9F3E5] border border-[#159A70]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#159A70]" />
              <span>COMMUNITY CALENDAR</span>
            </div>
            <h2 className="font-manrope text-3xl sm:text-4xl font-extrabold text-[#101B17] dark:text-white tracking-tight">
              Recent Upcoming Events
            </h2>
            <p className="text-sm sm:text-base text-[#101B17]/75 dark:text-slate-300 leading-relaxed">
              Explore the latest 6 community initiatives scheduled across your neighborhoods. Verified grassroots drives where your hands-on help brings direct warmth and relief.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm text-[#101B17] dark:text-white bg-white dark:bg-[#0F1E16] hover:bg-[#D9F3E5]/40 dark:hover:bg-slate-800 border border-[#14532D]/20 dark:border-white/10 transition-all shrink-0 shadow-2xs hover:translate-y-[-1px] group"
          >
            <span>View All Upcoming Events</span>
            <ArrowRight className="w-4 h-4 text-[#159A70] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5 text-[#159A70]" />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#14532D] dark:bg-[#159A70] text-white shadow-sm'
                    : 'bg-white dark:bg-[#0F1E16] text-[#101B17]/75 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-[#159A70] hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Dynamic Event Content */}
        {isLoading ? (
          <EventGridSkeleton count={6} />
        ) : error ? (
          <div className="text-center py-10 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
            <p className="text-sm">{error}</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white dark:bg-[#0F1E16] rounded-3xl border border-[#14532D]/15 dark:border-white/10 space-y-4">
            <Calendar className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-[#101B17] dark:text-white">
              No Upcoming {activeCategory !== 'All' ? activeCategory : ''} Drives Found
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {activeCategory !== 'All'
                ? `There are currently no ${activeCategory} initiatives in the recent 6 events. Switch to "All" or browse all causes.`
                : 'Be the first community organizer to publish an initiative in your neighborhood.'}
            </p>
            <div className="pt-2 flex justify-center gap-3">
              {activeCategory !== 'All' && (
                <button
                  type="button"
                  onClick={() => setActiveCategory('All')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#14532D] dark:text-[#D9F3E5] bg-[#D9F3E5] dark:bg-[#14532D]/50"
                >
                  Show All Recent
                </button>
              )}
              <Link
                href="/create-event"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#14532D] hover:bg-[#0f3f22]"
              >
                Create an Event
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
