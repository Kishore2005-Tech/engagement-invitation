import { motion } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import { EVENT_DETAILS } from '../constants/eventData';
import { AmbientParticles } from './AmbientParticles';
import {
  CornerFiligree,
  GoldHeartIcon,
  LuxuryFloralCluster,
  OrnamentalDivider,
} from './OrnamentalMotifs';

interface ClosingSectionProps {
  onReplayCover: () => void;
}

export function ClosingSection({ onReplayCover }: ClosingSectionProps) {
  return (
    <footer
      aria-label="Closing Blessing and Invitation Finale"
      className="relative w-full overflow-hidden text-[#F7F0E5] py-24 sm:py-36 px-4 sm:px-8"
      style={{
        background:
          'radial-gradient(ellipse at 50% 45%, #631626 0%, #4A0E1B 52%, #24040B 100%)',
      }}
    >
      {/* Ambient Warm Candlelight Bokeh Orbs behind Smoked Glass */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-35"
        style={{
          background:
            'radial-gradient(circle, rgba(214,189,141,0.55) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-30"
        style={{
          background:
            'radial-gradient(circle, rgba(217,182,172,0.5) 0%, transparent 70%)',
        }}
      />

      {/* Subtle Floating Gold Dust */}
      <AmbientParticles variant="gold" density="celebration" />

      {/* Outer Gold Filigree Frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 sm:inset-7 border border-[#D6BD8D]/35"
      />

      {/* Luxury Floral Corner Clusters */}
      <LuxuryFloralCluster className="pointer-events-none absolute -top-2 -left-2 w-40 h-40 sm:w-60 sm:h-60 opacity-85 drop-shadow-[0_12px_28px_rgba(16,2,5,0.45)]" />
      <LuxuryFloralCluster
        mirrorX
        className="pointer-events-none absolute -top-2 -right-2 w-40 h-40 sm:w-60 sm:h-60 opacity-85 drop-shadow-[0_12px_28px_rgba(16,2,5,0.45)]"
      />
      <LuxuryFloralCluster
        mirrorY
        className="pointer-events-none absolute -bottom-2 -left-2 w-40 h-40 sm:w-60 sm:h-60 opacity-85 drop-shadow-[0_12px_28px_rgba(16,2,5,0.45)]"
      />
      <LuxuryFloralCluster
        mirrorX
        mirrorY
        className="pointer-events-none absolute -bottom-2 -right-2 w-40 h-40 sm:w-60 sm:h-60 opacity-85 drop-shadow-[0_12px_28px_rgba(16,2,5,0.45)]"
      />

      {/* Centerpiece Smoked-Crystal Luxury Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-2xl"
      >
        <div
          className="relative overflow-hidden backdrop-blur-xl bg-[#2E0710]/48 border border-[#D6BD8D]/45 px-6 py-12 sm:px-14 sm:py-16 text-center shadow-[0_36px_90px_rgba(12,2,4,0.65),inset_0_1px_1px_rgba(247,240,229,0.22)]"
        >
          {/* Specular Crystal Glass Sheen Overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(125deg, rgba(247,240,229,0.14) 0%, rgba(247,240,229,0.03) 36%, transparent 62%)',
            }}
          />

          {/* Inner Recessed Gold Hairline Frame */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 border border-[#D6BD8D]/25"
          />

          <CornerFiligree
            position="top-left"
            color="#D6BD8D"
            className="pointer-events-none absolute top-3 left-3 w-10 h-10 sm:w-14 sm:h-14 opacity-80"
          />
          <CornerFiligree
            position="top-right"
            color="#D6BD8D"
            className="pointer-events-none absolute top-3 right-3 w-10 h-10 sm:w-14 sm:h-14 opacity-80"
          />
          <CornerFiligree
            position="bottom-left"
            color="#D6BD8D"
            className="pointer-events-none absolute bottom-3 left-3 w-10 h-10 sm:w-14 sm:h-14 opacity-80"
          />
          <CornerFiligree
            position="bottom-right"
            color="#D6BD8D"
            className="pointer-events-none absolute bottom-3 right-3 w-10 h-10 sm:w-14 sm:h-14 opacity-80"
          />

          <div className="relative z-10 flex flex-col items-center">
            <p className="font-sans text-xs uppercase tracking-[0.28em] text-[#D6BD8D]">
              With Love &amp; Happiness
            </p>

            <OrnamentalDivider variant="lotus" color="#D6BD8D" className="my-6" />

            <h2 className="font-display italic font-medium text-4xl sm:text-6xl md:text-[3.85rem] leading-tight text-[#F7F0E5] inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 drop-shadow-[0_4px_18px_rgba(12,2,4,0.45)]">
              <span>{EVENT_DETAILS.bride}</span>
              <GoldHeartIcon className="w-6 h-6 sm:w-8 sm:h-8 inline-block shrink-0" />
              <span>{EVENT_DETAILS.groom}</span>
            </h2>

            {/* Recessed Frosted Glass Date Crest */}
            <div className="mt-7 inline-flex items-center justify-center border border-[#D6BD8D]/40 bg-[#F7F0E5]/8 backdrop-blur-md px-6 py-2.5 shadow-[inset_0_1px_0_rgba(247,240,229,0.16)]">
              <span className="font-sans text-sm sm:text-base tracking-[0.34em] text-[#E6CE9D] tabular-nums">
                {EVENT_DETAILS.dotDate}
              </span>
            </div>

            <p className="mt-7 font-serif italic text-xl sm:text-2xl text-[#E7D8C5]">
              Forever Begins Here.
            </p>

            <div className="mt-10 pt-8 border-t border-[#D6BD8D]/25 w-full flex flex-col items-center">
              <button
                type="button"
                onClick={onReplayCover}
                className="inline-flex items-center gap-2.5 border border-[#D6BD8D]/55 bg-[#F7F0E5]/10 backdrop-blur-md px-6 py-3 text-xs font-sans uppercase tracking-[0.18em] text-[#F7F0E5] hover:bg-[#D6BD8D]/20 shadow-[0_10px_28px_rgba(12,2,4,0.35),inset_0_1px_0_rgba(247,240,229,0.2)] transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6BD8D]"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#D6BD8D]" aria-hidden="true" />
                <span>Return To Invitation Cover</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
