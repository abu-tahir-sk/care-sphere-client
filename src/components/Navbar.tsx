'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';
import UserAvatar from '@/components/UserAvatar';
import {
  HeartHandshake,
  Calendar,
  PlusCircle,
  FolderKanban,
  CheckCircle2,
  LogOut,
  LogIn,
  User,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    logout();
    router.push('/');
  };

  const navLinks = [
    { label: 'Upcoming Events', href: '/events', icon: Calendar },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7F8F0]/95 dark:bg-[#0A130E]/95 backdrop-blur-md border-b border-[#14532D]/10 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* App Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-[#14532D] dark:bg-[#159A70] flex items-center justify-center text-white shadow-xs group-hover:bg-[#0f3f22] transition-colors">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div className="flex items-baseline">
            <span className="font-manrope text-xl font-extrabold tracking-tight text-[#101B17] dark:text-white">
              Care<span className="text-[#159A70] dark:text-emerald-400">Sphere</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === '/'
                ? 'text-[#14532D] dark:text-emerald-400 font-bold'
                : 'text-[#101B17]/70 dark:text-slate-300 hover:text-[#14532D] dark:hover:text-white'
            }`}
          >
            Home
          </Link>
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${
                pathname === item.href
                  ? 'text-[#14532D] dark:text-emerald-400 font-bold'
                  : 'text-[#101B17]/70 dark:text-slate-300 hover:text-[#14532D] dark:hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4 text-[#159A70]" />
              {item.label}
            </Link>
          ))}
          {user && (
            <>
              <Link
                href="/joined-events"
                className={`text-sm font-medium transition-colors ${
                  pathname === '/joined-events'
                    ? 'text-[#14532D] dark:text-emerald-400 font-bold'
                    : 'text-[#101B17]/70 dark:text-slate-300 hover:text-[#14532D] dark:hover:text-white'
                }`}
              >
                My Schedule
              </Link>
              <Link
                href="/manage-events"
                className={`text-sm font-medium transition-colors ${
                  pathname === '/manage-events'
                    ? 'text-[#14532D] dark:text-emerald-400 font-bold'
                    : 'text-[#101B17]/70 dark:text-slate-300 hover:text-[#14532D] dark:hover:text-white'
                }`}
              >
                Organizer Space
              </Link>
            </>
          )}
        </nav>

        {/* Right Section: Theme Toggle + Auth Controls */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-200 dark:border-slate-700">
                <User className="w-4 h-4 text-slate-400 animate-pulse" />
              </div>
            </div>
          ) : user ? (
            <div className="flex items-center gap-2.5">
              {/* Profile Menu Trigger with Hover Display Name Tooltip */}
              <div className="relative group/avatar" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1 rounded-full border-2 border-emerald-600/40 hover:border-emerald-600 dark:border-emerald-500/40 dark:hover:border-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  aria-label={`User Account: ${user.name}`}
                  title={user.name}
                >
                  <UserAvatar
                    src={user.photoURL}
                    name={user.name}
                    size="sm"
                  />
                  <ChevronDown className="w-3 h-3 text-slate-500 mr-1" />
                </button>

                {/* Floating Tooltip on Hover showing User Display Name */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2.5 py-1 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover/avatar:opacity-100 transition-opacity duration-200 z-50 shadow-md">
                  {user.name}
                </div>

                {/* Dropdown Menu (Fluent Clean Card) */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                      <UserAvatar src={user.photoURL} name={user.name} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="py-1.5 text-xs">
                      <Link
                        href="/create-event"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors font-medium"
                      >
                        <PlusCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        Create Event
                      </Link>
                      <Link
                        href="/manage-events"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors font-medium"
                      >
                        <FolderKanban className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        Manage Events
                      </Link>
                      <Link
                        href="/joined-events"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        Joined Events
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                      >
                        <User className="w-4 h-4 text-slate-500" />
                        Profile Settings
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Explicit Navbar Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 transition-colors shadow-2xs"
                title="Logout from account"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>

              {/* Direct Post Button */}
              <Link
                href="/create-event"
                className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#14532D] hover:bg-[#0f3f22] dark:bg-[#159A70] dark:hover:bg-[#12825e] transition-all shadow-2xs hover:translate-y-[-1px]"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Create Event</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#101B17] dark:text-slate-200 hover:bg-[#D9F3E5]/40 dark:hover:bg-slate-800 border border-[#14532D]/20 dark:border-slate-700 transition-colors shadow-2xs"
              >
                <LogIn className="w-3.5 h-3.5 text-[#159A70]" />
                <span>Login</span>
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#14532D] hover:bg-[#0f3f22] dark:bg-[#159A70] dark:hover:bg-[#12825e] shadow-2xs transition-all hover:translate-y-[-1px]"
              >
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          {user ? (
            <Link
              href="/profile"
              className="p-0.5 rounded-full border border-emerald-600/30 hover:border-emerald-600 transition-colors"
              aria-label="My Profile"
            >
              <UserAvatar src={user.photoURL} name={user.name} size="sm" />
            </Link>
          ) : isLoading ? (
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-200 dark:border-slate-700">
              <User className="w-4 h-4 text-slate-400 animate-pulse" />
            </div>
          ) : null}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-1">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Overview
          </Link>
          <Link
            href="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Upcoming Events
          </Link>

          {user ? (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
              <div className="px-3 py-2 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                My Workspace
              </div>
              <Link
                href="/create-event"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                Create Event
              </Link>
              <Link
                href="/manage-events"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <FolderKanban className="w-4 h-4 text-teal-600" />
                Manage Events
              </Link>
              <Link
                href="/joined-events"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Joined Events
              </Link>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <User className="w-4 h-4 text-slate-500" />
                Profile Settings
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 rounded-md text-sm font-semibold border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 rounded-md text-sm font-semibold bg-emerald-700 text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
