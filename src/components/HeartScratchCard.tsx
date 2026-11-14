import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { EVENT_DETAILS } from '../constants/eventData';

interface HeartScratchCardProps {
  onRevealed?: () => void;
}

// Normalized heart clip path (0..1) for crisp canvas masking
const HEART_PATH_DATA =
  'M 0.5,0.92 C 0.5,0.92 0.04,0.63 0.04,0.31 C 0.04,0.13 0.19,0.03 0.34,0.03 C 0.43,0.03 0.48,0.08 0.5,0.14 C 0.52,0.08 0.57,0.03 0.66,0.03 C 0.81,0.03 0.96,0.13 0.96,0.31 C 0.96,0.63 0.5,0.92 0.5,0.92 Z';

export function HeartScratchCard({ onRevealed }: HeartScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const scratchMoveCountRef = useRef(0);

  const [isRevealed, setIsRevealed] = useState(false);

  const paintFoilLayer = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);

    // Rich brushed antique gold foil metallic gradient
    const foilGrad = ctx.createLinearGradient(0, 0, width, height);
    foilGrad.addColorStop(0, '#967741');
    foilGrad.addColorStop(0.28, '#D8BF8E');
    foilGrad.addColorStop(0.52, '#B99A62');
    foilGrad.addColorStop(0.76, '#E4CDA0');
    foilGrad.addColorStop(1, '#8D6F3B');

    ctx.fillStyle = foilGrad;
    ctx.fillRect(0, 0, width, height);

    // Fine diagonal metallic foil sheen lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.lineWidth = 1;
    for (let i = -height; i < width + height; i += 7) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i - height * 0.45, height);
      ctx.stroke();
    }

    // Subtle deep crimson inner heart hairline
    ctx.strokeStyle = 'rgba(74, 14, 27, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.46, width * 0.23, 0, Math.PI * 2);
    ctx.stroke();

    // Crisp foil invitation prompt text
    ctx.fillStyle = '#4A0E1B';
    ctx.textAlign = 'center';
    ctx.font = 'italic 600 22px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('Scratch Gently', width * 0.5, height * 0.44);

    ctx.font = '500 11px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillStyle = 'rgba(74, 14, 27, 0.85)';
    ctx.fillText('TO REVEAL DATE & TIME', width * 0.5, height * 0.53);
  }, []);

  useEffect(() => {
    paintFoilLayer();
  }, [paintFoilLayer]);

  const checkScratchProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const { width, height } = canvas;
    const imageData = ctx.getImageData(0, 0, width, height).data;

    let transparentSamples = 0;
    let totalCenterSamples = 0;

    // Sample core inner heart region (x: 20%..80%, y: 18%..78%) for accurate completion
    const startX = Math.floor(width * 0.2);
    const endX = Math.floor(width * 0.8);
    const startY = Math.floor(height * 0.18);
    const endY = Math.floor(height * 0.78);

    for (let y = startY; y < endY; y += 6) {
      for (let x = startX; x < endX; x += 6) {
        const alpha = imageData[(y * width + x) * 4 + 3];
        totalCenterSamples += 1;
        if (alpha < 40) {
          transparentSamples += 1;
        }
      }
    }

    if (totalCenterSamples > 0 && transparentSamples / totalCenterSamples >= 0.44) {
      setIsRevealed(true);
      onRevealed?.();
    }
  }, [isRevealed, onRevealed]);

  const getLocalPoint = (
    e: React.PointerEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement,
  ) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const eraseStroke = (
    ctx: CanvasRenderingContext2D,
    from: { x: number; y: number },
    to: { x: number; y: number },
  ) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.hypot(dx, dy);
    const steps = Math.max(1, Math.ceil(distance / 5));
    const brushRadius = 24;

    ctx.globalCompositeOperation = 'destination-out';
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const cx = from.x + dx * t;
      const cy = from.y + dy * t;
      ctx.beginPath();
      ctx.arc(cx, cy, brushRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    canvas.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    const pt = getLocalPoint(e, canvas);
    lastPointRef.current = pt;
    eraseStroke(ctx, pt, pt);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const pt = getLocalPoint(e, canvas);
    const prev = lastPointRef.current ?? pt;
    eraseStroke(ctx, prev, pt);
    lastPointRef.current = pt;

    scratchMoveCountRef.current += 1;
    if (scratchMoveCountRef.current % 8 === 0) {
      checkScratchProgress();
    }
  };

  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    checkScratchProgress();
  };

  const handleInstantReveal = () => {
    setIsRevealed(true);
    onRevealed?.();
  };

  const handleResetScratch = () => {
    scratchMoveCountRef.current = 0;
    setIsRevealed(false);
    window.requestAnimationFrame(() => {
      paintFoilLayer();
    });
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hidden SVG Heart ClipPath definition */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="royal-heart-clip" clipPathUnits="objectBoundingBox">
            <path d={HEART_PATH_DATA} />
          </clipPath>
        </defs>
      </svg>

      {/* Heart Container */}
      <div className="relative w-[290px] h-[270px] sm:w-[348px] sm:h-[322px] select-none">
        {/* Delicate Outer Gold Heart Silhouette Border */}
        <svg
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] z-30"
        >
          <path
            d={HEART_PATH_DATA}
            fill="none"
            stroke="#B99A62"
            strokeWidth="0.008"
            strokeOpacity="0.85"
          />
        </svg>

        {/* Clipped Heart Surface */}
        <div
          className="relative w-full h-full bg-[#F7F0E5] shadow-[0_20px_50px_rgba(24,60,50,0.14)]"
          style={{ clipPath: 'url(#royal-heart-clip)' }}
        >
          {/* Underlying Revealed Date, Day & Time */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-8 pt-6 pb-8 text-center"
            style={{
              background:
                'radial-gradient(circle at 50% 45%, #FBF7F0 0%, #F7F0E5 62%, #E7D8C5 100%)',
            }}
          >
            <p className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.26em] text-[#8E713F]">
              Monday
            </p>

            <p className="mt-1 font-display italic font-semibold text-5xl sm:text-6xl leading-none text-[#320A14] tabular-nums">
              16
            </p>

            <p className="mt-1 font-display text-2xl sm:text-[1.75rem] font-medium text-[#320A14]">
              November 2026
            </p>

            <span
              aria-hidden="true"
              className="my-3 h-px w-14 bg-[#B99A62]/70"
            />

            <p className="font-serif italic text-base sm:text-lg text-[#320A14]">
              {EVENT_DETAILS.timeDisplay}
            </p>

            <p className="mt-0.5 font-sans text-[10px] uppercase tracking-[0.22em] text-[#8E713F]">
              {EVENT_DETAILS.timezoneAbbr}
            </p>
          </div>

          {/* Interactive Gold Foil Scratch Canvas */}
          <motion.canvas
            ref={canvasRef}
            width={348}
            height={322}
            animate={{ opacity: isRevealed ? 0 : 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            aria-label="Scratchable gold heart foil covering the engagement date and time"
            className={`absolute inset-0 z-20 w-full h-full touch-none ${
              isRevealed ? 'pointer-events-none' : 'cursor-grab active:cursor-grabbing'
            }`}
          />
        </div>
      </div>

      {/* Accessible Helper / Reveal & Reset Actions */}
      <div className="mt-6 flex flex-col items-center gap-2 text-center">
        {!isRevealed ? (
          <>
            <p className="font-serif italic text-sm text-[#320A14]/75">
              Rub gently across the gold heart to reveal our auspicious date &amp; time
            </p>
            <button
              type="button"
              onClick={handleInstantReveal}
              className="mt-1 inline-flex items-center gap-2 px-4 py-2 text-xs font-sans uppercase tracking-[0.18em] text-[#8E713F] hover:text-[#320A14] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A62]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B99A62]" aria-hidden="true" />
              <span>Tap to Reveal</span>
            </button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <button
              type="button"
              onClick={handleResetScratch}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-sans uppercase tracking-[0.16em] text-[#8E713F] hover:text-[#320A14] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A62]"
            >
              <RotateCcw className="w-3 h-3" aria-hidden="true" />
              <span>Scratch Again</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
