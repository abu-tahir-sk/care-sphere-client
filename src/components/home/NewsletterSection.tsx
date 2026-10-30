'use client';

import React, { useState } from 'react';
import { Mail, Send, Sparkles, CheckCircle2 } from 'lucide-react';
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
      title: 'Subscribed Successfully!',
      text: `Thank you! You will now receive monthly highlights of upcoming volunteer drives at ${email}.`,
      timer: 2800,
      showConfirmButton: false,
      customClass: {
        popup: 'rounded-2xl dark:bg-slate-900 dark:text-white',
      },
    });

    setEmail('');
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
          {/* Ambient graphic circles */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-emerald-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Stay Informed & Inspired</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Get Notified of Upcoming Community Relief Drives in Your City
            </h2>

            <p className="text-base text-emerald-100 leading-relaxed">
              Subscribe to the CareSphere community dispatch. Receive urgent alerts about emergency winter drives, tree plantation weekends, and blood donation camps near you.
            </p>

            {/* Subscription Form */}
            <form onSubmit={handleSubmit} className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full">
                <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-4 focus:ring-emerald-300/40 shadow-inner"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-black/20 flex items-center justify-center gap-2 shrink-0 transition-transform active:scale-95"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-100/90 pt-2 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" /> No spam guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Monthly impact digest
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Unsubscribe at any time
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
