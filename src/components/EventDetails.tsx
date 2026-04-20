"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionOrnaments } from "@/components/DecorativeOrnaments";

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
    <div className="flex flex-col items-center gap-1 glass rounded-2xl px-3 py-4 w-[72px] border border-accent/30 shadow-[0_8px_20px_rgba(0,0,0,0.28)]">
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "end 0.08"],
  });

  const cardOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const cardY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [28, 0, 0, -20]);
  const cardScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.96, 1, 1, 0.98]);
  const cardX = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [-22, 0, 0, 22]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity: cardOpacity,
        y: cardY,
        scale: cardScale,
        x: cardX,
        perspective: "1000px",
      }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.02, rotateY: 2 }}
      className="flex flex-col items-center gap-4 w-full max-w-sm p-7 glass-strong rounded-[20px] shadow-[0_14px_34px_rgba(0,0,0,0.36)] cursor-default"
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
        <span className="text-xs font-semibold text-black tracking-[1px]">
          BUKA PETA
        </span>
      </a>
    </motion.div>
  );
}

export default function EventDetails() {
  const sectionRef = useRef<HTMLElement>(null);
  const targetDate = new Date("2026-05-16T00:00:00+07:00");
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [0, 1, 1, 0]);
  const sectionY = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [22, 0, 0, -24]);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeRemaining(targetDate));
    const timer = setInterval(() => {
      setTime(getTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: sectionOpacity, y: sectionY }}
      className="relative w-full bg-primary-bg py-16 px-6 overflow-hidden"
    >
      <SectionOrnaments className="z-0" />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col items-center gap-2 mb-8">
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
        className="relative z-10 flex flex-row items-center justify-center gap-3 mb-8"
      >
        <CountdownUnit value={time.days} label="Hari" />
        <CountdownUnit value={time.hours} label="Jam" />
        <CountdownUnit value={time.minutes} label="Menit" />
        <CountdownUnit value={time.seconds} label="Detik" />
      </motion.div>

      {/* Event Cards */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-md mx-auto">
        <EventCard
          title="Pemberkatan Nikah"
          date="Sabtu, 16 Mei 2026"
          time="08:00 - 09:00 WIB"
          venue="Gereja Santo Benediktus Sikampar"
          address="Teluk Kuantan, Riau"
          mapUrl="https://www.google.com/maps/place/0%C2%B015'14.6%22S+101%C2%B039'14.0%22E/@-0.2540437,101.65131,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-0.2540437!4d101.6538849?hl=en&entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D"
          delay={0.05}
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
          date="Sabtu, 16 Mei 2026"
          time="10:00 WIB s/d Selesai"
          venue="Gedung Serbaguna"
          address="Desa Sikampar, Teluk Kuantan, Riau"
          mapUrl="https://www.google.com/maps/place/0%C2%B015'14.6%22S+101%C2%B039'14.0%22E/@-0.2540437,101.65131,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-0.2540437!4d101.6538849?hl=en&entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D"
          delay={0.1}
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
    </motion.section>
  );
}
