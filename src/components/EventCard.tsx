'use client';

import React from 'react';
import Link from 'next/link';
import { IEvent } from '@/types';
import { format, formatDistanceToNow, isFuture } from 'date-fns';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

interface EventCardProps {
  event: IEvent;
}

const eventTypeBadges: Record<string, string> = {
  Cleanup: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  Plantation: 'bg-green-50 text-green-800 dark:bg-green-950/60 dark:text-green-300 border-green-200 dark:border-green-800',
  Donation: 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  'Food Drive': 'bg-orange-50 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 border-orange-200 dark:border-orange-800',
  Healthcare: 'bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800',
  Education: 'bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  'Winter Relief': 'bg-cyan-50 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
  Other: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700',
};

export default function EventCard({ event }: EventCardProps) {
  let formattedDate = 'Upcoming';
  let formattedMonth = '';
  let formattedDay = '';
  let formattedTime = '';
  let relativeTime = '';

  try {
    if (event.eventDate) {
      const dateObj = new Date(event.eventDate);
      formattedMonth = format(dateObj, 'MMM').toUpperCase();
      formattedDay = format(dateObj, 'dd');
      formattedTime = format(dateObj, 'h:mm a');
      formattedDate = format(dateObj, 'MMM d, yyyy • h:mm a');
      if (isFuture(dateObj)) {
        relativeTime = formatDistanceToNow(dateObj, { addSuffix: true });
      }
    }
  } catch (err) {
    formattedDate = event.eventDate;
  }

  const badgeClass =
    eventTypeBadges[event.eventType] ||
    'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700';

  // Realistic volunteer capacity estimation for progress calculation
  const targetParticipants = Math.max(30, (event.participantsCount || 0) + 12);
  const percentFilled = Math.min(100, Math.round(((event.participantsCount || 0) / targetParticipants) * 100));

  return (
    <article className="group flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-200">
      {/* Thumbnail Container */}
      <div className="relative w-full h-48 overflow-hidden bg-slate-900">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80';
          }}
        />

        {/* Calendar Date Block (Microsoft Fluent date tag) */}
        {formattedMonth && formattedDay ? (
          <div className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-md px-2.5 py-1 text-center shadow-xs border border-slate-200/80 dark:border-slate-700">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 leading-none">
              {formattedMonth}
            </span>
            <span className="block text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
              {formattedDay}
            </span>
          </div>
        ) : null}

        {/* Category Pill */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-0.5 text-[11px] font-semibold rounded-md border shadow-2xs backdrop-blur-sm ${badgeClass}`}
          >
            {event.eventType}
          </span>
        </div>

        {/* Live enrolled counter */}
        <div className="absolute bottom-2.5 left-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-950/80 backdrop-blur-sm text-slate-200 border border-white/10">
            <Users className="w-3 h-3 text-emerald-400" />
            <span>{event.participantsCount || 0} enrolled</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Schedule Info */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{formattedDate}</span>
            </span>
            {relativeTime && (
              <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                {relativeTime}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Capacity Meter */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Volunteer Quota</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {event.participantsCount || 0} / {targetParticipants} ({percentFilled}%)
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${percentFilled}%` }}
            />
          </div>
        </div>

        {/* Location & Action */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>

          <Link
            href={`/events/${event._id}`}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-2xs"
          >
            <span>View Details & RSVP</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
