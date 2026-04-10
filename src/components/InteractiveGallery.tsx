"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { SectionOrnaments } from "@/components/DecorativeOrnaments";

const photos = [
  { id: 1, src: "/DSC_9892.webp", alt: "Momen 01" },
  { id: 2, src: "/edit.webp", alt: "Momen 02" },
  { id: 3, src: "/DSC_9982.webp", alt: "Momen 03" },
  { id: 4, src: "/IMG_6515.JPG.webp", alt: "Momen 04" },
  { id: 5, src: "/yessi 2.webp", alt: "Momen 19" },
  { id: 6, src: "/yessi 3.webp", alt: "Momen 20" },
  { id: 7, src: "/DSC_0175.webp", alt: "Momen 07" },
  { id: 8, src: "/DSC_0231.webp", alt: "Momen 08" },
  { id: 9, src: "/hero.webp", alt: "Momen 09" },
  { id: 10, src: "/DSC_0165.webp", alt: "Momen 05" },
  { id: 11, src: "/DSC_0170.webp", alt: "Momen 06" },
  { id: 12, src: "/DSC_0313.webp", alt: "Momen 12" },
  { id: 13, src: "/DSC_0330.webp", alt: "Momen 13" },
  { id: 14, src: "/DSC_0119.webp", alt: "Momen 14" },
  { id: 15, src: "/DSC_0130.webp", alt: "Momen 15" },
  { id: 16, src: "/DSC_0139.webp", alt: "Momen 16" },
  { id: 17, src: "/FT-18.webp", alt: "Momen 17" },
  { id: 18, src: "/yessi 1.webp", alt: "Momen 18" },
  { id: 19, src: "/DSC_0294.webp", alt: "Momen 10" },
  { id: 20, src: "/DSC_0310.webp", alt: "Momen 11" },
  { id: 21, src: "/yessi 4.webp", alt: "Momen 21" },
  { id: 22, src: "/yessi 5.webp", alt: "Momen 22" },
];

function wrapIndex(value: number, length: number) {
  return (value % length + length) % length;
}

