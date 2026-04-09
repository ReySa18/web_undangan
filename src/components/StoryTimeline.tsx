"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionOrnaments } from "@/components/DecorativeOrnaments";

const stories = [
  {
    year: "2017",
    title: "Pertama Bertemu",
    description:
      "Takdir mempertemukan kami di sebuah acara reuni SMA. Senyuman pertamamu mengubah segalanya.",
    icon: (
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="white"
      />
    ),
  },
  {
    year: "2017 ",
    title: "Mulai Berpacaran",
    description:
      "Setelah 1 bulan saling mengenal, akhirnya kami resmi menjalin kasih pada tanggal 25 Juni 2017.",
    icon: (
      <path
        d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
        fill="white"
      />
    ),
  },
  {
    year: "2026",
    title: "Lamaran",
    description:
      "Setelah 8 tahun menjalin kasih dan berbagi suka  duka, akhirnya kami melangkah ke jenjang yang lebih serius.",
    icon: (
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        fill="white"
      />
    ),
  },
  {
    year: "2026 ",
    title: "Menikah",
    description:
      "Tepat pada tanggal 16 Mei 2026, kami akan menyatukan cinta dalam ikatan suci pernikahan.",
    icon: (
      <path
        d="M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 4.5 6 11 6 11s6-6.5 6-11zm-8 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"
        fill="white"
      />
    ),
    highlight: true,
  },
];

function StoryCard({
  story,
  index,
}: {
  story: (typeof stories)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cardProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "end 0.08"],
  });

  const cardOpacity = useTransform(cardProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const cardX = useTransform(cardProgress, [0, 0.2, 0.8, 1], [-36, 0, 0, 26]);
  const cardY = useTransform(cardProgress, [0, 0.2, 0.8, 1], [24, 0, 0, -18]);
  const cardScale = useTransform(cardProgress, [0, 0.2, 0.8, 1], [0.96, 1, 1, 0.98]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity: cardOpacity, x: cardX, y: cardY, scale: cardScale }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
      className="flex flex-row items-start gap-5 py-2 pb-8 last:pb-0"
    >
      {/* Dot */}
      <div
        className={`flex items-center justify-center w-[34px] min-w-[34px] h-[34px] rounded-full z-10 ${story.highlight
          ? "bg-gradient-to-br from-accent to-accent-dark shadow-[0_0_0_4px_rgba(212,175,55,0.24)]"
          : "bg-accent"
          }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          {story.icon}
        </svg>
      </div>

      {/* Card */}
      <div
        className={`flex flex-col gap-2 p-5 rounded-2xl flex-1 ${story.highlight
          ? "bg-gradient-to-br from-[rgba(139,0,0,0.34)] to-[rgba(26,26,26,0.78)] border border-[rgba(212,175,55,0.35)] backdrop-blur-sm"
          : "bg-[rgba(26,26,26,0.58)] border border-[rgba(212,175,55,0.16)] backdrop-blur-sm"
          }`}
      >
        <span className="text-[11px] font-medium tracking-[2px] uppercase text-accent">
          {story.year}
        </span>
        <span className="font-heading text-lg font-semibold text-text-main">
          {story.title}
        </span>
        <span className="text-[13px] text-text-muted leading-relaxed">
          {story.description}
        </span>
      </div>
    </motion.div>
  );
}

export default function StoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.6"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full bg-secondary-bg py-16 px-6 overflow-hidden">
      <SectionOrnaments className="z-0" />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col items-center gap-2 mb-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-medium tracking-[4px] uppercase text-accent"
        >
          Our Journey
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-[28px] font-bold text-text-main"
        >
          Love Story
        </motion.h2>
      </div>

      {/* Timeline */}
      <div ref={containerRef} className="relative z-10 max-w-md mx-auto">
        {/* Static background line */}
        <div className="absolute left-[16px] top-2 bottom-2 w-[2px] bg-lavender rounded-full" />

        {/* Animated foreground line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-[16px] top-2 w-[2px] bg-gradient-to-b from-accent to-lavender rounded-full origin-top"
        />

        {/* Story Cards */}
        {stories.map((story, i) => (
          <StoryCard key={story.year} story={story} index={i} />
        ))}
      </div>
    </section>
  );
}
