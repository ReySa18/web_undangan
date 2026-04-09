"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { SectionOrnaments } from "@/components/DecorativeOrnaments";

type FormState = "idle" | "submitting" | "success";

export default function RsvpForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"hadir" | "tidak" | null>(null);
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [0, 1, 1, 0]);
  const sectionY = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [22, 0, 0, -24]);

  const formOpacity = useTransform(scrollYProgress, [0, 0.24, 0.76, 1], [0, 1, 1, 0]);
  const formY = useTransform(scrollYProgress, [0, 0.24, 0.76, 1], [28, 0, 0, -22]);
  const formScale = useTransform(scrollYProgress, [0, 0.24, 0.76, 1], [0.97, 1, 1, 0.985]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !attendance) return;

    setFormState("submitting");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setFormState("success");

    // Reset after success animation
    setTimeout(() => {
      setName("");
      setAttendance(null);
      setGuests("1");
      setMessage("");
      setFormState("idle");
    }, 3000);
  };

  return (
    <motion.section
      ref={sectionRef}
      id="rsvp"
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
          Konfirmasi Kehadiran
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-[28px] font-bold text-text-main"
        >
          RSVP
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[13px] text-text-muted text-center leading-relaxed max-w-xs"
        >
          Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
          berkenan hadir.
        </motion.p>
      </div>

      {/* Form Card */}
      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{ opacity: formOpacity, y: formY, scale: formScale }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-10 flex flex-col gap-5 w-full max-w-sm mx-auto p-7 glass-strong rounded-[20px] shadow-[0_14px_34px_rgba(0,0,0,0.36)]"
      >
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-main">
            Nama Lengkap
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama Anda"
            required
            className="w-full h-11 px-3.5 text-[13px] text-text-main bg-[rgba(26,26,26,0.7)] border border-accent/30 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all placeholder:text-text-muted/70"
          />
        </div>

        {/* Attendance */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-main">
            Kehadiran
          </label>
          <div className="flex flex-row gap-2.5">
            <button
              type="button"
              onClick={() => setAttendance("hadir")}
              className={`flex-1 h-11 rounded-xl text-[13px] font-medium transition-all ${
                attendance === "hadir"
                  ? "border-[1.5px] border-accent bg-accent/16 text-accent"
                  : "border-[1.5px] border-accent/25 bg-[rgba(26,26,26,0.7)] text-text-muted"
              }`}
            >
              Hadir
            </button>
            <button
              type="button"
              onClick={() => setAttendance("tidak")}
              className={`flex-1 h-11 rounded-xl text-[13px] font-medium transition-all ${
                attendance === "tidak"
                  ? "border-[1.5px] border-accent bg-accent/16 text-accent"
                  : "border-[1.5px] border-accent/25 bg-[rgba(26,26,26,0.7)] text-text-muted"
              }`}
            >
              Tidak Hadir
            </button>
          </div>
        </div>

        {/* Guests */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-main">
            Jumlah Tamu
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full h-11 px-3.5 text-[13px] text-text-main bg-[rgba(26,26,26,0.7)] border border-accent/30 rounded-xl outline-none focus:border-accent transition-all appearance-none"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} Orang
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-main">
            Ucapan & Doa
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tulis ucapan dan doa untuk kedua mempelai..."
            rows={3}
            className="w-full p-3.5 text-[13px] text-text-main bg-[rgba(26,26,26,0.7)] border border-accent/30 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all placeholder:text-text-muted/70 resize-none"
          />
        </div>

        {/* Submit Button */}
        <AnimatePresence mode="wait">
          {formState === "idle" && (
            <motion.button
              key="submit"
              type="submit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full h-12 bg-gradient-to-r from-accent to-accent-dark rounded-[14px] text-black text-sm font-semibold tracking-[1.5px] shadow-[0_4px_16px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.4)] transition-shadow"
            >
              KIRIM RSVP
            </motion.button>
          )}

          {formState === "submitting" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full h-12 rounded-[14px] bg-accent flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
              />
            </motion.div>
          )}

          {formState === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full h-12 rounded-[14px] bg-green-500 flex items-center justify-center gap-2"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </svg>
              <span className="text-white text-sm font-semibold">
                Terkirim!
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </motion.section>
  );
}
