import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export type MedleyMovement = 'perfect' | 'arabic_kuthu' | 'mannipaaya';

export const MEDLEY_TRACKS: ReadonlyArray<{
  id: MedleyMovement;
  label: string;
  artist: string;
}> = [
  { id: 'perfect', label: 'Perfect', artist: 'Ed Sheeran' },
  { id: 'arabic_kuthu', label: 'Arabic Kuthu', artist: 'Anirudh' },
  { id: 'mannipaaya', label: 'Mannipaaya', artist: 'A.R. Rahman' },
];

interface MusicContextValue {
  isPlaying: boolean;
  isSupported: boolean;
  currentMovement: MedleyMovement;
  toggleMusic: () => void;
  stopMusic: () => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

// Frequencies (Hz)
const N = {
  G2: 98.0,
  Ab2: 103.83,
  A2: 110.0,
  B2: 123.47,
  C3: 130.81,
  Db3: 138.59,
  D3: 146.83,
  Eb3: 155.56,
  E3: 164.81,
  F3: 174.61,
  Gb3: 185.0,
  Fs3: 185.0,
  G3: 196.0,
  Ab3: 207.65,
  A3: 220.0,
  Bb3: 233.08,
  B3: 246.94,
  C4: 261.63,
  Db4: 277.18,
  D4: 293.66,
  Eb4: 311.13,
  E4: 329.63,
  F4: 349.23,
  Fs4: 369.99,
  G4: 392.0,
  Gs4: 415.3,
  Ab4: 415.3,
  A4: 440.0,
  Bb4: 466.16,
  B4: 493.88,
  C5: 523.25,
  Db5: 554.37,
  D5: 587.33,
  Eb5: 622.25,
  E5: 659.25,
  F5: 698.46,
  Fs5: 739.99,
  G5: 783.99,
  Gs5: 830.61,
  Ab5: 830.61,
  A5: 880.0,
} as const;

interface StepEvent {
  durationMs: number;
  movement: MedleyMovement;
  bass?: number;
  arp?: number;
  lead?: number;
  leadDuration?: number;
  pad?: number[];
  kick?: boolean;
  shaker?: boolean;
}

// Unified 3-part continuous wedding medley:
// 1) "Perfect" inspired 6/8 warm romantic waltz (Ab - Fm - Db - Eb)
// 2) "Arabic Kuthu" inspired celebratory dance groove (E Hijaz / festive pulse)
// 3) "Mannipaaya" inspired lush acoustic ballad (D - A - Bm - G)
function buildMedleySequence(): StepEvent[] {
  const steps: StepEvent[] = [];

  // --- MOVEMENT 1: "Perfect" (6/8 Acoustic Waltz, Ab Major) ---
  const waltzStep = 310;
  const waltzBars: Array<{
    bass: number;
    arp: number[];
    leads: Array<number | undefined>;
  }> = [
    {
      bass: N.Ab2,
      arp: [N.Eb3, N.Ab3, N.C4, N.Ab3, N.Eb3, N.Ab3],
      leads: [N.Eb4, undefined, N.Ab4, N.Bb4, undefined, N.C5],
    },
    {
      bass: N.F3,
      arp: [N.C3, N.Ab3, N.C4, N.Ab3, N.C3, N.Ab3],
      leads: [N.C5, undefined, N.Bb4, N.Ab4, undefined, N.Eb4],
    },
    {
      bass: N.Db3,
      arp: [N.Ab3, N.Db4, N.F4, N.Db4, N.Ab3, N.F3],
      leads: [N.F4, undefined, N.Ab4, N.Bb4, undefined, N.C5],
    },
    {
      bass: N.Eb3,
      arp: [N.Bb3, N.Eb4, N.G4, N.Eb4, N.Bb3, N.Eb3],
      leads: [N.Bb4, undefined, N.G4, N.Eb4, undefined, undefined],
    },
    {
      bass: N.Ab2,
      arp: [N.Eb3, N.Ab3, N.C4, N.Ab3, N.Eb3, N.Ab3],
      leads: [N.Eb5, undefined, N.Db5, N.C5, undefined, N.Bb4],
    },
    {
      bass: N.F3,
      arp: [N.C3, N.Ab3, N.C4, N.Ab3, N.C3, N.Ab3],
      leads: [N.Ab4, undefined, N.F4, N.Eb4, undefined, N.Ab4],
    },
    {
      bass: N.Db3,
      arp: [N.Ab3, N.Db4, N.F4, N.Db4, N.Ab3, N.Eb3],
      leads: [N.F4, N.G4, N.Ab4, N.Bb4, undefined, N.C5],
    },
    {
      bass: N.Eb3,
      arp: [N.Bb3, N.Eb4, N.G4, N.Eb4, N.Bb3, N.E3],
      leads: [N.Bb4, undefined, undefined, N.E4, undefined, N.G4],
    },
  ];

  for (const bar of waltzBars) {
    for (let i = 0; i < 6; i += 1) {
      steps.push({
        durationMs: waltzStep,
        movement: 'perfect',
        bass: i === 0 ? bar.bass : undefined,
        arp: bar.arp[i],
        lead: bar.leads[i],
        leadDuration: 0.9,
      });
    }
  }

  // --- MOVEMENT 2: "Arabic Kuthu" (Festive Kuthu / Middle-Eastern Groove) ---
  const grooveStep = 215;
  const grooveBars: Array<{
    bass: number;
    leads: Array<number | undefined>;
    arp: Array<number | undefined>;
  }> = [
    {
      bass: N.E3,
      leads: [N.E5, undefined, N.F5, N.Gs5, N.A5, N.Gs5, N.F5, N.E5],
      arp: [N.B3, N.E4, undefined, N.B3, N.Gs4, undefined, N.E4, N.B3],
    },
    {
      bass: N.E3,
      leads: [N.Gs5, N.F5, N.E5, undefined, N.D5, N.E5, N.F5, N.E5],
      arp: [N.B3, N.E4, undefined, N.B3, N.F4, undefined, N.E4, N.B3],
    },
    {
      bass: N.A2,
      leads: [N.A5, undefined, N.Gs5, N.F5, N.E5, N.F5, N.Gs5, N.A5],
      arp: [N.E3, N.A3, undefined, N.E3, N.C4, undefined, N.A3, N.E3],
    },
    {
      bass: N.E3,
      leads: [N.Gs5, undefined, N.F5, N.E5, N.D5, N.C5, N.B4, N.E5],
      arp: [N.B3, N.E4, undefined, N.B3, N.Gs4, undefined, N.E4, N.B3],
    },
    {
      bass: N.E3,
      leads: [N.E5, N.E5, N.F5, N.Gs5, N.A5, undefined, N.Gs5, N.F5],
      arp: [N.B3, N.E4, undefined, N.B3, N.Gs4, undefined, N.E4, N.B3],
    },
    {
      bass: N.D3,
      leads: [N.F5, undefined, N.E5, N.D5, N.C5, N.D5, N.E5, N.F5],
      arp: [N.A3, N.D4, undefined, N.A3, N.F4, undefined, N.D4, N.A3],
    },
    {
      bass: N.E3,
      leads: [N.E5, N.Gs5, N.A5, N.Gs5, N.F5, N.E5, N.D5, N.E5],
      arp: [N.B3, N.E4, undefined, N.B3, N.Gs4, undefined, N.E4, N.B3],
    },
    {
      bass: N.A2,
      leads: [N.E5, undefined, N.D5, undefined, N.D4, undefined, N.A4, undefined],
      arp: [N.E3, N.A3, N.E4, undefined, N.D4, undefined, N.A3, undefined],
    },
  ];

  for (const bar of grooveBars) {
    for (let i = 0; i < 8; i += 1) {
      steps.push({
        durationMs: grooveStep,
        movement: 'arabic_kuthu',
        bass: i === 0 || i === 4 ? bar.bass : undefined,
        arp: bar.arp[i],
        lead: bar.leads[i],
        leadDuration: 0.42,
        kick: i === 0 || i === 3 || i === 4 || i === 6,
        shaker: i % 2 === 1,
      });
    }
  }

  // --- MOVEMENT 3: "Mannipaaya" (Soulful Romantic Acoustic Ballad, D Major) ---
  const balladStep = 335;
  const balladBars: Array<{
    bass: number;
    pad: number[];
    arp: number[];
    leads: Array<number | undefined>;
  }> = [
    {
      bass: N.D3,
      pad: [N.D4, N.Fs4, N.A4],
      arp: [N.A3, N.D4, N.Fs4, N.A4, N.Fs4, N.D4],
      leads: [N.Fs5, undefined, N.E5, N.D5, undefined, N.A4],
    },
    {
      bass: N.A2,
      pad: [N.Db4, N.E4, N.A4],
      arp: [N.E3, N.A3, N.Db4, N.E4, N.Db4, N.A3],
      leads: [N.E5, undefined, N.D5, N.Db5, undefined, N.A4],
    },
    {
      bass: N.B2,
      pad: [N.D4, N.Fs4, N.B4],
      arp: [N.Fs3, N.B3, N.D4, N.Fs4, N.D4, N.B3],
      leads: [N.D5, undefined, N.E5, N.Fs5, undefined, N.D5],
    },
    {
      bass: N.G2,
      pad: [N.B3, N.D4, N.G4],
      arp: [N.D3, N.G3, N.B3, N.D4, N.B3, N.G3],
      leads: [N.B4, undefined, N.D5, N.E5, undefined, undefined],
    },
    {
      bass: N.D3,
      pad: [N.D4, N.Fs4, N.A4],
      arp: [N.A3, N.D4, N.Fs4, N.A4, N.Fs4, N.D4],
      leads: [N.A5, undefined, N.Fs5, N.E5, undefined, N.D5],
    },
    {
      bass: N.A2,
      pad: [N.Db4, N.E4, N.A4],
      arp: [N.E3, N.A3, N.Db4, N.E4, N.Db4, N.A3],
      leads: [N.E5, undefined, N.Fs5, N.E5, undefined, N.Db5],
    },
    {
      bass: N.B2,
      pad: [N.D4, N.Fs4, N.B4],
      arp: [N.Fs3, N.B3, N.D4, N.Fs4, N.D4, N.B3],
      leads: [N.D5, N.E5, N.Fs5, N.G5, undefined, N.Fs5],
    },
    {
      bass: N.G2,
      pad: [N.B3, N.D4, N.Eb4],
      arp: [N.D3, N.G3, N.B3, N.Eb4, N.G4, N.Eb4],
      leads: [N.Eb5, undefined, undefined, N.C5, undefined, undefined],
    },
  ];

  for (const bar of balladBars) {
    for (let i = 0; i < 6; i += 1) {
      steps.push({
        durationMs: balladStep,
        movement: 'mannipaaya',
        bass: i === 0 ? bar.bass : undefined,
        pad: i === 0 ? bar.pad : undefined,
        arp: bar.arp[i],
        lead: bar.leads[i],
        leadDuration: 1.15,
      });
    }
  }

  return steps;
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [currentMovement, setCurrentMovement] = useState<MedleyMovement>('perfect');

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const customAudioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepIndexRef = useRef(0);
  const isPlayingRef = useRef(false);
  const sequenceRef = useRef<StepEvent[] | null>(null);

  const getSequence = () => {
    if (!sequenceRef.current) {
      sequenceRef.current = buildMedleySequence();
    }
    return sequenceRef.current;
  };

  const stopMusic = useCallback(() => {
    isPlayingRef.current = false;
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (customAudioRef.current) {
      customAudioRef.current.pause();
    }
    if (masterGainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      masterGainRef.current.gain.cancelScheduledValues(now);
      masterGainRef.current.gain.setTargetAtTime(0.0001, now, 0.16);
    }
    setIsPlaying(false);
  }, []);

  const playSynthVoice = useCallback(
    (
      ctx: AudioContext,
      dest: AudioNode,
      freq: number,
      duration: number,
      volume: number,
      type: OscillatorType = 'sine',
    ) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + duration);

      osc.connect(gain);
      gain.connect(dest);
      osc.start(now);
      osc.stop(now + duration + 0.05);
    },
    [],
  );

  const playWarmKick = useCallback((ctx: AudioContext, dest: AudioNode) => {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(115, now);
    osc.frequency.exponentialRampToValueAtTime(44, now + 0.12);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(dest);
    osc.start(now);
    osc.stop(now + 0.16);
  }, []);

  const playSoftShaker = useCallback((ctx: AudioContext, dest: AudioNode) => {
    const now = ctx.currentTime;
    const bufferSize = Math.floor(ctx.sampleRate * 0.035);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i += 1) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(4200, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.038, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    noise.start(now);
  }, []);

  const scheduleNextStep = useCallback(() => {
    if (!isPlayingRef.current || !audioCtxRef.current || !masterGainRef.current) {
      return;
    }

    const ctx = audioCtxRef.current;
    const dest = masterGainRef.current;
    const seq = getSequence();
    const event = seq[stepIndexRef.current % seq.length];
    stepIndexRef.current = (stepIndexRef.current + 1) % seq.length;

    setCurrentMovement(event.movement);

    if (event.bass) {
      playSynthVoice(ctx, dest, event.bass, 1.4, 0.14, 'sine');
    }
    if (event.arp) {
      playSynthVoice(ctx, dest, event.arp, 0.75, 0.065, 'triangle');
    }
    if (event.lead) {
      const dur = event.leadDuration ?? 0.8;
      playSynthVoice(ctx, dest, event.lead, dur, 0.11, 'sine');
      playSynthVoice(ctx, dest, event.lead * 2, dur * 0.7, 0.02, 'triangle');
    }
    if (event.pad) {
      for (const note of event.pad) {
        playSynthVoice(ctx, dest, note, 1.9, 0.032, 'triangle');
      }
    }
    if (event.kick) {
      playWarmKick(ctx, dest);
    }
    if (event.shaker) {
      playSoftShaker(ctx, dest);
    }

    timerRef.current = window.setTimeout(scheduleNextStep, event.durationMs);
  }, [playSoftShaker, playSynthVoice, playWarmKick]);

  const startSynthMedley = useCallback(async () => {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioCtx) {
      setIsSupported(false);
      return;
    }

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    if (!masterGainRef.current) {
      const master = ctx.createGain();
      const warmthFilter = ctx.createBiquadFilter();
      warmthFilter.type = 'lowpass';
      warmthFilter.frequency.setValueAtTime(3200, ctx.currentTime);

      const delay = ctx.createDelay(0.5);
      delay.delayTime.setValueAtTime(0.22, ctx.currentTime);
      const feedback = ctx.createGain();
      feedback.gain.setValueAtTime(0.18, ctx.currentTime);

      master.connect(warmthFilter);
      warmthFilter.connect(ctx.destination);
      warmthFilter.connect(delay);
      delay.connect(feedback);
      feedback.connect(ctx.destination);

      masterGainRef.current = master;
    }

    const masterGain = masterGainRef.current;
    masterGain.gain.cancelScheduledValues(ctx.currentTime);
    masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.85, ctx.currentTime + 0.35);

    isPlayingRef.current = true;
    setIsPlaying(true);
    scheduleNextStep();
  }, [scheduleNextStep]);

  const toggleMusic = useCallback(async () => {
    if (isPlaying) {
      stopMusic();
      return;
    }

    try {
      // Optional user-supplied MP3 mashup support at /audio/wedding-mashup.mp3
      const headRes = await fetch('/audio/wedding-mashup.mp3', {
        method: 'HEAD',
      }).catch(() => null);

      const contentType = headRes?.headers.get('content-type') ?? '';
      if (headRes?.ok && contentType.startsWith('audio/')) {
        if (!customAudioRef.current) {
          const audioEl = new Audio('/audio/wedding-mashup.mp3');
          audioEl.loop = true;
          customAudioRef.current = audioEl;
        }
        await customAudioRef.current.play();
        isPlayingRef.current = true;
        setIsPlaying(true);
        return;
      }

      await startSynthMedley();
    } catch {
      setIsSupported(false);
      setIsPlaying(false);
    }
  }, [isPlaying, startSynthMedley, stopMusic]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      if (customAudioRef.current) {
        customAudioRef.current.pause();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        isSupported,
        currentMovement,
        toggleMusic,
        stopMusic,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return ctx;
}
