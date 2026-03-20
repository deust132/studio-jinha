import Image from "next/image";
import Link from "next/link";
import { photos } from "@/data/photos";

export default function Home() {
  const featured = photos.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
        <Image
          src={featured[0]?.src ?? ""}
          alt="스튜디오 진하"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-light tracking-widest mb-4">
            스튜디오 진하
          </h1>
          <p className="text-base md:text-lg font-light tracking-wide text-white/80">
            감성적인 순간을 담다
          </p>
        </div>
      </section>

      {/* Featured Work */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-light tracking-wide">Featured Work</h2>
          <Link
            href="/gallery"
            className="text-sm text-gray-400 hover:text-black transition-colors"
          >
            View All &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.map((photo) => (
            <Link
              key={photo.id}
              href="/gallery"
              className="group relative aspect-[4/5] overflow-hidden rounded-sm"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm font-light">
                  {photo.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-20 px-6 text-center">
        <h2 className="text-2xl font-light tracking-wide mb-4">
          함께 작업하고 싶으신가요?
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          촬영 문의, 협업 제안 등 편하게 연락해주세요.
        </p>
        <Link
          href="/about"
          className="inline-block border border-black px-8 py-3 text-sm tracking-wide hover:bg-black hover:text-white transition-colors"
        >
          Contact
        </Link>
      </section>
    </>
  );
}
