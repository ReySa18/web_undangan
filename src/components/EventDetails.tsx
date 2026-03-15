"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function getTimeRemaining(targetDate: Date) {
  const now = new Date().getTime();
  const diff = targetDate.getTime() - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 glass rounded-2xl px-3 py-4 w-[72px]">
      <motion.span
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="font-heading text-[32px] font-bold text-text-main leading-none"
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="text-[10px] font-medium tracking-[2px] uppercase text-text-muted">
        {label}
      </span>
    </div>
  );
}

function EventCard({
  title,
  date,
  time,
  venue,
  address,
  mapUrl,
  icon,
  delay = 0,
}: {
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapUrl: string;
  icon: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 5 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay, type: "spring", stiffness: 80 }}
      whileHover={{ scale: 1.02, rotateY: 2 }}
      className="flex flex-col items-center gap-4 w-full max-w-sm p-7 glass-strong rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] cursor-default"
      style={{ perspective: "1000px" }}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-[52px] h-[52px] rounded-full bg-gradient-to-br from-accent to-accent-dark">
        {icon}
      </div>

      <h3 className="font-heading text-[22px] font-semibold text-text-main">
        {title}
      </h3>

      {/* Divider */}
      <div className="w-10 h-px bg-accent" />

      {/* Date & Time */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-medium text-text-main">{date}</span>
        <span className="text-[13px] text-text-muted">{time}</span>
      </div>

      {/* Venue */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-medium text-text-main">{venue}</span>
        <span className="text-xs text-text-muted text-center">{address}</span>
      </div>

      {/* Map Button */}
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-6 py-2.5 bg-accent hover:bg-accent-dark transition-colors rounded-full"
      >
        <span className="text-xs font-semibold text-white tracking-[1px]">
          BUKA PETA
        </span>
      </a>
    </motion.div>
  );
}

export default function EventDetails() {
  const targetDate = new Date("2026-12-25T08:00:00+07:00");
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeRemaining(targetDate));
    const timer = setInterval(() => {
      setTime(getTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-primary-bg py-16 px-6">
      {/* Section Header */}
      <div className="flex flex-col items-center gap-2 mb-8">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-medium tracking-[4px] uppercase text-accent"
        >
          Mark Your Calendar
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-[28px] font-bold text-text-main"
        >
          Waktu & Tempat
        </motion.h2>
      </div>

      {/* Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex flex-row items-center justify-center gap-3 mb-8"
      >
        <CountdownUnit value={time.days} label="Hari" />
        <CountdownUnit value={time.hours} label="Jam" />
        <CountdownUnit value={time.minutes} label="Menit" />
        <CountdownUnit value={time.seconds} label="Detik" />
      </motion.div>

      {/* Event Cards */}
      <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
        <EventCard
          title="Pemberkatan Nikah"
          date="Jumat, 25 Desember 2026"
          time="08:00 - 10:00 WIB"
          venue="Gereja Santo Paulus"
          address="Jl. Raya Kebahagiaan No. 123, Jakarta Selatan"
          mapUrl="https://maps.google.com"
          delay={0}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <EventCard
          title="Resepsi"
          date="Jumat, 25 Desember 2026"
          time="11:00 - 14:00 WIB"
          venue="Ballroom Grand Hotel"
          address="Jl. Raya Kebahagiaan No. 456, Jakarta Selatan"
          mapUrl="https://maps.google.com"
          delay={0.15}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M11 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-5M14 3h7v7M21 3l-9 9"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      </div>
    </section>
  );
}
