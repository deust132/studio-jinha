export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} 스튜디오 진하. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
            Instagram
          </a>
          <a href="mailto:contact@studiojinha.com" className="hover:text-black transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
