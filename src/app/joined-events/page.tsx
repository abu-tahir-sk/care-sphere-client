'use client';

import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { IJoinedEventItem, ApiResponse } from '@/types';
import { apiRequest } from '@/lib/api';
import { format } from 'date-fns';
import {
  Calendar,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  HeartHandshake,
  Clock,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

function JoinedEventsContent() {
  const { user } = useAuth();
  const [joinedItems, setJoinedItems] = useState<IJoinedEventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJoinedEvents = async () => {
    try {
      setIsLoading(true);
      // Backend returns events joined by logged-in user, sorted by eventDate ascending
      const res = await apiRequest<ApiResponse<IJoinedEventItem[]>>('/events/user/joined');
      if (res.success && res.data) {
        setJoinedItems(res.data);
      }
    } catch (err: any) {
      console.error('Error fetching joined events:', err);
      toast.error('Failed to load your joined events.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJoinedEvents();
  }, []);

  const handleLeaveEvent = async (eventId: string, title: string) => {
    const result = await Swal.fire({
      title: 'Leave this event?',
      text: `Are you sure you want to cancel your volunteer registration for "${title}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, leave event',
      cancelButtonText: 'Keep my spot',
      customClass: {
        popup: 'rounded-2xl dark:bg-slate-900 dark:text-white',
      },
    });

    if (result.isConfirmed) {
      try {
        const res = await apiRequest<ApiResponse>(`/events/${eventId}/join`, {
          method: 'DELETE',
        });

        if (res.success) {
          setJoinedItems((prev) => prev.filter((item) => item.event._id !== eventId));
          toast.success(`You have left "${title}".`);
        }
      } catch (err: any) {
        toast.error(err.message || 'Failed to cancel registration.');
      }
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Volunteer Portfolio</span>
            </div>
            <h1 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              My Joined Social Events
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Events you have registered to attend, organized chronologically by event date.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-500/20 shrink-0 self-start"
          >
            <span>Explore More Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Content list or empty state */}
        {isLoading ? (
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : joinedItems.length === 0 ? (
          <div className="text-center py-20 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <HeartHandshake className="w-14 h-14 text-slate-300 dark:text-slate-700 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              You Haven&apos;t Joined Any Events Yet
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Ready to make a difference in your local community? Browse upcoming events and join a drive near you!
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500"
            >
              <span>Browse Upcoming Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedItems.map(({ joinId, joinedAt, event }) => {
              let formattedDate = event.eventDate;
              let joinedDateFormatted = joinedAt;
              try {
                formattedDate = format(new Date(event.eventDate), 'MMM d, yyyy • h:mm a');
                joinedDateFormatted = format(new Date(joinedAt), 'MMM d, yyyy');
              } catch (e) { }

              return (
                <div
                  key={joinId}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative w-full h-48 bg-slate-900 overflow-hidden">
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-slate-950 shadow-md">
                          {event.eventType}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/60 backdrop-blur-md text-emerald-300 border border-white/20 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Joined
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <Calendar className="w-4 h-4" />
                        <span>{formattedDate}</span>
                      </div>

                      <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-2">
                        {event.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>

                      <div className="pt-2 text-xs text-slate-400">
                        Organized by: <span className="text-slate-700 dark:text-slate-300 font-medium">{event.organizerName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-2 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3">
                      <span>Registered on {joinedDateFormatted}</span>
                      <button
                        type="button"
                        onClick={() => handleLeaveEvent(event._id, event.title)}
                        className="text-rose-500 hover:text-rose-600 font-semibold hover:underline"
                      >
                        Cancel RSVP
                      </button>
                    </div>

                    <Link
                      href={`/events/${event._id}`}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-sm"
                    >
                      <span>View Event Details</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function JoinedEventsPage() {
  return (
    <ProtectedRoute>
      <JoinedEventsContent />
    </ProtectedRoute>
  );
}

