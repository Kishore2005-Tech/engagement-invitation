import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SCENES, type SceneId } from '../constants/eventData';
import { MusicController } from './MusicController';

interface SceneNavigationProps {
  activeScene: SceneId;
  scrollProgress: number;
  onSelectScene: (sceneId: SceneId) => void;
  onReplayCover: () => void;
}

export function SceneNavigation({
  activeScene,
  scrollProgress,
  onSelectScene,
  onReplayCover,
}: SceneNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (sceneId: SceneId) => {
    setMobileMenuOpen(false);
    if (sceneId === 'cover') {
      onReplayCover();
      return;
    }
    onSelectScene(sceneId);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          isScrolled
            ? 'bg-[#F7F0E5]/92 backdrop-blur-md border-b border-[#B99A62]/30 shadow-[0_4px_24px_rgba(24,60,50,0.06)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between gap-4 sm:gap-8 px-4 sm:px-8">
          {/* Zone 1: Single-line Wordmark */}
          <a
            href="#couple"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('couple');
            }}
            aria-label="Pavithra and Monish Engagement"
            className="font-display italic text-xl sm:text-2xl font-medium tracking-wider text-[#320A14] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B99A62]"
          >
            P &amp; M
          </a>

          {/* Zone 2: Concise single-line scene links */}
          <nav
            aria-label="Invitation scenes"
            className="hidden md:flex items-center gap-7"
          >
            {SCENES.map((scene) => {
              const isActive = activeScene === scene.id;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => handleLinkClick(scene.id)}
                  className={`relative py-1 text-xs font-sans uppercase tracking-[0.18em] transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B99A62] ${
                    isActive
                      ? 'text-[#320A14] font-semibold'
                      : 'text-[#320A14]/65 hover:text-[#320A14]'
                  }`}
                >
                  {scene.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-0 -bottom-0.5 h-px bg-[#B99A62]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action (Music Toggle + Mobile Menu Toggle) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="hidden sm:block">
              <MusicController />
            </div>
            <div className="sm:hidden">
              <MusicController compact />
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 border border-[#B99A62]/45 text-[#320A14] hover:bg-[#E7D8C5]/50 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A62]"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Menu className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Thin gold reading progress hairline */}
        <div
          className="h-[2px] w-full bg-[#B99A62]/15 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="h-full bg-[#B99A62] transition-transform duration-150 origin-left"
            style={{ transform: `scaleX(${Math.min(1, Math.max(0, scrollProgress))})` }}
          />
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile scene navigation"
          className="fixed inset-0 z-50 bg-[#4A0E1B] text-[#F7F0E5] flex flex-col justify-between p-6 md:hidden"
        >
          <div className="flex items-center justify-between border-b border-[#B99A62]/30 pb-4">
            <span className="font-display italic text-2xl tracking-wider text-[#F7F0E5]">
              P &amp; M
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="w-11 h-11 inline-flex items-center justify-center border border-[#B99A62]/45 text-[#F7F0E5] cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-col gap-5 my-auto" aria-label="Mobile scenes">
            {SCENES.map((scene) => {
              const isActive = activeScene === scene.id;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => handleLinkClick(scene.id)}
                  className={`flex items-baseline gap-4 text-left py-2 border-b border-[#B99A62]/15 cursor-pointer transition-colors ${
                    isActive ? 'text-[#D6BD8D]' : 'text-[#F7F0E5]/85 hover:text-[#D6BD8D]'
                  }`}
                >
                  <span className="font-sans text-xs tracking-[0.2em] text-[#B99A62]">
                    {scene.index}
                  </span>
                  <span className="font-display text-3xl italic">{scene.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#B99A62]/25 text-xs font-sans tracking-[0.18em] uppercase text-[#E7D8C5]/75">
            <span>Engagement Invitation</span>
          </div>
        </div>
      )}

      {/* Subtle Desktop Side Numeral Chapter Rail */}
      <aside
        aria-label="Scene index"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-end gap-3"
      >
        {SCENES.map((scene) => {
          const isActive = activeScene === scene.id;
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => handleLinkClick(scene.id)}
              aria-label={`Go to Scene ${scene.index}: ${scene.label}`}
              className={`group flex items-center gap-2.5 py-0.5 cursor-pointer transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A62] ${
                isActive ? 'text-[#4A0E1B]' : 'text-[#4A0E1B]/40 hover:text-[#4A0E1B]/80'
              }`}
            >
              <span
                className={`text-[10px] font-sans uppercase tracking-[0.2em] transition-opacity duration-200 ${
                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                {scene.label}
              </span>
              <span className="text-[11px] font-sans tabular-nums tracking-[0.14em]">
                {scene.index}
              </span>
              <span
                aria-hidden="true"
                className={`h-px transition-all duration-200 bg-[#B99A62] ${
                  isActive ? 'w-6 opacity-100' : 'w-2.5 opacity-40 group-hover:w-4'
                }`}
              />
            </button>
          );
        })}
      </aside>
    </>
  );
}
