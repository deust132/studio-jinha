"use client";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* About */}
      <section className="mb-20">
        <h1 className="text-3xl font-light tracking-wide mb-8">About</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="aspect-[3/4] bg-gray-100 rounded-sm mb-4 flex items-center justify-center text-gray-300 text-sm">
              프로필 사진
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-medium mb-4">스튜디오 진하</h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              감성적인 순간을 담는 사진 스튜디오입니다.
              인물, 풍경, 제품 등 다양한 분야의 촬영을 진행합니다.
            </p>
            <p className="text-gray-500 leading-relaxed">
              자연스러운 빛과 색감을 살린 사진으로
              진정성 있는 이미지를 만들어갑니다.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-2xl font-light tracking-wide mb-8">Contact</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-gray-400 mb-1">Email</dt>
                <dd>
                  <a
                    href="mailto:contact@studiojinha.com"
                    className="text-black hover:underline"
                  >
                    contact@studiojinha.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-gray-400 mb-1">Instagram</dt>
                <dd>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline"
                  >
                    @studio_jinha
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-gray-400 mb-1">Location</dt>
                <dd>Seoul, South Korea</dd>
              </div>
            </dl>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label htmlFor="name" className="block text-sm text-gray-400 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-gray-400 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="border border-black px-8 py-2.5 text-sm tracking-wide hover:bg-black hover:text-white transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
