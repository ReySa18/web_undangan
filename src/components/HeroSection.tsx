"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Layer */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#D8D0E0] via-[#EBE7F0] to-[#F5F2F8]" />
      </motion.div>

      {/* Text Layer */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="absolute inset-x-0 top-0 z-10 flex flex-col items-center pt-20 md:pt-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[11px] font-medium tracking-[4px] uppercase text-text-muted"
        >
          The Wedding Of
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-3 font-heading text-[42px] md:text-6xl font-bold text-text-main tracking-wide"
        >
          Sono
        </motion.h1>

        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
          className="font-script text-[32px] md:text-4xl text-accent"
        >
          &
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-heading text-[42px] md:text-6xl font-bold text-text-main tracking-wide"
        >
          Yessi
        </motion.h1>
      </motion.div>

      {/* Photo Foreground Layer */}
      <motion.div
        style={{ scale: photoScale }}
        className="absolute inset-x-0 bottom-[120px] z-20 flex justify-center"
      >
        <div className="relative w-[260px] h-[360px] md:w-[320px] md:h-[440px] rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
          <Image
            src="/hero-photo.webp"
            alt="Sono & Yessi Prewedding"
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 768px) 260px, 320px"
          />
        </div>
      </motion.div>

      {/* Save The Date Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 glass rounded-2xl px-7 py-3.5 flex flex-col items-center gap-0.5 border border-white/40 shadow-lg shadow-black/5"
      >
        <span className="text-[10px] font-medium tracking-[3px] uppercase text-text-muted">
          Save The Date
        </span>
        <span className="font-heading text-xl font-semibold text-text-main">
          25.12.2026
        </span>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1"
      >
        <div className="animate-scroll-bounce">
          <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
            <rect
              x="1"
              y="1"
              width="18"
              height="28"
              rx="9"
              stroke="#7A7A7A"
              strokeWidth="1.5"
            />
            <circle cx="10" cy="10" r="2.5" fill="#7A7A7A" />
          </svg>
        </div>
        <span className="text-[9px] text-text-muted tracking-[2px]">
          SCROLL
        </span>
      </motion.div>
    </section>
  );
}
