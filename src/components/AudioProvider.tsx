"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface AudioContextValue {
  isPlaying: boolean;
  startPlaying: () => void;
  toggleMusic: (e?: React.MouseEvent) => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio("/music/background.mp3");
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  const startPlaying = useCallback(() => {
    const audio = getAudio();
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  }, [getAudio]);

  const toggleMusic = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      e?.preventDefault();
      const audio = getAudio();
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    },
    [isPlaying, getAudio]
  );

  return (
    <AudioCtx.Provider value={{ isPlaying, startPlaying, toggleMusic }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be inside AudioProvider");
  return ctx;
}
