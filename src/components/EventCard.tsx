'use client';

import React from 'react';
import Link from 'next/link';
import { IEvent } from '@/types';
import { format } from 'date-fns';
import { Calendar, MapPin, Users, ArrowRight, Tag } from 'lucide-react';

interface EventCardProps {
  event: IEvent;
}

const eventTypeColors: Record<string, string> = {
  Cleanup: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
  Plantation: 'bg-green-100 text-green-800 dark:bg-green-950/80 dark:text-green-300 border-green-300 dark:border-green-800',
  Donation: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800',
  'Food Drive': 'bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 border-orange-300 dark:border-orange-800',
  Healthcare: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300 dark:border-rose-800',
  Education: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-800',
  'Winter Relief': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800',
  Other: 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-300 dark:border-purple-800',
};

export default function EventCard({ event }: EventCardProps) {
  let formattedDate = 'Upcoming Date';
  try {
    if (event.eventDate) {
      formattedDate = format(new Date(event.eventDate), 'MMM d, yyyy • h:mm a');
    }
  } catch (err) {
    formattedDate = event.eventDate;
  }

  const badgeColor =
    eventTypeColors[event.eventType] ||
    'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300';

  return (
    <div className="group flex flex-col h-full bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative w-full h-52 overflow-hidden bg-slate-100 dark:bg-slate-900">
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
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 text-xs font-bold rounded-full border shadow-sm backdrop-blur-md ${badgeColor}`}
          >
            {event.eventType}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            {event.participantsCount || 0} Joined
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Date */}
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{formattedDate}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {event.title}
          </h3>

          {/* Description snippet */}
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
            {event.description}
          </p>
        </div>

        {/* Location & Action */}
        <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60 space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>

          <Link
            href={`/events/${event._id}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-500/20 transition-all transform active:scale-98"
          >
            <span>View Event</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

