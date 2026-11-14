import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { EVENT_DETAILS, EVENT_IMAGES } from '../constants/eventData';
import { AmbientParticles } from './AmbientParticles';
import { MusicController } from './MusicController';
import {
  BotanicalArtwork,
  GoldHeartIcon,
  OrnamentalDivider,
} from './OrnamentalMotifs';

export type OpeningPhase = 'closed' | 'opening' | 'opened';

interface RoyalOpeningStageProps {
  phase: OpeningPhase;
  onStartOpen: () => void;
  onOpenComplete: () => void;
  onSkipToOpen: () => void;
  onContinueToNext: () => void;
}

const SILK_PLEATS_LEFT =
  'repeating-linear-gradient(90deg, #E8D9C5 0px, #F6EFE3 18px, #D6C1A6 36px, #EFE4D4 54px, #CBB394 72px, #F3EAD9 90px)';

const SILK_PLEATS_RIGHT =
  'repeating-linear-gradient(-90deg, #E8D9C5 0px, #F6EFE3 18px, #D6C1A6 36px, #EFE4D4 54px, #CBB394 72px, #F3EAD9 90px)';

function BotanicalDoorPattern({ side }: { side: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 400 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 w-full h-full opacity-25 ${
        side === 'right' ? '-scale-x-100' : ''
      }`}
    >
      <g stroke="#D6BD8D" strokeWidth="1.2" fill="#D6BD8D" fillOpacity="0.16">
        {/* Top botanical spray */}
        <path d="M40 80 C100 120 140 180 120 260" fill="none" />
        <ellipse cx="82" cy="106" rx="22" ry="9" transform="rotate(-28 82 106)" />
        <ellipse cx="115" cy="148" rx="26" ry="10" transform="rotate(18 115 148)" />
        <ellipse cx="95" cy="196" rx="22" ry="9" transform="rotate(-35 95 196)" />
        <ellipse cx="132" cy="230" rx="20" ry="8" transform="rotate(24 132 230)" />

        {/* Mid outer botanical vines */}
        <path d="M310 210 C255 280 260 350 315 410" fill="none" />
        <ellipse cx="282" cy="255" rx="24" ry="9" transform="rotate(34 282 255)" />
        <ellipse cx="268" cy="312" rx="25" ry="10" transform="rotate(-22 268 312)" />
        <ellipse cx="294" cy="368" rx="22" ry="9" transform="rotate(28 294 368)" />

        {/* Lower diagonal foliage */}
        <path d="M35 560 C110 610 155 690 135 790" fill="none" />
        <ellipse cx="78" cy="594" rx="25" ry="10" transform="rotate(-24 78 594)" />
        <ellipse cx="118" cy="648" rx="27" ry="10" transform="rotate(20 118 648)" />
        <ellipse cx="96" cy="710" rx="23" ry="9" transform="rotate(-32 96 710)" />
        <ellipse cx="144" cy="754" rx="22" ry="9" transform="rotate(16 144 754)" />

        {/* Subtle inner border */}
        <rect
          x="22"
          y="22"
          width="356"
          height="856"
          fill="none"
          stroke="#B99A62"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}

function GardenCourtyardBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-44 sm:h-56 overflow-hidden select-none"
    >
      {/* Soft warm garden haze */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(231,216,197,0.92) 0%, rgba(247,240,229,0.55) 55%, transparent 100%)',
        }}
      />

      {/* Left & Right Watercolor Floral Corners */}
      <div className="absolute -bottom-8 -left-8 w-44 h-44 sm:w-64 sm:h-64 opacity-85 mix-blend-multiply">
        <BotanicalArtwork
          src={EVENT_IMAGES.floralCorner}
          alt="Garden floral arrangement left"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="absolute -bottom-8 -right-8 w-44 h-44 sm:w-64 sm:h-64 opacity-85 mix-blend-multiply -scale-x-100">
        <BotanicalArtwork
          src={EVENT_IMAGES.floralCorner}
          alt="Garden floral arrangement right"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Symmetrical Royal Balustrade, Cypress & Fountain Silhouette */}
      <svg
        viewBox="0 0 1200 220"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 w-full h-full"
      >
        {/* Balustrade horizon rail */}
        <path
          d="M0 164 H455 M745 164 H1200"
          stroke="#B99A62"
          strokeOpacity="0.45"
          strokeWidth="1.4"
        />
        <path
          d="M0 176 H445 M755 176 H1200"
          stroke="#183C32"
          strokeOpacity="0.2"
          strokeWidth="1"
        />

        {/* Cypress trees left & right */}
        <ellipse cx="195" cy="126" rx="18" ry="56" fill="#183C32" fillOpacity="0.16" />
        <ellipse cx="236" cy="138" rx="14" ry="44" fill="#A6AD91" fillOpacity="0.28" />
        <ellipse cx="1005" cy="126" rx="18" ry="56" fill="#183C32" fillOpacity="0.16" />
        <ellipse cx="964" cy="138" rx="14" ry="44" fill="#A6AD91" fillOpacity="0.28" />

        {/* Classical Urn Plinths */}
        <rect x="275" y="140" width="42" height="36" fill="#E7D8C5" stroke="#B99A62" strokeOpacity="0.55" />
        <rect x="883" y="140" width="42" height="36" fill="#E7D8C5" stroke="#B99A62" strokeOpacity="0.55" />

        {/* Center Courtyard Fountain Basin */}
        <ellipse
          cx="600"
          cy="184"
          rx="132"
          ry="24"
          fill="#E7D8C5"
          stroke="#B99A62"
          strokeOpacity="0.6"
          strokeWidth="1.5"
        />
        <ellipse
          cx="600"
          cy="181"
          rx="114"
          ry="16"
          fill="#A6AD91"
          fillOpacity="0.22"
          stroke="#183C32"
          strokeOpacity="0.18"
        />
        {/* Fountain pedestal & gentle water arc */}
        <path
          d="M588 180 L594 146 H606 L612 180 Z"
          fill="#E7D8C5"
          stroke="#B99A62"
          strokeOpacity="0.6"
        />
        <ellipse
          cx="600"
          cy="145"
          rx="34"
          ry="7"
          fill="#F7F0E5"
          stroke="#B99A62"
          strokeOpacity="0.6"
        />
        <path
          d="M600 144 C595 124 584 128 580 144 M600 144 C605 124 616 128 620 144"
          fill="none"
          stroke="#B99A62"
          strokeOpacity="0.45"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}

function ScallopedCurtainValance() {
  return (
    <svg
      viewBox="0 0 1200 110"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none w-full h-16 sm:h-24 drop-shadow-[0_6px_12px_rgba(24,60,50,0.12)]"
    >
      <defs>
        <linearGradient id="swagGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D7C1A4" />
          <stop offset="55%" stopColor="#F4EBDD" />
          <stop offset="100%" stopColor="#DECAAE" />
        </linearGradient>
      </defs>
      {/* Five graceful scalloped swags across top */}
      <path
        d="M0,0 H240 C190,62 50,62 0,0 Z
           M240,0 H480 C430,72 290,72 240,0 Z
           M480,0 H720 C670,78 530,78 480,0 Z
           M720,0 H960 C910,72 770,72 720,0 Z
           M960,0 H1200 C1150,62 1010,62 960,0 Z"
        fill="url(#swagGrad)"
      />
      {/* Delicate gold beaded trim along swag edges */}
      <path
        d="M0,0 C50,62 190,62 240,0 C290,72 430,72 480,0 C530,78 670,78 720,0 C770,72 910,72 960,0 C1010,62 1150,62 1200,0"
        fill="none"
        stroke="#B99A62"
        strokeWidth="2.5"
        strokeDasharray="1 5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RoyalOpeningStage({
  phase,
  onStartOpen,
  onOpenComplete,
  onSkipToOpen,
  onContinueToNext,
}: RoyalOpeningStageProps) {
  const shouldReduceMotion = useReducedMotion();
  const isDoorsOpen = phase === 'opening' || phase === 'opened';
  const [curtainsParted, setCurtainsParted] = useState(phase === 'opened');
  const [namesVisible, setNamesVisible] = useState(phase === 'opened');

  useEffect(() => {
    if (phase === 'closed') {
      setCurtainsParted(false);
      setNamesVisible(false);
      return;
    }

    if (phase === 'opened') {
      setCurtainsParted(true);
      setNamesVisible(true);
      return;
    }

    // phase === 'opening': choreograph doors -> parting silk curtains -> slow name reveal -> unlock page
    if (shouldReduceMotion) {
      setCurtainsParted(true);
      setNamesVisible(true);
      onOpenComplete();
      return;
    }

    const curtainTimer = window.setTimeout(() => {
      setCurtainsParted(true);
    }, 650);

    const namesTimer = window.setTimeout(() => {
      setNamesVisible(true);
    }, 1500);

    const completeTimer = window.setTimeout(() => {
      onOpenComplete();
    }, 3100);

    return () => {
      window.clearTimeout(curtainTimer);
      window.clearTimeout(namesTimer);
      window.clearTimeout(completeTimer);
    };
  }, [phase, shouldReduceMotion, onOpenComplete]);

  return (
    <section
      id={phase === 'closed' ? 'cover' : 'couple'}
      aria-label="Royal Engagement Opening Stage and Couple Reveal"
      className="relative min-h-screen w-full overflow-hidden bg-[#F7F0E5] paper-grain flex flex-col items-center justify-center"
    >
      {/* Layer 1: Open Stage Backdrop — Warm Champagne Archway & Garden Courtyard */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, rgba(251,247,240,1) 0%, rgba(247,240,229,0.98) 54%, rgba(231,216,197,0.88) 100%)',
        }}
      />

      <GardenCourtyardBackdrop />

      {/* Subtle Floating Rose Petals & Gold Dust inside the Open Stage */}
      {curtainsParted && (
        <AmbientParticles variant="mixed" density="celebration" />
      )}

      {/* Layer 2: Centerpiece Couple Name Reveal (Slow, Unhurried Entrance After Curtains Part) */}
      <div
        className={`relative z-10 w-full max-w-3xl mx-auto px-6 pt-20 pb-28 sm:pt-24 sm:pb-32 flex flex-col items-center text-center transition-opacity duration-700 ${
          namesVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <motion.div
          initial={false}
          animate={namesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <GoldHeartIcon className="w-5 h-5 text-[#4A0E1B] mb-3 opacity-85" />
          <p className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.26em] text-[#8E713F]">
            Two Hearts, One Beautiful Beginning
          </p>
        </motion.div>

        {/* Bride Name — Slow Calligraphic Reveal */}
        <motion.h1
          initial={false}
          animate={namesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 1.15, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 sm:mt-9 font-display italic font-medium text-6xl sm:text-7xl md:text-8xl leading-none text-[#320A14] tracking-tight"
        >
          {EVENT_DETAILS.bride}
        </motion.h1>

        {/* Gold Shimmer Ampersand */}
        <motion.div
          initial={false}
          animate={
            namesVisible
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.85 }
          }
          transition={{ duration: 0.95, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}
          className="my-3 sm:my-4 flex items-center justify-center gap-5"
        >
          <span aria-hidden="true" className="h-px w-12 sm:w-20 bg-[#B99A62]/65" />
          <span className="font-display italic text-4xl sm:text-5xl gold-shimmer-text px-2">
            &amp;
          </span>
          <span aria-hidden="true" className="h-px w-12 sm:w-20 bg-[#B99A62]/65" />
        </motion.div>

        {/* Groom Name — Slow Calligraphic Reveal */}
        <motion.h2
          initial={false}
          animate={namesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 1.15, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-display italic font-medium text-6xl sm:text-7xl md:text-8xl leading-none text-[#320A14] tracking-tight"
        >
          {EVENT_DETAILS.groom}
        </motion.h2>

        <motion.div
          initial={false}
          animate={namesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.9, delay: 1.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex flex-col items-center"
        >
          <OrnamentalDivider variant="lotus" className="mb-4" />
          <p className="font-serif italic text-lg sm:text-xl text-[#320A14]/85">
            An Everlasting Promise Begins
          </p>
        </motion.div>

        {phase === 'opened' && (
          <motion.button
            type="button"
            onClick={onContinueToNext}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 inline-flex flex-col items-center gap-2 text-xs font-sans uppercase tracking-[0.22em] text-[#320A14]/80 hover:text-[#4A0E1B] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B99A62]"
          >
            <span>Continue Journey</span>
            <ChevronDown
              className="w-4 h-4 text-[#B99A62] animate-bounce"
              aria-hidden="true"
            />
          </motion.button>
        )}
      </div>

      {/* Layer 3: Pleated Champagne Silk Curtains (Sweeping Open Slowly & Staying Framed on Sides) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      >
        {/* Left Curtain Panel */}
        <motion.div
          initial={false}
          animate={
            curtainsParted
              ? { x: '-84%', skewY: -2 }
              : { x: '0%', skewY: 0 }
          }
          transition={{ duration: 1.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundImage: SILK_PLEATS_LEFT }}
          className="absolute top-0 bottom-0 left-0 w-1/2 shadow-[8px_0_32px_rgba(24,60,50,0.16)]"
        >
          {/* Beaded Gold & Pearl Inner Edge */}
          <div
            className="absolute top-0 bottom-0 right-0 w-1.5 sm:w-2"
            style={{
              background:
                'repeating-linear-gradient(180deg, #E6CE9D 0px, #E6CE9D 4px, #B99A62 4px, #B99A62 8px)',
            }}
          />
        </motion.div>

        {/* Right Curtain Panel */}
        <motion.div
          initial={false}
          animate={
            curtainsParted
              ? { x: '84%', skewY: 2 }
              : { x: '0%', skewY: 0 }
          }
          transition={{ duration: 1.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundImage: SILK_PLEATS_RIGHT }}
          className="absolute top-0 bottom-0 right-0 w-1/2 shadow-[-8px_0_32px_rgba(24,60,50,0.16)]"
        >
          {/* Beaded Gold & Pearl Inner Edge */}
          <div
            className="absolute top-0 bottom-0 left-0 w-1.5 sm:w-2"
            style={{
              background:
                'repeating-linear-gradient(180deg, #E6CE9D 0px, #E6CE9D 4px, #B99A62 4px, #B99A62 8px)',
            }}
          />
        </motion.div>

        {/* Upper Scalloped Valance Drapery (Reveals cleanly when curtains frame the arch) */}
        <motion.div
          initial={false}
          animate={
            isDoorsOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }
          }
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 inset-x-0 z-20"
        >
          <ScallopedCurtainValance />
        </motion.div>
      </div>

      {/* Layer 4: Outer Closed 3D Cherish Crimson Doors + Ornate "TAP TO OPEN" Medallion */}
      <div
        style={{ perspective: '1600px' }}
        className={`absolute inset-0 z-30 ${
          phase === 'opened' ? 'pointer-events-none' : ''
        }`}
      >
        {/* Top Utility Controls on Closed Cover Only */}
        {phase === 'closed' && (
          <div className="relative z-50 flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6">
            <MusicController variant="dark" />
            <button
              type="button"
              onClick={onSkipToOpen}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-[#B99A62]/45 bg-[#2E0710]/75 text-xs font-sans uppercase tracking-[0.16em] text-[#F7F0E5] hover:bg-[#2E0710] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6BD8D]"
            >
              <span>Skip</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D6BD8D]" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Left 3D Cherish Crimson Door */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={
            isDoorsOpen
              ? { x: '-104%', rotateY: -22 }
              : { x: '0%', rotateY: 0 }
          }
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            transformOrigin: 'left center',
            background:
              'linear-gradient(135deg, #631626 0%, #4A0E1B 52%, #2E0710 100%)',
          }}
          className="absolute top-0 bottom-0 left-0 w-1/2 border-r border-[#D6BD8D]/75 shadow-[8px_0_32px_rgba(30,4,10,0.55),inset_-18px_0_36px_rgba(24,3,8,0.45)] overflow-hidden"
        >
          <BotanicalDoorPattern side="left" />
        </motion.div>

        {/* Right 3D Cherish Crimson Door */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={
            isDoorsOpen
              ? { x: '104%', rotateY: 22 }
              : { x: '0%', rotateY: 0 }
          }
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            transformOrigin: 'right center',
            background:
              'linear-gradient(225deg, #631626 0%, #4A0E1B 52%, #2E0710 100%)',
          }}
          className="absolute top-0 bottom-0 right-0 w-1/2 border-l border-[#D6BD8D]/75 shadow-[-8px_0_32px_rgba(30,4,10,0.55),inset_18px_0_36px_rgba(24,3,8,0.45)] overflow-hidden"
        >
          <BotanicalDoorPattern side="right" />
        </motion.div>

        {/* Center Ornate Scalloped "TAP TO OPEN" Medallion (NO names or details) */}
        <motion.div
          initial={false}
          animate={
            isDoorsOpen
              ? { opacity: 0, scale: 0.85 }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none"
        >
          <button
            type="button"
            onClick={onStartOpen}
            disabled={isDoorsOpen}
            aria-label="Tap to open the engagement invitation"
            className="pointer-events-auto group relative flex items-center justify-center w-52 h-60 sm:w-60 sm:h-68 cursor-pointer transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#D6BD8D]"
          >
            {/* Ornate Scalloped Champagne Plaque SVG */}
            <svg
              viewBox="0 0 220 260"
              className="absolute inset-0 w-full h-full drop-shadow-[0_18px_36px_rgba(10,25,20,0.45)]"
              aria-hidden="true"
            >
              <path
                d="M110 10 C128 10 136 24 152 28 C170 32 184 44 190 60 C196 76 208 90 208 110 C208 130 208 130 208 150 C208 170 196 184 190 200 C184 216 170 228 152 232 C136 236 128 250 110 250 C92 250 84 236 68 232 C50 228 36 216 30 200 C24 184 12 170 12 150 C12 130 12 130 12 110 C12 90 24 76 30 60 C36 44 50 32 68 28 C84 24 92 10 110 10 Z"
                fill="#F7F0E5"
                stroke="#B99A62"
                strokeWidth="2.2"
              />
              <path
                d="M110 20 C125 20 132 32 146 36 C162 40 174 50 179 64 C184 78 196 90 196 110 C196 130 196 130 196 150 C196 170 184 182 179 196 C174 210 162 220 146 224 C132 228 125 240 110 240 C95 240 88 228 74 224 C58 220 46 210 41 196 C36 182 24 170 24 150 C24 130 24 130 24 110 C24 90 36 78 41 64 C46 50 58 40 74 36 C88 32 95 20 110 20 Z"
                fill="none"
                stroke="#B99A62"
                strokeOpacity="0.55"
                strokeWidth="1"
              />
            </svg>

            {/* Plaque Text & Sprigs */}
            <div className="relative z-10 flex flex-col items-center text-center px-6">
              {/* Top Botanical Sprig */}
              <svg viewBox="0 0 40 24" className="w-8 h-5 mb-2" aria-hidden="true">
                <path
                  d="M20 20 V6 M20 14 C14 12 11 8 11 5 C15 6 18 9 20 14 Z M20 14 C26 12 29 8 29 5 C25 6 22 9 20 14 Z"
                  fill="#8E713F"
                  stroke="#8E713F"
                  strokeWidth="0.9"
                />
              </svg>

              <span className="font-display text-lg sm:text-xl tracking-[0.22em] uppercase text-[#4A0E1B] group-hover:text-[#8E713F] transition-colors">
                Tap To Open
              </span>

              <span
                aria-hidden="true"
                className="mt-2 h-px w-12 bg-[#B99A62]/75 group-hover:w-16 transition-all duration-300"
              />

              {/* Bottom Botanical Sprig */}
              <svg
                viewBox="0 0 40 24"
                className="w-8 h-5 mt-2 rotate-180"
                aria-hidden="true"
              >
                <path
                  d="M20 20 V6 M20 14 C14 12 11 8 11 5 C15 6 18 9 20 14 Z M20 14 C26 12 29 8 29 5 C25 6 22 9 20 14 Z"
                  fill="#8E713F"
                  stroke="#8E713F"
                  strokeWidth="0.9"
                />
              </svg>
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
