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
  Cleanup: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  Plantation: 'bg-green-50 text-green-800 dark:bg-green-950/70 dark:text-green-300 border-green-200 dark:border-green-800',
  Donation: 'bg-amber-50 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  'Food Drive': 'bg-orange-50 text-orange-800 dark:bg-orange-950/70 dark:text-orange-300 border-orange-200 dark:border-orange-800',
  Healthcare: 'bg-rose-50 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border-rose-200 dark:border-rose-800',
  Education: 'bg-blue-50 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  'Winter Relief': 'bg-cyan-50 text-cyan-800 dark:bg-cyan-950/70 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
  Other: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700',
};

export default function EventCard({ event }: EventCardProps) {
  let formattedDate = 'Upcoming';
  let formattedMonth = '';
  let formattedDay = '';
  let relativeTime = '';

  try {
    if (event.eventDate) {
      const dateObj = new Date(event.eventDate);
      formattedMonth = format(dateObj, 'MMM').toUpperCase();
      formattedDay = format(dateObj, 'dd');
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

  const count = event.participantsCount || 0;
  const targetParticipants = Math.max(30, count + 12);
  const percentFilled = Math.min(100, Math.round((count / targetParticipants) * 100));
  const spotsLeft = Math.max(0, targetParticipants - count);

  return (
    <article className="group flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 transition-all duration-300">
      {/* Thumbnail Container */}
      <div className="relative w-full h-52 overflow-hidden bg-slate-900">
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

        {/* Ambient Dark Gradient on Image Bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Calendar Date Block (Modern glass date chip) */}
        {formattedMonth && formattedDay ? (
          <div className="absolute top-3.5 left-3.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl px-2.5 py-1 text-center shadow-md border border-slate-200/80 dark:border-slate-700">
            <span className="block text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 leading-none">
              {formattedMonth}
            </span>
            <span className="block text-sm font-black text-slate-950 dark:text-white leading-tight mt-0.5">
              {formattedDay}
            </span>
          </div>
        ) : null}

        {/* Category Pill */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
          {percentFilled >= 70 && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500/90 text-white shadow-xs backdrop-blur-sm">
              {spotsLeft} spots left
            </span>
          )}
          <span
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border shadow-xs backdrop-blur-md ${badgeClass}`}
          >
            {event.eventType}
          </span>
        </div>

        {/* Live Volunteer Community Avatar Stack */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5 overflow-hidden">
              <span className="inline-flex h-6 w-6 rounded-full ring-2 ring-slate-900 bg-emerald-600 text-[10px] font-bold text-white items-center justify-center">
                AT
              </span>
              <span className="inline-flex h-6 w-6 rounded-full ring-2 ring-slate-900 bg-teal-600 text-[10px] font-bold text-white items-center justify-center">
                MR
              </span>
              <span className="inline-flex h-6 w-6 rounded-full ring-2 ring-slate-900 bg-blue-600 text-[10px] font-bold text-white items-center justify-center">
                FH
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-100 backdrop-blur-sm px-2 py-0.5 rounded-md bg-black/50">
              {count > 0 ? `${count} enrolled` : 'First spot open'}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Schedule Info */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{formattedDate}</span>
            </span>
            {relativeTime && (
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                {relativeTime}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors font-heading">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Capacity Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Volunteer Quota</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {count} / {targetParticipants} ({percentFilled}%)
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all duration-300"
              style={{ width: `${percentFilled}%` }}
            />
          </div>
        </div>

        {/* Location & Action */}
        <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>

          <Link
            href={`/events/${event._id}`}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md shadow-emerald-700/15"
          >
            <span>View Initiative & RSVP</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
