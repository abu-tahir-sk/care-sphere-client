'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

const faqs = [
  {
    q: 'Who can create and host an event on CareSphere?',
    a: 'Any logged-in community volunteer, youth group leader, or welfare organizer can host an event. All you need is a valid CareSphere account, event details, future date, and location coordinates.',
  },
  {
    q: 'Is participation in CareSphere volunteer events free?',
    a: 'Yes, 100% free! CareSphere is a non-profit, community-powered platform. Volunteers never pay fees to join drives, cleanups, plantation campaigns, or relief distributions.',
  },
  {
    q: 'How does the platform ensure events are scheduled in the future?',
    a: 'Both client-side calendar validation and server-side business rules strictly enforce that event dates cannot be in the past. Expired dates are automatically prevented during creation and editing.',
  },
  {
    q: 'Can I cancel my registration if my schedule changes?',
    a: 'Yes. Simply navigate to your "Joined Events" page from the profile dropdown and click "Cancel RSVP" on the corresponding card to free up your spot for another volunteer.',
  },
  {
    q: 'How do I download my Volunteer Community Service Certificate?',
    a: 'Once you join any community initiative, open the event details page or your joined portfolio and click "View Volunteer Certificate". You can instantly download or print your customized PDF certificate with a verifiable ID.',
  },
  {
    q: 'Can I host drives outside of Dhaka?',
    a: 'Absolutely! CareSphere supports initiatives across all divisions of Bangladesh including Chattogram, Sylhet, Rajshahi, Khulna, and beyond.',
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Everything You Need to Know About CareSphere
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Answers to common questions regarding hosting volunteer drives, event participation, and platform safety.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-base hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-4 animate-in fade-in duration-200">
                    {item.a}
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
