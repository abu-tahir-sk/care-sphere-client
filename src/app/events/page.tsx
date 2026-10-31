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
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-slate-50/60 dark:bg-slate-950/40 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header (Microsoft Fluent Directory Header) */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xs">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Public Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
              Upcoming Community Relief Drives & Civic Operations
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Explore verified grassroots initiatives scheduled in your neighborhood. Discover winter clothes distribution drives, cleanups, plantation campaigns, and free health checks.
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl shadow-2xs border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by event title, location (e.g. Mirpur 10, Mohammadpur), or keyword..."
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:border-emerald-700 dark:focus:border-emerald-500"
              />
            </div>

            {/* Create Event CTA */}
            <Link
              href="/create-event"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-medium text-xs sm:text-sm text-white bg-emerald-700 hover:bg-emerald-800 shadow-2xs shrink-0 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Host an Initiative</span>
            </Link>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white font-semibold shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <p>
            Showing <strong className="font-semibold text-slate-800 dark:text-slate-200">{events.length}</strong> upcoming initiative{events.length === 1 ? '' : 's'}
          </p>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              Reset Category
            </button>
          )}
        </div>

        {/* Grid List or Skeleton */}
        {isLoading ? (
          <EventGridSkeleton count={6} />
        ) : events.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <Calendar className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No Initiatives Found Matching Criteria
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your search keyword or selecting a different category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-lg font-medium text-xs text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
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
