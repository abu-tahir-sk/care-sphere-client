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
  Check,
  FolderKanban,
  Tag,
  AlertTriangle,
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
  const { user } = useAuth();
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
    fetchMyEvents();
  }, []);

  const openEditModal = (event: IEvent) => {
    setEditingEvent(event);
    setEditTitle(event.title);
    setEditDescription(event.description);
    setEditEventType(event.eventType);
    setEditThumbnail(event.thumbnail);
    setEditLocation(event.location);
    // Format date for datetime-local: YYYY-MM-DDTHH:mm
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
      toast.error('Invalid date format.');
      return;
    }

    if (parsedDate <= new Date()) {
      toast.error('Event date must be in the future.');
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
          text: 'The event details have been successfully revised.',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-2xl dark:bg-slate-900 dark:text-white',
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
        popup: 'rounded-2xl dark:bg-slate-900 dark:text-white',
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
              popup: 'rounded-2xl dark:bg-slate-900 dark:text-white',
            },
          });
        }
      } catch (err: any) {
        toast.error(err.message || 'Failed to delete event.');
      }
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-3">
              <FolderKanban className="w-8 h-8 text-emerald-600" />
              Manage My Created Events
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Review, update, or remove social welfare events initiated by you ({user?.email}).
            </p>
          </div>

          <Link
            href="/create-event"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-500/20 shrink-0 self-start"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Host New Event</span>
          </Link>
        </div>

        {/* Events Table or Empty State */}
        {isLoading ? (
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              No Events Created Yet
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              You haven&apos;t published any social welfare events. Host a winter relief drive, cleanup, or medical camp today!
            </p>
            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Your First Event</span>
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <th className="py-4 px-6">Event Details</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Scheduled Date</th>
                    <th className="py-4 px-6">Participants</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                  {events.map((event) => {
                    let formatted = event.eventDate;
                    try {
                      formatted = format(new Date(event.eventDate), 'MMM d, yyyy • h:mm a');
                    } catch (e) {}

                    return (
                      <tr
                        key={event._id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        {/* Event Thumbnail & Title */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <img
                              src={event.thumbnail}
                              alt={event.title}
                              className="w-16 h-12 rounded-xl object-cover shrink-0 shadow-sm"
                            />
                            <div className="space-y-1">
                              <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">
                                {event.title}
                              </h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 line-clamp-1">
                                <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                                {event.location}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-6">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            {event.eventType}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-6 text-xs text-slate-600 dark:text-slate-300 font-medium whitespace-nowrap">
                          {formatted}
                        </td>

                        {/* Participants */}
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                            <Users className="w-3.5 h-3.5 text-emerald-500" />
                            {event.participantsCount || 0}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/events/${event._id}`}
                              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              title="View Event Details"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>

                            <button
                              type="button"
                              onClick={() => openEditModal(event)}
                              className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
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
            <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Update Event Details
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                    Event Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Event Type & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                      Category
                    </label>
                    <select
                      value={editEventType}
                      onChange={(e) => setEditEventType(e.target.value as EventType)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-emerald-500"
                    >
                      {eventCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                      Future Event Date
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={editEventDate}
                      onChange={(e) => setEditEventDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Thumbnail */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                    Thumbnail Image URL
                  </label>
                  <input
                    type="url"
                    required
                    value={editThumbnail}
                    onChange={(e) => setEditThumbnail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                    Description
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setEditingEvent(null)}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all disabled:opacity-50"
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
