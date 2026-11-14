import { Volume2, VolumeX } from 'lucide-react';
import { MEDLEY_TRACKS, useMusic } from '../context/MusicContext';

interface MusicControllerProps {
  compact?: boolean;
  variant?: 'light' | 'dark';
}

export function MusicController({
  compact = false,
  variant = 'light',
}: MusicControllerProps) {
  const { isPlaying, isSupported, currentMovement, toggleMusic } = useMusic();

  if (!isSupported) {
    return null;
  }

  const activeTrack =
    MEDLEY_TRACKS.find((t) => t.id === currentMovement) ?? MEDLEY_TRACKS[0];

  const baseColorClasses =
    variant === 'dark'
      ? 'border-[#B99A62]/45 text-[#F7F0E5] hover:bg-[#B99A62]/15'
      : 'border-[#B99A62]/50 text-[#320A14] hover:bg-[#E7D8C5]/55';

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-pressed={isPlaying}
      aria-label={
        isPlaying
          ? `Pause medley (currently playing ${activeTrack.label} theme)`
          : 'Play wedding mashup medley: Perfect, Arabic Kuthu, and Mannipaaya'
      }
      className={`inline-flex items-center gap-2 border px-3.5 py-2 text-xs font-sans tracking-[0.14em] uppercase transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A62] ${baseColorClasses}`}
    >
      {isPlaying ? (
        <Volume2 className="w-3.5 h-3.5 text-[#B99A62] shrink-0" aria-hidden="true" />
      ) : (
        <VolumeX className="w-3.5 h-3.5 text-[#B99A62] shrink-0" aria-hidden="true" />
      )}
      {!compact && (
        <span className="max-w-[170px] truncate">
          {isPlaying ? `Mix · ${activeTrack.label}` : 'Play Mix'}
        </span>
      )}
    </button>
  );
}
