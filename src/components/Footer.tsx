'use client';

import React from 'react';
import Link from 'next/link';
import {
  HeartHandshake,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Github,
  Linkedin,
  Facebook,
} from 'lucide-react';

function XLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0A130E] text-[#F7F8F0]/80 pt-16 pb-12 border-t border-white/10 text-xs sm:text-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Purpose */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#14532D] flex items-center justify-center text-white shadow-xs">
                <HeartHandshake className="w-4 h-4 text-[#D9F3E5]" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Care<span className="text-[#159A70]">Sphere</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#D9F3E5]/60 font-bold">
                  Community Platform
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#F7F8F0]/70 leading-relaxed">
              Open digital platform for grassroots community welfare and volunteer coordination across Dhaka and all regional divisions of Bangladesh.
            </p>

            {/* Social media links */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-[#0F1E16] hover:bg-[#14532D] hover:text-white text-[#F7F8F0]/70 flex items-center justify-center border border-white/10 transition-colors"
                aria-label="X (formerly Twitter)"
              >
                <XLogo className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-[#0F1E16] hover:bg-[#14532D] hover:text-white text-[#F7F8F0]/70 flex items-center justify-center border border-white/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-[#0F1E16] hover:bg-[#14532D] hover:text-white text-[#F7F8F0]/70 flex items-center justify-center border border-white/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/abu-tahir-sk/care-sphere-client"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-[#0F1E16] hover:bg-[#14532D] hover:text-white text-[#F7F8F0]/70 flex items-center justify-center border border-white/10 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Directory Navigation */}
          <div>
            <h4 className="font-extrabold text-white tracking-wider uppercase text-[11px] mb-3.5">
              Initiatives Directory
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F7F8F0]/70">
              <li>
                <Link href="/events" className="hover:text-[#D9F3E5] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#159A70]" />
                  Upcoming Relief Drives
                </Link>
              </li>
              <li>
                <Link href="/events?eventType=Winter+Relief" className="hover:text-[#D9F3E5] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#159A70]" />
                  Winter Warmth Distribution
                </Link>
              </li>
              <li>
                <Link href="/events?eventType=Plantation" className="hover:text-[#D9F3E5] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#159A70]" />
                  Lakeside Tree Plantation
                </Link>
              </li>
              <li>
                <Link href="/events?eventType=Cleanup" className="hover:text-[#D9F3E5] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#159A70]" />
                  Civic Sanitation Drives
                </Link>
              </li>
              <li>
                <Link href="/events?eventType=Healthcare" className="hover:text-[#D9F3E5] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#159A70]" />
                  Free Community Health Camps
                </Link>
              </li>
            </ul>
          </div>

          {/* Organizer Resources */}
          <div>
            <h4 className="font-extrabold text-white tracking-wider uppercase text-[11px] mb-3.5">
              Volunteer Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F7F8F0]/70">
              <li>
                <Link href="/create-event" className="hover:text-[#D9F3E5] transition-colors">
                  Host a New Initiative
                </Link>
              </li>
              <li>
                <Link href="/manage-events" className="hover:text-[#D9F3E5] transition-colors">
                  Organizer Console & Rosters
                </Link>
              </li>
              <li>
                <Link href="/joined-events" className="hover:text-[#D9F3E5] transition-colors">
                  Volunteer Service Record
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-[#D9F3E5] transition-colors">
                  Account & Organization Settings
                </Link>
              </li>
              <li>
                <span className="text-[#F7F8F0]/40">Service Certificate Validation</span>
              </li>
            </ul>
          </div>

          {/* Institutional Contact & Verification */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white tracking-wider uppercase text-[11px]">
              Community Desk
            </h4>
            <div className="space-y-2 text-xs text-[#F7F8F0]/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#159A70] mt-0.5 shrink-0" />
                <span>Sector 11, Uttara, Dhaka - 1230, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#159A70] shrink-0" />
                <span>contact@caresphere.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#159A70] shrink-0" />
                <span>+880 1712-345678</span>
              </div>
            </div>

            {/* System Status Pill */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F1E16] border border-white/10 text-[11px] text-[#D9F3E5]">
                <span className="w-2 h-2 rounded-full bg-[#159A70] animate-pulse" />
                <span>Active Volunteer Network</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F7F8F0]/50 gap-3">
          <p>© {new Date().getFullYear()} CareSphere Community Social Welfare Platform. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[#F7F8F0]/50 text-[11px]">
            <span>Open Source Civic Initiative</span>
            <span>•</span>
            <span>Non-Profit Community Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
