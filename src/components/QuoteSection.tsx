import { motion } from 'motion/react';
import { ROMANTIC_QUOTES } from '../constants/eventData';

export function QuoteSection() {
  return (
    <div
      aria-label="Romantic Reflections"
      className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[#B99A62]/30"
    >
      <div className="flex flex-col gap-10 sm:gap-12 max-w-3xl mx-auto">
        {ROMANTIC_QUOTES.map((quote, index) => {
          const isOffsetRight = index === 1;
          return (
            <motion.blockquote
              key={quote}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`relative flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6 py-5 border-b border-[#B99A62]/25 ${
                isOffsetRight ? 'sm:pl-14' : 'sm:pr-14'
              }`}
            >
              <span className="font-sans text-xs tracking-[0.22em] text-[#B99A62] tabular-nums shrink-0">
                0{index + 1}
              </span>
              <p className="font-display italic text-2xl sm:text-3xl leading-snug text-[#320A14]">
                &ldquo;{quote}&rdquo;
              </p>
            </motion.blockquote>
          );
        })}
      </div>
    </div>
  );
}
