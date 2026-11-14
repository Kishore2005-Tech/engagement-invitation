import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { OrnamentalDivider } from './OrnamentalMotifs';

export function CoupleSketchIllustration() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 88%', 'center 45%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 22,
    restDelta: 0.001,
  });

  // Staggered scroll-driven drawing stages
  const archPath = useTransform(smoothProgress, [0, 0.38], [0, 1]);
  const groomPath = useTransform(smoothProgress, [0.12, 0.58], [0, 1]);
  const bridePath = useTransform(smoothProgress, [0.22, 0.68], [0, 1]);
  const detailPath = useTransform(smoothProgress, [0.45, 0.88], [0, 1]);
  const handsAndRingPath = useTransform(smoothProgress, [0.62, 0.96], [0, 1]);
  const watercolorOpacity = useTransform(smoothProgress, [0.68, 1], [0, 1]);
  const cardLiftY = useTransform(smoothProgress, [0, 1], [24, 0]);
  const cardRotateX = useTransform(smoothProgress, [0, 1], [5, 0]);

  return (
    <div
      ref={containerRef}
      className="my-14 sm:my-20 mx-auto max-w-3xl"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : { y: cardLiftY, rotateX: cardRotateX }
        }
        className="relative border border-[#B99A62]/60 bg-[#FBF7F0] p-6 sm:p-12 shadow-[0_28px_72px_rgba(46,7,16,0.12)]"
      >
        {/* Subtle 3D Paper Bevel Inner Border */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 border border-[#4A0E1B]/12"
        />

        <div className="relative z-10 text-center mb-6 sm:mb-8">
          <p className="font-sans text-[11px] uppercase tracking-[0.26em] text-[#8E713F]">
            Hand-Sketched Memory
          </p>
          <h3 className="mt-2 font-display italic text-2xl sm:text-3xl text-[#320A14]">
            The Promise In Fine Ink
          </h3>
        </div>

        {/* Humanized Hand-Drawn Couple Engagement Sketch SVG */}
        <div className="relative mx-auto w-full max-w-[460px] aspect-[4/4.3]">
          {/* Soft Layered Blush & Gold Watercolor Wash (Blooms as Sketch Finishes) */}
          <motion.div
            aria-hidden="true"
            style={{ opacity: shouldReduceMotion ? 1 : watercolorOpacity }}
            className="pointer-events-none absolute inset-6 rounded-full blur-2xl"
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 50% 45%, rgba(217,182,172,0.34) 0%, rgba(185,154,98,0.16) 45%, transparent 75%)',
              }}
            />
          </motion.div>

          <svg
            viewBox="0 0 420 450"
            fill="none"
            role="img"
            aria-label="Hand-sketched engagement illustration of a bride and groom exchanging rings beneath a floral arch"
            className="relative z-10 w-full h-full overflow-visible"
          >
            {/* 1. Sketched Royal Mandap Archway & Florals */}
            <motion.path
              d="M42 408 V166 C42 94 115 44 210 44 C305 44 378 94 378 166 V408"
              stroke="#B99A62"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ pathLength: shouldReduceMotion ? 1 : archPath }}
            />
            <motion.path
              d="M54 408 V170 C54 106 122 58 210 58 C298 58 366 106 366 170 V408"
              stroke="#B99A62"
              strokeOpacity="0.5"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeDasharray="3 5"
              style={{ pathLength: shouldReduceMotion ? 1 : archPath }}
            />
            {/* Arch Top Hanging Jasmine Garland */}
            <motion.path
              d="M126 76 C154 102 182 108 210 86 C238 108 266 102 294 76"
              stroke="#B99A62"
              strokeWidth="1.2"
              strokeLinecap="round"
              style={{ pathLength: shouldReduceMotion ? 1 : archPath }}
            />

            {/* 2. Groom (Left) — Expressive Humanized Charcoal-Wine Ink Sketch */}
            {/* Groom Head, Hair & Warm Profile Looking Right */}
            <motion.path
              d="M148 118 C136 116 124 124 123 138 C122 148 128 156 132 162 C134 171 140 179 150 180 C162 181 171 171 173 160 C177 156 178 151 175 147 C177 143 175 137 172 134 C172 122 161 116 148 118 Z"
              stroke="#320A14"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: shouldReduceMotion ? 1 : groomPath }}
            />
            {/* Groom Hair Sketch Strokes */}
            <motion.path
              d="M124 137 C124 120 142 110 160 114 C172 117 177 126 174 135 M133 122 C143 116 157 117 166 123 M128 130 C138 125 149 125 159 130"
              stroke="#320A14"
              strokeWidth="1.35"
              strokeLinecap="round"
              style={{ pathLength: shouldReduceMotion ? 1 : groomPath }}
            />
            {/* Groom Sherwani Collar, Shoulders & Torso */}
            <motion.path
              d="M136 178 L138 192 C116 198 98 212 94 236 L86 308 L112 314 L116 392 M162 178 L164 191 C178 195 190 204 195 218 L208 258 M168 254 L172 392"
              stroke="#320A14"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: shouldReduceMotion ? 1 : groomPath }}
            />
            {/* Groom Sherwani Mandarin Collar & Placket */}
            <motion.path
              d="M138 192 C146 198 156 198 164 191 M151 197 V296 M146 218 H151 M146 236 H151 M146 254 H151"
              stroke="#4A0E1B"
              strokeWidth="1.3"
              strokeLinecap="round"
              style={{ pathLength: shouldReduceMotion ? 1 : detailPath }}
            />
            {/* Groom Sherwani Pocket Square & Fold Lines */}
            <motion.path
              d="M122 226 L136 226 L133 218 L125 220 Z M118 286 C132 292 150 293 166 289 M114 334 C132 337 152 337 170 334"
              stroke="#B99A62"
              strokeWidth="1.15"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: shouldReduceMotion ? 1 : detailPath }}
            />

            {/* 3. Bride (Right) — Graceful Saree/Lehenga & Floral Gajra Ink Sketch */}
            {/* Bride Head, Profile & Braided Floral Bun */}
            <motion.path
              d="M272 132 C260 132 252 141 251 153 C248 157 248 161 251 164 C253 175 262 184 273 184 C284 184 292 175 294 163 C296 147 288 132 272 132 Z"
              stroke="#320A14"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: shouldReduceMotion ? 1 : bridePath }}
            />
            {/* Bride Hair & Traditional Jasmine Gajra Bun */}
            <motion.path
              d="M254 143 C263 134 281 134 291 146 C303 148 310 158 307 170 C304 180 293 184 285 180"
              stroke="#320A14"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ pathLength: shouldReduceMotion ? 1 : bridePath }}
            />
            <motion.path
              d="M293 148 C299 152 302 158 300 166 C298 172 293 176 287 177"
              stroke="#B99A62"
              strokeWidth="1.6"
              strokeDasharray="2 4"
              strokeLinecap="round"
              style={{ pathLength: shouldReduceMotion ? 1 : detailPath }}
            />
            {/* Bride Maang Tikka, Jhumka & Necklace */}
            <motion.path
              d="M258 139 L253 146 M280 166 C280 172 276 177 273 177 M261 196 C268 205 280 205 287 196"
              stroke="#B99A62"
              strokeWidth="1.25"
              strokeLinecap="round"
              style={{ pathLength: shouldReduceMotion ? 1 : detailPath }}
            />
            {/* Bride Blouse, Flowing Saree Drape & Pleated Skirt */}
            <motion.path
              d="M262 185 L260 198 C246 203 236 214 232 232 L218 260 M286 184 L288 198 C306 204 319 220 323 244 L334 392 M242 268 L224 392"
              stroke="#320A14"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: shouldReduceMotion ? 1 : bridePath }}
            />
            {/* Saree Pallu Diagonal Fold & Flowing Pleats */}
            <motion.path
              d="M252 204 C266 226 284 252 316 276 M246 218 C262 242 284 266 320 294 M254 294 L244 390 M274 296 L272 392 M294 296 L304 392"
              stroke="#4A0E1B"
              strokeWidth="1.25"
              strokeLinecap="round"
              style={{ pathLength: shouldReduceMotion ? 1 : detailPath }}
            />
            {/* Zari Gold Saree Hem Border */}
            <motion.path
              d="M224 384 C260 390 298 390 334 384 M224 392 C260 398 298 398 334 392"
              stroke="#B99A62"
              strokeWidth="1.35"
              strokeLinecap="round"
              style={{ pathLength: shouldReduceMotion ? 1 : detailPath }}
            />

            {/* 4. Center Joined Hands & Ring Exchange Moment */}
            <motion.path
              d="M196 254 C203 262 212 265 218 260 C222 256 225 259 221 266 C216 274 205 276 196 270 L176 264"
              stroke="#320A14"
              strokeWidth="1.65"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: shouldReduceMotion ? 1 : handsAndRingPath }}
            />
            {/* Bride Bangles */}
            <motion.path
              d="M224 252 L229 258 M228 249 L233 255"
              stroke="#B99A62"
              strokeWidth="1.35"
              strokeLinecap="round"
              style={{ pathLength: shouldReduceMotion ? 1 : handsAndRingPath }}
            />
            {/* Engagement Ring & Radiating Gold Sketch Spark */}
            <motion.circle
              cx="213"
              cy="255"
              r="3.2"
              stroke="#B99A62"
              strokeWidth="1.4"
              style={{ pathLength: shouldReduceMotion ? 1 : handsAndRingPath }}
            />
            <motion.path
              d="M213 245 V240 M213 270 V265 M203 255 H198 M228 255 H223 M206 248 L202 244 M220 248 L224 244"
              stroke="#B99A62"
              strokeWidth="1.2"
              strokeLinecap="round"
              style={{ pathLength: shouldReduceMotion ? 1 : handsAndRingPath }}
            />

            {/* 5. Grounding Line & Corner Hand-Sketched Roses */}
            <motion.path
              d="M66 408 H354"
              stroke="#320A14"
              strokeOpacity="0.45"
              strokeWidth="1.2"
              strokeLinecap="round"
              style={{ pathLength: shouldReduceMotion ? 1 : detailPath }}
            />
            <motion.path
              d="M74 406 C64 392 66 376 78 370 C88 376 92 392 80 406 M346 406 C356 392 354 376 342 370 C332 376 328 392 340 406"
              stroke="#B99A62"
              strokeWidth="1.2"
              strokeLinecap="round"
              style={{ pathLength: shouldReduceMotion ? 1 : handsAndRingPath }}
            />
          </svg>
        </div>

        <OrnamentalDivider variant="heart" className="mt-2 mb-3" />
        <p className="text-center font-serif italic text-sm text-[#320A14]/75">
          Two souls united in timeless grace — Pavithra &amp; Monish
        </p>
      </motion.div>
    </div>
  );
}
