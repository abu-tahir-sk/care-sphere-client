'use client';

import React, { useState, useEffect } from 'react';
import { IEvent, ApiResponse } from '@/types';
import { apiRequest } from '@/lib/api';
import EventCard from '@/components/EventCard';
import { EventGridSkeleton } from '@/components/EventSkeleton';
import { Search, Filter, Calendar, PlusCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const categories = [
  'All',
  'Winter Relief',
  'Donation',
  'Plantation',
  'Cleanup',
  'Healthcare',
  'Education',
  'Food Drive',
];

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        setIsLoading(true);
        let url = '/events/upcoming?';
        const params = new URLSearchParams();

        if (selectedCategory !== 'All') {
          params.append('eventType', selectedCategory);
        }
        if (searchQuery.trim()) {
          params.append('search', searchQuery.trim());
        }

        const res = await apiRequest<ApiResponse<IEvent[]>>(`${url}${params.toString()}`);
        if (res.success && res.data) {
          setEvents(res.data);
        }
      } catch (err) {
        console.error('Error fetching upcoming events:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchUpcomingEvents();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="rounded-[32px] border border-[#14532D]/15 dark:border-white/10 bg-white dark:bg-[#0F1E16] p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#159A70]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D9F3E5] dark:bg-[#14532D]/40 text-[#14532D] dark:text-[#D9F3E5] border border-[#14532D]/20">
              <ShieldCheck className="w-3.5 h-3.5 text-[#159A70]" />
              <span>Verified Community Directory</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#101B17] dark:text-[#F7F8F0]">
              Upcoming Volunteer Drives & Initiatives
            </h1>
            <p className="text-base text-[#101B17]/70 dark:text-[#F7F8F0]/70 leading-relaxed">
              Explore verified grassroots initiatives scheduled in your neighborhood. Discover winter clothes distribution drives, cleanups, tree plantation campaigns, and free health checks.
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white dark:bg-[#0F1E16] p-6 rounded-[28px] shadow-sm border border-[#14532D]/15 dark:border-white/10 space-y-5">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#101B17]/40 dark:text-[#F7F8F0]/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by event title, location (e.g. Mirpur 10, Mohammadpur), or keyword..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#14532D]/15 dark:border-white/10 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] placeholder:text-[#101B17]/40 dark:placeholder:text-[#F7F8F0]/40 text-xs sm:text-sm focus:outline-none focus:border-[#14532D] dark:focus:border-[#159A70]"
              />
            </div>

            {/* Create Event CTA */}
            <Link
              href="/create-event"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-[#14532D] hover:bg-[#0F3F22] shadow-md shadow-[#14532D]/20 shrink-0 transition-all hover:translate-y-[-1px]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Host an Initiative</span>
            </Link>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-3 border-t border-[#14532D]/10 dark:border-white/10">
            <span className="text-[11px] font-bold text-[#101B17]/50 dark:text-[#F7F8F0]/50 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3 h-3 text-[#159A70]" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#14532D] text-white shadow-sm'
                    : 'bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17]/70 dark:text-[#F7F8F0]/70 hover:text-[#101B17] dark:hover:text-white hover:bg-[#D9F3E5]/40 dark:hover:bg-[#14532D]/30 border border-[#14532D]/10 dark:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#101B17]/60 dark:text-[#F7F8F0]/60 px-1">
          <p>
            Showing <strong className="font-bold text-[#101B17] dark:text-[#F7F8F0]">{events.length}</strong> upcoming initiative{events.length === 1 ? '' : 's'}
          </p>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-xs font-bold text-[#14532D] dark:text-[#159A70] hover:underline"
            >
              Reset Category
            </button>
          )}
        </div>

        {/* Grid List or Skeleton */}
        {isLoading ? (
          <EventGridSkeleton count={6} />
        ) : events.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white dark:bg-[#0F1E16] rounded-[28px] border border-[#14532D]/15 dark:border-white/10 space-y-4 shadow-sm">
            <Calendar className="w-12 h-12 text-[#159A70] mx-auto opacity-70" />
            <h3 className="text-lg font-bold text-[#101B17] dark:text-[#F7F8F0]">
              No Initiatives Found Matching Criteria
            </h3>
            <p className="text-xs text-[#101B17]/60 dark:text-[#F7F8F0]/60 max-w-md mx-auto">
              Try adjusting your search keyword or selecting a different category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-[#14532D] dark:text-[#D9F3E5] bg-[#D9F3E5]/60 dark:bg-[#14532D]/40 border border-[#14532D]/20 hover:bg-[#D9F3E5] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
