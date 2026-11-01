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

  const now = new Date();
  const tomorrow = new Date(now.getTime() + 60 * 60 * 1000);
  const minDateTime = tomorrow.toISOString().slice(0, 16);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !thumbnail.trim() || !location.trim() || !eventDate) {
      toast.error('Please fill in all required fields.');
      return;
    }

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
          confirmButtonColor: '#14532D',
          customClass: {
            popup: 'rounded-3xl dark:bg-[#0F1E16] dark:text-[#F7F8F0]',
          },
        });

        router.push('/events');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to create event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] transition-colors">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9F3E5] dark:bg-[#14532D]/40 border border-[#14532D]/20 text-[#14532D] dark:text-[#D9F3E5] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#159A70]" />
            <span>Community Leadership</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101B17] dark:text-[#F7F8F0] tracking-tight">
            Host a Social Development Event
          </h1>
          <p className="text-sm sm:text-base text-[#101B17]/70 dark:text-[#F7F8F0]/70 max-w-xl mx-auto">
            Mobilize fellow citizens to distribute warm clothes in Mirpur, organize food drives in Mohammadpur, or plant trees along lakeside parks.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white dark:bg-[#0F1E16] p-8 sm:p-10 rounded-[32px] shadow-sm border border-[#14532D]/15 dark:border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#101B17] dark:text-[#F7F8F0] flex items-center gap-1.5">
                <Type className="w-4 h-4 text-[#159A70]" />
                Event Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
                className="w-full px-4 py-3 rounded-2xl border border-[#14532D]/15 dark:border-white/10 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] placeholder:text-[#101B17]/40 dark:placeholder:text-[#F7F8F0]/40 text-sm focus:outline-none focus:border-[#14532D] dark:focus:border-[#159A70]"
              />
            </div>

            {/* Event Type & Future Date Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Event Type dropdown */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#101B17] dark:text-[#F7F8F0] flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-[#159A70]" />
                  Event Type
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as EventType)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#14532D]/15 dark:border-white/10 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] text-sm focus:outline-none focus:border-[#14532D] dark:focus:border-[#159A70]"
                >
                  {eventCategories.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Event Date */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#101B17] dark:text-[#F7F8F0] flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#159A70]" />
                  Event Date & Time
                </label>
                <input
                  type="datetime-local"
                  required
                  min={minDateTime}
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#14532D]/15 dark:border-white/10 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] text-sm focus:outline-none focus:border-[#14532D] dark:focus:border-[#159A70]"
                />
                <p className="text-[11px] text-[#101B17]/50 dark:text-[#F7F8F0]/50">Must be scheduled in the future.</p>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#101B17] dark:text-[#F7F8F0] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#159A70]" />
                Event Location
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Mirpur 10 Community Center Grounds, Dhaka"
                className="w-full px-4 py-3 rounded-2xl border border-[#14532D]/15 dark:border-white/10 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] placeholder:text-[#101B17]/40 dark:placeholder:text-[#F7F8F0]/40 text-sm focus:outline-none focus:border-[#14532D] dark:focus:border-[#159A70]"
              />
            </div>

            {/* Thumbnail Image URL */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#101B17] dark:text-[#F7F8F0] flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#159A70]" />
                Thumbnail Image URL
              </label>
              <input
                type="url"
                required
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-3 rounded-2xl border border-[#14532D]/15 dark:border-white/10 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] placeholder:text-[#101B17]/40 dark:placeholder:text-[#F7F8F0]/40 text-sm focus:outline-none focus:border-[#14532D] dark:focus:border-[#159A70]"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#101B17] dark:text-[#F7F8F0] flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#159A70]" />
                Event Description
              </label>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the initiative, goals, required items, volunteer roles, and safety instructions..."
                className="w-full px-4 py-3 rounded-2xl border border-[#14532D]/15 dark:border-white/10 bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] placeholder:text-[#101B17]/40 dark:placeholder:text-[#F7F8F0]/40 text-sm focus:outline-none focus:border-[#14532D] dark:focus:border-[#159A70] resize-y"
              />
            </div>

            {/* Organizer validation badge */}
            <div className="p-4 rounded-2xl bg-[#D9F3E5]/40 dark:bg-[#14532D]/20 border border-[#14532D]/20 flex items-center justify-between text-xs text-[#14532D] dark:text-[#D9F3E5]">
              <span>
                Hosting as organizer: <strong className="text-[#101B17] dark:text-[#F7F8F0]">{user?.name}</strong> ({user?.email})
              </span>
              <span className="text-[#14532D] dark:text-[#159A70] font-bold">Verified User</span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-[#14532D] hover:bg-[#0F3F22] shadow-lg shadow-[#14532D]/25 flex items-center justify-center gap-2 transition-all transform active:scale-98 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Publishing Event...</span>
              ) : (
                <>
                  <PlusCircle className="w-5 h-5 text-[#D9F3E5]" />
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
