'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Subscription Confirmed',
      text: `You will receive monthly field dispatches and emergency drive notices at ${email}.`,
      timer: 2800,
      showConfirmButton: false,
      customClass: {
        popup: 'rounded-xl dark:bg-slate-900 dark:text-white',
      },
    });

    setEmail('');
  };

  return (
    <section className="py-16 bg-slate-50/70 dark:bg-slate-950/40 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-sm">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-emerald-400 border border-slate-700 text-[11px] font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Civic Dispatch Service</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Stay Informed on Regional Volunteer Operations & Emergency Drives
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Subscribe to the CareSphere community bulletin. Receive verified notices about severe winter weather drives, tree plantation weekends, and emergency relief camps in your zone.
            </p>

            {/* Subscription Form */}
            <form onSubmit={handleSubmit} className="pt-2 flex flex-col sm:flex-row items-center gap-2 max-w-lg">
              <div className="relative w-full">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.org or personal email"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-800/90 border border-slate-700 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-medium text-xs sm:text-sm text-white bg-emerald-700 hover:bg-emerald-600 shrink-0 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-5 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Verified civic dispatches only
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Zero spam commitment
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> One-click unsubscribe
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
