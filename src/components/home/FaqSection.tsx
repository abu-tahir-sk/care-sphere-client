'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
    q: 'How does the system enforce that drives are scheduled in the future?',
    a: 'Both client-side calendar validation and server-side MongoDB pipeline business rules strictly mandate that event timestamps must be greater than current server time (Date.now()). Expired entries cannot be saved or edited to past dates.',
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
    <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Platform Guidance
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight">
            Operating Guidelines & Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Guidance for field organizers, community volunteers, and institutional partners using CareSphere.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white text-sm hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-700 dark:text-emerald-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60">
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
