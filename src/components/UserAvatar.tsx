'use client';

import React, { useState, useEffect } from 'react';

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBorder?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-16 h-16 text-xl',
  xl: 'w-24 h-24 text-3xl',
};

export default function UserAvatar({
  src,
  name,
  size = 'md',
  className = '',
  showBorder = false,
}: UserAvatarProps) {
  const [hasError, setHasError] = useState(false);

  // Reset error state if src changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  const cleanName = (name || 'Volunteer').trim();
  const nameParts = cleanName.split(/\s+/).filter(Boolean);
  const initials =
    nameParts.length >= 2
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : cleanName.slice(0, 2).toUpperCase();

  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const borderClass = showBorder ? 'border-2 border-emerald-500/30' : '';

  // Reliable fallback avatars if src is missing
  const cleanSrc = src && typeof src === 'string' && src.trim().length > 0 ? src.trim() : null;

  if (!cleanSrc || hasError) {
    return (
      <div
        className={`${sizeClass} rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-black flex items-center justify-center shrink-0 shadow-sm select-none tracking-wider ${borderClass} ${className}`}
        aria-hidden="true"
      >
        <span>{initials}</span>
      </div>
    );
  }

  return (
    <div
      className={`relative ${sizeClass} rounded-full overflow-hidden shrink-0 shadow-sm bg-emerald-100 dark:bg-emerald-950/60 ${borderClass} ${className}`}
    >
      <img
        src={cleanSrc}
        alt=""
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

