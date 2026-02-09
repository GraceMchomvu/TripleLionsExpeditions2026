import { useEffect, useState } from 'react';
import { useMenuStore } from '../store/menuStore';
import { Menu, X, Phone } from 'lucide-react';

export default function Navigation() {
  const { isOpen, toggleMenu, closeMenu } = useMenuStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMenu]);

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0B0F0D]/90 backdrop-blur-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="flex items-center justify-between px-[4vw]">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              closeMenu();
            }}
            className="flex items-center gap-3 group"
          >
            <img
              src="/images/logo.png"
              alt="Triple Lions Expeditions"
              className={`transition-all duration-300 ${isScrolled ? 'h-12 w-12' : 'h-14 w-14'}`}
            />
            <span className="font-display font-bold text-[#F4F1EA] text-lg tracking-tight group-hover:text-[#D4A23A] transition-colors hidden sm:block">
              Triple Lions
            </span>
          </a>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Phone button - hidden on mobile */}
            <a
              href="tel:+255756336142"
              className="hidden md:flex items-center justify-center w-10 h-10 border border-[rgba(244,241,234,0.2)] text-[#F4F1EA] hover:border-[#D4A23A] hover:text-[#D4A23A] transition-all duration-200"
            >
              <Phone size={16} />
            </a>

            {/* Menu button */}
            <button
              onClick={toggleMenu}
              className="flex items-center gap-2 text-[#F4F1EA] hover:text-[#D4A23A] transition-colors"
            >
              <span className="label-mono hidden sm:inline">
                {isOpen ? 'Close' : 'Menu'}
              </span>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Book CTA - hidden on mobile */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                closeMenu();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden md:inline-flex btn-filled text-xs"
            >
              Book
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
