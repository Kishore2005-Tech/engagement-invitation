import { VolumeX } from 'lucide-react';
import { MEDLEY_TRACKS, useMusic } from '../context/MusicContext';

interface MusicControllerProps {
  compact?: boolean;
  variant?: 'light' | 'dark';
}

function GoldEqualizerBars({ colorClass }: { colorClass: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-end justify-center gap-[2.5px] w-3.5 h-3.5 shrink-0"
    >
      <span className={`w-[2px] h-3 origin-bottom eq-bar-1 ${colorClass}`} />
      <span className={`w-[2px] h-3.5 origin-bottom eq-bar-2 ${colorClass}`} />
      <span className={`w-[2px] h-2.5 origin-bottom eq-bar-3 ${colorClass}`} />
    </span>
  );
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
      ? 'border-[#D6BD8D]/75 bg-[#2E0710]/92 backdrop-blur-md text-[#F7F0E5] shadow-[0_10px_28px_rgba(12,2,4,0.55)] hover:bg-[#3F0A17]'
      : 'border-[#B99A62]/55 bg-[#F7F0E5]/90 backdrop-blur-sm text-[#320A14] hover:bg-[#E7D8C5]/75';

  const iconColor = variant === 'dark' ? 'text-[#D6BD8D]' : 'text-[#8E713F]';
  const barColor = variant === 'dark' ? 'bg-[#D6BD8D]' : 'bg-[#8E713F]';

  const sizeClasses = compact
    ? 'w-10 h-10 p-0 justify-center'
    : 'h-10 w-[144px] px-3.5 justify-center';

  const statusTooltip = isPlaying
    ? `Now playing: ${activeTrack.label} · Click to pause`
    : 'Play music: Perfect, Arabic Kuthu, and Mannipaaya medley';

  return (
    <button
      type="button"
      onClick={toggleMusic}
      title={statusTooltip}
      aria-pressed={isPlaying}
      aria-label={statusTooltip}
      className={`inline-flex items-center gap-2 border text-[11px] font-sans font-medium tracking-[0.16em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6BD8D] ${sizeClasses} ${baseColorClasses}`}
    >
      {isPlaying ? (
        <GoldEqualizerBars colorClass={barColor} />
      ) : (
        <VolumeX className={`w-3.5 h-3.5 shrink-0 ${iconColor}`} aria-hidden="true" />
      )}
      {!compact && (
        <span className="leading-none pt-[1px]">
          {isPlaying ? 'Music On' : 'Play Music'}
        </span>
      )}
    </button>
  );
}
