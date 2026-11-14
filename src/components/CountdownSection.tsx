import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { EVENT_DETAILS } from '../constants/eventData';
import { OrnamentalDivider } from './OrnamentalMotifs';
import { CoupleSketchIllustration } from './CoupleSketchIllustration';
import { QuoteSection } from './QuoteSection';

interface CountdownState {
  status: 'upcoming' | 'celebrating' | 'remembered';
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_TIMESTAMP_MS = new Date(EVENT_DETAILS.targetIsoIST).getTime();
const CELEBRATION_WINDOW_MS = 6 * 60 * 60 * 1000;

function computeCountdown(): CountdownState {
  const now = Date.now();
  const diff = TARGET_TIMESTAMP_MS - now;

  if (diff > 0) {
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { status: 'upcoming', days, hours, minutes, seconds };
  }

  const elapsed = Math.abs(diff);
  if (elapsed <= CELEBRATION_WINDOW_MS) {
    return { status: 'celebrating', days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return { status: 'remembered', days: 0, hours: 0, minutes: 0, seconds: 0 };
}

function padTwo(val: number): string {
  return String(val).padStart(2, '0');
}

interface CountdownUnitProps {
  value: number;
  label: string;
}

function CountdownUnit({ value, label }: CountdownUnitProps) {
  const formatted = padTwo(value);
  return (
    <div className="flex flex-col items-center border border-[#B99A62]/55 bg-[#FBF7F0] px-3 py-5 sm:px-6 sm:py-8 shadow-[0_14px_34px_rgba(46,7,16,0.07)]">
      <div className="relative h-12 sm:h-16 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={formatted}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-medium text-4xl sm:text-5xl md:text-6xl leading-none text-[#320A14] tabular-nums"
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>
      <span aria-hidden="true" className="mt-3 h-px w-8 bg-[#B99A62]/50" />
      <span className="mt-2.5 font-sans text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#8E713F]">
        {label}
      </span>
    </div>
  );
}

export function CountdownSection() {
  const [countdown, setCountdown] = useState<CountdownState>(() => computeCountdown());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(computeCountdown());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="countdown"
      aria-label="Our Story and Live Engagement Countdown"
      className="relative w-full bg-[#F7F0E5] paper-grain py-20 sm:py-28 px-4 sm:px-8"
    >
      <div className="mx-auto max-w-4xl">
        {/* Editorial Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="font-sans text-xs uppercase tracking-[0.26em] text-[#8E713F]">
            Chapter 03 · Counting Down
          </p>
          <h2
            className="mt-3 font-display text-4xl sm:text-5xl md:text-[3.25rem] leading-[1.12] text-[#320A14]"
            style={{ textWrap: 'balance' }}
          >
            Counting Down To Forever
          </h2>
          <OrnamentalDivider variant="lotus" className="my-5" />
          <p className="font-serif text-base sm:text-lg leading-relaxed text-[#320A14]/80">
            Every beautiful story has a special beginning. Ours begins with a
            promise, a celebration, and a lifetime of togetherness.
          </p>
        </motion.div>

        {/* Live Countdown Display */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, delay: 0.12 }}
          className="mt-12 sm:mt-14"
        >
          {countdown.status === 'upcoming' && (
            <div
              role="timer"
              aria-live="off"
              aria-label={`${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes, ${countdown.seconds} seconds until the engagement ceremony`}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 max-w-3xl mx-auto"
            >
              <CountdownUnit value={countdown.days} label="Days" />
              <CountdownUnit value={countdown.hours} label="Hours" />
              <CountdownUnit value={countdown.minutes} label="Minutes" />
              <CountdownUnit value={countdown.seconds} label="Seconds" />
            </div>
          )}

          {countdown.status === 'celebrating' && (
            <div className="mx-auto max-w-2xl border border-[#B99A62]/60 bg-[#FBF7F0] px-6 py-10 text-center">
              <p className="font-display italic text-3xl sm:text-4xl gold-shimmer-text">
                The Celebration Begins!
              </p>
              <p className="mt-3 font-serif text-sm sm:text-base text-[#320A14]/80">
                Join us at {EVENT_DETAILS.venueName} as we celebrate Pavithra &amp; Monish.
              </p>
            </div>
          )}

          {countdown.status === 'remembered' && (
            <div className="mx-auto max-w-2xl border border-[#B99A62]/60 bg-[#FBF7F0] px-6 py-10 text-center">
              <p className="font-display italic text-3xl sm:text-4xl text-[#320A14]">
                A Beautiful Beginning, Forever Remembered
              </p>
              <p className="mt-3 font-serif text-sm sm:text-base text-[#320A14]/75">
                Thank you for blessing Pavithra &amp; Monish on {EVENT_DETAILS.shortDate}.
              </p>
            </div>
          )}
        </motion.div>

        {/* Scroll-Animated Humanized Couple Engagement Sketch Illustration */}
        <CoupleSketchIllustration />

        {/* Editorial Romantic Quotes */}
        <QuoteSection />
      </div>
    </section>
  );
}
