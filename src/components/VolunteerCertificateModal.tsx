'use client';

import React, { useRef } from 'react';
import { IEvent } from '@/types';
import { format } from 'date-fns';
import { Award, Printer, X, HeartHandshake, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface VolunteerCertificateModalProps {
  event: IEvent;
  userName: string;
  onClose: () => void;
}

export default function VolunteerCertificateModal({
  event,
  userName,
  onClose,
}: VolunteerCertificateModalProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  let formattedDate = 'November 2026';
  try {
    formattedDate = format(new Date(event.eventDate), 'MMMM d, yyyy');
  } catch (e) {}

  const certId = `CS-VOL-${event._id.slice(-6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[95vh] overflow-y-auto space-y-6">
        {/* Modal Controls */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Official Volunteer Certificate
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Canvas */}
        <div
          ref={certificateRef}
          className="relative bg-gradient-to-br from-amber-50/40 via-white to-emerald-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 p-8 sm:p-12 rounded-2xl border-8 border-double border-amber-500/30 text-center space-y-6 shadow-inner print:border-4 print:border-amber-600 print:p-8"
        >
          {/* Header watermark/emblem */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <p className="text-xs uppercase tracking-widest font-extrabold text-emerald-700 dark:text-emerald-400">
              CareSphere Social Development Platform
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              Certificate of Community Service
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
              In recognition of exemplary commitment to grassroots social action and civic compassion.
            </p>
          </div>

          {/* Presentation line */}
          <div className="space-y-1 pt-2">
            <p className="text-xs uppercase font-semibold text-slate-400">This certificate is proudly presented to</p>
            <h2 className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 underline decoration-amber-400 decoration-2 underline-offset-8">
              {userName}
            </h2>
          </div>

          {/* Contribution description */}
          <div className="max-w-xl mx-auto space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <p className="leading-relaxed">
              For active participation and volunteer service during the community initiative:
            </p>
            <p className="text-base font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800/80 py-2 px-4 rounded-xl inline-block border border-slate-200 dark:border-slate-700">
              &ldquo;{event.title}&rdquo;
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              Held at <span className="font-semibold text-slate-700 dark:text-slate-300">{event.location}</span> on{' '}
              <span className="font-semibold text-slate-700 dark:text-slate-300">{formattedDate}</span>
            </p>
          </div>

          {/* Bottom signatures and verification seal */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 items-end gap-4 text-xs">
            {/* Signature 1 */}
            <div className="text-center space-y-1">
              <div className="font-serif italic text-base text-slate-800 dark:text-slate-200 border-b border-slate-300 dark:border-slate-700 pb-1">
                {event.organizerName}
              </div>
              <p className="font-bold text-slate-500 dark:text-slate-400">Event Organizer</p>
              <p className="text-[10px] text-slate-400">CareSphere Chapter</p>
            </div>

            {/* Gold Seal / Badge */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 text-slate-950 flex flex-col items-center justify-center shadow-lg font-bold border-2 border-amber-200">
                <ShieldCheck className="w-6 h-6 text-slate-950" />
                <span className="text-[9px] uppercase tracking-wider font-extrabold">Verified</span>
              </div>
            </div>

            {/* Verification ID */}
            <div className="text-center space-y-1">
              <p className="font-mono text-[11px] text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 py-1 px-2 rounded border border-slate-200 dark:border-slate-700">
                {certId}
              </p>
              <p className="font-bold text-slate-500 dark:text-slate-400">Certificate ID</p>
              <p className="text-[10px] text-slate-400">Authentic Volunteer Record</p>
            </div>
          </div>
        </div>

        {/* Modal footer tip */}
        <p className="text-[11px] text-center text-slate-400 print:hidden">
          💡 You can attach this certificate verification ID to your resume or portfolio under community service.
        </p>
      </div>
    </div>
  );
}
