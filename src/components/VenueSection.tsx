import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Copy, ExternalLink, MapPin, Navigation } from 'lucide-react';
import {
  EVENT_DETAILS,
  buildGoogleMapsDirectionsUrl,
  buildGoogleMapsEmbedUrl,
} from '../constants/eventData';
import { CornerFiligree, OrnamentalDivider } from './OrnamentalMotifs';

export function VenueSection() {
  const [copied, setCopied] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(EVENT_DETAILS.venueFullWithTitle);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback ignored cleanly if clipboard permissions are restricted
    }
  };

  return (
    <section
      id="venue"
      aria-label="Venue and Map Directions"
      className="relative w-full bg-[#E7D8C5]/40 border-t border-[#B99A62]/30 py-20 sm:py-28 px-4 sm:px-8"
    >
      <div className="mx-auto max-w-5xl">
        {/* Heading & Warm Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="font-sans text-xs uppercase tracking-[0.26em] text-[#8E713F]">
            Chapter 04 · Venue &amp; Welcome
          </p>
          <h2
            className="mt-3 font-display text-4xl sm:text-5xl md:text-[3.25rem] leading-[1.12] text-[#320A14]"
            style={{ textWrap: 'balance' }}
          >
            Your Presence Makes Our Celebration Complete
          </h2>
          <OrnamentalDivider variant="lotus" className="my-5" />
          <p className="font-serif text-base sm:text-lg leading-relaxed text-[#320A14]/85">
            With hearts full of joy, we invite you to be part of our special
            beginning. Your blessings and presence will make this occasion even
            more beautiful.
          </p>
        </motion.div>

        {/* Balanced 2-Column Editorial Venue & Map Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left Column: Venue Details & Map Actions */}
          <div className="lg:col-span-5 relative border border-[#B99A62]/55 bg-[#F7F0E5] p-7 sm:p-10 flex flex-col justify-between shadow-[0_18px_48px_rgba(24,60,50,0.06)]">
            <CornerFiligree
              position="top-left"
              className="pointer-events-none absolute top-2 left-2 w-10 h-10"
            />
            <CornerFiligree
              position="bottom-right"
              className="pointer-events-none absolute bottom-2 right-2 w-10 h-10"
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.22em] text-[#8E713F]">
                <MapPin className="w-3.5 h-3.5 text-[#B99A62]" aria-hidden="true" />
                <span>Celebration Venue</span>
              </div>

              <h3 className="mt-4 font-display text-3xl sm:text-[2.1rem] leading-tight text-[#320A14]">
                {EVENT_DETAILS.venueName}
              </h3>

              <address className="mt-4 not-italic font-serif text-base leading-relaxed text-[#320A14]/85">
                Camp Road Junction,
                <br />
                Selaiyur, Chennai - 600073,
                <br />
                Tamil Nadu, India.
              </address>

              <div className="mt-6 pt-5 border-t border-[#B99A62]/25 flex items-center gap-2 text-xs font-sans uppercase tracking-[0.16em] text-[#320A14]/70">
                <span>{EVENT_DETAILS.dateDisplay}</span>
                <span aria-hidden="true">·</span>
                <span>{EVENT_DETAILS.timeDisplay}</span>
              </div>
            </div>

            {/* Functional Map & Copy Controls */}
            <div className="relative z-10 mt-8 flex flex-col gap-3">
              <a
                href={EVENT_DETAILS.googleMapsShortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#4A0E1B] text-[#F7F0E5] border border-[#B99A62] px-5 py-3.5 text-xs font-sans uppercase tracking-[0.18em] hover:bg-[#2E0710] shadow-[0_10px_24px_rgba(46,7,16,0.16)] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A62]"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#D6BD8D]" aria-hidden="true" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href={buildGoogleMapsDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 border border-[#B99A62] bg-transparent text-[#320A14] px-5 py-3.5 text-xs font-sans uppercase tracking-[0.18em] hover:bg-[#E7D8C5]/60 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A62]"
              >
                <Navigation className="w-3.5 h-3.5 text-[#8E713F]" aria-hidden="true" />
                <span>Get Directions</span>
              </a>

              <button
                type="button"
                onClick={handleCopyAddress}
                className="inline-flex items-center justify-center gap-2 py-2.5 text-xs font-sans uppercase tracking-[0.16em] text-[#320A14]/75 hover:text-[#320A14] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A62]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#320A14]" aria-hidden="true" />
                    <span>Venue Address Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#8E713F]" aria-hidden="true" />
                    <span>Copy Venue Address</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Google Maps Embed Frame */}
          <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] border border-[#B99A62]/55 bg-[#F7F0E5] p-2.5 shadow-[0_18px_48px_rgba(24,60,50,0.06)]">
            <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] bg-[#E7D8C5]/60 overflow-hidden">
              {!mapLoaded && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#F7F0E5]"
                >
                  <MapPin className="w-6 h-6 text-[#B99A62] mb-2" />
                  <p className="font-display italic text-xl text-[#320A14]">
                    {EVENT_DETAILS.venueName}
                  </p>
                  <p className="mt-1 font-serif text-sm text-[#320A14]/75">
                    {EVENT_DETAILS.venueFullAddress}
                  </p>
                </div>
              )}
              <iframe
                title={`Map of ${EVENT_DETAILS.venueName}`}
                src={buildGoogleMapsEmbedUrl()}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setMapLoaded(true)}
                className="relative z-10 w-full h-full min-h-[300px] sm:min-h-[400px] border-0"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
