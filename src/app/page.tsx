import React from 'react';
import BannerSection from '@/components/home/BannerSection';
import FeatureSection from '@/components/home/FeatureSection';
import RecentEventsSection from '@/components/home/RecentEventsSection';
import ImpactStatsSection from '@/components/home/ImpactStatsSection';
import GallerySection from '@/components/home/GallerySection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FaqSection from '@/components/home/FaqSection';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Banner Section */}
      <BannerSection />

      {/* 2. Feature Section */}
      <FeatureSection />

      {/* 3. Recent Upcoming Events Section (Dynamic - 6 events with MongoDB .limit()) */}
      <RecentEventsSection />

      {/* Impact Stats Counter */}
      <ImpactStatsSection />

      {/* 4. Gallery Section (Static photos of social drives) */}
      <GallerySection />

      {/* Community Testimonials & Volunteer Stories */}
      <TestimonialsSection />

      {/* Interactive FAQ Accordion */}
      <FaqSection />

      {/* 5. Newsletter Section (Subscription design) */}
      <NewsletterSection />
    </div>
  );
}
