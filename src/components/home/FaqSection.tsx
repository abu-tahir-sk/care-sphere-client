'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'Who is eligible to organize an initiative on CareSphere?',
    a: 'Any verified user, youth society lead, or community group coordinator can publish an initiative. A valid account, verified location coordinates, future timestamp, and descriptive relief scope are required.',
  },
  {
    q: 'Are there any platform charges or volunteer enrollment fees?',
    a: 'No. CareSphere is an open-access civic technology initiative. Volunteers never pay fees to enroll in relief distributions, environmental restoration, or community health drives.',
  },
  {
    q: 'Can I schedule events for upcoming dates only?',
    a: 'Yes. To ensure that all drives listed on CareSphere are active and actionable, initiatives can only be scheduled for upcoming future dates. Organizers can easily plan relief distributions and camps ahead of time.',
  },
  {
    q: 'How does RSVP capacity tracking operate when volunteer quotas fill up?',
    a: 'Each initiative specifies a volunteer capacity. Once reached, the quota indicator displays 100% capacity and updates in real time to prevent logistical oversubscription at field sites.',
  },
  {
    q: 'How are official Volunteer Service Certificates generated?',
    a: 'Upon enrolling in a confirmed initiative, volunteers can access the "Print Service Certificate" option. The system formats a single-page A4 landscape certificate with a cryptographic identifier (e.g. CS-VOL-XXXX) suitable for academic or civic portfolios.',
  },
  {
    q: 'Can civic initiatives be created outside Dhaka metropolitan area?',
    a: 'Yes. CareSphere supports drives across all 8 administrative divisions of Bangladesh, including Chattogram, Sylhet, Rajshahi, Khulna, Barishal, Rangpur, and Mymensingh.',
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-[#F7F8F0] dark:bg-[#0A130E] border-b border-[#14532D]/10 dark:border-white/10 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9F3E5] dark:bg-[#14532D]/40 border border-[#14532D]/20 text-[#14532D] dark:text-[#D9F3E5] text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#159A70]" />
            <span>Community Guidance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101B17] dark:text-[#F7F8F0] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#101B17]/70 dark:text-[#F7F8F0]/70">
            Everything you need to know about joining community drives, volunteering, and organizing causes.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#0F1E16] rounded-2xl border border-[#14532D]/15 dark:border-white/10 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-[#101B17] dark:text-[#F7F8F0] text-sm hover:text-[#14532D] dark:hover:text-[#159A70] transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#101B17]/40 dark:text-[#F7F8F0]/40 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#14532D] dark:text-[#159A70]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#101B17]/70 dark:text-[#F7F8F0]/70 leading-relaxed border-t border-[#14532D]/10 dark:border-white/10">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
