import { useEffect, useMemo, useState } from 'react';

interface AmbientParticlesProps {
  variant?: 'gold' | 'petals' | 'mixed';
  density?: 'subtle' | 'celebration';
  className?: string;
}

interface ParticleSpec {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  kind: 'gold' | 'petal';
  opacity: number;
}

export function AmbientParticles({
  variant = 'gold',
  density = 'subtle',
  className = '',
}: AmbientParticlesProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 768px)');

    const syncPreferences = () => {
      setReducedMotion(motionQuery.matches);
      setIsMobile(mobileQuery.matches);
    };

    syncPreferences();
    motionQuery.addEventListener('change', syncPreferences);
    mobileQuery.addEventListener('change', syncPreferences);
    return () => {
      motionQuery.removeEventListener('change', syncPreferences);
      mobileQuery.removeEventListener('change', syncPreferences);
    };
  }, []);

  const particles = useMemo<ParticleSpec[]>(() => {
    const baseCount = density === 'celebration' ? 18 : 11;
    const count = isMobile ? Math.ceil(baseCount * 0.55) : baseCount;

    return Array.from({ length: count }, (_, i) => {
      const pseudoA = ((i * 37 + 13) % 97) / 97;
      const pseudoB = ((i * 53 + 29) % 89) / 89;
      const pseudoC = ((i * 71 + 7) % 83) / 83;

      const kind: 'gold' | 'petal' =
        variant === 'gold'
          ? 'gold'
          : variant === 'petals'
          ? 'petal'
          : i % 3 === 0
          ? 'petal'
          : 'gold';

      return {
        id: i,
        left: `${Math.round(4 + pseudoA * 92)}%`,
        top: `${Math.round(5 + pseudoB * 85)}%`,
        size: kind === 'petal' ? Math.round(9 + pseudoC * 6) : Math.round(3 + pseudoC * 4),
        duration: Math.round(9 + pseudoB * 9),
        delay: Number((pseudoA * 6).toFixed(2)),
        kind,
        opacity: kind === 'petal' ? 0.48 + pseudoC * 0.24 : 0.35 + pseudoC * 0.35,
      };
    });
  }, [density, isMobile, variant]);

  if (reducedMotion) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {particles.map((item) =>
        item.kind === 'petal' ? (
          <span
            key={item.id}
            style={{
              left: item.left,
              top: '-6%',
              width: `${item.size}px`,
              height: `${Math.round(item.size * 1.35)}px`,
              opacity: item.opacity,
              animation: `petalFall ${item.duration + 4}s linear ${item.delay}s infinite`,
              borderRadius: '65% 35% 70% 30% / 55% 45% 55% 45%',
              background:
                'linear-gradient(135deg, rgba(217,182,172,0.88), rgba(247,240,229,0.75))',
              boxShadow: '0 2px 6px rgba(185, 154, 98, 0.14)',
            }}
            className="absolute will-change-transform"
          />
        ) : (
          <span
            key={item.id}
            style={{
              left: item.left,
              top: item.top,
              width: `${item.size}px`,
              height: `${item.size}px`,
              opacity: item.opacity,
              animation: `floatSlow ${item.duration}s ease-in-out ${item.delay}s infinite`,
              background:
                'radial-gradient(circle, rgba(230,208,163,0.95) 0%, rgba(185,154,98,0.45) 60%, transparent 100%)',
            }}
            className="absolute rounded-full will-change-transform"
          />
        ),
      )}
    </div>
  );
}
