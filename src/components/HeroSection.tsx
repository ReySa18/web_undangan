"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroOrnaments } from "@/components/DecorativeOrnaments";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Layer */}
      <motion.div
        style={{ y: bgY, scale: photoScale }}
        className="absolute inset-0 z-0 origin-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full relative"
        >
          <Image
            src="/DSC_0015.webp"
            alt="Hero Background"
            fill
            priority
            className="object-cover object-[center_35%] md:scale-[0.94]"
            sizes="100vw"
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-[#8B0000]/35" />
        </motion.div>
      </motion.div>

      {/* Text Layer */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[11px] font-medium tracking-[4px] uppercase text-[rgb(255_255_240/0.82)]"
        >
          The Wedding Of
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-3 font-heading text-[42px] md:text-6xl font-bold text-text-main tracking-wide drop-shadow-md"
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
          className="font-heading text-[42px] md:text-6xl font-bold text-text-main tracking-wide drop-shadow-md"
        >
          Yessi
        </motion.h1>
      </motion.div>

      <HeroOrnaments className="z-20" />

      {/* Save The Date Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 glass rounded-2xl px-7 py-3.5 flex flex-col items-center gap-0.5 border border-accent/35 shadow-lg shadow-black/35"
      >
        <span className="text-[10px] font-medium tracking-[3px] uppercase text-text-muted">
          Save The Date
        </span>
        <span className="font-heading text-xl font-semibold text-text-main">
          16.05.2026
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
              stroke="#FFFFF0"
              strokeOpacity="0.8"
              strokeWidth="1.5"
            />
            <circle cx="10" cy="10" r="2.5" fill="#FFFFF0" fillOpacity="0.8" />
          </svg>
        </div>
        <span className="text-[9px] text-[rgb(255_255_240/0.82)] tracking-[2px]">
          SCROLL
        </span>
      </motion.div>
    </section>
  );
}
