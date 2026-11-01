'use client';

import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { IEvent, EventType, ApiResponse } from '@/types';
import { apiRequest } from '@/lib/api';
import { format } from 'date-fns';
import {
  Calendar,
  MapPin,
  Users,
  Edit3,
  Trash2,
  ExternalLink,
  PlusCircle,
  X,
  FolderKanban,
  Download,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const eventCategories: EventType[] = [
  'Cleanup',
  'Plantation',
  'Donation',
  'Food Drive',
  'Healthcare',
  'Education',
  'Winter Relief',
  'Other',
];

function ManageEventsContent() {
  const { user, token, isLoading: authLoading } = useAuth();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Edit Modal State
  const [editingEvent, setEditingEvent] = useState<IEvent | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editEventType, setEditEventType] = useState<EventType>('Donation');
  const [editThumbnail, setEditThumbnail] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editEventDate, setEditEventDate] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchMyEvents = async () => {
    try {
      setIsLoading(true);
      const res = await apiRequest<ApiResponse<IEvent[]>>('/events/user/created');
      if (res.success && res.data) {
        setEvents(res.data);
      }
    } catch (err: any) {
      console.error('Error fetching user events:', err);
      toast.error('Failed to load your organized events.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user && token) {
      fetchMyEvents();
    }
  }, [authLoading, user, token]);

  const openEditModal = (event: IEvent) => {
    setEditingEvent(event);
    setEditTitle(event.title);
    setEditDescription(event.description);
    setEditEventType(event.eventType);
    setEditThumbnail(event.thumbnail);
    setEditLocation(event.location);
    try {
      const d = new Date(event.eventDate);
      setEditEventDate(d.toISOString().slice(0, 16));
    } catch (e) {
      setEditEventDate('');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    if (!editTitle.trim() || !editDescription.trim() || !editThumbnail.trim() || !editLocation.trim() || !editEventDate) {
      toast.error('All fields are required.');
      return;
    }

    const parsedDate = new Date(editEventDate);
    if (isNaN(parsedDate.getTime())) {
      toast.error('Please specify a valid event date.');
      return;
    }

    setIsUpdating(true);
    try {
      const res = await apiRequest<ApiResponse<IEvent>>(`/events/${editingEvent._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: editTitle.trim(),
          description: editDescription.trim(),
          eventType: editEventType,
          thumbnail: editThumbnail.trim(),
          location: editLocation.trim(),
          eventDate: parsedDate.toISOString(),
        }),
      });

      if (res.success && res.data) {
        setEvents((prev) =>
          prev.map((ev) => (ev._id === editingEvent._id ? res.data! : ev))
        );
        setEditingEvent(null);
        Swal.fire({
          icon: 'success',
          title: 'Event Updated!',
          text: `"${editTitle}" details have been updated successfully.`,
          confirmButtonColor: '#14532D',
          customClass: {
            popup: 'rounded-3xl dark:bg-[#0F1E16] dark:text-[#F7F8F0]',
          },
        });
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update event.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (event: IEvent) => {
    const result = await Swal.fire({
      title: 'Delete this event?',
      text: `Are you sure you want to delete "${event.title}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-3xl dark:bg-[#0F1E16] dark:text-[#F7F8F0]',
      },
    });

    if (result.isConfirmed) {
      try {
        const res = await apiRequest<ApiResponse>(`/events/${event._id}`, {
          method: 'DELETE',
        });

        if (res.success) {
          setEvents((prev) => prev.filter((ev) => ev._id !== event._id));
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Your event was removed successfully.',
            timer: 2000,
            showConfirmButton: false,
            customClass: {
              popup: 'rounded-3xl dark:bg-[#0F1E16] dark:text-[#F7F8F0]',
            },
          });
        }
      } catch (err: any) {
        toast.error(err.message || 'Failed to delete event.');
      }
    }
  };

  const handleExportCSV = () => {
    if (events.length === 0) {
      toast.error('No events available to export.');
      return;
    }

    const headers = ['Title', 'Category', 'Scheduled Date', 'Location', 'Registered Volunteers', 'Organizer Email'];
    const rows = events.map((ev) => [
      `"${ev.title.replace(/"/g, '""')}"`,
      `"${ev.eventType}"`,
      `"${new Date(ev.eventDate).toISOString()}"`,
      `"${ev.location.replace(/"/g, '""')}"`,
      ev.participantsCount || 0,
      `"${ev.organizerEmail}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CareSphere_My_Events_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Events exported to CSV successfully!');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D9F3E5] dark:bg-[#14532D]/40 text-[#14532D] dark:text-[#D9F3E5] border border-[#14532D]/20">
              <FolderKanban className="w-3.5 h-3.5 text-[#159A70]" />
              <span>Organizer Console</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101B17] dark:text-[#F7F8F0] tracking-tight">
              Manage Published Initiatives
            </h1>
            <p className="text-xs sm:text-sm text-[#101B17]/60 dark:text-[#F7F8F0]/60">
              Audit, update, or remove social welfare events initiated by you ({user?.email}).
            </p>
          </div>

          <div className="flex items-center gap-3 self-start">
            {events.length > 0 && (
              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl font-bold text-xs text-[#101B17] dark:text-[#F7F8F0] bg-white dark:bg-[#0F1E16] border border-[#14532D]/15 dark:border-white/10 hover:bg-[#D9F3E5]/30 shadow-xs transition-colors"
                title="Download CSV spreadsheet of all your organized events"
              >
                <Download className="w-3.5 h-3.5 text-[#159A70]" />
                <span>Export CSV</span>
              </button>
            )}
            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-[#14532D] hover:bg-[#0F3F22] shadow-md shadow-[#14532D]/20 shrink-0 transition-all hover:translate-y-[-1px]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Host New Drive</span>
            </Link>
          </div>
        </div>

        {/* Events Table or Empty State */}
        {isLoading ? (
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#14532D] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 px-4 bg-white dark:bg-[#0F1E16] rounded-[32px] border border-[#14532D]/15 dark:border-white/10 space-y-4 shadow-sm">
            <Calendar className="w-14 h-14 text-[#159A70] mx-auto opacity-70" />
            <h3 className="text-xl font-bold text-[#101B17] dark:text-[#F7F8F0]">
              No Events Created Yet
            </h3>
            <p className="text-sm text-[#101B17]/60 dark:text-[#F7F8F0]/60 max-w-md mx-auto">
              You haven&apos;t published any social welfare events. Host a winter relief drive, cleanup, or medical camp today!
            </p>
            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-[#14532D] hover:bg-[#0F3F22] shadow-md shadow-[#14532D]/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Your First Event</span>
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#0F1E16] rounded-[32px] border border-[#14532D]/15 dark:border-white/10 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#14532D]/10 dark:border-white/10 bg-[#F7F8F0]/70 dark:bg-white/5 text-xs font-bold uppercase tracking-wider text-[#101B17]/60 dark:text-[#F7F8F0]/60">
                    <th className="py-4.5 px-6">Event Details</th>
                    <th className="py-4.5 px-6">Category</th>
                    <th className="py-4.5 px-6">Scheduled Date</th>
                    <th className="py-4.5 px-6">Participants</th>
                    <th className="py-4.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#14532D]/10 dark:divide-white/10 text-sm">
                  {events.map((event) => {
                    let formatted = event.eventDate;
                    try {
                      formatted = format(new Date(event.eventDate), 'MMM d, yyyy • h:mm a');
                    } catch (e) { }

                    return (
                      <tr
                        key={event._id}
                        className="hover:bg-[#F7F8F0]/50 dark:hover:bg-white/5 transition-colors"
                      >
                        {/* Event Thumbnail & Title */}
                        <td className="py-4.5 px-6">
                          <div className="flex items-center gap-4">
                            <img
                              src={event.thumbnail}
                              alt={event.title}
                              className="w-16 h-12 rounded-xl object-cover shrink-0 shadow-xs border border-[#14532D]/10"
                            />
                            <div className="space-y-1">
                              <h4 className="font-extrabold text-[#101B17] dark:text-[#F7F8F0] line-clamp-1">
                                {event.title}
                              </h4>
                              <p className="text-xs text-[#101B17]/60 dark:text-[#F7F8F0]/60 flex items-center gap-1 line-clamp-1">
                                <MapPin className="w-3 h-3 text-[#159A70] shrink-0" />
                                {event.location}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4.5 px-6">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D9F3E5] dark:bg-[#14532D]/50 text-[#14532D] dark:text-[#D9F3E5] border border-[#14532D]/20">
                            {event.eventType}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="py-4.5 px-6 text-xs text-[#101B17]/80 dark:text-[#F7F8F0]/80 font-medium whitespace-nowrap">
                          {formatted}
                        </td>

                        {/* Participants */}
                        <td className="py-4.5 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F7F8F0] dark:bg-[#0A130E] text-xs font-bold text-[#14532D] dark:text-[#D9F3E5] border border-[#14532D]/10 dark:border-white/10">
                            <Users className="w-3.5 h-3.5 text-[#159A70]" />
                            {event.participantsCount || 0}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4.5 px-6 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/events/${event._id}`}
                              className="p-2 rounded-xl text-[#101B17]/70 dark:text-[#F7F8F0]/70 hover:bg-[#D9F3E5]/40 dark:hover:bg-[#14532D]/30 transition-colors"
                              title="View Event Details"
                            >
                              <ExternalLink className="w-4 h-4 text-[#159A70]" />
                            </Link>

                            <button
                              type="button"
                              onClick={() => openEditModal(event)}
                              className="p-2 rounded-xl text-[#14532D] dark:text-[#D9F3E5] hover:bg-[#D9F3E5]/40 dark:hover:bg-[#14532D]/30 transition-colors"
                              title="Edit Event"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(event)}
                              className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                              title="Delete Event"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit Event Modal */}
        {editingEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white dark:bg-[#0F1E16] w-full max-w-2xl rounded-[32px] p-6 sm:p-8 shadow-2xl border border-[#14532D]/15 dark:border-white/10 max-h-[90vh] overflow-y-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#14532D]/10 dark:border-white/10">
                <h3 className="text-xl font-bold text-[#101B17] dark:text-[#F7F8F0]">
                  Update Event Details
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="p-1.5 rounded-full hover:bg-[#D9F3E5]/40 text-[#101B17]/50 dark:text-[#F7F8F0]/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#101B17] dark:text-[#F7F8F0]">
                    Event Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-[#14532D]/15 dark:border-white/10 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] text-sm focus:outline-none focus:border-[#14532D]"
                  />
                </div>

                {/* Event Type & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#101B17] dark:text-[#F7F8F0]">
                      Category
                    </label>
                    <select
                      value={editEventType}
                      onChange={(e) => setEditEventType(e.target.value as EventType)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#14532D]/15 dark:border-white/10 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] text-sm focus:outline-none focus:border-[#14532D]"
                    >
                      {eventCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#101B17] dark:text-[#F7F8F0]">
                      Future Event Date
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={editEventDate}
                      onChange={(e) => setEditEventDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#14532D]/15 dark:border-white/10 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] text-sm focus:outline-none focus:border-[#14532D]"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#101B17] dark:text-[#F7F8F0]">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-[#14532D]/15 dark:border-white/10 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] text-sm focus:outline-none focus:border-[#14532D]"
                  />
                </div>

                {/* Thumbnail */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#101B17] dark:text-[#F7F8F0]">
                    Thumbnail Image URL
                  </label>
                  <input
                    type="url"
                    required
                    value={editThumbnail}
                    onChange={(e) => setEditThumbnail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-[#14532D]/15 dark:border-white/10 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] text-sm focus:outline-none focus:border-[#14532D]"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#101B17] dark:text-[#F7F8F0]">
                    Description
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-[#14532D]/15 dark:border-white/10 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] text-sm focus:outline-none focus:border-[#14532D]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#14532D]/10 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setEditingEvent(null)}
                    className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-[#101B17]/60 dark:text-[#F7F8F0]/60 hover:bg-[#D9F3E5]/40"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-6 py-2.5 rounded-2xl text-sm font-bold text-white bg-[#14532D] hover:bg-[#0F3F22] shadow-md transition-all disabled:opacity-50"
                  >
                    {isUpdating ? 'Saving Changes...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ManageEventsPage() {
  return (
    <ProtectedRoute>
      <ManageEventsContent />
    </ProtectedRoute>
  );
}