export default function InteractiveGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const carouselTouchStartX = useRef<number | null>(null);
  const lightboxTouchStartX = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.14, 0.86, 1], [0, 1, 1, 0]);
  const sectionY = useTransform(scrollYProgress, [0, 0.14, 0.86, 1], [24, 0, 0, -24]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (isPaused || selectedIndex !== null) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => wrapIndex(prev + 1, photos.length));
    }, 2800);

    return () => window.clearInterval(timer);
  }, [isPaused, selectedIndex]);

  const moveLightbox = (delta: number) => {
    setSelectedIndex((prev) => {
      if (prev === null) return prev;
      const next = wrapIndex(prev + delta, photos.length);
      setActiveIndex(next);
      return next;
    });
  };

  const moveCarousel = (delta: number) => {
    setActiveIndex((prev) => wrapIndex(prev + delta, photos.length));
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowRight") moveLightbox(1);
      if (event.key === "ArrowLeft") moveLightbox(-1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex]);

  const visibleSlides = useMemo(
    () =>
      [-3, -2, -1, 0, 1, 2, 3].map((offset) => {
        const index = wrapIndex(activeIndex + offset, photos.length);
        return {
          offset,
          index,
          distance: Math.abs(offset),
          photo: photos[index],
        };
      }),
    [activeIndex]
  );

  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: sectionOpacity, y: sectionY }}
      className="relative w-full bg-secondary-bg py-16 px-6 overflow-hidden"
    >
      <SectionOrnaments className="z-0 opacity-75" />

      <div className="relative z-10 flex flex-col items-center gap-2 mb-2">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-medium tracking-[4px] uppercase text-accent"
        >
          Our Moments
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-[30px] font-bold text-text-main"
        >
          Galeri Foto
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[13px] text-text-muted text-center leading-relaxed max-w-md"
        >
          Tekan foto untuk melihat tampilan penuh.
        </motion.p>
      </div>

      <div
        className="relative z-10 mx-auto mt-8 h-[300px] w-full max-w-5xl md:h-[420px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={(event) => {
          const touch = event.changedTouches[0];
          carouselTouchStartX.current = touch?.clientX ?? null;
          setIsPaused(true);
        }}
        onTouchEnd={(event) => {
          const startX = carouselTouchStartX.current;
          const endX = event.changedTouches[0]?.clientX;
          if (startX !== null && typeof endX === "number") {
            const delta = endX - startX;
            if (Math.abs(delta) > 42) {
              moveCarousel(delta > 0 ? -1 : 1);
            }
          }
          carouselTouchStartX.current = null;
          setIsPaused(false);
        }}
      >
        {visibleSlides.map(({ offset, index, distance, photo }) => {
          const x = offset * (isMobile ? 96 : 190);
          const y = distance === 0 ? 0 : distance === 1 ? 8 : 18;
          const scale =
            distance === 0 ? 1 : distance === 1 ? 0.82 : distance === 2 ? 0.64 : 0.48;
          const opacity = distance === 0 ? 1 : distance === 1 ? 0.72 : distance === 2 ? 0.46 : 0.26;

          return (
            <motion.button
              key={photo.id}
              type="button"
              onClick={() => {
                setActiveIndex(index);
                setSelectedIndex(index);
              }}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              animate={{
                x,
                y,
                scale,
                opacity,
                rotateY: offset * (isMobile ? -8 : -14),
                zIndex: 30 - distance,
              }}
              transition={{ type: "spring", stiffness: 190, damping: 24 }}
              whileHover={distance === 0 ? { scale: 1.03 } : { scale: Math.min(scale + 0.04, 1) }}
              className="absolute left-1/2 top-1/2 h-[220px] w-[160px] md:h-[330px] md:w-[238px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-accent/35 bg-black/30 shadow-[0_16px_40px_rgba(0,0,0,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 45vw, 280px"
              />
              <div
                className={`absolute inset-0 ${distance === 0
                  ? "bg-gradient-to-t from-black/50 via-black/10 to-black/0"
                  : "bg-black/35"
                  }`}
              />
              <span
                className={`absolute bottom-3 left-3 text-[10px] tracking-[2px] uppercase ${distance === 0 ? "text-text-main" : "text-text-muted"
                  }`}
              >
                Momen {String(index + 1).padStart(2, "0")}
              </span>
            </motion.button>
          );
        })}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            moveCarousel(-1);
          }}
          className="absolute left-2 top-1/2 z-[80] -translate-y-1/2 rounded-full border border-accent/45 bg-[rgba(15,10,10,0.82)] px-3 py-2 text-accent transition hover:bg-[rgba(15,10,10,0.95)] md:left-4"
        >
          &#8249;
        </button>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            moveCarousel(1);
          }}
          className="absolute right-2 top-1/2 z-[80] -translate-y-1/2 rounded-full border border-accent/45 bg-[rgba(15,10,10,0.82)] px-3 py-2 text-accent transition hover:bg-[rgba(15,10,10,0.95)] md:right-4"
        >
          &#8250;
        </button>
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-center">
        <span className="rounded-full border border-accent/35 bg-[rgba(15,10,10,0.7)] px-4 py-1 text-[11px] tracking-[2px] uppercase text-text-muted">
          {activeIndex + 1} / {photos.length}
        </span>
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 backdrop-blur-md px-3 pb-18 pt-16 md:p-5"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                moveLightbox(-1);
              }}
              className="absolute left-2 top-1/2 z-[120] -translate-y-1/2 rounded-full border border-accent/40 bg-[rgba(15,10,10,0.82)] px-3 py-2 text-accent md:left-8"
            >
              &#8249;
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.25 }}
              className="relative z-[100] h-[72vh] w-full max-w-[calc(100vw-1.8rem)] overflow-hidden rounded-2xl border border-accent/30 md:h-[78vh] md:max-w-3xl"
              onClick={(event) => event.stopPropagation()}
              onTouchStart={(event) => {
                const touch = event.changedTouches[0];
                lightboxTouchStartX.current = touch?.clientX ?? null;
              }}
              onTouchEnd={(event) => {
                const startX = lightboxTouchStartX.current;
                const endX = event.changedTouches[0]?.clientX;
                if (startX !== null && typeof endX === "number") {
                  const delta = endX - startX;
                  if (Math.abs(delta) > 42) {
                    moveLightbox(delta > 0 ? -1 : 1);
                  }
                }
                lightboxTouchStartX.current = null;
              }}
            >
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                className="object-contain bg-black"
                sizes="(max-width: 768px) 95vw, 950px"
                priority
              />
            </motion.div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                moveLightbox(1);
              }}
              className="absolute right-2 top-1/2 z-[120] -translate-y-1/2 rounded-full border border-accent/40 bg-[rgba(15,10,10,0.82)] px-3 py-2 text-accent md:right-8"
            >
              &#8250;
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedIndex(null);
              }}
              className="absolute right-3 top-3 z-[130] rounded-full border border-accent/35 bg-[rgba(15,10,10,0.9)] px-3 py-1.5 text-text-main md:right-5 md:top-5"
            >
              X
            </button>

            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-accent/30 bg-[rgba(15,10,10,0.75)] px-4 py-1.5 text-[11px] tracking-[2px] uppercase text-text-muted">
              {selectedPhoto.alt} ({(selectedIndex ?? 0) + 1} / {photos.length})
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
