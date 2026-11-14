import { useId, useState } from 'react';
import { motion } from 'motion/react';

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

interface LuxuryFloralClusterProps {
  className?: string;
  mirrorX?: boolean;
  mirrorY?: boolean;
}

export function LuxuryFloralCluster({
  className = '',
  mirrorX = false,
  mirrorY = false,
}: LuxuryFloralClusterProps) {
  const uid = useId();
  const roseOuterId = `rosePetalOuter-${uid}`;
  const roseInnerId = `rosePetalInner-${uid}`;
  const goldLeafId = `goldLeafGrad-${uid}`;
  const lotusBlushId = `lotusBlush-${uid}`;

  const scaleX = mirrorX ? -1 : 1;
  const scaleY = mirrorY ? -1 : 1;

  return (
    <svg
      viewBox="0 0 260 260"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ transform: `scale(${scaleX}, ${scaleY})` }}
    >
      <defs>
        <radialGradient id={roseOuterId} cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#F7F0E5" />
          <stop offset="65%" stopColor="#E6C3B8" />
          <stop offset="100%" stopColor="#B88278" />
        </radialGradient>
        <radialGradient id={roseInnerId} cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF9F2" />
          <stop offset="60%" stopColor="#EED2C7" />
          <stop offset="100%" stopColor="#C9988E" />
        </radialGradient>
        <linearGradient id={goldLeafId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E6CE9D" />
          <stop offset="55%" stopColor="#B99A62" />
          <stop offset="100%" stopColor="#7C5E30" />
        </linearGradient>
        <radialGradient id={lotusBlushId} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FAF3EA" />
          <stop offset="70%" stopColor="#DFB7AC" />
          <stop offset="100%" stopColor="#B99A62" />
        </radialGradient>
      </defs>

      {/* Graceful Gold Trailing Stems */}
      <path
        d="M18 22 C74 34 128 68 176 122 M28 38 C42 98 68 156 112 204 M44 26 C106 24 166 36 222 66"
        stroke={`url(#${goldLeafId})`}
        strokeWidth="1.35"
        strokeOpacity="0.82"
        strokeLinecap="round"
      />

      {/* Sculpted Gold & Botanical Leaves */}
      <g fill={`url(#${goldLeafId})`} fillOpacity="0.45" stroke="#D6BD8D" strokeWidth="0.9">
        <path d="M116 42 C134 24 156 26 164 42 C148 54 128 52 116 42 Z" />
        <path d="M168 58 C188 42 212 46 218 62 C200 72 180 68 168 58 Z" />
        <path d="M44 106 C28 124 30 148 46 156 C58 140 56 120 44 106 Z" />
        <path d="M68 154 C54 174 58 198 74 206 C86 188 82 166 68 154 Z" />
        <path d="M128 96 C148 92 166 102 168 118 C152 124 134 114 128 96 Z" />
        <path d="M92 128 C86 148 94 168 110 172 C118 156 110 136 92 128 Z" />
      </g>

      {/* Primary Hero Cream-Blush Garden Rose */}
      <g transform="translate(68, 68)">
        <circle cx="0" cy="0" r="36" fill={`url(#${roseOuterId})`} fillOpacity="0.95" />
        <path
          d="M-30 -6 C-34 -28 -10 -38 8 -30 C28 -34 40 -12 30 8 C34 28 10 40 -10 30 C-28 34 -38 12 -30 -6 Z"
          fill={`url(#${roseOuterId})`}
          stroke="#B99A62"
          strokeWidth="0.9"
        />
        <path
          d="M-21 -4 C-24 -20 -6 -28 6 -21 C20 -24 28 -8 21 6 C24 20 8 28 -6 21 C-20 24 -28 8 -21 -4 Z"
          fill={`url(#${roseInnerId})`}
          stroke="#C9988E"
          strokeWidth="0.8"
        />
        <path
          d="M-12 -2 C-14 -12 -4 -18 4 -12 C12 -14 18 -4 12 4 C14 12 4 18 -4 12 C-12 14 -16 4 -12 -2 Z"
          fill="#FFF8F0"
          stroke="#B99A62"
          strokeWidth="0.7"
        />
        <path
          d="M-5 0 C-5 -6 5 -6 5 0 C5 6 -5 6 -5 0 Z"
          fill="#D6BD8D"
          fillOpacity="0.65"
        />
      </g>

      {/* Secondary Royal Lotus Blossom */}
      <g transform="translate(142, 62) rotate(24)">
        <path
          d="M0 -28 C10 -12 10 8 0 18 C-10 8 -10 -12 0 -28 Z"
          fill={`url(#${lotusBlushId})`}
          stroke="#B99A62"
          strokeWidth="0.9"
        />
        <path
          d="M0 18 C-16 10 -24 -4 -20 -18 C-10 -14 -4 -2 0 18 Z"
          fill={`url(#${lotusBlushId})`}
          stroke="#B99A62"
          strokeWidth="0.85"
        />
        <path
          d="M0 18 C16 10 24 -4 20 -18 C10 -14 4 -2 0 18 Z"
          fill={`url(#${lotusBlushId})`}
          stroke="#B99A62"
          strokeWidth="0.85"
        />
        <circle cx="0" cy="4" r="3" fill="#D6BD8D" />
      </g>

      {/* Delicate Secondary Rose Bud (Lower Left) */}
      <g transform="translate(64, 140) rotate(-18)">
        <circle cx="0" cy="0" r="21" fill={`url(#${roseOuterId})`} stroke="#B99A62" strokeWidth="0.8" />
        <path
          d="M-12 -2 C-12 -13 4 -15 10 -6 C16 2 8 15 -4 12 C-12 10 -14 3 -12 -2 Z"
          fill={`url(#${roseInnerId})`}
          stroke="#C9988E"
          strokeWidth="0.7"
        />
        <circle cx="0" cy="0" r="4" fill="#E6CE9D" />
      </g>

      {/* Five-Petal Indian Jasmine Star Blossoms */}
      {[
        { x: 186, y: 108, scale: 1 },
        { x: 112, y: 178, scale: 0.9 },
        { x: 206, y: 66, scale: 0.72 },
      ].map((j, idx) => (
        <g
          key={idx}
          transform={`translate(${j.x}, ${j.y}) scale(${j.scale})`}
        >
          {[0, 72, 144, 216, 288].map((angle) => (
            <ellipse
              key={angle}
              cx="0"
              cy="-9"
              rx="3.8"
              ry="7.5"
              transform={`rotate(${angle})`}
              fill="#FAF4EC"
              stroke="#B99A62"
              strokeWidth="0.65"
            />
          ))}
          <circle cx="0" cy="0" r="2.6" fill="#D6BD8D" />
        </g>
      ))}

      {/* Fine Gold Dew Accents */}
      <circle cx="164" cy="138" r="2.2" fill="#E6CE9D" fillOpacity="0.85" />
      <circle cx="136" cy="152" r="1.8" fill="#E6CE9D" fillOpacity="0.75" />
      <circle cx="192" cy="84" r="1.6" fill="#E6CE9D" fillOpacity="0.75" />
    </svg>
  );
}

export function SectionTransitionBridge({
  variant = 'light',
}: {
  variant?: 'light' | 'toCrimson';
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full py-4 sm:py-6 flex flex-col items-center justify-center overflow-hidden ${
        variant === 'toCrimson'
          ? 'bg-gradient-to-b from-[#E7D8C5]/40 via-[#B88B7B]/18 to-[#4A0E1B]'
          : 'bg-transparent'
      }`}
    >
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="w-px h-10 sm:h-14 origin-top bg-gradient-to-b from-transparent via-[#B99A62]/75 to-transparent"
      />
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="my-1 block w-2 h-2 rotate-45 border border-[#B99A62] bg-[#F7F0E5]"
      />
    </div>
  );
}

