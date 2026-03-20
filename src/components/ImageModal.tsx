"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { Photo } from "@/data/photos";

type Props = {
  photo: Photo;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function ImageModal({ photo, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="lightbox-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl z-10"
        aria-label="닫기"
      >
        &times;
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl z-10"
        aria-label="이전"
      >
        &#8249;
      </button>

      {/* Image */}
      <div
        className="relative max-w-[90vw] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="object-contain max-h-[85vh] w-auto"
          priority
        />
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl z-10"
        aria-label="다음"
      >
        &#8250;
      </button>
    </div>
  );
}
