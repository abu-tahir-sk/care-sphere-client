'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';
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
        popup: 'rounded-2xl dark:bg-[#0F1E16] dark:text-[#F7F8F0]',
      },
    });

    setEmail('');
  };

  return (
    <section className="py-24 bg-[#F7F8F0] dark:bg-[#0A130E] border-b border-[#14532D]/10 dark:border-white/10 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] bg-[#14532D] text-white p-8 sm:p-14 border border-[#159A70]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#159A70]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F3F22] text-[#D9F3E5] border border-[#159A70]/40 text-xs font-semibold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5 text-[#D9F3E5]" />
              <span>Community Bulletin</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Stay Connected with Relief Drives in Your Neighborhood
            </h2>

            <p className="text-xs sm:text-sm text-[#D9F3E5]/90 leading-relaxed">
              Subscribe to the CareSphere community newsletter. Receive timely updates about winter blanket distribution, tree planting weekends, and free health camps in your area.
            </p>

            {/* Subscription Form */}
            <form onSubmit={handleSubmit} className="pt-2 flex flex-col sm:flex-row items-center gap-2.5 max-w-lg">
              <div className="relative w-full">
                <Mail className="w-4 h-4 text-[#D9F3E5]/60 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email (e.g. name@gmail.com)..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#0F3F22] border border-[#159A70]/40 text-white placeholder:text-[#D9F3E5]/60 text-xs sm:text-sm focus:outline-none focus:border-[#D9F3E5] focus:ring-1 focus:ring-[#D9F3E5]"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-[#14532D] bg-[#F7F8F0] hover:bg-white shrink-0 shadow-md transition-all flex items-center justify-center gap-1.5 hover:translate-y-[-1px]"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-5 text-[11px] text-[#D9F3E5]/80 pt-1">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-[#D9F3E5]" /> Verified civic dispatches only
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-[#D9F3E5]" /> Zero spam commitment
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-[#D9F3E5]" /> One-click unsubscribe
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
