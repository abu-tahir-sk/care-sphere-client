'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR / initial load, render consistent icon instead of an empty pulsing skeleton
  const currentTheme = mounted ? (theme === 'system' ? resolvedTheme : theme) : 'light';
  const isDark = currentTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => mounted && setTheme(isDark ? 'light' : 'dark')}
      className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
      aria-label="Toggle Theme"
      title={mounted ? (isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode') : 'Toggle Theme'}
    >
      {mounted ? (
        isDark ? (
          <Sun className="w-5 h-5 text-amber-400 transition-transform hover:rotate-45" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700 dark:text-slate-200 transition-transform hover:-rotate-12" />
        )
      ) : (
        <Sun className="w-5 h-5 text-amber-500/80 dark:text-slate-300 opacity-90" />
      )}
    </button>
  );
}

