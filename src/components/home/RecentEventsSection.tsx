'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IEvent, ApiResponse } from '@/types';
import { apiRequest } from '@/lib/api';
import EventCard from '@/components/EventCard';
import { EventGridSkeleton } from '@/components/EventSkeleton';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';

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
        setError('Unable to load upcoming events right now. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentEvents();
  }, []);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upcoming Grassroots Drives</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Recent Upcoming Community Events
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl">
              Discover the latest 6 upcoming community initiatives added by local organizers. Step forward and lend a helping hand.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-800 transition-colors shrink-0"
          >
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dynamic Event Content */}
        {isLoading ? (
          <EventGridSkeleton count={6} />
        ) : error ? (
          <div className="text-center py-12 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
            <p>{error}</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              No Upcoming Events Scheduled Yet
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Be the first community leader to launch a social service drive in your neighborhood.
            </p>
            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500"
            >
              Create an Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
