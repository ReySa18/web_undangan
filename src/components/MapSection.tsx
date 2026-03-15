"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const locations = [
  {
    id: "akad",
    title: "Pemberkatan Nikah",
    venue: "Gereja Santo Paulus",
    address: "Jl. Raya Kebahagiaan No. 123, Jakarta Selatan",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2!2d106.8!3d-6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMDAuMCJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
    mapsUrl: "https://maps.google.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "resepsi",
    title: "Resepsi",
    venue: "Ballroom Grand Hotel",
    address: "Jl. Raya Kebahagiaan No. 456, Jakarta Selatan",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5!2d106.82!3d-6.22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTMnMTIuMCJTIDEwNsKwNDknMTIuMCJF!5e0!3m2!1sid!2sid!4v1700000000001!5m2!1sid!2sid",
    mapsUrl: "https://maps.google.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M11 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-5M14 3h7v7M21 3l-9 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function MapCard({
  location,
  delay = 0,
}: {
  location: (typeof locations)[0];
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, type: "spring", stiffness: 80 }}
      className="flex flex-col items-center gap-4 w-full max-w-sm glass-strong rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden"
    >
      {/* Map Embed */}
      <div className="w-full h-[200px] bg-lavender-light">
        <iframe
          src={location.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Peta ${location.title}`}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col items-center gap-3 px-7 pb-7">
        {/* Icon + Title */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-accent to-accent-dark text-white">
            {location.icon}
          </div>
          <h3 className="font-heading text-lg font-semibold text-text-main">
            {location.title}
          </h3>
        </div>

        <div className="w-8 h-px bg-accent" />

        <div className="flex flex-col items-center gap-0.5">
          <span className="text-sm font-medium text-text-main">
            {location.venue}
          </span>
          <span className="text-xs text-text-muted text-center leading-relaxed">
            {location.address}
          </span>
        </div>

        {/* Open Maps Button */}
        <a
          href={location.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-6 py-2.5 mt-1 bg-accent hover:bg-accent-dark transition-colors rounded-full"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-xs font-semibold text-white tracking-[1px]">
            BUKA DI GOOGLE MAPS
          </span>
        </a>
      </div>
    </motion.div>
  );
}

export default function MapSection() {
  return (
    <section className="w-full bg-secondary-bg py-16 px-6">
      {/* Section Header */}
      <div className="flex flex-col items-center gap-2 mb-8">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-medium tracking-[4px] uppercase text-accent"
        >
          Location
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-[28px] font-bold text-text-main"
        >
          Lokasi Acara
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[13px] text-text-muted text-center leading-relaxed max-w-xs"
        >
          Berikut adalah peta lokasi acara untuk memudahkan Anda menemukan
          tempat kami.
        </motion.p>
      </div>

      {/* Map Cards */}
      <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
        {locations.map((loc, i) => (
          <MapCard key={loc.id} location={loc} delay={i * 0.15} />
        ))}
      </div>
    </section>
  );
}
