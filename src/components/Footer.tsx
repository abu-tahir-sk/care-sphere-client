'use client';

import React from 'react';
import Link from 'next/link';
import {
  HeartHandshake,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Heart,
  Github,
  Linkedin,
  Facebook,
} from 'lucide-react';

// New X (formerly Twitter) logo component
function XLogo({ className = 'w-5 h-5' }: { className?: string }) {
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
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Care<span className="text-emerald-400">Sphere</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering grassroots communities across Bangladesh. Connect, create, and join local
              social welfare events to bring lasting change to lives that need it most.
            </p>
            {/* Social Icons with new X logo */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-emerald-600/20 hover:text-emerald-400 text-slate-400 flex items-center justify-center border border-slate-800 transition-all hover:scale-105"
                aria-label="Follow us on X"
              >
                <XLogo className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-emerald-600/20 hover:text-emerald-400 text-slate-400 flex items-center justify-center border border-slate-800 transition-all hover:scale-105"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-emerald-600/20 hover:text-emerald-400 text-slate-400 flex items-center justify-center border border-slate-800 transition-all hover:scale-105"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-emerald-600/20 hover:text-emerald-400 text-slate-400 flex items-center justify-center border border-slate-800 transition-all hover:scale-105"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold text-white tracking-wide uppercase text-xs mb-4">
              Explore Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/create-event" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                  Create an Event
                </Link>
              </li>
              <li>
                <Link href="/joined-events" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                  My Joined Events
                </Link>
              </li>
              <li>
                <Link href="/manage-events" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                  Organizer Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Event Categories */}
          <div>
            <h4 className="text-base font-bold text-white tracking-wide uppercase text-xs mb-4">
              Event Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                Winter Relief & Clothing
              </li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                Food Drives & Nutrition
              </li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                Tree Plantation & Ecology
              </li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                Urban Cleanliness Drives
              </li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                Free Health & Medical Camps
              </li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                Children Education & Books
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-base font-bold text-white tracking-wide uppercase text-xs mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                <span>Sector 11, Uttara, Dhaka - 1230, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>contact@caresphere.org</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+880 1712-345678</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CareSphere Platform. Dedicated to community empowerment.</p>
          <p className="flex items-center gap-1.5">
            Designed with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for social welfare
          </p>
        </div>
      </div>
    </footer>
  );
}
