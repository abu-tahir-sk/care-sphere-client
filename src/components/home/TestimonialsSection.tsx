'use client';

import React from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Dr. Mahbubur Rahman',
    role: 'Volunteer Physician & Medical Camp Lead',
    location: 'Dhaka Medical College & Hospital',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80',
    content:
      'CareSphere made coordinating our free health camp in Uttara remarkably efficient. We screened over 280 low-income patients in a single weekend with verified volunteer medicine students.',
    rating: 5,
  },
  {
    name: 'Fahmida Hasan',
    role: 'Youth Environmental Organizer',
    location: 'University of Dhaka',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    content:
      'Our Dhanmondi Lake tree plantation drive reached volunteer capacity in under 48 hours. Having a transparent platform dedicated specifically to social action changed the game for our student coalition.',
    rating: 5,
  },
  {
    name: 'Tanvir Hossain',
    role: 'Grassroots Relief Coordinator',
    location: 'Mirpur, Dhaka',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    content:
      'During last winter’s sudden cold spell, we organized a 500-blanket emergency distribution across Mohammadpur and Mirpur 10. The participant tracking and instant updates kept our logistics crystal clear.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Field Testimonials
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight">
            Verified Experiences from Community Organizers
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Insights from doctors, student coordinators, and volunteer leads deploying social initiatives via CareSphere.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-5 shadow-2xs"
            >
              <div className="space-y-3">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-xs text-slate-900 dark:text-white truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 truncate">
                    {item.role}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
