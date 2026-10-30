'use client';

import React from 'react';
import { Camera, MapPin, Tag } from 'lucide-react';

const galleryPhotos = [
  {
    title: 'Winter Warmth Clothes Distribution',
    location: 'Mirpur 10, Dhaka',
    category: 'Winter Relief',
    image: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?w=800&auto=format&fit=crop&q=80',
    description: 'Volunteers distributing warm jackets and blankets to street children and night rickshaw pullers.',
  },
  {
    title: 'Blanket Distribution for the Needy',
    location: 'Mohammadpur Town Hall, Dhaka',
    category: 'Donation',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop&q=80',
    description: 'Handing over insulated fleece blankets to elderly community members in cold spells.',
  },
  {
    title: 'Lakeside Urban Tree Plantation Drive',
    location: 'Dhanmondi Lake, Dhaka',
    category: 'Plantation',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    description: 'Youth volunteers planting indigenous fruit-bearing trees along public recreation walkways.',
  },
  {
    title: 'Clean Dhaka Plastic Cleanup Drive',
    location: 'Gulshan 2 Lake Park, Dhaka',
    category: 'Cleanup',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80',
    description: 'Collecting and segregating single-use beverage bottles and waste wrappers from public spots.',
  },
  {
    title: 'Free Community Health & Eye Screening Camp',
    location: 'Uttara Sector 4, Dhaka',
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
    description: 'Volunteer doctors offering preventative health consultations and medicines to day laborers.',
  },
  {
    title: 'Education for All: Children Book Fair',
    location: 'Farmgate Plaza, Dhaka',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
    description: 'Providing illustrated storybooks and school supplies to students from underserved schools.',
  },
];

export default function GallerySection() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Moments of Compassion</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Capturing Grassroots Social Service in Action
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            A glimpse into the heartfelt efforts of volunteers dedicating their weekends to uplifting disadvantaged communities across Bangladesh.
          </p>
        </div>

        {/* Gallery Grid (Equal height and width cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryPhotos.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col h-[380px] bg-slate-900"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/90 text-slate-950 backdrop-blur-md shadow-md">
                  {item.category}
                </span>
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-0 inset-x-0 p-6 space-y-2 text-white">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
                <h3 className="text-lg font-bold leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
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
