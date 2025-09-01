'use client';

import React from 'react';

interface GithubButtonProps {
  repoUrl: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function GithubButton({
  repoUrl,
  label = 'Star on GitHub',
  size = 'md',
  className = '',
}: GithubButtonProps) {
  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-1 text-sm'
      : size === 'lg'
      ? 'px-4 py-2 text-lg'
      : 'px-3 py-1.5 text-base';

  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full bg-gray-800 text-white hover:bg-gray-900 ${sizeClasses} ${className}`}
    >
      <svg
        aria-hidden="true"
        height="16"
        viewBox="0 0 16 16"
        width="16"
        fill="currentColor"
      >
        <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49C3.72 14.91 3.14 13.37 3.14 13.37c-.36-.92-.88-1.17-.88-1.17-.72-.5.05-.49.05-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.58 9.58 0 018 3.5a9.6 9.6 0 012.5.34c1.9-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
      {label}
    </a>
  );
}
