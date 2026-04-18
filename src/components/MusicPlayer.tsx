"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const audio = new Audio("/music/background.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const handleCanPlay = () => setIsLoaded(true);
    audio.addEventListener("canplaythrough", handleCanPlay);

    // Auto-play on first user interaction (gesture policy workaround)
    const tryAutoPlay = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Auto-play blocked, user must click toggle
        });
      document.removeEventListener("click", tryAutoPlay);
      document.removeEventListener("touchstart", tryAutoPlay);
      document.removeEventListener("keydown", tryAutoPlay);
    };

    // Try direct autoplay first (some browsers allow it)
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // Blocked, wait for any interaction
        document.addEventListener("click", tryAutoPlay, { once: true });
        document.addEventListener("touchstart", tryAutoPlay, { once: true });
        document.addEventListener("keydown", tryAutoPlay, { once: true });
      });

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.pause();
      audio.src = "";
    };
  }, [isMounted]);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => { });
    }
  }, [isPlaying]);

  if (!isMounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        zIndex: 9999,
      }}
    >
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Matikan musik" : "Nyalakan musik"}
        title={isPlaying ? "Matikan musik" : "Nyalakan musik"}
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          border: "1.5px solid rgba(212,175,55,0.55)",
          background:
            "linear-gradient(145deg, rgba(36,24,24,0.92), rgba(139,0,0,0.54))",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow:
            "0 4px 24px rgba(0,0,0,0.42), 0 0 0 0 rgba(212,175,55,0)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.22s ease, box-shadow 0.22s ease",
          outline: "none",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.12)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 6px 28px rgba(0,0,0,0.5), 0 0 14px rgba(212,175,55,0.32)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 4px 24px rgba(0,0,0,0.42), 0 0 0 0 rgba(212,175,55,0)";
        }}
      >
        {/* Rotating disc ring when playing */}
        {isPlaying && (
          <span
            style={{
              position: "absolute",
              inset: "4px",
              borderRadius: "50%",
              border: "1.5px solid rgba(212,175,55,0.38)",
              borderTopColor: "rgba(212,175,55,0.9)",
              animation: "music-spin 2.4s linear infinite",
            }}
          />
        )}

        {/* Music icon (SVG) */}
        {isPlaying ? (
          /* Pause bars */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="6" y="4" width="4" height="16" rx="1" fill="#D4AF37" stroke="none" />
            <rect x="14" y="4" width="4" height="16" rx="1" fill="#D4AF37" stroke="none" />
          </svg>
        ) : (
          /* Musical note */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="#D4AF37"
            stroke="none"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        )}
      </button>

      {/* Ripple / pulse ring when playing */}
      {isPlaying && (
        <span
          style={{
            position: "absolute",
            inset: "-6px",
            borderRadius: "50%",
            border: "1.5px solid rgba(212,175,55,0.28)",
            animation: "music-pulse 2s ease-out infinite",
            pointerEvents: "none",
          }}
        />
      )}

      <style>{`
        @keyframes music-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes music-pulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
