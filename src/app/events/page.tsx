'use client';

import React, { useState, useEffect } from 'react';
import { IEvent, ApiResponse } from '@/types';
import { apiRequest } from '@/lib/api';
import EventCard from '@/components/EventCard';
import { EventGridSkeleton } from '@/components/EventSkeleton';
import { Search, Filter, Calendar, Sparkles, PlusCircle } from 'lucide-react';
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Page Banner / Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Public Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Upcoming Community Social Events
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Explore open grassroots initiatives scheduled in your neighborhood. Discover winter clothes distribution drives, cleanups, plantation campaigns, and free health checks.
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by event title, location (e.g. Mirpur, Mohammadpur), or keyword..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Create Event CTA */}
            <Link
              href="/create-event"
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-500/20 shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Organize an Event</span>
            </Link>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-2">
              <Filter className="w-3.5 h-3.5" /> Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
          <p>
            Showing <span className="font-bold text-emerald-600 dark:text-emerald-400">{events.length}</span> upcoming event{events.length === 1 ? '' : 's'}
          </p>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Grid List or Skeleton */}
        {isLoading ? (
          <EventGridSkeleton count={6} />
        ) : events.length === 0 ? (
          <div className="text-center py-20 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <Calendar className="w-14 h-14 text-slate-300 dark:text-slate-700 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              No Upcoming Events Found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              We couldn&apos;t find any events matching your criteria. Try adjusting your search keyword or explore different categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-5 py-2.5 rounded-xl font-bold text-sm text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

