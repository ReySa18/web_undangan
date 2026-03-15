"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full bg-[#2D2D30] py-12 px-6">
      <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-1"
        >
          <span className="font-heading text-2xl font-semibold text-white">
            Sono & Yessi
          </span>
          <span className="font-script text-lg text-accent">
            25 Desember 2026
          </span>
        </motion.div>

        {/* Divider */}
        <div className="w-16 h-px bg-white/20" />

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[13px] text-white/60 text-center leading-relaxed italic max-w-xs"
        >
          &ldquo;Engkau mendebarkan hatiku, dinda, pengantinku, engkau mendebarkan hati dengan satu kejapan mata, dengan seuntai kalung dari perhiasan lehermu.&rdquo;
        </motion.p>
        <span className="text-[11px] text-white/40 tracking-wide">
          Kidung Agung 4:9
        </span>

        {/* Divider */}
        <div className="w-16 h-px bg-white/20" />

        {/* Thank you */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-xs text-white/40 text-center"
        >
          Terima kasih atas doa dan restu yang diberikan.
        </motion.p>

        <span className="text-[10px] text-white/25 tracking-wider mt-2">
          Made with love
        </span>
      </div>
    </footer>
  );
}
