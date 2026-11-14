import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CalendarPlus, Check, Download } from 'lucide-react';
import {
  buildGoogleCalendarUrl,
  downloadIcsInvitation,
} from '../constants/eventData';

export function CalendarIntegration() {
  const [isOpen, setIsOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadIcs = () => {
    downloadIcsInvitation(2);
    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 3500);
  };

  return (
    <div className="mt-10 sm:mt-12 flex flex-col items-center">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="inline-flex items-center gap-3 bg-[#4A0E1B] text-[#F7F0E5] border border-[#B99A62] px-7 py-3.5 text-xs sm:text-[13px] font-sans uppercase tracking-[0.2em] hover:bg-[#2E0710] shadow-[0_10px_26px_rgba(46,7,16,0.18)] transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B99A62]"
      >
        <CalendarPlus className="w-4 h-4 text-[#D6BD8D]" aria-hidden="true" />
        <span>Save The Date</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 w-full max-w-lg border border-[#B99A62]/50 bg-[#F7F0E5] p-5 sm:p-6 text-center shadow-[0_14px_38px_rgba(24,60,50,0.08)]"
          >
            <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#8E713F]">
              Choose Your Calendar
            </p>
            <p className="mt-1.5 font-serif text-sm text-[#320A14]/80">
              Engagement Ceremony · Nov 16, 2026 · 6:30 PM IST
            </p>

            <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <a
                href={buildGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[#4A0E1B] bg-[#4A0E1B] text-[#F7F0E5] px-5 py-3 text-xs font-sans uppercase tracking-[0.15em] hover:bg-[#2E0710] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A62]"
              >
                <CalendarPlus className="w-3.5 h-3.5 text-[#D6BD8D]" aria-hidden="true" />
                <span>Add to Google Calendar</span>
              </a>

              <button
                type="button"
                onClick={handleDownloadIcs}
                className="inline-flex items-center justify-center gap-2 border border-[#B99A62] bg-transparent text-[#320A14] px-5 py-3 text-xs font-sans uppercase tracking-[0.15em] hover:bg-[#E7D8C5]/60 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A62]"
              >
                {downloaded ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#4A0E1B]" aria-hidden="true" />
                    <span>Invitation Saved (.ics)</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-[#8E713F]" aria-hidden="true" />
                    <span>Download Calendar (.ics)</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
