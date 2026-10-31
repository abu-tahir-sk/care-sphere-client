'use client';

import React from 'react';
import { Quote, Star, CheckCircle2, ShieldCheck } from 'lucide-react';

const testimonials = [
  {
    name: 'Dr. Mahbubur Rahman',
    role: 'Volunteer Physician & Medical Camp Lead',
    organization: 'Dhaka Medical College & Hospital',
    location: 'Dhaka Central',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80',
    content:
      'CareSphere made coordinating our free health camp in Uttara remarkably efficient. We screened over 280 low-income patients in a single weekend with verified volunteer medicine students.',
    rating: 5,
    verifiedBadge: 'Verified Medical Lead',
  },
  {
    name: 'Fahmida Hasan',
    role: 'Youth Environmental Organizer',
    organization: 'University of Dhaka',
    location: 'Dhanmondi Chapter',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    content:
      'Our Dhanmondi Lake tree plantation drive reached volunteer capacity in under 48 hours. Having a transparent platform dedicated specifically to social action changed the game for our student coalition.',
    rating: 5,
    verifiedBadge: 'Certified Ecology Host',
  },
  {
    name: 'Tanvir Hossain',
    role: 'Grassroots Relief Coordinator',
    organization: 'Mirpur Community Action',
    location: 'Dhaka North',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    content:
      'During last winter’s sudden cold spell, we organized a 500-blanket emergency distribution across Mohammadpur and Mirpur 10. The participant tracking and instant updates kept our logistics crystal clear.',
    rating: 5,
    verifiedBadge: 'Verified NGO Partner',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Field Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            Endorsements from Grassroots Organizers
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Insights from doctors, student coordinators, and volunteer leads deploying social initiatives via CareSphere.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {/* Rating stars */}
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    {item.verifiedBadge}
                  </span>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500/30"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium truncate">
                    {item.role}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {item.organization} • {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
