"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";

const photos = [
  { id: 1, src: "/hero-photo.webp", alt: "Prewedding 1", height: 220 },
  { id: 2, src: "/hero-photo.webp", alt: "Prewedding 2", height: 160 },
  { id: 3, src: "/hero-photo.webp", alt: "Prewedding 3", height: 200 },
  { id: 4, src: "/hero-photo.webp", alt: "Prewedding 4", height: 160 },
  { id: 5, src: "/hero-photo.webp", alt: "Prewedding 5", height: 240 },
  { id: 6, src: "/hero-photo.webp", alt: "Prewedding 6", height: 180 },
];

function GalleryItem({
  photo,
  index,
  onClick,
}: {
  photo: (typeof photos)[0];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      layoutId={`photo-${photo.id}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      style={{ height: photo.height }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, 33vw"
        loading="lazy"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    </motion.div>
  );
}

export default function InteractiveGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<
    (typeof photos)[0] | null
  >(null);

  const leftColumn = photos.filter((_, i) => i % 2 === 0);
  const rightColumn = photos.filter((_, i) => i % 2 !== 0);

  return (
    <section className="w-full bg-secondary-bg py-16 px-6">
      {/* Section Header */}
      <div className="flex flex-col items-center gap-2 mb-8">
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
          className="font-heading text-[28px] font-bold text-text-main"
        >
          Galeri Foto
        </motion.h2>
      </div>

      {/* Masonry Grid */}
      <div className="flex flex-row gap-2.5 max-w-md mx-auto">
        {/* Left Column */}
        <div className="flex flex-col gap-2.5 flex-1">
          {leftColumn.map((photo, i) => (
            <GalleryItem
              key={photo.id}
              photo={photo}
              index={i * 2}
              onClick={() => setSelectedPhoto(photo)}
            />
          ))}
        </div>
        {/* Right Column */}
        <div className="flex flex-col gap-2.5 flex-1">
          {rightColumn.map((photo, i) => (
            <GalleryItem
              key={photo.id}
              photo={photo}
              index={i * 2 + 1}
              onClick={() => setSelectedPhoto(photo)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
          >
            <motion.div
              layoutId={`photo-${selectedPhoto.id}`}
              className="relative w-full max-w-lg aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 500px"
              />
            </motion.div>

            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2D2D30"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
