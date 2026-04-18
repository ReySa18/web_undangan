"use client";

import { useState, useEffect } from "react";
import { useAudio } from "./AudioProvider";

const PETALS = Array.from({ length: 12 }, (_, i) => i);

export default function CoverScreen() {
  const { startPlaying } = useAudio();
  const [isLeaving, setIsLeaving] = useState(false);
  const [isGone, setIsGone] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [guestName, setGuestName] = useState<string>("Tamu Undangan");

  useEffect(() => {
    setMounted(true);
    // Baca nama tamu dari URL query param ?to=NamaTamu
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get("to");
    if (toParam && toParam.trim()) {
      // Decode dan format: ganti "+" atau "%20" → spasi, lalu capitalize tiap kata
      const decoded = decodeURIComponent(toParam.replace(/\+/g, " ")).trim();
      setGuestName(decoded);
    }
  }, []);

  const handleOpen = () => {
    startPlaying();
    setIsLeaving(true);
    setTimeout(() => setIsGone(true), 900);
  };

  if (!mounted || isGone) return null;

  return (
    <>
      <div
        data-no-scroll
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(155deg, #1A1A1A 0%, #140F0F 48%, #221313 100%)",
          animation: isLeaving
            ? "cover-fade-out 0.9s ease forwards"
            : "cover-fade-in 0.6s ease forwards",
          overflow: "hidden",
        }}
      >
        {/* Radial glow top-left */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: "55%",
            height: "55%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,0,0,0.45) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        {/* Radial glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            right: "-10%",
            width: "50%",
            height: "50%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Floating petals */}
        {PETALS.map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "-40px",
              left: `${(i * 8.5) % 100}%`,
              width: `${6 + (i % 4) * 3}px`,
              height: `${6 + (i % 4) * 3}px`,
              borderRadius: "50% 0 50% 0",
              background: i % 3 === 0
                ? "rgba(212,175,55,0.35)"
                : i % 3 === 1
                  ? "rgba(139,0,0,0.4)"
                  : "rgba(255,240,230,0.2)",
              animation: `petal-fall ${4 + (i % 5)}s linear ${(i * 0.7) % 4}s infinite`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Corner ornaments */}
        {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => {
          const isRight = pos.includes("right");
          const isBottom = pos.includes("bottom");
          return (
            <div
              key={pos}
              style={{
                position: "absolute",
                top: isBottom ? "auto" : "20px",
                bottom: isBottom ? "20px" : "auto",
                left: isRight ? "auto" : "20px",
                right: isRight ? "20px" : "auto",
                width: "80px",
                height: "80px",
                pointerEvents: "none",
                transform: `rotate(${isRight ? (isBottom ? 180 : 90) : isBottom ? -90 : 0}deg)`,
              }}
            >
              <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 4 L4 32 M4 4 L32 4"
                  stroke="rgba(212,175,55,0.55)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M4 4 L18 18"
                  stroke="rgba(212,175,55,0.3)"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <circle cx="4" cy="4" r="3" fill="rgba(212,175,55,0.6)" />
                <circle cx="18" cy="18" r="2" fill="rgba(212,175,55,0.35)" />
              </svg>
            </div>
          );
        })}

        {/* Content card */}
        <div
          style={{
            textAlign: "center",
            padding: "48px 40px",
            maxWidth: "420px",
            width: "90%",
            animation: "text-rise 0.8s ease 0.2s both",
            position: "relative",
          }}
        >
          {/* Top label */}
          <p
            style={{
              fontFamily: "var(--font-heading)",
              color: "rgba(212,175,55,0.8)",
              fontSize: "11px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            Undangan Pernikahan
          </p>

          {/* Gold divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(212,175,55,0.6))" }} />
            <span style={{ color: "rgba(212,175,55,0.7)", fontSize: "16px" }}>❧</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(212,175,55,0.6))" }} />
          </div>

          {/* Groom name */}
          <h1
            style={{
              fontFamily: "var(--font-script)",
              color: "#FFFFF0",
              fontSize: "clamp(52px, 14vw, 72px)",
              lineHeight: 1.1,
              margin: 0,
              textShadow: "0 0 30px rgba(212,175,55,0.3)",
            }}
          >
            Harsono
          </h1>

          {/* & divider */}
          <p
            style={{
              fontFamily: "var(--font-heading)",
              color: "rgba(212,175,55,0.9)",
              fontSize: "22px",
              margin: "4px 0",
              letterSpacing: "2px",
            }}
          >
            &amp;
          </p>

          {/* Bride name */}
          <h2
            style={{
              fontFamily: "var(--font-script)",
              color: "#FFFFF0",
              fontSize: "clamp(52px, 14vw, 72px)",
              lineHeight: 1.1,
              margin: 0,
              textShadow: "0 0 30px rgba(212,175,55,0.3)",
              fontWeight: "normal",
            }}
          >
            Yessi
          </h2>

          {/* Bottom divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "28px 0 20px" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(212,175,55,0.6))" }} />
            <span style={{ color: "rgba(212,175,55,0.7)", fontSize: "16px" }}>✦</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(212,175,55,0.6))" }} />
          </div>

          {/* Dear / Kepada */}
          <div style={{ marginBottom: "36px" }}>
            <p
              style={{
                fontFamily: "var(--font-heading)",
                color: "rgba(212,175,55,0.6)",
                fontSize: "10px",
                letterSpacing: "3.5px",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Kepada Yth.
            </p>
            <p
              style={{
                fontFamily: "var(--font-script)",
                color: "#FFFFF0",
                fontSize: "clamp(22px, 6vw, 30px)",
                lineHeight: 1.3,
                margin: 0,
                textShadow: "0 0 20px rgba(212,175,55,0.25)",
                wordBreak: "break-word",
              }}
            >
              {guestName}
            </p>
          </div>

          {/* Open button */}
          <button
            id="cover-open-btn"
            data-no-scroll
            onClick={handleOpen}
            disabled={isLeaving}
            style={{
              padding: "14px 36px",
              borderRadius: "999px",
              border: "1.5px solid rgba(212,175,55,0.7)",
              background:
                "linear-gradient(145deg, rgba(139,0,0,0.6), rgba(36,24,24,0.9))",
              color: "#D4AF37",
              fontFamily: "var(--font-heading)",
              fontSize: "13px",
              letterSpacing: "2.5px",
              cursor: "pointer",
              transition: "all 0.25s ease",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4), 0 0 0 0 rgba(212,175,55,0)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              margin: "0 auto",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(145deg, rgba(139,0,0,0.85), rgba(55,28,28,0.95))";
              e.currentTarget.style.boxShadow =
                "0 6px 28px rgba(0,0,0,0.5), 0 0 18px rgba(212,175,55,0.28)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(145deg, rgba(139,0,0,0.6), rgba(36,24,24,0.9))";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(0,0,0,0.4), 0 0 0 0 rgba(212,175,55,0)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Music icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#D4AF37">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            BUKA UNDANGAN
          </button>

          <p
            style={{
              color: "rgba(212,175,55,0.45)",
              fontSize: "10px",
              letterSpacing: "1px",
              marginTop: "14px",
              fontFamily: "var(--font-body)",
            }}
          >
            Musik akan diputar otomatis
          </p>
        </div>
      </div>

      <style>{`
        @keyframes cover-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes cover-fade-out {
          0%   { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.04); }
        }
        @keyframes text-rise {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes petal-fall {
          0%   { transform: translateY(-40px) rotate(0deg);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </>
  );
}
