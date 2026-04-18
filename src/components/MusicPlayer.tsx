"use client";

import { useAudio } from "./AudioProvider";

export default function MusicPlayer() {
  const { isPlaying, toggleMusic } = useAudio();

  return (
    <div
      data-no-scroll
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        zIndex: 9999,
      }}
    >
      <button
        id="music-toggle-btn"
        onClick={(e) => toggleMusic(e)}
        aria-label={isPlaying ? "Matikan musik" : "Nyalakan musik"}
        title={isPlaying ? "Matikan musik" : "Nyalakan musik"}
        data-no-scroll
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          border: "1.5px solid rgba(212,175,55,0.55)",
          background:
            "linear-gradient(145deg, rgba(36,24,24,0.92), rgba(139,0,0,0.54))",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.42)",
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
          e.currentTarget.style.transform = "scale(1.12)";
          e.currentTarget.style.boxShadow =
            "0 6px 28px rgba(0,0,0,0.5), 0 0 14px rgba(212,175,55,0.32)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.42)";
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
              pointerEvents: "none",
            }}
          />
        )}

        {/* Icon */}
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="6" y="4" width="4" height="16" rx="1" fill="#D4AF37" />
            <rect x="14" y="4" width="4" height="16" rx="1" fill="#D4AF37" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#D4AF37">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        )}
      </button>

      {/* Pulse ring when playing */}
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
