"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { SectionOrnaments } from "@/components/DecorativeOrnaments";

const accounts = [
  {
    id: "bca",
    bank: "Bank Raya",
    accountNumber: "001001372605317",
    accountName: "Harsono",
    color: "#003D79",
    logo: (
      <svg width="40" height="20" viewBox="0 0 80 28" fill="none">
        <rect width="80" height="28" rx="4" fill="#003D79" />
        <text
          x="40"
          y="18"
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
        >
          BCA
        </text>
      </svg>
    ),
  },
  {
    id: "mandiri",
    bank: "Bank Mandiri",
    accountNumber: "1070012642429",
    accountName: "Yessi Meilinda S",
    color: "#003876",
    logo: (
      <svg width="56" height="20" viewBox="0 0 112 28" fill="none">
        <rect width="112" height="28" rx="4" fill="#003876" />
        <text
          x="56"
          y="18"
          textAnchor="middle"
          fill="#F5A623"
          fontSize="12"
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
        >
          MANDIRI
        </text>
      </svg>
    ),
  },
];

function AccountCard({
  account,
  delay = 0,
}: {
  account: (typeof accounts)[0];
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "end 0.08"],
  });

  const cardOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const cardY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [30, 0, 0, -18]);
  const cardScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.96, 1, 1, 0.985]);
  const cardX = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [-18, 0, 0, 20]);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = account.accountNumber;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
      className="flex flex-col items-center gap-5 w-full max-w-sm p-7 glass-strong rounded-[20px] shadow-[0_12px_32px_rgba(0,0,0,0.36)]"
    >
      {/* Bank Logo */}
      <div className="flex items-center justify-center">{account.logo}</div>

      {/* Divider */}
      <div className="w-10 h-px bg-accent" />

      {/* Account Info */}
      <div className="flex flex-col items-center gap-1.5">
        <span className="font-heading text-[22px] font-bold text-text-main tracking-wider">
          {account.accountNumber}
        </span>
        <span className="text-sm text-text-muted">
          a/n{" "}
          <span className="font-medium text-text-main">
            {account.accountName}
          </span>
        </span>
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="flex items-center justify-center gap-2 px-6 py-2.5 border-[1.5px] border-accent rounded-full hover:bg-accent hover:text-black transition-all group"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="copied"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600 group-hover:text-black"
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </svg>
              <span className="text-xs font-semibold text-green-600 group-hover:text-black tracking-[1px]">
                TERSALIN!
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent group-hover:text-black"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              <span className="text-xs font-semibold text-accent group-hover:text-black tracking-[1px]">
                SALIN NO. REKENING
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

export default function GiftSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [0, 1, 1, 0]);
  const sectionY = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [22, 0, 0, -24]);

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
          Wedding Gift
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-[28px] font-bold text-text-main"
        >
          Amplop Digital
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[13px] text-text-muted text-center leading-relaxed max-w-xs"
        >
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun
          jika Anda ingin memberikan tanda kasih, kami menyediakan amplop digital
          berikut.
        </motion.p>
      </div>

      {/* Gift Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="relative z-10 flex items-center justify-center mb-6"
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-dark shadow-[0_4px_16px_rgba(212,175,55,0.3)]">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="8" width="18" height="13" rx="2" />
            <path d="M12 8v13" />
            <path d="M3 12h18" />
            <path d="M12 8c-1.5-2-4-3-4-3s1-2 4 0c3-2 4 0 4 0s-2.5 1-4 3z" />
          </svg>
        </div>
      </motion.div>

      {/* Account Cards */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-md mx-auto">
        {accounts.map((acc, i) => (
          <AccountCard key={acc.id} account={acc} delay={i * 0.08} />
        ))}
      </div>
    </motion.section>
  );
}
