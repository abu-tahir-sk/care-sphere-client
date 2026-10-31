import React from 'react';
import WeatherAdvisoryBanner from '@/components/home/WeatherAdvisoryBanner';
import BannerSection from '@/components/home/BannerSection';
import ImpactStatsSection from '@/components/home/ImpactStatsSection';
import FeatureSection from '@/components/home/FeatureSection';
import RecentEventsSection from '@/components/home/RecentEventsSection';
import CertificateShowcaseSection from '@/components/home/CertificateShowcaseSection';
import DistrictExplorerSection from '@/components/home/DistrictExplorerSection';
import GallerySection from '@/components/home/GallerySection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FaqSection from '@/components/home/FaqSection';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Seasonal Community Bulletin */}
      <WeatherAdvisoryBanner />

      {/* 1. Hero Banner with Quick Search & Interactive Operations Console */}
      <BannerSection />

      {/* 2. Live Impact Stats Metric Ribbon */}
      <ImpactStatsSection />

      {/* 3. Platform Capabilities Bento Grid */}
      <FeatureSection />

      {/* 4. Recent Upcoming Events (Dynamic with MongoDB .limit(6)) */}
      <RecentEventsSection />

      {/* 5. Dedicated Verifiable A4 Certificate Showcase */}
      <CertificateShowcaseSection />

      {/* 6. Interactive Hyperlocal District Hub Explorer */}
      <DistrictExplorerSection />

      {/* 7. Photo Gallery of Documented Field Initiatives */}
      <GallerySection />

      {/* 8. Community Testimonials & Volunteer Endorsements */}
      <TestimonialsSection />

      {/* 9. Operating Guidelines & Frequently Asked Questions */}
      <FaqSection />

      {/* 10. Civic Dispatch Bulletin Subscription */}
      <NewsletterSection />
    </div>
  );
}
