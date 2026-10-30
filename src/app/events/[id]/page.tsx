'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IEvent, ApiResponse } from '@/types';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import {
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  HeartHandshake,
  ArrowLeft,
  Share2,
  Clock,
  Sparkles,
  ShieldCheck,
  Award,
  ExternalLink,
  CalendarPlus,
  Printer,
  Copy,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import VolunteerCertificateModal from '@/components/VolunteerCertificateModal';

export default function EventDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { user } = useAuth();

  const [event, setEvent] = useState<IEvent | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchEventDetails = async () => {
      try {
        setIsLoading(true);
        const res = await apiRequest<ApiResponse<IEvent>>(`/events/${id}`);
        if (res.success && res.data) {
          setEvent(res.data);
          setIsJoined(!!res.isJoined);
        }
      } catch (err: any) {
        console.error('Failed to load event details:', err);
        toast.error('Unable to load event details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleJoinEvent = async () => {
    // Rule: Details page is public, but to join user must be logged in
    if (!user) {
      toast.error('You must log in to join this community event.');
      router.push(`/login?redirect=/events/${id}`);
      return;
    }

    if (isJoined) {
      toast('You are already registered for this event.', { icon: 'ℹ️' });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiRequest<ApiResponse>(`/events/${id}/join`, {
        method: 'POST',
      });

      if (res.success) {
        setIsJoined(true);
        if (event) {
          setEvent({
            ...event,
            participantsCount: (event.participantsCount || 0) + 1,
          });
        }

        Swal.fire({
          icon: 'success',
          title: 'You Have Joined!',
          text: `Thank you for stepping up to make a difference in "${event?.title}". Your registration is confirmed!`,
          confirmButtonColor: '#059669',
          customClass: {
            popup: 'rounded-2xl dark:bg-slate-900 dark:text-white',
          },
        });
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to join event.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share && event) {
      navigator
        .share({
          title: event.title,
          text: `Join "${event.title}" on CareSphere - Community Social Development Platform!`,
          url: window.location.href,
        })
        .catch(() => {
          setShowShareModal(true);
        });
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Event link copied to clipboard!');
      setShowShareModal(false);
    }
  };

  // Google Calendar Link Builder
  const getGoogleCalendarUrl = (ev: IEvent) => {
    const startDate = new Date(ev.eventDate);
    const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3 hours duration

    const formatGDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const title = encodeURIComponent(ev.title);
    const details = encodeURIComponent(
      `${ev.description}\n\nOrganized by: ${ev.organizerName}\nPlatform: CareSphere Community Events`
    );
    const location = encodeURIComponent(ev.location);
    const dates = `${formatGDate(startDate)}/${formatGDate(endDate)}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Event Not Found</h2>
        <p className="text-sm text-slate-500">The requested event could not be found or has been removed.</p>
        <Link
          href="/events"
          className="px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500"
        >
          Back to Upcoming Events
        </Link>
      </div>
    );
  }

  let formattedDate = event.eventDate;
  try {
    formattedDate = format(new Date(event.eventDate), 'EEEE, MMMM d, yyyy • h:mm a');
  } catch (err) {}

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Upcoming Events</span>
          </Link>
        </div>

        {/* Hero Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800">
          {/* Main Visual */}
          <div className="relative w-full h-80 sm:h-96 md:h-[420px] bg-slate-900">
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Badges on Top */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-md">
                {event.eventType}
              </span>
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/20">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                {event.participantsCount || 0} Registered
              </span>
            </div>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all shadow-md"
              title="Share event link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Bottom Overlay Title */}
            <div className="absolute bottom-6 inset-x-6 text-white space-y-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
                {event.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200 font-medium">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  {event.location}
                </span>
              </div>
            </div>
          </div>

          {/* Details Body Grid */}
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Event Description */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                  About This Community Initiative
                </h2>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>

              {/* What to Expect / Guidelines */}
              <div className="p-6 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
                <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Volunteer Guidelines & Support
                </h3>
                <ul className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-400 space-y-1.5 list-disc list-inside">
                  <li>Please arrive 15 minutes before the scheduled start time.</li>
                  <li>Identification tags and volunteer supplies are provided on-site.</li>
                  <li>Clean drinking water and light refreshments will be available for all participants.</li>
                </ul>
              </div>

              {/* Organizer Card */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                <img
                  src={event.organizerPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={event.organizerName}
                  className="w-14 h-14 rounded-2xl object-cover shadow-md"
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Event Organizer
                  </p>
                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    {event.organizerName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Contact: {event.organizerEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Action Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-6 shadow-sm">
                <div className="space-y-1 text-center sm:text-left">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Registration Status
                  </p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">
                    {isJoined ? 'Confirmed Participant' : 'Open for Volunteers'}
                  </p>
                </div>

                {/* Key Summary */}
                <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 border-y border-slate-200 dark:border-slate-700/80 py-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" /> Date
                    </span>
                    <span className="font-semibold text-right">
                      {format(new Date(event.eventDate), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" /> Location
                    </span>
                    <span className="font-semibold text-right truncate max-w-[150px]">
                      {event.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-500" /> Type
                    </span>
                    <span className="font-semibold">{event.eventType}</span>
                  </div>
                </div>

                {/* Join Action Button */}
                {isJoined ? (
                  <div className="space-y-3">
                    <div className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>You&apos;re Registered!</span>
                    </div>

                    {/* Certificate Generator Button */}
                    <button
                      type="button"
                      onClick={() => setShowCertModal(true)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 hover:bg-amber-200 border border-amber-300 dark:border-amber-800 flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                      <Award className="w-4 h-4 text-amber-600" />
                      <span>View Volunteer Certificate</span>
                    </button>

                    <p className="text-center text-[11px] text-slate-400">
                      View all your registrations in{' '}
                      <Link href="/joined-events" className="text-emerald-600 underline font-semibold">
                        Joined Events
                      </Link>
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleJoinEvent}
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
                  >
                    <HeartHandshake className="w-5 h-5" />
                    <span>{isSubmitting ? 'Registering...' : 'Join Event'}</span>
                  </button>
                )}

                {/* Add to Google Calendar Action */}
                <a
                  href={getGoogleCalendarUrl(event)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600 flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <CalendarPlus className="w-4 h-4 text-emerald-500" />
                  <span>Add to Google Calendar</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                {!user && (
                  <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                    Signing in is required to register as an active volunteer.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Volunteer Certificate Modal */}
      {showCertModal && (
        <VolunteerCertificateModal
          event={event}
          userName={user?.name || 'Dedicated Volunteer'}
          onClose={() => setShowCertModal(false)}
        />
      )}

      {/* Social Share Modal Fallback */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-emerald-500" />
                Share Event with Community
              </h3>
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Spread the word about &ldquo;{event.title}&rdquo; to gather more volunteers!
            </p>

            <div className="space-y-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `Check out this community volunteer drive: ${event.title} - ${typeof window !== 'undefined' ? window.location.href : ''}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Share via WhatsApp</span>
              </a>

              <a
                href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                  `Volunteering for "${event.title}" on CareSphere! Join us to make a difference:`
                )}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center gap-2.5 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
              >
                <span className="w-4 h-4 font-black text-center">𝕏</span>
                <span>Broadcast on X</span>
              </a>

              <button
                type="button"
                onClick={copyToClipboard}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Direct Link</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
