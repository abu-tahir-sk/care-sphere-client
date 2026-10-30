'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/lib/api';
import { EventType, ApiResponse } from '@/types';
import {
  Calendar,
  MapPin,
  Image as ImageIcon,
  Type,
  FileText,
  Tag,
  PlusCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
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

function CreateEventForm() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState<EventType>('Donation');
  const [thumbnail, setThumbnail] = useState('');
  const [location, setLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute minimum date (must be in future: today + 1 minute or tomorrow)
  const now = new Date();
  // Format for datetime-local input: YYYY-MM-DDTHH:mm
  const tomorrow = new Date(now.getTime() + 60 * 60 * 1000);
  const minDateTime = tomorrow.toISOString().slice(0, 16);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !thumbnail.trim() || !location.trim() || !eventDate) {
      toast.error('Please fill in all required fields.');
      return;
    }

    // Future date validation
    const chosenDate = new Date(eventDate);
    if (isNaN(chosenDate.getTime())) {
      toast.error('Please specify a valid event date.');
      return;
    }

    if (chosenDate <= new Date()) {
      toast.error('Event date must be scheduled in the future.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiRequest<ApiResponse>('/events', {
        method: 'POST',
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          eventType,
          thumbnail: thumbnail.trim(),
          location: location.trim(),
          eventDate: chosenDate.toISOString(),
        }),
      });

      if (res.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Event Created Successfully!',
          text: `"${title}" has been published. Neighbors can now discover and join your initiative!`,
          confirmButtonColor: '#059669',
          customClass: {
            popup: 'rounded-2xl dark:bg-slate-900 dark:text-white',
          },
        });

        // Rule: Redirect to Upcoming Events page
        router.push('/events');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to create event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Leadership</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            Host a Social Development Event
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Mobilize fellow citizens to distribute warm clothes in Mirpur, organize food drives in Mohammadpur, or plant trees along lakeside parks.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Type className="w-4 h-4 text-emerald-500" />
                Event Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Event Type & Future Date Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Event Type dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-emerald-500" />
                  Event Type
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as EventType)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {eventCategories.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Event Date (Future date validation enforced) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  Event Date & Time
                </label>
                <input
                  type="datetime-local"
                  required
                  min={minDateTime}
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-[11px] text-slate-400">Must be scheduled in the future.</p>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500" />
                Event Location
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Mirpur 10 Community Center Grounds, Dhaka"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Thumbnail Image URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-blue-500" />
                Thumbnail Image URL
              </label>
              <input
                type="url"
                required
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-500" />
                Event Description
              </label>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the initiative, goals, required items, volunteer roles, and safety instructions..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
              />
            </div>

            {/* Organizer validation badge */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
              <span>
                Hosting as organizer: <strong className="text-slate-900 dark:text-white">{user?.name}</strong> ({user?.email})
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Verified User</span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-98 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Publishing Event...</span>
              ) : (
                <>
                  <PlusCircle className="w-5 h-5" />
                  <span>Create & Publish Event</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CreateEventPage() {
  return (
    <ProtectedRoute>
      <CreateEventForm />
    </ProtectedRoute>
  );
}

