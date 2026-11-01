'use client';

import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { IJoinedEventItem, IEvent, ApiResponse } from '@/types';
import { apiRequest } from '@/lib/api';
import { format } from 'date-fns';
import {
  Calendar,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  HeartHandshake,
  Award,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import VolunteerCertificateModal from '@/components/VolunteerCertificateModal';

function JoinedEventsContent() {
  const { user, token, isLoading: authLoading } = useAuth();
  const [joinedItems, setJoinedItems] = useState<IJoinedEventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEventForCert, setSelectedEventForCert] = useState<IEvent | null>(null);

  const fetchJoinedEvents = async () => {
    try {
      setIsLoading(true);
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
    if (!authLoading && user && token) {
      fetchJoinedEvents();
    }
  }, [authLoading, user, token]);

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
        popup: 'rounded-3xl dark:bg-[#0F1E16] dark:text-[#F7F8F0]',
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D9F3E5] dark:bg-[#14532D]/40 text-[#14532D] dark:text-[#D9F3E5] border border-[#14532D]/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#159A70]" />
              <span>Volunteer Roster</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101B17] dark:text-[#F7F8F0] tracking-tight">
              My Joined Social Initiatives
            </h1>
            <p className="text-sm text-[#101B17]/60 dark:text-[#F7F8F0]/60">
              Your registered community initiatives and verifiable volunteer certificates.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-[#14532D] hover:bg-[#0F3F22] shadow-md shadow-[#14532D]/20 shrink-0 self-start transition-all hover:translate-y-[-1px]"
          >
            <span>Explore More Drives</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Content list or empty state */}
        {isLoading ? (
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#14532D] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : joinedItems.length === 0 ? (
          <div className="text-center py-20 px-4 bg-white dark:bg-[#0F1E16] rounded-[32px] border border-[#14532D]/15 dark:border-white/10 space-y-4 shadow-sm">
            <HeartHandshake className="w-14 h-14 text-[#159A70] mx-auto opacity-70" />
            <h3 className="text-xl font-bold text-[#101B17] dark:text-[#F7F8F0]">
              You Haven&apos;t Joined Any Events Yet
            </h3>
            <p className="text-sm text-[#101B17]/60 dark:text-[#F7F8F0]/60 max-w-md mx-auto">
              Ready to make a difference in your local community? Browse upcoming events and join a drive near you!
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-[#14532D] hover:bg-[#0F3F22] shadow-md shadow-[#14532D]/20"
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
              } catch (e) {}

              return (
                <div
                  key={joinId}
                  className="bg-white dark:bg-[#0F1E16] rounded-[28px] border border-[#14532D]/15 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative w-full h-48 bg-[#0A130E] overflow-hidden">
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div className="absolute top-3.5 left-3.5">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#14532D] text-white shadow-md border border-[#159A70]/30">
                          {event.eventType}
                        </span>
                      </div>
                      <div className="absolute top-3.5 right-3.5">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#101B17]/70 backdrop-blur-md text-[#D9F3E5] border border-white/20 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#159A70]" />
                          Joined
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#14532D] dark:text-[#159A70]">
                        <Calendar className="w-4 h-4 text-[#159A70]" />
                        <span>{formattedDate}</span>
                      </div>

                      <h3 className="font-extrabold text-lg text-[#101B17] dark:text-[#F7F8F0] line-clamp-2">
                        {event.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-[#101B17]/60 dark:text-[#F7F8F0]/60">
                        <MapPin className="w-3.5 h-3.5 text-[#159A70] shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>

                      <div className="pt-2 text-xs text-[#101B17]/50 dark:text-[#F7F8F0]/50">
                        Organized by: <span className="text-[#101B17] dark:text-[#F7F8F0] font-semibold">{event.organizerName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-6 pt-0 border-t border-[#14532D]/10 dark:border-white/10 mt-2 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-[#101B17]/50 dark:text-[#F7F8F0]/50 pt-3">
                      <span>Registered on {joinedDateFormatted}</span>
                      <button
                        type="button"
                        onClick={() => handleLeaveEvent(event._id, event.title)}
                        className="text-rose-600 dark:text-rose-400 font-semibold hover:underline"
                      >
                        Cancel RSVP
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedEventForCert(event)}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-[#14532D] dark:text-[#D9F3E5] bg-[#D9F3E5] dark:bg-[#14532D]/50 hover:bg-[#D9F3E5]/80 border border-[#14532D]/20 transition-colors"
                      >
                        <Award className="w-3.5 h-3.5 text-[#159A70]" />
                        <span>Certificate</span>
                      </button>

                      <Link
                        href={`/events/${event._id}`}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#14532D] hover:bg-[#0F3F22] shadow-sm transition-colors"
                      >
                        <span>Details</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Volunteer Certificate Modal */}
      {selectedEventForCert && (
        <VolunteerCertificateModal
          event={selectedEventForCert}
          userName={user?.name || 'Dedicated Volunteer'}
          onClose={() => setSelectedEventForCert(null)}
        />
      )}
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
