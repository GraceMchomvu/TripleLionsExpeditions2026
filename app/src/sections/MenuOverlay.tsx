import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMenuStore } from '../store/menuStore';

const menuItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Why Tanzania', href: '#why-tanzania' },
  { label: 'Safaris', href: '#bigfive' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Kilimanjaro', href: '#kilimanjaro' },
  { label: 'Zanzibar', href: '#zanzibar' },
  { label: 'Best Time to Visit', href: '#best-time' },
  { label: 'Contact', href: '#contact' },
];

export default function MenuOverlay() {
  const { isOpen, closeMenu } = useMenuStore();
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const items = itemsRef.current;

    if (!overlay) return;

    if (isOpen) {
      // Open animation
      gsap.set(overlay, { display: 'flex' });
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
      
      // Animate menu items
      gsap.fromTo(
        items,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.2,
          ease: 'power3.out',
        }
      );
    } else {
      // Close animation
      gsap.to(items, {
        y: -30,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.in',
      });
      
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.4,
        delay: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
        },
      });
    }
  }, [isOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMenu();
    
    // Small delay to let menu close
    setTimeout(() => {
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[90] bg-[#0B0F0D]/98 backdrop-blur-sm hidden opacity-0 flex-col items-center justify-center"
    >
      {/* Logo */}
      <div className="absolute top-6 left-[4vw]">
        <img src="/images/logo.png" alt="Triple Lions" className="w-16 h-16" />
      </div>

      <nav className="flex flex-col items-center gap-4 md:gap-6">
        {menuItems.map((item, index) => (
          <a
            key={item.label}
            ref={(el) => {
              if (el) itemsRef.current[index] = el;
            }}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-[#F4F1EA] hover:text-[#D4A23A] transition-colors duration-300 uppercase tracking-tight"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Contact info at bottom */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 text-[#B7C0B3]">
        <a
          href="tel:+255756336142"
          className="label-mono hover:text-[#D4A23A] transition-colors"
        >
          +255 756 336 142
        </a>
        <a
          href="mailto:info@triplelions.com"
          className="label-mono hover:text-[#D4A23A] transition-colors"
        >
          info@triplelions.com
        </a>
      </div>
    </div>
  );
}
