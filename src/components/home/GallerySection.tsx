'use client';

import React from 'react';
import { Camera, MapPin } from 'lucide-react';

const galleryPhotos = [
  {
    title: 'Winter Warmth Clothes Distribution',
    location: 'Mirpur 10, Dhaka',
    category: 'Winter Relief',
    image: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?w=800&auto=format&fit=crop&q=80',
    description: 'Volunteers distributing warm jackets and blankets to street workers and families during cold spells.',
  },
  {
    title: 'Blanket Distribution for the Needy',
    location: 'Mohammadpur Town Hall, Dhaka',
    category: 'Relief Aid',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop&q=80',
    description: 'Handing over insulated fleece blankets to elderly community members in temporary shelters.',
  },
  {
    title: 'Lakeside Urban Tree Plantation Drive',
    location: 'Dhanmondi Lake, Dhaka',
    category: 'Environment',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    description: 'Youth volunteers planting indigenous fruit-bearing saplings with protective enclosures.',
  },
  {
    title: 'Clean Dhaka Plastic Cleanup Drive',
    location: 'Gulshan 2 Lake Park, Dhaka',
    category: 'Sanitation',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80',
    description: 'Collecting and segregating single-use beverage containers and non-biodegradable waste.',
  },
  {
    title: 'Free Community Health & Eye Screening Camp',
    location: 'Uttara Sector 4, Dhaka',
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
    description: 'Volunteer physicians offering preventative health consultations and essential medicines.',
  },
  {
    title: 'Education for All: Children Book Fair',
    location: 'Farmgate Plaza, Dhaka',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
    description: 'Providing illustrated storybooks and learning stationery kits to informal street schools.',
  },
];

export default function GallerySection() {
  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Moments of Kindness
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight">
            Stories & Photographs from the Field
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Real moments of hope, empathy, and community service captured during recent volunteer relief drives.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryPhotos.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col h-72 bg-slate-900 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent" />

              {/* Top Tag */}
              <div className="absolute top-3 left-3">
                <span className="px-2 py-0.5 text-[11px] font-semibold rounded bg-slate-900/85 backdrop-blur-sm text-emerald-300 border border-emerald-500/30">
                  {item.category}
                </span>
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-0 inset-x-0 p-4 space-y-1 text-white">
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item.location}</span>
                </div>
                <h3 className="text-sm font-bold leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
