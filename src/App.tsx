import { useCallback, useEffect, useState } from 'react';
import { motion, MotionConfig } from 'motion/react';
import { SCENES, type SceneId } from './constants/eventData';
import { MusicProvider } from './context/MusicContext';
import {
  RoyalOpeningStage,
  type OpeningPhase,
} from './components/RoyalOpeningStage';
import { SceneNavigation } from './components/SceneNavigation';
import { EventDetails } from './components/EventDetails';
import { CountdownSection } from './components/CountdownSection';
import { VenueSection } from './components/VenueSection';
import { ClosingSection } from './components/ClosingSection';
import { SectionTransitionBridge } from './components/OrnamentalMotifs';

export default function App() {
  const [openingPhase, setOpeningPhase] = useState<OpeningPhase>('closed');
  const [activeScene, setActiveScene] = useState<SceneId>('couple');
  const [scrollProgress, setScrollProgress] = useState(0);

  const isOpened = openingPhase === 'opened';

  const handleStartOpen = useCallback(() => {
    setOpeningPhase('opening');
  }, []);

  const handleOpenComplete = useCallback(() => {
    setOpeningPhase('opened');
    setActiveScene('couple');
  }, []);

  const handleReplayCover = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setOpeningPhase('closed');
    setActiveScene('cover');
  }, []);

  const scrollToScene = useCallback((sceneId: SceneId) => {
    const el = document.getElementById(sceneId);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveScene(sceneId);
  }, []);

  useEffect(() => {
    if (!isOpened) return;

    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(window.scrollY / docHeight);
      }

      const sceneIds: SceneId[] = ['couple', 'celebration', 'countdown', 'venue'];
      const viewportAnchor = window.innerHeight * 0.35;
      for (let i = sceneIds.length - 1; i >= 0; i -= 1) {
        const el = document.getElementById(sceneIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportAnchor) {
            setActiveScene(sceneIds[i]);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpened]);

  // Keep SCENES referenced cleanly
  void SCENES;

  return (
    <MotionConfig reducedMotion="user">
      <MusicProvider>
        <div className="min-h-screen bg-[#F7F0E5] text-[#320A14]">
          {isOpened && (
            <SceneNavigation
              activeScene={activeScene}
              scrollProgress={scrollProgress}
              onSelectScene={scrollToScene}
              onReplayCover={handleReplayCover}
            />
          )}

          <main>
            <RoyalOpeningStage
              phase={openingPhase}
              onStartOpen={handleStartOpen}
              onOpenComplete={handleOpenComplete}
              onContinueToNext={() => scrollToScene('celebration')}
            />

            {isOpened && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionTransitionBridge />
                <EventDetails onContinue={() => scrollToScene('countdown')} />
                <SectionTransitionBridge />
                <CountdownSection />
                <SectionTransitionBridge />
                <VenueSection />
                <SectionTransitionBridge variant="toCrimson" />
              </motion.div>
            )}
          </main>

          {isOpened && <ClosingSection onReplayCover={handleReplayCover} />}
        </div>
      </MusicProvider>
    </MotionConfig>
  );
}
