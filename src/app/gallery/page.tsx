"use client";

import { useState } from "react";
import { photos, categories } from "@/data/photos";
import GalleryGrid from "@/components/GalleryGrid";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-light tracking-wide mb-12">Gallery</h1>

      {/* Category Filter */}
      <div className="flex gap-6 mb-10 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-sm whitespace-nowrap transition-colors pb-1 ${
              activeCategory === cat
                ? "text-black border-b border-black"
                : "text-gray-400 hover:text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photos */}
      {filtered.length > 0 ? (
        <GalleryGrid photos={filtered} />
      ) : (
        <p className="text-gray-400 text-center py-20">
          이 카테고리에 사진이 없습니다.
        </p>
      )}
    </div>
  );
}
