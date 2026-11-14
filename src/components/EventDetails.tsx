import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { EVENT_DETAILS, EVENT_IMAGES } from '../constants/eventData';
import {
  BotanicalArtwork,
  CornerFiligree,
  OrnamentalDivider,
} from './OrnamentalMotifs';
import { HeartScratchCard } from './HeartScratchCard';
import { CalendarIntegration } from './CalendarIntegration';

interface EventDetailsProps {
  onContinue?: () => void;
}

export function EventDetails({ onContinue }: EventDetailsProps) {
  const [dateRevealed, setDateRevealed] = useState(false);

  return (
    <section
      id="celebration"
      aria-label="Scratch to Reveal Engagement Date and Time"
      className="relative w-full overflow-hidden bg-[#E7D8C5]/45 border-t border-b border-[#B99A62]/25 py-20 sm:py-28 px-4 sm:px-8"
    >
      {/* Subtle Floral Corner Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none hidden lg:block absolute top-10 right-6 w-52 h-52 opacity-55 mix-blend-multiply"
      >
        <BotanicalArtwork
          src={EVENT_IMAGES.floralCorner}
          alt="Watercolor floral ornament"
          className="w-full h-full object-contain"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none hidden lg:block absolute bottom-10 left-6 w-52 h-52 opacity-55 mix-blend-multiply rotate-180"
      >
        <BotanicalArtwork
          src={EVENT_IMAGES.floralCorner}
          alt="Watercolor floral ornament"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="font-sans text-xs uppercase tracking-[0.26em] text-[#8E713F]">
            Chapter 02 · Save The Date
          </p>
          <h2
            className="mt-3 font-display text-4xl sm:text-5xl md:text-[3.25rem] leading-[1.12] text-[#320A14]"
            style={{ textWrap: 'balance' }}
          >
            Join Us As We Begin Forever
          </h2>
          <OrnamentalDivider variant="heart" className="my-5" />
        </motion.div>

        {/* Simple Luxury Scratch-To-Reveal Editorial Folio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mt-10 border border-[#B99A62]/60 bg-[#F7F0E5] px-5 py-10 sm:px-12 sm:py-14 shadow-[0_20px_56px_rgba(24,60,50,0.06)] flex flex-col items-center text-center"
        >
          <CornerFiligree
            position="top-left"
            className="pointer-events-none absolute top-2 left-2 w-12 h-12"
          />
          <CornerFiligree
            position="top-right"
            className="pointer-events-none absolute top-2 right-2 w-12 h-12"
          />
          <CornerFiligree
            position="bottom-left"
            className="pointer-events-none absolute bottom-2 left-2 w-12 h-12"
          />
          <CornerFiligree
            position="bottom-right"
            className="pointer-events-none absolute bottom-2 right-2 w-12 h-12"
          />

          {/* Interactive Gold Heart Scratch Card */}
          <HeartScratchCard onRevealed={() => setDateRevealed(true)} />

          {/* Concise Ceremony & Calendar Details Revealed Cleanly */}
          <motion.div
            initial={false}
            animate={
              dateRevealed
                ? { opacity: 1, y: 0 }
                : { opacity: 0.85, y: 0 }
            }
            transition={{ duration: 0.5 }}
            className="mt-8 pt-8 border-t border-[#B99A62]/30 w-full max-w-lg"
          >
            <p className="font-sans text-xs uppercase tracking-[0.22em] text-[#8E713F]">
              {EVENT_DETAILS.eventTitle} · {EVENT_DETAILS.coupleDisplay}
            </p>
            <p className="mt-2 font-serif text-base sm:text-lg text-[#320A14]">
              {EVENT_DETAILS.venueName}
            </p>
            <p className="mt-1 font-serif text-sm text-[#320A14]/75">
              {EVENT_DETAILS.venueShortAddress}
            </p>

            <CalendarIntegration />
          </motion.div>
        </motion.div>

        {/* Natural Flow Cue to Countdown */}
        {onContinue && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex flex-col items-center gap-2 text-xs font-sans uppercase tracking-[0.22em] text-[#320A14]/75 hover:text-[#320A14] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B99A62]"
            >
              <span>
                {dateRevealed ? 'View Live Countdown' : 'Continue to Countdown'}
              </span>
              <ChevronDown className="w-4 h-4 text-[#B99A62]" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
