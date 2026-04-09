type OrnamentProps = {
  className?: string;
};

function CornerFlourish({ className = "" }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      aria-hidden
      className={`h-9 w-9 ${className}`}
    >
      <path
        d="M52 8C34 9 20 23 19 41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M44 8C31 11 22 20 20 33"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8 52C9 34 23 20 41 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="18" cy="38" r="2" fill="currentColor" />
      <circle cx="38" cy="18" r="2" fill="currentColor" />
    </svg>
  );
}

export function VintageFrame({ className = "" }: OrnamentProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-4 ${className}`}
    >
      <div className="absolute inset-0 rounded-[30px] border border-accent/35" />
      <div className="absolute inset-3 rounded-[24px] border border-accent/20" />

      <CornerFlourish className="absolute -left-3 -top-3 text-accent/75" />
      <CornerFlourish className="absolute -right-3 -top-3 rotate-90 text-accent/75" />
      <CornerFlourish className="absolute -right-3 -bottom-3 rotate-180 text-accent/75" />
      <CornerFlourish className="absolute -left-3 -bottom-3 -rotate-90 text-accent/75" />
    </div>
  );
}

export function RoseOrnament({ className = "" }: OrnamentProps) {
  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <svg viewBox="0 0 160 140" className="h-full w-full">
        <g>
          <ellipse cx="80" cy="126" rx="42" ry="9" fill="rgba(0,0,0,0.35)" />

          <path
            d="M74 116c-10-1-19 8-14 15 7 10 26 5 30-8"
            fill="#2F4A20"
          />
          <path
            d="M98 112c9-2 19 4 18 12-2 10-18 14-30 4"
            fill="#3E5F2A"
          />

          <circle cx="62" cy="74" r="24" fill="#6C0000" />
          <circle cx="86" cy="63" r="24" fill="#8B0000" />
          <circle cx="103" cy="84" r="21" fill="#A10000" />
          <circle cx="84" cy="86" r="20" fill="#B3000F" />

          <path
            d="M74 72c5-9 19-10 25-1 6 10-1 22-13 22-12 0-18-12-12-21z"
            fill="#C3131F"
          />
          <path
            d="M84 73c4-6 12-5 15 0 3 6-1 12-8 12s-11-6-7-12z"
            fill="#D81E2A"
          />

          <circle cx="82" cy="77" r="5" fill="#F4B4B8" opacity="0.8" />

          <path
            d="M92 47l8-9 9 3-7 9z"
            fill="#D4AF37"
            opacity="0.85"
          />
          <path
            d="M50 62l-10-7-8 5 9 7z"
            fill="#D4AF37"
            opacity="0.75"
          />
        </g>
      </svg>
    </div>
  );
}

export function CandleOrnament({ className = "" }: OrnamentProps) {
  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <svg viewBox="0 0 128 140" className="h-full w-full">
        <ellipse cx="64" cy="128" rx="44" ry="10" fill="rgba(0,0,0,0.38)" />

        <g>
          <rect x="24" y="44" width="22" height="66" rx="3" fill="#F3E7C5" />
          <rect x="24" y="62" width="22" height="6" rx="1" fill="#D4AF37" />
          <rect x="28" y="39" width="2" height="7" rx="1" fill="#2B1D1D" />

          <path
            className="animate-candle-flicker"
            d="M35 18c0 8-6 11-6 18 0 5 3 9 6 9s6-4 6-9c0-7-6-10-6-18z"
            fill="#FFB703"
          />
          <path
            className="animate-candle-flicker"
            d="M35 25c0 4-3 6-3 9 0 3 1 5 3 5 2 0 3-2 3-5 0-3-3-5-3-9z"
            fill="#FFF3BF"
          />
        </g>

        <g>
          <rect x="72" y="36" width="26" height="74" rx="3" fill="#FAF0D4" />
          <rect x="72" y="58" width="26" height="7" rx="1" fill="#D4AF37" />
          <rect x="84" y="31" width="2" height="7" rx="1" fill="#2B1D1D" />

          <path
            className="animate-candle-flicker"
            d="M85 10c0 10-7 14-7 22 0 6 3 10 7 10 4 0 7-4 7-10 0-8-7-12-7-22z"
            fill="#FFB703"
          />
          <path
            className="animate-candle-flicker"
            d="M85 19c0 5-3 7-3 10 0 3 1 5 3 5 2 0 3-2 3-5 0-3-3-5-3-10z"
            fill="#FFF3BF"
          />
        </g>
      </svg>
    </div>
  );
}

export function GoldRibbonOrnament({ className = "" }: OrnamentProps) {
  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <svg viewBox="0 0 220 86" className="h-full w-full">
        <path d="M26 31h168v24H26z" fill="#D4AF37" />
        <path d="M26 31l-20 12 20 12z" fill="#A37B16" />
        <path d="M194 31l20 12-20 12z" fill="#A37B16" />

        <path d="M26 31h168l-6-8H32z" fill="#E5C96D" />
        <path d="M26 55h168l-6 8H32z" fill="#926C10" />

        <circle cx="110" cy="43" r="12" fill="#8B0000" stroke="#F5D87E" strokeWidth="2" />
        <path
          d="M104 43l4 4 8-8"
          stroke="#F5D87E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function SectionOrnaments({ className = "" }: OrnamentProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <VintageFrame className="opacity-45" />
      <GoldRibbonOrnament className="absolute left-1/2 top-4 h-10 w-36 -translate-x-1/2 opacity-80 animate-ribbon-sway md:w-44" />
      <RoseOrnament className="absolute -left-10 top-12 h-28 w-28 opacity-85 md:h-36 md:w-36" />
      <RoseOrnament className="absolute -right-12 bottom-8 h-32 w-32 rotate-180 opacity-85 md:h-40 md:w-40" />
      <CandleOrnament className="absolute right-2 top-16 h-24 w-24 opacity-80 md:h-28 md:w-28" />
    </div>
  );
}

export function HeroOrnaments({ className = "" }: OrnamentProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <VintageFrame className="inset-5 opacity-70 md:inset-8" />
      <GoldRibbonOrnament className="absolute left-1/2 top-5 h-11 w-44 -translate-x-1/2 opacity-80 animate-ribbon-sway md:h-14 md:w-56" />
      <RoseOrnament className="absolute -left-14 bottom-16 h-36 w-36 opacity-90 md:bottom-12 md:h-48 md:w-48" />
      <RoseOrnament className="absolute -right-14 bottom-20 h-32 w-32 rotate-[14deg] opacity-85 md:h-44 md:w-44" />
      <CandleOrnament className="absolute right-4 bottom-24 h-28 w-28 opacity-90 md:right-8 md:bottom-20 md:h-36 md:w-36" />
    </div>
  );
}

export function FooterOrnaments({ className = "" }: OrnamentProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <GoldRibbonOrnament className="absolute left-1/2 top-3 h-9 w-36 -translate-x-1/2 opacity-75 md:w-40" />
      <RoseOrnament className="absolute -left-10 bottom-4 h-28 w-28 opacity-80 md:h-36 md:w-36" />
      <CandleOrnament className="absolute right-3 bottom-4 h-24 w-24 opacity-75 md:h-28 md:w-28" />
    </div>
  );
}
