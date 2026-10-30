'use client';

import React from 'react';
import { Quote, Star, Sparkles } from 'lucide-react';

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
      'Our Dhanmondi Lake tree plantation drive reached 100% volunteer capacity in under 48 hours! Having a centralized platform dedicated specifically to social action changed the game for us.',
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
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Voices</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Trusted by Grassroots Volunteers & Community Leaders
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Real stories from citizens dedicating their time and empathy to transform neighborhoods across Bangladesh.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-emerald-500/30" />

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover shadow-md"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {item.name}
                  </h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    {item.role}
                  </p>
                  <p className="text-[11px] text-slate-400">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

