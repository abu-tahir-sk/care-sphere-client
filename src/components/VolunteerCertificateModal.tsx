'use client';

import React, { useRef, useState } from 'react';
import { IEvent } from '@/types';
import { format } from 'date-fns';
import { Award, Printer, Download, Image as ImageIcon, X, HeartHandshake, ShieldCheck, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

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
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // 1-Click Direct A4 Landscape PDF Download
  const handleDownloadPDF = async () => {
    if (!certificateRef.current || isExporting) return;
    setIsExporting(true);
    const toastId = toast.loading('Generating landscape A4 certificate PDF...');
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const element = certificateRef.current;

      const canvas = await html2canvas(element, {
        scale: 3, // Ultra-sharp 300 DPI print quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FAF9F6',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png', 1.0);

      // Force explicit A4 Landscape orientation: 297mm width x 210mm height
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      // Render image directly across the 297x210 landscape canvas
      pdf.addImage(imgData, 'PNG', 0, 0, 297, 210, undefined, 'FAST');

      const fileName = `CareSphere_Certificate_${userName.replace(/\s+/g, '_')}.pdf`;
      pdf.save(fileName);
      toast.success('Certificate downloaded successfully in horizontal landscape!', { id: toastId });
    } catch (error) {
      console.error('Failed to export certificate PDF:', error);
      toast.error('Failed to download PDF. Please try the Print option.', { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  // Direct PNG Image Download
  const handleDownloadPNG = async () => {
    if (!certificateRef.current || isExporting) return;
    setIsExporting(true);
    const toastId = toast.loading('Exporting certificate image...');
    try {
      const html2canvas = (await import('html2canvas')).default;
      const element = certificateRef.current;

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FAF9F6',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `CareSphere_Certificate_${userName.replace(/\s+/g, '_')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Certificate image saved successfully!', { id: toastId });
    } catch (error) {
      console.error('Failed to export certificate image:', error);
      toast.error('Failed to export image.', { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  // Standard Browser Print Option with strict A4 Landscape lock
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
      {/* Strict A4 Landscape Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: 297mm 210mm !important; /* Explicit A4 Landscape */
            margin: 0 !important;
          }
          html,
          body {
            width: 297mm !important;
            height: 210mm !important;
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
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 297mm !important;
            height: 210mm !important;
            margin: 0 !important;
            padding: 8mm !important;
            box-sizing: border-box !important;
            background: #ffffff !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          #printable-certificate {
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            max-height: 100% !important;
            box-sizing: border-box !important;
            background: #FAF9F6 !important;
            border: 6px double #14532D !important;
            box-shadow: none !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>

      <div
        id="caresphere-cert-print-area"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#101B17]/75 backdrop-blur-md animate-in fade-in"
      >
        <div className="bg-white dark:bg-[#0B1510] w-full max-w-4xl rounded-[28px] p-5 sm:p-7 shadow-2xl border border-[#14532D]/20 dark:border-white/10 max-h-[96vh] overflow-y-auto space-y-5">
          {/* Modal Header Controls (Hidden during Print) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#14532D]/10 dark:border-white/10 print:hidden">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#D9F3E5] dark:bg-[#14532D]/50 flex items-center justify-center text-[#14532D] dark:text-[#D9F3E5]">
                <Award className="w-5 h-5 text-[#159A70]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#101B17] dark:text-[#F7F8F0]">
                  Official Volunteer Certificate
                </h3>
                <p className="text-[11px] text-[#101B17]/60 dark:text-[#F7F8F0]/60">
                  Verifiable A4 Community Service Credential
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Direct Landscape PDF Download */}
              <button
                type="button"
                onClick={handleDownloadPDF}
                disabled={isExporting}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#14532D] hover:bg-[#0F3F22] disabled:opacity-50 shadow-sm transition-all"
                title="Download horizontal landscape PDF directly"
              >
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                <span>Download PDF (Landscape)</span>
              </button>

              {/* PNG Download */}
              <button
                type="button"
                onClick={handleDownloadPNG}
                disabled={isExporting}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#14532D] dark:text-[#D9F3E5] bg-[#D9F3E5]/70 dark:bg-[#14532D]/40 hover:bg-[#D9F3E5] border border-[#14532D]/20 transition-all"
                title="Download as high-res PNG image"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Image (PNG)</span>
              </button>

              {/* Standard Print */}
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#101B17] dark:text-[#F7F8F0] bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-all"
                title="Print or Save via Browser"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print</span>
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-[#101B17]/60 dark:text-[#F7F8F0]/60 transition-colors ml-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable / Downloadable Certificate Canvas (Explicit Landscape A4 Ratio) */}
          <div
            id="printable-certificate"
            ref={certificateRef}
            className="relative bg-[#FAF9F6] text-[#101B17] p-6 sm:p-10 rounded-2xl border-4 border-double border-[#14532D] text-center space-y-4 shadow-md overflow-hidden aspect-[1.414/1] flex flex-col justify-between"
            style={{ width: '100%', maxWidth: '850px', margin: '0 auto', boxSizing: 'border-box' }}
          >
            {/* Header watermark/emblem */}
            <div className="flex flex-col items-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-[#14532D] text-[#D9F3E5] flex items-center justify-center shadow-md">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest font-extrabold text-[#14532D]">
                CareSphere Social Development Platform
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101B17] tracking-tight uppercase">
                Certificate of Community Service
              </h1>
              <p className="text-xs text-[#101B17]/70 max-w-lg mx-auto">
                In recognition of exemplary commitment to grassroots social action and civic compassion.
              </p>
            </div>

            {/* Presentation line */}
            <div className="space-y-1 py-1">
              <p className="text-xs uppercase font-semibold text-[#101B17]/60 tracking-wider">
                This certificate is proudly presented to
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#14532D] underline decoration-[#159A70] decoration-2 underline-offset-8">
                {userName}
              </h2>
            </div>

            {/* Contribution description */}
            <div className="max-w-xl mx-auto space-y-1.5 text-xs sm:text-sm text-[#101B17]/80">
              <p className="leading-relaxed">
                For active participation and volunteer service during the community initiative:
              </p>
              <p className="text-sm sm:text-base font-bold text-[#101B17] bg-[#D9F3E5]/70 py-1.5 px-4 rounded-xl inline-block border border-[#14532D]/30">
                &ldquo;{event.title}&rdquo;
              </p>
              <p className="text-xs text-[#101B17]/70">
                Held at <span className="font-semibold text-[#101B17]">{event.location}</span> on{' '}
                <span className="font-semibold text-[#101B17]">{formattedDate}</span>
              </p>
            </div>

            {/* Bottom signatures and verification seal */}
            <div className="pt-4 border-t border-[#14532D]/20 grid grid-cols-3 items-end gap-4 text-xs">
              {/* Signature 1 */}
              <div className="text-center space-y-1">
                <div className="font-serif italic text-base text-[#101B17] border-b border-[#14532D]/30 pb-1">
                  {event.organizerName}
                </div>
                <p className="font-bold text-[#101B17]/80">Event Organizer</p>
                <p className="text-[10px] text-[#101B17]/60">CareSphere Chapter</p>
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
                <p className="font-mono text-[11px] font-bold text-[#14532D] bg-[#D9F3E5]/80 py-1 px-2 rounded border border-[#14532D]/30">
                  {certId}
                </p>
                <p className="font-bold text-[#101B17]/80">Certificate ID</p>
                <p className="text-[10px] text-[#101B17]/60">Authentic Volunteer Record</p>
              </div>
            </div>
          </div>

          {/* Modal footer helper info */}
          <p className="text-[11px] text-center text-[#101B17]/60 dark:text-[#F7F8F0]/60 print:hidden">
            💡 Click <strong>Download PDF (Landscape)</strong> to directly download the horizontal A4 certificate.
          </p>
        </div>
      </div>
    </>
  );
}
