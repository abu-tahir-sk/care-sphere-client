'use client';

import React, { useRef } from 'react';
import { IEvent } from '@/types';
import { format } from 'date-fns';
import { Award, Printer, X, HeartHandshake, ShieldCheck } from 'lucide-react';

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
      const prevTitle = document.title;
      document.title = `CareSphere_Certificate_${userName.replace(/\s+/g, '_')}`;
      window.print();
      setTimeout(() => {
        document.title = prevTitle;
      }, 1000);
    }
  };

  let formattedDate = 'November 2026';
  try {
    formattedDate = format(new Date(event.eventDate), 'MMMM d, yyyy');
  } catch (e) {}

  const certId = `CS-VOL-${event._id.slice(-6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <>
      {/* Strict 1-Page Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 6mm;
          }
          html,
          body {
            height: 100% !important;
            max-height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body * {
            visibility: hidden !important;
          }
          #caresphere-cert-print-area,
          #caresphere-cert-print-area * {
            visibility: visible !important;
          }
          #caresphere-cert-print-area {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: 100% !important;
            max-height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            background: #ffffff !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 9999999 !important;
          }
          #printable-certificate {
            width: 98% !important;
            max-width: 980px !important;
            margin: auto !important;
            box-shadow: none !important;
            background: #ffffff !important;
            border: 4px double #14532D !important;
            page-break-inside: avoid !important;
            page-break-after: avoid !important;
            page-break-before: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>

      <div
        id="caresphere-cert-print-area"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101B17]/70 backdrop-blur-sm animate-in fade-in"
      >
        <div className="bg-white dark:bg-[#0F1E16] w-full max-w-4xl rounded-[32px] p-6 sm:p-8 shadow-2xl border border-[#14532D]/15 dark:border-white/10 max-h-[95vh] overflow-y-auto space-y-6">
          {/* Modal Controls (Hidden in Print) */}
          <div className="flex items-center justify-between pb-3 border-b border-[#14532D]/10 dark:border-white/10 print:hidden">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#D9F3E5] dark:bg-[#14532D]/50 flex items-center justify-center text-[#14532D] dark:text-[#D9F3E5]">
                <Award className="w-4 h-4 text-[#159A70]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#101B17] dark:text-[#F7F8F0]">
                Official Volunteer Certificate
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#14532D] hover:bg-[#0F3F22] shadow-sm transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF (1 Page)</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#D9F3E5]/50 dark:hover:bg-white/10 text-[#101B17]/60 dark:text-[#F7F8F0]/60 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Certificate Canvas (Guaranteed 1 Single Page Landscape) */}
          <div
            id="printable-certificate"
            ref={certificateRef}
            className="relative bg-[#F7F8F0] dark:bg-[#0A130E] p-6 sm:p-10 rounded-2xl border-4 border-double border-[#14532D]/30 dark:border-[#159A70]/40 text-center space-y-4 shadow-sm"
          >
            {/* Header watermark/emblem */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-[#14532D] text-white flex items-center justify-center shadow-md shadow-[#14532D]/20">
                <HeartHandshake className="w-6 h-6 text-[#D9F3E5]" />
              </div>
              <p className="text-[11px] uppercase tracking-widest font-extrabold text-[#14532D] dark:text-[#D9F3E5]">
                CareSphere Social Development Platform
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101B17] dark:text-[#F7F8F0] tracking-tight uppercase">
                Certificate of Community Service
              </h1>
              <p className="text-xs text-[#101B17]/60 dark:text-[#F7F8F0]/60 max-w-md">
                In recognition of exemplary commitment to grassroots social action and civic compassion.
              </p>
            </div>

            {/* Presentation line */}
            <div className="space-y-1 pt-1">
              <p className="text-xs uppercase font-semibold text-[#101B17]/50 dark:text-[#F7F8F0]/50 tracking-wider">
                This certificate is proudly presented to
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-[#14532D] dark:text-[#D9F3E5] underline decoration-[#159A70] decoration-2 underline-offset-8">
                {userName}
              </h2>
            </div>

            {/* Contribution description */}
            <div className="max-w-xl mx-auto space-y-1.5 text-xs sm:text-sm text-[#101B17]/70 dark:text-[#F7F8F0]/70">
              <p className="leading-relaxed">
                For active participation and volunteer service during the community initiative:
              </p>
              <p className="text-sm sm:text-base font-bold text-[#101B17] dark:text-[#F7F8F0] bg-[#D9F3E5]/60 dark:bg-[#14532D]/40 py-1.5 px-4 rounded-xl inline-block border border-[#14532D]/20 dark:border-white/10">
                &ldquo;{event.title}&rdquo;
              </p>
              <p className="text-xs text-[#101B17]/60 dark:text-[#F7F8F0]/60">
                Held at{' '}
                <span className="font-semibold text-[#101B17] dark:text-[#F7F8F0]">
                  {event.location}
                </span>{' '}
                on{' '}
                <span className="font-semibold text-[#101B17] dark:text-[#F7F8F0]">
                  {formattedDate}
                </span>
              </p>
            </div>

            {/* Bottom signatures and verification seal */}
            <div className="pt-6 border-t border-[#14532D]/15 dark:border-white/15 grid grid-cols-3 items-end gap-4 text-xs">
              {/* Signature 1 */}
              <div className="text-center space-y-1">
                <div className="font-serif italic text-base text-[#101B17] dark:text-[#F7F8F0] border-b border-[#14532D]/20 dark:border-white/20 pb-1">
                  {event.organizerName}
                </div>
                <p className="font-bold text-[#101B17]/60 dark:text-[#F7F8F0]/60">Event Organizer</p>
                <p className="text-[10px] text-[#101B17]/40 dark:text-[#F7F8F0]/40">CareSphere Chapter</p>
              </div>

              {/* Verified Badge */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#14532D] text-white flex flex-col items-center justify-center shadow-md font-bold border-2 border-[#159A70]">
                  <ShieldCheck className="w-5 h-5 text-[#D9F3E5]" />
                  <span className="text-[8px] uppercase tracking-wider font-extrabold text-[#D9F3E5]">Verified</span>
                </div>
              </div>

              {/* Verification ID */}
              <div className="text-center space-y-1">
                <p className="font-mono text-[11px] text-[#14532D] dark:text-[#D9F3E5] bg-[#D9F3E5]/60 dark:bg-[#14532D]/40 py-1 px-2 rounded border border-[#14532D]/20 dark:border-white/10">
                  {certId}
                </p>
                <p className="font-bold text-[#101B17]/60 dark:text-[#F7F8F0]/60">Certificate ID</p>
                <p className="text-[10px] text-[#101B17]/40 dark:text-[#F7F8F0]/40">Authentic Volunteer Record</p>
              </div>
            </div>
          </div>

          {/* Modal footer tip */}
          <p className="text-[11px] text-center text-[#101B17]/50 dark:text-[#F7F8F0]/50 print:hidden">
            💡 You can attach this certificate verification ID to your resume or portfolio under community service.
          </p>
        </div>
      </div>
    </>
  );
}
