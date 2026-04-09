"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CandleOrnament,
  GoldRibbonOrnament,
  VintageFrame,
} from "@/components/DecorativeOrnaments";

type PersonalSectionProps = {
  id: string;
  badge: string;
  name: string;
  role: string;
  imageSrc: string;
  imagePosition: string;
  description: string;
  parents: string;
  quote: string;
  align: "left" | "right";
};

function PersonalSection({
  id,
  badge,
  name,
  role,
  imageSrc,
  imagePosition,
  description,
  parents,
  quote,
  align,
}: PersonalSectionProps) {
  const wrapperClass = align === "right" ? "justify-end" : "justify-start";
  const contentClass = align === "right" ? "ml-auto text-right" : "mr-auto text-left";

  const overlayClass =
    align === "right"
      ? "bg-[linear-gradient(90deg,rgba(10,6,6,0.56)_0%,rgba(10,6,6,0.36)_48%,rgba(6,4,4,0.9)_100%)]"
      : "bg-[linear-gradient(90deg,rgba(6,4,4,0.9)_0%,rgba(10,6,6,0.36)_52%,rgba(10,6,6,0.56)_100%)]";

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgExitScale = useTransform(scrollYProgress, [0, 0.68, 1], [1, 1, 1.14]);
  const bgExitOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 1, 0.42]);
  const overlayExitOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 1, 0.8]);

  const textExitX = useTransform(
    scrollYProgress,
    [0, 0.72, 1],
    [0, 0, align === "right" ? 26 : -26]
  );
  const textExitY = useTransform(scrollYProgress, [0, 0.72, 1], [0, 0, -36]);
  const textExitOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative min-h-screen w-full overflow-hidden"
    >
      <motion.div style={{ scale: bgExitScale, opacity: bgExitOpacity }} className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 1.2, y: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={imageSrc}
            alt={name}
            fill
            priority={false}
            className={`object-cover ${imagePosition}`}
            sizes="100vw"
          />
        </motion.div>
      </motion.div>

      <motion.div style={{ opacity: overlayExitOpacity }} className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0.2 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{ duration: 0.95, ease: "easeOut" }}
          className={`absolute inset-0 ${overlayClass}`}
        />
      </motion.div>

      <VintageFrame className="z-10 inset-4 opacity-70 md:inset-8" />
      <GoldRibbonOrnament className="absolute left-1/2 top-6 z-10 h-10 w-40 -translate-x-1/2 opacity-80 md:h-12 md:w-52" />
      <CandleOrnament
        className={`absolute bottom-14 z-10 hidden h-28 w-28 opacity-90 md:block ${align === "right" ? "left-6" : "right-6"
          }`}
      />

      <div
        className={`relative z-20 flex min-h-screen w-full items-end px-6 pb-14 pt-24 md:pb-18 ${wrapperClass}`}
      >
        <motion.div
          style={{ x: textExitX, y: textExitY, opacity: textExitOpacity }}
          className={`w-[min(88vw,34rem)] ${contentClass}`}
        >
          <motion.article
            initial={{
              opacity: 0,
              y: 56,
              x: align === "right" ? 68 : -68,
              filter: "blur(8px)",
            }}
            whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.55 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[11px] font-medium tracking-[3.5px] uppercase text-accent [text-shadow:0_3px_14px_rgba(0,0,0,0.92)]">
              {badge}
            </span>

            <h2 className="mt-2 font-heading text-4xl font-semibold text-text-main drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] md:text-5xl">
              {name}
            </h2>

            <p className="mt-1 text-sm tracking-[2px] uppercase text-text-muted [text-shadow:0_2px_12px_rgba(0,0,0,0.95)]">
              {role}
            </p>

            <div
              className={`mt-4 h-px w-20 bg-accent/85 ${align === "right" ? "ml-auto" : ""
                }`}
            />

            <p className="mt-4 text-[14px] leading-relaxed text-text-main [text-shadow:0_3px_12px_rgba(0,0,0,0.95)] md:text-[15px]">
              {description}
              <br />
              {parents}
            </p>

            <p className="mt-4 font-heading text-xl italic text-accent [text-shadow:0_3px_14px_rgba(0,0,0,0.92)]">
              &ldquo;{quote}&rdquo;
            </p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}

export function BrideProfileSection() {
  return (
    <PersonalSection
      id="profil-wanita"
      badge="Bride Profile"
      name="Yessi"
      role="Calon Mempelai Wanita"
      imageSrc="/yessi 4.webp"
      imagePosition="object-[center_28%] md:object-[center_50%]"
      description="Sosok yang santai dan tulus."
      parents="Putri dari Alm. Bapak Poster Simbolon dan Ibu Ruslan Gultom."
      quote="Cinta adalah tentang saling menjaga, bahkan di hari-hari paling sederhana"
      align="left"
    />
  );
}

export function GroomProfileSection() {
  return (
    <PersonalSection
      id="profil-pria"
      badge="Groom Profile"
      name="Sono"
      role="Calon Mempelai Pria"
      imageSrc="/DSC_0119.webp"
      imagePosition="object-[center_32%] md:object-[center_40%]"
      description="Pribadi yang ceria, bertanggung jawab, dan tulus."
      parents="Putra dari Bapak Mangibul Pakpahan dan Ibu Linda Lumbangaol."
      quote="Satu hati, satu tujuan, berjalan bersama dalam rencana-Nya"
      align="right"
    />
  );
}
