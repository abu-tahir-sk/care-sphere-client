'use client';

import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

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
    <section className="py-24 bg-[#F7F8F0] dark:bg-[#0A130E] border-b border-[#14532D]/10 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9F3E5] dark:bg-[#14532D]/40 border border-[#14532D]/20 text-[#14532D] dark:text-[#D9F3E5] text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#159A70]" />
            <span>Volunteer Voices</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101B17] dark:text-[#F7F8F0] tracking-tight">
            Loved by Volunteers & Community Leaders
          </h2>
          <p className="text-sm sm:text-base text-[#101B17]/70 dark:text-[#F7F8F0]/70">
            Hear from volunteer doctors, university students, and neighborhood organizers bringing care to their communities.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-[32px] bg-white dark:bg-[#0F1E16] border border-[#14532D]/15 dark:border-white/10 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#159A70] transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {/* Rating stars */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#159A70] text-[#159A70]" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#14532D] dark:text-[#D9F3E5] bg-[#D9F3E5] dark:bg-[#14532D]/50 px-2.5 py-1 rounded-full border border-[#14532D]/20">
                    <ShieldCheck className="w-3 h-3 text-[#159A70]" />
                    {item.verifiedBadge}
                  </span>
                </div>

                <p className="text-sm text-[#101B17]/80 dark:text-[#F7F8F0]/80 leading-relaxed italic">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#14532D]/10 dark:border-white/10">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#159A70]"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-extrabold text-sm text-[#101B17] dark:text-[#F7F8F0] truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#14532D] dark:text-[#159A70] font-semibold truncate">
                    {item.role}
                  </p>
                  <p className="text-[11px] text-[#101B17]/50 dark:text-[#F7F8F0]/50 truncate">
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
