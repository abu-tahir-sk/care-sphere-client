'use client';

import React from 'react';

export default function EventSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm animate-pulse flex flex-col h-full">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-slate-200 dark:bg-slate-700/60" />

      {/* Body skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Badge & Date */}
          <div className="flex items-center justify-between">
            <div className="h-5 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="h-4 w-28 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>

          {/* Title */}
          <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-700/60 rounded" />
          <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700/60 rounded" />
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 space-y-3">
          {/* Location */}
          <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
          {/* Button */}
          <div className="h-10 w-full bg-slate-200 dark:bg-slate-700 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function EventGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <EventSkeleton key={i} />
      ))}
    </div>
  );
}

