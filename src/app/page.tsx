import React from 'react';
import WeatherAdvisoryBanner from '@/components/home/WeatherAdvisoryBanner';
import BannerSection from '@/components/home/BannerSection';
import DistrictExplorerSection from '@/components/home/DistrictExplorerSection';
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
      {/* Seasonal Community Bulletin */}
      <WeatherAdvisoryBanner />

      {/* 1. Hero Banner with Quick Search */}
      <BannerSection />

      {/* Interactive Hyperlocal Hub Explorer */}
      <DistrictExplorerSection />

      {/* 2. Platform Capabilities */}
      <FeatureSection />

      {/* 3. Recent Upcoming Events (Dynamic with MongoDB .limit(6)) */}
      <RecentEventsSection />

      {/* Live Impact Stats Counter */}
      <ImpactStatsSection />

      {/* 4. Photo Gallery */}
      <GallerySection />

      {/* Community Testimonials & Volunteer Stories */}
      <TestimonialsSection />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* 5. Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
}
