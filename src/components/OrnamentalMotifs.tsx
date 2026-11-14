import { useState } from 'react';

interface CornerFiligreeProps {
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color?: string;
}

export function CornerFiligree({
  className = '',
  position = 'top-left',
  color = '#B99A62',
}: CornerFiligreeProps) {
  const rotationMap = {
    'top-left': 'rotate(0deg)',
    'top-right': 'scaleX(-1)',
    'bottom-left': 'scaleY(-1)',
    'bottom-right': 'scale(-1, -1)',
  } as const;

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ transform: rotationMap[position] }}
    >
      <path
        d="M8 110 V24 C8 14 14 8 24 8 H110"
        stroke={color}
        strokeWidth="1.2"
        strokeOpacity="0.85"
      />
      <path
        d="M15 95 V28 C15 20 20 15 28 15 H95"
        stroke={color}
        strokeWidth="0.75"
        strokeOpacity="0.55"
      />
      <path
        d="M15 44 C26 44 34 36 34 25 C34 32 42 36 48 30 C41 25 39 18 44 15"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.75"
      />
      <path
        d="M23 23 C28 20 33 20 35 23 C33 28 28 31 23 23 Z"
        fill={color}
        fillOpacity="0.25"
        stroke={color}
        strokeWidth="0.8"
      />
      <circle cx="24" cy="24" r="2.2" fill={color} fillOpacity="0.8" />
      <circle cx="56" cy="15" r="1.4" fill={color} fillOpacity="0.6" />
      <circle cx="15" cy="56" r="1.4" fill={color} fillOpacity="0.6" />
    </svg>
  );
}

interface OrnamentalDividerProps {
  className?: string;
  color?: string;
  variant?: 'heart' | 'lotus';
}

export function OrnamentalDivider({
  className = '',
  color = '#B99A62',
  variant = 'lotus',
}: OrnamentalDividerProps) {
  return (
    <div
      className={`flex items-center justify-center gap-4 ${className}`}
      aria-hidden="true"
    >
      <span
        className="h-px w-16 sm:w-24 opacity-50"
        style={{
          background: `linear-gradient(90deg, transparent, ${color})`,
        }}
      />
      {variant === 'heart' ? (
        <svg viewBox="0 0 36 28" className="w-7 h-5 shrink-0" fill="none">
          <path
            d="M18 24.5C18 24.5 5 16.4 5 9.2C5 5.8 7.7 3.2 11 3.2C13.8 3.2 16.3 4.8 18 7.3C19.7 4.8 22.2 3.2 25 3.2C28.3 3.2 31 5.8 31 9.2C31 16.4 18 24.5 18 24.5Z"
            stroke={color}
            strokeWidth="1.2"
            fill={color}
            fillOpacity="0.18"
          />
          <circle cx="18" cy="12" r="1.5" fill={color} />
        </svg>
      ) : (
        <svg viewBox="0 0 44 26" className="w-9 h-5 shrink-0" fill="none">
          <path
            d="M22 3 C25 9 25 16 22 22 C19 16 19 9 22 3 Z"
            stroke={color}
            strokeWidth="1.1"
            fill={color}
            fillOpacity="0.2"
          />
          <path
            d="M22 22 C16 18 11 13 11 8 C16 9 20 13 22 22 Z"
            stroke={color}
            strokeWidth="1"
            fill={color}
            fillOpacity="0.12"
          />
          <path
            d="M22 22 C28 18 33 13 33 8 C28 9 24 13 22 22 Z"
            stroke={color}
            strokeWidth="1"
            fill={color}
            fillOpacity="0.12"
          />
          <path
            d="M4 15 H12 M32 15 H40"
            stroke={color}
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeOpacity="0.7"
          />
        </svg>
      )}
      <span
        className="h-px w-16 sm:w-24 opacity-50"
        style={{
          background: `linear-gradient(90deg, ${color}, transparent)`,
        }}
      />
    </div>
  );
}

export function WaxSealMonogram({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md">
        <defs>
          <radialGradient id="waxGold" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#E6CE9D" />
            <stop offset="55%" stopColor="#B99A62" />
            <stop offset="100%" stopColor="#866838" />
          </radialGradient>
        </defs>
        <path
          d="M50 5 C57 5 62 9 68 10 C75 11 81 14 85 20 C90 25 91 32 94 39 C96 46 95 53 93 60 C91 67 89 74 84 80 C79 86 72 88 65 91 C58 94 51 95 44 93 C37 92 29 90 23 85 C17 80 12 74 9 67 C6 60 6 52 7 45 C8 38 9 30 14 24 C19 18 25 14 31 10 C38 7 43 5 50 5 Z"
          fill="url(#waxGold)"
        />
        <circle
          cx="50"
          cy="50"
          r="34"
          fill="none"
          stroke="#F7F0E5"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke="#6A5129"
          strokeWidth="0.7"
          strokeOpacity="0.45"
        />
        <path
          d="M50 32 C54 41 54 51 50 61 C46 51 46 41 50 32 Z"
          fill="#4A0E1B"
          fillOpacity="0.85"
        />
        <path
          d="M50 61 C41 55 34 48 34 40 C41 42 47 48 50 61 Z"
          fill="#4A0E1B"
          fillOpacity="0.72"
        />
        <path
          d="M50 61 C59 55 66 48 66 40 C59 42 53 48 50 61 Z"
          fill="#4A0E1B"
          fillOpacity="0.72"
        />
        <circle cx="50" cy="66" r="2.2" fill="#4A0E1B" fillOpacity="0.8" />
      </svg>
    </div>
  );
}

export function GoldHeartIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#B99A62"
      className={className}
      aria-label="heart"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export function GoldCalendarIllustration({
  className = 'w-12 h-12',
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <rect
        x="10"
        y="14"
        width="44"
        height="40"
        rx="2"
        stroke="#B99A62"
        strokeWidth="1.4"
      />
      <path d="M10 25 H54" stroke="#B99A62" strokeWidth="1.2" />
      <path
        d="M22 9 V18 M42 9 V18"
        stroke="#B99A62"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <text
        x="32"
        y="43"
        textAnchor="middle"
        fill="#4A0E1B"
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: '18px',
          fontWeight: 600,
        }}
      >
        16
      </text>
    </svg>
  );
}

export function GoldClockIllustration({
  className = 'w-12 h-12',
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="21" stroke="#B99A62" strokeWidth="1.4" />
      <circle
        cx="32"
        cy="32"
        r="17"
        stroke="#B99A62"
        strokeWidth="0.7"
        strokeDasharray="2 3"
      />
      <path
        d="M32 20 V32 L39 37"
        stroke="#4A0E1B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="2" fill="#B99A62" />
    </svg>
  );
}

interface BotanicalArtworkProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  darkSurface?: boolean;
}

export function BotanicalArtwork({
  src,
  alt,
  className = '',
  fallbackTitle = 'Floral Motif',
  darkSurface = false,
}: BotanicalArtworkProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 text-center ${
          darkSurface
            ? 'bg-[#2E0710] border border-[#B99A62]/30 text-[#F7F0E5]'
            : 'bg-[#E7D8C5]/50 border border-[#B99A62]/30 text-[#320A14]'
        } ${className}`}
        role="img"
        aria-label={alt}
      >
        <OrnamentalDivider variant="lotus" />
        <span className="mt-2 font-display italic text-sm opacity-75">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
