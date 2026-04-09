"use client";

import { motion } from "framer-motion";
import { FooterOrnaments } from "@/components/DecorativeOrnaments";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[linear-gradient(160deg,#120d0d_0%,#1a1a1a_55%,#2b1313_100%)] py-12 px-6 border-t border-accent/30 overflow-hidden">
      <FooterOrnaments className="z-0" />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-md mx-auto">
        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-1"
        >
          <span className="font-heading text-2xl font-semibold text-text-main">
            Sono & Yessi
          </span>
          <span className="font-script text-lg text-accent">
            16 Mei 2026
          </span>
        </motion.div>

        {/* Divider */}
        <div className="w-16 h-px bg-accent/30" />

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[13px] text-text-muted text-center leading-relaxed italic max-w-xs"
        >
          &ldquo;Engkau mendebarkan hatiku, dinda, pengantinku, engkau mendebarkan hati dengan satu kejapan mata, dengan seuntai kalung dari perhiasan lehermu.&rdquo;
        </motion.p>
        <span className="text-[11px] text-text-muted/70 tracking-wide">
          Kidung Agung 4:9
        </span>

        {/* Divider */}
        <div className="w-16 h-px bg-accent/30" />

        {/* Thank you */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-xs text-text-muted/75 text-center"
        >
          Terima kasih atas doa dan restu yang diberikan.
        </motion.p>

        <span className="text-[10px] text-text-muted/60 tracking-wider mt-2">
          Made with love
        </span>
      </div>
    </footer>
  );
}
