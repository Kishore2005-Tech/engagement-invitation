import { motion } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import { EVENT_DETAILS } from '../constants/eventData';
import { AmbientParticles } from './AmbientParticles';
import {
  CornerFiligree,
  GoldHeartIcon,
  OrnamentalDivider,
} from './OrnamentalMotifs';

interface ClosingSectionProps {
  onReplayCover: () => void;
}

export function ClosingSection({ onReplayCover }: ClosingSectionProps) {
  return (
    <footer
      aria-label="Closing Blessing and Invitation Finale"
      className="relative w-full overflow-hidden text-[#F7F0E5] py-24 sm:py-32 px-4 sm:px-8"
      style={{
        background:
          'radial-gradient(ellipse at 50% 42%, #631626 0%, #4A0E1B 52%, #29060E 100%)',
      }}
    >
      {/* Subtle 3D Velvet Sheen & Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, rgba(214,189,141,0.09) 0%, transparent 60%)',
        }}
      />

      {/* Subtle Floating Gold Dust */}
      <AmbientParticles variant="gold" density="subtle" />

      {/* 3D Recessed Gold Double Frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 sm:inset-8 border border-[#D6BD8D]/50 shadow-[inset_0_0_50px_rgba(24,3,8,0.6)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-6 sm:inset-10 border border-[#B99A62]/25"
      />

      <CornerFiligree
        position="top-left"
        color="#D6BD8D"
        className="pointer-events-none absolute top-4 left-4 sm:top-8 sm:left-8 w-16 h-16 sm:w-24 sm:h-24"
      />
      <CornerFiligree
        position="top-right"
        color="#D6BD8D"
        className="pointer-events-none absolute top-4 right-4 sm:top-8 sm:right-8 w-16 h-16 sm:w-24 sm:h-24"
      />
      <CornerFiligree
        position="bottom-left"
        color="#D6BD8D"
        className="pointer-events-none absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-16 h-16 sm:w-24 sm:h-24"
      />
      <CornerFiligree
        position="bottom-right"
        color="#D6BD8D"
        className="pointer-events-none absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-16 h-16 sm:w-24 sm:h-24"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-2xl text-center py-6"
      >
        <p className="font-sans text-xs uppercase tracking-[0.28em] text-[#D6BD8D]">
          With Love &amp; Happiness
        </p>

        <OrnamentalDivider variant="lotus" color="#D6BD8D" className="my-6" />

        <h2 className="font-display italic font-medium text-4xl sm:text-6xl md:text-[4rem] leading-tight text-[#F7F0E5] inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <span>{EVENT_DETAILS.bride}</span>
          <GoldHeartIcon className="w-6 h-6 sm:w-8 sm:h-8 inline-block shrink-0" />
          <span>{EVENT_DETAILS.groom}</span>
        </h2>

        <p className="mt-5 font-sans text-sm sm:text-base tracking-[0.32em] text-[#D6BD8D] tabular-nums">
          {EVENT_DETAILS.dotDate}
        </p>

        <p className="mt-6 font-serif italic text-xl sm:text-2xl text-[#E7D8C5]">
          Forever Begins Here.
        </p>

        <div className="mt-12 pt-8 border-t border-[#B99A62]/30 flex flex-col items-center">
          <button
            type="button"
            onClick={onReplayCover}
            className="inline-flex items-center gap-2.5 border border-[#D6BD8D]/60 bg-[#2E0710]/55 px-5 py-2.5 text-xs font-sans uppercase tracking-[0.18em] text-[#F7F0E5] hover:bg-[#D6BD8D]/15 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6BD8D]"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#D6BD8D]" aria-hidden="true" />
            <span>Return To Invitation Cover</span>
          </button>
        </div>
      </motion.div>
    </footer>
  );
}
