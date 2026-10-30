'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';
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
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* App Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
              Care<span className="text-emerald-600 dark:text-emerald-400">Sphere</span>
            </span>
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 -mt-1">
              Community Service
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-semibold transition-colors ${
              pathname === '/'
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
            }`}
          >
            Home
          </Link>
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                pathname === item.href
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Section: Theme Toggle + Auth Controls */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          {isLoading ? (
            <div className="w-24 h-9 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              {/* Profile Picture with Hover Tooltip + Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <div className="relative group">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="flex items-center gap-2 p-1 rounded-full border-2 border-emerald-500/40 hover:border-emerald-500 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    aria-label="User Menu"
                    title={user.name}
                  >
                    <img
                      src={user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover shadow"
                    />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 mr-1" />
                  </button>

                  {/* Hover tooltip displaying user's name */}
                  <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    {user.name}
                  </div>
                </div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700/60">
                      <p className="text-xs text-slate-400 dark:text-slate-400">Signed in as</p>
                      <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/create-event"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-700/60 hover:text-emerald-600 transition-colors"
                      >
                        <PlusCircle className="w-4 h-4 text-emerald-500" />
                        Create Event
                      </Link>
                      <Link
                        href="/manage-events"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-700/60 hover:text-emerald-600 transition-colors"
                      >
                        <FolderKanban className="w-4 h-4 text-teal-500" />
                        Manage Events
                      </Link>
                      <Link
                        href="/joined-events"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-700/60 hover:text-emerald-600 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        Joined Events
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-700/60 hover:text-emerald-600 transition-colors"
                      >
                        <User className="w-4 h-4 text-purple-500" />
                        My Profile
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-700/60 pt-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-500/25 transition-all transform active:scale-95"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Home
          </Link>
          <Link
            href="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Upcoming Events
          </Link>

          {user ? (
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-3 px-3 py-2">
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                </div>
              </div>

              <Link
                href="/create-event"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <PlusCircle className="w-4 h-4 text-emerald-500" />
                Create Event
              </Link>
              <Link
                href="/manage-events"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <FolderKanban className="w-4 h-4 text-teal-500" />
                Manage Events
              </Link>
              <Link
                href="/joined-events"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                Joined Events
              </Link>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <User className="w-4 h-4 text-purple-500" />
                My Profile
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2.5 px-4 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
