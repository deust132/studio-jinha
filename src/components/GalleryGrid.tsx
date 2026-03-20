"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import type { Photo } from "@/data/photos";
import ImageModal from "./ImageModal";

type Props = {
  photos: Photo[];
};

export default function GalleryGrid({ photos }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : photos.length - 1));
  }, [photos.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : 0));
  }, [photos.length]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="gallery-item mb-4 break-inside-avoid cursor-pointer group"
            style={{ animationDelay: `${index * 0.05}s` }}
            onClick={() => setSelectedIndex(index)}
          >
            <div className="relative overflow-hidden rounded-sm">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {selectedIndex !== null && photos[selectedIndex] && (
        <ImageModal
          photo={photos[selectedIndex]}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
}
