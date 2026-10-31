'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IEvent, ApiResponse } from '@/types';
import { apiRequest } from '@/lib/api';
import EventCard from '@/components/EventCard';
import { EventGridSkeleton } from '@/components/EventSkeleton';
import { Calendar, ArrowRight } from 'lucide-react';

export default function RecentEventsSection() {
  const [events, setEvents] = useState<IEvent[]>([]);
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

  return (
    <section className="py-16 bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Active Operations Schedule
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight">
              Upcoming Community Initiatives & Relief Drives
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Review the next 6 scheduled community events added by verified organizers. Step forward and reserve your spot.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-xs sm:text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 transition-colors shrink-0 shadow-2xs"
          >
            <span>View Complete Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dynamic Event Content */}
        {isLoading ? (
          <EventGridSkeleton count={6} />
        ) : error ? (
          <div className="text-center py-10 p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
            <p className="text-sm">{error}</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
            <Calendar className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No Upcoming Drives Scheduled at This Moment
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Be the first community organizer to publish an initiative in your neighborhood.
            </p>
            <Link
              href="/create-event"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800"
            >
              Host an Initiative
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
